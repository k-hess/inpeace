import { IntakeScreen } from "#/components/intake/intake-screen"
import { OptionButton } from "#/components/intake/option-button"
import type { MoodAnswer } from "#/types/intake"

interface MoodStepProps {
  value: MoodAnswer
  onSelect: (mood: MoodAnswer) => void
  onSkip: () => void
}

const OPTIONS: { value: Exclude<MoodAnswer, null>; label: string }[] = [
  { value: "okay", label: "I'm okay" },
  { value: "a-lot", label: "It's a lot right now" },
  { value: "not-sure", label: "I'm not sure" },
]

export function MoodStep({ value, onSelect, onSkip }: MoodStepProps) {
  return (
    <IntakeScreen
      kicker="Before anything else"
      title="How are you holding up?"
      description="There's no wrong answer, and this doesn't change anything below except how we talk to you."
    >
      <div className="flex flex-col gap-3">
        {OPTIONS.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            selected={value === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="mt-6 text-sm text-muted-foreground underline decoration-border underline-offset-4 transition hover:text-foreground"
      >
        Skip this one
      </button>
    </IntakeScreen>
  )
}
