import type { PlanCard } from "#/lib/plan-engine"

export function CanWaitSection({ items, id }: { items: PlanCard[]; id: string }) {
  if (items.length === 0) return null

  return (
    <section id={id} className="section-anchor mb-16">
      <p className="kicker kicker-rule mb-4">It can wait</p>
      <h2 className="display text-2xl leading-snug text-foreground sm:text-3xl">Almost everything can wait.</h2>
      <p className="mt-5 mb-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
        Most of what people panic about in these first few weeks has no real deadline attached to it.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-dashed border-border px-6 py-5">
            <p className="font-medium text-foreground">{item.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
