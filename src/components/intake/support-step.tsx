import { IntakeScreen } from "#/components/intake/intake-screen"
import { OptionButton } from "#/components/intake/option-button"
import type { SupportMode } from "#/types/intake"

interface SupportStepProps {
  value: SupportMode | null
  onSelect: (support: SupportMode) => void
  onBack: () => void
}

export function SupportStep({ value, onSelect, onBack }: SupportStepProps) {
  return (
    <IntakeScreen title="Are you handling this alone, or with family?" onBack={onBack}>
      <div className="flex flex-col gap-3">
        <OptionButton label="On my own" selected={value === "alone"} onClick={() => onSelect("alone")} />
        <OptionButton
          label="With siblings or family"
          selected={value === "family"}
          onClick={() => onSelect("family")}
        />
      </div>
    </IntakeScreen>
  )
}
