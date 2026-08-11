import { Minus, Plus } from "lucide-react"
import { cn } from "#/lib/utils"
import { useIntake, type CertStatus, type CertTrackerState } from "#/store/intake-context"

const STATUS_COPY: Record<CertStatus, string> = {
  "not-started": "Haven't ordered yet",
  ordered: "Ordered — waiting on them",
  received: "In hand",
}

export function DeathCertTracker({ recommendedCopies }: { recommendedCopies: number }) {
  const { progress, updateProgress } = useIntake()
  const tracker: CertTrackerState = progress.certTracker ?? { count: recommendedCopies, status: "not-started" }
  const { count, status } = tracker

  function setCount(next: (count: number) => number) {
    updateProgress((prev) => {
      const current = prev.certTracker ?? { count: recommendedCopies, status: "not-started" as const }
      return { ...prev, certTracker: { ...current, count: next(current.count) } }
    })
  }

  function setStatus(nextStatus: CertStatus) {
    updateProgress((prev) => {
      const current = prev.certTracker ?? { count: recommendedCopies, status: "not-started" as const }
      return { ...prev, certTracker: { ...current, status: nextStatus } }
    })
  }

  return (
    <div className="card-surface rounded-2xl px-6 py-6">
      <p className="font-medium text-foreground">Death certificates</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        We'd suggest ordering around {recommendedCopies} copies — enough for banks, insurance, the DMV,
        and whatever else comes up, without needing a second round.
      </p>

      <div className="mt-5 flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Copies</span>
        <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1">
          <button
            type="button"
            aria-label="Fewer copies"
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            onClick={() => setCount((c) => Math.max(1, c - 1))}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-6 text-center text-sm font-medium text-foreground">{count}</span>
          <button
            type="button"
            aria-label="More copies"
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            onClick={() => setCount((c) => c + 1)}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {(["not-started", "ordered", "received"] as CertStatus[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition",
              status === s
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-transparent text-muted-foreground hover:border-primary/40",
            )}
          >
            {s === "not-started" ? "Not started" : s === "ordered" ? "Ordered" : "Received"}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{STATUS_COPY[status]}</p>
    </div>
  )
}
