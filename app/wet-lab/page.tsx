import { PageLayout } from "@/components/page-layout"
import { WetLabSection } from "@/components/wet-lab-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Wet Lab | BioSynth iGEM 2026",
  description: "Explore our wet lab experiments and protocols - iGEM 2026",
}

export default function WetLabPage() {
  return (
    <PageLayout>
      <WetLabSection />
      <Footer />
    </PageLayout>
  )
}
