import { IntakeScreen } from "#/components/intake/intake-screen"
import { Button } from "#/components/ui/button"
import { Checkbox } from "#/components/ui/checkbox"
import { useIntake } from "#/store/intake-context"
import { ASSET_LABELS, type AssetKey, type JourneyMode } from "#/types/intake"

interface AssetsStepProps {
  value: AssetKey[]
  onToggle: (asset: AssetKey) => void
  onNext: () => void
  onBack: () => void
  position?: string
  mode?: JourneyMode
}

const ASSET_ORDER: AssetKey[] = ["home", "retirement", "bank", "investments", "crypto", "car"]

const COPY_BY_MODE: Partial<Record<JourneyMode, { title: string; description: string }>> = {
  "for-self": {
    title: "What do you have?",
    description: "Check the ones that apply. Nothing needs to be complete or exact.",
  },
  "for-family": {
    title: "What do they have?",
    description: "Check the ones you know about. Nothing needs to be complete or exact.",
  },
}

export function AssetsStep({ value, onToggle, onNext, onBack, position, mode }: AssetsStepProps) {
  // Wired directly to the store rather than via props: the veteran flag
  // doesn't fit the wizard's per-step callback shape, and it's optional
  // context rather than one of the required intake questions.
  const { answers, patch } = useIntake()
  const copy = (mode && COPY_BY_MODE[mode]) ?? {
    title: "What did they leave behind?",
    description: "Check the ones you know about. Nothing needs to be complete or exact.",
  }

  return (
    <IntakeScreen
      title={copy.title}
      description={copy.description}
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
        <label className="flex cursor-pointer items-center gap-3 px-1 py-1 has-focus-visible:ring-2 has-focus-visible:ring-ring/60 has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background">
          <Checkbox
            checked={answers.veteran}
            onCheckedChange={() => patch({ veteran: !answers.veteran })}
          />
          <span className="text-sm text-muted-foreground">
            {mode === "for-self" ? "I served in the military" : "They served in the military"}
          </span>
        </label>
        <Button size="lg" className="w-fit rounded-full px-6" onClick={onNext}>
          Continue
        </Button>
      </div>
    </IntakeScreen>
  )
}
