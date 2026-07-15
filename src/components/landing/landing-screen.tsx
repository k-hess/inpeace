import { HeroSection } from "#/components/landing/hero-section"
import { PillarsSection } from "#/components/landing/pillars-section"
import { ItCanWaitSection } from "#/components/landing/it-can-wait-section"
import { HowItWorksSection } from "#/components/landing/how-it-works-section"
import { ClosingSection } from "#/components/landing/closing-section"

export function LandingScreen() {
  return (
    <div className="py-10 sm:py-14">
      <div className="page-wrap">
        <HeroSection />
        <PillarsSection />
      </div>
      <ItCanWaitSection />
      <div className="page-wrap">
        <HowItWorksSection />
        <ClosingSection />
      </div>
    </div>
  )
}
