export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
export type Mode = "text" | "image" | "multimodal";

export interface AssessmentResult {
  riskLevel: RiskLevel;
  riskScore: number;
  nlp: {
    diagnosis: string;
    symptoms: string[];
    medications: string[];
    labValues: { label: string; value: string }[];
  };
  ct: {
    abnormality: string;
    confidence: number;
    region: string;
  };
  fusion: {
    score: number;
    explanation: string;
  };
  specialists: {
    type: string;
    urgency: "Immediate" | "Within 6 hours" | "Within 24hrs" | "Routine";
    reason: string;
  }[];
}

export const mockResult: AssessmentResult = {
  riskLevel: "HIGH",
  riskScore: 78,
  nlp: {
    diagnosis: "Ischemic Stroke",
    symptoms: ["Sudden numbness", "Speech difficulty", "Vision loss"],
    medications: ["Alteplase", "Aspirin"],
    labValues: [
      { label: "GCS Score", value: "12" },
      { label: "Blood Pressure", value: "168/98" },
      { label: "Glucose", value: "142 mg/dL" },
    ],
  },
  ct: {
    abnormality: "Intracranial Hemorrhage",
    confidence: 87,
    region: "Right temporal lobe",
  },
  fusion: {
    score: 78,
    explanation:
      "Risk driven by acute ischemic stroke indicators in clinical notes combined with hemorrhagic findings on CT in the right temporal lobe.",
  },
  specialists: [
    {
      type: "Neurologist",
      urgency: "Immediate",
      reason: "Acute stroke management and thrombolytic therapy evaluation.",
    },
    {
      type: "Neurosurgeon",
      urgency: "Within 6 hours",
      reason: "Possible surgical intervention for intracranial hemorrhage.",
    },
  ],
};

export const mockHistory = [
  {
    id: "P-1042",
    date: "2026-04-22",
    mode: "Multimodal" as const,
    risk: "HIGH" as RiskLevel,
    specialist: "Neurologist, Neurosurgeon",
  },
  {
    id: "P-1041",
    date: "2026-04-19",
    mode: "Text Only" as const,
    risk: "MODERATE" as RiskLevel,
    specialist: "Neurologist",
  },
  {
    id: "P-1040",
    date: "2026-04-15",
    mode: "Image Only" as const,
    risk: "LOW" as RiskLevel,
    specialist: "General Physician",
  },
];

export const riskColor = (r: RiskLevel) => {
  switch (r) {
    case "LOW": return "text-success";
    case "MODERATE": return "text-warning";
    case "HIGH": return "text-accent";
    case "CRITICAL": return "text-destructive";
  }
};

export const riskBg = (r: RiskLevel) => {
  switch (r) {
    case "LOW": return "bg-success";
    case "MODERATE": return "bg-warning";
    case "HIGH": return "bg-accent";
    case "CRITICAL": return "bg-destructive";
  }
};

export const riskStroke = (r: RiskLevel) => {
  switch (r) {
    case "LOW": return "hsl(var(--success))";
    case "MODERATE": return "hsl(var(--warning))";
    case "HIGH": return "hsl(var(--accent))";
    case "CRITICAL": return "hsl(var(--destructive))";
  }
};
