import { Check } from "lucide-react"
import { cn } from "#/lib/utils"
import type { FamilyTask } from "#/data/paperwork"
import { useIntake } from "#/store/intake-context"

export type Assignee = FamilyTask["assignee"]

/** Shared assignee-chip palette — reused anywhere a task shows who's handling it. */
export const ASSIGNEE_CHIP_COLORS: Record<Assignee, string> = {
  You: "bg-accent text-accent-foreground",
  Sister: "bg-secondary text-secondary-foreground",
  Brother: "bg-secondary text-secondary-foreground",
}

export function FamilyView({ tasks, firstName }: { tasks: FamilyTask[]; firstName: string | null }) {
  const { progress, updateProgress } = useIntake()
  const done = progress.familyTasksDone

  const yourWork = tasks.reduce(
    (acc, task) => {
      if (task.assignee !== "You") return acc
      acc.total += 1
      if (done[task.id]) acc.done += 1
      return acc
    },
    { done: 0, total: 0 },
  )

  return (
    <div className="card-surface rounded-2xl px-6 py-6">
      <p className="font-medium text-foreground">Shared with your family</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        Everyone here sees the same list{firstName ? ` for ${firstName}` : ""} — no more wondering who
        called the bank or ordered the certificates.
      </p>

      <ul className="mt-5 flex flex-col gap-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-secondary/30 px-4 py-3"
          >
            <button
              type="button"
              onClick={() =>
                updateProgress((prev) => ({
                  ...prev,
                  familyTasksDone: { ...prev.familyTasksDone, [task.id]: !prev.familyTasksDone[task.id] },
                }))
              }
              className="flex flex-1 items-center gap-3 text-left"
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                  done[task.id] ? "border-primary bg-primary text-primary-foreground" : "border-border",
                )}
              >
                {done[task.id] ? <Check className="h-3 w-3" /> : null}
              </span>
              <span
                className={cn(
                  "text-sm text-foreground",
                  done[task.id] && "text-muted-foreground line-through",
                )}
              >
                {task.label}
              </span>
            </button>
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                ASSIGNEE_CHIP_COLORS[task.assignee],
              )}
            >
              {task.assignee}
            </span>
          </li>
        ))}
      </ul>

      {yourWork.total > 0 && tasks.length > 1 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          You're carrying {yourWork.total} of these {tasks.length}
          {yourWork.done > 0 ? `, and you've done ${yourWork.done} already` : ""} — everyone here can see that.
        </p>
      ) : null}
    </div>
  )
}
