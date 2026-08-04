// The two-forms problem: terminology genuinely varies by state, so
// everything below is hedged and says so rather than pretending there's one
// national standard.

export interface CertUse {
  id: string
  label: string
  needs: "with-cause" | "without-cause" | "either"
  note?: string
}

export const certUses: CertUse[] = [
  {
    id: "use-life-insurance",
    label: "Life insurance claims",
    needs: "with-cause",
    note: "Most life insurance claims want the version with cause of death.",
  },
  {
    id: "use-pension-benefits",
    label: "Some pension and benefit claims",
    needs: "with-cause",
    note: "Some pension or benefit claims also ask for the version with cause of death — worth checking before ordering.",
  },
  {
    id: "use-banks",
    label: "Banks",
    needs: "without-cause",
  },
  {
    id: "use-dmv",
    label: "DMV",
    needs: "without-cause",
  },
  {
    id: "use-utilities",
    label: "Utilities",
    needs: "without-cause",
  },
  {
    id: "use-account-closures",
    label: "Most other account closures",
    needs: "without-cause",
    note: "Most institutions closing an account accept the version without cause of death.",
  },
]

export const certExplainer: { title: string; body: string }[] = [
  {
    title: "There can be two different forms",
    body: "Most states issue a certified copy with a raised seal — the one institutions require — and sometimes an informational copy that is explicitly not valid for legal purposes. Separately, some states distinguish a version that includes cause of death from one that doesn't. The exact names and distinctions vary by state, so ask your funeral home or county vital records office what your state actually offers.",
  },
  {
    title: "With cause of death, or without",
    body: "Life insurance claims and some pension or benefit claims typically want the version with cause of death. Banks, the DMV, utilities, and most account closures accept the version without cause of death.",
  },
  {
    title: "Order more than you think you need",
    body: "Many institutions keep the certified copy rather than returning it, so it's easy to run out mid-process. The app can suggest a starting count based on what you've told it, but when in doubt, order a few extra.",
  },
  {
    title: "Where they come from",
    body: "The funeral home usually orders the first batch for you. After that, additional copies come from the county vital records office.",
  },
]
