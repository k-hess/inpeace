import { Link } from "@tanstack/react-router"
import { Button } from "#/components/ui/button"

export function ClosingSection() {
  return (
    <section className="pb-10 text-center">
      <h2 className="display text-[1.7rem] leading-snug text-foreground sm:text-3xl">
        Whenever you're ready.
      </h2>
      <div className="mt-7 flex flex-col items-center gap-3">
        <Button asChild size="lg" className="rounded-full px-8 shadow-sm">
          <Link to="/start">Take a few minutes</Link>
        </Button>
        <p className="text-xs text-muted-foreground">Free to start. No account needed.</p>
      </div>
    </section>
  )
}
