import { DeathCertTracker } from "#/components/plan/death-cert-tracker"
import { FamilyView } from "#/components/plan/family-view"
import type { PlanData } from "#/lib/plan-engine"

export function PaperworkSection({ paperwork }: { paperwork: PlanData["paperwork"] }) {
  return (
    <section>
      <p className="kicker mb-4">Paperwork</p>
      <div className="flex flex-col gap-4">
        <DeathCertTracker recommendedCopies={paperwork.recommendedCopies} />
        {paperwork.showFamilyView ? <FamilyView tasks={paperwork.familyTasks} /> : null}
      </div>
    </section>
  )
}
