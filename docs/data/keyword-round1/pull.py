"""
DataForSEO Google Ads search-volume pull for the death/EOL journey keyword demand study.
Token is read from a local file and never printed or embedded here.
"""
import os
import json
import subprocess
import sys
import time

TOKEN_FILE = os.path.expanduser("~/.secrets/dataforseo.txt")
token = open(TOKEN_FILE).read().strip()

LOCATION_CODE = 2840  # United States
LANGUAGE_CODE = "en"

# ---------------------------------------------------------------------------
# Keyword set. Value = (stage, substage)
#   stage: crisis | executor | pre-need
#   substage: free text tag, e.g. "generic", "TX", "CA", "docs", "trusts", etc.
# ---------------------------------------------------------------------------
KEYWORDS = {}

def add(kw, stage, substage="generic"):
    KEYWORDS[kw.lower().strip()] = (stage, substage)

# ---------------- CRISIS / FIRST 72 HOURS ----------------
crisis_generic = [
    "what to do when someone dies",
    "what to do when someone dies at home",
    "what to do when a parent dies",
    "what to do when your mom dies",
    "what to do when your dad dies",
    "what to do when a spouse dies",
    "what to do when a family member dies",
    "my dad just died what do i do",
    "my mom just died what do i do",
    "mom died now what",
    "dad died now what",
    "husband died now what",
    "wife died now what",
    "who to call when someone dies at home",
    "who to call when someone dies at home hospice",
    "who to call when someone dies in the hospital",
    "who to call when someone dies at a nursing home",
    "what to do first when someone dies",
    "steps to take when someone dies",
    "checklist when a parent dies",
    "checklist for when someone dies",
    "what happens immediately after death",
    "hospice death what to do",
    "unattended death what to do",
    "death at home no hospice what to do",
    "coroner called when someone dies",
    "when does a coroner get involved",
    "autopsy after death",
    "do i need an autopsy",
    "who do i need to notify when someone dies",
    "who to notify after a death checklist",
    "cancel subscriptions after death",
    "what to do with a deceased person's phone",
    "pronouncing someone dead at home",
    "signs of imminent death",
    "how to know when someone has died",
    "grief support after sudden death",
    "sudden death of a parent what to do",
    "unexpected death of a spouse what to do",
    "death of a child what to do",
    "how soon after death is the funeral",
    "how long can a body stay at home after death",
    "what happens to a dead body legally",
    "do you need a death certificate to plan a funeral",
    "notifying social security of a death",
    "how to notify social security someone died",
    "reporting a death to social security",
]

crisis_death_cert = [
    "how many death certificates do i need",
    "how to get a death certificate",
    "how long does it take to get a death certificate",
    "cost of a death certificate",
    "certified copy of death certificate",
    "how to order death certificate",
    "death certificate requirements",
]

crisis_obituary = [
    "how to write an obituary",
    "obituary examples",
    "obituary templates",
    "how much does an obituary cost",
]

crisis_funeral = [
    "funeral cost",
    "average funeral cost",
    "cremation cost",
    "how much does cremation cost",
    "cheapest way to bury someone",
    "funeral home cost breakdown",
    "funeral costs without life insurance",
    "how to pay for a funeral with no money",
    "can you get help paying for a funeral",
    "funeral planning after death",
    "how to plan a funeral in a week",
    "funeral home paperwork checklist",
    "what documents are needed for a funeral",
    "do i need a funeral director",
    "direct cremation vs funeral",
    "funeral home near me",
    "cremation near me",
    "embalming vs cremation",
    "green burial options",
    "veteran burial benefits",
    "funeral costs by state",
    "cremation vs burial cost comparison",
    "how to find a funeral home",
]

crisis_body = [
    "organ donation after death",
    "how long after death can you donate organs",
    "body transport after death",
    "how to transport a body across state lines",
    "what happens to the body after death at home",
]

for kw in crisis_generic: add(kw, "crisis", "generic")
for kw in crisis_death_cert: add(kw, "crisis", "death_certificate")
for kw in crisis_obituary: add(kw, "crisis", "obituary")
for kw in crisis_funeral: add(kw, "crisis", "funeral_cost")
for kw in crisis_body: add(kw, "crisis", "body_organ")

