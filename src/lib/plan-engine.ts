import { parseISODate } from "#/lib/date-utils"
import { california } from "#/data/states/ca"
import { texas } from "#/data/states/tx"
import type { Phase, Rule, RuleContext, RuleCopy } from "#/data/states/types"
import { commonPacingRules } from "#/data/pacing-common"
import { canWaitItems } from "#/data/can-wait"
import { protectionCards } from "#/data/protection"
import { peopleCards } from "#/data/people"
import { buildFamilyTasks, recommendedCertificateCount, type FamilyTask } from "#/data/paperwork"
import type { IntakeAnswers, MoodAnswer } from "#/types/intake"

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

export interface PlanData {
  introLine: string
  stateName: string
  phases: PlanPhase[]
  canWait: PlanCard[]
  protection: PlanCard[]
  paperwork: {
    recommendedCopies: number
    showFamilyView: boolean
    familyTasks: FamilyTask[]
  }
}

const PHASE_LABELS: Record<Phase, string> = {
  "this-week": "This week",
  "this-month": "This month",
  "months-ahead": "The months ahead",
}

const PHASE_ORDER: Phase[] = ["this-week", "this-month", "months-ahead"]

function introLine(mood: MoodAnswer): string {
  switch (mood) {
    case "okay":
      return "There's less to do right now than it feels like. Here's what actually matters this week — and what can wait."
    case "a-lot":
      return "It makes sense that it's a lot. You don't have to hold all of it at once — here's just the part that matters this week, and a longer list of things that can simply wait."
    case "not-sure":
      return "That's a fair place to be. You don't need to have a handle on all of it — here's what actually matters this week, and what can wait."
    default:
      return "There's less to do right now than it feels like. Here's what actually matters this week — and what can wait."
  }
}

function resolveRules(rules: Rule[], phase: Phase, answers: IntakeAnswers, ctx: RuleContext): PlanCard[] {
  return rules
    .filter((rule) => rule.phase === phase && rule.trigger(answers))
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

  return {
    introLine: introLine(answers.mood),
    stateName: stateConfig.name,
    phases,
    canWait,
    protection,
    paperwork: {
      recommendedCopies: recommendedCertificateCount(answers.assets),
      showFamilyView: answers.support === "family",
      familyTasks: buildFamilyTasks(answers.assets, answers.will),
    },
  }
}
