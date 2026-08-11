import { Link } from "@tanstack/react-router"
import { Button } from "#/components/ui/button"

export function HeroSection() {
  return (
    <section className="rise-in mb-24 pt-10 pb-4 text-center sm:pt-16">
      <p className="kicker mb-6">When someone you love dies</p>
      <h1 className="display text-[2.6rem] leading-[1.12] text-foreground sm:text-6xl sm:leading-[1.08]">
        Nobody hands you a map. <em className="text-primary italic">This is one.</em>
      </h1>
      <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-pretty text-muted-foreground">
        In Peace turns the months after a loss into a calm, personal plan: what matters this week,
        what can wait, and who can help.
      </p>
      <div className="mt-10 flex flex-col items-center gap-3">
        <Button asChild size="lg" className="rounded-full px-8 shadow-sm">
          <Link to="/start">Take a few minutes</Link>
        </Button>
        <p className="text-xs text-muted-foreground">Free to start. No account needed.</p>
        <p className="text-xs text-muted-foreground">
          Private by default. Nothing you share is ever sold or used to target you.
        </p>
      </div>
    </section>
  )
}
