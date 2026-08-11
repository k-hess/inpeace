import { useState } from "react"
import { Check, HeartHandshake } from "lucide-react"
import { cn } from "#/lib/utils"
import { track } from "#/lib/analytics"
import { useIntake, type TaskState } from "#/store/intake-context"
import { careCirclePeople } from "#/data/care-circle"
import type { PlanCard, PlanPhase } from "#/lib/plan-engine"

const OPEN_TASK: TaskState = { status: "open", handoff: null }

/**
 * A timeline task's three honorable exits: done (settles, quietly), not
 * yet (defers to "Resting for now" in the It Can Wait section — see
 * can-wait-section.tsx), and handed off to someone in the care circle.
 * Deferred cards never reach this component — TimelineSection below
 * filters them out of each phase, since they render in It Can Wait instead.
 */
function TaskCard({ card }: { card: PlanCard }) {
  const { progress, updateProgress } = useIntake()
  const task = progress.tasks[card.id] ?? OPEN_TASK
  const [pickingPerson, setPickingPerson] = useState(false)

  function setStatus(status: TaskState["status"]) {
    updateProgress((prev) => ({
      ...prev,
      tasks: { ...prev.tasks, [card.id]: { ...(prev.tasks[card.id] ?? OPEN_TASK), status } },
    }))
  }

  function defer() {
    setStatus("deferred")
    track("task_deferred", { item: card.id })
  }

  function handOff(person: string) {
    updateProgress((prev) => ({
      ...prev,
      tasks: { ...prev.tasks, [card.id]: { ...(prev.tasks[card.id] ?? OPEN_TASK), handoff: person } },
    }))
    track("task_handed_off", { item: card.id })
    setPickingPerson(false)
  }

  function clearHandoff() {
    updateProgress((prev) => ({
      ...prev,
      tasks: { ...prev.tasks, [card.id]: { ...(prev.tasks[card.id] ?? OPEN_TASK), handoff: null } },
    }))
  }

  if (task.status === "done") {
    return (
      <div className="card-surface rounded-2xl px-6 py-5 opacity-60 transition">
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/70" aria-hidden />
          <div>
            <p className="font-medium text-foreground/80 line-through decoration-muted-foreground/50">
              {card.title}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">That's held.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-surface rounded-2xl px-6 py-5">
      <p className="font-medium text-foreground">{card.title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={() => setStatus("done")}
          className="text-xs font-medium text-muted-foreground underline decoration-dashed underline-offset-4 transition hover:text-foreground"
        >
          Done
        </button>
        <button
          type="button"
          onClick={defer}
          className="text-xs text-muted-foreground underline decoration-dashed underline-offset-4 transition hover:text-foreground"
        >
          Not yet
        </button>
        {task.handoff ? (
          <button
            type="button"
            onClick={clearHandoff}
            className="rounded-full border border-accent/60 bg-accent/25 px-2.5 py-1 text-xs text-accent-foreground transition hover:opacity-80"
          >
            with {task.handoff}
          </button>
        ) : pickingPerson ? (
          <span className="flex flex-wrap items-center gap-1.5">
            {careCirclePeople.map((person) => (
              <button
                key={person}
                type="button"
                onClick={() => handOff(person)}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                {person}
              </button>
            ))}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setPickingPerson(true)}
            className="text-xs text-muted-foreground underline decoration-dashed underline-offset-4 transition hover:text-foreground"
          >
            Ask someone
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * People/resource cards sit in the timeline with a soft sage wash. The
 * `quiet` variant (the financial advisor) must stay the single quietest
 * element on the page: no fill, no shadow, dashed hairline, muted ink.
 * These aren't tasks with an exit state — just mentions of who can help.
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
export function TimelineSection({ phases, id }: { phases: PlanPhase[]; id: string }) {
  const { progress } = useIntake()

  // Deferred tasks move to "Resting for now" in It Can Wait — drop them
  // here before deciding which phases still have anything to show.
  const openPhases = phases.map((phase) => ({
    ...phase,
    tasks: phase.tasks.filter((card) => progress.tasks[card.id]?.status !== "deferred"),
  }))
  const visible = openPhases.filter((phase) => phase.tasks.length > 0 || phase.people.length > 0)
  if (visible.length === 0) return null

  return (
    <section id={id} className="section-anchor relative mb-16 flex flex-col gap-12 sm:gap-14">
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
