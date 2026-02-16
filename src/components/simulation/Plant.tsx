import React from "react";

interface PlantProps {
  waterActive: boolean;
  co2Active: boolean;
  sunlightActive: boolean;
}

const Plant: React.FC<PlantProps> = ({ waterActive, co2Active, sunlightActive }) => {
  return (
    <g>
      <defs>
        <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(30, 40%, 35%)" />
          <stop offset="100%" stopColor="hsl(25, 30%, 22%)" />
        </linearGradient>
        <linearGradient id="stemGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(120, 30%, 30%)" />
          <stop offset="40%" stopColor="hsl(125, 35%, 40%)" />
          <stop offset="100%" stopColor="hsl(120, 28%, 28%)" />
        </linearGradient>
        <radialGradient id="leafGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="hsl(130, 50%, 50%)" />
          <stop offset="60%" stopColor="hsl(135, 45%, 38%)" />
          <stop offset="100%" stopColor="hsl(140, 40%, 28%)" />
        </radialGradient>
      </defs>

      {/* === GROUND / SOIL with wavy top === */}
      <path d="M0 340 Q80 330 150 338 Q220 346 300 335 Q380 326 450 338 Q520 348 600 335 L600 460 L0 460 Z"
        fill="url(#soilGrad)" />
      {/* Soil texture dots */}
      {[30,80,130,200,260,330,400,460,520,560].map((x, i) => (
        <circle key={`sd-${i}`} cx={x} cy={370 + (i % 3) * 18} r={1.2 + (i % 2)} fill="hsl(25, 25%, 18%)" opacity="0.3" />
      ))}

      {/* === ROOT SYSTEM === */}
      <g opacity="0.85">
        <path d="M300 340 Q298 360 295 385 Q290 405 280 425" stroke="hsl(30, 30%, 35%)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M300 340 Q302 365 308 390 Q315 410 325 430" stroke="hsl(30, 30%, 35%)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M295 365 Q270 380 250 395" stroke="hsl(30, 28%, 38%)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M308 370 Q330 385 350 400" stroke="hsl(30, 28%, 38%)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M280 400 Q265 410 255 420" stroke="hsl(30, 28%, 40%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M325 405 Q340 415 352 425" stroke="hsl(30, 28%, 40%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Root hairs */}
        {[[250,395,242,400],[255,420,248,426],[280,425,273,430],[325,430,332,436],[350,400,358,405],[352,425,360,430]].map(([x1,y1,x2,y2], i) => (
          <line key={`rh-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(30, 25%, 42%)" strokeWidth="0.8" opacity="0.6" />
        ))}
      </g>

      {/* === MAIN STEM - slightly curved === */}
      <path d="M300 340 Q298 300 300 260 Q302 220 298 180" stroke="url(#stemGrad)" strokeWidth="8" fill="none" strokeLinecap="round" />
      {/* Stem highlight */}
      <path d="M300 340 Q298 300 300 260 Q302 220 298 180" stroke="hsl(125, 35%, 50%)" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />

      {/* === LEAVES - like reference image: teardrop shapes at angles === */}
      {/* Leaf 1 - top right, large */}
      <g transform="translate(298, 185) rotate(-30)">
        <path d="M0 0 Q15 -25 5 -50 Q0 -55 -5 -50 Q-15 -25 0 0 Z" fill="url(#leafGrad)" />
        <path d="M0 0 Q0 -25 0 -48" stroke="hsl(130, 30%, 30%)" strokeWidth="0.8" fill="none" />
        {sunlightActive && <path d="M0 -15 Q8 -22 3 -35" stroke="hsl(55, 70%, 65%)" strokeWidth="2.5" opacity="0.15" className="animate-pulse-glow" />}
      </g>

      {/* Leaf 2 - top left */}
      <g transform="translate(298, 195) rotate(35)">
        <path d="M0 0 Q-15 -22 -5 -45 Q0 -50 5 -45 Q15 -22 0 0 Z" fill="url(#leafGrad)" />
        <path d="M0 0 Q0 -22 0 -43" stroke="hsl(130, 30%, 30%)" strokeWidth="0.8" fill="none" />
        {sunlightActive && <path d="M0 -12 Q-7 -20 -3 -32" stroke="hsl(55, 70%, 65%)" strokeWidth="2.5" opacity="0.15" className="animate-pulse-glow" />}
      </g>

      {/* Leaf 3 - mid right */}
      <g transform="translate(300, 230) rotate(-40)">
        <path d="M0 0 Q12 -20 4 -40 Q0 -44 -4 -40 Q-12 -20 0 0 Z" fill="url(#leafGrad)" />
        <path d="M0 0 Q0 -20 0 -38" stroke="hsl(130, 30%, 30%)" strokeWidth="0.7" fill="none" />
      </g>

      {/* Leaf 4 - mid left, small */}
      <g transform="translate(299, 250) rotate(45)">
        <path d="M0 0 Q-10 -16 -3 -32 Q0 -35 3 -32 Q10 -16 0 0 Z" fill="url(#leafGrad)" />
        <path d="M0 0 Q0 -16 0 -30" stroke="hsl(130, 30%, 30%)" strokeWidth="0.7" fill="none" />
      </g>

      {/* Leaf 5 - lower right, small */}
      <g transform="translate(301, 280) rotate(-35)">
        <path d="M0 0 Q10 -14 3 -28 Q0 -31 -3 -28 Q-10 -14 0 0 Z" fill="url(#leafGrad)" />
        <path d="M0 0 Q0 -14 0 -26" stroke="hsl(130, 30%, 30%)" strokeWidth="0.6" fill="none" />
      </g>

      {/* Leaf 6 - lower left, smallest */}
      <g transform="translate(299, 305) rotate(40)">
        <path d="M0 0 Q-8 -12 -2 -24 Q0 -26 2 -24 Q8 -12 0 0 Z" fill="url(#leafGrad)" />
        <path d="M0 0 Q0 -12 0 -22" stroke="hsl(130, 30%, 30%)" strokeWidth="0.6" fill="none" />
      </g>

      {/* === LABELED ARROWS like in reference === */}

      {/* Energy (Sunlight) - yellow arrow from sun to leaf */}
      {sunlightActive && (
        <g>
          <line x1="155" y1="100" x2="260" y2="185" stroke="hsl(45, 90%, 55%)" strokeWidth="2.5" opacity="0.7" />
          <polygon points="260,185 252,178 248,186" fill="hsl(45, 90%, 55%)" opacity="0.7" />
          <text x="165" y="130" fontSize="10" fill="hsl(45, 80%, 40%)" fontWeight="600" transform="rotate(-28, 165, 130)">
            Energy
          </text>
          <text x="165" y="142" fontSize="7.5" fill="hsl(45, 60%, 45%)" fontStyle="italic" transform="rotate(-28, 165, 142)">
            (From sunlight)
          </text>
        </g>
      )}

      {/* Oxygen - arrow going up-right from top leaf */}
      {sunlightActive && (
        <g>
          <line x1="320" y1="165" x2="390" y2="100" stroke="hsl(200, 50%, 55%)" strokeWidth="1.5" opacity="0.6" />
          <polygon points="390,100 382,105 386,112" fill="hsl(200, 50%, 55%)" opacity="0.6" />
          <text x="395" y="95" fontSize="10" fill="hsl(200, 45%, 40%)" fontWeight="600">Oxygen</text>
          <text x="395" y="107" fontSize="7.5" fill="hsl(200, 35%, 50%)" fontStyle="italic">(Released into air)</text>
        </g>
      )}

      {/* Glucose - arrow going right from mid plant */}
      {sunlightActive && (
        <g>
          <line x1="340" y1="230" x2="410" y2="215" stroke="hsl(40, 70%, 50%)" strokeWidth="1.5" opacity="0.6" />
          <polygon points="410,215 402,212 404,220" fill="hsl(40, 70%, 50%)" opacity="0.6" />
          <text x="415" y="210" fontSize="10" fill="hsl(40, 60%, 38%)" fontWeight="600">Glucose</text>
          <text x="415" y="222" fontSize="7.5" fill="hsl(40, 45%, 48%)" fontStyle="italic">(Used by plant)</text>
        </g>
      )}

      {/* Carbon Dioxide - arrow coming from left to leaf */}
      {co2Active && (
        <g>
          <line x1="140" y1="230" x2="255" y2="240" stroke="hsl(0, 0%, 45%)" strokeWidth="1.5" opacity="0.6" />
          <polygon points="255,240 247,235 247,244" fill="hsl(0, 0%, 45%)" opacity="0.6" />
          <text x="100" y="215" fontSize="10" fill="hsl(0, 0%, 35%)" fontWeight="600">Carbon dioxide</text>
          <text x="100" y="227" fontSize="7.5" fill="hsl(0, 0%, 50%)" fontStyle="italic">(Absorbed from air)</text>
        </g>
      )}

      {/* Water - arrow coming from below roots */}
      {waterActive && (
        <g>
          <line x1="300" y1="445" x2="300" y2="390" stroke="hsl(210, 55%, 55%)" strokeWidth="1.5" opacity="0.6" />
          <polygon points="300,390 296,398 304,398" fill="hsl(210, 55%, 55%)" opacity="0.6" />
          <text x="315" y="445" fontSize="10" fill="hsl(210, 50%, 40%)" fontWeight="600">Water</text>
          <text x="315" y="455" fontSize="7.5" fill="hsl(210, 35%, 50%)" fontStyle="italic">(Absorbed from soil)</text>
        </g>
      )}

      {/* Water molecules flowing up stem */}
      {waterActive && (
        <g>
          {[0, 1, 2, 3].map(i => (
            <g key={`wm-${i}`} className="animate-flow-up" style={{ animationDelay: `${i * 0.8}s` }}>
              <circle cx={299} cy={330 - i * 30} r="2.5" fill="hsl(210, 55%, 55%)" opacity="0.5" />
              <circle cx={301} cy={328 - i * 30} r="2" fill="hsl(210, 55%, 60%)" opacity="0.4" />
            </g>
          ))}
        </g>
      )}

      {/* CO₂ molecules drifting toward stomata */}
      {co2Active && (
        <g>
          {[
            { x: 220, y: 210, delay: 0 },
            { x: 200, y: 240, delay: 0.6 },
            { x: 230, y: 260, delay: 1.2 },
          ].map((mol, i) => (
            <g key={`co2m-${i}`} className="animate-drift" style={{ animationDelay: `${mol.delay}s` }}>
              <circle cx={mol.x} cy={mol.y} r="2" fill="hsl(0, 55%, 48%)" opacity="0.6" />
              <circle cx={mol.x + 4} cy={mol.y} r="2.5" fill="hsl(0, 0%, 30%)" opacity="0.65" />
              <circle cx={mol.x + 8} cy={mol.y} r="2" fill="hsl(0, 55%, 48%)" opacity="0.6" />
              <text x={mol.x - 1} y={mol.y + 10} fontSize="5.5" fill="hsl(0, 0%, 42%)">CO₂</text>
            </g>
          ))}
        </g>
      )}
    </g>
  );
};

export default Plant;
