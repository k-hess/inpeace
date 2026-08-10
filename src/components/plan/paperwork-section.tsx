import { DeathCertTracker } from "#/components/plan/death-cert-tracker"
import { FamilyView } from "#/components/plan/family-view"
import { NotificationTracker } from "#/components/plan/notification-tracker"
import { certExplainer, certUses, type CertUse } from "#/data/certificates"
import type { PlanData } from "#/lib/plan-engine"

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
        <CertExplainer />
        <CertUses />
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
