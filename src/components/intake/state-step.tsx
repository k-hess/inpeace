import { IntakeScreen } from "#/components/intake/intake-screen"
import { OptionButton } from "#/components/intake/option-button"
import type { StateCode } from "#/types/intake"

interface StateStepProps {
  value: StateCode | null
  onSelect: (state: StateCode) => void
  onBack: () => void
  position?: string
}

export function StateStep({ value, onSelect, onBack, position }: StateStepProps) {
  return (
    <IntakeScreen
      title="Which state did they live in?"
      description="The rules for what happens next vary a lot by state. We're starting with Texas and California."
      onBack={onBack}
      position={position}
    >
      <div className="flex flex-col gap-3">
        <OptionButton label="Texas" selected={value === "TX"} onClick={() => onSelect("TX")} />
        <OptionButton label="California" selected={value === "CA"} onClick={() => onSelect("CA")} />
      </div>
    </IntakeScreen>
  )
}
