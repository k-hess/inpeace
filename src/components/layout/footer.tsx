import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useIntake } from "#/store/intake-context"

/**
 * A quiet footer with a hidden "demo" affordance for user interviews —
 * loads either canned scenario instantly, or resets back to intake.
 * Deliberately unobtrusive: this is a tool for the person running the
 * interview, not something a real user would ever need to notice.
 */
export function Footer() {
  const [open, setOpen] = useState(false)
  const { loadScenario, reset, togglePricing } = useIntake()
  const navigate = useNavigate()

  return (
    <footer className="page-wrap py-6 text-center">
      {open ? (
        <div className="rise-in flex flex-wrap items-center justify-center gap-2 text-xs">
          <button
            type="button"
            className="rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground transition hover:text-foreground"
            onClick={() => {
              loadScenario("a")
              navigate({ to: "/plan" })
              setOpen(false)
            }}
          >
            Scenario A — Texas
          </button>
          <button
            type="button"
            className="rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground transition hover:text-foreground"
            onClick={() => {
              loadScenario("b")
              navigate({ to: "/plan" })
              setOpen(false)
            }}
          >
            Scenario B — California
          </button>
          <button
            type="button"
            className="rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground transition hover:text-foreground"
            onClick={() => {
              togglePricing()
              setOpen(false)
            }}
          >
            Pricing
          </button>
          <button
            type="button"
            className="rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground transition hover:text-foreground"
            onClick={() => {
              reset()
              navigate({ to: "/" })
              setOpen(false)
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="px-2 py-1.5 text-muted-foreground/60 hover:text-muted-foreground"
            onClick={() => setOpen(false)}
          >
            close
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground/70">
            Harbor is with you for as long as this takes.
          </p>
          <p className="text-[11px] text-muted-foreground/40">© 2026 Harbor</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-[11px] tracking-wide text-muted-foreground/35 hover:text-muted-foreground/70"
            aria-label="Demo tools"
          >
            demo
          </button>
        </div>
      )}
    </footer>
  )
}
