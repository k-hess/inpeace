// The through-line across every one of these relationships: you can
// predict the advice you'll get from how the person is paid. Fee-only
// advisors and flat-fee attorneys give different guidance than commissioned
// salespeople and litigious hourly billers — not because one side is
// dishonest, but because incentives quietly shape recommendations. So the
// single most useful thing we can teach is to ask about compensation before
// asking about anything else.

export interface ChoosingGuide {
  id: string
  role: string
  theQuestion: string
  lookFor: string[]
  watchFor: string[]
  note?: string
}

export const choosingGuides: ChoosingGuide[] = [
  {
    id: "choosing-financial-advisor",
    role: "A financial advisor",
    theQuestion: "Are you a fiduciary at all times, and how are you paid?",
    lookFor: [
      "Fee-only compensation: a flat fee, hourly, or a percentage of assets, with no commissions",
      "A written fiduciary commitment",
      "Registration you can verify yourself through the SEC's Investment Adviser Public Disclosure site and FINRA BrokerCheck",
      "NAPFA membership or CFP certification as signals worth weighing",
    ],
    watchFor: [
      "\"Fee-based\" sounds like fee-only but includes commissions",
      "Anyone compensated for moving the money into a product they sell",
      "Pressure to consolidate the inheritance quickly",
    ],
    note: "There is nothing wrong with waiting. An inheritance can sit in cash for a few months while you decide. This matters most right at the moment an inheritance arrives, since that's the highest-stakes financial decision most people ever make.",
  },
  {
    id: "choosing-estate-attorney",
    role: "An estate or probate attorney",
    theQuestion: "How do you charge for this: flat fee, hourly, or a percentage of the estate?",
    lookFor: [
      "A written fee agreement",
      "Clarity on who does the work, the attorney or a paralegal",
      "Someone who handles this county's probate court routinely",
    ],
    watchFor: ["An incentive to litigate rather than settle, since conflict generates hours"],
    note: "Fee structures are state-specific. California sets a statutory fee schedule for probate attorney compensation based on the gross value of the estate. It's a published schedule rather than a negotiation.",
  },
  {
    id: "choosing-tax-preparer",
    role: "A tax preparer",
    theQuestion: "Are you credentialed, and have you filed a final return and an estate return before?",
    lookFor: [
      "A CPA, enrolled agent, or attorney, credentials that carry unlimited representation rights before the IRS",
      "The IRS's public directory of credentialed preparers, as a way to check",
      "Experience specifically with a decedent's final individual return and, where required, an estate income tax return",
    ],
    watchFor: [
      "Seasonal storefront preparers with no credential, who have limited representation rights",
      "Someone who may not be reachable a year later when a notice arrives",
    ],
  },
  {
    id: "choosing-funeral-home",
    role: "A funeral home",
    theQuestion: "Can I have your itemized price list to take with me?",
    lookFor: ["Prices given willingly over the phone", "Itemized pricing", "No pressure to decide today"],
    watchFor: ["Package-only pricing", "Casket upselling framed as a measure of love"],
    note: "The rights that back this up are already covered in the funeral guidance section. Worth reviewing alongside this one.",
  },
]
