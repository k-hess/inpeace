import type { IntakeAnswers } from "#/types/intake"

// This module now records two things: WHERE each item is, and any DETAIL
// the family chooses to leave alongside it, a login, an account nickname,
// a combination, whatever makes it usable later. Nothing here is
// encrypted or validated; it's free text the family enters themselves.
// The product's job is to hold it safely and show who added what. See
// `accessNote` below for the user-facing version of this same idea.

export type InventoryCategoryId = "money" | "recurring" | "documents" | "people" | "digital" | "property"

export interface InventoryItem {
  id: string
  label: string
  /** The practical hint that makes this findable — where it actually turns up. Written for the after-death reader searching on someone else's behalf. */
  whereToLook: string
  /**
   * The "for-self" variant of the same hint. The reader already knows where
   * their own accounts and belongings are, so this is usually reframed from
   * "where to search" to "what to write down and where to leave it" —
   * never a mechanical they→you swap. Falls back to `whereToLook` if unset.
   */
  whereToLookSelf?: string
  /** Only shown when intake answers make it relevant. Omit for universal items. */
  trigger?: (answers: IntakeAnswers) => boolean
  /** Things people routinely discover months late. Rendered with emphasis. */
  easilyMissed?: boolean
}

export interface InventoryGroup {
  id: InventoryCategoryId
  label: string
  blurb: string
  /** The "for-self" variant of `blurb`. Falls back to `blurb` if unset. */
  blurbSelf?: string
  items: InventoryItem[]
}

/** The user-facing trust note explaining what the vault holds and how it's kept, in this prototype and in the real product. */
export const accessNote: { title: string; body: string } = {
  title: "What the vault holds",
  body: "Where each thing is, how to get in, and anything your family finds along the way. In this prototype everything stays on this device. In the real product it would be encrypted and shared only with the people you invite.",
}

