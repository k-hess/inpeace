import { costRanges, yourRights, whatToAsk, redFlags } from "#/data/funeral-guidance"
import { ReferenceSection } from "#/components/plan/reference-section"

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

function CostRanges() {
  if (costRanges.length === 0) return null

  return (
    <div className="card-surface rounded-2xl px-6 py-6">
      <p className="font-medium text-foreground">What things tend to cost</p>
      <p className="mt-3 mb-5 inline-block rounded-full border border-dashed border-border px-3 py-1 text-xs font-medium text-muted-foreground">
        Regional variation is large — these are sanity checks, not quotes.
      </p>
      <div className="flex flex-col divide-y divide-border/70">
        {costRanges.map((range) => (
          <div key={range.id} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-sm font-medium text-foreground">{range.label}</span>
              <span className="shrink-0 font-serif text-sm text-foreground">
                {formatCurrency(range.low)}–{formatCurrency(range.high)}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{range.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function YourRights() {
  if (yourRights.length === 0) return null

  return (
    <div className="card-surface rounded-2xl px-6 py-6">
      <p className="font-medium text-foreground">What you're entitled to ask for</p>
      <ul className="mt-4 flex flex-col gap-3">
        {yourRights.map((right) => (
          <li key={right.id} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sage-400)]" aria-hidden />
            <div>
              <p className="text-sm font-medium text-foreground">{right.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{right.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function WhatToAsk() {
  if (whatToAsk.length === 0) return null

  return (
    <div className="card-surface rounded-2xl px-6 py-6">
      <p className="font-medium text-foreground">Questions to bring with you</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {whatToAsk.map((question) => (
          <li key={question} className="text-sm leading-relaxed text-foreground">
            "{question}"
          </li>
        ))}
      </ul>
    </div>
  )
}

function RedFlags() {
  if (redFlags.length === 0) return null

  return (
    <div className="protect-card px-6 py-5">
      <p className="font-medium">Red flags</p>
      <ul className="mt-2.5 flex flex-col gap-1.5">
        {redFlags.map((flag) => (
          <li key={flag} className="text-sm leading-relaxed opacity-90">
            {flag}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FuneralGuidanceSection({
  id,
  expanded,
  onExpand,
}: {
  id: string
  expanded: boolean
  onExpand: () => void
}) {
  if (costRanges.length === 0 && yourRights.length === 0 && whatToAsk.length === 0 && redFlags.length === 0) {
    return null
  }

  return (
    <ReferenceSection
      id={id}
      kicker="The funeral home"
      heading="You have more say here than it feels like."
      essence="The largest unshopped purchase in the whole process — rough costs, what you're entitled to ask for, and the red flags worth knowing."
      expanded={expanded}
      onExpand={onExpand}
    >
      <h2 className="display text-2xl leading-snug text-foreground sm:text-3xl">
        You have more say here than it feels like.
      </h2>
      <p className="mt-5 mb-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
        This is usually the largest unshopped purchase in the whole process, made in shock, often the same
        day. Knowing the rough numbers and what you're entitled to ask for is most of the defense.
      </p>
      <div className="flex flex-col gap-4">
        <CostRanges />
        <YourRights />
        <WhatToAsk />
        <RedFlags />
      </div>
    </ReferenceSection>
  )
}
