/** The product's own philosophy, lifted onto the marketing page. */
export function ItCanWaitSection() {
  return (
    <section className="mb-20 rounded-2xl border border-dashed border-border bg-secondary/40 px-6 py-10 text-center sm:px-12">
      <p className="kicker mb-4">It can wait</p>
      <h2 className="font-serif text-2xl leading-snug text-foreground sm:text-3xl">
        The house can wait. The accounts can wait. Almost everything can wait.
      </h2>
      <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Urgency is what leads to the decisions people regret later — signing whatever's put in front
        of them, selling too fast, agreeing to something just to make it stop. Grief already makes it
        hard to think clearly; a deadline that isn't real just makes it worse.
      </p>
    </section>
  )
}
