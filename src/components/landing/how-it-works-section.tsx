interface Step {
  title: string
  body: string
}

const STEPS: Step[] = [
  {
    title: "Answer a few questions",
    body: "About five of them. Nothing to prepare, nothing to get right.",
  },
  {
    title: "See your plan",
    body: "A calm, personal rundown — what's this week, what's this month, and what can wait.",
  },
  {
    title: "Come back whenever",
    body: "It's still here next week, next month. Nothing expires and nothing nags you.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="mb-20">
      <p className="kicker mb-8 text-center">How it works</p>
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
        {STEPS.map((step, index) => (
          <div key={step.title} className="text-center">
            <p className="font-serif text-3xl text-primary/45">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-3 font-medium text-foreground">{step.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
