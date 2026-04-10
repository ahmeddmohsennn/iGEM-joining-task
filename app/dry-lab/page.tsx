import { PageLayout } from "@/components/page-layout"
import { DryLabSection } from "@/components/dry-lab-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Dry Lab | BioSynth iGEM 2026",
  description: "Computational modeling and analysis - iGEM 2026",
}

export default function DryLabPage() {
  return (
    <PageLayout>
      <DryLabSection />
      <Footer />
    </PageLayout>
  )
}
