import { HeroSection } from "#/components/landing/hero-section"
import { PillarsSection } from "#/components/landing/pillars-section"
import { ItCanWaitSection } from "#/components/landing/it-can-wait-section"
import { HowItWorksSection } from "#/components/landing/how-it-works-section"
import { ClosingSection } from "#/components/landing/closing-section"

export function LandingScreen() {
  return (
    <div className="page-wrap py-14 sm:py-20">
      <HeroSection />
      <PillarsSection />
      <ItCanWaitSection />
      <HowItWorksSection />
      <ClosingSection />
    </div>
  )
}
