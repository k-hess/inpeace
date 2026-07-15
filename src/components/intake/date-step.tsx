import { useState } from "react"
import { IntakeScreen } from "#/components/intake/intake-screen"
import { Button } from "#/components/ui/button"
import { defaultDateOfDeath, toISODate } from "#/lib/date-utils"

interface DateStepProps {
  value: string | null
  firstName: string | null
  onContinue: (date: string, firstName: string | null) => void
  onBack: () => void
  position?: string
}

export function DateStep({ value, firstName, onContinue, onBack, position }: DateStepProps) {
  const [date, setDate] = useState(value ?? defaultDateOfDeath())
  const [name, setName] = useState(firstName ?? "")

  function submit() {
    if (!date) return
    const trimmed = name.trim()
    onContinue(date, trimmed || null)
  }

  return (
    <IntakeScreen
      title="When did they die?"
      description="An approximate date is fine."
      onBack={onBack}
      position={position}
    >
      <div className="flex flex-col gap-4">
        <input
          type="date"
          value={date}
          max={toISODate(new Date())}
          onChange={(event) => setDate(event.target.value)}
          className="w-full rounded-2xl border border-border/70 bg-card px-5 py-4 text-base text-foreground shadow-[var(--shadow-card)] outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Their first name, if you'd like us to use it"
          aria-label="Their first name, if you'd like us to use it"
          className="w-full rounded-2xl border border-border/70 bg-card px-5 py-4 text-base text-foreground shadow-[var(--shadow-card)] outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
        <Button size="lg" className="w-fit rounded-full px-6" disabled={!date} onClick={submit}>
          Continue
        </Button>
      </div>
    </IntakeScreen>
  )
}
