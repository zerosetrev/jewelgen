"use client";

import { useState } from "react";
import { BeadType, BEAD_CATALOGUE, CATEGORIES } from "@/data/beads";

interface BeadPaletteProps {
  onSelectBead: (bead: BeadType) => void;
  selectedBead: BeadType | null;
}

export function BeadPalette({ onSelectBead, selectedBead }: BeadPaletteProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? BEAD_CATALOGUE
      : BEAD_CATALOGUE.filter((b) => b.category === activeCategory);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
        Beads
      </h3>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="px-3 py-1 text-xs rounded-full transition-all"
            style={{
              background: activeCategory === cat.id ? "var(--gold)" : "var(--bg2)",
              color: activeCategory === cat.id ? "#fff" : "var(--tx2)",
              border: "1px solid",
              borderColor: activeCategory === cat.id ? "var(--gold)" : "var(--border)",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Bead grid */}
      <div className="grid grid-cols-4 gap-2 max-h-[400px] overflow-y-auto pr-1">
        {filtered.map((bead) => {
          const isSelected = selectedBead?.id === bead.id;
          return (
            <button
              key={bead.id}
              onClick={() => onSelectBead(bead)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("bead-id", bead.id);
                onSelectBead(bead);
              }}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all"
              style={{
                background: isSelected ? "var(--bg4)" : "transparent",
                border: "2px solid",
                borderColor: isSelected ? "var(--gold)" : "transparent",
              }}
              title={`${bead.name} — ${bead.material}, ${bead.size}mm`}
            >
              {/* Bead preview */}
              <div className="relative">
                <div
                  className="rounded-full"
                  style={{
                    width: 32,
                    height: 32,
                    background: bead.colour,
                    boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.15), inset 2px 2px 4px rgba(255,255,255,0.2)",
                  }}
                />
                {/* Highlight */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 10,
                    height: 7,
                    top: 6,
                    left: 8,
                    background: "rgba(255,255,255,0.25)",
                    transform: "rotate(-20deg)",
                  }}
                />
              </div>
              <span className="text-[10px] leading-tight text-center" style={{ color: "var(--tx2)" }}>
                {bead.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
