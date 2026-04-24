import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ScanLine, Layers, Upload, Brain, Play, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/AppLayout";
import { Mode } from "@/lib/mockData";
import { toast } from "sonner";

const modes: { id: Mode; title: string; desc: string; icon: typeof FileText }[] = [
  { id: "text", title: "Text Only", desc: "Discharge summaries & clinical notes", icon: FileText },
  { id: "image", title: "Image Only", desc: "Brain CT scan analysis", icon: ScanLine },
  { id: "multimodal", title: "Multimodal", desc: "Combined text + image fusion", icon: Layers },
];

const sampleNote = `65-year-old male presenting with sudden onset right-sided numbness, slurred speech and visual disturbance. PMH: HTN, DM2. GCS 12 on arrival. BP 168/98. Initiated on Alteplase per stroke protocol. Aspirin 325mg administered. CT head ordered.`;

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("multimodal");
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [multimodal, setMultimodal] = useState(true);
  const [running, setRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const run = () => {
    const hasText = text.trim().length > 0;
    const hasImage = !!fileName;
    if (mode === "text" && !hasText) return toast.error("Please paste clinical text first.");
    if (mode === "image" && !hasImage) return toast.error("Please upload a CT scan first.");
    if (mode === "multimodal" && !(hasText && hasImage)) return toast.error("Multimodal requires both text and image.");

    setRunning(true);
    setTimeout(() => navigate("/results", { state: { mode } }), 1600);
  };

  if (running) {
    return (
      <AppLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-secondary/20 blur-2xl animate-pulse-brain" />
            <Brain className="h-20 w-20 text-secondary animate-pulse-brain relative" />
          </div>
          <div className="mt-6 text-lg font-semibold">Analyzing clinical data…</div>
          <div className="text-sm text-muted-foreground mt-1">Running multimodal fusion model</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">New Assessment</h1>
          <p className="text-sm text-muted-foreground mt-1">Choose an input mode and provide patient data.</p>
        </div>

        {/* Mode selector */}
        <div className="grid sm:grid-cols-3 gap-3">
          {modes.map((m) => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id);
                  setMultimodal(m.id === "multimodal");
                }}
                className={`text-left rounded-xl border p-4 transition-all ${
                  active
                    ? "border-secondary bg-secondary/5 shadow-card"
                    : "border-border bg-card hover:border-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${active ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
                    <m.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{m.title}</div>
                    <div className="text-xs text-muted-foreground">{m.desc}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full sm:w-auto grid-cols-2">
            <TabsTrigger value="text"><FileText className="h-4 w-4 mr-2" /> Clinical Text</TabsTrigger>
            <TabsTrigger value="image"><ScanLine className="h-4 w-4 mr-2" /> CT Scan</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="mt-4">
            <Card className="p-6 shadow-card">
              <Label className="text-sm font-semibold">Paste Discharge Summary / Clinical Notes</Label>
              <p className="text-xs text-muted-foreground mt-1">Supports: Discharge Summaries, Lab Reports, Clinical Notes</p>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste clinical text here…"
                className="mt-3 min-h-[220px] font-mono text-sm"
              />
              <div className="mt-3 flex flex-wrap gap-2 justify-between items-center">
                <Button variant="ghost" size="sm" onClick={() => setText(sampleNote)}>Load sample note</Button>
                <Button variant="secondary" onClick={() => toast.success("Text staged for analysis")} disabled={!text.trim()}>
                  Analyze Text
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="image" className="mt-4">
            <Card className="p-6 shadow-card">
              <Label className="text-sm font-semibold">Upload Brain CT Scan</Label>
              <p className="text-xs text-muted-foreground mt-1">Accepts: .jpg, .png, .dcm</p>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className="mt-3 cursor-pointer rounded-xl border-2 border-dashed border-border hover:border-secondary/60 hover:bg-secondary/5 transition-colors p-8 text-center"
              >
                {imagePreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <img src={imagePreview} alt="CT preview" className="max-h-56 rounded-lg shadow-card" />
                    <div className="text-xs text-muted-foreground font-mono">{fileName}</div>
                  </div>
                ) : fileName ? (
                  <div className="text-sm font-mono">{fileName}</div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm font-medium">Drag & drop CT image, or click to browse</div>
                    <div className="text-xs text-muted-foreground">JPG, PNG, DICOM</div>
                  </div>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*,.dcm"
                  className="hidden"
                  onChange={onPick}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-2 justify-between items-center">
                {fileName && (
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setFileName(null); setImagePreview(null); }}>
                    <X className="h-4 w-4 mr-1" /> Clear
                  </Button>
                )}
                <Button variant="secondary" className="ml-auto" onClick={() => toast.success("Scan staged for analysis")} disabled={!fileName}>
                  Analyze Scan
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Layers className="h-5 w-5 text-secondary" />
            <div>
              <div className="text-sm font-semibold">Use Both (Multimodal Analysis)</div>
              <div className="text-xs text-muted-foreground">Combine NLP and CT findings for fused risk score.</div>
            </div>
          </div>
          <Switch
            checked={multimodal}
            onCheckedChange={(v) => {
              setMultimodal(v);
              setMode(v ? "multimodal" : "text");
            }}
          />
        </Card>

        <div className="flex justify-end">
          <Button size="lg" onClick={run} className="bg-gradient-primary text-primary-foreground shadow-elevated hover:opacity-95">
            <Play className="h-4 w-4 mr-2" /> Run Risk Stratification
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default AssessmentPage;
