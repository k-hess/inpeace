import { IntakeScreen } from "#/components/intake/intake-screen"
import { OptionButton } from "#/components/intake/option-button"
import type { JourneyMode, StateCode } from "#/types/intake"

interface StateStepProps {
  value: StateCode | null
  onSelect: (state: StateCode) => void
  onBack?: () => void
  position?: string
  mode?: JourneyMode
}

const TITLE_BY_MODE: Partial<Record<JourneyMode, string>> = {
  "for-self": "Which state do you live in?",
  "for-family": "Which state do they live in?",
}

export function StateStep({ value, onSelect, onBack, position, mode }: StateStepProps) {
  return (
    <IntakeScreen
      title={(mode && TITLE_BY_MODE[mode]) ?? "Which state did they live in?"}
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
