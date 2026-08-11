import { useEffect } from "react"
import { track } from "#/lib/analytics"

/**
 * Prototype surface only — for user interviews, not a real permissions
 * model. There's no auth, no real sharing, and no backend behind this.
 * It exists to test the idea with someone: "this only works if it reaches
 * the right person when it's needed" — not to actually grant access to
 * anything.
 */

interface HandoffPerson {
  name: string
  relation: string
  note: string
}

const PLACEHOLDER_PEOPLE: HandoffPerson[] = [
  {
    name: "Sam",
    relation: "Spouse, who can open this",
    note: "Would see everything: the full inventory, the access notes, and anything you've added since.",
  },
  {
    name: "Renee",
    relation: "Sister, backup",
    note: "Would only be notified if Sam can't be reached, and would see the same list.",
  },
]

export function HandoffSection({ id }: { id: string }) {
  useEffect(() => {
    track("handoff_section_viewed", {})
  }, [])

  return (
    <section id={id} className="section-anchor mb-16">
      <p className="kicker kicker-rule mb-4">Who can open this</p>
      <h2 className="display text-2xl leading-snug text-foreground sm:text-3xl">
        This only helps if it reaches someone.
      </h2>
      <p className="mt-5 mb-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
        A list like this is only useful if it gets to the right person when the time comes, not sooner
        and not never. Here's who that would be for this plan.
      </p>
      <div className="flex flex-col gap-3">
        {PLACEHOLDER_PEOPLE.map((person) => (
          <div key={person.name} className="card-surface rounded-2xl px-6 py-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-medium text-foreground">{person.name}</p>
              <span className="shrink-0 text-xs text-muted-foreground">{person.relation}</span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{person.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
