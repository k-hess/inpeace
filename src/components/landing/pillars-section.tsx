interface Pillar {
  title: string
  body: string
}

/** Mirrors the product's own four layers, condensed into three plain ideas. */
const PILLARS: Pillar[] = [
  {
    title: "Paced to how you're doing",
    body: "Built around how you're doing and what they left behind, with real dates. Rest is part of the plan.",
  },
  {
    title: "Protection from the mistakes nobody warns you about",
    body: "Decisions that can't be undone, like missed deadlines, signed-away rights, or deals made too fast, get flagged gently, before they happen.",
  },
  {
    title: "People, when you want them",
    body: "Grief support, death doulas, estate attorneys: introduced when they'd help.",
  },
]

export function PillarsSection() {
  return (
    <section className="mb-24">
      <div className="grid gap-4 sm:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div key={pillar.title} className="card-surface rounded-2xl px-6 py-7">
            <p className="font-serif text-lg leading-snug text-balance text-foreground">{pillar.title}</p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
