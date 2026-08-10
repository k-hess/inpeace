import { HeartHandshake } from "lucide-react"
import { useIntake } from "#/store/intake-context"
import { PlanHeader } from "#/components/plan/plan-header"
import { ProtectionSection } from "#/components/plan/protection-section"
import { TimelineSection } from "#/components/plan/timeline-section"
import { FuneralGuidanceSection } from "#/components/plan/funeral-guidance-section"
import { CareCircleSection } from "#/components/plan/care-circle-section"
import { CanWaitSection } from "#/components/plan/can-wait-section"
import { PaperworkSection } from "#/components/plan/paperwork-section"
import { LiabilitiesSection } from "#/components/plan/liabilities-section"
import { EdgeCasesSection } from "#/components/plan/edge-cases-section"
import { ChoosingSection } from "#/components/plan/choosing-section"
import { RippleSection } from "#/components/plan/ripple-section"
import { PricingSection } from "#/components/plan/pricing-section"
import { SectionChipBar, SectionRail, useActiveSection, type PlanNavSection } from "#/components/plan/section-nav"
import { conciergeCard } from "#/data/people"
import { costRanges, redFlags, whatToAsk, yourRights } from "#/data/funeral-guidance"
import { choosingGuides } from "#/data/choosing"
import type { PlanData } from "#/lib/plan-engine"
import type { IntakeAnswers } from "#/types/intake"

/**
 * The "On this page" section list for the after-death plan. Built here,
 * next to where the sections are actually composed, rather than hardcoded
 * once — each entry's visibility mirrors the exact null-guard the section
 * component itself uses, so the nav never lists a destination that didn't
 * render. The closing ripple section is deliberately left out: it's a
 * coda, not a destination worth navigating to.
 */
function buildNavSections(plan: PlanData): PlanNavSection[] {
  const timelineVisible = plan.phases.some((phase) => phase.tasks.length > 0 || phase.people.length > 0)
  const funeralVisible = costRanges.length > 0 || yourRights.length > 0 || whatToAsk.length > 0 || redFlags.length > 0
  const choosingVisible = choosingGuides.length > 0

  const sections: (PlanNavSection | false)[] = [
    plan.protection.length > 0 && { id: "protect", label: "Protect yourself" },
    timelineVisible && { id: "timeline", label: "The timeline" },
    funeralVisible && { id: "funeral", label: "The funeral home" },
    { id: "care-circle", label: "Let people help" },
    plan.canWait.length > 0 && { id: "can-wait", label: "It can wait" },
    { id: "paperwork", label: "Paperwork" },
    plan.liabilities.length > 0 && { id: "liabilities", label: "Debts" },
    plan.edgeCases.length > 0 && { id: "edge-cases", label: "Easy to miss" },
    choosingVisible && { id: "choosing", label: "Choosing well" },
  ]

  return sections.filter((section): section is PlanNavSection => Boolean(section))
}

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

export function PlanScreen({ plan, answers }: { plan: PlanData; answers: IntakeAnswers }) {
  const { showPricing } = useIntake()
  const navSections = buildNavSections(plan)
  const activeId = useActiveSection(navSections.map((section) => section.id))

  return (
    <>
      <SectionChipBar sections={navSections} activeId={activeId} mode={answers.mode} />
      <div className="lg:mx-auto lg:flex lg:w-[min(1040px,calc(100%-2.5rem))] lg:items-start lg:gap-14">
        <SectionRail sections={navSections} activeId={activeId} mode={answers.mode} />
        <div className="page-wrap py-14 sm:py-20 lg:mx-0 lg:min-w-0 lg:shrink-0">
          <PlanHeader headline={plan.headline} sub={plan.sub} stateName={plan.stateName} firstName={plan.firstName} />
          <ProtectionSection cards={plan.protection} id="protect" />
          <TimelineSection phases={plan.phases} id="timeline" />
          <FuneralGuidanceSection id="funeral" />
          <CareCircleSection id="care-circle" />
          <CanWaitSection items={plan.canWait} id="can-wait" />
          <PaperworkSection paperwork={plan.paperwork} firstName={plan.firstName} id="paperwork" />
          <LiabilitiesSection cards={plan.liabilities} id="liabilities" />
          <EdgeCasesSection cards={plan.edgeCases} id="edge-cases" />
          <ChoosingSection id="choosing" />
          <RippleSection />
          {showPricing ? (
            <>
              <PricingSection />
              <ConciergeCard />
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