# ---------------- EXECUTOR / ESTATE ADMINISTRATION ----------------
executor_probate_generic = [
    "what is probate",
    "how does probate work",
    "do i need probate",
    "how long does probate take",
    "how much does probate cost",
    "probate process step by step",
    "probate timeline",
    "avoiding probate",
    "how to avoid probate",
    "probate lawyer cost",
    "do i need a lawyer for probate",
    "how to file for probate",
    "probate court process",
    "how to probate a will without a lawyer",
    "diy probate",
    "online probate service",
    "probate attorney near me",
    "estate lawyer near me",
    "how to find estate attorney",
]

executor_intestate = [
    "what happens if there is no will",
    "dying without a will",
    "intestate succession",
    "who inherits if no will",
]

executor_duties = [
    "executor of estate duties",
    "what does an executor do",
    "how to become an executor",
    "executor of estate responsibilities",
    "executor compensation",
    "how much does an executor get paid",
    "can an executor be a beneficiary",
    "removing an executor",
    "how to remove an executor",
    "executor vs administrator",
    "personal representative duties",
    "letters testamentary",
    "how to get letters testamentary",
    "letters of administration",
    "what is a fiduciary duty of executor",
    "executor not communicating with beneficiaries",
    "executor stealing from estate",
    "how to choose an executor",
]

executor_settle = [
    "how to close an estate",
    "how to settle an estate",
    "how to settle an estate without a lawyer",
    "estate settlement process",
    "estate administration checklist",
    "inventory of estate assets",
    "appraisal of estate assets for probate",
    "how to distribute inheritance to siblings",
    "dividing inheritance among siblings",
    "estate distribution timeline",
    "how long to distribute estate assets",
]

executor_small_estate = [
    "small estate affidavit",
    "small estate affidavit requirements",
    "how to file a small estate affidavit",
    "small estate affidavit form",
    "what qualifies as a small estate",
    "affidavit of heirship",
]

executor_accounts = [
    "how to close bank account of deceased person",
    "closing a deceased person's bank account",
    "deceased person's bank account access",
    "how to notify banks of a death",
    "how to notify credit bureaus of a death",
    "estate bank account",
    "how to open an estate account",
    "ein for estate",
    "how to get a tax id for an estate",
]

executor_property = [
    "transfer car title deceased owner",
    "how to transfer car title after death",
    "deceased parent's house",
    "selling a deceased parent's house",
    "transferring house title after death",
    "transfer on death deed",
    "deceased homeowner mortgage",
    "what happens to a mortgage when the owner dies",
]

executor_insurance_retirement = [
    "life insurance claim after death",
    "how to file a life insurance claim",
    "life insurance payout process",
    "how long does a life insurance claim take",
    "401k inherited rules",
    "inherited ira rules",
    "inherited ira rmd rules",
    "how to claim inherited 401k",
    "beneficiary ira after death",
    "deceased person's pension benefits",
    "surviving spouse benefits",
    "widow benefits social security",
    "deceased person's social security overpayment",
    "returning social security payment after death",
]

executor_debt_tax = [
    "creditor claims against estate",
    "debt after death who is responsible",
    "am i responsible for my parents debt",
    "what happens to credit card debt when someone dies",
    "final tax return for deceased",
    "how to file taxes for a deceased person",
    "estate tax return",
    "form 1041 estate",
    "do you have to pay taxes on inheritance",
    "inheritance tax by state",
    "notify creditors of death",
    "probate notice to creditors",
    "canceling deceased person's credit cards",
    "deceased person's utility bills",
]

executor_will = [
    "how to find a will",
    "where to find a deceased person's will",
    "reading of the will process",
    "contesting a will",
    "how to contest a will",
    "will dispute process",
    "does power of attorney end at death",
    "power of attorney ends at death",
]

# state-specific probate terms
states = ["texas", "california", "florida", "new york", "ohio",
          "pennsylvania", "illinois", "georgia", "north carolina",
          "michigan", "arizona", "virginia", "washington state"]
state_tag = {
    "texas": "TX", "california": "CA", "florida": "FL", "new york": "NY",
    "ohio": "OH", "pennsylvania": "PA", "illinois": "IL", "georgia": "GA",
    "north carolina": "NC", "michigan": "MI", "arizona": "AZ",
    "virginia": "VA", "washington state": "WA",
}
executor_state_terms = []
for st in states:
    executor_state_terms.append(f"probate in {st}")
    executor_state_terms.append(f"{st} probate process")
    executor_state_terms.append(f"{st} small estate affidavit")
    executor_state_terms.append(f"how long does probate take in {st}")
