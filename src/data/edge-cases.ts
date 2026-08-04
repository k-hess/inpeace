import type { SimpleCard } from "#/data/common-types"

/**
 * The "you don't know what you don't know" cards. Every one of these came
 * from a real story on the founders' call — kept concrete rather than
 * generalized so the specific gotcha stays visible.
 */
export const edgeCaseCards: SimpleCard[] = [
  {
    id: "edge-repatriation",
    trigger: () => true,
    copy: () => ({
      title: "Taking remains to another country",
      body: "Repatriation generally needs consular paperwork from that country's embassy or consulate, a certified death certificate, and a transit permit. Embassies keep business hours, and this can gate travel by days. Start it before booking anything.",
    }),
  },
  {
    id: "edge-scattering-abroad",
    trigger: () => true,
    copy: () => ({
      title: "Scattering ashes abroad",
      body: "Many countries require advance permission or an import permit for cremated remains, and airport security will inspect them — a trip planned around scattering can fall apart at the last minute if nobody checked ahead. TSA generally requires cremated remains in a container that can be X-rayed (wood or plastic rather than metal or stone), usually carried on rather than checked.",
    }),
  },
  {
    id: "edge-social-accounts",
    trigger: () => true,
    copy: () => ({
      title: "Their online accounts don't go quiet on their own",
      body: "Unmemorialized social accounts get compromised and start posting years later. Facebook and Instagram can memorialize an account or remove it; Google has an Inactive Account Manager; Apple has a Digital Legacy contact. Each has its own process and most want a death certificate.",
    }),
  },
  {
    id: "edge-apple-google",
    trigger: () => true,
    copy: () => ({
      title: "Apple and Google access",
      body: "Apple's process for a deceased person's account typically requires a death certificate and returns a code that lets you reset access. Google's bereavement process exists but is slow and hard to reach a human through — set your expectations accordingly, and start it early rather than when you need it.",
    }),
  },
  {
    id: "edge-money-keeps-arriving",
    trigger: () => true,
    copy: () => ({
      title: "Money can keep arriving",
      body: "Ad revenue, royalties, dividends, rebates, and refunds keep landing in accounts after a death, sometimes for years, and can be genuinely hard to redirect once the account is closed. Treat it as something to watch for rather than something to solve immediately.",
    }),
  },
  {
    id: "edge-autopays",
    trigger: () => true,
    copy: () => ({
      title: "Auto-pays you can't see",
      body: "The charges nobody knew about surface on the statement one billing cycle at a time. Plan on finding things for several months, not finding everything at once.",
    }),
  },
]
