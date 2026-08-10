import type { QuestionGroup } from "#/data/questions-to-ask"
import type { JourneyMode } from "#/types/intake"

export function QuestionsSection({
  questionGroups,
  conversationNote,
  mode,
  id,
}: {
  questionGroups: QuestionGroup[]
  conversationNote: { title: string; body: string }
  mode: Extract<JourneyMode, "for-family" | "for-self">
  id: string
}) {
  return (
    <section id={id} className="section-anchor mb-16">
      <p className="kicker kicker-rule mb-4">The conversation</p>
      <h2 className="display text-2xl leading-snug text-foreground sm:text-3xl">
        {mode === "for-self"
          ? "Answers worth having ready, whenever it feels right."
          : "Questions worth asking, whenever it feels right."}
      </h2>

      <div className="protect-card mt-6 mb-8 px-6 py-5">
        <p className="font-medium">{conversationNote.title}</p>
        <p className="mt-1.5 text-sm leading-relaxed opacity-90">{conversationNote.body}</p>
      </div>

      <div className="flex flex-col gap-4">
        {questionGroups.map((group) => (
          <div key={group.id} className="card-surface rounded-2xl px-6 py-6">
            <p className="font-medium text-foreground">{group.label}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{group.blurb}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {group.questions.map((question) => (
                <li
                  key={question}
                  className="rounded-xl border border-border/70 bg-secondary/30 px-4 py-3 text-sm text-foreground"
                >
                  {question}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
