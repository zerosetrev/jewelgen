"use client";

import { useState, useCallback } from "react";
import { BeadType, BEAD_CATALOGUE, BASE_OPTIONS, FINISH_OPTIONS } from "@/data/beads";
import { NecklaceCanvas } from "@/components/NecklaceCanvas";
import { BeadPalette } from "@/components/BeadPalette";
import { BaseSelector } from "@/components/BaseSelector";
import { FinishSelector } from "@/components/FinishSelector";
import { DesignerToolbar } from "@/components/DesignerToolbar";

type SidePanel = "beads" | "base" | "finish";

export default function Home() {
  const [slotCount, setSlotCount] = useState(20);
  const [beads, setBeads] = useState<(BeadType | null)[]>(Array(20).fill(null));
  const [selectedBead, setSelectedBead] = useState<BeadType | null>(null);
  const [base, setBase] = useState(BASE_OPTIONS[0]);
  const [finish, setFinish] = useState(FINISH_OPTIONS[0]);
  const [activePanel, setActivePanel] = useState<SidePanel>("beads");

  const handleSlotCountChange = useCallback(
    (count: number) => {
      setSlotCount(count);
      setBeads((prev) => {
        if (count > prev.length) {
          return [...prev, ...Array(count - prev.length).fill(null)];
        }
        return prev.slice(0, count);
      });
    },
    []
  );

  const handleDropBead = useCallback(
    (index: number) => {
      if (!selectedBead) return;
      setBeads((prev) => {
        const next = [...prev];
        next[index] = selectedBead;
        return next;
      });
    },
    [selectedBead]
  );

  const handleRemoveBead = useCallback((index: number) => {
    setBeads((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  const handleClear = useCallback(() => {
    setBeads(Array(slotCount).fill(null));
  }, [slotCount]);

  const handleFillRandom = useCallback(() => {
    setBeads(
      Array.from({ length: slotCount }, () => {
        return BEAD_CATALOGUE[Math.floor(Math.random() * BEAD_CATALOGUE.length)];
      })
    );
  }, [slotCount]);

  const beadCount = beads.filter(Boolean).length;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{
          background: "var(--bg3)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--gold), var(--gold-dark))",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="4" r="2.5" fill="white" opacity="0.9" />
              <circle cx="4" cy="10" r="2" fill="white" opacity="0.7" />
              <circle cx="12" cy="10" r="2" fill="white" opacity="0.7" />
              <circle cx="8" cy="13" r="1.5" fill="white" opacity="0.5" />
            </svg>
          </div>
          <h1
            className="text-xl font-semibold tracking-wide"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif", color: "var(--tx)" }}
          >
            JewelGen
          </h1>
        </div>

        <p className="text-xs" style={{ color: "var(--tx3)" }}>
          Design your necklace
        </p>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 65px)" }}>
        {/* Side panel */}
        <aside
          className="w-[280px] flex flex-col border-r overflow-hidden"
          style={{
            background: "var(--bg3)",
            borderColor: "var(--border)",
          }}
        >
          {/* Panel tabs */}
          <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
            {(
              [
                { id: "beads", label: "Beads" },
                { id: "base", label: "Base" },
                { id: "finish", label: "Finish" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id)}
                className="flex-1 py-3 text-xs font-medium transition-all"
                style={{
                  color: activePanel === tab.id ? "var(--gold-dark)" : "var(--tx3)",
                  borderBottom: "2px solid",
                  borderColor: activePanel === tab.id ? "var(--gold)" : "transparent",
                  background: activePanel === tab.id ? "var(--bg)" : "transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activePanel === "beads" && (
              <BeadPalette onSelectBead={setSelectedBead} selectedBead={selectedBead} />
            )}
            {activePanel === "base" && <BaseSelector selected={base} onSelect={setBase} />}
            {activePanel === "finish" && <FinishSelector selected={finish} onSelect={setFinish} />}
          </div>

          {/* Selected bead indicator */}
          {selectedBead && (
            <div
              className="flex items-center gap-3 px-4 py-3 border-t"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg2)",
              }}
            >
              <div
                className="w-6 h-6 rounded-full flex-shrink-0"
                style={{
                  background: selectedBead.colour,
                  boxShadow: "inset -1px -1px 3px rgba(0,0,0,0.15)",
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{selectedBead.name}</p>
                <p className="text-[10px]" style={{ color: "var(--tx3)" }}>
                  {selectedBead.material} &middot; {selectedBead.size}mm &mdash; Click slots to place
                </p>
              </div>
              <button
                onClick={() => setSelectedBead(null)}
                className="text-xs px-2 py-1 rounded-lg"
                style={{ background: "var(--bg3)", color: "var(--tx3)" }}
              >
                Deselect
              </button>
            </div>
          )}
        </aside>

        {/* Canvas area */}
        <main className="flex-1 flex flex-col items-center justify-start px-6 py-3 gap-3 overflow-y-auto">
          <DesignerToolbar
            slotCount={slotCount}
            onSlotCountChange={handleSlotCountChange}
            onClear={handleClear}
            onFillRandom={handleFillRandom}
            beadCount={beadCount}
          />

          <NecklaceCanvas
            beads={beads}
            base={base}
            slotCount={slotCount}
            onDropBead={handleDropBead}
            onRemoveBead={handleRemoveBead}
            draggedBead={selectedBead}
          />

          {/* Summary bar */}
          <div
            className="flex items-center gap-6 px-6 py-3 rounded-2xl text-xs"
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
              color: "var(--tx2)",
            }}
          >
            <span>
              <strong style={{ color: "var(--tx)" }}>Base:</strong> {base.name}
            </span>
            <span style={{ color: "var(--border2)" }}>|</span>
            <span>
              <strong style={{ color: "var(--tx)" }}>Beads:</strong> {beadCount} / {slotCount}
            </span>
            <span style={{ color: "var(--border2)" }}>|</span>
            <span>
              <strong style={{ color: "var(--tx)" }}>Finish:</strong> {finish.name}
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
