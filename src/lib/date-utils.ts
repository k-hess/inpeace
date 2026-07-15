// Small date-math helpers. Dates of death are stored as "YYYY-MM-DD"
// strings and parsed as local dates (not UTC) so day math doesn't drift
// across timezones.

export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number)
  return new Date(year, (month ?? 1) - 1, day ?? 1)
}

export function toISODate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date)
  const targetMonth = result.getMonth() + months
  result.setMonth(targetMonth)
  return result
}

/** "June 24" — no year, since the year is usually implied and it reads calmer. */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
}

/** "June 24, 2026" — used when the year isn't obvious from context. */
export function formatDateLong(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

/** Default date-of-death for a fresh intake: about two weeks ago. */
export function defaultDateOfDeath(): string {
  return toISODate(addDays(new Date(), -14))
}

export function daysSince(iso: string): number {
  const then = parseISODate(iso)
  const now = new Date()
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.floor((now.setHours(0, 0, 0, 0) - then.setHours(0, 0, 0, 0)) / msPerDay)
}
