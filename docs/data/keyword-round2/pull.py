"""
DataForSEO Google Ads search-volume pull for the "In Peace" keyword demand
study, round 2. Probes categories round-1's seed list never covered:
inventory-wall, digital-legacy, executor-longtail, guided-service,
inheritance-moment, notification-cancellation, aging-parent, remains-transport,
competitor-brands, coordination-registry.

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
# Keyword set. Value = category
# ---------------------------------------------------------------------------
KEYWORDS = {}

def add(kw, category):
    KEYWORDS[kw.lower().strip()] = category

# ---------------- 1. INVENTORY-WALL ----------------
inventory_wall = [
    "death binder",
    "in case of death binder",
    "in case of death folder",
    "in case i die binder",
    "emergency binder",
    "emergency binder template",
    "legacy binder",
    "when i die folder",
    "when i die binder",
    "important documents organizer",
    "important documents organizer for family",
    "estate organizer",
    "estate organizer binder",
    "digital estate planning",
    "digital estate planning tool",
    "what happens to my accounts when i die",
    "what happens to my accounts when i die checklist",
    "family emergency plan documents",
    "family emergency binder printable",
    "end of life organizer",
    "end of life binder",
    "end of life planning binder",
    "life documents organizer",
    "personal records organizer",
    "household binder for emergencies",
    "in case of emergency binder printable",
    "if i die binder template",
    "estate planning binder printable",
    "important papers checklist for family",
    "where to keep important documents for family",
    "document organizer for death",
    "checklist of documents needed when someone dies",
    "family information organizer",
    "grab and go binder emergency",
    "death file organizer",
    "personal affairs organizer",
    "life admin binder",
    "final wishes document",
    "final wishes planner",
    "final wishes organizer",
    "letter of instruction after death",
    "letter of instruction template",
    "nokbox",
    "nokbox reviews",
    "nokbox alternative",
    "peace of mind planner",
    "peace of mind planner reviews",
    "everplans reviews",
    "getting your affairs in order binder",
    "affairs in order binder template",
    "in case of emergency folder for family",
    "death preparedness checklist",
    "organize documents before you die",
    "app to organize documents for family after death",
    "app for storing important documents family emergency",
    "where to store estate documents",
    "family vault important documents",
    "digital vault for documents",
    "digital vault estate planning",
    "app to store passwords and documents for family",
    "family emergency information sheet",
    "in case of emergency contact sheet",
    "important information sheet for family",
    "what my family needs to know when i die",
    "list of accounts for family after death",
    "list of passwords for family after death",
    "checklist of things to do before you die",
    "financial organizer for family",
    "life planning binder",
    "personal record keeper",
    "household inventory for emergencies",
    "estate planning checklist for family",
    "document locator system",
    "records organizer app",
    "life documents checklist",
    "who gets my stuff when i die planner",
    "planning ahead binder",
    "just in case binder",
    "just in case planner",
    "family preparedness binder",
    "critical information binder",
    "vital documents checklist",
    "where do i keep my will and important papers",
    "app to organize will and documents",
    "software to organize estate documents",
    "estate planning app",
    "estate planning app reviews",
    "app for end of life planning",
    "app to plan for death",
    "digital binder for family emergencies",
    "cloud storage for important documents family",
]

# ---------------- 2. DIGITAL-LEGACY ----------------
digital_legacy = [
    "apple legacy contact",
    "apple legacy contact setup",
    "how to set up apple legacy contact",
    "google inactive account manager",
    "google inactive account manager setup",
    "facebook memorialize account",
    "how to memorialize a facebook account",
    "facebook legacy contact",
    "digital legacy",
    "digital legacy planning",
    "what is digital legacy",
    "password manager emergency access",
    "1password emergency kit",
    "1password emergency access",
    "lastpass emergency access",
    "bitwarden emergency access",
    "what happens to email when you die",
    "what happens to gmail account when you die",
    "delete deceased social media",
    "how to delete a deceased person's facebook",
    "how to close a deceased person's instagram",
    "how to close deceased person's email account",
    "how to access a deceased person's phone",
    "how to access deceased person's icloud",
    "who inherits digital assets after death",
    "digital assets after death",
    "digital inheritance",
    "digital estate plan template",
    "what happens to instagram account when you die",
    "what happens to twitter account when you die",
    "what happens to netflix account when you die",
    "what happens to amazon account when you die",
    "deceased person social media accounts",
    "closing accounts after death checklist",
    "how to report a death to facebook",
    "memorial account instagram",
    "digital afterlife",
    "password inheritance planning",
    "google account after death",
    "manage a deceased loved one's account google",
    "microsoft account after death",
    "linkedin account after death",
    "how to delete a deceased person's linkedin",
    "tiktok account after death",
    "who owns digital assets after death",
    "digital executor",
    "what is a digital executor",
    "naming a digital executor",
    "estate plan for digital assets",
    "cryptocurrency inheritance",
    "how to leave crypto to heirs",
    "crypto wallet inheritance",
    "photos after death icloud",
    "google photos after someone dies",
    "venmo account after death",
    "paypal account after death",
    "closing venmo account of deceased",
    "digital life after death planning",
    "online accounts inventory for estate",
]

# ---------------- 3. EXECUTOR-LONGTAIL ----------------
executor_longtail = [
    "executor checklist",
    "executor of estate checklist",
    "executor checklist pdf",
    "how to settle an estate",
    "how to settle an estate checklist",
    "estate settlement checklist",
    "settling an estate after death",
    "settling an estate checklist",
    "executor duties",
    "executor duties checklist",
    "being an executor",
    "being an executor of a will",
    "executor of a will responsibilities",
    "how long does probate take",
    "how long does probate take on average",
    "probate without a lawyer",
    "how to do probate without a lawyer",
    "first steps as executor of estate",
    "what to do first as an executor",
    "executor timeline",
    "executor of estate timeline",
    "executor checklist first 30 days",
    "how to be an executor step by step",
    "executor of estate step by step guide",
    "probate checklist",
    "probate process checklist",
    "how to notify beneficiaries",
    "notifying beneficiaries of estate",
    "how to value estate assets",
    "estate inventory checklist",
    "executor of estate forms",
    "executor bond",
    "do i need an executor bond",
    "how to resign as executor",
    "co-executor disputes",
    "sibling disputes over estate",
    "executor deadline probate",
    "how soon do you have to file probate after death",
    "executor of estate no will",
    "how to become administrator of estate",
    "settling parents estate",
    "settling a parent's estate checklist",
    "estate closing checklist",
    "how to close an estate step by step",
    "executor of estate first steps",
    "what happens after probate is granted",
    "how to transfer assets after probate",
    "final accounting of estate",
    "estate accounting checklist",
    "executor fee calculator",
    "how much should an executor charge",
    "executor of will no experience",
    "diy executor guide",
    "checklist for closing a loved one's estate",
    "how to be an executor for the first time",
    "executor of estate deadlines by state",
    "probate deadlines checklist",
    "what an executor needs from a lawyer",
    "do i need a probate lawyer",
    "executor personal liability",
    "executor liable for estate debts",
]

# ---------------- 4. GUIDED-SERVICE DEMAND ----------------
guided_service = [
    "probate help",
    "help settling an estate",
    "help with executor duties",
    "estate settlement services",
    "estate settlement service near me",
    "executor services",
    "professional executor services",
    "estate administration services",
    "estate administration company",
    "after loss concierge",
    "death doula near me",
    "end of life doula",
    "end of life doula near me",
    "end of life doula cost",
    "bereavement services",
    "grief concierge",
    "hire someone to settle an estate",
    "hire an executor",
    "professional estate administrator",
    "estate cleanout services",
    "estate liquidation services",
    "probate concierge service",
    "help closing out a loved one's affairs",
    "help with paperwork after death",
    "who can help me settle my parent's estate",
    "estate settlement company",
    "fiduciary services for estates",
    "professional fiduciary near me",
    "trust administration services",
    "trustee services company",
    "hire a professional trustee",
    "estate settlement attorney near me",
    "full service estate settlement",
    "post loss services",
    "post loss support company",
    "loss and grief support services",
    "grief coach",
    "grief counselor near me",
    "grief therapist near me",
    "family estate consultant",
    "personal representative for hire",
    "estate liquidator near me",
    "who can settle an estate for me",
    "concierge service after death of parent",
    "help with funeral and estate logistics",
    "outsource executor duties",
    "estate settlement subscription service",
]

# ---------------- 5. INHERITANCE-MOMENT ----------------
inheritance_moment = [
    "what to do with inheritance",
    "inherited money what to do",
    "received inheritance now what",
    "just inherited money what do i do",
    "inherited ira rules",
    "inherited ira rmd rules",
    "inheritance tax by state",
    "do i pay taxes on inheritance",
    "do you have to pay taxes on inherited money",
    "financial advisor for inheritance",
    "sudden money advisor",
    "sudden wealth syndrome",
    "what to do when you inherit a house",
    "inherited house what to do",
    "sell or keep inherited house",
    "how to invest inheritance money",
    "inheritance windfall advice",
    "large inheritance advice",
    "inherited 401k rules",
    "inherited stock cost basis",
    "step up in basis inherited property",
    "inheritance planning advisor",
    "what to do with a lump sum inheritance",
    "inheritance advisor near me",
    "how to manage a windfall",
    "capital gains on inherited property",
    "what to do when a parent dies financially",
    "financial checklist after parent dies",
    "inherited annuity rules",
    "inherited roth ira rules",
    "how to split inheritance fairly",
    "should i pay off debt with inheritance",
    "inheritance and divorce",
    "is inheritance marital property",
    "inheritance advance",
    "probate advance loan",
    "inheritance loan",
    "trust fund distribution advice",
    "what to do with life insurance payout",
    "life insurance payout advice",
    "how to invest a lump sum payout",
    "wealth management after inheritance",
    "financial planner after death of spouse",
    "money management after losing a spouse",
    "widow financial planning",
    "sudden inheritance tax planning",
]

# ---------------- 6. NOTIFICATION-CANCELLATION ----------------
notification_cancellation = [
    "who to notify when someone dies",
    "who to notify when someone dies checklist",
    "notify social security of death",
    "how to notify social security of a death",
    "notify banks of death",
    "how to notify banks of a death",
    "cancel subscriptions for deceased",
    "cancel netflix for deceased person",
    "deceased do not contact list",
    "deceased do not contact list mail",
    "stop mail for deceased",
    "how to stop mail for a deceased person",
    "credit bureaus death notification",
    "notify credit bureaus of death",
    "deceased alert credit report",
    "notify equifax of death",
    "notify experian of death",
    "notify transunion of death",
    "who to notify when a family member dies",
    "cancel deceased person's driver's license",
    "cancel deceased person's passport",
    "notify dmv of death",
    "notify irs of death",
    "notify employer of death",
    "cancel deceased person's credit cards",
    "cancel deceased person's phone plan",
    "cancel deceased person's utilities",
    "identity theft of deceased person",
    "deceased identity theft prevention",
    "notify medicare of death",
    "notify medicaid of death",
    "notify va of death",
    "notify pension of death",
    "notify life insurance company of death",
    "notify mortgage company of death",
    "notify landlord of death",
    "notify hoa of death",
    "notify employer 401k of death",
    "cancel amazon prime deceased",
    "cancel gym membership deceased",
    "cancel deceased person's email subscriptions",
    "who to inform when someone passes away",
    "checklist of who to call when someone dies",
    "death notification checklist",
    "post death checklist administrative tasks",
    "administrative tasks after death",
]

# ---------------- 7. AGING-PARENT ARC ----------------
aging_parent = [
    "aging parents checklist",
    "aging parent checklist pdf",
    "how to talk to parents about estate planning",
    "how to talk to aging parents about their finances",
    "getting parents affairs in order",
    "getting elderly parents affairs in order checklist",
    "elderly parent financial checklist",
    "conversation with parents about death",
    "how to talk to parents about death and dying",
    "power of attorney for elderly parent",
    "how to get power of attorney for elderly parent",
    "caregiver checklist aging parent",
    "checklist for aging parents documents",
    "what documents do i need for aging parents",
    "aging in place checklist",
    "elderly parent moving in checklist",
    "questions to ask aging parents about finances",
    "helping parents plan for end of life",
    "documents to gather for elderly parents",
    "how to help elderly parents organize finances",
    "sandwich generation caregiving",
    "adult child caregiver checklist",
    "when to worry about aging parent",
    "signs elderly parent needs help",
    "how to bring up end of life planning with parents",
    "parents refuse to plan for end of life",
    "estate planning conversation starters family",
    "family meeting about parents estate",
    "how to ask parents about their will",
    "parents won't talk about finances",
    "helping parents downsize checklist",
    "elder care planning checklist",
    "long distance caregiving checklist",
    "when parents can no longer live alone",
    "signs it's time for assisted living",
    "how to plan for parents care needs",
    "family caregiver agreement",
    "guardianship for aging parent",
    "conservatorship for elderly parent",
]

# ---------------- 8. REMAINS-TRANSPORT ----------------
remains_transport = [
    "transport body to another country",
    "sending remains overseas",
    "repatriation of remains",
    "repatriation of remains cost",
    "flying with cremated remains",
    "TSA cremated remains",
    "tsa rules cremated remains",
    "shipping ashes internationally",
    "taking ashes on a plane",
    "can you fly with ashes",
    "how to travel with cremated remains",
    "shipping a body internationally",
    "international shipping of human remains",
    "cost to ship a body overseas",
    "how to transport a body across state lines",
    "airline policy cremated remains",
    "mailing cremated remains usps",
    "can you mail ashes",
    "documents needed to transport a body internationally",
    "consulate death abroad repatriation",
    "death of american citizen abroad",
    "what to do if someone dies abroad",
    "death overseas repatriation process",
    "cost to bring a body home from another country",
    "medical repatriation cost",
    "repatriation insurance",
    "travel insurance repatriation of remains",
    "how to bring a body back from another country",
    "international funeral home coordination",
    "customs requirements for shipping remains",
    "embalming requirements for international transport",
]

# ---------------- 9. COMPETITOR-BRANDS ----------------
competitor_brands = [
    "empathy app",
    "empathy grief app",
    "empathy app reviews",
    "cake end of life",
    "cake end of life planning",
    "cake app end of life",
    "everplans",
    "everplans reviews",
    "everplans cost",
    "ever loved",
    "ever loved reviews",
    "lantern end of life",
    "lantern app end of life",
    "trust and will",
    "trust and will reviews",
    "farewill",
    "goodtrust",
    "goodtrust reviews",
    "gathered here",
    "grief app",
    "death planning app",
    "estate app",
    "end of life planning app",
    "app for after someone dies",
    "app to help settle an estate",
    "empathy.com",
    "cake app",
    "cake vs everplans",
    "everplans vs trust and will",
    "farewill reviews",
    "farewill cost",
    "goodtrust vs everplans",
    "gathered here reviews",
    "gathered here app",
    "lantern grief app",
    "clocr",
    "clocr reviews",
    "wingspan estate planning",
    "willed app",
    "cover me estate planning app",
    "afterword app",
    "estateguru app",
    "lasting will app",
]

# ---------------- 10. COORDINATION-REGISTRY ----------------
coordination_registry = [
    "meal train",
    "meal train after death",
    "meal train sign up",
    "memorial fund",
    "how to set up a memorial fund",
    "funeral gofundme",
    "funeral gofundme examples",
    "how to help a grieving friend",
    "what to bring to a grieving family",
    "sympathy meal ideas",
    "care calendar for grieving family",
    "how to organize help for grieving family",
    "casserole schedule funeral",
    "gift ideas for grieving family",
    "how to coordinate meals for a family in need",
    "sign up genius meal train",
    "support a friend after a death",
    "what to say to someone who lost a parent",
    "sympathy gift ideas after death",
    "care package for grieving family",
    "how to organize a meal train",
    "meal train ideas",
    "meal train app",
    "takethemameal",
    "lotsa helping hands",
    "give in kind",
    "gofundme for funeral expenses",
    "how to ask for donations for funeral costs",
    "funeral expense fundraiser ideas",
    "help paying for funeral crowdfunding",
    "volunteer sign up sheet for grieving family",
    "coordinate help for family after death",
    "how to organize support for a grieving coworker",
    "grief support group near me",
    "condolence gift basket",
    "sympathy flowers vs donation",
    "what not to say to someone grieving",
]

for kw in inventory_wall: add(kw, "inventory-wall")
for kw in digital_legacy: add(kw, "digital-legacy")
for kw in executor_longtail: add(kw, "executor-longtail")
for kw in guided_service: add(kw, "guided-service")
for kw in inheritance_moment: add(kw, "inheritance-moment")
for kw in notification_cancellation: add(kw, "notification-cancellation")
for kw in aging_parent: add(kw, "aging-parent")
for kw in remains_transport: add(kw, "remains-transport")
for kw in competitor_brands: add(kw, "competitor-brands")
for kw in coordination_registry: add(kw, "coordination-registry")

print(f"Total unique keywords: {len(KEYWORDS)}", file=sys.stderr)
for cat in ("inventory-wall", "digital-legacy", "executor-longtail", "guided-service",
            "inheritance-moment", "notification-cancellation", "aging-parent",
            "remains-transport", "competitor-brands", "coordination-registry"):
    n = sum(1 for v in KEYWORDS.values() if v == cat)
    print(f"  {cat}: {n}", file=sys.stderr)

# ---------------------------------------------------------------------------
# Batch into DataForSEO live tasks (<=1000 keywords/task). Everything fits
# in a single task well under 1000; cost is $0.09/task.
# ---------------------------------------------------------------------------
all_kw = list(KEYWORDS.keys())
CHUNK = 1000
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
    w.writerow(["keyword", "category", "search_volume", "cpc", "competition",
                "vol_12mo_avg", "vol_12mo_min", "vol_12mo_max"])
    for item in results:
        kw = item["keyword"]
        if kw in seen:
            continue
        seen.add(kw)
        category = KEYWORDS.get(kw, "?")
        vol = item.get("search_volume")
        cpc = item.get("cpc")
        comp = item.get("competition")
        monthly = item.get("monthly_searches") or []
        vals = [m.get("search_volume") for m in monthly if m.get("search_volume") is not None]
        vavg = round(sum(vals)/len(vals), 1) if vals else ""
        vmin = min(vals) if vals else ""
        vmax = max(vals) if vals else ""
        w.writerow([kw, category, vol, cpc, comp, vavg, vmin, vmax])
        rows_written += 1

print(f"Rows written: {rows_written} -> {OUT}", file=sys.stderr)

# also dump raw monthly_searches json for seasonality analysis
import json as _json
RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raw_monthly.json")
raw_out = []
for item in results:
    kw = item["keyword"]
    category = KEYWORDS.get(kw, "?")
    raw_out.append({
        "keyword": kw, "category": category,
        "search_volume": item.get("search_volume"),
        "cpc": item.get("cpc"),
        "monthly_searches": item.get("monthly_searches"),
    })
with open(RAW, "w") as f:
    _json.dump(raw_out, f, indent=2)
print(f"Raw monthly data -> {RAW}", file=sys.stderr)
