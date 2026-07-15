import { IntakeScreen } from "#/components/intake/intake-screen"
import { Button } from "#/components/ui/button"
import { Checkbox } from "#/components/ui/checkbox"
import { ASSET_LABELS, type AssetKey } from "#/types/intake"

interface AssetsStepProps {
  value: AssetKey[]
  onToggle: (asset: AssetKey) => void
  onNext: () => void
  onBack: () => void
  position?: string
}

const ASSET_ORDER: AssetKey[] = ["home", "retirement", "bank", "investments", "crypto", "car"]

export function AssetsStep({ value, onToggle, onNext, onBack, position }: AssetsStepProps) {
  return (
    <IntakeScreen
      title="What did they leave behind?"
      description="Check the ones you know about. Nothing needs to be complete or exact."
      onBack={onBack}
      position={position}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {ASSET_ORDER.map((asset) => (
            <label
              key={asset}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border/70 bg-card px-5 py-4 shadow-[var(--shadow-card)] transition hover:border-primary/40 hover:bg-accent/25 has-focus-visible:ring-2 has-focus-visible:ring-ring/60 has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background"
            >
              <Checkbox checked={value.includes(asset)} onCheckedChange={() => onToggle(asset)} />
              <span className="text-base font-medium text-foreground">{ASSET_LABELS[asset]}</span>
            </label>
          ))}
        </div>
        <Button size="lg" className="w-fit rounded-full px-6" onClick={onNext}>
          Continue
        </Button>
      </div>
    </IntakeScreen>
  )
}
