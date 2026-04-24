import { Link } from "react-router-dom";
import { Brain, FileText, ScanLine, Layers, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AppLayout from "@/components/AppLayout";

const features = [
  {
    icon: FileText,
    title: "Clinical Text Analysis",
    desc: "NLP-based entity extraction from discharge summaries, lab reports and clinical notes.",
  },
  {
    icon: ScanLine,
    title: "CT Scan Analysis",
    desc: "Deep learning detection of intracranial hemorrhage, stroke and TBI patterns.",
  },
  {
    icon: Layers,
    title: "Multimodal Fusion",
    desc: "Combined text + image risk scoring for robust neurological triage.",
  },
];

const Index = () => {
  return (
    <AppLayout>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" />
            Clinical Decision Support · Research Prototype
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            MedFusion
          </h1>
          <p className="mt-3 text-lg md:text-xl text-white/80 font-medium">
            AI-Powered Clinical Risk Stratification
          </p>
          <p className="mt-4 max-w-2xl text-white/70">
            Multimodal risk assessment for medical emergencies — combining clinical
            text understanding with medical imaging analysis to recommend the right specialist, fast.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/assessment">
                Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
              <Link to="/history">View History</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card key={f.title} className="p-6 shadow-card hover:shadow-elevated transition-shadow animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-10 p-8 bg-gradient-primary text-primary-foreground shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Brain className="h-10 w-10 text-secondary" />
            <div>
              <div className="text-lg font-semibold">Ready to triage a patient?</div>
              <div className="text-sm text-white/70">Run text, image or multimodal analysis in seconds.</div>
            </div>
          </div>
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Link to="/assessment">Start Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </Card>
      </section>
    </AppLayout>
  );
};

export default Index;