export const inventoryGroups: InventoryGroup[] = [
  {
    id: "money",
    label: "Money",
    blurb: "Everywhere money sits or is owed: the accounts, the policies, the loans.",
    items: [
      {
        id: "money-bank",
        label: "Bank accounts",
        whereToLook: "Recent statements, mail, or the banking app on their phone.",
        whereToLookSelf: "You already know these. List the banks by name. No need to write down balances or numbers, just which ones exist.",
      },
      {
        id: "money-cards",
        label: "Credit cards",
        whereToLook: "Their wallet, recent statements, or a credit report pull.",
        whereToLookSelf: "List the cards you carry. If you've got one your family wouldn't guess at, a store card, one in a drawer, that's the one worth writing down.",
      },
      {
        id: "money-brokerage",
        label: "Brokerage accounts",
        whereToLook: "Tax documents (1099s) or statements from a brokerage.",
        whereToLookSelf: "Note which brokerage you use. Your 1099s or account statements are there if you need to double-check the name.",
      },
      {
        id: "money-retirement",
        label: "Retirement accounts (401k/IRA)",
        whereToLook: "Pay stubs, HR benefits portal, or year-end account statements.",
        whereToLookSelf: "List your 401(k) and IRA providers, including any from a former employer. Those are the easiest to lose track of.",
      },
      {
        id: "money-pension",
        label: "Pensions",
        whereToLook: "Former employer's HR or benefits department.",
        whereToLookSelf: "If a former employer owes you a pension, write down which one. That's often the only thread anyone would have to pull on.",
      },
      {
        id: "money-hsa",
        label: "HSA",
        whereToLook: "Payroll deductions on a pay stub, or the HSA provider's statements.",
        whereToLookSelf: "Note your HSA provider, if you have one.",
      },
      {
        id: "money-safe-deposit",
        label: "Safe deposit box",
        whereToLook: "A small key in a drawer or lockbox, and a bank statement showing a rental fee.",
        whereToLookSelf: "If you have one, write down the bank and where the key is.",
      },
      {
        id: "money-life-insurance",
        label: "Life insurance policies",
        whereToLook: "Old paperwork, the employer's benefits summary, or a state unclaimed-property search.",
        whereToLookSelf: "List every policy you're holding, including old ones through a former job. Those are the ones that get forgotten and end up in a state's unclaimed-property database.",
        easilyMissed: true,
      },
      {
        id: "money-loans",
        label: "Outstanding loans",
        whereToLook: "Mail, a credit report pull, or bank statement recurring payments.",
        whereToLookSelf: "List what you owe and to whom. A credit report pull is a good way to catch anything you've forgotten.",
      },
    ],
  },
  {
    id: "recurring",
    label: "Recurring",
    blurb: "The things that keep charging on autopilot until someone tells them to stop.",
    items: [
      {
        id: "recurring-subscriptions",
        label: "Subscriptions and streaming",
        whereToLook: "The App Store or Google Play subscription list, or a search of their email for \"your subscription\" and \"renews.\"",
        whereToLookSelf: "The App Store or Google Play subscription list is the fastest way to see everything you're still paying for. Worth a look even for yourself.",
      },
      {
        id: "recurring-phone",
        label: "Phone plan",
        whereToLook: "The last 3 months of bank or card statements for the carrier's name.",
        whereToLookSelf: "Note your carrier and who else is on the plan with you.",
      },
      {
        id: "recurring-insurance",
        label: "Insurance premiums",
        whereToLook: "Recurring charges on bank or card statements, or a search of their email for \"your policy.\"",
        whereToLookSelf: "List your policies and who they're through.",
      },
      {
        id: "recurring-memberships",
        label: "Gym or club memberships",
        whereToLook: "Recurring charges on bank or card statements.",
        whereToLookSelf: "List anything still charging you monthly that someone would otherwise have to cancel by trial and error.",
      },
      {
        id: "recurring-storage",
        label: "Storage units",
        whereToLook: "Recurring charges on bank or card statements, or a physical key or gate code on their keyring.",
        whereToLookSelf: "If you rent one, note where it is and where the key or gate code lives.",
      },
      {
        id: "recurring-charitable",
        label: "Charitable recurring gifts",
        whereToLook: "A search of their email for \"receipt\" and \"thank you for your donation,\" or recurring charges on statements.",
        whereToLookSelf: "List any recurring donations. Worth knowing what's still coming out each month, and whether you'd want it to continue.",
      },
      {
        id: "recurring-domains",
        label: "Domain and hosting renewals",
        whereToLook: "A search of their email for \"renews\" and \"receipt,\" or recurring charges on card statements.",
        whereToLookSelf: "If you own any domains or hosting, write down where. There's no paperwork trail for this one, so it's easy for family to miss entirely.",
        easilyMissed: true,
      },
    ],
  },
  {
    id: "documents",
    label: "Documents",
    blurb: "The paperwork that everything else depends on.",
    items: [
      {
        id: "documents-will",
        label: "Will or trust",
        whereToLook: "A home safe, a filing cabinet, or the estate attorney who drafted it.",
        whereToLookSelf: "Note where your will or trust lives, and make sure at least one other person knows. A will nobody can find works the same as no will.",
      },
      {
        id: "documents-deed",
        label: "Deed",
        whereToLook: "A home safe, filing cabinet, or the county recorder's office.",
        whereToLookSelf: "Note where the deed is kept: a home safe, a filing cabinet, or on file with the county recorder if you're ever not sure.",
      },
      {
        id: "documents-vehicle-titles",
        label: "Vehicle titles",
        whereToLook: "A home safe, filing cabinet, or the glove compartment.",
        whereToLookSelf: "Note where your vehicle titles are kept.",
      },
      {
        id: "documents-marriage-divorce",
        label: "Marriage or divorce decrees",
        whereToLook: "A home safe or filing cabinet, or the county clerk where it was filed.",
        whereToLookSelf: "Note where any marriage or divorce decrees are kept, or which county clerk's office has them on file.",
      },
      {
        id: "documents-dd214",
        label: "Military discharge (DD-214)",
        whereToLook: "A home safe or filing cabinet, or request a copy from the National Archives.",
        whereToLookSelf: "Note where your discharge paperwork is kept. A copy can always be requested from the National Archives if it's ever misplaced.",
        trigger: (answers) => answers.veteran,
      },
      {
        id: "documents-tax-returns",
        label: "Tax returns from the last few years",
        whereToLook: "A filing cabinet, tax software account, or the accountant who prepared them.",
        whereToLookSelf: "Note where your last few years of returns are: a filing cabinet, your tax software account, or your accountant.",
      },
      {
        id: "documents-prepaid-funeral",
        label: "Pre-paid funeral or cemetery contracts",
        whereToLook: "A home safe or filing cabinet, or a call to the funeral home or cemetery to check for a contract on file.",
        whereToLookSelf: "If you've pre-paid for a funeral or cemetery plot, write down where the contract is. This is the one thing a family almost never thinks to check for.",
        easilyMissed: true,
      },
    ],
  },
  {
    id: "people",
    label: "People",
    blurb: "The professionals who already know pieces of this and can move faster than starting from scratch.",
    items: [
      {
        id: "people-attorney",
        label: "Estate attorney",
        whereToLook: "The will itself often names who drafted it, or check recent email and calendar for meetings.",
        whereToLookSelf: "Write down who your estate attorney is, if you have one, and how to reach them.",
      },
      {
        id: "people-accountant",
        label: "Accountant or tax preparer",
        whereToLook: "Last year's tax return usually has a preparer's name and contact on it.",
        whereToLookSelf: "Write down who your accountant or tax preparer is.",
      },
      {
        id: "people-advisor",
        label: "Financial advisor",
        whereToLook: "Brokerage or retirement account statements often list an advisor's contact.",
        whereToLookSelf: "Write down who your financial advisor is, if you have one.",
      },
      {
        id: "people-insurance-agent",
        label: "Insurance agent",
        whereToLook: "The policy paperwork or a recent premium statement.",
        whereToLookSelf: "Write down who your insurance agent is.",
      },
      {
        id: "people-employer-hr",
        label: "Employer HR contact",
        whereToLook: "A recent pay stub or benefits enrollment email.",
        whereToLookSelf: "Write down who to contact at your employer's HR department.",
      },
      {
        id: "people-executor",
        label: "Executor named in the will",
        whereToLook: "The will itself, usually named in the first page or two.",
        whereToLookSelf: "If you've named an executor, make sure they know, and that it's written down somewhere your family would think to look.",
      },
    ],
  },
  {
    id: "digital",
    label: "Digital",
    blurb: "Accounts and access that don't show up in a filing cabinet.",
    items: [
      {
        id: "digital-password-manager",
        label: "Password manager and recovery contact",
        whereToLook: "Check their phone or laptop for a password manager app, and who they've listed as a recovery or emergency contact within it.",
        whereToLookSelf: "Note which password manager you use, and who you've listed as its recovery or emergency contact.",
      },
      {
        id: "digital-email",
        label: "Email accounts",
        whereToLook: "Their phone's mail app, or a recent bill that lists a contact email.",
        whereToLookSelf: "List your email accounts. The one you check day to day matters most.",
      },
      {
        id: "digital-phone-passcode",
        label: "Phone passcode",
        whereToLook: "Ask family who used the phone with them, or check for it written down near other passwords.",
        whereToLookSelf: "Somewhere your family could find it, written down with your other important papers, not only in your head.",
      },
      {
        id: "digital-cloud-storage",
        label: "Cloud storage and photos",
        whereToLook: "Their phone's settings, or an email account's linked services.",
        whereToLookSelf: "Note where your photos and files live: which service, under which account.",
      },
      {
        id: "digital-social",
        label: "Social accounts",
        whereToLook: "Their phone's home screen, or a search of their email for account confirmation messages.",
        whereToLookSelf: "List the social accounts you'd want someone able to close or memorialize.",
      },
      {
        id: "digital-income-accounts",
        label: "Any account that pays out money",
        whereToLook: "Bank deposit descriptions for unfamiliar recurring credits: ad revenue, royalties, or rebates.",
        whereToLookSelf: "If anything pays you, ad revenue, royalties, rebates, write down where. Otherwise it quietly stops showing up, unnoticed.",
        easilyMissed: true,
      },
    ],
  },
  {
    id: "property",
    label: "Property",
    blurb: "The physical things that need someone looking after them, starting now.",
    blurbSelf: "The physical things worth having a plan for: who'd take care of them, and how they'd know what to do.",
    items: [
      {
        id: "property-home",
        label: "Home",
        whereToLook: "You likely already know the address. The deed or a recent utility bill confirms it.",
        whereToLookSelf: "You know the address. Make sure the deed or a recent utility bill is somewhere your family could confirm it too.",
        trigger: (answers) => answers.assets.includes("home"),
      },
      {
        id: "property-vehicles",
        label: "Vehicles",
        whereToLook: "The title in a filing cabinet, or the registration in the glove compartment.",
        whereToLookSelf: "Note where your title and registration are kept.",
        trigger: (answers) => answers.assets.includes("car"),
      },
      {
        id: "property-storage",
        label: "Storage",
        whereToLook: "A physical key or gate code on their keyring, or a recurring charge on a bank statement.",
        whereToLookSelf: "If you rent storage, note where, and where the key or gate code lives.",
      },
      {
        id: "property-keys",
        label: "Anything with keys",
        whereToLook: "Gather every key on their keyring and in drawers before figuring out what each one opens.",
        whereToLookSelf: "Label your keys, or at least note what the odd ones open. The unlabeled ones are the hardest for anyone else to figure out.",
      },
      {
        id: "property-pets",
        label: "Pets",
        whereToLook: "This one doesn't need looking for. It's whoever fed and walked them yesterday. A pet is a living responsibility that lands on someone immediately, not something that can wait.",
        whereToLookSelf: "Write down who'd take them, and what they'd need to know: food, vet, routine. A pet is a living responsibility, so this is one answer that shouldn't be left for someone to figure out on the spot.",
        easilyMissed: true,
      },
    ],
  },
]
