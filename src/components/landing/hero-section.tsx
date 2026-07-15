import { Link } from "@tanstack/react-router"
import { Button } from "#/components/ui/button"

export function HeroSection() {
  return (
    <section className="rise-in mb-20 pt-6 pb-4 text-center sm:pt-10">
      <p className="kicker mb-5">When someone you love dies</p>
      <h1 className="font-serif text-4xl leading-snug text-foreground sm:text-5xl">
        Nobody hands you a map. This is one.
      </h1>
      <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
        Harbor turns the months after a loss into a calm, personal plan — what matters this week,
        what can wait, and who can help.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link to="/start">Take a few minutes</Link>
        </Button>
        <p className="text-xs text-muted-foreground">Free to start. No account needed.</p>
      </div>
    </section>
  )
}
