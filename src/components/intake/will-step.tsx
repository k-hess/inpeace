import { IntakeScreen } from "#/components/intake/intake-screen"
import { OptionButton } from "#/components/intake/option-button"
import type { JourneyMode, WillStatus } from "#/types/intake"

interface WillStepProps {
  value: WillStatus | null
  onSelect: (will: WillStatus) => void
  onBack: () => void
  position?: string
  mode?: JourneyMode
}

const TITLE_BY_MODE: Partial<Record<JourneyMode, string>> = {
  "for-self": "Do you have a will?",
  "for-family": "Is there a will?",
}

export function WillStep({ value, onSelect, onBack, position, mode }: WillStepProps) {
  return (
    <IntakeScreen
      title={(mode && TITLE_BY_MODE[mode]) ?? "Was there a will?"}
      onBack={onBack}
      position={position}
    >
      <div className="flex flex-col gap-3">
        <OptionButton label="Yes" selected={value === "yes"} onClick={() => onSelect("yes")} />
        <OptionButton label="No" selected={value === "no"} onClick={() => onSelect("no")} />
        <OptionButton
          label="I'm not sure"
          caption="That's very common. We'll help you figure it out."
          selected={value === "not-sure"}
          onClick={() => onSelect("not-sure")}
        />
      </div>
    </IntakeScreen>
  )
}
