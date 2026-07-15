import type { ReactNode } from "react"
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
      className={cn(
        "w-full rounded-2xl border px-5 py-4 text-left transition",
        "hover:border-primary/50 hover:bg-accent/40",
        selected ? "border-primary bg-accent/60" : "border-border bg-card",
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-base font-medium text-foreground">{label}</span>
      </div>
      {caption ? <p className="mt-1.5 text-sm text-muted-foreground">{caption}</p> : null}
    </button>
  )
}
