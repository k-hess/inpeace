import type { PlanCard } from "#/lib/plan-engine"

export function ProtectionSection({ cards, id }: { cards: PlanCard[]; id: string }) {
  if (cards.length === 0) return null

  return (
    <section id={id} className="section-anchor mb-16">
      <p className="kicker kicker-rule mb-4">Protect yourself</p>
      <p className="mb-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
        Nothing is wrong. These are the few mistakes that can't be undone, listed here so you see them early.
      </p>
      <div className="flex flex-col gap-3">
        {cards.map((card) => (
          <div key={card.id} className="protect-card px-6 py-5">
            <p className="font-medium">{card.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed opacity-90">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
