import { addDays, toISODate } from "#/lib/date-utils"
import type { IntakeAnswers } from "#/types/intake"

/**
 * Canned demo scenarios, loaded from the hidden footer link for
 * interviews. The Care Circle section (src/data/care-circle.ts) seeds one
 * slot as already claimed independent of these answers, so scenarios a/b
 * always open /plan with at least one pre-claimed slot in the demo flow.
 * c and d exercise the two gathering doors instead of the "after" door.
 */
export const scenarios: Record<"a" | "b" | "c" | "d", IntakeAnswers> = {
  // Texas, no will, bank + car + crypto, alone, died 3 weeks ago, veteran.
  a: {
    state: "TX",
    dateOfDeath: toISODate(addDays(new Date(), -21)),
    will: "no",
    assets: ["bank", "car", "crypto"],
    support: "alone",
    firstName: null,
    veteran: true,
    mode: "after",
    religion: "unspecified",
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
    mode: "after",
    religion: "unspecified",
  },
  // Texas, helping a family member get ready, will unclear, a couple of
  // assets, Jewish — exercises the religion timing note.
  c: {
    state: "TX",
    dateOfDeath: null,
    will: "not-sure",
    assets: ["bank", "home"],
    support: null,
    firstName: null,
    veteran: false,
    mode: "for-family",
    religion: "jewish",
  },
  // California, getting your own affairs in order, will in place, several
  // assets, religion left unspecified.
  d: {
    state: "CA",
    dateOfDeath: null,
    will: "yes",
    assets: ["home", "retirement", "bank", "investments", "crypto"],
    support: null,
    firstName: null,
    veteran: false,
    mode: "for-self",
    religion: "unspecified",
  },
}
