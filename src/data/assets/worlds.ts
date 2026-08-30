export interface WorldDefinition {
  id: string;
  name: string;
  pantheon: 'greek' | 'norse' | 'egyptian';
  tagline: string;
  description: string;
  accentColor: string;
  theme: {
    bgGradient: string;
    particleType: 'sparks' | 'snow' | 'sand';
    particleColor: string;
  };
  locations: {
    id: string;
    name: string;
    type: 'temple' | 'arena' | 'sanctuary' | 'gate' | 'hall';
    description: string;
    characterId?: string;
    coords: { x: number; y: number }; // percentage position on 2D map
  }[];
}

export const worldDefinitions: Record<string, WorldDefinition> = {
  greek: {
    id: 'greek',
    name: 'Mount Olympus',
    pantheon: 'greek',
    tagline: 'Realm of the Twelve Olympians',
    description: 'A divine sanctuary of white marble columns, soaring summits, and crackling celestial thunder.',
    accentColor: '#f59e0b',
    theme: {
      bgGradient: 'from-amber-950/40 via-neutral-950 to-neutral-950',
      particleType: 'sparks',
      particleColor: 'rgba(245, 158, 11, 0.4)',
    },
    locations: [
      { id: 'temple_zeus', name: 'Temple of Zeus', type: 'temple', description: 'The grand golden throne room of the Thunderer.', characterId: 'char_zeus', coords: { x: 50, y: 30 } },
      { id: 'athena_sanctuary', name: "Athena's Sanctuary", type: 'sanctuary', description: 'Sacred grove of wisdom and strategist council.', characterId: 'char_athena', coords: { x: 25, y: 55 } },
      { id: 'olympian_arena', name: 'Olympian Arena', type: 'arena', description: 'Proving ground for mythic gladiators.', coords: { x: 75, y: 60 } },
      { id: 'divine_hall', name: 'Divine Hall of Records', type: 'hall', description: 'Archive of scroll lore and ancient prophecies.', coords: { x: 50, y: 75 } },
    ],
  },
  norse: {
    id: 'norse',
    name: 'Asgard & Midgard',
    pantheon: 'norse',
    tagline: 'The Nine Realms & The Bifröst',
    description: 'A frost-bound realm of aurora skies, rune-carved stones, and heroic battle halls.',
    accentColor: '#3b82f6',
    theme: {
      bgGradient: 'from-blue-950/40 via-neutral-950 to-neutral-950',
      particleType: 'snow',
      particleColor: 'rgba(147, 197, 253, 0.5)',
    },
    locations: [
      { id: 'bifrost_gate', name: 'Bifröst Gate', type: 'gate', description: 'Rainbow bridge guarded by Heimdall.', coords: { x: 20, y: 35 } },
      { id: 'valhalla', name: 'Hall of Valhalla', type: 'hall', description: 'Feasting hall of the honored slain.', characterId: 'char_odin', coords: { x: 50, y: 25 } },
      { id: 'thrudvang', name: "Thor's Forge", type: 'sanctuary', description: 'Thunderous forge where Mjölnir rests.', characterId: 'char_thor', coords: { x: 80, y: 50 } },
      { id: 'warrior_grounds', name: 'Midgard Barrow Grounds', type: 'arena', description: 'Frozen plains infested with draugr.', coords: { x: 45, y: 70 } },
    ],
  },
  egyptian: {
    id: 'egyptian',
    name: 'The Duat & Nile Valley',
    pantheon: 'egyptian',
    tagline: 'Land of Pyramids & Weighing of Hearts',
    description: 'Golden desert dunes under a scorching sun leading to the shadowy gates of the Underworld.',
    accentColor: '#10b981',
    theme: {
      bgGradient: 'from-emerald-950/40 via-neutral-950 to-neutral-950',
      particleType: 'sand',
      particleColor: 'rgba(52, 211, 153, 0.4)',
    },
    locations: [
      { id: 'temple_anubis', name: 'Temple of Anubis', type: 'temple', description: 'Jackal shrine of mummification and embalming rites.', characterId: 'char_anubis', coords: { x: 30, y: 40 } },
      { id: 'judgment_hall', name: 'Hall of Judgment', type: 'hall', description: 'Where hearts are weighed against Maat’s feather.', characterId: 'char_osiris', coords: { x: 70, y: 30 } },
      { id: 'nile_bank', name: 'Nile River Delta', type: 'sanctuary', description: 'Lush papyrus banks guarded by Sobek.', coords: { x: 50, y: 65 } },
      { id: 'ra_barque', name: 'Solar Barque Arena', type: 'arena', description: 'Prow of Ra’s sun ship fighting Apep.', coords: { x: 80, y: 70 } },
    ],
  },
};
