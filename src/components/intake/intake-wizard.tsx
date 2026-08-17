import { useEffect } from "react"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useIntake } from "#/store/intake-context"
import { ModeStep } from "#/components/intake/mode-step"
import { StateStep } from "#/components/intake/state-step"
import { DateStep } from "#/components/intake/date-step"
import { WillStep } from "#/components/intake/will-step"
import { AssetsStep } from "#/components/intake/assets-step"
import { SupportStep } from "#/components/intake/support-step"
import { ReligionStep } from "#/components/intake/religion-step"
import { track } from "#/lib/analytics"
import { isIntakeComplete, type AssetKey, type JourneyMode, type Religion } from "#/types/intake"

export type StepKey = "mode" | "state" | "date" | "will" | "assets" | "support" | "religion"

export const ALL_STEP_KEYS: StepKey[] = ["mode", "state", "date", "will", "assets", "support", "religion"]

const STEPS_BY_MODE: Record<JourneyMode, StepKey[]> = {
  after: ["mode", "state", "date", "will", "assets", "support", "religion"],
  "for-family": ["mode", "state", "will", "assets", "religion"],
  "for-self": ["mode", "state", "will", "assets", "religion"],
}

// Before a mode is chosen there's nothing to branch on yet — just show the door.
const DEFAULT_STEPS: StepKey[] = ["mode"]

/** The last question in a given mode's flow — where "Change your answers" lands. */
export function lastStepForMode(mode: JourneyMode): StepKey {
  const steps = STEPS_BY_MODE[mode]
  return steps[steps.length - 1]
}

/** "none" is exclusive: picking it clears every other pick, and picking anything else clears "none". */
function toggleReligion(current: Religion[], religion: Religion): Religion[] {
  if (religion === "none") {
    return current.includes("none") ? [] : ["none"]
  }
  const withoutNone = current.filter((r) => r !== "none")
  return withoutNone.includes(religion)
    ? withoutNone.filter((r) => r !== religion)
    : [...withoutNone, religion]
}

export function IntakeWizard() {
  const { answers, patch, reset } = useIntake()
  const { step: stepParam } = useSearch({ from: "/start" })
  const navigate = useNavigate()

  const steps = answers.mode ? STEPS_BY_MODE[answers.mode] : DEFAULT_STEPS

  // A completed prior run (e.g. from viewing a demo scenario) shouldn't leak
  // into what's supposed to be a fresh intake — that's a genuine "Begin"
  // from the landing page, which never carries a step param. Arriving with
  // a step param (from the browser back button or "Change your answers" on
  // the plan page) means resuming, so answers are preserved.
  useEffect(() => {
    if (!stepParam && isIntakeComplete(answers)) reset()
    // Only run once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // No step param: always start at the first step ("mode"). A step param
  // naming a step that isn't in the current mode's list (e.g. stale from a
  // different mode, or from before a mode was chosen) clamps to the last
  // valid step instead of crashing or landing somewhere confusing.
  const paramIndex = stepParam ? steps.indexOf(stepParam) : -1
  const stepIndex = stepParam === undefined ? 0 : paramIndex === -1 ? steps.length - 1 : paramIndex
  const key = steps[stepIndex]
  const position = `${stepIndex + 1} of ${steps.length}`

  function goToStep(nextKey: StepKey) {
    navigate({ to: "/start", search: { step: nextKey } })
  }

  function next(modeOverride?: JourneyMode) {
    // Selecting a door patches `answers.mode` and calls next() in the same
    // tick — the closed-over `answers.mode` is still stale then, so the
    // caller passes the new mode explicitly for that one step. Guarded
    // with typeof: AssetsStep wires its Continue button as
    // `onClick={onNext}` (onNext being this function), so a plain click
    // calls next(clickEvent) — a non-string argument must fall back to the
    // real steps list rather than trying to index STEPS_BY_MODE with it.
    track("intake_step_completed", { step: key, mode: (typeof modeOverride === "string" ? modeOverride : null) ?? answers.mode ?? "unknown" })
    const activeSteps = typeof modeOverride === "string" ? STEPS_BY_MODE[modeOverride] : steps
    const nextIndex = Math.min(stepIndex + 1, activeSteps.length - 1)
    goToStep(activeSteps[nextIndex])
  }

  function back() {
    const prevIndex = Math.max(stepIndex - 1, 0)
    goToStep(steps[prevIndex])
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
          value={answers.religions}
          onBack={back}
          onToggle={(religion) => patch({ religions: toggleReligion(answers.religions, religion) })}
          onContinue={() => {
            track("intake_step_completed", { step: "religion", mode: answers.mode ?? "unknown" })
            navigate({ to: "/plan" })
          }}
          onSkip={() => {
            patch({ religions: [] })
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
