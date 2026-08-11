/**
 * Data for the Care Circle section — concrete ways friends and family can
 * help with tasks and time. Deliberately never vendors, prices, or booking:
 * this is a place to put "what can I do?", not a marketplace.
 *
 * Claimed state persists (see intake-context.tsx); a slot's `claimedBy` /
 * `claimedNote` here just seeds the default progress state, so the demo
 * always opens with one slot already spoken for.
 */
export interface CareCircleSlot {
  id: string
  label: string
  detail: string
  /** Seed only — who has this one, for the slots that start pre-claimed. */
  claimedBy?: string
  /** Seed only — a short note next to the claimed name, e.g. "Tuesday dinner". */
  claimedNote?: string
}

export const careCircleSlots: CareCircleSlot[] = [
  {
    id: "care-meals",
    label: "Meals",
    detail: "A dinner dropped off, a grocery run — whatever's easiest for whoever's offering.",
    claimedBy: "Dana",
    claimedNote: "Tuesday dinner",
  },
  {
    id: "care-rides",
    label: "Rides and airport pickups",
    detail: "Getting someone to or from the airport, or just around town for a few days.",
  },
  {
    id: "care-pets",
    label: "Pet care",
    detail: "Walks, feeding, a place for them to stay if things get chaotic at home.",
  },
  {
    id: "care-kids",
    label: "Kids and school runs",
    detail: "Pickup, drop-off, or just an extra set of hands after school.",
  },
  {
    id: "care-house",
    label: "House tasks",
    detail: "Mail, trash day, watering plants, a load of laundry — the small stuff that piles up.",
  },
]

/**
 * Who a timeline task can be handed to (see the "Ask someone" exit in
 * timeline-section.tsx) — the same names already in play elsewhere in the
 * demo: Dana from the seeded Care Circle claim above, and the Sister/Brother
 * assignees used in family-view.tsx and notification-tracker.tsx.
 */
export const careCirclePeople = ["Dana", "Sister", "Brother"] as const
