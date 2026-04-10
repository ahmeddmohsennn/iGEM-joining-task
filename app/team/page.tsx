import { PageLayout } from "@/components/page-layout"
import { TeamSection } from "@/components/team-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Team Members | BioSynth iGEM 2026",
  description: "Meet the talented team behind BioSynth - iGEM 2026",
}

export default function TeamPage() {
  return (
    <PageLayout>
      <TeamSection />
      <Footer />
    </PageLayout>
  )
}
