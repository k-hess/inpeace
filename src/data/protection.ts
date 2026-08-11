import { formatDateLong } from "#/lib/date-utils"
import { creditorProtectionDate as caCreditorDate } from "#/data/states/ca"
import { creditorProtectionDate as txCreditorDate } from "#/data/states/tx"
import type { RuleContext } from "#/data/states/types"
import type { SimpleCard } from "#/data/common-types"

function creditorProtectionDate(ctx: RuleContext): Date {
  return ctx.state === "TX" ? txCreditorDate(ctx.dateOfDeath) : caCreditorDate(ctx.dateOfDeath)
}

export const protectionCards: SimpleCard[] = [
  {
    id: "protect-crypto",
    trigger: (answers) => answers.assets.includes("crypto"),
    copy: () => ({
      title: "Keep the crypto keys safe",
      body: "Unlike almost everything else on this page, a lost seed phrase can't be recovered by any bank, company, or process. The common way it happens is a notebook or hardware wallet gets thrown out or given away while a house is being cleared. Before anything gets cleared out, know where these are.",
    }),
  },
  {
    id: "protect-dont-distribute",
    trigger: () => true,
    copy: (ctx) => ({
      title: "Wait on distributing anything",
      body: `Don't distribute or promise money to anyone yet, even close family. In ${ctx.state === "TX" ? "Texas" : "California"}, creditors have a window to make claims, into roughly ${formatDateLong(
        creditorProtectionDate(ctx),
      )}. If money goes out before that window closes, you can end up personally on the hook for it. Waiting protects you as well as the estate.`,
    }),
  },
  {
    id: "protect-no-cards",
    trigger: () => true,
    copy: () => ({
      title: "Leave their cards alone",
      body: "Don't use their credit or debit cards, even to cover their own expenses or to keep something running. It can look like fraud from the outside, even when the intention is completely innocent. Pay from your own account for now and sort out reimbursement later.",
    }),
  },
  {
    id: "protect-no-big-decisions",
    trigger: () => true,
    copy: (ctx) => ({
      title: "Put off the big, irreversible calls",
      body: ctx.answers.assets.includes("home")
        ? "Try not to sell the house, move, or make other big, irreversible decisions in these first few months. There's no deadline pushing you toward any of it, and it's much easier to decide well once the fog has lifted a little."
        : "Try not to make big, irreversible decisions in these first few months, like moving or a major purchase. There's no deadline pushing you toward any of it, and it's easier to decide well once the fog has lifted a little.",
    }),
  },
]
