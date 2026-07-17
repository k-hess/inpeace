import type { AssetKey, WillStatus } from "#/types/intake"

/** Recommended certificate count, nudged up slightly for larger estates. Stays within 10-12. */
export function recommendedCertificateCount(assets: AssetKey[]): number {
  return Math.min(12, 10 + Math.max(0, assets.length - 1))
}

export interface FamilyTask {
  id: string
  label: string
  assignee: "You" | "Sister" | "Brother"
}

/**
 * A mock shared family view — deterministic so the same scenario always
 * shows the same assignments. Only rendered when support === "family".
 */
export function buildFamilyTasks(assets: AssetKey[], will: WillStatus | null): FamilyTask[] {
  // The load is deliberately lopsided toward "You". That's the finding this
  // whole view exists for: one person absorbs most of the work, and the rest
  // of the family has no way to see it.
  const tasks: FamilyTask[] = [
    { id: "family-certificates", label: "Order the death certificates", assignee: "You" },
    { id: "family-will", label: will === "yes" ? "Bring the will to the attorney call" : "Check for a will", assignee: "You" },
    { id: "family-banks", label: "Call the banks and financial institutions", assignee: "You" },
    { id: "family-ssa", label: "Sort out Social Security", assignee: "You" },
    { id: "family-mail", label: "Keep an eye on the mail and bills", assignee: "Sister" },
  ]

  if (assets.includes("home")) {
    tasks.push({ id: "family-home", label: "Check on the house once a week", assignee: "Brother" })
  }
  if (assets.includes("crypto")) {
    tasks.push({ id: "family-crypto", label: "Secure the crypto seed phrase", assignee: "You" })
  }

  return tasks
}

export interface NotificationItem {
  id: string
  label: string
  needsCert: boolean
}

/**
 * The fan-out nobody tracks: every institution that needs to hear about
 * the death, derived from the same intake assets/will as the rest of the
 * plan. `needsCert` flags the ones that typically ask for a certified
 * copy of the death certificate — ties back to DeathCertTracker.
 */
export function buildNotifications(assets: AssetKey[], will: WillStatus | null): NotificationItem[] {
  const items: NotificationItem[] = [
    { id: "notify-ssa", label: "Social Security", needsCert: true },
    {
      id: "notify-banks",
      label: will === "yes" ? "Banks — bring the will when you call" : "Banks and financial institutions",
      needsCert: true,
    },
  ]

  if (assets.includes("car")) {
    items.push({ id: "notify-dmv", label: "DMV — title transfer for the car", needsCert: true })
  }
  if (assets.includes("investments")) {
    items.push({ id: "notify-brokerage", label: "Brokerage", needsCert: true })
  }

  items.push(
    { id: "notify-subscriptions", label: "Subscriptions and phone plan", needsCert: false },
    { id: "notify-employer", label: "Employer", needsCert: false },
  )

  return items
}
