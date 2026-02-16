import React from "react";
import type { SimStage } from "@/hooks/useSimulation";

interface ChloroplastViewProps {
  stage: SimStage;
}

const ChloroplastView: React.FC<ChloroplastViewProps> = ({ stage }) => {
  const showLightReaction = stage === "light-reaction" || stage === "calvin-cycle" || stage === "completed";
  const showCalvinCycle = stage === "calvin-cycle" || stage === "completed";
  const isCompleted = stage === "completed";

  return (
    <div className="animate-zoom-in">
      <svg viewBox="0 0 580 400" className="w-full h-full">
        <defs>
          <radialGradient id="stromaFill" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(95, 30%, 85%)" />
            <stop offset="100%" stopColor="hsl(100, 25%, 78%)" />
          </radialGradient>
          <linearGradient id="thylakoidDisc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(155, 50%, 48%)" />
            <stop offset="50%" stopColor="hsl(155, 55%, 40%)" />
            <stop offset="100%" stopColor="hsl(155, 45%, 35%)" />
          </linearGradient>
          <linearGradient id="membraneFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(142, 35%, 52%)" />
            <stop offset="100%" stopColor="hsl(142, 30%, 42%)" />
          </linearGradient>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <marker id="arrowHead" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="hsl(0, 0%, 40%)" opacity="0.5" />
          </marker>
          <marker id="arrowBlue" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="hsl(210, 50%, 50%)" opacity="0.7" />
          </marker>
          <marker id="arrowYellow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="hsl(45, 65%, 50%)" opacity="0.7" />
          </marker>
        </defs>

        {/* === OUTER MEMBRANE === */}
        <ellipse cx="290" cy="195" rx="270" ry="170"
          fill="none" stroke="url(#membraneFill)" strokeWidth="4" opacity="0.6" />
        {/* === INNER MEMBRANE === */}
        <ellipse cx="290" cy="195" rx="255" ry="155"
          fill="url(#stromaFill)" stroke="url(#membraneFill)" strokeWidth="2.5" opacity="0.5" />

        {/* Stroma label */}
        <text x="255" y="55" fontSize="11" fill="hsl(100, 20%, 40%)" fontWeight="500" fontStyle="italic">Stroma</text>

        {/* Membrane labels */}
        <g>
          <line x1="28" y1="50" x2="55" y2="70" stroke="hsl(142, 25%, 45%)" strokeWidth="0.5" opacity="0.6" />
          <text x="5" y="46" fontSize="8" fill="hsl(142, 25%, 40%)">Outer Membrane</text>
          <line x1="42" y1="68" x2="62" y2="78" stroke="hsl(142, 25%, 45%)" strokeWidth="0.5" opacity="0.6" />
          <text x="5" y="72" fontSize="8" fill="hsl(142, 25%, 40%)">Inner Membrane</text>
        </g>

        {/* Intermembrane Space label */}
        <g>
          <line x1="540" y1="100" x2="520" y2="120" stroke="hsl(142, 25%, 45%)" strokeWidth="0.5" opacity="0.6" />
          <text x="505" y="96" fontSize="7" fill="hsl(142, 25%, 40%)">Intermembrane</text>
          <text x="520" y="106" fontSize="7" fill="hsl(142, 25%, 40%)">Space</text>
        </g>

        {/* === GRANA STACKS (thylakoid discs) === */}
        {[
          { x: 110, y: 130, count: 6 },
          { x: 210, y: 120, count: 7 },
        ].map((stack, gi) => (
          <g key={`granum-${gi}`}>
            <ellipse cx={stack.x + 2} cy={stack.y + stack.count * 9 + 4} rx="32" ry="5"
              fill="hsl(155, 30%, 30%)" opacity="0.1" filter="url(#softBlur)" />
            {Array.from({ length: stack.count }).map((_, i) => {
              const yPos = stack.y + i * 9;
              const isLit = showLightReaction && gi === 0 && i === 2;
              return (
                <g key={`disc-${gi}-${i}`}>
                  <ellipse cx={stack.x} cy={yPos} rx="30" ry="5"
                    fill={isLit ? "hsl(150, 55%, 50%)" : "url(#thylakoidDisc)"}
                    opacity={showLightReaction ? 0.85 : 0.6}
                    className="transition-all duration-700"
                  />
                  <ellipse cx={stack.x} cy={yPos - 1.5} rx="26" ry="2.5"
                    fill="hsl(150, 45%, 55%)" opacity="0.2" />
                  <ellipse cx={stack.x} cy={yPos + 2} rx="28" ry="3"
                    fill="hsl(155, 40%, 28%)" opacity="0.15" />
                </g>
              );
            })}
          </g>
        ))}

        {/* Intergranal lamellae */}
        <path d="M140 160 Q170 158 180 150" stroke="hsl(155, 40%, 45%)" strokeWidth="2" fill="none" opacity="0.35" />

        {/* Thylakoid / Grana label */}
        <g>
          <line x1="65" y1="115" x2="82" y2="130" stroke="hsl(155, 30%, 40%)" strokeWidth="0.5" opacity="0.6" />
          <text x="25" y="108" fontSize="8.5" fill="hsl(155, 30%, 35%)" fontWeight="500" fontStyle="italic">Thylakoid</text>
          <text x="32" y="118" fontSize="7.5" fill="hsl(155, 25%, 45%)">(Grana stack)</text>
        </g>

        {/* === LIGHT REACTIONS (left side) === */}
        {showLightReaction && (
          <g>
            {/* LIGHT label with arrow */}
            <text x="55" y="85" fontSize="11" fill="hsl(48, 70%, 45%)" fontWeight="700">LIGHT</text>
            <line x1="80" y1="88" x2="110" y2="125" stroke="hsl(48, 80%, 55%)" strokeWidth="2"
              opacity="0.5" markerEnd="url(#arrowYellow)" />

            {/* Light beams hitting thylakoid */}
            <line x1="100" y1="50" x2="110" y2="128" stroke="hsl(48, 80%, 65%)" strokeWidth="2.5"
              opacity="0.3" className="animate-beam" />
            <line x1="92" y1="55" x2="107" y2="128" stroke="hsl(48, 75%, 65%)" strokeWidth="1.5"
              opacity="0.2" className="animate-beam" style={{ animationDelay: "0.6s" }} />

            {/* Water input */}
            <g>
              <text x="60" y="230" fontSize="10" fill="hsl(210, 50%, 45%)" fontWeight="600">Water</text>
              <circle cx="95" cy="240" r="5" fill="hsl(200, 55%, 55%)" opacity="0.6" />
              <text x="89" y="244" fontSize="7" fill="hsl(0, 0%, 100%)" fontWeight="600">H₂O</text>
              <line x1="95" y1="232" x2="110" y2="200" stroke="hsl(210, 50%, 55%)" strokeWidth="1.5"
                opacity="0.5" markerEnd="url(#arrowBlue)" />
            </g>

            {/* Water splitting equation */}
            <text x="60" y="270" fontSize="8" fill="hsl(210, 45%, 45%)" fontWeight="500">
              H₂O → O₂ + H⁺ + e⁻
            </text>

            {/* O₂ molecules escaping */}
            {[0, 1, 2].map(i => (
              <g key={`o2-${i}`} className="animate-float-up" style={{ animationDelay: `${i * 0.9}s` }}>
                <circle cx={75 + i * 18} cy={285} r="3.5" fill="hsl(200, 55%, 52%)" opacity="0.65" />
                <circle cx={80 + i * 18} cy={283} r="3.5" fill="hsl(200, 55%, 52%)" opacity="0.65" />
                <text x={70 + i * 18} y={299} fontSize="6" fill="hsl(200, 45%, 45%)">O₂</text>
              </g>
            ))}

            {/* Oxygen output label */}
            <text x="72" y="315" fontSize="10" fill="hsl(200, 50%, 42%)" fontWeight="600">Oxygen</text>

            {/* NADP+ and ADP labels near thylakoid */}
            <g>
              <rect x="165" y="175" width="40" height="16" rx="4" fill="hsl(275, 35%, 50%)" opacity="0.7" />
              <text x="172" y="187" fontSize="8" fill="hsl(0, 0%, 100%)" fontWeight="600">NADP⁺</text>
              <rect x="165" y="195" width="30" height="16" rx="4" fill="hsl(45, 55%, 50%)" opacity="0.7" />
              <text x="172" y="207" fontSize="8" fill="hsl(0, 0%, 100%)" fontWeight="600">ADP</text>
            </g>

            {/* ATP molecule produced */}
            <g>
              <rect x="210" y="240" width="38" height="20" rx="6" fill="hsl(45, 65%, 52%)" opacity="0.8" />
              <rect x="210" y="240" width="38" height="8" rx="4" fill="hsl(48, 70%, 62%)" opacity="0.3" />
              <text x="219" y="254" fontSize="9" fill="hsl(0, 0%, 100%)" fontWeight="600">ATP</text>
            </g>
            {/* NADPH molecule produced */}
            <g>
              <rect x="255" y="240" width="52" height="20" rx="6" fill="hsl(275, 35%, 50%)" opacity="0.8" />
              <rect x="255" y="240" width="52" height="8" rx="4" fill="hsl(275, 40%, 62%)" opacity="0.3" />
              <text x="262" y="254" fontSize="9" fill="hsl(0, 0%, 100%)" fontWeight="600">NADPH</text>
            </g>

            {/* Arrow from thylakoid to ATP/NADPH */}
            <path d="M170 210 Q190 225 215 238" stroke="hsl(45, 55%, 50%)" strokeWidth="1.2" fill="none" opacity="0.5" strokeDasharray="3 2" />

            <text x="100" y="340" fontSize="10" fill="hsl(155, 30%, 32%)" fontWeight="600">
              Light Reaction — Energy Conversion
            </text>
          </g>
        )}

        {/* === CALVIN CYCLE (right side - like the reference diagram) === */}
        {showCalvinCycle && (
          <g>
            {/* Circular Calvin cycle */}
            <circle cx="420" cy="195" r="70" fill="none"
              stroke="hsl(142, 30%, 48%)" strokeWidth="2.5" opacity="0.45"
              strokeDasharray="8 3" className="animate-cycle-rotate"
            />
            {/* Inner fill */}
            <circle cx="420" cy="195" r="68" fill="hsl(142, 25%, 80%)" opacity="0.2" />

            {/* Flow direction arrows on circle */}
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const ax = 420 + Math.cos(rad) * 70;
              const ay = 195 + Math.sin(rad) * 70;
              return (
                <circle key={`arrow-${i}`} cx={ax} cy={ay} r="3.5"
                  fill="hsl(142, 40%, 42%)" opacity="0.6" />
              );
            })}

            {/* Calvin Cycle label */}
            <text x="393" y="188" fontSize="12" fill="hsl(142, 30%, 30%)" fontWeight="700">Calvin</text>
            <text x="398" y="204" fontSize="12" fill="hsl(142, 30%, 30%)" fontWeight="700">Cycle</text>

            {/* CO₂ entering from right */}
            <g>
              <text x="510" y="150" fontSize="9" fill="hsl(0, 0%, 35%)" fontWeight="600">Carbon</text>
              <text x="510" y="162" fontSize="9" fill="hsl(0, 0%, 35%)" fontWeight="600">Dioxide</text>
              <circle cx="520" cy="178" r="3" fill="hsl(0, 55%, 48%)" opacity="0.6" />
              <circle cx="526" cy="178" r="3.5" fill="hsl(0, 0%, 28%)" opacity="0.7" />
              <circle cx="532" cy="178" r="3" fill="hsl(0, 55%, 48%)" opacity="0.6" />
              <text x="517" y="193" fontSize="7" fill="hsl(0, 0%, 40%)">CO₂</text>
              <path d="M518 180 Q500 185 492 190" stroke="hsl(0, 0%, 45%)" strokeWidth="1.2" fill="none"
                opacity="0.5" markerEnd="url(#arrowHead)" />
            </g>

            {/* ATP + NADPH input arrows from left */}
            <path d="M307 252 Q350 235 370 220" stroke="hsl(45, 55%, 50%)" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="3 2" markerEnd="url(#arrowYellow)" />
            <text x="310" y="275" fontSize="8" fill="hsl(150, 10%, 42%)" fontWeight="500">ATP + NADPH</text>

            {/* Glucose output - hexagonal ring */}
            {isCompleted && (
              <g>
                <polygon points="420,195 432,186 444,195 444,210 432,219 420,210"
                  fill="hsl(40, 65%, 52%)" opacity="0.85"
                  stroke="hsl(35, 55%, 40%)" strokeWidth="1" />
                <polygon points="422,196 430,190 438,196"
                  fill="hsl(45, 70%, 65%)" opacity="0.3" />
                <text x="429" y="208" fontSize="7" fill="hsl(0, 0%, 100%)" fontWeight="700" textAnchor="middle">G</text>
              </g>
            )}

            {/* Sugars output */}
            <g>
              <text x="395" y="290" fontSize="10" fill="hsl(40, 55%, 38%)" fontWeight="600">C₆H₁₂O₆</text>
              <text x="405" y="305" fontSize="8" fill="hsl(40, 40%, 45%)" fontWeight="500">Sugars</text>
              <path d="M420 268 L420 278" stroke="hsl(40, 55%, 45%)" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrowYellow)" />
            </g>

            <text x="355" y="355" fontSize="10" fill="hsl(142, 30%, 32%)" fontWeight="600">
              Calvin Cycle — Glucose Production
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default ChloroplastView;
