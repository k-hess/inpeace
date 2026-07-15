interface PlanHeaderProps {
  introLine: string
  stateName: string
}

export function PlanHeader({ introLine, stateName }: PlanHeaderProps) {
  return (
    <header className="rise-in mb-14">
      <p className="kicker mb-4">Your plan · {stateName}</p>
      <h1 className="font-serif text-3xl leading-snug text-foreground sm:text-4xl">{introLine}</h1>
      <p className="mt-6 text-sm text-muted-foreground">
        You've done enough for today just by getting this far. Come back to this whenever you want —
        nothing here expires.
      </p>
    </header>
  )
}
