import { Link, useNavigate, useRouterState } from "@tanstack/react-router"
import { Waves } from "lucide-react"
import { useIntake } from "#/store/intake-context"

/**
 * Site header used on every page. Deliberately one-purpose: a wordmark on
 * the left, and a single quiet action on the right that changes with
 * context — "Begin" on the landing page, "Start over" once you're inside
 * the intake or looking at a plan.
 */
export function Header() {
  return (
    <header>
      <div className="page-wrap flex items-center justify-between py-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-serif text-lg tracking-[-0.01em] text-foreground transition hover:text-foreground/80"
        >
          <Waves className="h-3.5 w-3.5 text-primary/70" aria-hidden />
          Harbor
        </Link>
        <HeaderAction />
      </div>
      <hr className="horizon" aria-hidden />
    </header>
  )
}

function HeaderAction() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const navigate = useNavigate()
  const { reset } = useIntake()

  if (pathname === "/") {
    return (
      <Link
        to="/start"
        className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground transition hover:border-primary/50 hover:text-primary"
      >
        Begin
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        reset()
        navigate({ to: "/start" })
      }}
      className="text-sm text-muted-foreground transition hover:text-foreground"
    >
      Start over
    </button>
  )
}
