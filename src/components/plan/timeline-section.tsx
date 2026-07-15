import { HeartHandshake } from "lucide-react"
import { cn } from "#/lib/utils"
import type { PlanCard, PlanPhase } from "#/lib/plan-engine"

function TaskCard({ card }: { card: PlanCard }) {
  return (
    <div className="card-surface rounded-2xl px-6 py-5">
      <p className="font-medium text-foreground">{card.title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
    </div>
  )
}

/**
 * People/resource cards sit in the timeline with a soft sage wash. The
 * `quiet` variant (the financial advisor) must stay the single quietest
 * element on the page: no fill, no shadow, dashed hairline, muted ink.
 */
function PeopleCard({ card }: { card: PlanCard }) {
  return (
    <div
      className={cn(
        "rounded-2xl px-6 py-5",
        card.quiet ? "quiet-card" : "border border-accent/70 bg-accent/25",
      )}
    >
      <div className="flex items-start gap-3">
        {card.quiet ? (
          <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70" aria-hidden />
        ) : (
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/60 text-accent-foreground">
            <HeartHandshake className="h-3.5 w-3.5" aria-hidden />
          </span>
        )}
        <div>
          <p className="font-medium text-foreground">{card.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * The pacing timeline: phases hang off a quiet vertical rail on wider
 * screens — a sage marker per phase, a hairline connecting them — so the
 * long scroll reads as one path rather than stacked headings.
 */
export function TimelineSection({ phases }: { phases: PlanPhase[] }) {
  const visible = phases.filter((phase) => phase.tasks.length > 0 || phase.people.length > 0)
  if (visible.length === 0) return null

  return (
    <section className="relative mb-16 flex flex-col gap-12 sm:gap-14">
      <div className="absolute top-2 bottom-4 left-[3px] hidden w-px bg-border sm:block" aria-hidden />
      {visible.map((phase) => (
        <div key={phase.phase} className="relative sm:pl-10">
          <span
            className="absolute top-[3px] left-0 hidden h-[7px] w-[7px] rounded-full bg-[var(--sage-400)] ring-4 ring-background sm:block"
            aria-hidden
          />
          <p className="kicker kicker-rule mb-4 sm:before:hidden">{phase.label}</p>
          <div className="flex flex-col gap-3">
            {phase.tasks.map((card) => (
              <TaskCard key={card.id} card={card} />
            ))}
            {phase.people.map((card) => (
              <PeopleCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
