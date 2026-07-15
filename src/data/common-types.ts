import type { RuleContext, RuleCopy } from "#/data/states/types"
import type { IntakeAnswers } from "#/types/intake"

/** A card that doesn't belong to a specific phase of the timeline. */
export interface SimpleCard {
  id: string
  trigger: (answers: IntakeAnswers) => boolean
  copy: (ctx: RuleContext) => RuleCopy
  /** Marks the card that should visually recede — used for the advisor card. */
  quiet?: boolean
}
