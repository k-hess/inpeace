import { PlanHeader } from "#/components/plan/plan-header"
import { ProtectionSection } from "#/components/plan/protection-section"
import { TimelineSection } from "#/components/plan/timeline-section"
import { CanWaitSection } from "#/components/plan/can-wait-section"
import { PaperworkSection } from "#/components/plan/paperwork-section"
import type { PlanData } from "#/lib/plan-engine"
import type { IntakeAnswers } from "#/types/intake"

export function PlanScreen({ plan }: { plan: PlanData; answers: IntakeAnswers }) {
  return (
    <div className="page-wrap py-14 sm:py-20">
      <PlanHeader introLine={plan.introLine} stateName={plan.stateName} />
      <ProtectionSection cards={plan.protection} />
      <TimelineSection phases={plan.phases} />
      <CanWaitSection items={plan.canWait} />
      <PaperworkSection paperwork={plan.paperwork} />
    </div>
  )
}
