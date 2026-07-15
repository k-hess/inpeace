import { HeartHandshake } from "lucide-react"
import { cn } from "#/lib/utils"
import type { PlanCard, PlanPhase } from "#/lib/plan-engine"

function TaskCard({ card }: { card: PlanCard }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-6 py-5">
      <p className="font-medium text-foreground">{card.title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
    </div>
  )
}

function PeopleCard({ card }: { card: PlanCard }) {
  return (
    <div
      className={cn(
        "rounded-2xl px-6 py-5",
        card.quiet ? "quiet-card" : "border border-accent bg-accent/30",
      )}
    >
      <div className="flex items-start gap-3">
        <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground/70" />
        <div>
          <p className="font-medium text-foreground">{card.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
        </div>
      </div>
    </div>
  )
}

export function TimelineSection({ phases }: { phases: PlanPhase[] }) {
  return (
    <section className="mb-16 flex flex-col gap-14">
      {phases.map((phase) => {
        if (phase.tasks.length === 0 && phase.people.length === 0) return null
        return (
          <div key={phase.phase}>
            <p className="kicker mb-4">{phase.label}</p>
            <div className="flex flex-col gap-3">
              {phase.tasks.map((card) => (
                <TaskCard key={card.id} card={card} />
              ))}
              {phase.people.map((card) => (
                <PeopleCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
