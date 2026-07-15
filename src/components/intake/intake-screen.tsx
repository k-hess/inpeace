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
    <div className="page-wrap flex min-h-[86vh] flex-col justify-center py-16">
      <div className="mb-8 h-8">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : null}
      </div>
      <div key={title} className="rise-in">
        {position ? <p className="mb-2 text-xs text-muted-foreground">{position}</p> : null}
        {kicker ? <p className="kicker mb-3">{kicker}</p> : null}
        <h1 className="font-serif text-3xl leading-snug text-foreground sm:text-4xl">{title}</h1>
        {description ? <p className="mt-4 max-w-md text-base text-muted-foreground">{description}</p> : null}
        <div className="mt-10">{children}</div>
      </div>
    </div>
  )
}
