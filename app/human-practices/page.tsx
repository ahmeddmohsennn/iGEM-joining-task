import { PageLayout } from "@/components/page-layout"
import { HumanPracticesSection } from "@/components/human-practices-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Human Practices | BioSynth iGEM 2026",
  description: "Our engagement with society and stakeholders - iGEM 2026",
}

export default function HumanPracticesPage() {
  return (
    <PageLayout>
      <HumanPracticesSection />
      <Footer />
    </PageLayout>
  )
}
