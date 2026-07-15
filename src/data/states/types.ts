import type { IntakeAnswers, StateCode } from "#/types/intake"

export type Phase = "this-week" | "this-month" | "months-ahead"

/** Context passed to every rule's copy function once we know the dates. */
export interface RuleContext {
  answers: IntakeAnswers
  dateOfDeath: Date
  state: StateCode
}

export interface RuleCopy {
  title: string
  body: string
}

/**
 * A single piece of guidance. The same shape is reused for pacing-timeline
 * tasks, protection guardrails, and people/resource cards — only which list
 * a rule lives in changes what it renders as.
 */
export interface Rule {
  id: string
  phase: Phase
  trigger: (answers: IntakeAnswers) => boolean
  copy: (ctx: RuleContext) => RuleCopy
  /** Only present when a rule has a real computed date worth surfacing. */
  computeDate?: (ctx: RuleContext) => Date
}

export interface StateConfig {
  code: StateCode
  name: string
  rules: Rule[]
}
