export interface BeadType {
  id: string;
  name: string;
  colour: string;
  size: number; // diameter in mm (visual only)
  material: string;
  category: "glass" | "crystal" | "stone" | "ceramic" | "wood" | "metal" | "pearl";
  pattern?: string; // optional SVG pattern id
}

export interface BaseType {
  id: string;
  name: string;
  colour: string;
  thickness: number;
}

export interface FinishType {
  id: string;
  name: string;
  icon: string;
}

export const BEAD_CATALOGUE: BeadType[] = [
  // Glass
  { id: "glass-ruby", name: "Ruby Red", colour: "#c23b3b", size: 8, material: "Glass", category: "glass" },
  { id: "glass-cobalt", name: "Cobalt Blue", colour: "#2b4c9b", size: 8, material: "Glass", category: "glass" },
  { id: "glass-emerald", name: "Emerald", colour: "#2d8a5e", size: 8, material: "Glass", category: "glass" },
  { id: "glass-amber", name: "Amber", colour: "#d4a030", size: 8, material: "Glass", category: "glass" },
  { id: "glass-clear", name: "Clear", colour: "#d4dce8", size: 8, material: "Glass", category: "glass" },
  { id: "glass-black", name: "Obsidian", colour: "#1a1a1a", size: 8, material: "Glass", category: "glass" },
  { id: "glass-pink", name: "Rose", colour: "#d4789c", size: 8, material: "Glass", category: "glass" },
  { id: "glass-teal", name: "Teal", colour: "#2a8a8a", size: 8, material: "Glass", category: "glass" },

  // Crystal
  { id: "crystal-aurora", name: "Aurora", colour: "#a8c4e0", size: 6, material: "Crystal", category: "crystal" },
  { id: "crystal-champagne", name: "Champagne", colour: "#d4c4a0", size: 6, material: "Crystal", category: "crystal" },
  { id: "crystal-violet", name: "Violet", colour: "#8b5dc8", size: 6, material: "Crystal", category: "crystal" },
  { id: "crystal-peridot", name: "Peridot", colour: "#9ab83c", size: 6, material: "Crystal", category: "crystal" },
  { id: "crystal-topaz", name: "Topaz", colour: "#d4944a", size: 6, material: "Crystal", category: "crystal" },
  { id: "crystal-ice", name: "Ice", colour: "#c8e0f0", size: 6, material: "Crystal", category: "crystal" },

  // Stone
  { id: "stone-lapis", name: "Lapis Lazuli", colour: "#1e3a6d", size: 10, material: "Stone", category: "stone" },
  { id: "stone-turquoise", name: "Turquoise", colour: "#48a9a6", size: 10, material: "Stone", category: "stone" },
  { id: "stone-rose-quartz", name: "Rose Quartz", colour: "#e8b4c8", size: 10, material: "Stone", category: "stone" },
  { id: "stone-tigers-eye", name: "Tiger's Eye", colour: "#9a6b2c", size: 10, material: "Stone", category: "stone" },
  { id: "stone-amethyst", name: "Amethyst", colour: "#7b4ea0", size: 10, material: "Stone", category: "stone" },
  { id: "stone-onyx", name: "Onyx", colour: "#0d0d0d", size: 10, material: "Stone", category: "stone" },
  { id: "stone-jade", name: "Jade", colour: "#5a9a6a", size: 10, material: "Stone", category: "stone" },
  { id: "stone-moonstone", name: "Moonstone", colour: "#c8d0e0", size: 10, material: "Stone", category: "stone" },

  // Ceramic
  { id: "ceramic-white", name: "Porcelain", colour: "#f0ebe0", size: 8, material: "Ceramic", category: "ceramic" },
  { id: "ceramic-cobalt", name: "Delft Blue", colour: "#3a5ea0", size: 8, material: "Ceramic", category: "ceramic" },
  { id: "ceramic-terracotta", name: "Terracotta", colour: "#c27a50", size: 8, material: "Ceramic", category: "ceramic" },
  { id: "ceramic-sage", name: "Sage", colour: "#98a888", size: 8, material: "Ceramic", category: "ceramic" },

  // Wood
  { id: "wood-oak", name: "Oak", colour: "#8a6a3a", size: 10, material: "Wood", category: "wood" },
  { id: "wood-ebony", name: "Ebony", colour: "#2a1a0a", size: 10, material: "Wood", category: "wood" },
  { id: "wood-maple", name: "Maple", colour: "#c4a060", size: 10, material: "Wood", category: "wood" },
  { id: "wood-rosewood", name: "Rosewood", colour: "#6a2a2a", size: 10, material: "Wood", category: "wood" },

  // Metal
  { id: "metal-gold", name: "Gold", colour: "#c9a96e", size: 6, material: "Metal", category: "metal" },
  { id: "metal-silver", name: "Silver", colour: "#b8b8b8", size: 6, material: "Metal", category: "metal" },
  { id: "metal-copper", name: "Copper", colour: "#b87333", size: 6, material: "Metal", category: "metal" },
  { id: "metal-bronze", name: "Bronze", colour: "#8a6e3a", size: 6, material: "Metal", category: "metal" },

  // Pearl
  { id: "pearl-white", name: "White Pearl", colour: "#f0e8d8", size: 8, material: "Pearl", category: "pearl" },
  { id: "pearl-cream", name: "Cream Pearl", colour: "#e8dcc8", size: 8, material: "Pearl", category: "pearl" },
  { id: "pearl-black", name: "Black Pearl", colour: "#2a2a30", size: 8, material: "Pearl", category: "pearl" },
  { id: "pearl-pink", name: "Pink Pearl", colour: "#e8c4c8", size: 8, material: "Pearl", category: "pearl" },
];

export const BASE_OPTIONS: BaseType[] = [
  { id: "silk", name: "Silk Thread", colour: "#e8dcc8", thickness: 1 },
  { id: "wire-gold", name: "Gold Wire", colour: "#c9a96e", thickness: 1.5 },
  { id: "wire-silver", name: "Silver Wire", colour: "#b8b8b8", thickness: 1.5 },
  { id: "leather-brown", name: "Brown Leather", colour: "#6a4a2a", thickness: 2 },
  { id: "leather-black", name: "Black Leather", colour: "#1a1a1a", thickness: 2 },
  { id: "cord-cotton", name: "Cotton Cord", colour: "#d4cfc7", thickness: 1.5 },
  { id: "chain-gold", name: "Gold Chain", colour: "#c9a96e", thickness: 1 },
  { id: "chain-silver", name: "Silver Chain", colour: "#b8b8b8", thickness: 1 },
];

export const FINISH_OPTIONS: FinishType[] = [
  { id: "lobster-gold", name: "Gold Lobster Clasp", icon: "🔗" },
  { id: "lobster-silver", name: "Silver Lobster Clasp", icon: "🔗" },
  { id: "toggle-gold", name: "Gold Toggle", icon: "⭕" },
  { id: "toggle-silver", name: "Silver Toggle", icon: "⭕" },
  { id: "magnetic-gold", name: "Gold Magnetic", icon: "🧲" },
  { id: "magnetic-silver", name: "Silver Magnetic", icon: "🧲" },
  { id: "knot", name: "Knotted End", icon: "🪢" },
];

export const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "glass", name: "Glass" },
  { id: "crystal", name: "Crystal" },
  { id: "stone", name: "Stone" },
  { id: "ceramic", name: "Ceramic" },
  { id: "wood", name: "Wood" },
  { id: "metal", name: "Metal" },
  { id: "pearl", name: "Pearl" },
] as const;
