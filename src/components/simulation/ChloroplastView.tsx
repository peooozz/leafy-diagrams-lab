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
      <svg viewBox="0 0 620 420" className="w-full h-full">
        <defs>
          <radialGradient id="stromaFill" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(95, 30%, 88%)" />
            <stop offset="100%" stopColor="hsl(100, 25%, 78%)" />
          </radialGradient>
          <linearGradient id="thylakoidDisc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(155, 50%, 48%)" />
            <stop offset="100%" stopColor="hsl(155, 45%, 35%)" />
          </linearGradient>
          <linearGradient id="membraneFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(142, 35%, 52%)" />
            <stop offset="100%" stopColor="hsl(142, 30%, 42%)" />
          </linearGradient>
          <marker id="arrowGray" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="hsl(0, 0%, 50%)" />
          </marker>
          <marker id="arrowBlue" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="hsl(210, 50%, 50%)" />
          </marker>
          <marker id="arrowYellow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="hsl(45, 65%, 50%)" />
          </marker>
          <marker id="arrowGreen" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="hsl(142, 40%, 42%)" />
          </marker>
        </defs>

        {/* === CHLOROPLAST OUTER SHAPE === */}
        <ellipse cx="310" cy="210" rx="290" ry="180" fill="none" stroke="url(#membraneFill)" strokeWidth="5" opacity="0.5" />
        <ellipse cx="310" cy="210" rx="275" ry="165" fill="url(#stromaFill)" stroke="url(#membraneFill)" strokeWidth="2.5" opacity="0.45" />

        {/* Membrane labels - top left, no overlap */}
        <text x="42" y="58" fontSize="9" fill="hsl(142, 25%, 40%)" fontWeight="500">Outer membrane</text>
        <line x1="42" y1="62" x2="58" y2="80" stroke="hsl(142, 25%, 50%)" strokeWidth="0.6" opacity="0.5" />
        <text x="42" y="78" fontSize="9" fill="hsl(142, 25%, 40%)" fontWeight="500">Inner membrane</text>
        <line x1="55" y1="82" x2="68" y2="95" stroke="hsl(142, 25%, 50%)" strokeWidth="0.6" opacity="0.5" />

        {/* Stroma label - center top */}
        <text x="280" y="78" fontSize="12" fill="hsl(100, 22%, 42%)" fontWeight="600" fontStyle="italic">Stroma</text>

        {/* === GRANA (Thylakoid stacks) - LEFT SIDE === */}
        {[
          { x: 120, y: 145, count: 5 },
          { x: 220, y: 135, count: 6 },
        ].map((stack, gi) => (
          <g key={`granum-${gi}`}>
            {Array.from({ length: stack.count }).map((_, i) => {
              const yPos = stack.y + i * 10;
              const lit = showLightReaction && gi === 0 && i === 2;
              return (
                <ellipse key={`d-${gi}-${i}`} cx={stack.x} cy={yPos} rx="28" ry="5.5"
                  fill={lit ? "hsl(150, 55%, 50%)" : "url(#thylakoidDisc)"}
                  opacity={showLightReaction ? 0.85 : 0.55}
                  className="transition-all duration-700" />
              );
            })}
          </g>
        ))}

        {/* Lamella connecting grana */}
        <path d="M148 175 Q175 172 192 165" stroke="hsl(155, 40%, 45%)" strokeWidth="2.5" fill="none" opacity="0.3" />

        {/* Thylakoid label */}
        <text x="62" y="130" fontSize="9" fill="hsl(155, 30%, 35%)" fontWeight="600" fontStyle="italic">Thylakoid</text>
        <text x="62" y="142" fontSize="8" fill="hsl(155, 25%, 48%)">(Grana stack)</text>
        <line x1="93" y1="145" x2="93" y2="155" stroke="hsl(155, 30%, 40%)" strokeWidth="0.5" opacity="0.5" />

        {/* ============================================ */}
        {/* === LIGHT REACTIONS - LEFT SIDE === */}
        {/* ============================================ */}
        {showLightReaction && (
          <g>
            {/* LIGHT label + beams */}
            <text x="70" y="102" fontSize="12" fill="hsl(48, 70%, 45%)" fontWeight="700">☀ LIGHT</text>
            <line x1="100" y1="108" x2="120" y2="140" stroke="hsl(48, 80%, 60%)" strokeWidth="2" opacity="0.4" className="animate-beam" />
            <line x1="88" y1="110" x2="115" y2="140" stroke="hsl(48, 75%, 60%)" strokeWidth="1.5" opacity="0.25" className="animate-beam" style={{ animationDelay: "0.5s" }} />

            {/* H₂O input */}
            <g>
              <rect x="55" y="222" width="48" height="22" rx="6" fill="hsl(210, 50%, 55%)" opacity="0.15" />
              <text x="62" y="237" fontSize="11" fill="hsl(210, 50%, 45%)" fontWeight="600">H₂O</text>
              <path d="M103 233 L128 210" stroke="hsl(210, 50%, 55%)" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrowBlue)" />
            </g>

            {/* Water splitting equation */}
            <text x="55" y="262" fontSize="8.5" fill="hsl(210, 40%, 45%)" fontWeight="500">
              2H₂O → O₂ + 4H⁺ + 4e⁻
            </text>

            {/* O₂ output */}
            <g>
              {[0, 1, 2].map(i => (
                <g key={`o2-${i}`} className="animate-float-up" style={{ animationDelay: `${i * 1}s` }}>
                  <circle cx={70 + i * 20} cy={285} r="4" fill="hsl(200, 55%, 55%)" opacity="0.55" />
                  <circle cx={75 + i * 20} cy={283} r="4" fill="hsl(200, 55%, 55%)" opacity="0.55" />
                  <text x={65 + i * 20} y={300} fontSize="7" fill="hsl(200, 45%, 42%)">O₂</text>
                </g>
              ))}
              <text x="70" y="318" fontSize="10" fill="hsl(200, 45%, 38%)" fontWeight="600">Oxygen ↑</text>
            </g>

            {/* Products: ATP & NADPH */}
            <g>
              <rect x="175" y="225" width="42" height="22" rx="6" fill="hsl(45, 65%, 52%)" opacity="0.85" />
              <text x="184" y="240" fontSize="10" fill="white" fontWeight="700">ATP</text>

              <rect x="175" y="255" width="58" height="22" rx="6" fill="hsl(275, 35%, 50%)" opacity="0.85" />
              <text x="182" y="270" fontSize="10" fill="white" fontWeight="700">NADPH</text>
            </g>

            {/* Arrow from thylakoid to products */}
            <path d="M150 195 Q165 215 180 225" stroke="hsl(45, 55%, 50%)" strokeWidth="1.2" fill="none" opacity="0.5" strokeDasharray="3 2" />

            {/* Section label */}
            <text x="60" y="345" fontSize="11" fill="hsl(155, 30%, 32%)" fontWeight="600">
              Light Reactions
            </text>
            <text x="60" y="358" fontSize="8" fill="hsl(155, 20%, 48%)">
              (Energy conversion in thylakoids)
            </text>
          </g>
        )}

        {/* ============================================ */}
        {/* === CALVIN CYCLE - RIGHT SIDE === */}
        {/* ============================================ */}
        {showCalvinCycle && (
          <g>
            {/* Cycle circle */}
            <circle cx="440" cy="210" r="75" fill="hsl(142, 25%, 85%)" opacity="0.25" />
            <circle cx="440" cy="210" r="75" fill="none"
              stroke="hsl(142, 30%, 48%)" strokeWidth="2.5" opacity="0.4"
              strokeDasharray="8 4" className="animate-cycle-rotate" />

            {/* Direction dots on circle */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <circle key={`cd-${i}`} cx={440 + Math.cos(rad) * 75} cy={210 + Math.sin(rad) * 75} r="3"
                  fill="hsl(142, 40%, 45%)" opacity="0.5" />
              );
            })}

            {/* Calvin Cycle label */}
            <text x="415" y="205" fontSize="13" fill="hsl(142, 30%, 28%)" fontWeight="700">Calvin</text>
            <text x="420" y="222" fontSize="13" fill="hsl(142, 30%, 28%)" fontWeight="700">Cycle</text>

            {/* CO₂ input - top right */}
            <g>
              <rect x="510" y="120" width="55" height="38" rx="6" fill="hsl(0, 0%, 92%)" opacity="0.6" />
              <text x="518" y="138" fontSize="10" fill="hsl(0, 0%, 30%)" fontWeight="600">Carbon</text>
              <text x="518" y="150" fontSize="10" fill="hsl(0, 0%, 30%)" fontWeight="600">Dioxide</text>
              {/* CO₂ molecule */}
              <circle cx="525" cy="170" r="3" fill="hsl(0, 55%, 48%)" opacity="0.6" />
              <circle cx="532" cy="170" r="3.5" fill="hsl(0, 0%, 30%)" opacity="0.7" />
              <circle cx="539" cy="170" r="3" fill="hsl(0, 55%, 48%)" opacity="0.6" />
              <text x="523" y="184" fontSize="7" fill="hsl(0, 0%, 45%)">CO₂</text>
              <path d="M525 186 Q500 195 515 200" stroke="hsl(0, 0%, 50%)" strokeWidth="1.2" fill="none" opacity="0.5" markerEnd="url(#arrowGray)" />
            </g>

            {/* ATP + NADPH input from left */}
            <path d="M233 248 Q320 250 370 230" stroke="hsl(45, 55%, 50%)" strokeWidth="1.5" fill="none" opacity="0.45" strokeDasharray="4 2" markerEnd="url(#arrowYellow)" />
            <text x="280" y="268" fontSize="8" fill="hsl(150, 10%, 42%)" fontWeight="500">ATP + NADPH →</text>

            {/* Glucose output - bottom */}
            {isCompleted && (
              <g>
                <polygon points="440,210 450,202 460,210 460,222 450,230 440,222"
                  fill="hsl(40, 65%, 52%)" opacity="0.85" stroke="hsl(35, 55%, 40%)" strokeWidth="1" />
                <text x="447" y="220" fontSize="7" fill="white" fontWeight="700" textAnchor="middle">G</text>
              </g>
            )}

            <g>
              <path d="M440 288 L440 300" stroke="hsl(40, 55%, 45%)" strokeWidth="1.5" opacity="0.6" markerEnd="url(#arrowYellow)" />
              <rect x="405" y="305" width="72" height="32" rx="6" fill="hsl(40, 60%, 95%)" opacity="0.7" />
              <text x="414" y="320" fontSize="10" fill="hsl(40, 55%, 35%)" fontWeight="700">C₆H₁₂O₆</text>
              <text x="422" y="333" fontSize="8.5" fill="hsl(40, 40%, 45%)" fontWeight="500">(Glucose)</text>
            </g>

            {/* Section label */}
            <text x="380" y="370" fontSize="11" fill="hsl(142, 30%, 32%)" fontWeight="600">
              Calvin Cycle
            </text>
            <text x="380" y="383" fontSize="8" fill="hsl(142, 20%, 48%)">
              (Sugar production in stroma)
            </text>
          </g>
        )}

        {/* Divider line between two sections */}
        {showLightReaction && showCalvinCycle && (
          <line x1="310" y1="90" x2="310" y2="370" stroke="hsl(142, 20%, 60%)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
        )}

        {/* Overall equation at bottom when completed */}
        {isCompleted && (
          <g>
            <rect x="140" y="390" width="340" height="24" rx="8" fill="hsl(142, 30%, 25%)" opacity="0.85" />
            <text x="160" y="407" fontSize="10" fill="white" fontWeight="600" className="font-mono">
              6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default ChloroplastView;
