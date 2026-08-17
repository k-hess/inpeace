import { ReferenceSection } from "#/components/plan/reference-section"
import type { PlanCard } from "#/lib/plan-engine"

export function EdgeCasesSection({
  cards,
  id,
  expanded,
  onExpand,
}: {
  cards: PlanCard[]
  id: string
  expanded: boolean
  onExpand: () => void
}) {
  if (cards.length === 0) return null

  return (
    <ReferenceSection
      id={id}
      kicker="Easy to miss"
      heading="Worth knowing before you need it."
      essence="Nothing urgent today, but each one is cheaper to know about in advance than to discover in the moment."
      expanded={expanded}
      onExpand={onExpand}
    >
      <h2 className="display text-2xl leading-snug text-foreground sm:text-3xl">
        Worth knowing before you need it.
      </h2>
      <p className="mt-5 mb-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
        None of these are urgent today, but each one is the kind of thing that's much cheaper to know
        about in advance than to discover in the moment.
      </p>
      <div className="flex flex-col gap-3">
        {cards.map((card) => (
          <div key={card.id} className="card-surface rounded-2xl px-6 py-5">
            <p className="font-medium text-foreground">{card.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
          </div>
        ))}
      </div>
    </ReferenceSection>
  )
}
