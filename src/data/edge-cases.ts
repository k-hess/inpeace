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
      body: "Many countries require advance permission or an import permit for cremated remains, and airport security will inspect them. A trip planned around scattering can fall apart at the last minute if nobody checked ahead. TSA generally requires cremated remains in a container that can be X-rayed, wood or plastic rather than metal or stone, usually carried on rather than checked.",
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
      body: "Apple's process for a deceased person's account typically requires a death certificate and returns a code that lets you reset access. Google's bereavement process exists but is slow and hard to reach a human through. Start it early rather than when you need it.",
    }),
  },
  {
    id: "edge-money-keeps-arriving",
    trigger: () => true,
    copy: () => ({
      title: "Money can keep arriving",
      body: "Ad revenue, royalties, dividends, rebates, and refunds keep landing in accounts after a death, sometimes for years, and can be hard to redirect once the account is closed. Treat it as something to watch for rather than something to solve immediately.",
    }),
  },
  {
    id: "edge-obituary",
    trigger: () => true,
    copy: () => ({
      title: "Writing the obituary and placing it are two different jobs",
      body: "Newspapers charge for obituaries by length, often several hundred dollars, and have a submission deadline that usually falls a day or two before print. Most want the funeral home involved or a death certificate to verify it. Legacy.com aggregates many papers if you're not sure where to place it. The funeral home's website, a memorial page, and social media are free. If a service is announced in it, treat placing it as a this-week task so it runs before the service. A remembrance without a service date can wait.",
    }),
  },
  {
    id: "edge-friends-want-to-help",
    trigger: () => true,
    copy: () => ({
      title: "Friends will want to help pay for the funeral",
      body: "It's normal for people to want to give money. The easiest way to let them is one link, a memorial fund through a payment app or crowdfunding page, put in the obituary and the memorial page. Name one person to hold it. Most platforms take a small fee. We don't run the fund or take any cut, we just point to it.",
    }),
  },
  {
    id: "edge-death-away-from-home",
    trigger: () => true,
    copy: () => ({
      title: "Dying away from home, in another state or city",
      body: "The death certificate is issued where the death happened, not where they lived. A funeral home in that place has to release the body, and a funeral home at home receives it. Funeral homes coordinate this routinely. Ask for a \"forwarding remains\" or \"receiving remains\" price, which the FTC Funeral Rule requires them to itemize. If flying is involved, airlines generally ship remains as cargo through a known-shipper funeral home rather than as checked luggage. Hospitals only hold a body for a limited time, so this is worth starting quickly.",
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
