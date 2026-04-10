"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, BarChart3, Code, Database, GitBranch, Braces } from "lucide-react"

const models = [
  {
    name: "ODE Circuit Dynamics Model",
    description: "System of ordinary differential equations modelling AND-gate promoter kinetics, reporter protein accumulation, and HMF co-induction effects over time.",
    tools: ["Python", "NumPy", "SciPy"],
    status: "Validated",
  },
  {
    name: "HMF Diffusion–Reaction Model",
    description: "Finite-element model of HMF and SCFA mass transport through the chitosan hydrogel, accounting for porosity and crosslink density to predict sensor lag time.",
    tools: ["Python", "FEniCS"],
    status: "Complete",
  },
  {
    name: "Machine Learning Classifier",
    description: "Random forest classifier trained on colorimetric image data to semi-quantitatively predict bacterial load from bandage colour intensity readings.",
    tools: ["Scikit-learn", "OpenCV"],
    status: "Training",
  },
  {
    name: "Structural Docking (HMF–Promoter)",
    description: "Molecular docking simulations to characterise HMF binding affinity to the LysR-type transcriptional regulator controlling the HMF-responsive promoter.",
    tools: ["PyMOL", "AutoDock Vina"],
    status: "In Progress",
  },
]

const software = [
  {
    name: "SSI Sensor Analyser",
    description: "Python package for processing plate-reader absorbance data, normalising to OD, and generating dose-response curves for AND-gate circuit characterisation.",
    repo: "github.com/biosynth/ssi-analyser",
    icon: Code,
  },
  {
    name: "Circuit Designer (AND-Gate)",
    description: "Web-based tool for visually assembling AND-gate circuit topologies from a parts library and simulating their dynamic behaviour under wound-like conditions.",
    repo: "github.com/biosynth/circuit-designer",
    icon: GitBranch,
  },
  {
    name: "Hydrogel Data Pipeline",
    description: "Automated pipeline ingesting FRAP, rheology, and viability assay outputs to compute diffusion coefficients and viability metrics for chitosan formulation optimisation.",
    repo: "github.com/biosynth/hydrogel-pipeline",
    icon: Database,
  },
]

const visualizations = [
  {
    title: "AND-Gate Induction Dynamics",
    description: "Time-course ODE simulation of reporter accumulation under dual SCFA + anaerobic induction",
    type: "Line Chart",
  },
  {
    title: "HMF Dose–Response Surface",
    description: "3D surface plot of reporter output as a function of [HMF] × [SCFA] concentration",
    type: "Surface Plot",
  },
  {
    title: "Diffusion Coefficient Map",
    description: "FEniCS heatmap of SCFA and HMF concentration gradients across the chitosan hydrogel layer",
    type: "Heatmap",
  },
  {
    title: "Circuit Topology Network",
    description: "Network graph of AND-gate promoter interactions, chassis kill-switch modules, and reporter output",
    type: "Network Graph",
  },
]

export function DryLabSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Dry Lab
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Computational{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Modeling
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Mathematical modelling, machine learning, and custom software tools guide
            our experimental design and help us predict how the <em>C. acnes</em> biosensor
            circuit will behave inside a chitosan wound dressing.
          </p>
        </div>

        <Tabs defaultValue="models" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="software">Software</TabsTrigger>
            <TabsTrigger value="visualizations">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="models">
            <div className="grid md:grid-cols-2 gap-6">
              {models.map((model, index) => (
                <Card
                  key={model.name}
                  className={`bg-card/50 border-border hover:border-primary/50 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Cpu className="h-5 w-5 text-accent" />
                        </div>
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                      </div>
                      <Badge
                        className={
                          model.status === "Validated"
                            ? "bg-green-500/20 text-green-400"
                            : model.status === "Complete"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }
                      >
                        {model.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {model.tools.map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="software">
            <div className="space-y-4">
              {software.map((sw, index) => {
                const Icon = sw.icon
                return (
                  <Card
                    key={sw.name}
                    className={`bg-card/50 border-border hover:border-primary/50 transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{sw.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{sw.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Braces className="h-3 w-3" />
                            <span>{sw.repo}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="visualizations">
            <div className="grid md:grid-cols-2 gap-6">
              {visualizations.map((viz, index) => (
                <Card
                  key={viz.title}
                  className={`bg-card/50 border-border overflow-hidden transition-all duration-500 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="h-40 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-primary/30" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{viz.title}</h3>
                      <Badge variant="secondary" className="text-xs">{viz.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{viz.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
