import { Link } from "@tanstack/react-router"
import { track } from "#/lib/analytics"

/**
 * The ripple: after someone dies, the people around them tend to start
 * getting their own affairs in order — three separate accounts told us this
 * independently. This is an invitation, not a pitch, so it stays in the
 * quietest treatment on the page and never uses urgency language.
 */
export function RippleSection() {
  return (
    <section className="quiet-card mb-16 rounded-2xl px-6 py-6">
      <p className="text-sm leading-relaxed">
        You're in the middle of something hard right now, and none of this is for today. But people who've
        been through this often say the same thing happens afterward — it gets them thinking about their
        own family's affairs, or their parents'. Whenever that day comes, this is here.
      </p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link
          to="/start"
          className="font-medium underline decoration-dashed underline-offset-4 hover:text-foreground"
          onClick={() => track("ripple_link_clicked", { target: "for-family" })}
        >
          Get a parent or family member organized
        </Link>
        <Link
          to="/start"
          className="font-medium underline decoration-dashed underline-offset-4 hover:text-foreground"
          onClick={() => track("ripple_link_clicked", { target: "for-self" })}
        >
          Do it for yourself
        </Link>
      </div>
    </section>
  )
}
