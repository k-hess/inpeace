import { ReferenceSection } from "#/components/plan/reference-section"
import type { PlanCard } from "#/lib/plan-engine"

export function LiabilitiesSection({
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
      kicker="Debts"
      heading="The debts don't become yours."
      essence="The estate pays what it owes before anything else happens — the general shape of it, and where to check if something looks specific to you."
      expanded={expanded}
      onExpand={onExpand}
    >
      <h2 className="display text-2xl leading-snug text-foreground sm:text-3xl">
        The debts don't become yours.
      </h2>
      <p className="mt-5 mb-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
        The estate pays what it owes before anything else happens — here's the general shape of it, and
        where to check if something looks specific to you.
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
