import { IntakeScreen } from "#/components/intake/intake-screen"
import { OptionButton } from "#/components/intake/option-button"
import type { StateCode } from "#/types/intake"

interface StateStepProps {
  value: StateCode | null
  onSelect: (state: StateCode) => void
  onBack: () => void
}

export function StateStep({ value, onSelect, onBack }: StateStepProps) {
  return (
    <IntakeScreen
      title="Which state are they in?"
      description="The rules for what happens next vary a lot by state — this just helps us point you to the right ones."
      onBack={onBack}
    >
      <div className="flex flex-col gap-3">
        <OptionButton label="Texas" selected={value === "TX"} onClick={() => onSelect("TX")} />
        <OptionButton label="California" selected={value === "CA"} onClick={() => onSelect("CA")} />
      </div>
    </IntakeScreen>
  )
}
