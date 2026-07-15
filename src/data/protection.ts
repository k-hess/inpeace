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
    id: "protect-dont-distribute",
    trigger: () => true,
    copy: (ctx) => ({
      title: "Protect yourself: wait on distributing anything",
      body: `Don't distribute or promise money to anyone yet, even close family. In ${ctx.state === "TX" ? "Texas" : "California"}, creditors have a window to make claims — into roughly ${formatDateLong(
        creditorProtectionDate(ctx),
      )} — and if money goes out before that window closes, you can end up personally on the hook for it. Waiting protects you, not just the estate.`,
    }),
  },
  {
    id: "protect-no-cards",
    trigger: () => true,
    copy: () => ({
      title: "Protect yourself: leave their cards alone",
      body: "Don't use their credit or debit cards, even to cover their own expenses or to keep something running. It can look like fraud from the outside, even when the intention is completely innocent — better to pay from your own account for now and sort out reimbursement later.",
    }),
  },
  {
    id: "protect-crypto",
    trigger: (answers) => answers.assets.includes("crypto"),
    copy: () => ({
      title: "Protect yourself: find the crypto keys today",
      body: "This is genuinely the one thing on this whole page that can't wait. Track down the seed phrase or private keys — a notebook, a password manager, a hardware wallet — and get them somewhere safe. Unlike almost everything else here, a lost key isn't a delay, it's a permanent loss.",
    }),
  },
  {
    id: "protect-no-big-decisions",
    trigger: () => true,
    copy: (ctx) => ({
      title: "Protect yourself: put off the big, irreversible calls",
      body: ctx.answers.assets.includes("home")
        ? "Try not to sell the house, move, or make other big, irreversible decisions in these first few months. There's no deadline pushing you toward any of it, and it's much easier to decide well once the fog has lifted a little."
        : "Try not to make big, irreversible decisions — moving, major purchases, anything hard to undo — in these first few months. There's no deadline pushing you toward any of it, and it's easier to decide well once the fog has lifted a little.",
    }),
  },
]
