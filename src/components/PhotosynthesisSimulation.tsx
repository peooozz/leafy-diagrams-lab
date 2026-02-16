import React from "react";
import Sun from "./simulation/Sun";
import Plant from "./simulation/Plant";
import ChloroplastView from "./simulation/ChloroplastView";
import StepPanel from "./simulation/StepPanel";
import StatusPanel from "./simulation/StatusPanel";
import EducationalPanel from "./simulation/EducationalPanel";
import Footer from "./simulation/Footer";
import { useSimulation } from "@/hooks/useSimulation";

const PhotosynthesisSimulation: React.FC = () => {
  const sim = useSimulation();
  const showChloroplastZoom = sim.showChloroplast;

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: "linear-gradient(180deg, hsl(208, 55%, 82%) 0%, hsl(205, 35%, 90%) 35%, hsl(120, 15%, 95%) 100%)"
    }}>
      {/* Header */}
      <header className="px-6 py-3 border-b border-border/60 bg-card/70 backdrop-blur-md">
        <h1 className="text-lg font-semibold text-foreground tracking-tight">
          Photosynthesis — Interactive Simulation
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">Class 10 Biology · Step-by-step guided process</p>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 max-w-7xl mx-auto w-full">
        {/* Visualization area */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="sim-panel flex-1 min-h-[420px] relative overflow-hidden p-2"
            style={{ boxShadow: "0 2px 12px -2px hsla(150, 20%, 20%, 0.08)" }}>
            {!showChloroplastZoom ? (
              <svg viewBox="0 0 600 460" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="skyAtmo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(210, 50%, 80%)" />
                    <stop offset="50%" stopColor="hsl(208, 40%, 87%)" />
                    <stop offset="100%" stopColor="hsl(200, 25%, 92%)" />
                  </linearGradient>
                </defs>
                {/* Sky */}
                <rect width="600" height="365" fill="url(#skyAtmo)" />
                <rect x="0" y="340" width="600" height="25" fill="hsl(120, 15%, 90%)" opacity="0.4" />

                <Sun active={sim.sunlightActive} />
                <Plant
                  waterActive={sim.waterActive}
                  co2Active={sim.co2Active}
                  sunlightActive={sim.sunlightActive}
                />

                {/* O₂ molecules leaving leaf */}
                {(sim.stage === "light-reaction" || sim.stage === "calvin-cycle" || sim.stage === "completed") && (
                  <g>
                    {[0, 1, 2, 3].map(i => (
                      <g key={`leaf-o2-${i}`} className="animate-float-up" style={{ animationDelay: `${i * 0.7}s` }}>
                        <circle cx={310 + i * 22} cy={170} r="3" fill="hsl(200, 55%, 55%)" opacity="0.5" />
                        <circle cx={314 + i * 22} cy={168} r="3" fill="hsl(200, 55%, 55%)" opacity="0.5" />
                        <text x={305 + i * 22} y={163} fontSize="6" fill="hsl(200, 45%, 40%)" opacity="0.6">O₂</text>
                      </g>
                    ))}
                  </g>
                )}

                {/* Cross-section labels */}
                {sim.sunlightActive && (
                  <g opacity="0.7">
                    <line x1="230" y1="177" x2="210" y2="160" stroke="hsl(130, 20%, 45%)" strokeWidth="0.5" />
                    <text x="160" y="157" fontSize="7" fill="hsl(130, 20%, 40%)" fontStyle="italic">Upper epidermis</text>
                    <line x1="232" y1="195" x2="210" y2="195" stroke="hsl(130, 20%, 45%)" strokeWidth="0.5" />
                    <text x="155" y="198" fontSize="7" fill="hsl(130, 20%, 40%)" fontStyle="italic">Mesophyll</text>
                  </g>
                )}
              </svg>
            ) : (
              <div className="p-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="sim-label">Chloroplast — Internal View</span>
                </div>
                <ChloroplastView stage={sim.stage} />
              </div>
            )}
          </div>

          {/* Status */}
          <StatusPanel stage={sim.stage} oxygenCount={sim.oxygenCount} glucoseCount={sim.glucoseCount} />
        </div>

        {/* Right panel */}
        <div className="w-full lg:w-72 flex flex-col gap-3">
          <div className="sim-panel" style={{ boxShadow: "0 2px 12px -2px hsla(150, 20%, 20%, 0.08)" }}>
            <StepPanel
              stage={sim.stage}
              onSunlight={sim.activateSunlight}
              onWater={sim.activateWater}
              onCO2={sim.activateCO2}
              onReset={sim.reset}
            />
          </div>
          <EducationalPanel stage={sim.stage} visible={sim.showExplanations} onToggle={sim.setShowExplanations} />
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 pb-3 max-w-7xl mx-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default PhotosynthesisSimulation;