# extra depth for the two prototype states (TX/CA)
executor_state_terms += [
    "probate lawyer cost texas",
    "does texas require probate",
    "california probate threshold",
    "probate lawyer cost california",
]

for kw in executor_probate_generic: add(kw, "executor", "probate_generic")
for kw in executor_intestate: add(kw, "executor", "intestate")
for kw in executor_duties: add(kw, "executor", "executor_duties")
for kw in executor_settle: add(kw, "executor", "settle_estate")
for kw in executor_small_estate: add(kw, "executor", "small_estate_affidavit")
for kw in executor_accounts: add(kw, "executor", "accounts")
for kw in executor_property: add(kw, "executor", "property")
for kw in executor_insurance_retirement: add(kw, "executor", "insurance_retirement")
for kw in executor_debt_tax: add(kw, "executor", "debt_tax")
for kw in executor_will: add(kw, "executor", "will_disputes")
for kw in executor_state_terms:
    matched = None
    for st, tag in state_tag.items():
        if st in kw:
            matched = tag
            break
    add(kw, "executor", f"state_{matched}" if matched else "state_other")

# ---------------- PRE-NEED / PLANNING ----------------
preneed_estate_planning = [
    "estate planning",
    "estate planning checklist",
    "estate planning cost",
    "estate planning attorney",
    "estate planning attorney near me",
    "how much does estate planning cost",
    "estate planning for dummies",
    "estate planning documents",
    "estate planning checklist for parents",
    "online estate planning",
    "do it yourself estate planning",
    "when should you start estate planning",
    "estate planning for young families",
    "estate planning for married couples",
    "estate planning checklist pdf",
    "estate planning software",
    "estate planning lawyer cost near me",
    "estate planning for high net worth",
    "when to update your will",
    "how often should you update your estate plan",
    "estate planning after divorce",
    "estate planning after remarriage",
    "second marriage estate planning",
]

preneed_wills = [
    "last will and testament",
    "how to write a will",
    "how to make a will",
    "cost of making a will",
    "online will maker",
    "free will template",
    "will vs trust",
    "who needs a will",
    "what happens if i die without a will",
    "guardian for minor children in a will",
    "naming a guardian for children",
    "legalzoom will cost",
    "rocket lawyer will cost",
    "pour over will",
]

preneed_trusts = [
    "living trust",
    "revocable living trust",
    "what is a living trust",
    "living trust vs will",
    "how to set up a living trust",
    "irrevocable trust",
    "trust fund",
    "setting up a trust",
    "revocable trust vs irrevocable trust",
    "living trust cost",
    "how much does a trust cost",
    "family trust",
    "special needs trust",
    "charitable trust",
    "trust and will reviews",
    "will and trust package cost",
]

preneed_poa_directives = [
    "power of attorney",
    "durable power of attorney",
    "medical power of attorney",
    "power of attorney form",
    "how to get power of attorney",
    "power of attorney for elderly parent",
    "power of attorney vs guardianship",
    "how to choose a power of attorney",
    "advance directive",
    "advance healthcare directive",
    "living will",
    "what is a living will",
    "healthcare proxy",
    "do not resuscitate order",
    "dnr order",
]

preneed_beneficiary = [
    "beneficiary designation",
    "how to update beneficiary designations",
    "transfer on death designation",
    "payable on death account",
]

preneed_affairs = [
    "get affairs in order",
    "how to get my affairs in order",
    "affairs in order checklist",
    "end of life planning checklist",
    "end of life planning",
    "how to talk to parents about estate planning",
    "talking to elderly parents about finances",
    "checklist for aging parents",
    "what documents do elderly parents need",
    "important documents for aging parents",
    "aging parent finances checklist",
    "helping elderly parents with paperwork",
    "caring for aging parents financially",
    "digital estate planning",
    "password manager for after death",
]

preneed_funeral_preplan = [
    "funeral pre planning",
    "prepaid funeral plans",
    "pre need funeral arrangements",
    "funeral trust",
]

preneed_tax_elder = [
    "estate tax exemption",
    "gift tax exemption",
    "annual gift tax exclusion",
    "succession planning family business",
    "retirement and estate planning",
    "long term care planning",
    "long term care insurance",
    "medicaid planning for nursing home",
    "medicaid asset protection trust",
    "elder law attorney",
    "elder law attorney near me",
    "nursing home planning checklist",
    "how to protect assets from nursing home costs",
    "five year lookback medicaid",
]

