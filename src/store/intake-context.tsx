import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react"
import { EMPTY_ANSWERS, type IntakeAnswers } from "#/types/intake"
import { scenarios } from "#/data/scenarios"
import { careCircleSlots } from "#/data/care-circle"

// --- Progress state ---------------------------------------------------
//
// Everything a person does on a plan page that used to live as scattered
// per-component useState — inventory checks, the death-cert tracker, the
// notification fan-out, care-circle claims, family-view checkoffs, the
// three task exits (done/deferred/handed-off), and which reference
// sections have been expanded. All of it now lives in one place so it can
// be persisted and reset as a single unit alongside the intake answers.

export type CertStatus = "not-started" | "ordered" | "received"
export interface CertTrackerState {
  count: number
  status: CertStatus
}

export type NotifyStatus = "not-yet" | "done" | "waiting"

export interface CareCircleClaim {
  claimedBy: string
  claimedNote: string
}

/** The three honorable exits a timeline task can take (see timeline-section.tsx). */
export type TaskExitStatus = "open" | "done" | "deferred"
export interface TaskState {
  status: TaskExitStatus
  /** Name of whoever it was handed off to, or null if it hasn't been. */
  handoff: string | null
}

export interface ProgressState {
  certTracker: CertTrackerState | null
  notifications: Record<string, NotifyStatus>
  careCircleClaims: Record<string, CareCircleClaim>
  inventoryChecked: Record<string, boolean>
  familyTasksDone: Record<string, boolean>
  tasks: Record<string, TaskState>
  sectionExpanded: Record<string, boolean>
}

function seedCareCircleClaims(): Record<string, CareCircleClaim> {
  const claims: Record<string, CareCircleClaim> = {}
  for (const slot of careCircleSlots) {
    if (slot.claimedBy) claims[slot.id] = { claimedBy: slot.claimedBy, claimedNote: slot.claimedNote ?? "" }
  }
  return claims
}

/**
 * A fresh progress state — used both for a genuinely empty session and to
 * fully overwrite an old one on reset or a demo scenario load. The one
 * seeded field (care-circle claims) matches the interview demo always
 * opening with one slot already spoken for.
 */
function createDefaultProgress(): ProgressState {
  return {
    certTracker: null,
    notifications: {},
    careCircleClaims: seedCareCircleClaims(),
    inventoryChecked: {},
    familyTasksDone: {},
    tasks: {},
    sectionExpanded: {},
  }
}

// --- Persistence --------------------------------------------------------
//
// One versioned root key in localStorage (not sessionStorage — this is a
// prototype people come back to, not a single sitting). A version bump on
// a future schema change just discards whatever's stored rather than
// trying to migrate it; this is deliberately throwaway state, not a
// database.

const STORAGE_KEY = "inpeace.v1"
const CURRENT_VERSION = 1

interface PersistedRoot {
  version: number
  answers: IntakeAnswers
  progress: ProgressState
  /** Epoch ms of the previous visit's session start, or null the first time. */
  lastVisit: number | null
}

interface CoreState {
  answers: IntakeAnswers
  progress: ProgressState
}

function readPersisted(): PersistedRoot {
  const fallback: PersistedRoot = {
    version: CURRENT_VERSION,
    answers: EMPTY_ANSWERS,
    progress: createDefaultProgress(),
    lastVisit: null,
  }
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Partial<PersistedRoot>
    if (parsed.version !== CURRENT_VERSION) return fallback
    return {
      version: CURRENT_VERSION,
      answers: { ...EMPTY_ANSWERS, ...parsed.answers },
      progress: { ...createDefaultProgress(), ...parsed.progress },
      lastVisit: typeof parsed.lastVisit === "number" ? parsed.lastVisit : null,
    }
  } catch {
    return fallback
  }
}

interface IntakeContextValue {
  answers: IntakeAnswers
  patch: (partial: Partial<IntakeAnswers>) => void
  /** Clears intake answers AND all progress state — the complete "start over." */
  reset: () => void
  loadScenario: (key: "a" | "b" | "c" | "d") => void
  /**
   * Interview-prop only: shows a demo pricing section on the plan page.
   * Deliberately plain component state — it never persists, so it can't
   * leak into a fresh session or a real walkthrough.
   */
  showPricing: boolean
  togglePricing: () => void

  progress: ProgressState
  /** Functional update, mirroring setState — persists immediately. */
  updateProgress: (updater: (prev: ProgressState) => ProgressState) => void

  /**
   * Milliseconds since the previous visit's session start, frozen for the
   * life of this session the moment the provider mounts (before the
   * timestamp below is overwritten) — null if there's no prior visit on
   * record. Drives the "Since you were here" return strip.
   */
  returnGapMs: number | null
}

const IntakeContext = createContext<IntakeContextValue | null>(null)

export function IntakeProvider({ children }: { children: ReactNode }) {
  // Read once, synchronously, so the first render already reflects
  // whatever was on disk — no flash of empty state.
  const initialRef = useRef<PersistedRoot | null>(null)
  if (initialRef.current === null) initialRef.current = readPersisted()
  const initial = initialRef.current

  const [core, setCore] = useState<CoreState>({ answers: initial.answers, progress: initial.progress })
  const [showPricing, setShowPricing] = useState(false)

  const returnGapRef = useRef<number | null>(
    initial.lastVisit === null ? null : Date.now() - initial.lastVisit,
  )
  // This visit's own session-start stamp, written on every persist below
  // so a later visit can compute its own gap against it.
  const mountTimeRef = useRef(Date.now())

  function persist(next: CoreState) {
    if (typeof window === "undefined") return
    try {
      const root: PersistedRoot = {
        version: CURRENT_VERSION,
        answers: next.answers,
        progress: next.progress,
        lastVisit: mountTimeRef.current,
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(root))
    } catch {
      // localStorage can fail in private-browsing edge cases; the app
      // still works within the tab, it just won't survive a reload.
    }
  }

  const value = useMemo<IntakeContextValue>(
    () => ({
      answers: core.answers,
      patch: (partial) => {
        setCore((prev) => {
          const next = { ...prev, answers: { ...prev.answers, ...partial } }
          persist(next)
          return next
        })
      },
      reset: () => {
        const next: CoreState = { answers: EMPTY_ANSWERS, progress: createDefaultProgress() }
        persist(next)
        setCore(next)
      },
      loadScenario: (key) => {
        // Full overwrite, not a merge — loading a scenario must never
        // inherit a previous person's checkboxes.
        const next: CoreState = { answers: scenarios[key], progress: createDefaultProgress() }
        persist(next)
        setCore(next)
      },
      showPricing,
      togglePricing: () => setShowPricing((v) => !v),

      progress: core.progress,
      updateProgress: (updater) => {
        setCore((prev) => {
          const next = { ...prev, progress: updater(prev.progress) }
          persist(next)
          return next
        })
      },

      returnGapMs: returnGapRef.current,
    }),
    // persist and mountTimeRef/returnGapRef are stable across the
    // provider's lifetime; only core and showPricing actually change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [core, showPricing],
  )

  return <IntakeContext.Provider value={value}>{children}</IntakeContext.Provider>
}

export function useIntake(): IntakeContextValue {
  const ctx = useContext(IntakeContext)
  if (!ctx) throw new Error("useIntake must be used within an IntakeProvider")
  return ctx
}
