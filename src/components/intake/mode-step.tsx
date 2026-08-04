import { IntakeScreen } from "#/components/intake/intake-screen"
import { OptionButton } from "#/components/intake/option-button"
import type { JourneyMode } from "#/types/intake"

interface ModeStepProps {
  value: JourneyMode | null
  onSelect: (mode: JourneyMode) => void
  position?: string
}

export function ModeStep({ value, onSelect, position }: ModeStepProps) {
  return (
    <IntakeScreen
      title="Where would you like to start?"
      description="It's the same plan either way — this just decides how we talk to you. If it turns out to be the wrong door, you can change it any time."
      position={position}
    >
      <div className="flex flex-col gap-3">
        <OptionButton label="Someone has died" selected={value === "after"} onClick={() => onSelect("after")} />
        <OptionButton
          label="I'm helping a family member get ready"
          selected={value === "for-family"}
          onClick={() => onSelect("for-family")}
        />
        <OptionButton
          label="I'm getting my own affairs in order"
          selected={value === "for-self"}
          onClick={() => onSelect("for-self")}
        />
      </div>
    </IntakeScreen>
  )
}
