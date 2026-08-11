// The funeral home is the single largest unshopped purchase in the whole
// process, made in shock, often on the same day as the death. Knowing the
// rough price ranges and the rules that already protect you is the entire
// defense — nobody needs a vendor recommendation, they need to know what a
// fair price looks like and what they're legally entitled to ask for.

export interface CostRange {
  id: string
  label: string
  low: number
  high: number
  note: string
}

/**
 * US national ballparks. Regional variation is large — a number here is a
 * sanity check, not a quote.
 */
export const costRanges: CostRange[] = [
  {
    id: "cost-full-funeral",
    label: "Full funeral with viewing and burial",
    low: 7000,
    high: 12000,
    note: "Regional variation is large, and this doesn't include the cemetery plot, opening/closing fee, or headstone.",
  },
  {
    id: "cost-cremation-service",
    label: "Cremation with a viewing and service",
    low: 5000,
    high: 8000,
    note: "Regional variation is large.",
  },
  {
    id: "cost-direct-cremation",
    label: "Direct cremation (no viewing or service)",
    low: 1000,
    high: 3000,
    note: "Regional variation is large.",
  },
  {
    id: "cost-cemetery",
    label: "Cemetery plot, opening/closing, and a marker",
    low: 2000,
    high: 6000,
    note: "This is on top of the funeral home's bill, and regional variation is large.",
  },
  {
    id: "cost-wake",
    label: "A wake or reception",
    low: 500,
    high: 2000,
    note: "Depends heavily on venue and catering, and regional variation is large.",
  },
]

export interface GuidanceItem {
  id: string
  title: string
  body: string
}

/**
 * The FTC Funeral Rule, stated plainly and only as far as it actually goes —
 * nothing here is invented beyond what the rule covers.
 */
export const yourRights: GuidanceItem[] = [
  {
    id: "rights-price-list",
    title: "You get an itemized price list, on paper, to keep",
    body: "You're entitled to a General Price List, on paper, to keep, at the start of any in-person conversation about arrangements.",
  },
  {
    id: "rights-phone-quotes",
    title: "You can get prices over the phone",
    body: "They must quote prices over the phone if you ask. You never have to visit in person to find out what something costs.",
  },
  {
    id: "rights-buy-individual-items",
    title: "You can buy items individually, not just as a package",
    body: "You can buy individual items instead of a package. A funeral home cannot require you to buy a package to get the items you want.",
  },
  {
    id: "rights-outside-casket",
    title: "You can bring your own casket or urn",
    body: "You can buy a casket or urn somewhere else, and they cannot refuse it or charge you a handling fee for using it.",
  },
  {
    id: "rights-embalming",
    title: "Embalming usually isn't required by law",
    body: "Embalming is not routinely required by law, and they have to tell you that rather than presenting it as mandatory.",
  },
]

export const whatToAsk: string[] = [
  "Can I see the itemized price list?",
  "What's included in this package, and what isn't?",
  "What cemetery fees are there, and who are they paid to?",
  "What's the total, out-the-door figure, in writing?",
  "What happens if we change our mind?",
]

export const redFlags: string[] = [
  "Pricing that's only offered as packages, never itemized",
  "Pressure to decide today",
  "Refusing to give any numbers over the phone",
  "Upselling caskets as a measure of love",
  "Vague \"cash advance\" line items with no breakdown",
]
