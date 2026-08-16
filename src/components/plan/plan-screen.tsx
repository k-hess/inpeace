import { HeartHandshake } from "lucide-react"
import { useIntake } from "#/store/intake-context"
import { PlanHeader } from "#/components/plan/plan-header"
import { ReturnStrip } from "#/components/plan/return-strip"
import { RightNowSection, computeRightNowTarget, isTaskOpen } from "#/components/plan/right-now-section"
import { ProtectionSection } from "#/components/plan/protection-section"
import { TimelineSection } from "#/components/plan/timeline-section"
import { FuneralGuidanceSection } from "#/components/plan/funeral-guidance-section"
import { CareCircleSection } from "#/components/plan/care-circle-section"
import { CanWaitSection } from "#/components/plan/can-wait-section"
import { PaperworkSection } from "#/components/plan/paperwork-section"
import { VaultSection } from "#/components/plan/vault-section"
import { LiabilitiesSection } from "#/components/plan/liabilities-section"
import { EdgeCasesSection } from "#/components/plan/edge-cases-section"
import { ChoosingSection } from "#/components/plan/choosing-section"
import { RippleSection } from "#/components/plan/ripple-section"
import { PricingSection } from "#/components/plan/pricing-section"
import { SectionChipBar, SectionRail, useActiveSection, type PlanNavSection } from "#/components/plan/section-nav"
import { conciergeCard } from "#/data/people"
import { costRanges, redFlags, whatToAsk, yourRights } from "#/data/funeral-guidance"
import { choosingGuides } from "#/data/choosing"
import { track } from "#/lib/analytics"
import { formatDateLong } from "#/lib/date-utils"
import type { PlanData } from "#/lib/plan-engine"
import type { IntakeAnswers } from "#/types/intake"

/**
 * The "On this page" section list for the after-death plan. Built here,
 * next to where the sections are actually composed, rather than hardcoded
 * once — each entry's visibility mirrors the exact null-guard the section
 * component itself uses, so the nav never lists a destination that didn't
 * render. The closing ripple section is deliberately left out: it's a
 * coda, not a destination worth navigating to. Right Now isn't in here
 * either — it's not a destination, it's the first thing on the page.
 */
function buildNavSections(plan: PlanData, hasRestingCards: boolean): PlanNavSection[] {
  const timelineVisible = plan.phases.some((phase) => phase.tasks.length > 0 || phase.people.length > 0)
  const funeralVisible = costRanges.length > 0 || yourRights.length > 0 || whatToAsk.length > 0 || redFlags.length > 0
  const choosingVisible = choosingGuides.length > 0

  const sections: (PlanNavSection | false)[] = [
    plan.protection.length > 0 && { id: "protect", label: "Protect yourself" },
    timelineVisible && { id: "timeline", label: "Timeline" },
    funeralVisible && { id: "funeral", label: "Funeral home" },
    { id: "care-circle", label: "Let people help" },
    (plan.canWait.length > 0 || hasRestingCards) && { id: "can-wait", label: "It can wait" },
    { id: "paperwork", label: "Paperwork" },
    { id: "vault", label: "Vault" },
    plan.liabilities.length > 0 && { id: "liabilities", label: "Debts" },
    plan.edgeCases.length > 0 && { id: "edge-cases", label: "Easy to miss" },
    choosingVisible && { id: "choosing", label: "Choosing well" },
  ]

  return sections.filter((section): section is PlanNavSection => Boolean(section))
}

/** Reference sections (change 4) that collapse to a summary by default. */
const COLLAPSIBLE_SECTION_IDS = new Set(["funeral", "liabilities", "edge-cases", "choosing"])

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

/** Names the current Right Now answer for the return strip's "next thing" line, without repeating its body copy. */
function nextThingLine(plan: PlanData, progress: ReturnType<typeof useIntake>["progress"]): string | null {
  const target = computeRightNowTarget(plan, progress)
  if (target.kind === "rest") return null
  if (target.kind === "crypto-guardrail") return `Next up: ${target.title.toLowerCase()}.`
  if (target.kind === "certificates") return "Next up: ordering the death certificates."
  return `Next up: ${target.title.toLowerCase()}.`
}

/** Names the nearest still-open deadline, if the timeline has one worth flagging — same eligibility rule as Right Now. */
function movedLine(plan: PlanData, progress: ReturnType<typeof useIntake>["progress"]): string | null {
  const deadline = plan.deadlineTasks.find((task) => isTaskOpen(progress, task.id))
  if (!deadline) return null
  return `${deadline.title} is coming up: ${formatDateLong(deadline.date)}.`
}

export function PlanScreen({ plan, answers }: { plan: PlanData; answers: IntakeAnswers }) {
  const { showPricing, progress, updateProgress, returnGapMs } = useIntake()

  const restingCards = plan.phases
    .flatMap((phase) => phase.tasks)
    .filter((card) => progress.tasks[card.id]?.status === "deferred")

  const navSections = buildNavSections(plan, restingCards.length > 0)
  const activeId = useActiveSection(navSections.map((section) => section.id))

  function expandSection(id: string) {
    if (!COLLAPSIBLE_SECTION_IDS.has(id) || progress.sectionExpanded[id]) return
    updateProgress((prev) => ({ ...prev, sectionExpanded: { ...prev.sectionExpanded, [id]: true } }))
    track("section_expanded", { section: id })
  }

  return (
    <>
      <SectionChipBar sections={navSections} activeId={activeId} mode={answers.mode} onBeforeJump={expandSection} />
      <div className="lg:mx-auto lg:flex lg:w-[min(1040px,calc(100%-2.5rem))] lg:items-start lg:gap-14">
        <SectionRail sections={navSections} activeId={activeId} mode={answers.mode} onBeforeJump={expandSection} />
        <div className="page-wrap py-14 sm:py-20 lg:mx-0 lg:min-w-0 lg:shrink-0">
          <PlanHeader headline={plan.headline} sub={plan.sub} stateName={plan.stateName} firstName={plan.firstName} />
          <ReturnStrip
            returnGapMs={returnGapMs}
            progress={progress}
            movedLine={movedLine(plan, progress)}
            nextThingLine={nextThingLine(plan, progress)}
          />
          <RightNowSection plan={plan} />
          <ProtectionSection cards={plan.protection} id="protect" />
          <TimelineSection phases={plan.phases} id="timeline" />
          <FuneralGuidanceSection
            id="funeral"
            expanded={Boolean(progress.sectionExpanded.funeral)}
            onExpand={() => expandSection("funeral")}
          />
          <CareCircleSection id="care-circle" />
          <CanWaitSection items={plan.canWait} resting={restingCards} id="can-wait" />
          <PaperworkSection paperwork={plan.paperwork} firstName={plan.firstName} id="paperwork" />
          <VaultSection groups={plan.vaultGroups} id="vault" />
          <LiabilitiesSection
            cards={plan.liabilities}
            id="liabilities"
            expanded={Boolean(progress.sectionExpanded.liabilities)}
            onExpand={() => expandSection("liabilities")}
          />
          <EdgeCasesSection
            cards={plan.edgeCases}
            id="edge-cases"
            expanded={Boolean(progress.sectionExpanded["edge-cases"])}
            onExpand={() => expandSection("edge-cases")}
          />
          <ChoosingSection
            id="choosing"
            expanded={Boolean(progress.sectionExpanded.choosing)}
            onExpand={() => expandSection("choosing")}
          />
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
