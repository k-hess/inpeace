import { Link } from "@tanstack/react-router"
import { lastStepForMode } from "#/components/intake/intake-wizard"
import type { JourneyMode } from "#/types/intake"

/**
 * A quiet way back into the intake that preserves whatever's already been
 * answered — lands on the last question of the current mode's flow rather
 * than the first, since most of the time someone clicking this wants to
 * correct one answer, not redo the whole thing. Distinct from the header's
 * "Start over," which clears everything.
 */
export function ChangeAnswersLink({ mode }: { mode: JourneyMode }) {
  return (
    <Link
      to="/start"
      search={{ step: lastStepForMode(mode) }}
      className="text-sm text-muted-foreground underline decoration-dashed underline-offset-4 transition outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      Change your answers
    </Link>
  )
}
