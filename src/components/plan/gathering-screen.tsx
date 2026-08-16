import { VaultSection } from "#/components/plan/vault-section"
import { QuestionsSection } from "#/components/plan/questions-section"
import { ChoosingSection } from "#/components/plan/choosing-section"
import { HandoffSection } from "#/components/plan/handoff-section"
import { ReturnStrip } from "#/components/plan/return-strip"
import { RightNowInventoryPrompt } from "#/components/plan/right-now-section"
import { SectionChipBar, SectionRail, useActiveSection, type PlanNavSection } from "#/components/plan/section-nav"
import { choosingGuides } from "#/data/choosing"
import { useIntake } from "#/store/intake-context"
import { track } from "#/lib/analytics"
import type { GatheringPlanData } from "#/lib/plan-engine"

/**
 * The "On this page" section list for the gathering plan (both the
 * "helping a family member" and "getting my own affairs in order" doors).
 * Built next to where the sections are composed below, so it always
 * reflects what actually renders for the current mode — "The vault"
 * and "The conversation" swap order between modes but both always render;
 * "Who can open this" only exists for-self, matching the handoff section's
 * own gating in GatheringScreen below.
 */
function buildNavSections(plan: GatheringPlanData): PlanNavSection[] {
  const inventory: PlanNavSection = { id: "vault", label: "The vault" }
  const questions: PlanNavSection = {
    id: "questions",
    label: plan.mode === "for-self" ? "Answers to have ready" : "The conversation",
  }
  const choosing = choosingGuides.length > 0 && ({ id: "choosing", label: "Choosing well" } as const)
  const handoff = plan.mode === "for-self" && ({ id: "handoff", label: "Who can open this" } as const)

  // Order follows document order, which itself flips by mode (see
  // GatheringScreen below): the "for-self" door leads with the inventory,
  // "for-family" leads with the conversation.
  const sections: (PlanNavSection | false)[] =
    plan.mode === "for-self" ? [inventory, questions, choosing, handoff] : [questions, inventory, choosing]

  return sections.filter((section): section is PlanNavSection => Boolean(section))
}

/** Reference sections (change 4) that collapse to a summary by default — just Choosing on this plan. */
const COLLAPSIBLE_SECTION_IDS = new Set(["choosing"])

function ReligionNote({ religionNote }: { religionNote: NonNullable<GatheringPlanData["religionNote"]> }) {
  return (
    <div className="protect-card mb-8 px-6 py-5">
      <p className="font-medium">{religionNote.title}</p>
      <p className="mt-1.5 text-sm leading-relaxed opacity-90">{religionNote.body}</p>
    </div>
  )
}

export function GatheringScreen({ plan }: { plan: GatheringPlanData }) {
  const navSections = buildNavSections(plan)
  const activeId = useActiveSection(navSections.map((section) => section.id))
  const { progress, updateProgress, returnGapMs } = useIntake()

  function expandSection(id: string) {
    if (!COLLAPSIBLE_SECTION_IDS.has(id) || progress.sectionExpanded[id]) return
    updateProgress((prev) => ({ ...prev, sectionExpanded: { ...prev.sectionExpanded, [id]: true } }))
    track("section_expanded", { section: id })
  }

  const nextVaultItem = plan.vaultGroups.flatMap((group) => group.items).find((item) => !progress.vaultEntries[item.id])
  const nextThingLine = nextVaultItem ? `Next up: ${nextVaultItem.label.toLowerCase()}.` : null

  const inventory = <VaultSection groups={plan.vaultGroups} id="vault" />
  const questions = (
    <QuestionsSection
      questionGroups={plan.questionGroups}
      conversationNote={plan.conversationNote}
      mode={plan.mode}
      id="questions"
    />
  )

  return (
    <>
      <SectionChipBar sections={navSections} activeId={activeId} mode={plan.mode} onBeforeJump={expandSection} />
      <div className="lg:mx-auto lg:flex lg:w-[min(1040px,calc(100%-2.5rem))] lg:items-start lg:gap-14">
        <SectionRail sections={navSections} activeId={activeId} mode={plan.mode} onBeforeJump={expandSection} />
        <div className="page-wrap py-14 sm:py-20 lg:mx-0 lg:min-w-0 lg:shrink-0">
          <header className="rise-in mb-16">
            <p className="kicker kicker-rule mb-5">Your gathering plan · {plan.stateName}</p>
            <h1 className="display text-[2.1rem] leading-[1.15] text-foreground sm:text-[2.6rem]">{plan.headline}</h1>
            <p className="mt-4 max-w-lg leading-relaxed text-pretty text-muted-foreground">{plan.sub}</p>
          </header>

          <ReturnStrip returnGapMs={returnGapMs} progress={progress} movedLine={null} nextThingLine={nextThingLine} />
          <RightNowInventoryPrompt plan={plan} />

          {plan.religionNote ? <ReligionNote religionNote={plan.religionNote} /> : null}

          {plan.mode === "for-self" ? (
            <>
              {inventory}
              {questions}
              <ChoosingSection
                id="choosing"
                expanded={Boolean(progress.sectionExpanded.choosing)}
                onExpand={() => expandSection("choosing")}
              />
              <HandoffSection id="handoff" />
            </>
          ) : (
            <>
              {questions}
              {inventory}
              <ChoosingSection
                id="choosing"
                expanded={Boolean(progress.sectionExpanded.choosing)}
                onExpand={() => expandSection("choosing")}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}
