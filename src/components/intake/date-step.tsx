import { useState } from "react"
import { IntakeScreen } from "#/components/intake/intake-screen"
import { Button } from "#/components/ui/button"
import { defaultDateOfDeath, toISODate } from "#/lib/date-utils"

interface DateStepProps {
  value: string | null
  onContinue: (date: string) => void
  onBack: () => void
}

export function DateStep({ value, onContinue, onBack }: DateStepProps) {
  const [date, setDate] = useState(value ?? defaultDateOfDeath())

  return (
    <IntakeScreen title="When did they pass?" description="An approximate date is fine." onBack={onBack}>
      <div className="flex flex-col gap-4">
        <input
          type="date"
          value={date}
          max={toISODate(new Date())}
          onChange={(event) => setDate(event.target.value)}
          className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
        <Button
          size="lg"
          className="w-fit rounded-full px-6"
          disabled={!date}
          onClick={() => date && onContinue(date)}
        >
          Continue
        </Button>
      </div>
    </IntakeScreen>
  )
}
