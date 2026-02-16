import React from "react";
import type { SimStage } from "@/hooks/useSimulation";

interface StatusPanelProps {
  stage: SimStage;
  oxygenCount: number;
  glucoseCount: number;
}

const stageLabels: Record<SimStage, string> = {
  waiting: "Waiting — Activate sunlight to begin",
  sunlight: "Sunlight Absorbed",
  water: "Water Absorbed",
  co2: "CO₂ Entering Leaf",
  "light-reaction": "Light Reaction in Progress",
  "calvin-cycle": "Calvin Cycle in Progress",
  completed: "Photosynthesis Complete",
};

const StatusPanel: React.FC<StatusPanelProps> = ({ stage, oxygenCount, glucoseCount }) => {
  return (
    <div className="sim-panel">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${
            stage === "waiting" ? "bg-status-inactive" : stage === "completed" ? "bg-status-complete" : "bg-status-running animate-pulse"
          }`} />
          <div>
            <span className="sim-label">Current Stage</span>
            <p className="text-sm font-medium">{stageLabels[stage]}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="sim-label">Oxygen Released</span>
            <div className="flex gap-1 mt-1 justify-center">
              {Array.from({ length: Math.min(oxygenCount, 6) }).map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 rounded-full bg-o2 opacity-70" />
              ))}
              {oxygenCount === 0 && <span className="text-xs text-muted-foreground">—</span>}
            </div>
          </div>

          <div className="text-center">
            <span className="sim-label">Glucose Produced</span>
            <div className="flex gap-1 mt-1 justify-center">
              {Array.from({ length: glucoseCount }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-glucose rounded" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
              ))}
              {glucoseCount === 0 && <span className="text-xs text-muted-foreground">—</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
