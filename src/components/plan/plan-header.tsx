interface PlanHeaderProps {
  headline: string
  sub: string
  stateName: string
  firstName: string | null
}

export function PlanHeader({ headline, sub, stateName, firstName }: PlanHeaderProps) {
  const kicker = firstName ? `A plan for the months after losing ${firstName} · ${stateName}` : `Your plan · ${stateName}`

  return (
    <header className="rise-in mb-16">
      <p className="kicker kicker-rule mb-5">{kicker}</p>
      <h1 className="display text-[2.1rem] leading-[1.15] text-foreground sm:text-[2.6rem]">{headline}</h1>
      <p className="mt-4 max-w-lg leading-relaxed text-pretty text-muted-foreground">{sub}</p>
      <p className="mt-7 max-w-lg font-serif text-base italic leading-relaxed text-muted-foreground">
        You've done enough for today by getting this far. Come back whenever you want. Nothing here
        expires.
      </p>
    </header>
  )
}
