import type { ReactNode } from "react"
import { Check } from "lucide-react"
import { cn } from "#/lib/utils"

interface OptionButtonProps {
  label: string
  caption?: string
  selected?: boolean
  onClick: () => void
  icon?: ReactNode
}

export function OptionButton({ label, caption, selected, onClick, icon }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-full rounded-2xl border px-5 py-4 text-left transition outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected
          ? "border-primary/60 bg-accent/45"
          : "border-border/70 bg-card shadow-[var(--shadow-card)] hover:border-primary/40 hover:bg-accent/25",
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="flex-1 text-base font-medium text-foreground">{label}</span>
        {selected ? <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden /> : null}
      </div>
      {caption ? <p className="mt-1.5 text-sm text-muted-foreground">{caption}</p> : null}
    </button>
  )
}
