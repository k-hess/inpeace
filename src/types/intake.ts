// Core types for the intake flow. Everything here is plain data —
// no persistence, no network. State lives in sessionStorage via the
// intake store (see src/store/intake-context.tsx).

export type MoodAnswer = "okay" | "a-lot" | "not-sure" | null

export type StateCode = "TX" | "CA"

export type WillStatus = "yes" | "no" | "not-sure"

export type AssetKey =
  | "home"
  | "retirement"
  | "bank"
  | "investments"
  | "crypto"
  | "car"

export type SupportMode = "alone" | "family"

export interface IntakeAnswers {
  mood: MoodAnswer
  state: StateCode | null
  /** ISO date string, e.g. "2026-06-24" */
  dateOfDeath: string | null
  will: WillStatus | null
  assets: AssetKey[]
  support: SupportMode | null
  /** Optional — offered on the date step. Used to personalize a few spots in the plan. */
  firstName: string | null
  /** Optional — a quiet checkbox on the assets step. Surfaces VA-specific pacing cards. */
  veteran: boolean
}

export const EMPTY_ANSWERS: IntakeAnswers = {
  mood: null,
  state: null,
  dateOfDeath: null,
  will: null,
  assets: [],
  support: null,
  firstName: null,
  veteran: false,
}

/**
 * True once every required (non-skippable) question has an answer.
 * Assets is allowed to be an empty selection, and mood is always optional.
 */
export function isIntakeComplete(answers: IntakeAnswers): boolean {
  return Boolean(answers.state && answers.dateOfDeath && answers.will && answers.support)
}

export const ASSET_LABELS: Record<AssetKey, string> = {
  home: "A home",
  retirement: "Retirement accounts (401k/IRA)",
  bank: "Bank accounts",
  investments: "Investments",
  crypto: "Crypto",
  car: "A car",
}
