import { useEffect, useMemo } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { useIntake } from "#/store/intake-context"
import { buildGatheringPlan, buildPlan } from "#/lib/plan-engine"
import { PlanScreen } from "#/components/plan/plan-screen"
import { GatheringScreen } from "#/components/plan/gathering-screen"

type DemoKey = "a" | "b" | "c" | "d"
type PlanSearch = { demo?: DemoKey }

const DEMO_KEYS: DemoKey[] = ["a", "b", "c", "d"]

export const Route = createFileRoute("/plan")({
  component: PlanRoute,
  ssr: false,
  head: () => ({
    meta: [{ title: "In Peace — Your plan" }],
  }),
  validateSearch: (search: Record<string, unknown>): PlanSearch => ({
    demo: DEMO_KEYS.includes(search.demo as DemoKey) ? (search.demo as DemoKey) : undefined,
  }),
})

function PlanRoute() {
  const { demo } = Route.useSearch()
  const { answers, loadScenario } = useIntake()

  useEffect(() => {
    if (demo) loadScenario(demo)
    // Only re-run when the URL's demo param itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo])

  const plan = useMemo(() => (answers.mode === "after" ? buildPlan(answers) : null), [answers])
  const gatheringPlan = useMemo(
    () => (answers.mode !== "after" ? buildGatheringPlan(answers) : null),
    [answers],
  )

  if (!plan && !gatheringPlan) {
    return (
      <div className="page-wrap flex min-h-[70vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="font-serif text-2xl text-foreground">A few questions first</p>
        <p className="max-w-sm text-muted-foreground">
          Your plan comes from a few short questions.
        </p>
        <Link
          to="/start"
          className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Answer a few questions
        </Link>
      </div>
    )
  }

  if (plan) return <PlanScreen plan={plan} answers={answers} />
  return <GatheringScreen plan={gatheringPlan!} />
}
