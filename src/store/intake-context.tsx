import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { EMPTY_ANSWERS, type IntakeAnswers } from "#/types/intake"
import { scenarios } from "#/data/scenarios"

const STORAGE_KEY = "inpeace.intake.answers"

function readStoredAnswers(): IntakeAnswers {
  if (typeof window === "undefined") return EMPTY_ANSWERS
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_ANSWERS
    const parsed = JSON.parse(raw) as Partial<IntakeAnswers>
    return { ...EMPTY_ANSWERS, ...parsed }
  } catch {
    return EMPTY_ANSWERS
  }
}

function persistAnswers(answers: IntakeAnswers) {
  if (typeof window === "undefined") return
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
  } catch {
    // sessionStorage can fail in private-browsing edge cases; the app
    // still works within the session, it just won't survive a refresh.
  }
}

interface IntakeContextValue {
  answers: IntakeAnswers
  patch: (partial: Partial<IntakeAnswers>) => void
  reset: () => void
  loadScenario: (key: "a" | "b") => void
  /**
   * Interview-prop only: shows a demo pricing section on the plan page.
   * Deliberately plain component state — it never persists to sessionStorage,
   * so it can't leak into a fresh session or a real walkthrough.
   */
  showPricing: boolean
  togglePricing: () => void
}

const IntakeContext = createContext<IntakeContextValue | null>(null)

export function IntakeProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<IntakeAnswers>(() => readStoredAnswers())
  const [showPricing, setShowPricing] = useState(false)

  const value = useMemo<IntakeContextValue>(
    () => ({
      answers,
      patch: (partial) => {
        setAnswers((prev) => {
          const next = { ...prev, ...partial }
          persistAnswers(next)
          return next
        })
      },
      reset: () => {
        persistAnswers(EMPTY_ANSWERS)
        setAnswers(EMPTY_ANSWERS)
      },
      loadScenario: (key) => {
        const next = scenarios[key]
        persistAnswers(next)
        setAnswers(next)
      },
      showPricing,
      togglePricing: () => setShowPricing((v) => !v),
    }),
    [answers, showPricing],
  )

  return <IntakeContext.Provider value={value}>{children}</IntakeContext.Provider>
}

export function useIntake(): IntakeContextValue {
  const ctx = useContext(IntakeContext)
  if (!ctx) throw new Error("useIntake must be used within an IntakeProvider")
  return ctx
}
