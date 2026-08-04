import type { IntakeAnswers } from "#/types/intake"

// The core stance of this whole module, stated plainly so nobody adds a
// field that violates it later: we record WHERE things are and HOW to get
// access, never the secrets themselves. No password fields, no account
// numbers, no seed phrases. See `accessNote` below for the user-facing
// version of this same idea.

export type InventoryCategoryId = "money" | "recurring" | "documents" | "people" | "digital" | "property"

export interface InventoryItem {
  id: string
  label: string
  /** The practical hint that makes this findable — where it actually turns up. */
  whereToLook: string
  /** Only shown when intake answers make it relevant. Omit for universal items. */
  trigger?: (answers: IntakeAnswers) => boolean
  /** Things people routinely discover months late. Rendered with emphasis. */
  easilyMissed?: boolean
}

export interface InventoryGroup {
  id: InventoryCategoryId
  label: string
  blurb: string
  items: InventoryItem[]
}

/** Why we deliberately store the path to access, never the credential itself. */
export const accessNote: { title: string; body: string } = {
  title: "We don't ask for passwords",
  body: "This list never asks for a password, an account number, or a seed phrase. We record where the password manager is, who the recovery contact is, and what each company's bereavement process actually requires to grant access — so there's nothing here worth stealing, and nothing you're trusting us with that a thief could use.",
}

