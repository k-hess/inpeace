# The phased plan

Draft for the group, August 10, 2026, following the August 4 call. The prototype at inpeace.kylehess.workers.dev already implements most of phase 1.

## What we're saying no to

Starting here, because the shape of this product is defined more by what it refuses than by what it includes. Each of these was considered seriously and parked for a reason. Nothing is lost. It's all on the back end with the reason attached, and any of it can be reopened when the reason stops applying.

**Vendor marketplace and funeral-home directory.** A standing no, at least for recommendation and booking. Funeral-stage referral clicks are worth $2 to $7; probate-stage clicks are worth $35 to $80. The market is saying the money is weeks later, not at the funeral. Most states have anti-steering statutes covering funeral referral, and the FTC Funeral Rule exists because this is the moment families get taken advantage of. A Place for Mom drew a Senate Aging Committee investigation over commission-linked rankings. Angi/HomeAdvisor took an FTC order up to $7.2M. We'd be building the thing we're telling people to watch out for.

**Sponsored or featured placement.** The hardest no. One screenshot of "sponsored" next to a casket recommendation ends the brand permanently. The average funeral is about $8,300 and fewer than one in five families comparison-shop at all. That's a group of people to protect, not a market to monetize.

**Storing passwords or credentials.** We record where access lives and how to get it: which password manager, who holds the recovery code, what each provider's bereavement process is. Not the secrets themselves. Roughly 90% of the value at roughly none of the breach risk, and a position we can say out loud.

**Bank linking and automatic subscription discovery.** We looked hard at this because it's the most-requested item. There is no compliant path for a deceased person's accounts. Plaid's consent model and the CFPB's open-banking rule are built around a living account holder authenticating for themselves; neither contemplates an executor standing in. Real access needs a certified death certificate plus letters testamentary, which means waiting on probate, commonly three to six months. We ship the method instead: where to look, what patterns to search for, which statements and app-store subscription lists to check. The version that can work is planning mode, where a living person links their own accounts. That's a later phase, not a lost idea.

**Building our own community or message boards.** Not because community doesn't matter. Because it's the one part of this that already exists and works. Every credible peer-grief organization is free or near-free nonprofit: Our House, GriefShare, The Dinner Party, Compassionate Friends, Soaring Spirits. Nobody has made consumer-paid grief community work, and the moderation and duty-of-care burden is severe. Comfort Club already is the community. We route to it and to them. Peer support stays permanently unmonetized.

**AI chat concierge.** We benchmarked free chatbots on real executor scenarios: roughly 2.8 out of 5 on accuracy, and they fail exactly where it hurts (stale legal thresholds, jurisdiction, no warning before irreversible mistakes, no memory of the case). A chat window would inherit all of that with our name on it. We've built the concierge's brain (the rules engine, computed deadlines, case state) and skipped its mouth.

**Consumer subscription, memorial websites, and white-label/enterprise.** Subscription fails because this is a one-time-use product and retention is near zero; the ripple loop below is the real answer. Memorial sites are a crowded, low-value commodity. White-label to insurers and employers is a real business, and Empathy already owns that lane with $162M raised and most of the top 10 life insurers as customers.

## The bet underneath all of this

Worth stating plainly, because it's the thing most likely to be wrong.

The group's instinct was to lead with the pre-death organization product. The research says consumer pre-need software is a decade-long graveyard: Cake absorbed, Everplans fled to B2B, Farewill went from £70M to a distressed sale. We had previously ruled out a "plan ahead" door for exactly that reason.

Why we're building it anyway, and how the two reconcile:

What this group described is not classic pre-need. Trust & Will sells document generation, and you have to contemplate your own death to want it. That's what keeps dying. What was described on the call is an access-and-inventory layer: where the accounts are, what the subscriptions are, who the professionals are, how family gets in. Nobody sells that. The trigger is "my parent is aging" or "I travel every other week and have all these business accounts and nothing in place". Different customer, different mood.

We enter through the after-death door. That's where people actually arrive, where the search demand and the pull are, and what the prototype already does well. The inventory is what someone builds while settling a death, and then keeps for the surviving parent and eventually for themselves.

One data structure serves all three doors. The inventory is "what to gather" in planning mode and "what to notify, cancel, and transfer" after a death. Same object, different verb. This is what lets us be feature-complete enough not to get abandoned without building three products with a small team.

If this bet is wrong, it's wrong here: the living-person doors get built and nobody walks through them. That's measurable, and we should instrument it from day one rather than argue about it.

## Phase 1: the wall, and the plan

This is the whole product for now. Everything below is buildable without an external dependency, and nothing in it can fail because a vendor let us down.

**Three doors.** The first question is which situation you're in: someone has died / helping a family member get ready / getting my own affairs in order. This is the group's own onboarding-survey instinct. Built and live.

**The inventory, the spine.** Accounts, subscriptions, policies, professionals, grouped and filtered by what applies to you, with "easy to miss" markers. Access paths only, never credentials. Built once, consumed differently by each door.

**The after-death plan.** Phased timeline with real computed dates from a state rules engine, currently Texas and California, with the small-estate thresholds, waiting periods, and creditor windows that govern what you can do when. Death-certificate tracker with a recommended copy count. Care circle and notification fan-out. And the "It can wait" section, given the same visual weight as the to-dos.

**The gathering plan**, for the two living-person doors: the inventory, plus the concrete list of questions that makes the aging-parent conversation possible at all.

**The guidance layer.** This is where "guidance, not recommendations" becomes a product surface:

