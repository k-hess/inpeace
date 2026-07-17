import { DeathCertTracker } from "#/components/plan/death-cert-tracker"
import { FamilyView } from "#/components/plan/family-view"
import { NotificationTracker } from "#/components/plan/notification-tracker"
import type { PlanData } from "#/lib/plan-engine"

export function PaperworkSection({
  paperwork,
  firstName,
}: {
  paperwork: PlanData["paperwork"]
  firstName: string | null
}) {
  return (
    <section className="mb-16">
      <p className="kicker kicker-rule mb-4">Paperwork</p>
      <div className="flex flex-col gap-4">
        <DeathCertTracker key={paperwork.recommendedCopies} recommendedCopies={paperwork.recommendedCopies} />
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
