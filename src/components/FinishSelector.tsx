"use client";

import { FinishType, FINISH_OPTIONS } from "@/data/beads";

interface FinishSelectorProps {
  selected: FinishType;
  onSelect: (finish: FinishType) => void;
}

export function FinishSelector({ selected, onSelect }: FinishSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
        Finish
      </h3>
      <div className="flex flex-col gap-1.5">
        {FINISH_OPTIONS.map((finish) => {
          const isSelected = selected.id === finish.id;
          return (
            <button
              key={finish.id}
              onClick={() => onSelect(finish)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-left"
              style={{
                background: isSelected ? "var(--bg4)" : "transparent",
                border: "1.5px solid",
                borderColor: isSelected ? "var(--gold)" : "var(--border)",
              }}
            >
              <span className="text-lg w-8 text-center">{finish.icon}</span>
              <span className="text-sm" style={{ color: isSelected ? "var(--tx)" : "var(--tx2)" }}>
                {finish.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
