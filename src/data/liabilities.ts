import type { SimpleCard } from "#/data/common-types"

/**
 * Debt is the area where a wrong flat statement would actually hurt someone,
 * so every card here is hedged and ends by pointing at the estate attorney
 * for their specific situation rather than answering it ourselves.
 */
export const liabilityCards: SimpleCard[] = [
  {
    id: "liability-estate-pays",
    trigger: () => true,
    copy: () => ({
      title: "The estate pays the debts, not you",
      body: "Generally, debts are paid out of the estate before anything is distributed. Relatives don't personally inherit debt by being related. The exceptions are what matter: you co-signed, you were a joint account holder, or state law puts a spouse on the hook. If any of those might apply to you, run it by an estate attorney before assuming either way.",
    }),
  },
  {
    id: "liability-community-property",
    trigger: () => true,
    copy: (ctx) => ({
      title: "Community property can change what a spouse owes",
      body:
        ctx.state === "TX"
          ? "Texas is a community-property state, which can change a surviving spouse's exposure to debts incurred during the marriage. The details depend on the specific debt and how it was structured. An estate attorney can tell you where you stand."
          : "California is a community-property state, which can change a surviving spouse's exposure to debts incurred during the marriage. The details depend on the specific debt and how it was structured. An estate attorney can tell you where you stand.",
    }),
  },
  {
    id: "liability-student-loans",
    trigger: () => true,
    copy: () => ({
      title: "Student loans usually work differently by type",
      body: "Federal student loans are generally discharged on death. Private loans vary, and a co-signer can still be on the hook. It's worth checking the terms of the specific loan, or asking an estate attorney if anything looks unclear.",
    }),
  },
  {
    id: "liability-mortgage",
    trigger: (answers) => answers.assets.includes("home"),
    copy: () => ({
      title: "The mortgage doesn't pause itself",
      body: "The loan doesn't vanish. Someone has to keep paying while the house is sorted out, or the lender can eventually foreclose. An estate attorney can help you figure out who should be covering it and for how long.",
    }),
  },
  {
    id: "liability-dont-rush",
    trigger: () => true,
    copy: () => ({
      title: "Don't rush to pay anything",
      body: "There's an order in which debts get paid, and paying a low-priority creditor early out of your own pocket is a common and expensive mistake. It's fine to let bills sit unpaid for now while the bigger picture gets sorted. An estate attorney can tell you what needs to move first.",
    }),
  },
  {
    id: "liability-unknown-debts",
    trigger: () => true,
    copy: () => ({
      title: "Watch for debts you don't know about yet",
      body: "The mail and a credit report are usually how hidden debts surface: a statement that keeps arriving, a collections letter, an account you didn't know existed. Give it a few months before assuming you've seen everything, and loop in an estate attorney if something unexpected turns up.",
    }),
  },
]
