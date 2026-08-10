import { InventorySection } from "#/components/plan/inventory-section"
import { QuestionsSection } from "#/components/plan/questions-section"
import { ChoosingSection } from "#/components/plan/choosing-section"
import { HandoffSection } from "#/components/plan/handoff-section"
import type { GatheringPlanData } from "#/lib/plan-engine"

function AccessNote({ accessNote }: { accessNote: GatheringPlanData["accessNote"] }) {
  return (
    <div className="protect-card mb-8 px-6 py-5">
      <p className="font-medium">{accessNote.title}</p>
      <p className="mt-1.5 text-sm leading-relaxed opacity-90">{accessNote.body}</p>
    </div>
  )
}

function ReligionNote({ religionNote }: { religionNote: NonNullable<GatheringPlanData["religionNote"]> }) {
  return (
    <div className="protect-card mb-8 px-6 py-5">
      <p className="font-medium">{religionNote.title}</p>
      <p className="mt-1.5 text-sm leading-relaxed opacity-90">{religionNote.body}</p>
    </div>
  )
}

export function GatheringScreen({ plan }: { plan: GatheringPlanData }) {
  const inventory = (
    <>
      <AccessNote accessNote={plan.accessNote} />
      <InventorySection groups={plan.groups} />
    </>
  )
  const questions = (
    <QuestionsSection questionGroups={plan.questionGroups} conversationNote={plan.conversationNote} mode={plan.mode} />
  )

  return (
    <div className="page-wrap py-14 sm:py-20">
      <header className="rise-in mb-16">
        <p className="kicker kicker-rule mb-5">Your gathering plan · {plan.stateName}</p>
        <h1 className="display text-[2.1rem] leading-[1.15] text-foreground sm:text-[2.6rem]">{plan.headline}</h1>
        <p className="mt-4 max-w-lg leading-relaxed text-pretty text-muted-foreground">{plan.sub}</p>
      </header>

      {plan.religionNote ? <ReligionNote religionNote={plan.religionNote} /> : null}

      {plan.mode === "for-self" ? (
        <>
          {inventory}
          {questions}
          <ChoosingSection />
          <HandoffSection />
        </>
      ) : (
        <>
          {questions}
          {inventory}
          <ChoosingSection />
        </>
      )}
    </div>
  )
}
