"use client";

interface DesignerToolbarProps {
  slotCount: number;
  onSlotCountChange: (count: number) => void;
  onClear: () => void;
  onFillRandom: () => void;
  beadCount: number;
}

export function DesignerToolbar({
  slotCount,
  onSlotCountChange,
  onClear,
  onFillRandom,
  beadCount,
}: DesignerToolbarProps) {
  return (
    <div
      className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl"
      style={{
        background: "var(--bg3)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Slot count slider */}
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium" style={{ color: "var(--tx3)" }}>
          Beads
        </label>
        <input
          type="range"
          min={8}
          max={40}
          step={1}
          value={slotCount}
          onChange={(e) => onSlotCountChange(Number(e.target.value))}
          className="w-24 accent-[var(--gold)]"
        />
        <span className="text-sm font-medium tabular-nums w-6 text-center">{slotCount}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onFillRandom}
          className="px-4 py-1.5 text-xs rounded-full transition-all"
          style={{
            background: "var(--bg2)",
            color: "var(--tx2)",
            border: "1px solid var(--border)",
          }}
        >
          Surprise Me
        </button>
        <button
          onClick={onClear}
          disabled={beadCount === 0}
          className="px-4 py-1.5 text-xs rounded-full transition-all disabled:opacity-30"
          style={{
            background: "var(--bg2)",
            color: "var(--tx2)",
            border: "1px solid var(--border)",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
