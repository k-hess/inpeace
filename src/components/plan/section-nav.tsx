import { useEffect, useState } from "react"
import { track } from "#/lib/analytics"
import { cn } from "#/lib/utils"
import type { JourneyMode } from "#/types/intake"

/**
 * "On this page" navigation for the plan screens. One list of sections
 * drives two presentations — a sticky left rail at lg and up, a sticky
 * horizontal chip bar below it — sharing the same scroll-spy and click
 * behavior. See plan-screen.tsx / gathering-screen.tsx for how the section
 * list itself is derived from what's actually rendered for the current
 * mode/answers; this file only knows how to display whatever list it's
 * handed.
 */
export interface PlanNavSection {
  id: string
  label: string
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Pure scroll, no analytics — exported so other quiet "jump to a section"
 * affordances (the Right Now card's action button) can reuse the same
 * reduced-motion-aware behavior without also firing plan_section_jump,
 * which is specific to the on-page nav.
 */
export function scrollToSectionId(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" })
}

function jumpToSection(id: string, mode: JourneyMode) {
  scrollToSectionId(id)
  track("plan_section_jump", { section: id, mode })
}

/**
 * Single IntersectionObserver watching every section heading. The active
 * section is whichever one is currently topmost among those inside a slim
 * band near the top of the viewport, so the highlight advances in document
 * order as you scroll. Re-subscribes whenever the id list changes (mode
 * switch, pricing toggle reveals/hides a section).
 */
export function useActiveSection(ids: string[]): string | null {
  const idsKey = ids.join("|")
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    const list = idsKey ? idsKey.split("|") : []
    if (list.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const next = list.find((id) => visible.has(id))
        if (next) setActiveId(next)
      },
      // A band hugging the top of the viewport: a section counts as
      // "current" once its heading crosses into the top ~20%.
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
    )

    for (const id of list) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [idsKey])

  return activeId
}

interface NavListProps {
  sections: PlanNavSection[]
  activeId: string | null
  mode: JourneyMode
  /**
   * Called with a section's id before it's scrolled to. Plan screens use
   * this to auto-expand a collapsed reference section (see
   * reference-section.tsx) when someone jumps to it directly from the nav
   * — a no-op for sections that are already open or aren't collapsible.
   */
  onBeforeJump?: (id: string) => void
}

/**
 * Desktop rail: quiet, typographic, a hairline per link that lights up
 * sage on the active section — the same restrained marker language as the
 * timeline's phase rail (timeline-section.tsx), a vertical hairline rather
 * than its dot, since this is a list of destinations rather than a path.
 */
export function SectionRail({ sections, activeId, mode, onBeforeJump }: NavListProps) {
  if (sections.length === 0) return null

  return (
    <nav aria-label="On this page" className="hidden lg:sticky lg:top-16 lg:block lg:w-40 lg:shrink-0">
      <p className="kicker mb-4">On this page</p>
      <ul className="flex flex-col gap-2.5">
        {sections.map((section) => {
          const active = section.id === activeId
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  if (onBeforeJump) {
                    onBeforeJump(section.id)
                    // Let a just-expanded reference section settle into the
                    // DOM before measuring where to scroll to.
                    requestAnimationFrame(() => jumpToSection(section.id, mode))
                  } else {
                    jumpToSection(section.id, mode)
                  }
                }}
                className={cn(
                  "block border-l-2 py-0.5 pl-4 text-sm leading-snug transition",
                  active
                    ? "border-[var(--sage-400)] font-medium text-foreground"
                    : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {section.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/**
 * Narrow-screen chip bar: sticky directly under the site header (the
 * header itself isn't sticky, so this is the only thing pinned), a single
 * horizontally scrollable row of quiet chips with the same active-state
 * treatment as the rail — a color/weight shift, never a filled pill. Sits
 * outside the plan content's own top padding as a sibling so it's visible
 * right at the top of the page, not only after scrolling past a hero.
 * Its inner row reuses the `page-wrap` measure so chips line up with the
 * content column beneath it; the outer div supplies the full-bleed bar.
 */
export function SectionChipBar({ sections, activeId, mode, onBeforeJump }: NavListProps) {
  if (sections.length === 0) return null

  return (
    <div className="sticky top-0 z-10 border-b border-border/70 bg-background/95 backdrop-blur lg:hidden">
      <nav aria-label="On this page" className="page-wrap chip-scroll flex gap-5 overflow-x-auto py-3">
        {sections.map((section) => {
          const active = section.id === activeId
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active ? "true" : undefined}
              onClick={(event) => {
                event.preventDefault()
                if (onBeforeJump) {
                  onBeforeJump(section.id)
                  requestAnimationFrame(() => jumpToSection(section.id, mode))
                } else {
                  jumpToSection(section.id, mode)
                }
              }}
              className={cn(
                "shrink-0 whitespace-nowrap border-b-2 pb-1 text-sm transition",
                active
                  ? "border-[var(--sage-400)] font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {section.label}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
