import type { AssetKey, WillStatus } from "#/types/intake"

/** Recommended certificate count, nudged up slightly for larger estates. Stays within 10-12. */
export function recommendedCertificateCount(assets: AssetKey[]): number {
  return Math.min(12, 10 + Math.max(0, assets.length - 1))
}

export interface FamilyTask {
  id: string
  label: string
  assignee: "You" | "Renee" | "Sam"
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
    { id: "family-mail", label: "Keep an eye on the mail and bills", assignee: "Renee" },
  ]

  if (assets.includes("home")) {
    tasks.push({ id: "family-home", label: "Check on the house once a week", assignee: "Sam" })
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
  /** Optional detail shown under the label, for items that need more than a name to be useful. */
  note?: string
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
      label: will === "yes" ? "Banks, bring the will when you call" : "Banks and financial institutions",
      needsCert: true,
    },
  ]

  if (assets.includes("car")) {
    items.push({
      id: "notify-dmv",
      label: "DMV, title transfer for the car",
      needsCert: true,
      note: "If there's more than one vehicle, each one is its own title transfer, filed separately.",
    })
  }
  if (assets.includes("investments")) {
    items.push({ id: "notify-brokerage", label: "Brokerage", needsCert: true })
  }

  items.push(
    { id: "notify-subscriptions", label: "Subscriptions and phone plan", needsCert: false },
    {
      id: "notify-employer",
      label:
        "Employer's HR or benefits team, if they were working, or retired from an employer with benefits",
      needsCert: true,
      // COBRA continuation for a surviving spouse: generally up to 36 months
      // after the covered employee's death. 29 U.S.C. § 1163.
      note: "Group life insurance, an accidental death rider, a final paycheck, unused PTO, and 401(k) or pension beneficiaries usually go through HR or benefits, not an insurer directly. A surviving spouse can generally continue coverage through COBRA for up to 36 months.",
    },
  )

  return items
}
