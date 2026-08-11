import type { ReactNode } from "react"

/**
 * Bare "read this section" summary card — the shared building block for
 * both full reference sections (ReferenceSection below) and the narrower
 * certificate-explainer collapse nested inside the Paperwork section (see
 * paperwork-section.tsx). Two lines, one quiet affordance, no chevrons or
 * theatrics.
 */
export function CollapsibleSummary({
  heading,
  essence,
  onExpand,
}: {
  heading: string
  essence: string
  onExpand: () => void
}) {
  return (
    <div className="card-surface rounded-2xl px-6 py-6">
      <p className="font-medium text-foreground">{heading}</p>
      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground">{essence}</p>
      <button
        type="button"
        onClick={onExpand}
        className="mt-4 text-sm font-medium text-primary underline decoration-dashed underline-offset-4 transition hover:opacity-80"
      >
        Read this section
      </button>
    </div>
  )
}

/**
 * Wraps a "reference" section (the funeral home, debts, easy to miss,
 * choosing who to trust) so it stays fully present in the page and the
 * section nav at all times, but its full body only mounts once expanded —
 * before that, a CollapsibleSummary stands in its place. Expand state is
 * owned by the caller (persisted progress state, see intake-context.tsx)
 * so it survives a reload, and the section nav can force a section open
 * when someone jumps here directly (see plan-screen.tsx's expandSection).
 */
export function ReferenceSection({
  id,
  kicker,
  heading,
  essence,
  expanded,
  onExpand,
  children,
}: {
  id: string
  kicker: string
  heading: string
  essence: string
  expanded: boolean
  onExpand: () => void
  children: ReactNode
}) {
  return (
    <section id={id} className="section-anchor mb-16">
      <p className="kicker kicker-rule mb-4">{kicker}</p>
      {expanded ? children : <CollapsibleSummary heading={heading} essence={essence} onExpand={onExpand} />}
    </section>
  )
}
