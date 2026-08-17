# What the search data says

Two DataForSEO pulls of Google Ads search volume and CPC, US only, 12-month window ending mid-2026. Round 1 (July 2026) covered 358 keywords across the three stages of the journey. Round 2 (August 2026) covered 758 keywords across ten pockets round 1 never probed. Raw data and pull scripts are in [`data/`](data/).

Every number here is order-of-magnitude. Google buckets volumes, rounds long-tail terms down to zero, and one 12-month window can't separate seasonality from a one-year trend. Treat the per-keyword figures as more reliable than the category totals.

## The short version

1. Pre-need is the biggest stage on every metric: 1.30M searches a month, the highest CPCs, the deepest commercial intent. That volume is demand for attorneys, insurance, and documents, and the companies that chased it with software are the ones in [02-prior-companies.md](02-prior-companies.md).
2. Crisis-moment searches mostly don't exist. 37% of the literal in-the-moment phrasings ("who to call when someone dies at home", "sudden death of a parent what to do") returned zero measurable volume. People in the acute moment aren't typing search queries. Guidance in that week has to be pushed to them, not found.
3. The executor stage is where paying intent concentrates. Smaller total volume, but the terms are unambiguous and expensive: "probate attorney near me" $17, "inheritance loan" $205, "trust administration services" $23. Money moves through the weeks after a death.
4. Nobody searches for the product category. "death planning app" gets 10 searches a month. People find these products by brand name or by task query, which means acquisition is organic, brand, and distribution, not paid search.
5. December to January is the seasonal window across three independent signals: organizing tools, year-end tax lookups, and sympathy gifting.

## Round 1: the three stages

| Stage | Keywords | Volume / mo | Vol-weighted CPC | Share with CPC ≥ $3 | Zero-volume share |
|---|---|---|---|---|---|
| Crisis | 86 | 366K | $4.24 | 27% | 37% |
| Executor | 167 | 241K | $5.04 | 44% | 13% |
| Pre-need | 105 | 1.30M | $5.36 | 53% | 13% |

Advertiser-value index (volume × CPC, a rough monthly ad-spend ceiling): pre-need ~$6.95M, crisis ~$1.55M, executor ~$1.22M.

Crisis volume is misleading. 55% of it is one term, "funeral home near me" (201K/mo, $4.29), which is local intent, not crisis-moment behavior. Strip it and crisis drops to roughly 142K.

Top terms per stage:

- Crisis: funeral home near me (201K, $4.29), obituary examples (22K, $0.53), cremation near me (22K, $9.85), cremation cost (18K, $6.85), how to get a death certificate (12K, $2.92).
- Executor: what is probate (27K, $1.29), probate attorney near me (27K, $17.04), estate lawyer near me (22K, $9.03), letters testamentary (15K, $1.87), small estate affidavit (15K, $3.98), probate lawyer cost (6.6K, $10.06).
- Pre-need: estate planning attorney (368K, $6.49), power of attorney (90K, $4.48), long term care insurance (74K, $9.03), advance directive (60K, $2.57), living trust (33K, $5.10), trust fund (27K, $12.46).

Seasonality: every stage troughs in November and December and rebounds in January. Pre-need shows the clearest calendar story, a 22% jump from December to January. The most seasonal single term is "how to file taxes for a deceased person", roughly 9x higher February through April.

State terms: across 13 sampled states, Texas (3,650/mo) and California (2,700/mo) are not standouts. Illinois and Washington are comparable to California. Thin sample, directional only.

## Round 2: ten pockets round 1 didn't cover

| Pocket | Keywords | Volume / mo | What's in it | Zero-volume share |
|---|---|---|---|---|
| Coordination and registry | 37 | 103K | meal train (60K), condolence gift basket (10K), grief support group near me (6.6K) | 41% |
| Competitor brands | 43 | 87K | trust and will (60K), gathered here (15K), ever loved (1.9K), everplans (1.3K) | 30% |
| Inheritance moment | 46 | 32K | inherited IRA rules (15K combined), inheritance tax by state (2.9K); CPCs up to $205 | 37% |
| Inventory wall | 90 | 25K | nokbox (15K), nokbox reviews (3.6K), death binder (590), in case i die binder (720) | 52% |
| Notification and cancellation | 46 | 11K | how to notify social security of a death (4.4K); notify transunion of death $31 CPC | 50% |
| Guided services | 47 | 11K | estate cleanout services (3.6K, $12.82), death doula near me (1K), grief coach (1K) | 60% |
| Executor long tail | 61 | 8K | how long does probate take (3.6K), executor duties (720); executor bond $17.55 CPC | 51% |
| Digital legacy | 59 | 7.6K | how to memorialize a facebook account (2.4K), apple legacy contact (1.3K) | 47% |
| Aging parent | 39 | 3.4K | power of attorney for elderly parent (1.9K) | 74% |
| Remains transport | 31 | 2.3K | can you fly with ashes (390), repatriation insurance (390); shipping ashes internationally $39 CPC | 35% |

