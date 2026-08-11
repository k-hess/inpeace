import { HeartHandshake, Share2 } from "lucide-react"
import { cn } from "#/lib/utils"
import { careCircleSlots, type CareCircleSlot } from "#/data/care-circle"
import { useIntake } from "#/store/intake-context"

/**
 * The Care Circle: help and time, structured, for the people who ask "what
 * can I do?". Never vendors, never prices, never booking — just a place to
 * put the answer. Claims persist (see intake-context.tsx); "Share this
 * list" is a visual placeholder and intentionally does nothing yet.
 */
export function CareCircleSection({ id }: { id: string }) {
  const { progress, updateProgress } = useIntake()
  const claims = progress.careCircleClaims

  function toggle(slot: CareCircleSlot) {
    updateProgress((prev) => {
      if (prev.careCircleClaims[slot.id]) {
        const nextClaims = { ...prev.careCircleClaims }
        delete nextClaims[slot.id]
        return { ...prev, careCircleClaims: nextClaims }
      }
      return {
        ...prev,
        careCircleClaims: { ...prev.careCircleClaims, [slot.id]: { claimedBy: "You", claimedNote: "" } },
      }
    })
  }

  return (
    <section id={id} className="section-anchor mb-16">
      <p className="kicker kicker-rule mb-4">Let people help</p>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <h2 className="display text-2xl leading-snug text-foreground sm:text-3xl">
          You don't have to do this alone.
        </h2>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/70 bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-[var(--shadow-card)] transition hover:border-primary/40 hover:text-foreground"
        >
          <Share2 className="h-3.5 w-3.5" aria-hidden />
          Share this list
        </button>
      </div>
      <p className="mb-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
        People keep asking what they can do. Here's somewhere to put the answer. Tap anything that's
        been offered.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {careCircleSlots.map((slot) => {
          const claim = claims[slot.id]
          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => toggle(slot)}
              aria-pressed={Boolean(claim)}
              className={cn(
                "rounded-2xl px-6 py-5 text-left transition",
                claim
                  ? "border border-accent/70 bg-accent/25"
                  : "card-surface hover:border-primary/40 hover:bg-accent/10",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                    claim ? "bg-accent/60 text-accent-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  <HeartHandshake className="h-3.5 w-3.5" aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-foreground">{slot.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {claim
                      ? claim.claimedBy === "You"
                        ? "You've got this one."
                        : `${claim.claimedBy}: ${claim.claimedNote}`
                      : slot.detail}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
