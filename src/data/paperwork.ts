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
  const tasks: FamilyTask[] = [
    { id: "family-certificates", label: "Order the death certificates", assignee: "You" },
    { id: "family-will", label: will === "yes" ? "Bring the will to the attorney call" : "Check for a will", assignee: "Sister" },
    { id: "family-banks", label: "Call the banks and financial institutions", assignee: "Brother" },
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
