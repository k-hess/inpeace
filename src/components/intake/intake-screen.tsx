import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"

interface IntakeScreenProps {
  kicker?: string
  position?: string
  title: string
  description?: string
  onBack?: () => void
  children: ReactNode
}

export function IntakeScreen({ kicker, position, title, description, onBack, children }: IntakeScreenProps) {
  return (
    <div className="page-wrap flex min-h-[86vh] max-w-[640px] flex-col justify-center py-16">
      <div className="mb-8 h-8">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full text-sm text-muted-foreground transition outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : null}
      </div>
      <div key={title} className="rise-in">
        {position ? (
          <p className="mb-3 text-[11px] font-medium tracking-[0.18em] text-muted-foreground/80">{position}</p>
        ) : null}
        {kicker ? <p className="kicker mb-3">{kicker}</p> : null}
        <h1 className="display text-[2rem] leading-[1.15] text-foreground sm:text-[2.6rem]">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">{description}</p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </div>
  )
}
