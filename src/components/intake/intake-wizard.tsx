import { useEffect, useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useIntake } from "#/store/intake-context"
import { StateStep } from "#/components/intake/state-step"
import { DateStep } from "#/components/intake/date-step"
import { WillStep } from "#/components/intake/will-step"
import { AssetsStep } from "#/components/intake/assets-step"
import { SupportStep } from "#/components/intake/support-step"
import { isIntakeComplete, type AssetKey } from "#/types/intake"

const STEP_COUNT = 5

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

  function next() {
    setStep((s) => Math.min(s + 1, STEP_COUNT - 1))
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0))
  }

  function toggleAsset(asset: AssetKey) {
    const current = answers.assets
    const nextAssets = current.includes(asset) ? current.filter((a) => a !== asset) : [...current, asset]
    patch({ assets: nextAssets })
  }

  const position = `${step + 1} of ${STEP_COUNT}`

  switch (step) {
    case 0:
      return (
        <StateStep
          value={answers.state}
          onSelect={(state) => {
            patch({ state })
            next()
          }}
          position={position}
        />
      )
    case 1:
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
    case 2:
      return (
        <WillStep
          value={answers.will}
          onBack={back}
          onSelect={(will) => {
            patch({ will })
            next()
          }}
          position={position}
        />
      )
    case 3:
      return (
        <AssetsStep
          value={answers.assets}
          onBack={back}
          onToggle={toggleAsset}
          onNext={next}
          position={position}
        />
      )
    case 4:
      return (
        <SupportStep
          value={answers.support}
          onBack={back}
          onSelect={(support) => {
            patch({ support })
            navigate({ to: "/plan" })
          }}
          position={position}
        />
      )
    default:
      return null
  }
}
