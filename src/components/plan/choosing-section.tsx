import { Check, Minus } from "lucide-react"
import { choosingGuides } from "#/data/choosing"

export function ChoosingSection() {
  if (choosingGuides.length === 0) return null

  return (
    <section className="mb-16">
      <p className="kicker kicker-rule mb-4">Choosing who to trust</p>
      <h2 className="display text-2xl leading-snug text-foreground sm:text-3xl">
        Ask about how they're paid before anything else.
      </h2>
      <p className="mt-5 mb-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
        In every one of these relationships, you can predict the advice from the incentive behind it. One
        question up front tells you most of what you need to know.
      </p>
      <div className="flex flex-col gap-4">
        {choosingGuides.map((guide) => (
          <div key={guide.id} className="card-surface rounded-2xl px-6 py-6">
            <p className="text-sm font-medium text-muted-foreground">{guide.role}</p>
            <p className="mt-2 font-serif text-lg leading-snug text-foreground">"{guide.theQuestion}"</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground">Look for</p>
                <ul className="mt-2 flex flex-col gap-2">
                  {guide.lookFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/70" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground">Watch for</p>
                <ul className="mt-2 flex flex-col gap-2">
                  {guide.watchFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                      <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/70" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {guide.note ? (
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{guide.note}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
