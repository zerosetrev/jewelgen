"use client";

import { BaseType, BASE_OPTIONS } from "@/data/beads";

interface BaseSelectorProps {
  selected: BaseType;
  onSelect: (base: BaseType) => void;
}

export function BaseSelector({ selected, onSelect }: BaseSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
        Base
      </h3>
      <div className="flex flex-col gap-1.5">
        {BASE_OPTIONS.map((base) => {
          const isSelected = selected.id === base.id;
          return (
            <button
              key={base.id}
              onClick={() => onSelect(base)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-left"
              style={{
                background: isSelected ? "var(--bg4)" : "transparent",
                border: "1.5px solid",
                borderColor: isSelected ? "var(--gold)" : "var(--border)",
              }}
            >
              {/* Strand preview */}
              <div className="flex items-center justify-center w-8 h-8">
                <div
                  className="rounded-full"
                  style={{
                    width: 24,
                    height: base.thickness + 2,
                    background: base.colour,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
              <span className="text-sm" style={{ color: isSelected ? "var(--tx)" : "var(--tx2)" }}>
                {base.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
