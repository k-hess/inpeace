interface Step {
  title: string
  body: string
}

const STEPS: Step[] = [
  {
    title: "Answer a few questions",
    body: "A few short questions. There's nothing to prepare.",
  },
  {
    title: "See your plan",
    body: "A calm, personal rundown of what needs you this month and what can wait.",
  },
  {
    title: "Come back whenever",
    body: "It's still here next week and next month. Nothing expires.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="mb-24">
      <p className="kicker mb-10 text-center">How it works</p>
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
        {STEPS.map((step, index) => (
          <div key={step.title} className="text-center">
            <p className="font-serif text-4xl text-primary/40">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-4 font-medium text-foreground">{step.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
