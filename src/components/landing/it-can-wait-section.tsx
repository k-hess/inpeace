/**
 * The product's own philosophy, lifted onto the marketing page. Rendered as
 * a full-bleed band — a stretch of deeper ground between the lighter
 * sections — rather than another card.
 */
export function ItCanWaitSection() {
  return (
    <section className="mb-24 border-y border-border/60 bg-secondary/60 py-14 text-center sm:py-16">
      <div className="page-wrap">
        <p className="kicker mb-5">It can wait</p>
        <h2 className="display text-2xl leading-snug text-foreground sm:text-[2.1rem]">
          The house can wait. The accounts can wait. Almost everything can wait.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-pretty text-muted-foreground">
          Urgency is what leads to the decisions people regret later — signing whatever's put in front
          of them, selling too fast, agreeing to something just to make it stop. Grief already makes it
          hard to think clearly; a deadline that isn't real just makes it worse.
        </p>
      </div>
    </section>
  )
}