- Funeral cost and rights. Price ranges, and what a funeral home is legally required to do under the FTC Funeral Rule: itemized price list on request, quotes over the phone, no package-only sales, you may supply your own casket, embalming is not routinely required. Red flags. Nobody in the category invokes the Funeral Rule, and it directly answers the advocacy point Kelly raised.
- Choosing well. Per-role cards for estate attorney, tax person, financial advisor, funeral home, built on incentive structure rather than names. Fee-only vs. commission. Flat-fee vs. hourly. Credentialed vs. not. Itemized vs. bundled. Anchored to government and professional-body sources: the IRS preparer directory, the CFP and NAPFA fiduciary standards, the Funeral Rule.
- Certificates. Certified vs. informational, with-cause vs. without-cause, and which tasks need which.
- Liabilities and the "you find out too late" cards, including international repatriation of remains.

**Religion and timing in the intake.** Jewish burial within roughly 24 hours, Islamic promptness, Hindu cremation customs. These change what "this week" means, and getting it wrong isn't recoverable.

**Grief support routing.** Out to Our House, Compassionate Friends, The Dinner Party, Soaring Spirits, and especially hospice bereavement programs, which are federally mandated to provide 13 months of free support under Medicare and are badly underused. Possibly the single highest-value referral in the product, free to the family, and unmonetized by us. Permanently.

**Handoff, version one.** You designate who should be able to open your plan when the time comes, and you can see what they would see. No automatic unlock. The transfer trigger (who declares a death, what proof is required, what prevents a premature or malicious unlock) is unsolved, and shipping a half-answer would be worse than none. Phase 1 is the designation and the preview. The machinery is phase 2.

## Phase 2: the loop, and the money

**The ripple loop, as a real mechanic.** Three people on the call independently described the same thing: someone experiences a death, and it converts them into a planner. Kelly's dad: "okay, I'm going to get my shit in order... it's this ripple effect, you see it and then you take action." Aubrey's friends walking their parents through a checklist. VJ on his own accounts. And Jordan's version, which is the retention answer: a lot of people lose one parent, and then there's the other one.

This is our answer to "this business has no repeat customers", and as far as we can tell nobody in the category has tried it. Someone settles a death using In Peace, builds a plan for themselves and the surviving parent, and that plan is built to be handed over, so when the time comes it opens for their family, who arrive as new users already inside a populated account.

Making it real requires what phase 1 defers: the transfer trigger, proof of death, graduated access (the difference between "here is where the account lives" and "here is the account", and what unlocks at declaration vs. at a certified death certificate), and what happens when the designated person predeceases or can't be reached. That deserves its own phase.

**Coordination and the registry**, as an extension of the care circle rather than a new surface. The mechanic worth borrowing from BabyList (Jordan's benchmark) is its claim state machine: claim, 48-hour soft hold, auto-release if unconfirmed, confirmed. It's the cleanest answer to "who's actually doing this" without anyone having to ask. Also worth copying exactly: BabyList's cash funds route peer-to-peer with zero platform cut and no visible fee line. We link out to meal funds and never touch the money. The one thing never to copy is store-credit lock-in; trapping pooled money is BabyList's own worst complaint pattern, and in a death context it's a betrayal.

**Commerce, with a ceiling.** BabyList became the retailer, and the list is the acquisition funnel ($750M in 2025). Some of that transfers. Ever Loved does about $3M ARR with five people selling flowers, urns, and memorial goods. The FTC Funeral Rule forces funeral homes to accept outside caskets with no handling fee, and Costco and Titan Casket built real businesses on that. Transparent-price retail fits the advocacy position. But BabyList gets nine months of happy browsing; death purchases happen in 24 to 72 hours, once, under duress, and the big item is usually bought inside the funeral home. A late diaper is a refund; a casket that misses a funeral is permanent brand damage. And BabyList's number rests on advertising and insurance-billed product, neither of which exists in grief. So: affiliate on non-deadline goods (urns, flowers, memorial items), zero inventory risk, real but small. Caskets on a deadline stay out. The honest comp is Ever Loved at $3M, not BabyList at $750M.

**More states.** Two is a demo; the executor product isn't real at two.

**Revenue, in the order the evidence supports.** First, a high-ticket guided human tier. Human guidance in this category monetizes dramatically better than a $149 self-serve toolkit; Going with Grace is the proof. Executor expenses are reimbursable from the estate, so the estate pays, not the family. Then financial-advisor referral at the inheritance moment, which the research put at roughly $750 to $1,250 a year recurring per funded referral, the most validated stream we found. Not funeral-stage referral, for all the reasons in the no-list.

**International repatriation**, promoted from a knowledge card to a guided flow if the research supports it. Two first-hand stories surfaced in a single hour on the call.

## Phase 3: things that need scale or the law to change

- Planning-mode account linking, where a living person connects their own accounts and consent actually works.
- Employer and benefits distribution. Parked rather than rejected; a real channel, just not while Empathy owns it and we're this small.
- Anything requiring national provider coverage.

## Open items

1. Repatriation figures need verification. Several consulate, TSA, and CDC pages blocked automated access, so some specifics rest on cached summaries. The live cards are process-level with no dollar figures, so the exposure is wording, not numbers. Still worth a check against Kelly's and VJ's own experience before wide sharing.
2. The handoff trigger is unsolved, as above, and deliberately out of phase 1.

## Who owns what

Proposed, not decided:

- Kyle: product and prototype.
- Laura and Kelly: community and PR; the Comfort Club relationship and the grief-organization partnerships.
- Jordan: design and the deck.
- Aubrey and VJ: the lived-experience task inventory, what you each actually had to do, in order, with what you wish you'd known.
- Vijay: story and network; interview sourcing.
