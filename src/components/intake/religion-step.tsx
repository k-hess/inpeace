import { IntakeScreen } from "#/components/intake/intake-screen"
import { Button } from "#/components/ui/button"
import { Checkbox } from "#/components/ui/checkbox"
import { RELIGION_LABELS, type Religion } from "#/types/intake"

interface ReligionStepProps {
  value: Religion[]
  onToggle: (religion: Religion) => void
  onContinue: () => void
  onSkip: () => void
  onBack: () => void
  position?: string
}

const OPTIONS: Religion[] = ["christian", "catholic", "jewish", "muslim", "hindu", "none"]

export function ReligionStep({ value, onToggle, onContinue, onSkip, onBack, position }: ReligionStepProps) {
  return (
    <IntakeScreen
      title="Are there faith traditions we should plan around?"
      description="Timing expectations differ between traditions. What 'this week' looks like can mean something different depending on the answer. Pick as many as apply, then continue. This is only ever used to shape the plan's pacing, and it's never shared anywhere."
      onBack={onBack}
      position={position}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {OPTIONS.map((religion) => (
            <label
              key={religion}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border/70 bg-card px-5 py-4 shadow-[var(--shadow-card)] transition hover:border-primary/40 hover:bg-accent/25 has-focus-visible:ring-2 has-focus-visible:ring-ring/60 has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background"
            >
              <Checkbox checked={value.includes(religion)} onCheckedChange={() => onToggle(religion)} />
              <span className="text-base font-medium text-foreground">{RELIGION_LABELS[religion]}</span>
            </label>
          ))}
        </div>
        <Button size="lg" className="w-fit rounded-full px-6" onClick={onContinue}>
          Continue
        </Button>
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="mt-6 rounded-full text-sm text-muted-foreground underline decoration-border underline-offset-4 transition outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        Skip this one
      </button>
    </IntakeScreen>
  )
}
