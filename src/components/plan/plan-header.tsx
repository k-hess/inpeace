interface PlanHeaderProps {
  headline: string
  sub: string
  stateName: string
  firstName: string | null
}

export function PlanHeader({ headline, sub, stateName, firstName }: PlanHeaderProps) {
  const kicker = firstName ? `A plan for the months after ${firstName}` : `Your plan · ${stateName}`

  return (
    <header className="rise-in mb-14">
      <p className="kicker mb-4">{kicker}</p>
      <h1 className="font-serif text-3xl leading-snug text-foreground sm:text-4xl">{headline}</h1>
      <p className="mt-4 max-w-lg text-muted-foreground">{sub}</p>
      <p className="mt-6 text-sm text-muted-foreground">
        You've done enough for today just by getting this far. Come back to this whenever you want —
        nothing here expires.
      </p>
    </header>
  )
}
