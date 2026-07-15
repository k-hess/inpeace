import { addDays, toISODate } from "#/lib/date-utils"
import type { IntakeAnswers } from "#/types/intake"

/** Two canned demo scenarios, loaded from the hidden footer link for interviews. */
export const scenarios: Record<"a" | "b", IntakeAnswers> = {
  // Texas, no will, bank + car, alone, died 3 weeks ago.
  a: {
    mood: "a-lot",
    state: "TX",
    dateOfDeath: toISODate(addDays(new Date(), -21)),
    will: "no",
    assets: ["bank", "car"],
    support: "alone",
    firstName: null,
  },
  // California, will, home + retirement + investments, with siblings, died 6 weeks ago.
  b: {
    mood: "okay",
    state: "CA",
    dateOfDeath: toISODate(addDays(new Date(), -42)),
    will: "yes",
    assets: ["home", "retirement", "investments"],
    support: "family",
    firstName: "Robert",
  },
}
