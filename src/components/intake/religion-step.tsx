import { IntakeScreen } from "#/components/intake/intake-screen"
import { OptionButton } from "#/components/intake/option-button"
import { RELIGION_LABELS, type Religion } from "#/types/intake"

interface ReligionStepProps {
  value: Religion
  onSelect: (religion: Religion) => void
  onSkip: () => void
  onBack: () => void
  position?: string
}

const OPTIONS: Religion[] = ["christian", "catholic", "jewish", "muslim", "hindu", "none"]

export function ReligionStep({ value, onSelect, onSkip, onBack, position }: ReligionStepProps) {
  return (
    <IntakeScreen
      title="Are there faith traditions we should plan around?"
      description="Timing expectations differ between traditions. What 'this week' looks like can mean something different depending on the answer. This is only ever used to shape the plan's pacing, and it's never shared anywhere."
      onBack={onBack}
      position={position}
    >
      <div className="flex flex-col gap-3">
        {OPTIONS.map((religion) => (
          <OptionButton
            key={religion}
            label={RELIGION_LABELS[religion]}
            selected={value === religion}
            onClick={() => onSelect(religion)}
          />
        ))}
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
