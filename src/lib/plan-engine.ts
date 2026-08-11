import { parseISODate } from "#/lib/date-utils"
import { california } from "#/data/states/ca"
import { texas } from "#/data/states/tx"
import type { Phase, Rule, RuleContext, RuleCopy } from "#/data/states/types"
import { commonPacingRules } from "#/data/pacing-common"
import { canWaitItems } from "#/data/can-wait"
import { protectionCards } from "#/data/protection"
import { liabilityCards } from "#/data/liabilities"
import { edgeCaseCards } from "#/data/edge-cases"
import { peopleCards } from "#/data/people"
import {
  buildFamilyTasks,
  buildNotifications,
  recommendedCertificateCount,
  type FamilyTask,
  type NotificationItem,
} from "#/data/paperwork"
import { accessNote, inventoryGroups } from "#/data/inventory"
import { getConversationNote, questionGroups, type QuestionGroup } from "#/data/questions-to-ask"
import { religionTimingNote } from "#/data/religion"
import type { IntakeAnswers, JourneyMode } from "#/types/intake"

export interface PlanCard extends RuleCopy {
  id: string
  quiet?: boolean
}

export interface PlanPhase {
  phase: Phase
  label: string
  tasks: PlanCard[]
  people: PlanCard[]
}

/** A timeline task with a real computed date attached — see Rule.computeDate. */
export interface DeadlineTask {
  id: string
  title: string
  date: Date
}

export interface PlanData {
  headline: string
  sub: string
  stateName: string
  firstName: string | null
  phases: PlanPhase[]
  canWait: PlanCard[]
  protection: PlanCard[]
  liabilities: PlanCard[]
  edgeCases: PlanCard[]
  /** Every triggered rule with a real deadline, nearest first — feeds the "Right now" block. */
  deadlineTasks: DeadlineTask[]
  paperwork: {
    recommendedCopies: number
    showFamilyView: boolean
    familyTasks: FamilyTask[]
    notifications: NotificationItem[]
  }
}

const PHASE_LABELS: Record<Phase, string> = {
  "this-week": "This week",
  "this-month": "This month",
  "months-ahead": "The months ahead",
}

const PHASE_ORDER: Phase[] = ["this-week", "this-month", "months-ahead"]

const INTRO = {
  headline: "There's less to do right now than it feels like.",
  sub: "Here's what actually matters this week — and what can wait.",
}

function resolveRules(rules: Rule[], phase: Phase, answers: IntakeAnswers, ctx: RuleContext): PlanCard[] {
  return rules
    .filter((rule) => rule.phase === phase && rule.trigger(answers))
    .sort((a, b) => Number(a.closing ?? false) - Number(b.closing ?? false))
    .map((rule) => ({ id: rule.id, ...rule.copy(ctx) }))
}

export function buildPlan(answers: IntakeAnswers): PlanData | null {
  if (!answers.state || !answers.dateOfDeath || !answers.will || !answers.support) {
    return null
  }

  const dateOfDeath = parseISODate(answers.dateOfDeath)
  const ctx: RuleContext = { answers, dateOfDeath, state: answers.state }
  const stateConfig = answers.state === "TX" ? texas : california

  const combinedTaskRules = [...commonPacingRules, ...stateConfig.rules]

  const phases: PlanPhase[] = PHASE_ORDER.map((phase) => ({
    phase,
    label: PHASE_LABELS[phase],
    tasks: resolveRules(combinedTaskRules, phase, answers, ctx),
    people: peopleCards
      .filter((card) => card.phase === phase && card.trigger(answers))
      .map((card) => ({ id: card.id, quiet: card.quiet, ...card.copy(ctx) })),
  }))

  const canWait = canWaitItems
    .filter((item) => item.trigger(answers))
    .map((item) => ({ id: item.id, ...item.copy(ctx) }))

  const protection = protectionCards
    .filter((card) => card.trigger(answers))
    .map((card) => ({ id: card.id, ...card.copy(ctx) }))

  const liabilities = liabilityCards
    .filter((card) => card.trigger(answers))
    .map((card) => ({ id: card.id, ...card.copy(ctx) }))

  const edgeCases = edgeCaseCards
    .filter((card) => card.trigger(answers))
    .map((card) => ({ id: card.id, ...card.copy(ctx) }))

  const deadlineTasks: DeadlineTask[] = combinedTaskRules
    .filter((rule): rule is Rule & { computeDate: NonNullable<Rule["computeDate"]> } =>
      Boolean(rule.computeDate) && rule.trigger(answers),
    )
    .map((rule) => ({ id: rule.id, title: rule.copy(ctx).title, date: rule.computeDate(ctx) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  const { headline, sub } = INTRO

  return {
    headline,
    sub,
    stateName: stateConfig.name,
    firstName: answers.firstName,
    phases,
    canWait,
    protection,
    liabilities,
    edgeCases,
    deadlineTasks,
    paperwork: {
      recommendedCopies: recommendedCertificateCount(answers.assets),
      showFamilyView: answers.support === "family",
      familyTasks: buildFamilyTasks(answers.assets, answers.will),
      notifications: buildNotifications(answers.assets, answers.will),
    },
  }
}

export interface GatheringPlanData {
  mode: Extract<JourneyMode, "for-family" | "for-self">
  headline: string
  sub: string
  stateName: string
  groups: {
    id: string
    label: string
    blurb: string
    items: { id: string; label: string; whereToLook: string; easilyMissed?: boolean }[]
  }[]
  accessNote: { title: string; body: string }
  questionGroups: QuestionGroup[]
  conversationNote: { title: string; body: string }
  religionNote: { title: string; body: string } | null
}

const GATHERING_INTRO: Record<Extract<JourneyMode, "for-family" | "for-self">, { headline: string; sub: string }> = {
  "for-self": {
    headline: "Getting this together now is a gift to whoever would otherwise have to guess.",
    sub: "None of this is morbid, and none of it is urgent — it's just easier to gather at your own pace than to have someone else piece it together later.",
  },
  "for-family": {
    headline: "The conversation is the hard part. This is the list that makes it concrete.",
    sub: "You don't need to ask everything at once. This turns a vague, uncomfortable topic into a short set of questions and a list of what to look for.",
  },
}

export function buildGatheringPlan(answers: IntakeAnswers): GatheringPlanData | null {
  if (!answers.state) return null
  if (answers.mode !== "for-family" && answers.mode !== "for-self") return null

  const mode = answers.mode
  const stateConfig = answers.state === "TX" ? texas : california

  const groups = inventoryGroups
    .map((group) => ({
      id: group.id,
      label: group.label,
      blurb: mode === "for-self" ? (group.blurbSelf ?? group.blurb) : group.blurb,
      items: group.items
        .filter((item) => !item.trigger || item.trigger(answers))
        .map((item) => ({
          id: item.id,
          label: item.label,
          whereToLook: mode === "for-self" ? (item.whereToLookSelf ?? item.whereToLook) : item.whereToLook,
          easilyMissed: item.easilyMissed,
        })),
    }))
    .filter((group) => group.items.length > 0)

  const { headline, sub } = GATHERING_INTRO[mode]

  return {
    mode,
    headline,
    sub,
    stateName: stateConfig.name,
    groups,
    accessNote,
    questionGroups,
    conversationNote: getConversationNote(mode),
    religionNote: religionTimingNote(answers.religion),
  }
}
