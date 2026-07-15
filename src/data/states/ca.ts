import { addDays, addMonths, formatDateLong, formatDateShort } from "#/lib/date-utils"
import type { Rule, RuleContext, StateConfig } from "#/data/states/types"

/** Threshold changes for deaths on or after April 1, 2026. */
const THRESHOLD_CHANGE_DATE = new Date(2026, 3, 1)

function smallEstateThreshold(dateOfDeath: Date): number {
  return dateOfDeath >= THRESHOLD_CHANGE_DATE ? 239700 : 208850
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

const smallEstateAffidavit: Rule = {
  id: "ca-small-estate-affidavit",
  phase: "this-month",
  trigger: (answers) => answers.will !== "yes",
  copy: (ctx: RuleContext) => {
    const threshold = formatCurrency(smallEstateThreshold(ctx.dateOfDeath))
    const availableDate = formatDateShort(addDays(ctx.dateOfDeath, 40))
    const notSure = ctx.answers.will === "not-sure"
    return {
      title: "There may be a shorter path than full probate",
      body: notSure
        ? `If it turns out there wasn't a will, and the estate comes in under ${threshold}, California allows a small estate affidavit instead of full probate. There's a required waiting period — forty days, so ${availableDate} at the earliest. Nothing to act on yet, just good to know it's an option.`
        : `Since there wasn't a will, if the estate comes in under ${threshold}, California allows a small estate affidavit instead of full probate — a much shorter process. There's a required waiting period of forty days, so ${availableDate} at the earliest.`,
    }
  },
}

const ab2016Home: Rule = {
  id: "ca-ab2016-home",
  phase: "this-month",
  trigger: (answers) => answers.assets.includes("home"),
  copy: () => ({
    title: "The house may not need full probate either",
    body: "Under a newer California law (AB 2016), a primary residence worth up to $750,000 can often pass to heirs outside of full probate, using a simpler process. It's worth raising with an attorney early, since it can change the whole shape of what's ahead.",
  }),
}

const fullProbateExpectations: Rule = {
  id: "ca-full-probate-expectations",
  phase: "months-ahead",
  trigger: () => true,
  copy: () => ({
    title: "If full probate does end up being necessary",
    body: "California probate, when it's needed, commonly takes somewhere between nine and eighteen months from start to finish. That's not a sign anything has gone wrong — it's just the normal pace of the court process, and most of it doesn't require much from you day to day.",
  }),
}

const creditorWindow: Rule = {
  id: "ca-creditor-window",
  phase: "months-ahead",
  trigger: () => true,
  copy: (ctx: RuleContext) => {
    const approxDate = formatDateLong(addMonths(ctx.dateOfDeath, 4))
    return {
      title: "There's a window for creditors to come forward",
      body: `Once the estate is formally opened, creditors generally have about four months to file a claim. Counting roughly from the date of death, that lands somewhere around ${approxDate} — an estimate, not an exact deadline, since the real clock starts when the court issues letters.`,
    }
  },
}

export const california: StateConfig = {
  code: "CA",
  name: "California",
  rules: [smallEstateAffidavit, ab2016Home, fullProbateExpectations, creditorWindow],
}

/** Anchor date used by the "don't distribute money yet" protection card. */
export function creditorProtectionDate(dateOfDeath: Date): Date {
  return addMonths(dateOfDeath, 4)
}
