import { PageLayout } from "@/components/page-layout"
import { SectionSidebar } from "@/components/section-sidebar"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ExperimentsSection } from "@/components/experiments-section"
import { ResultsSection } from "@/components/results-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <PageLayout>
      <SectionSidebar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <ExperimentsSection />
      <ResultsSection />
      <CTASection />
      <Footer />
    </PageLayout>
  )
}
