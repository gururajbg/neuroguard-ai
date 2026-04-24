import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Activity, AlertTriangle, Brain, FileText, ScanLine, Stethoscope,
  Clock, ArrowLeft, Layers,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { RiskGauge } from "@/components/RiskGauge";
import { mockResult, riskBg, riskColor } from "@/lib/mockData";

const urgencyStyles: Record<string, string> = {
  Immediate: "bg-destructive text-destructive-foreground",
  "Within 6 hours": "bg-accent text-accent-foreground",
  "Within 24hrs": "bg-warning text-warning-foreground",
  Routine: "bg-success text-success-foreground",
};

const Results = () => {
  const { state } = useLocation() as { state?: { mode?: string } };
  const navigate = useNavigate();
  const r = mockResult;

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/assessment")} className="mb-2 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> New Assessment
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analysis Results</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Mode: <span className="font-medium capitalize">{state?.mode ?? "multimodal"}</span> · Patient ID: <span className="font-mono">P-1043</span>
            </p>
          </div>
        </div>

        {/* Risk banner */}
        <Card className="p-6 md:p-8 shadow-elevated overflow-hidden relative animate-fade-in-up">
          <div className={`absolute inset-x-0 top-0 h-1 ${riskBg(r.riskLevel)}`} />
          <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
            <RiskGauge score={r.riskScore} level={r.riskLevel} />
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className={`h-4 w-4 ${riskColor(r.riskLevel)}`} />
                Patient Risk Stratification
              </div>
              <div className={`mt-1 text-3xl md:text-4xl font-bold ${riskColor(r.riskLevel)}`}>
                {r.riskLevel} RISK
              </div>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                {r.fusion.explanation}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary"><Activity className="h-3 w-3 mr-1" /> Score {r.riskScore}/100</Badge>
                <Badge variant="outline"><Layers className="h-3 w-3 mr-1" /> Multimodal</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Result cards */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* NLP */}
          <Card className="p-6 shadow-card animate-fade-in-up" style={{ animationDelay: "60ms" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <FileText className="h-4 w-4" />
              </div>
              <div className="font-semibold">NLP Extraction Summary</div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Diagnosis</div>
                <div className="font-mono font-medium">{r.nlp.diagnosis}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Symptoms</div>
                <div className="flex flex-wrap gap-1.5">
                  {r.nlp.symptoms.map((s) => (
                    <Badge key={s} variant="secondary" className="font-mono font-normal">{s}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Medications</div>
                <div className="flex flex-wrap gap-1.5">
                  {r.nlp.medications.map((m) => (
                    <Badge key={m} className="bg-secondary/15 text-secondary hover:bg-secondary/20 font-mono font-normal">{m}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Lab Values</div>
                <div className="space-y-1.5">
                  {r.nlp.labValues.map((l) => (
                    <div key={l.label} className="flex justify-between border-b border-dashed border-border pb-1">
                      <span className="text-muted-foreground">{l.label}</span>
                      <span className="font-mono font-medium">{l.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* CT */}
          <Card className="p-6 shadow-card animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <ScanLine className="h-4 w-4" />
              </div>
              <div className="font-semibold">CT Scan Findings</div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Abnormality Detected</div>
                <div className="font-mono font-semibold text-accent">{r.ct.abnormality}</div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="uppercase tracking-wider text-muted-foreground">Confidence</span>
                  <span className="font-mono font-medium">{r.ct.confidence}%</span>
                </div>
                <Progress value={r.ct.confidence} className="h-2" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Highlighted Region</div>
                <div className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
                  Hyperdense focus localized in the <span className="text-accent font-semibold">{r.ct.region}</span>,
                  consistent with acute hemorrhagic findings. No midline shift observed.
                </div>
              </div>
            </div>
          </Card>

          {/* Fusion */}
          <Card className="p-6 shadow-card bg-gradient-primary text-primary-foreground animate-fade-in-up" style={{ animationDelay: "180ms" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <Brain className="h-4 w-4" />
              </div>
              <div className="font-semibold">Multimodal Fusion</div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Combined Risk Score</div>
                <div className="text-5xl font-bold font-mono">{r.fusion.score}<span className="text-lg text-white/60">/100</span></div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/60 mb-2">Driving Factors</div>
                <p className="text-sm text-white/85 leading-relaxed">{r.fusion.explanation}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="rounded-lg bg-white/10 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-white/60">NLP Weight</div>
                  <div className="font-mono text-lg font-semibold">0.46</div>
                </div>
                <div className="rounded-lg bg-white/10 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-white/60">CT Weight</div>
                  <div className="font-mono text-lg font-semibold">0.54</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Specialists */}
        <Card className="p-6 shadow-card animate-fade-in-up" style={{ animationDelay: "240ms" }}>
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="h-5 w-5 text-secondary" />
            <div className="font-semibold">Recommended Specialists</div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {r.specialists.map((s) => (
              <div key={s.type} className="rounded-xl border border-border p-5 hover:shadow-card transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold">{s.type}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Recommended consult
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${urgencyStyles[s.urgency]}`}>
                    {s.urgency}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{s.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Results;
