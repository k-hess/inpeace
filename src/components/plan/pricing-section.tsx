/**
 * Interview-prop only: gated behind the hidden footer "demo" menu, never
 * shown in a real walkthrough. Toggled via IntakeContext's showPricing flag,
 * which lives in plain component state and never persists to sessionStorage.
 */
export function PricingSection() {
  return (
    <section className="mb-16">
      <p className="kicker kicker-rule mb-4">Pricing</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="card-surface rounded-2xl px-6 py-5">
          <p className="font-medium text-foreground">Harbor — $149</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Your plan, the deadlines for your state, and the trackers, for as long as this takes.
          </p>
        </div>
        <div className="card-surface rounded-2xl px-6 py-5">
          <p className="font-medium text-foreground">Harbor, guided — from $500</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            The same plan, plus a person who has done this hundreds of times, on call through the
            months.
          </p>
        </div>
      </div>
    </section>
  )
}
