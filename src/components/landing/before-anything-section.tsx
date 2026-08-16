import { Link } from "@tanstack/react-router"
import { Button } from "#/components/ui/button"

/**
 * The landing page is deliberately built for the crisis reader — this is
 * the one modest acknowledgment that the other two doors exist. Plain
 * section, not a full-bleed band, so it stays quieter than "It can wait."
 */
export function BeforeAnythingSection() {
  return (
    <section className="mb-24 text-center">
      <p className="kicker mb-5">Before anything happens</p>
      <h2 className="display text-2xl leading-snug text-foreground sm:text-[2.1rem]">
        This works before a loss, too.
      </h2>
      <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-pretty text-muted-foreground">
        Getting your own affairs in order, or helping someone you love get theirs together, takes the same
        few minutes either way: where things are, who to call, how family would get in.
      </p>
      <div className="mt-8">
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link to="/start">Begin</Link>
        </Button>
      </div>
    </section>
  )
}
