import { Checkbox } from "#/components/ui/checkbox"
import { cn } from "#/lib/utils"
import type { GatheringPlanData } from "#/lib/plan-engine"
import { useIntake } from "#/store/intake-context"

export function InventorySection({ groups, id }: { groups: GatheringPlanData["groups"]; id: string }) {
  const { progress, updateProgress } = useIntake()
  const checked = progress.inventoryChecked

  if (groups.length === 0) return null

  function toggle(itemId: string) {
    updateProgress((prev) => ({ ...prev, inventoryChecked: { ...prev.inventoryChecked, [itemId]: !prev.inventoryChecked[itemId] } }))
  }

  return (
    <section id={id} className="section-anchor mb-16">
      <p className="kicker kicker-rule mb-4">The inventory</p>
      <h2 className="display text-2xl leading-snug text-foreground sm:text-3xl">Where to look for each thing.</h2>
      <p className="mt-5 mb-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
        Work through these at whatever pace makes sense. Checking a box saves it on this device only,
        never sent anywhere.
      </p>
      <div className="flex flex-col gap-4">
        {groups.map((group) => {
          const total = group.items.length
          const done = group.items.filter((item) => checked[item.id]).length

          return (
            <div key={group.id} className="card-surface rounded-2xl px-6 py-6">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-medium text-foreground">{group.label}</p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {done} of {total}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{group.blurb}</p>

              <ul className="mt-5 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/70 bg-secondary/30 px-4 py-3 transition hover:border-primary/40">
                      <Checkbox
                        checked={Boolean(checked[item.id])}
                        onCheckedChange={() => toggle(item.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "text-sm text-foreground",
                              checked[item.id] && "text-muted-foreground line-through",
                            )}
                          >
                            {item.label}
                          </span>
                          {item.easilyMissed ? (
                            <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] text-muted-foreground/80">
                              easy to miss
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.whereToLook}</p>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
