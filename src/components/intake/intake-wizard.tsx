import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useIntake } from "#/store/intake-context"
import { MoodStep } from "#/components/intake/mood-step"
import { StateStep } from "#/components/intake/state-step"
import { DateStep } from "#/components/intake/date-step"
import { WillStep } from "#/components/intake/will-step"
import { AssetsStep } from "#/components/intake/assets-step"
import { SupportStep } from "#/components/intake/support-step"
import type { AssetKey } from "#/types/intake"

const STEP_COUNT = 6

export function IntakeWizard() {
  const { answers, patch } = useIntake()
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

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

  switch (step) {
    case 0:
      return (
        <MoodStep
          value={answers.mood}
          onSelect={(mood) => {
            patch({ mood })
            next()
          }}
          onSkip={next}
        />
      )
    case 1:
      return (
        <StateStep
          value={answers.state}
          onBack={back}
          onSelect={(state) => {
            patch({ state })
            next()
          }}
        />
      )
    case 2:
      return (
        <DateStep
          value={answers.dateOfDeath}
          onBack={back}
          onContinue={(dateOfDeath) => {
            patch({ dateOfDeath })
            next()
          }}
        />
      )
    case 3:
      return (
        <WillStep
          value={answers.will}
          onBack={back}
          onSelect={(will) => {
            patch({ will })
            next()
          }}
        />
      )
    case 4:
      return <AssetsStep value={answers.assets} onBack={back} onToggle={toggleAsset} onNext={next} />
    case 5:
      return (
        <SupportStep
          value={answers.support}
          onBack={back}
          onSelect={(support) => {
            patch({ support })
            navigate({ to: "/plan" })
          }}
        />
      )
    default:
      return null
  }
}