export const inventoryGroups: InventoryGroup[] = [
  {
    id: "money",
    label: "Money",
    blurb: "Everywhere money sits or is owed — the accounts, the policies, the loans.",
    items: [
      { id: "money-bank", label: "Bank accounts", whereToLook: "Recent statements, mail, or the banking app on their phone." },
      { id: "money-cards", label: "Credit cards", whereToLook: "Their wallet, recent statements, or a credit report pull." },
      { id: "money-brokerage", label: "Brokerage accounts", whereToLook: "Tax documents (1099s) or statements from a brokerage." },
      { id: "money-retirement", label: "Retirement accounts (401k/IRA)", whereToLook: "Pay stubs, HR benefits portal, or year-end account statements." },
      { id: "money-pension", label: "Pensions", whereToLook: "Former employer's HR or benefits department." },
      { id: "money-hsa", label: "HSA", whereToLook: "Payroll deductions on a pay stub, or the HSA provider's statements." },
      { id: "money-safe-deposit", label: "Safe deposit box", whereToLook: "A small key in a drawer or lockbox, and a bank statement showing a rental fee." },
      {
        id: "money-life-insurance",
        label: "Life insurance policies",
        whereToLook: "Old paperwork, the employer's benefits summary, or a state unclaimed-property search.",
        easilyMissed: true,
      },
      { id: "money-loans", label: "Outstanding loans", whereToLook: "Mail, a credit report pull, or bank statement recurring payments." },
    ],
  },
  {
    id: "recurring",
    label: "Recurring",
    blurb: "The things that keep charging on autopilot until someone tells them to stop.",
    items: [
      { id: "recurring-subscriptions", label: "Subscriptions and streaming", whereToLook: "The App Store or Google Play subscription list, or a search of their email for \"your subscription\" and \"renews.\"" },
      { id: "recurring-phone", label: "Phone plan", whereToLook: "The last 3 months of bank or card statements for the carrier's name." },
      { id: "recurring-insurance", label: "Insurance premiums", whereToLook: "Recurring charges on bank or card statements, or a search of their email for \"your policy.\"" },
      { id: "recurring-memberships", label: "Gym or club memberships", whereToLook: "Recurring charges on bank or card statements." },
      { id: "recurring-storage", label: "Storage units", whereToLook: "Recurring charges on bank or card statements, or a physical key or gate code on their keyring." },
      { id: "recurring-charitable", label: "Charitable recurring gifts", whereToLook: "A search of their email for \"receipt\" and \"thank you for your donation,\" or recurring charges on statements." },
      {
        id: "recurring-domains",
        label: "Domain and hosting renewals",
        whereToLook: "A search of their email for \"renews\" and \"receipt,\" or recurring charges on card statements.",
        easilyMissed: true,
      },
    ],
  },
  {
    id: "documents",
    label: "Documents",
    blurb: "The paperwork that everything else depends on.",
    items: [
      { id: "documents-will", label: "Will or trust", whereToLook: "A home safe, a filing cabinet, or the estate attorney who drafted it." },
      { id: "documents-deed", label: "Deed", whereToLook: "A home safe, filing cabinet, or the county recorder's office." },
      { id: "documents-vehicle-titles", label: "Vehicle titles", whereToLook: "A home safe, filing cabinet, or the glove compartment." },
      { id: "documents-marriage-divorce", label: "Marriage or divorce decrees", whereToLook: "A home safe or filing cabinet, or the county clerk where it was filed." },
      {
        id: "documents-dd214",
        label: "Military discharge (DD-214)",
        whereToLook: "A home safe or filing cabinet, or request a copy from the National Archives.",
        trigger: (answers) => answers.veteran,
      },
      { id: "documents-tax-returns", label: "Tax returns from the last few years", whereToLook: "A filing cabinet, tax software account, or the accountant who prepared them." },
      {
        id: "documents-prepaid-funeral",
        label: "Pre-paid funeral or cemetery contracts",
        whereToLook: "A home safe or filing cabinet, or a call to the funeral home or cemetery to check for a contract on file.",
        easilyMissed: true,
      },
    ],
  },
  {
    id: "people",
    label: "People",
    blurb: "The professionals who already know pieces of this and can move faster than starting from scratch.",
    items: [
      { id: "people-attorney", label: "Estate attorney", whereToLook: "The will itself often names who drafted it, or check recent email and calendar for meetings." },
      { id: "people-accountant", label: "Accountant or tax preparer", whereToLook: "Last year's tax return usually has a preparer's name and contact on it." },
      { id: "people-advisor", label: "Financial advisor", whereToLook: "Brokerage or retirement account statements often list an advisor's contact." },
      { id: "people-insurance-agent", label: "Insurance agent", whereToLook: "The policy paperwork or a recent premium statement." },
      { id: "people-employer-hr", label: "Employer HR contact", whereToLook: "A recent pay stub or benefits enrollment email." },
      { id: "people-executor", label: "Executor named in the will", whereToLook: "The will itself — usually named in the first page or two." },
    ],
  },
  {
    id: "digital",
    label: "Digital",
    blurb: "Accounts and access that don't show up in a filing cabinet.",
    items: [
      { id: "digital-password-manager", label: "Password manager and recovery contact", whereToLook: "Check their phone or laptop for a password manager app, and who they've listed as a recovery or emergency contact within it." },
      { id: "digital-email", label: "Email accounts", whereToLook: "Their phone's mail app, or a recent bill that lists a contact email." },
      { id: "digital-phone-passcode", label: "Phone passcode", whereToLook: "Ask family who used the phone with them, or check for it written down near other passwords." },
      { id: "digital-cloud-storage", label: "Cloud storage and photos", whereToLook: "Their phone's settings, or an email account's linked services." },
      { id: "digital-social", label: "Social accounts", whereToLook: "Their phone's home screen, or a search of their email for account confirmation messages." },
      {
        id: "digital-income-accounts",
        label: "Any account that pays out money",
        whereToLook: "Bank deposit descriptions for unfamiliar recurring credits — ad revenue, royalties, or rebates.",
        easilyMissed: true,
      },
    ],
  },
  {
    id: "property",
    label: "Property",
    blurb: "The physical things that need someone looking after them, starting now.",
    items: [
      {
        id: "property-home",
        label: "Home",
        whereToLook: "You likely already know the address — the deed or a recent utility bill confirms it.",
        trigger: (answers) => answers.assets.includes("home"),
      },
      {
        id: "property-vehicles",
        label: "Vehicles",
        whereToLook: "The title in a filing cabinet, or the registration in the glove compartment.",
        trigger: (answers) => answers.assets.includes("car"),
      },
      { id: "property-storage", label: "Storage", whereToLook: "A physical key or gate code on their keyring, or a recurring charge on a bank statement." },
      { id: "property-keys", label: "Anything with keys", whereToLook: "Gather every key on their keyring and in drawers before figuring out what each one opens." },
      {
        id: "property-pets",
        label: "Pets",
        whereToLook: "This one doesn't need looking for — it's whoever fed and walked them yesterday. A pet is a living responsibility that lands on someone immediately, not something that can wait.",
        easilyMissed: true,
      },
    ],
  },
]
