import { formatDateLong } from "#/lib/date-utils"
import type { Rule } from "#/data/states/types"

function nextAprilFifteenth(dateOfDeath: Date): Date {
  return new Date(dateOfDeath.getFullYear() + 1, 3, 15)
}

/** Practical, state-agnostic tasks woven into the timeline alongside the state rules. */
export const commonPacingRules: Rule[] = [
  {
    id: "pacing-order-certificates",
    phase: "this-week",
    trigger: () => true,
    copy: () => ({
      title: "Order copies of the death certificate",
      body: "You'll need more than you'd think — banks, insurance, the DMV, and others will each want an original. Ordering a small stack now saves you from re-ordering later; there's a tracker for this further down the page.",
    }),
  },
  {
    id: "pacing-find-will",
    phase: "this-week",
    trigger: (answers) => answers.will !== "yes",
    copy: (ctx) => ({
      title: "Look for a will",
      body:
        ctx.answers.will === "not-sure"
          ? "Not knowing yet is genuinely common — check with any attorney they may have used, a safe deposit box, or a file cabinet at home. If nothing turns up in the next week or two, that's useful information too, not a crisis."
          : "Since it sounds like there wasn't one, it's still worth a quick look through paperwork and safe deposit boxes just in case — but if you've already checked, there's nothing more to do here.",
    }),
  },
  {
    id: "pacing-have-will",
    phase: "this-week",
    trigger: (answers) => answers.will === "yes",
    copy: (ctx) => ({
      title: `You already have ${ctx.answers.firstName ? `${ctx.answers.firstName}'s` : "the"} will`,
      body: "That's one real thing off the list. Keep it somewhere you can get to easily — you'll want it on hand for the attorney conversation and for opening accounts later.",
    }),
  },
  {
    id: "pacing-notify-institutions",
    phase: "this-month",
    trigger: (answers) => answers.assets.length > 0,
    copy: () => ({
      title: "Let the banks and financial institutions know",
      body: "Once you have death certificates in hand, letting banks, brokerages, and other institutions know is mostly a matter of phone calls and paperwork. It's tedious, not urgent — a few a week is plenty.",
    }),
  },
  {
    id: "pacing-beneficiary-reassurance",
    phase: "this-month",
    trigger: (answers) => answers.assets.includes("retirement") || answers.assets.includes("investments"),
    copy: () => ({
      title: "Retirement accounts and investments are usually simpler",
      body: "Accounts like a 401k, IRA, or brokerage account typically pass directly to whoever's named as beneficiary, outside of probate entirely. It's worth confirming the named beneficiary is still correct, but this part is usually simpler than people fear.",
    }),
  },
  {
    id: "pacing-final-tax-return",
    phase: "months-ahead",
    trigger: () => true,
    copy: (ctx) => ({
      title: "Their final tax return — next spring, not now",
      body: `A final return still gets filed for the year they died — due ${formatDateLong(
        nextAprilFifteenth(ctx.dateOfDeath),
      )}. Nothing about it needs attention now; it's on the list so it never surprises you.`,
    }),
  },
]
