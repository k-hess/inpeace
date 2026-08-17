# The kickoff call, and where the research met it

Notes from the first group call, August 4, 2026 (Kyle, Laura, Jordan, Kelly, Aubrey, VJ, George), and how the research lines up against what the group said. Written August 4, cleaned up August 16.

## Where the group landed

Two buckets, and the group picked bucket 1 as the hero.

**Bucket 1, organize and access ("the wall").** Accounts, subscriptions, passwords, legal documents, bank access, insurance policies, the two death-certificate formats and which one each task needs, who the tax person and estate lawyer are. Shareable profiles so family can get in. A Rocket Money-style subscription finder. VJ's framing: "no emergency of thought tied into it". No vendor dependency, nothing can go wrong, complete control.

**Bucket 2, the week of.** Funeral and wake logistics, florists, meal funds, task delegation. Kelly's model was a BabyList-style registry and checklist. Group consensus: the vendor and marketplace half is phase 2 or later. It's time-bound, vendor-dependent, liability-exposed, and state-regulated. VJ: "a bad experience... they said they'll help you with all that, they made my life worse."

**Community as the third leg.** Laura's Comfort Club is the live proof; grief groups, message boards, a podcast tie-in. Framed as the trust-builder and adoption driver, not a revenue line.

Principles the group agreed on without prompting:

- Guidance, not vendor recommendations. "Here's what to look for in a funeral home, here's the price range, here's what they should and shouldn't do", not "use X". Kelly extended it with the funeral-home overcharging angle.
- A short onboarding survey: location, where the deceased lived, language, religion, and whether this is planning, imminent, or already happened.
- Warm, cozy, hand-holding. Kelly: "we don't want to overwhelm anyone... it's not 'I know what to do, I don't know how', it's 'I don't even know what I need to do.'"
- Feature-complete enough at launch. Jordan's worry: a thin checklist MVP gets abandoned and people don't come back.

Revenue thinking on the call: financial-product referrals felt most validated; affiliate or commission on non-funeral vendors (florists, food); ad revenue. Taking a cut of a community meal fund was rejected as "gross"; lead referral was acceptable. Funeral-home referral was flagged for state anti-steering law. Embedded finance and credit-union white-label came up as a B2B angle.

## Three places the research pushed back, and how they resolve

None of these are fatal. All three needed a position before the roadmap went out.

### 1. "Pre-need first" versus the pre-need graveyard

The group's instinct is to lead with the pre-death organization product. The research says consumer pre-need software is a decade-long graveyard (see [02-prior-companies.md](02-prior-companies.md)), and the executor moment is where the pull is (see [01-search-demand.md](01-search-demand.md): 37% of crisis phrasings have zero search volume; executor terms carry $17 to $80 CPCs; pre-need dominates search, not consumer product success).

The reconciliation: what the group described is not classic pre-need. Trust & Will sells document generation, a will or a trust for $500, and you have to contemplate your own death to want it. What this group described is an access-and-inventory layer: where the accounts are, what the subscriptions are, who the professionals are, how family gets in. Nobody sells that. The trigger isn't "I'm thinking about my mortality"; it's "my parent is aging", or, in VJ's words, "I travel almost every other week and I have all these business accounts and nothing in place."

So: build the inventory as the shared spine, and enter through the after-death door, because that's where people actually arrive. The inventory is what someone builds while settling one death, and then keeps for the surviving parent. That was Aubrey's retention point on the call, and it's the honest version of "one death, whole family signs up".

### 2. "Feature complete" versus a wedge

Jordan is right that a thin checklist gets abandoned. The research is right that three products at once kills a small team. These resolve if one data structure serves all three doors: the account, asset, and professional inventory. In planning mode it's "what to gather". In after-death mode it's "what to notify, cancel, and transfer", which the prototype's notification fan-out already does. Same object, different verb. That reads as feature-complete without being three products.

### 3. Passwords and bank linking

Two separate liabilities the group waved at ("we need to not have any hackers"):

- Credential storage. We don't store secrets. We store access paths: which password manager, who holds the recovery code, and each provider's actual bereavement process (Apple wants a death certificate and returns a reset code; Google's bereavement team is, per Laura, nearly unreachable). That is roughly 90% of the value at roughly none of the breach risk, and it's a product position we can say out loud.
- Rocket Money-style subscription discovery. Rocket Money links your own accounts. Doing this for a deceased person's accounts is a different legal and technical animal (see the parked list in [04-roadmap.md](04-roadmap.md)). Phase 1 ships the method: where to look, which statements and app-store subscription lists to check, the recurring-charge pattern. Bank linking waits for planning mode, where a living person links their own accounts.

## What the prototype already covered

The prototype at inpeace.kylehess.workers.dev was built against the executor stage before the call. Against what the group debated:

| The group debated | The prototype had |
|---|---|
| Short personalizing survey | 5-question intake (state, date, will, assets, alone or with family) |
| State-by-state legal complexity (Aubrey's worry) | Texas and California rules engine: small-estate affidavit thresholds, 30-day waits, creditor windows, CA AB 2016 $750K home path, computed real dates |
| "Guidance, not recommendations" | Care-note guardrails in care language, no vendor referrals anywhere |
| Death certificates, which form, how many | Death-cert tracker with a recommended copy count derived from the asset answers |
| Task delegation across family | Care circle, shared family view, notification fan-out tracker |
| "Don't overwhelm them" | The "It can wait" section, an explicit permission-to-not-do-this-yet list |
| Warm and cozy, not clinical | Serif type, muted palette, about 5:1 contrast for a 45 to 65 audience |

Not in it at the time, and asked for on the call: the three-door mode switch, religion and language in the intake, the account inventory itself, registry and meal-fund coordination, community, funeral cost ranges.

## What got built next

Ordered by what most changes the next conversation. Items 1 to 4 landed before the roadmap went out.

1. Three doors on the front. The first question is the group's own survey question: someone died / someone is dying / I'm getting organized. Door 1 routes into the after-death plan. Doors 2 and 3 route into the inventory.
2. Funeral cost-and-rights card. Price ranges (burial vs. cremation vs. wake add-on), what a funeral home must do under the FTC Funeral Rule (itemized price list on request, no package-only sales), and red flags. Guidance, not referral, so no vendor risk. Directly answers Kelly's "make sure people know what things should cost so they can advocate for themselves".
3. The inventory object. Accounts, subscriptions, policies, professionals, access paths. Entered once, consumed by the notification tracker in after-death mode and presented as a gathering checklist in planning mode. No credential storage.
4. Religion in the intake, wired to pacing. Burial timing is religion-driven (Jewish burial within about 24 hours, Islamic promptness, Hindu cremation customs) and it changes what "this week" means. It also opens the door to VJ's embassy story and Kelly's Paris-ashes story as edge-case cards on international transport of remains.
5. Registry as an extension of the care circle, not a new surface. Assign tasks, mark what's covered, link out to a meal fund. Link out, don't take a cut.

Explicitly parked, with reasons in the roadmap: community and message boards, vendor marketplace and funeral-home directory, bank linking, AI concierge, credit-union white-label.
