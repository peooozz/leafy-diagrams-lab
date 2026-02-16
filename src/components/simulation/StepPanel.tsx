import React from "react";
import type { SimStage } from "@/hooks/useSimulation";
import { Sun as SunIcon, Droplets, Wind, RotateCcw } from "lucide-react";

interface StepPanelProps {
  stage: SimStage;
  onSunlight: () => void;
  onWater: () => void;
  onCO2: () => void;
  onReset: () => void;
}

const steps = [
  {
    id: "sunlight" as const,
    label: "Step 1 — Provide Sunlight",
    icon: SunIcon,
    explanation: "Chlorophyll absorbs light energy from the sun. This energy powers the chemical reactions inside the chloroplast.",
    enabledAt: "waiting" as SimStage,
  },
  {
    id: "water" as const,
    label: "Step 2 — Absorb Water",
    icon: Droplets,
    explanation: "Water is absorbed by roots from the soil and transported to leaves through xylem vessels.",
    enabledAt: "sunlight" as SimStage,
  },
  {
    id: "co2" as const,
    label: "Step 3 — Carbon Dioxide Intake",
    icon: Wind,
    explanation: "Carbon dioxide enters through small pores on the leaf surface called stomata.",
    enabledAt: "water" as SimStage,
  },
];

const stageOrder: SimStage[] = ["waiting", "sunlight", "water", "co2", "light-reaction", "calvin-cycle", "completed"];

function stageIndex(s: SimStage) {
  return stageOrder.indexOf(s);
}

const StepPanel: React.FC<StepPanelProps> = ({ stage, onSunlight, onWater, onCO2, onReset }) => {
  const handlers = [onSunlight, onWater, onCO2];

  return (
    <div className="flex flex-col gap-3">
      <h2 className="sim-heading">Simulation Controls</h2>
      <p className="text-xs text-muted-foreground mb-1">Activate each step sequentially</p>

      {steps.map((step, i) => {
        const stepDone = stageIndex(stage) > stageIndex(step.enabledAt);
        const isReady = stage === step.enabledAt;
        const Icon = step.icon;

        return (
          <button
            key={step.id}
            onClick={isReady ? handlers[i] : undefined}
            className={`sim-button text-left flex items-start gap-3 ${
              stepDone ? "sim-button-active" : isReady ? "sim-button-ready" : "sim-button-inactive"
            }`}
          >
            <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm">{step.label}</div>
              {stepDone && (
                <div className="text-xs mt-1 opacity-80 leading-relaxed">{step.explanation}</div>
              )}
              {isReady && (
                <div className="text-xs mt-1 opacity-70">Click to activate</div>
              )}
            </div>
          </button>
        );
      })}

      {stage === "completed" && (
        <button onClick={onReset} className="sim-button sim-button-ready flex items-center gap-2 justify-center mt-2">
          <RotateCcw className="w-4 h-4" />
          Reset Simulation
        </button>
      )}
    </div>
  );
};

export default StepPanel;
