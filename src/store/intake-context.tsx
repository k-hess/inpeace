import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { EMPTY_ANSWERS, type IntakeAnswers } from "#/types/intake"
import { scenarios } from "#/data/scenarios"

const STORAGE_KEY = "harbor.intake.answers"

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
}

const IntakeContext = createContext<IntakeContextValue | null>(null)

export function IntakeProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<IntakeAnswers>(() => readStoredAnswers())

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
    }),
    [answers],
  )

  return <IntakeContext.Provider value={value}>{children}</IntakeContext.Provider>
}

export function useIntake(): IntakeContextValue {
  const ctx = useContext(IntakeContext)
  if (!ctx) throw new Error("useIntake must be used within an IntakeProvider")
  return ctx
}
