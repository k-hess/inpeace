import { addDays, addMonths, formatDateShort } from "#/lib/date-utils"
import type { Rule, RuleContext, StateConfig } from "#/data/states/types"

const smallEstateAffidavit: Rule = {
  id: "tx-small-estate-affidavit",
  phase: "this-month",
  trigger: (answers) => answers.will !== "yes",
  copy: (ctx: RuleContext) => {
    const availableDate = formatDateShort(addDays(ctx.dateOfDeath, 30))
    const notSure = ctx.answers.will === "not-sure"
    return {
      title: "There may be a shorter path than full probate",
      body: notSure
        ? `If it turns out there wasn't a will, and what's left (not counting the house) adds up to $75,000 or less, Texas has a simpler option called a small estate affidavit — a judge still has to approve it, and it can't be filed until ${availableDate}, thirty days out. Nothing to act on yet, just good to know it exists.`
        : `Since there wasn't a will, and if what's left (not counting the house) adds up to $75,000 or less, Texas allows a small estate affidavit instead of full probate. A judge still has to approve it, and it can't be filed until ${availableDate} — thirty days after the date of death. Worth asking an attorney about once you've had a chance to take stock.`,
    }
  },
}

const independentAdministration: Rule = {
  id: "tx-independent-administration",
  phase: "this-month",
  trigger: (answers) => answers.will === "yes",
  copy: () => ({
    title: "Having a will tends to make this more straightforward",
    body: "In Texas, when there's a will, the executor can usually ask the court for what's called independent administration — meaning far less court supervision and paperwork than a full probate. It's the more common path when a will exists, and it's simpler than people expect.",
  }),
}

const creditorWindow: Rule = {
  id: "tx-creditor-window",
  phase: "months-ahead",
  trigger: () => true,
  copy: (ctx: RuleContext) => {
    const start = formatDateShort(addMonths(ctx.dateOfDeath, 4))
    const end = formatDateShort(addMonths(ctx.dateOfDeath, 6))
    return {
      title: "There's a general window for creditors to come forward",
      body: `Texas gives creditors a general period to make claims against the estate — typically somewhere around four to six months out, so roughly ${start} through ${end}. This is part of why it's worth waiting before distributing anything, not something you need to track day by day.`,
    }
  },
}

export const texas: StateConfig = {
  code: "TX",
  name: "Texas",
  rules: [smallEstateAffidavit, independentAdministration, creditorWindow],
}

/** Anchor date used by the "don't distribute money yet" protection card. */
export function creditorProtectionDate(dateOfDeath: Date): Date {
  return addMonths(dateOfDeath, 6)
}