for kw in preneed_estate_planning: add(kw, "pre-need", "estate_planning_general")
for kw in preneed_wills: add(kw, "pre-need", "wills")
for kw in preneed_trusts: add(kw, "pre-need", "trusts")
for kw in preneed_poa_directives: add(kw, "pre-need", "poa_directives")
for kw in preneed_beneficiary: add(kw, "pre-need", "beneficiary")
for kw in preneed_affairs: add(kw, "pre-need", "affairs_in_order")
for kw in preneed_funeral_preplan: add(kw, "pre-need", "funeral_preplan")
for kw in preneed_tax_elder: add(kw, "pre-need", "tax_elder_law")

print(f"Total unique keywords: {len(KEYWORDS)}", file=sys.stderr)
for stage in ("crisis", "executor", "pre-need"):
    n = sum(1 for v in KEYWORDS.values() if v[0] == stage)
    print(f"  {stage}: {n}", file=sys.stderr)

# ---------------------------------------------------------------------------
# Batch into DataForSEO live tasks (<=1000 keywords/task). We chunk at 200 to
# keep each request small/robust; cost is $0.09/task regardless of size.
# ---------------------------------------------------------------------------
all_kw = list(KEYWORDS.keys())
CHUNK = 200
chunks = [all_kw[i:i+CHUNK] for i in range(0, len(all_kw), CHUNK)]
print(f"Chunks: {len(chunks)} (sizes: {[len(c) for c in chunks]})", file=sys.stderr)

results = []
total_cost = 0.0
for i, chunk in enumerate(chunks):
    payload = json.dumps([{
        "keywords": chunk,
        "location_code": LOCATION_CODE,
        "language_code": LANGUAGE_CODE,
    }])
    proc = subprocess.run(
        ["curl", "-s",
         "-H", f"Authorization: Basic {token}",
         "-H", "Content-Type: application/json",
         "-d", payload,
         "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live"],
        capture_output=True, text=True,
    )
    d = json.loads(proc.stdout)
    cost = d.get("cost", 0)
    total_cost += cost
    task = d["tasks"][0]
    print(f"chunk {i}: status={task['status_message']} cost=${cost}", file=sys.stderr)
    if not task.get("result"):
        print(json.dumps(d, indent=2)[:3000], file=sys.stderr)
        continue
    results.extend(task["result"])
    time.sleep(0.5)

print(f"TOTAL COST: ${total_cost:.2f}", file=sys.stderr)

# ---------------------------------------------------------------------------
# Write CSV
# ---------------------------------------------------------------------------
import csv

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "keywords.csv")
seen = set()
rows_written = 0
with open(OUT, "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["keyword", "stage", "substage", "search_volume", "cpc", "competition",
                "vol_12mo_avg", "vol_12mo_min", "vol_12mo_max"])
    for item in results:
        kw = item["keyword"]
        if kw in seen:
            continue
        seen.add(kw)
        stage, substage = KEYWORDS.get(kw, ("?", "?"))
        vol = item.get("search_volume")
        cpc = item.get("cpc")
        comp = item.get("competition")
        monthly = item.get("monthly_searches") or []
        vals = [m.get("search_volume") for m in monthly if m.get("search_volume") is not None]
        vavg = round(sum(vals)/len(vals), 1) if vals else ""
        vmin = min(vals) if vals else ""
        vmax = max(vals) if vals else ""
        w.writerow([kw, stage, substage, vol, cpc, comp, vavg, vmin, vmax])
        rows_written += 1

print(f"Rows written: {rows_written} -> {OUT}", file=sys.stderr)

# also dump raw monthly_searches json for seasonality analysis
import json as _json
RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raw_monthly.json")
raw_out = []
for item in results:
    kw = item["keyword"]
    stage, substage = KEYWORDS.get(kw, ("?", "?"))
    raw_out.append({
        "keyword": kw, "stage": stage, "substage": substage,
        "search_volume": item.get("search_volume"),
        "cpc": item.get("cpc"),
        "monthly_searches": item.get("monthly_searches"),
    })
with open(RAW, "w") as f:
    _json.dump(raw_out, f, indent=2)
print(f"Raw monthly data -> {RAW}", file=sys.stderr)
