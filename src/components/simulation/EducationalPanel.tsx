import React from "react";
import type { SimStage } from "@/hooks/useSimulation";

interface EducationalPanelProps {
  stage: SimStage;
  visible: boolean;
  onToggle: (v: boolean) => void;
}

const explanations: Partial<Record<SimStage, { title: string; text: string }>> = {
  "light-reaction": {
    title: "Light Reactions",
    text: "Light reactions occur in the thylakoid membranes. Light energy splits water molecules, releasing oxygen and producing energy carriers ATP and NADPH.",
  },
  "calvin-cycle": {
    title: "Calvin Cycle",
    text: "The Calvin Cycle takes place in the stroma. CO₂ is fixed using energy from ATP and NADPH to produce glucose — the plant's food.",
  },
  completed: {
    title: "Process Complete",
    text: "The plant has converted light energy, water, and carbon dioxide into glucose and oxygen. Glucose is stored as food; oxygen is released into the atmosphere.",
  },
};

const EducationalPanel: React.FC<EducationalPanelProps> = ({ stage, visible, onToggle }) => {
  const info = explanations[stage];

  return (
    <div className="sim-panel">
      <div className="flex items-center justify-between mb-2">
        <span className="sim-label">Explanation</span>
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="text-xs text-muted-foreground">Show</span>
          <input type="checkbox" checked={visible} onChange={e => onToggle(e.target.checked)}
            className="w-4 h-4 accent-primary rounded" />
        </label>
      </div>
      {visible && info ? (
        <div>
          <p className="text-sm font-semibold mb-1">{info.title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{info.text}</p>
        </div>
      ) : visible ? (
        <p className="text-sm text-muted-foreground italic">Activate all inputs to begin the reactions.</p>
      ) : null}
    </div>
  );
};

export default EducationalPanel;
