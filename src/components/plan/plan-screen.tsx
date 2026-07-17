import { HeartHandshake } from "lucide-react"
import { useIntake } from "#/store/intake-context"
import { PlanHeader } from "#/components/plan/plan-header"
import { ProtectionSection } from "#/components/plan/protection-section"
import { TimelineSection } from "#/components/plan/timeline-section"
import { CareCircleSection } from "#/components/plan/care-circle-section"
import { CanWaitSection } from "#/components/plan/can-wait-section"
import { PaperworkSection } from "#/components/plan/paperwork-section"
import { PricingSection } from "#/components/plan/pricing-section"
import { conciergeCard } from "#/data/people"
import type { PlanData } from "#/lib/plan-engine"
import type { IntakeAnswers } from "#/types/intake"

/**
 * The concierge card behind the demo pricing toggle. Lives here rather than
 * in the pacing engine's phase/trigger system since it's gated on
 * showPricing (interview-prop UI state), not on intake answers. Styled to
 * match the "quiet" people-card treatment from timeline-section.tsx.
 */
function ConciergeCard() {
  return (
    <div className="quiet-card -mt-10 mb-16 rounded-2xl px-6 py-5">
      <div className="flex items-start gap-3">
        <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70" aria-hidden />
        <div>
          <p className="font-medium text-foreground">{conciergeCard.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{conciergeCard.body}</p>
        </div>
      </div>
    </div>
  )
}

export function PlanScreen({ plan }: { plan: PlanData; answers: IntakeAnswers }) {
  const { showPricing } = useIntake()

  return (
    <div className="page-wrap py-14 sm:py-20">
      <PlanHeader headline={plan.headline} sub={plan.sub} stateName={plan.stateName} firstName={plan.firstName} />
      <ProtectionSection cards={plan.protection} />
      <TimelineSection phases={plan.phases} />
      <CareCircleSection />
      <CanWaitSection items={plan.canWait} />
      <PaperworkSection paperwork={plan.paperwork} firstName={plan.firstName} />
      {showPricing ? (
        <>
          <PricingSection />
          <ConciergeCard />
        </>
      ) : null}
    </div>
  )
}
