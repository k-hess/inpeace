import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "#/lib/utils"
import type { FamilyTask } from "#/data/paperwork"

const CHIP_COLORS: Record<FamilyTask["assignee"], string> = {
  You: "bg-accent text-accent-foreground",
  Sam: "bg-secondary text-secondary-foreground",
  Alex: "bg-secondary text-secondary-foreground",
}

export function FamilyView({ tasks }: { tasks: FamilyTask[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({})

  return (
    <div className="rounded-2xl border border-border bg-card px-6 py-6">
      <p className="font-medium text-foreground">Shared with your family</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        Everyone on this sees the same list — no more wondering who called the bank or ordered the
        certificates.
      </p>

      <ul className="mt-5 flex flex-col gap-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-secondary/30 px-4 py-3"
          >
            <button
              type="button"
              onClick={() => setDone((d) => ({ ...d, [task.id]: !d[task.id] }))}
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
            <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-medium", CHIP_COLORS[task.assignee])}>
              {task.assignee}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
