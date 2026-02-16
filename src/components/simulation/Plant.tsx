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
        <linearGradient id="soilMain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(22, 32%, 30%)" />
          <stop offset="30%" stopColor="hsl(20, 28%, 25%)" />
          <stop offset="70%" stopColor="hsl(18, 24%, 20%)" />
          <stop offset="100%" stopColor="hsl(15, 20%, 16%)" />
        </linearGradient>
        <linearGradient id="soilTop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(25, 35%, 35%)" />
          <stop offset="50%" stopColor="hsl(28, 30%, 38%)" />
          <stop offset="100%" stopColor="hsl(22, 32%, 33%)" />
        </linearGradient>
        <linearGradient id="stemCyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(125, 28%, 30%)" />
          <stop offset="25%" stopColor="hsl(128, 32%, 38%)" />
          <stop offset="50%" stopColor="hsl(130, 35%, 44%)" />
          <stop offset="75%" stopColor="hsl(128, 32%, 38%)" />
          <stop offset="100%" stopColor="hsl(125, 28%, 30%)" />
        </linearGradient>
        <radialGradient id="leafSurface" cx="45%" cy="40%">
          <stop offset="0%" stopColor="hsl(125, 42%, 52%)" />
          <stop offset="40%" stopColor="hsl(132, 40%, 42%)" />
          <stop offset="80%" stopColor="hsl(138, 38%, 34%)" />
          <stop offset="100%" stopColor="hsl(140, 35%, 28%)" />
        </radialGradient>
        <linearGradient id="leafSheen" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="hsl(120, 35%, 60%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(140, 35%, 30%)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="xylemTube" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(210, 40%, 48%)" />
          <stop offset="50%" stopColor="hsl(205, 45%, 58%)" />
          <stop offset="100%" stopColor="hsl(210, 40%, 48%)" />
        </linearGradient>
        <filter id="softShadow">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* === SOIL === */}
      <rect x="120" y="365" width="360" height="90" rx="0" fill="url(#soilMain)" />
      <rect x="120" y="365" width="360" height="8" fill="url(#soilTop)" />
      {[140,165,190,220,250,280,310,340,370,400,430,455].map((x, i) => (
        <g key={`soil-${i}`}>
          <circle cx={x} cy={380 + (i % 3) * 12} r={1 + (i % 2)} fill="hsl(20, 20%, 22%)" opacity="0.3" />
          <circle cx={x + 8} cy={395 + (i % 2) * 8} r={0.8} fill="hsl(25, 25%, 40%)" opacity="0.25" />
        </g>
      ))}
      {waterActive && (
        <g>
          <ellipse cx="285" cy="395" rx="40" ry="15" fill="hsl(210, 45%, 55%)" opacity="0.08" />
          <ellipse cx="310" cy="405" rx="30" ry="10" fill="hsl(210, 45%, 55%)" opacity="0.06" />
        </g>
      )}

      {/* === ROOT SYSTEM === */}
      <g>
        <path d="M300 365 Q298 385 295 405 Q292 420 285 435" stroke="hsl(25, 28%, 35%)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M298 380 Q280 390 260 400 Q248 406 240 415" stroke="hsl(25, 25%, 38%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M296 395 Q275 405 258 418" stroke="hsl(25, 25%, 38%)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M299 378 Q320 388 340 398 Q355 406 365 418" stroke="hsl(25, 25%, 38%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M297 390 Q325 402 345 415" stroke="hsl(25, 25%, 38%)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M294 405 Q278 415 268 425" stroke="hsl(25, 25%, 38%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {[
          [240,415,-8,5], [240,415,4,7], [258,418,-6,4], [258,418,3,6],
          [260,400,-7,3], [260,400,2,5], [340,398,6,4], [340,398,-3,6],
          [365,418,5,3], [365,418,-4,5], [345,415,7,4], [268,425,-5,4], [268,425,3,5],
          [285,435,-6,3], [285,435,4,5],
        ].map(([x, y, dx, dy], i) => (
          <line key={`rh-${i}`} x1={x} y1={y} x2={x+dx} y2={y+dy}
            stroke="hsl(25, 22%, 42%)" strokeWidth="0.6" opacity="0.5" />
        ))}
      </g>

      {/* === STEM === */}
      <rect x="293" y="200" width="14" height="165" rx="5" fill="url(#stemCyl)" />
      <rect x="296" y="200" width="4" height="165" rx="2" fill="url(#xylemTube)" opacity="0.45" />
      <rect x="302" y="200" width="3" height="165" rx="1.5" fill="hsl(130, 30%, 45%)" opacity="0.25" />
      <rect x="298" y="200" width="2" height="165" rx="1" fill="hsl(130, 40%, 60%)" opacity="0.15" />

      {/* Xylem label */}
      {waterActive && (
        <g>
          <line x1="310" y1="290" x2="330" y2="285" stroke="hsl(210, 40%, 50%)" strokeWidth="0.6" opacity="0.7" />
          <text x="332" y="288" fontSize="8.5" fill="hsl(210, 40%, 45%)" fontWeight="500" fontStyle="italic">
            Xylem — Water Transport
          </text>
        </g>
      )}

      {/* Water molecules flowing in xylem */}
      {waterActive && (
        <g>
          {[0, 1, 2, 3].map(i => (
            <g key={`water-${i}`} className="animate-flow-up" style={{ animationDelay: `${i * 0.7}s` }}>
              <circle cx={298} cy={350 - i * 25} r="2.8" fill="hsl(0, 60%, 52%)" opacity="0.7" />
              <circle cx={295.5} cy={347.5 - i * 25} r="1.8" fill="hsl(0, 0%, 92%)" opacity="0.75" stroke="hsl(0, 0%, 75%)" strokeWidth="0.3" />
              <circle cx={300.5} cy={347.5 - i * 25} r="1.8" fill="hsl(0, 0%, 92%)" opacity="0.75" stroke="hsl(0, 0%, 75%)" strokeWidth="0.3" />
            </g>
          ))}
        </g>
      )}

      {/* === SMALL LEAVES (2-3 with 🍃 emojis) === */}
      {/* Leaf 1 - left, small */}
      <g>
        <path d="M260 210 Q245 195 235 180 Q250 185 265 195 Z"
          fill="url(#leafSurface)" />
        <path d="M260 210 Q245 195 235 180 Q250 185 265 195 Z"
          fill="url(#leafSheen)" />
        <path d="M260 210 Q250 198 243 188" stroke="hsl(135, 35%, 35%)" strokeWidth="0.8" fill="none" />
        {sunlightActive && (
          <path d="M248 195 Q252 190 258 192"
            fill="none" stroke="hsl(55, 70%, 70%)" strokeWidth="3" opacity="0.12"
            className="animate-pulse-glow" strokeLinecap="round" />
        )}
        <text x="228" y="175" fontSize="14">🍃</text>
      </g>

      {/* Leaf 2 - right, small */}
      <g>
        <path d="M340 210 Q355 195 365 180 Q350 185 335 195 Z"
          fill="url(#leafSurface)" />
        <path d="M340 210 Q355 195 365 180 Q350 185 335 195 Z"
          fill="url(#leafSheen)" />
        <path d="M340 210 Q350 198 357 188" stroke="hsl(135, 35%, 35%)" strokeWidth="0.8" fill="none" />
        {sunlightActive && (
          <path d="M352 195 Q348 190 342 192"
            fill="none" stroke="hsl(55, 70%, 70%)" strokeWidth="3" opacity="0.12"
            className="animate-pulse-glow" strokeLinecap="round" />
        )}
        <text x="362" y="175" fontSize="14">🍃</text>
      </g>

      {/* Leaf 3 - top center, slightly larger */}
      <g>
        <path d="M288 205 Q270 178 258 158 Q280 168 295 182 Z"
          fill="url(#leafSurface)" />
        <path d="M288 205 Q270 178 258 158 Q280 168 295 182 Z"
          fill="url(#leafSheen)" />
        <path d="M312 205 Q330 178 342 158 Q320 168 305 182 Z"
          fill="url(#leafSurface)" />
        <path d="M312 205 Q330 178 342 158 Q320 168 305 182 Z"
          fill="url(#leafSheen)" />
        {/* Midrib */}
        <path d="M288 205 Q275 185 265 165" stroke="hsl(135, 35%, 35%)" strokeWidth="0.8" fill="none" />
        <path d="M312 205 Q325 185 335 165" stroke="hsl(135, 35%, 35%)" strokeWidth="0.8" fill="none" />
        {sunlightActive && (
          <path d="M278 180 Q290 172 310 172 Q322 174 330 180"
            fill="none" stroke="hsl(55, 70%, 70%)" strokeWidth="4" opacity="0.1"
            className="animate-pulse-glow" strokeLinecap="round" />
        )}
        <text x="293" y="152" fontSize="16">🍃</text>
      </g>

      {/* Chloroplasts in leaves - small dots */}
      {[
        [248, 192], [252, 188], [256, 195],
        [352, 192], [348, 188], [344, 195],
        [275, 182], [282, 178], [318, 178], [325, 182],
      ].map(([cx, cy], i) => (
        <ellipse key={`chl-${i}`} cx={cx} cy={cy} rx="2.5" ry="1.5"
          fill="hsl(140, 50%, 38%)" opacity="0.4" />
      ))}

      {/* Stomata on bottom of leaves */}
      {[260, 300, 340].map((x, i) => (
        <g key={`stoma-${i}`}>
          <path d={`M${x-3} ${212+i} Q${x} ${210+i} ${x+3} ${212+i}`}
            stroke="hsl(135, 40%, 35%)" strokeWidth="0.8" fill="none" />
          <path d={`M${x-3} ${213+i} Q${x} ${215+i} ${x+3} ${213+i}`}
            stroke="hsl(135, 40%, 35%)" strokeWidth="0.8" fill="none" />
          <ellipse cx={x} cy={212.5+i} rx="1.5" ry="0.8" fill="hsl(140, 30%, 25%)" opacity="0.5" />
        </g>
      ))}
      {co2Active && (
        <text x="352" y="228" fontSize="7.5" fill="hsl(150, 10%, 40%)" fontStyle="italic">Stomata</text>
      )}

      {/* === CO₂ entering stomata === */}
      {co2Active && (
        <g>
          {[
            { x: 260, y: 230, delay: 0 },
            { x: 300, y: 235, delay: 0.8 },
            { x: 340, y: 228, delay: 1.5 },
          ].map((mol, i) => (
            <g key={`co2-${i}`} className="animate-drift" style={{ animationDelay: `${mol.delay}s` }}>
              <circle cx={mol.x - 6} cy={mol.y} r="2.5" fill="hsl(0, 58%, 48%)" opacity="0.75" />
              <circle cx={mol.x} cy={mol.y} r="3" fill="hsl(0, 0%, 28%)" opacity="0.8" />
              <circle cx={mol.x + 6} cy={mol.y} r="2.5" fill="hsl(0, 58%, 48%)" opacity="0.75" />
              <text x={mol.x - 7} y={mol.y + 11} fontSize="6" fill="hsl(0, 0%, 40%)" fontWeight="500">CO₂</text>
            </g>
          ))}
        </g>
      )}
    </g>
  );
};

export default Plant;
