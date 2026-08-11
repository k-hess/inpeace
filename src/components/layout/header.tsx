import { useEffect, useState } from "react"
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
          In Peace
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

  // Deploy is a single static-assets shell (see wrangler.jsonc): only "/"
  // gets a real prerendered HTML file, and Cloudflare's SPA fallback serves
  // that exact same file for every other path. So the very first paint of
  // e.g. /start or /plan is actually last built for "/" — if this action
  // renders its real, pathname-driven content immediately, hydration is
  // handed a <button>Start over</button> where the server-shipped markup
  // has an <a href="/start">Begin</a>, a tag-type mismatch that trips
  // React's hydration error #418 once on load. Rendering the "/" version
  // unconditionally until after mount keeps the first client render
  // identical to whatever shell was actually served, then swaps to the
  // correct action in a normal post-hydration update.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || pathname === "/") {
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
        // A stray click shouldn't wipe a session — one calm line, not a
        // scare, since this clears everything saved on this device.
        if (!window.confirm("Start over? This clears your plan and everything checked off, on this device.")) {
          return
        }
        reset()
        navigate({ to: "/start" })
      }}
      className="text-sm text-muted-foreground transition hover:text-foreground"
    >
      Start over
    </button>
  )
}
