import React from "react";

interface SunProps {
  active: boolean;
}

const Sun: React.FC<SunProps> = ({ active }) => {
  return (
    <g>
      <defs>
        <radialGradient id="sunBody" cx="42%" cy="40%">
          <stop offset="0%" stopColor="hsl(52, 100%, 92%)" />
          <stop offset="30%" stopColor="hsl(48, 98%, 72%)" />
          <stop offset="70%" stopColor="hsl(42, 95%, 58%)" />
          <stop offset="100%" stopColor="hsl(35, 80%, 48%)" />
        </radialGradient>
        <radialGradient id="sunAura1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="hsl(48, 90%, 78%)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="hsl(45, 85%, 70%)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="hsl(45, 80%, 65%)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sunAura2" cx="50%" cy="50%">
          <stop offset="0%" stopColor="hsl(50, 95%, 85%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(50, 90%, 80%)" stopOpacity="0" />
        </radialGradient>
        <filter id="sunSoftGlow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <circle cx="78" cy="58" r={active ? 70 : 50}
        fill="url(#sunAura2)"
        className="transition-all duration-1500"
      />
      <circle cx="78" cy="58" r={active ? 52 : 40}
        fill="url(#sunAura1)"
        className="transition-all duration-1000"
      />
      <circle cx="78" cy="58" r="26" fill="hsl(50, 100%, 85%)" opacity={active ? 0.5 : 0.2}
        filter="url(#sunSoftGlow)" className="transition-opacity duration-700" />
      <circle cx="78" cy="58" r="24" fill="url(#sunBody)" />
      <ellipse cx="72" cy="50" rx="8" ry="6" fill="hsl(54, 100%, 95%)" opacity={active ? 0.55 : 0.25} />

      {active && (
        <g>
          {[
            { x1: 102, y1: 68, x2: 260, y2: 155, w: 1.8, d: 0 },
            { x1: 100, y1: 75, x2: 240, y2: 175, w: 1.4, d: 0.4 },
            { x1: 97, y1: 80, x2: 220, y2: 185, w: 1.2, d: 0.8 },
            { x1: 104, y1: 62, x2: 290, y2: 148, w: 1.0, d: 1.2 },
            { x1: 95, y1: 84, x2: 200, y2: 192, w: 0.8, d: 1.5 },
          ].map((beam, i) => (
            <line key={i}
              x1={beam.x1} y1={beam.y1} x2={beam.x2} y2={beam.y2}
              stroke="hsl(48, 80%, 72%)" strokeWidth={beam.w}
              opacity="0.18" className="animate-beam"
              style={{ animationDelay: `${beam.d}s` }}
            />
          ))}
          <polygon points="102,68 290,140 200,200 95,84"
            fill="hsl(48, 80%, 72%)" opacity="0.04" />
        </g>
      )}
    </g>
  );
};

export default Sun;
