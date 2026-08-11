import type { SimpleCard } from "#/data/common-types"

/**
 * The things people panic about that genuinely have no deadline. Deliberately
 * short and plain — the point is the relief of the list, not its thoroughness.
 */
export const canWaitItems: SimpleCard[] = [
  {
    id: "wait-house",
    trigger: (answers) => answers.assets.includes("home"),
    copy: () => ({
      title: "The house can wait",
      body: "Deciding whether to keep it, sell it, or do anything at all with it can wait months. If it's sitting empty, ask a neighbor to grab the mail. That's all it needs for now.",
    }),
  },
  {
    id: "wait-accounts",
    trigger: () => true,
    copy: () => ({
      title: "The accounts can wait",
      body: "Moving money around, closing accounts, and deciding what to do with investments can all wait. None of it needs to happen this week, or this month.",
    }),
  },
  {
    id: "wait-belongings",
    trigger: () => true,
    copy: () => ({
      title: "Their things can wait",
      body: "Clothes, furniture, the stuff in the garage. There's no deadline on any of it. Some families wait a year before touching a room. That's normal.",
    }),
  },
  {
    id: "wait-car",
    trigger: (answers) => answers.assets.includes("car"),
    copy: () => ({
      title: "The car can wait",
      body: "Retitling it, selling it, deciding who drives it. It can sit in the driveway for now.",
    }),
  },
  {
    id: "wait-telling-people",
    trigger: () => true,
    copy: () => ({
      title: "Telling everyone can wait",
      body: "You don't owe anyone an announcement on a schedule. Reach extended family, old friends, and distant coworkers whenever you have the bandwidth, in whatever order makes sense to you.",
    }),
  },
]
