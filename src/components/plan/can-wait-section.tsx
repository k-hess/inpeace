import { useIntake } from "#/store/intake-context"
import type { PlanCard } from "#/lib/plan-engine"

/**
 * Timeline tasks that were deferred with "Not yet" (see timeline-section.tsx)
 * land here, under their own quiet subgroup, with a no-guilt way back.
 */
function RestingGroup({ cards }: { cards: PlanCard[] }) {
  const { updateProgress } = useIntake()
  if (cards.length === 0) return null

  function bringBack(id: string) {
    updateProgress((prev) => ({ ...prev, tasks: { ...prev.tasks, [id]: { status: "open", handoff: null } } }))
  }

  return (
    <div className="mt-8">
      <p className="kicker mb-4">Resting for now</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <div key={card.id} className="rounded-2xl border border-dashed border-border px-6 py-5">
            <p className="font-medium text-foreground">{card.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            <button
              type="button"
              onClick={() => bringBack(card.id)}
              className="mt-3 text-xs font-medium text-muted-foreground underline decoration-dashed underline-offset-4 transition hover:text-foreground"
            >
              Bring it back
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CanWaitSection({
  items,
  resting,
  id,
}: {
  items: PlanCard[]
  resting: PlanCard[]
  id: string
}) {
  if (items.length === 0 && resting.length === 0) return null

  return (
    <section id={id} className="section-anchor mb-16">
      <p className="kicker kicker-rule mb-4">It can wait</p>
      <h2 className="display text-2xl leading-snug text-foreground sm:text-3xl">Almost everything can wait.</h2>
      <p className="mt-5 mb-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
        Most of what people panic about in these first few weeks has no real deadline attached to it.
      </p>
      {items.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-dashed border-border px-6 py-5">
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      ) : null}
      <RestingGroup cards={resting} />
    </section>
  )
}
