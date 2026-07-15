import type { PlanCard } from "#/lib/plan-engine"

export function ProtectionSection({ cards }: { cards: PlanCard[] }) {
  if (cards.length === 0) return null

  return (
    <section className="mb-16">
      <p className="kicker mb-4">Protect yourself</p>
      <p className="mb-6 max-w-lg text-muted-foreground">
        Not because anything is wrong — these are just the few mistakes that can't be undone.
      </p>
      <div className="flex flex-col gap-3">
        {cards.map((card) => (
          <div key={card.id} className="protect-card rounded-2xl px-6 py-5">
            <p className="font-medium">{card.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed opacity-90">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