What round 2 added to the round 1 story:

- "How to" phrasings are still mostly dead (52% zero volume across 46 of them), with one exception: narrow administrative tasks. "How to notify social security of a death" (4.4K) and "how to memorialize a facebook account" (2.4K) have real volume. The pattern holds for "how do I cope or plan", not for "how do I do this one bureaucratic step".
- "How long does X take" is a different animal. The probate-timeline cluster carries 3.6K/mo across a dozen phrasings. Timeline anxiety has volume even when instructional queries don't.
- Paying intent at the inheritance moment is extreme. "Inheritance loan" $205, "probate advance loan" $182, "inheritance advance" $170. That's a lending vertical bidding itself up, not something to chase directly, but it shows how much money moves through this moment and anchors any advisor-referral pricing.
- Estate cleanout is the biggest surprise. Someone has to empty and sell the house. "Estate cleanout services" (3.6K, $12.82), "estate liquidation services" (1.6K), "trust administration" (1.3K, $11.87). A physical-world, high-CPC service category at the executor stage that wasn't on the map.
- The inventory wall has a name, and one brand owns it. Nokbox is 73% of the category's volume. Generic terms (death binder, emergency binder) are real but small and fragmented across many phrasings.
- "No one to serve as executor" is a small, distinct, high-intent cluster ("i have no one to be executor of my will", $16.91). Nobody targets it by name.
- Financial advisor for inheritance: "financial advisor inheritance" and "financial advice on inheritance" both carry a $34.61 CPC on modest volume. This is the clearest evidence for the advisor-referral idea; people type exactly the query a referral funnel would want.
- Aging parent is the weakest pocket (74% zero volume). The "for family" pre-crisis conversation isn't something people type into Google.

Brand demand: Trust & Will is the single largest term in the study (60K/mo plus 5.4K for "reviews"). Gathered Here (15K) likely picks up generic obituary traffic through its name. Ever Loved 1.9K, Everplans 1.3K at a $7.55 CPC, GoodTrust 1K at $13.63, Cake 590. Farewill, Lantern, Clocr, Willed, and Afterword are effectively zero in the US.

Category-level demand doesn't exist: "death planning app" 10/mo, "grief app" 110, "estate app" 70, "end of life planning app" 50, "app to help settle an estate" null.

Seasonality: nokbox roughly doubles in December and January (New Year organizing). Inherited IRA queries peak in December (tax deadlines). Condolence gift baskets peak December to January. Meal train and Trust & Will are flat year-round.

## What this means for the product

- The free crisis-week guidance is a trust layer, not an acquisition channel. Nobody finds it by searching.
- The reachable search audience is overwhelmingly people planning, and the aging-parent framing sits inside that stage. Content leans pre-need and executor; the paid product stays executor.
- The executor stage is the right product wedge and a small paid-ad market. That's fine. We were never going to buy $17 clicks against probate attorneys. Organic and social ride where incumbent spend proves intent without competing for the same searcher.
- January and tax season anchor the content calendar.
- Estate cleanout, "no executor", and advisor-for-inheritance are three pockets worth a second look for the guided tier and referral partnerships.

## Method and caveats

- Source: DataForSEO `search_volume` endpoint (Google Ads data), location US (2840). Round 2 also used `keywords_for_keywords` to expand the 15 highest-signal seeds, which surfaced 259 discovered terms.
- Stage and category tags are assigned up front. Broad head terms straddle stages ("power of attorney" is both pre-need and executor), so totals are noisier than individual numbers.
- Demand-side only. Says nothing about conversion, willingness to pay, or organic ranking difficulty.
- Total API spend across both rounds: about $0.63.
- To re-run: `python3 data/keyword-round1/pull.py` or `python3 data/keyword-round2/pull.py`, with a DataForSEO token in `~/.secrets/dataforseo.txt`.
