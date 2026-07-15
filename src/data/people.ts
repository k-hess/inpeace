import type { Rule } from "#/data/states/types"

/**
 * "People who can help" cards, woven into the pacing timeline at the phase
 * where they tend to be most useful. The financial advisor card is marked
 * `quiet` and should render as the least visually prominent card on the
 * page — a mention, not a pitch.
 */
export const peopleCards: (Rule & { quiet?: boolean })[] = [
  {
    id: "people-hospice",
    phase: "this-week",
    trigger: () => true,
    copy: () => ({
      title: "Hospice bereavement support",
      body: "If hospice was involved at all, most programs include free grief support for family — often for a year or more — and most families never call. It costs nothing to ask what's available.",
    }),
  },
  {
    id: "people-doula",
    phase: "this-week",
    trigger: () => true,
    copy: () => ({
      title: "A death doula",
      body: "Death doulas aren't just for the dying — many work with families afterward too, helping you move through the logistics and the grief side by side. Worth knowing this kind of support exists, even if you don't end up using it.",
    }),
  },
  {
    id: "people-grief-support",
    phase: "this-month",
    trigger: () => true,
    copy: () => ({
      title: "Grief counselors and support groups",
      body: "Individual counseling and peer support groups both help, and often in different ways — one on one, or with people who understand exactly what this week has been like. No rush to start; it helps whenever you're ready.",
    }),
  },
  {
    id: "people-estate-attorney",
    phase: "this-month",
    trigger: (answers) => answers.will !== "yes" || answers.assets.includes("home") || answers.assets.includes("investments"),
    copy: () => ({
      title: "An estate attorney",
      body: "This is the point where a short conversation with an estate attorney tends to pay for itself — confirming the right path, catching anything unusual, and giving you a plan instead of a guess. Most offer a first call at low or no cost.",
    }),
  },
  {
    id: "people-financial-advisor",
    phase: "months-ahead",
    trigger: (answers) =>
      answers.assets.includes("retirement") || answers.assets.includes("investments") || answers.assets.includes("bank"),
    quiet: true,
    copy: () => ({
      title: "When accounts start to transfer",
      body: "Down the line, once accounts begin moving into your name, an introduction to a vetted, fee-only financial advisor is available if it's ever useful. No pressure, no pitch — just there if you want it.",
    }),
  },
]
