import { DeathCertTracker } from "#/components/plan/death-cert-tracker"
import { FamilyView } from "#/components/plan/family-view"
import { NotificationTracker } from "#/components/plan/notification-tracker"
import { CollapsibleSummary } from "#/components/plan/reference-section"
import { certExplainer, certUses, type CertUse } from "#/data/certificates"
import { useIntake } from "#/store/intake-context"
import { track } from "#/lib/analytics"
import type { PlanData } from "#/lib/plan-engine"

/** Persisted-expand key for the explainer block below — not a nav section, just a progress flag. */
const EXPLAINER_ID = "paperwork-explainer"

const NEEDS_LABEL: Record<CertUse["needs"], string> = {
  "with-cause": "With cause of death",
  "without-cause": "Without cause of death",
  either: "Either version",
}

function CertExplainer() {
  if (certExplainer.length === 0) return null

  return (
    <div className="card-surface rounded-2xl px-6 py-6">
      <div className="flex flex-col gap-4">
        {certExplainer.map((entry) => (
          <div key={entry.title}>
            <p className="text-sm font-medium text-foreground">{entry.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CertUses() {
  if (certUses.length === 0) return null

  return (
    <div className="card-surface rounded-2xl px-6 py-6">
      <p className="font-medium text-foreground">Who needs which version</p>
      <ul className="mt-4 flex flex-col divide-y divide-border/70">
        {certUses.map((use) => (
          <li key={use.id} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-sm font-medium text-foreground">{use.label}</span>
              <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                {NEEDS_LABEL[use.needs]}
              </span>
            </div>
            {use.note ? <p className="text-xs leading-relaxed text-muted-foreground">{use.note}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The tracker part of Paperwork (change 4) stays fully open — it's
 * something you act on. Only the reference material underneath it (what
 * the two cert versions are, who needs which one) collapses to a summary,
 * using the same CollapsibleSummary as the full reference sections, just
 * without its own section/nav entry.
 */
function ExplainerBlock() {
  const { progress, updateProgress } = useIntake()
  const expanded = Boolean(progress.sectionExpanded[EXPLAINER_ID])

  if (certExplainer.length === 0 && certUses.length === 0) return null

  if (!expanded) {
    return (
      <CollapsibleSummary
        heading="The two death certificate versions"
        essence="Some places want the version with cause of death listed, some don't — who needs which one, explained."
        onExpand={() => {
          updateProgress((prev) => ({
            ...prev,
            sectionExpanded: { ...prev.sectionExpanded, [EXPLAINER_ID]: true },
          }))
          track("section_expanded", { section: EXPLAINER_ID })
        }}
      />
    )
  }

  return (
    <>
      <CertExplainer />
      <CertUses />
    </>
  )
}

export function PaperworkSection({
  paperwork,
  firstName,
  id,
}: {
  paperwork: PlanData["paperwork"]
  firstName: string | null
  id: string
}) {
  return (
    <section id={id} className="section-anchor mb-16">
      <p className="kicker kicker-rule mb-4">Paperwork</p>
      <div className="flex flex-col gap-4">
        <DeathCertTracker key={paperwork.recommendedCopies} recommendedCopies={paperwork.recommendedCopies} />
        <ExplainerBlock />
        <NotificationTracker
          key={paperwork.notifications.map((n) => n.id).join(",")}
          notifications={paperwork.notifications}
          showFamilyView={paperwork.showFamilyView}
        />
        {paperwork.showFamilyView ? <FamilyView tasks={paperwork.familyTasks} firstName={firstName} /> : null}
      </div>
    </section>
  )
}
