import { cn } from "#/lib/utils"
import type { NotificationItem } from "#/data/paperwork"
import { ASSIGNEE_CHIP_COLORS, type Assignee } from "#/components/plan/family-view"
import { useIntake, type NotifyStatus } from "#/store/intake-context"

const STATUS_ORDER: NotifyStatus[] = ["not-yet", "done", "waiting"]

const STATUS_LABEL: Record<NotifyStatus, string> = {
  "not-yet": "Not yet",
  done: "Done",
  waiting: "Waiting",
}

const STATUS_STYLES: Record<NotifyStatus, string> = {
  "not-yet": "border-border bg-transparent text-muted-foreground hover:border-primary/40",
  done: "border-primary bg-primary text-primary-foreground",
  waiting: "border-border bg-secondary text-secondary-foreground",
}

function nextStatus(status: NotifyStatus): NotifyStatus {
  const idx = STATUS_ORDER.indexOf(status)
  return STATUS_ORDER[(idx + 1) % STATUS_ORDER.length]
}

/**
 * Who typically ends up handling each institution — a deterministic,
 * thematic pairing (not round-robin) so it lines up with the assignments
 * already made in buildFamilyTasks (banks -> Sam, mail-adjacent
 * admin -> Renee, everything else official -> You).
 */
const ASSIGNEE_BY_ID: Record<string, Assignee> = {
  "notify-ssa": "You",
  "notify-banks": "Sam",
  "notify-dmv": "Sam",
  "notify-brokerage": "You",
  "notify-subscriptions": "Renee",
  "notify-employer": "You",
}

export function NotificationTracker({
  notifications,
  showFamilyView,
}: {
  notifications: NotificationItem[]
  showFamilyView: boolean
}) {
  const { progress, updateProgress } = useIntake()
  const statuses = progress.notifications

  return (
    <div className="card-surface rounded-2xl px-6 py-6">
      <p className="font-medium text-foreground">Who's been told</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        Every place that needs to hear about it, in one list.
      </p>

      <ul className="mt-5 flex flex-col gap-2">
        {notifications.map((item) => {
          const status = statuses[item.id] ?? "not-yet"
          const assignee = ASSIGNEE_BY_ID[item.id] ?? "You"

          return (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-secondary/30 px-4 py-3"
            >
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm text-foreground">{item.label}</span>
                {item.note ? (
                  <span className="text-xs text-muted-foreground">{item.note}</span>
                ) : null}
                {item.needsCert ? (
                  <span className="text-xs text-muted-foreground">Needs a certified copy</span>
                ) : null}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {showFamilyView ? (
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      ASSIGNEE_CHIP_COLORS[assignee],
                    )}
                  >
                    {assignee}
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() =>
                    updateProgress((prev) => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        [item.id]: nextStatus(prev.notifications[item.id] ?? "not-yet"),
                      },
                    }))
                  }
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    STATUS_STYLES[status],
                  )}
                >
                  {STATUS_LABEL[status]}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
