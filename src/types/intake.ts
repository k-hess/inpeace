// Core types for the intake flow. Everything here is plain data —
// no persistence, no network. State lives in sessionStorage via the
// intake store (see src/store/intake-context.tsx).

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

/** Which door the person came in through. Drives which plan gets built. */
export type JourneyMode = "after" | "for-family" | "for-self"

/** Optional — shapes funeral timing expectations only. "unspecified" is a real answer, not a skip. */
export type Religion = "christian" | "catholic" | "jewish" | "muslim" | "hindu" | "none" | "unspecified"

export interface IntakeAnswers {
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
  mode: JourneyMode
  religion: Religion
}

export const EMPTY_ANSWERS: IntakeAnswers = {
  state: null,
  dateOfDeath: null,
  will: null,
  assets: [],
  support: null,
  firstName: null,
  veteran: false,
  mode: "after",
  religion: "unspecified",
}

/**
 * True once every required (non-skippable) question has an answer.
 * Assets is allowed to be an empty selection. What's required depends on
 * which door the person came in through: "after" needs the date of death
 * plus the will/support picture. The gathering doors ("for-family" and
 * "for-self") don't have a will/support picture to ask about yet — state
 * alone is enough to build a plan for them.
 */
export function isIntakeComplete(answers: IntakeAnswers): boolean {
  if (!answers.state) return false
  if (answers.mode === "after") {
    return Boolean(answers.dateOfDeath && answers.will && answers.support)
  }
  return true
}

/** Human-readable label for each door, used in demo tooling and copy lookups. */
export const MODE_LABELS: Record<JourneyMode, string> = {
  after: "Someone has died",
  "for-family": "Helping a family member get ready",
  "for-self": "Getting my own affairs in order",
}

export const ASSET_LABELS: Record<AssetKey, string> = {
  home: "A home",
  retirement: "Retirement accounts (401k/IRA)",
  bank: "Bank accounts",
  investments: "Investments",
  crypto: "Crypto",
  car: "A car",
}

export const RELIGION_LABELS: Record<Religion, string> = {
  christian: "Christian",
  catholic: "Catholic",
  jewish: "Jewish",
  muslim: "Muslim",
  hindu: "Hindu",
  none: "Not religious",
  unspecified: "Prefer not to say",
}
