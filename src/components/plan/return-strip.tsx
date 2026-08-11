import { useEffect, useState } from "react"
import { track } from "#/lib/analytics"
import type { ProgressState } from "#/store/intake-context"

const RETURN_GAP_THRESHOLD_MS = 6 * 60 * 60 * 1000

function countHeld(progress: ProgressState): number {
  let count = 0
  if (progress.certTracker?.status === "received") count += 1
  count += Object.values(progress.notifications).filter((status) => status === "done").length
  count += Object.values(progress.familyTasksDone).filter(Boolean).length
  count += Object.values(progress.inventoryChecked).filter(Boolean).length
  count += Object.values(progress.tasks).filter((task) => task.status === "done").length
  return count
}

function hasAnyProgress(progress: ProgressState): boolean {
  return (
    progress.certTracker !== null ||
    Object.keys(progress.notifications).length > 0 ||
    Object.keys(progress.familyTasksDone).length > 0 ||
    Object.keys(progress.inventoryChecked).length > 0 ||
    Object.keys(progress.tasks).length > 0
  )
}

/**
 * "Since you were here" — shown above everything else when someone
 * returns more than ~6 hours after their last visit with real prior
 * progress on record. Warm, three lines max, one Dismiss. Dismissing is
 * local-only for this session; the gap itself won't reappear until the
 * next visit crosses the threshold again (see intake-context.tsx's
 * returnGapMs, frozen once per session).
 */
export function ReturnStrip({
  returnGapMs,
  progress,
  movedLine,
  nextThingLine,
}: {
  returnGapMs: number | null
  progress: ProgressState
  /** What moved — a nearby deadline, if the after-death plan has one. */
  movedLine: string | null
  /** The current "right now" answer, named rather than repeated in full. */
  nextThingLine: string | null
}) {
  const [dismissed, setDismissed] = useState(false)
  const shouldShow = returnGapMs !== null && returnGapMs > RETURN_GAP_THRESHOLD_MS && hasAnyProgress(progress)

  useEffect(() => {
    if (shouldShow) track("return_strip_shown", {})
    // Fire once, based on the mount-time answer only — dismissing
    // shouldn't count as a second "shown" event.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!shouldShow || dismissed) return null

  const held = countHeld(progress)

  return (
    <section className="quiet-card rise-in mb-16 rounded-2xl px-6 py-5">
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-1">
          <p className="font-medium text-foreground">Since you were here</p>
          <p className="text-sm leading-relaxed">
            {held > 0
              ? `${held} thing${held === 1 ? "" : "s"} ${held === 1 ? "is" : "are"} handled.`
              : "Nothing's checked off yet. No rush."}
          </p>
          {movedLine ? <p className="text-sm leading-relaxed">{movedLine}</p> : null}
          {nextThingLine ? <p className="text-sm leading-relaxed">{nextThingLine}</p> : null}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 text-xs text-muted-foreground underline decoration-dashed underline-offset-4 transition hover:text-foreground"
        >
          Dismiss
        </button>
      </div>
    </section>
  )
}
