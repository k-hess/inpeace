import { useIntake, type ProgressState } from "#/store/intake-context"
import { track } from "#/lib/analytics"
import { scrollToSectionId } from "#/components/plan/section-nav"
import { formatDateLong } from "#/lib/date-utils"
import type { GatheringPlanData, PlanData } from "#/lib/plan-engine"

/**
 * Whether a timeline task is still Right-Now-eligible: open, not resting
 * ("Not yet"), and not handed off. A deferral or a handoff is the user
 * (or someone they asked) already answering "not now" or "not me" — Right
 * Now must respect that instead of re-insisting on the same task through
 * a different door. Exported so plan-screen.tsx's "what moved" line uses
 * the identical rule.
 */
export function isTaskOpen(progress: ProgressState, id: string): boolean {
  const task = progress.tasks[id]
  if (!task) return true
  if (task.status === "done" || task.status === "deferred") return false
  if (task.handoff) return false
  return true
}

/** The id of the timeline task that mirrors the death-cert tracker's "order them" step. */
const ORDER_CERTIFICATES_TASK_ID = "pacing-order-certificates"

/**
 * The pure "what's next" decision for the after-death plan — separated
 * from RightNowSection below so the return strip (return-strip.tsx) can
 * name the same answer in its "current next thing" line without
 * duplicating the priority logic. Order, most urgent first: the
 * crypto-keys guardrail (genuinely irreversible if missed), then the
 * death certificates if no one's ordered them AND that task hasn't been
 * deferred or handed off, then the nearest triggered deadline that's
 * still open. "rest" is a real, common answer — including once
 * everything left is resting or handed off, not just once it's all done.
 */
export type RightNowTarget =
  | { kind: "crypto-guardrail"; title: string; body: string }
  | { kind: "certificates" }
  | { kind: "deadline"; id: string; title: string; date: Date }
  | { kind: "rest" }

export function computeRightNowTarget(plan: PlanData, progress: ProgressState): RightNowTarget {
  const cryptoCard = plan.protection.find((card) => card.id === "protect-crypto")
  if (cryptoCard && progress.tasks["protect-crypto"]?.status !== "done") {
    return { kind: "crypto-guardrail", title: cryptoCard.title, body: cryptoCard.body }
  }

  const certStatus = progress.certTracker?.status ?? "not-started"
  if (certStatus === "not-started" && isTaskOpen(progress, ORDER_CERTIFICATES_TASK_ID)) {
    return { kind: "certificates" }
  }

  const nextDeadline = plan.deadlineTasks.find((deadline) => isTaskOpen(progress, deadline.id))
  if (nextDeadline) {
    return { kind: "deadline", id: nextDeadline.id, title: nextDeadline.title, date: nextDeadline.date }
  }

  return { kind: "rest" }
}

interface RightNowContent {
  title: string
  body: string
  actionLabel: string
  onAct: () => void
}

/** The shared shell for both variants below — one card, one action, or the rest state. */
function RightNowCard({ content }: { content: RightNowContent | null }) {
  return (
    <section className="mb-16">
      <p className="kicker kicker-rule mb-4">Right now</p>
      <div className="card-surface rounded-2xl px-6 py-6">
        {content ? (
          <>
            <p className="font-medium text-foreground">{content.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{content.body}</p>
            <button
              type="button"
              onClick={content.onAct}
              className="mt-4 text-sm font-medium text-primary underline decoration-dashed underline-offset-4 transition hover:opacity-80"
            >
              {content.actionLabel}
            </button>
          </>
        ) : (
          <p className="text-foreground">Nothing needs you today. Rest counts.</p>
        )}
      </div>
    </section>
  )
}

/** Answers "what now?" before anything else on the after-death plan. */
export function RightNowSection({ plan }: { plan: PlanData }) {
  const { progress, updateProgress } = useIntake()
  const target = computeRightNowTarget(plan, progress)

  if (target.kind === "crypto-guardrail") {
    return (
      <RightNowCard
        content={{
          title: target.title,
          // Condensed, not the full guardrail — that full text already
          // renders right below in Protect Yourself; repeating it
          // verbatim here would be the same paragraph twice on screen.
          body: "Track down the seed phrase or keys and get them somewhere safe. The one thing on this page that can't wait.",
          actionLabel: "Mark it done",
          onAct: () => {
            track("right_now_acted", { target: "protect-crypto" })
            updateProgress((prev) => ({
              ...prev,
              tasks: {
                ...prev.tasks,
                "protect-crypto": { status: "done", handoff: prev.tasks["protect-crypto"]?.handoff ?? null },
              },
            }))
          },
        }}
      />
    )
  }

  if (target.kind === "certificates") {
    return (
      <RightNowCard
        content={{
          title: "Order the death certificates",
          body: "Everything downstream — the banks, the DMV, Social Security — waits on having these in hand. There's a tracker for it further down the page.",
          actionLabel: "Go to Paperwork",
          onAct: () => {
            track("right_now_acted", { target: "death-certificates" })
            scrollToSectionId("paperwork")
          },
        }}
      />
    )
  }

  if (target.kind === "deadline") {
    return (
      <RightNowCard
        content={{
          title: target.title,
          body: `The nearest real deadline on the timeline — ${formatDateLong(target.date)}.`,
          actionLabel: "Go to The timeline",
          onAct: () => {
            track("right_now_acted", { target: target.id })
            scrollToSectionId("timeline")
          },
        }}
      />
    )
  }

  return <RightNowCard content={null} />
}

/**
 * The gathering plan's lighter variant: no guardrails or deadlines to
 * weigh, just a nudge toward the next unchecked inventory item, or the
 * same rest state once everything's gathered.
 */
export function RightNowInventoryPrompt({ plan }: { plan: GatheringPlanData }) {
  const { progress } = useIntake()

  const nextItem = plan.groups.flatMap((group) => group.items).find((item) => !progress.inventoryChecked[item.id])

  return (
    <RightNowCard
      content={
        nextItem
          ? {
              title: nextItem.label,
              body: "A good next thing to gather.",
              actionLabel: "Go to The inventory",
              onAct: () => {
                track("right_now_acted", { target: nextItem.id })
                scrollToSectionId("inventory")
              },
            }
          : null
      }
    />
  )
}
