"use client";

import { BeadType, BaseType } from "@/data/beads";

interface NecklaceCanvasProps {
  beads: (BeadType | null)[];
  base: BaseType;
  slotCount: number;
  onDropBead: (index: number) => void;
  onRemoveBead: (index: number) => void;
  draggedBead: BeadType | null;
}

function getPointOnArc(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  startAngle: number,
  endAngle: number,
  t: number
): { x: number; y: number } {
  const angle = startAngle + (endAngle - startAngle) * t;
  return {
    x: cx + rx * Math.cos(angle),
    y: cy + ry * Math.sin(angle),
  };
}

export function NecklaceCanvas({
  beads,
  base,
  slotCount,
  onDropBead,
  onRemoveBead,
  draggedBead,
}: NecklaceCanvasProps) {
  const width = 480;
  const height = 320;
  const cx = width / 2;
  const cy = 20;
  const rx = 195;
  const ry = 200;

  // Wide U-shape necklace drape
  const startAngle = 0.12 * Math.PI;
  const endAngle = 0.88 * Math.PI;

  const slots = Array.from({ length: slotCount }, (_, i) => {
    const t = (i + 0.5) / slotCount;
    return getPointOnArc(cx, cy, rx, ry, startAngle, endAngle, t);
  });

  // Build the strand path
  const pathPoints = Array.from({ length: 60 }, (_, i) => {
    const t = i / 59;
    return getPointOnArc(cx, cy, rx, ry, startAngle, endAngle, t);
  });
  const pathD =
    `M ${pathPoints[0].x} ${pathPoints[0].y} ` +
    pathPoints
      .slice(1)
      .map((p) => `L ${p.x} ${p.y}`)
      .join(" ");

  // Clasp endpoints
  const leftEnd = getPointOnArc(cx, cy, rx, ry, startAngle, endAngle, 0);
  const rightEnd = getPointOnArc(cx, cy, rx, ry, startAngle, endAngle, 1);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[480px]"
        style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.06))" }}
      >
        {/* Background subtle gradient */}
        <defs>
          <radialGradient id="canvas-glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#f5f3ef" />
            <stop offset="100%" stopColor="#faf9f7" stopOpacity="0" />
          </radialGradient>
          <filter id="bead-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.15" />
          </filter>
          <filter id="bead-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#c9a96e" floodOpacity="0.3" />
          </filter>
        </defs>

        <ellipse cx={cx} cy={cy + 150} rx={180} ry={120} fill="url(#canvas-glow)" />

        {/* Strand */}
        <path
          d={pathD}
          fill="none"
          stroke={base.colour}
          strokeWidth={base.thickness + 0.5}
          strokeLinecap="round"
          opacity={0.6}
        />

        {/* Clasp indicators */}
        <circle cx={leftEnd.x} cy={leftEnd.y} r={4} fill={base.colour} opacity={0.8} />
        <circle cx={rightEnd.x} cy={rightEnd.y} r={4} fill={base.colour} opacity={0.8} />

        {/* Bead slots */}
        {slots.map((pos, i) => {
          const bead = beads[i];
          const beadRadius = bead ? (bead.size / 10) * 14 : 10;

          return (
            <g key={i} className="bead-slot" style={{ cursor: "pointer" }}>
              {/* Drop target */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={14}
                fill="transparent"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  onDropBead(i);
                }}
                onClick={() => {
                  if (bead) {
                    onRemoveBead(i);
                  } else if (draggedBead) {
                    onDropBead(i);
                  }
                }}
              />

              {bead ? (
                <>
                  {/* Bead */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={beadRadius}
                    fill={bead.colour}
                    filter="url(#bead-shadow)"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={0.5}
                  />
                  {/* Highlight */}
                  <ellipse
                    cx={pos.x - beadRadius * 0.25}
                    cy={pos.y - beadRadius * 0.3}
                    rx={beadRadius * 0.35}
                    ry={beadRadius * 0.25}
                    fill="rgba(255,255,255,0.25)"
                    transform={`rotate(-20 ${pos.x} ${pos.y})`}
                  />
                  {/* Hole */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={1.5}
                    fill="rgba(0,0,0,0.2)"
                  />
                </>
              ) : (
                <>
                  {/* Empty slot */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={10}
                    fill="none"
                    stroke="var(--border2)"
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                    opacity={draggedBead ? 0.8 : 0.4}
                  />
                  {draggedBead && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={12}
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth={1}
                      opacity={0.4}
                      filter="url(#bead-glow)"
                    />
                  )}
                </>
              )}
            </g>
          );
        })}

        {/* Label */}
        <text
          x={cx}
          y={height - 20}
          textAnchor="middle"
          fill="var(--tx3)"
          fontSize="12"
          fontFamily="Inter, system-ui, sans-serif"
        >
          {beads.filter(Boolean).length} / {slotCount} beads
        </text>
      </svg>
    </div>
  );
}
