import { useEffect, useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useIntake } from "#/store/intake-context"
import { ModeStep } from "#/components/intake/mode-step"
import { StateStep } from "#/components/intake/state-step"
import { DateStep } from "#/components/intake/date-step"
import { WillStep } from "#/components/intake/will-step"
import { AssetsStep } from "#/components/intake/assets-step"
import { SupportStep } from "#/components/intake/support-step"
import { ReligionStep } from "#/components/intake/religion-step"
import { track } from "#/lib/analytics"
import { isIntakeComplete, type AssetKey, type JourneyMode } from "#/types/intake"

type StepKey = "mode" | "state" | "date" | "will" | "assets" | "support" | "religion"

const STEPS_BY_MODE: Record<JourneyMode, StepKey[]> = {
  after: ["mode", "state", "date", "will", "assets", "support", "religion"],
  "for-family": ["mode", "state", "will", "assets", "religion"],
  "for-self": ["mode", "state", "will", "assets", "religion"],
}

// Before a mode is chosen there's nothing to branch on yet — just show the door.
const DEFAULT_STEPS: StepKey[] = ["mode"]

export function IntakeWizard() {
  const { answers, patch, reset } = useIntake()
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  // A completed prior run (e.g. from viewing a demo scenario) shouldn't leak
  // into what's supposed to be a fresh intake. Mid-intake resume is fine —
  // only a fully-answered set of prior answers gets cleared.
  useEffect(() => {
    if (isIntakeComplete(answers)) reset()
    // Only run once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const steps = answers.mode ? STEPS_BY_MODE[answers.mode] : DEFAULT_STEPS
  const stepCount = steps.length
  const key = steps[Math.min(step, stepCount - 1)]
  const position = `${step + 1} of ${stepCount}`

  function next(modeOverride?: JourneyMode) {
    // Selecting a door patches `answers.mode` and calls next() in the same
    // tick — the closed-over `answers.mode` is still stale then, so the
    // caller passes the new mode explicitly for that one step.
    track("intake_step_completed", { step: key, mode: modeOverride ?? answers.mode ?? "unknown" })
    setStep((s) => Math.min(s + 1, stepCount - 1))
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0))
  }

  function toggleAsset(asset: AssetKey) {
    const current = answers.assets
    const nextAssets = current.includes(asset) ? current.filter((a) => a !== asset) : [...current, asset]
    patch({ assets: nextAssets })
  }

  function selectMode(mode: JourneyMode) {
    // A partially-answered run in one mode shouldn't leak into a run
    // started fresh in a different mode — clear everything, then set mode.
    if (answers.mode !== mode) {
      reset()
    }
    patch({ mode })
    next(mode)
  }

  switch (key) {
    case "mode":
      // Before a door is picked, the step list defaults to the "after"
      // sequence, so any position count shown here would be wrong for
      // anyone who then picks a shorter path — suppress it entirely.
      return <ModeStep value={answers.mode} onSelect={selectMode} />
    case "state":
      return (
        <StateStep
          value={answers.state}
          mode={answers.mode}
          onSelect={(state) => {
            patch({ state })
            next()
          }}
          onBack={back}
          position={position}
        />
      )
    case "date":
      return (
        <DateStep
          value={answers.dateOfDeath}
          firstName={answers.firstName}
          onBack={back}
          onContinue={(dateOfDeath, firstName) => {
            patch({ dateOfDeath, firstName })
            next()
          }}
          position={position}
        />
      )
    case "will":
      return (
        <WillStep
          value={answers.will}
          mode={answers.mode}
          onBack={back}
          onSelect={(will) => {
            patch({ will })
            next()
          }}
          position={position}
        />
      )
    case "assets":
      return (
        <AssetsStep
          value={answers.assets}
          mode={answers.mode}
          onBack={back}
          onToggle={toggleAsset}
          onNext={next}
          position={position}
        />
      )
    case "support":
      return (
        <SupportStep
          value={answers.support}
          onBack={back}
          onSelect={(support) => {
            patch({ support })
            next()
          }}
          position={position}
        />
      )
    case "religion":
      return (
        <ReligionStep
          value={answers.religion}
          onBack={back}
          onSelect={(religion) => {
            patch({ religion })
            track("intake_step_completed", { step: "religion", mode: answers.mode ?? "unknown" })
            navigate({ to: "/plan" })
          }}
          onSkip={() => {
            patch({ religion: "unspecified" })
            track("intake_step_completed", { step: "religion", mode: answers.mode ?? "unknown" })
            navigate({ to: "/plan" })
          }}
          position={position}
        />
      )
    default:
      return null
  }
}
