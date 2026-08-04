import { addDays, toISODate } from "#/lib/date-utils"
import type { IntakeAnswers } from "#/types/intake"

/**
 * Two canned demo scenarios, loaded from the hidden footer link for
 * interviews. The Care Circle section (src/data/care-circle.ts) seeds one
 * slot as already claimed independent of these answers, so both scenarios
 * always open /plan with at least one pre-claimed slot in the demo flow.
 */
export const scenarios: Record<"a" | "b", IntakeAnswers> = {
  // Texas, no will, bank + car + crypto, alone, died 3 weeks ago, veteran.
  a: {
    state: "TX",
    dateOfDeath: toISODate(addDays(new Date(), -21)),
    will: "no",
    assets: ["bank", "car", "crypto"],
    support: "alone",
    firstName: null,
    veteran: true,
  },
  // California, will, home + retirement + investments, with siblings, died 6 weeks ago.
  b: {
    state: "CA",
    dateOfDeath: toISODate(addDays(new Date(), -42)),
    will: "yes",
    assets: ["home", "retirement", "investments"],
    support: "family",
    firstName: "Robert",
    veteran: false,
  },
}
