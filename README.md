# In Peace

A calm guide for the weeks after a death, and for getting a family's affairs in order before one. Prototype, live at https://inpeace.kylehess.workers.dev.

Someone answers a few questions (which situation they're in, state, date, whether there was a will, what assets exist, who's around to help) and gets a plan: a phased timeline with real computed deadlines, an inventory of accounts and people to notify, guidance on funeral costs and rights, what can wait, and who to lean on. Everything runs in the browser. There is no account, no server, and no data leaves the device.

The research and the plan behind the product are in [`docs/`](docs/README.md). The group deck is at [`public/deck.html`](public/deck.html).

## Run it

Needs [Bun](https://bun.sh).

```bash
bun install
bun run dev        # http://localhost:3000
```

Other commands:

```bash
bun run build      # production build to dist/client
bun run typecheck  # tsc, no emit
bun run preview    # serve the production build locally
```

Demo scenarios, useful for skipping the intake: `/plan?demo=a` (Texas, no will, alone, veteran), `/plan?demo=b` (California, will, home and retirement, with family), `/plan?demo=c` and `/plan?demo=d` (the two planning-ahead doors). There's also a small "demo" link in the footer.

## Making changes with an AI agent

The repo is set up so you can hand it to Claude, ChatGPT, Cursor, or similar and describe the change in plain language. [`AGENTS.md`](AGENTS.md) tells the agent how the codebase is organized and what the conventions are. Good asks look like:

- "Add Florida to the state rules engine, with its small-estate affidavit threshold and waiting period."
- "Add a card to the funeral guidance section about veterans' burial benefits."
- "Change the wording of the 'It can wait' section on the landing page."
- "Add a religion option for Buddhist and adjust the funeral timing note."

Most content lives in plain TypeScript data files under `src/data/`, so many changes are copy edits, not code.

## How it's built

TanStack Start (React 19, file-based routing) as a client-only SPA, Tailwind 4 with shadcn/ui components, deployed as static assets on Cloudflare Workers. State is a single React context persisted to `localStorage`.

```
src/
  routes/          three pages: / (landing), /start (intake), /plan (the plan)
  components/
    landing/       landing page sections
    intake/        the question wizard, one file per step
    plan/          plan screen sections (timeline, inventory, care circle, guidance, ...)
    layout/        header and footer
    ui/            shadcn primitives
  data/            all guidance content, as typed data
    states/        per-state rules (tx.ts, ca.ts) and the Rule type
    *.ts           funeral guidance, certificates, edge cases, inventory, people, religion, ...
  lib/
    plan-engine.ts turns intake answers into a plan (which rules fire, computed dates, sections)
    analytics.ts   PostHog wrapper, key intentionally blank
  store/           intake context and localStorage persistence
  types/           IntakeAnswers and friends
public/
  deck.html        the group deck, self-contained HTML
  fonts/           self-hosted Fraunces
docs/              research and the phased plan
```

The core idea in the code: a `Rule` has a `trigger(answers)`, a `copy(ctx)` that returns a title and body, an optional `computeDate(ctx)`, and a phase (this week / this month / months ahead). The plan engine collects the rules that fire for a given set of answers, sorts them into phases, and the plan screen renders them. Adding guidance usually means adding a rule to a data file.

## Deploy

`bun run build && bunx wrangler deploy`. `wrangler.jsonc` targets the ParkerStreet Cloudflare account; you'll need access to that account, or change the `account_id` to deploy elsewhere.
