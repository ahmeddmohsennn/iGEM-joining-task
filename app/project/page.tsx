import { PageLayout } from "@/components/page-layout"
import { ProjectSection } from "@/components/project-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Project | BioSynth iGEM 2026",
  description: "Learn about our innovative synthetic biology project - iGEM 2026",
}

export default function ProjectPage() {
  return (
    <PageLayout>
      <ProjectSection />
      <Footer />
    </PageLayout>
  )
}
