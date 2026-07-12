'use client';

import React, { use, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { mythologyDb, RealmEntity } from '@/data/seed';
import { audioEngine } from '@/utils/audioEngine';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  ArrowLeft, 
  Compass, 
  Info, 
  AlertTriangle,
  Zap,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ pantheon: string }>;
}

interface MapNode {
  id: string;
  name: string;
  x: number; // percentage coordinates for SVG placement
  y: number;
  description: string;
  levelReq: number;
  sublocations: string[];
}

const mapNodesData: { [key in 'greek' | 'norse' | 'egyptian']: MapNode[] } = {
  greek: [
    { id: 'mount_olympus', name: 'Mount Olympus', x: 50, y: 15, description: 'Celestial palace abode of the twelve Olympian gods.', levelReq: 10, sublocations: ['Throne of Zeus', 'Forge of Hephaestus'] },
    { id: 'delphi', name: 'Delphi Oracle', x: 25, y: 40, description: 'The Omphalos, sanctuary of Apollo and his Pythian Oracle.', levelReq: 1, sublocations: ['Apollo\'s Column', 'Castalian Spring'] },
    { id: 'troy', name: 'Troy Walled City', x: 75, y: 45, description: 'The legendary fortress besieged by the Greek coalition.', levelReq: 8, sublocations: ['Scaean Gate', 'Scamander Field'] },
    { id: 'crete_labyrinth', name: 'Crete Labyrinth', x: 50, y: 70, description: 'The stone maze housing Asterius the Minotaur.', levelReq: 5, sublocations: ['Outer Knossos Rings', 'Minotaur Lair'] },
    { id: 'greek_underworld', name: 'The Underworld', x: 20, y: 75, description: 'Dark kingdom of the dead ruled by Hades.', levelReq: 12, sublocations: ['River Styx', 'Elysium Fields', 'Tartarus'] }
  ],
  norse: [
    { id: 'asgard', name: 'Asgard Citadel', x: 50, y: 15, description: 'Citadel of the Aesir gods, linked by Bifröst bridge.', levelReq: 10, sublocations: ['Bifröst Gate', 'Gladsheim Hall'] },
    { id: 'valhalla', name: 'Valhalla', x: 22, y: 35, description: 'The golden hall of Odin where the heroic Einherjar feast.', levelReq: 10, sublocations: ['Shield Gate', 'Grand Feast Hall'] },
    { id: 'midgard', name: 'Midgard Coast', x: 50, y: 50, description: 'The human mortal lands protected by the World Serpent.', levelReq: 1, sublocations: ['Viking Outpost', 'Urdr\'s Well'] },
    { id: 'jotunheim', name: 'Jotunheim Peaks', x: 78, y: 40, description: 'Wild mountain stronghold of Frost and Rock Giants.', levelReq: 8, sublocations: ['Utgard Gate', 'Mimir\'s Well'] },
    { id: 'helheim', name: 'Helheim Crypts', x: 50, y: 82, description: 'Misty frozen underground barrows ruled by Loki\'s daughter Hel.', levelReq: 12, sublocations: ['Gjallarbru Bridge', 'Eljudnir Hall'] }
  ],
  egyptian: [
    { id: 'heliopolis', name: 'Heliopolis Obelisk', x: 50, y: 18, description: 'Sanctuary of Ra where the primeval Benben stone rose.', levelReq: 1, sublocations: ['Benben Mound', 'Ished Tree'] },
    { id: 'desert_of_set', name: 'Desert of Set', x: 20, y: 45, description: 'Barren dunes of sandstorms, scorpions, and chaos deities.', levelReq: 7, sublocations: ['Obsidian Canyon', 'Set\'s Oasis'] },
    { id: 'abydos', name: 'Abydos Tomb', x: 80, y: 50, description: 'Sacred burial shrine housing the mystical head of Osiris.', levelReq: 4, sublocations: ['Temple of Seti', 'Osireion Pools'] },
    { id: 'egyptian_duat', name: 'The Duat Gates', x: 50, y: 78, description: 'Netherworld path of night guarded by twelve gate demons.', levelReq: 12, sublocations: ['First Night Gate', 'Hall of Two Truths'] },
    { id: 'field_of_reeds', name: 'Field of Reeds', x: 80, y: 80, description: 'Heavenly agricultural paradise representing a perfect Egypt.', levelReq: 1, sublocations: ['Lotus Lake', 'Osiris\'s Pavilion'] }
  ]
};

export default function WorldMap({ params }: Props) {
  const resolvedParams = use(params);
  const pantheon = resolvedParams.pantheon as 'greek' | 'norse' | 'egyptian';
  const state = useGameStore();

  const [activeNode, setActiveNode] = useState<MapNode | null>(null);
  const [hoverNode, setHoverNode] = useState<MapNode | null>(null);
  const [teleporting, setTeleporting] = useState(false);
  const [exploredNodes, setExploredNodes] = useState<string[]>([]);

  const nodes = mapNodesData[pantheon] || [];

  const handleTravel = (node: MapNode) => {
    if (state.level < node.levelReq) {
      audioEngine.playBattleImpact();
      return;
    }

    audioEngine.playForge(); // Anvil strike for teleport initiation
    setTeleporting(true);

    setTimeout(() => {
      setTeleporting(false);
      audioEngine.playLevelUp(); // Arpeggio for teleport completion
      
      if (!exploredNodes.includes(node.id)) {
        setExploredNodes(prev => [...prev, node.id]);
        state.adjustReputation(pantheon, 15); // earn reputation for exploring
        state.addXp(40);
        state.unlockCodexEntry(node.id);
      }
    }, 1800);
  };

  const getThemeColor = () => {
    if (pantheon === 'greek') return 'purple';
    if (pantheon === 'norse') return 'blue';
    return 'amber';
  };

  const colors = {
    purple: { border: 'border-purple-500/20', glow: 'glow-purple', accent: 'text-purple-400', button: 'bg-purple-600 hover:bg-purple-700' },
    blue: { border: 'border-blue-500/20', glow: 'glow-blue', accent: 'text-blue-400', button: 'bg-blue-600 hover:bg-blue-700' },
    amber: { border: 'border-amber-500/20', glow: 'glow-amber', accent: 'text-amber-400', button: 'bg-amber-500 hover:bg-amber-600 text-neutral-950' }
  }[getThemeColor()];

  return (
    <div className="space-y-6 pb-12 relative">
      
      {/* Travel Overlay */}
      {teleporting && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-serif text-amber-500">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
            className="text-2xl tracking-[0.3em] uppercase animate-pulse"
          >
            ✈ Teleporting Through Ley-lines...
          </motion.div>
          <div className="w-64 bg-neutral-900 h-1 rounded-full mt-4 overflow-hidden border border-neutral-800">
            <div className="bg-amber-500 h-full animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '60%' }} />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
        <div className="flex items-center gap-3">
          <Link href={`/worlds/${pantheon}`} onClick={() => audioEngine.playClick()} className="p-2 border border-neutral-800 rounded hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold uppercase tracking-wider text-neutral-100">{pantheon} WORLD MAP</h1>
            <p className="text-xs text-neutral-500">Hover nodes to reveal coordinates; click to activate travel portals.</p>
          </div>
        </div>
        <span className="text-xs font-serif font-bold text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded">
          🎒 Level Required: Lvl 1 - 12
        </span>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAP BOARD CONTAINER */}
        <div className="lg:col-span-2 bg-neutral-950/80 border border-neutral-900 rounded-2xl p-4 relative aspect-[4/3] flex items-center justify-center overflow-hidden min-h-[380px]">
          
          {/* Custom SVG ley lines linking locations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-neutral-850 stroke-1 stroke-dasharray-[4,4] z-0">
            <line x1="50%" y1="15%" x2="25%" y2="40%" />
            <line x1="50%" y1="15%" x2="75%" y2="45%" />
            <line x1="25%" y1="40%" x2="50%" y2="70%" />
            <line x1="75%" y1="45%" x2="50%" y2="70%" />
            <line x1="50%" y1="70%" x2="20%" y2="75%" />
          </svg>

          {/* Interactive Nodes */}
          {nodes.map((node) => {
            const locked = state.level < node.levelReq;
            const visited = exploredNodes.includes(node.id);
            const active = activeNode?.id === node.id;
            
            return (
              <button
                key={node.id}
                onMouseEnter={() => {
                  setHoverNode(node);
                  audioEngine.playHover();
                }}
                onMouseLeave={() => setHoverNode(null)}
                onClick={() => {
                  setActiveNode(node);
                  audioEngine.playClick();
                }}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border-2 transition-all duration-300 z-10 ${
                  active 
                    ? 'scale-125 border-amber-500 bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : locked
                      ? 'border-neutral-800 bg-neutral-950 text-neutral-600 cursor-not-allowed'
                      : visited 
                        ? 'border-green-500/60 bg-green-500/10 text-green-400'
                        : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-amber-500/50 hover:scale-110'
                }`}
              >
                <MapPin size={active ? 20 : 16} />
                
                {/* Micro tooltip label */}
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap bg-neutral-950/90 text-[10px] font-serif border border-neutral-850 px-2 py-0.5 rounded text-neutral-300 pointer-events-none opacity-80 group-hover:opacity-100">
                  {node.name}
                </span>
              </button>
            );
          })}

          {/* WATERMARK SHADOWS */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 opacity-30 text-xs font-serif uppercase tracking-widest text-neutral-400">
            <Compass className="animate-[spin_40s_linear_infinite]" size={16} />
            <span>Mythwalker Astrolabe</span>
          </div>

        </div>

        {/* SIDE DETAIL PANEL */}
        <div className="space-y-6">
          
          {/* Active Node Detail */}
          {activeNode ? (
            <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 space-y-6 relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-[10px] text-amber-500 font-serif font-bold uppercase tracking-wider block">REGION SELECT</span>
                <h3 className="text-2xl font-serif font-bold text-neutral-100">{activeNode.name}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{activeNode.description}</p>
              </div>

              {state.level < activeNode.levelReq ? (
                <div className="p-3 bg-red-500/5 border border-red-500/20 text-red-400 rounded-lg flex items-start gap-2.5 text-xs">
                  <AlertTriangle className="shrink-0 mt-0.5" size={14} />
                  <div>
                    <span className="font-bold">Portal Sealed</span>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Requires Level {activeNode.levelReq} to unlock portal coordinates.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Sub-locations discovered</span>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {activeNode.sublocations.map((sub, i) => (
                        <div key={i} className="p-2.5 rounded bg-neutral-950 border border-neutral-850 text-neutral-300 flex items-center gap-2">
                          <CheckCircle size={12} className="text-green-500" />
                          <span>{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleTravel(activeNode)}
                    className={`w-full py-3 rounded-lg font-serif font-bold tracking-widest text-xs uppercase transition-colors ${colors.button}`}
                  >
                    ACTIVATE TRAVEL PORTAL
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-neutral-900/10 border border-neutral-850 border-dashed rounded-2xl p-8 text-center text-neutral-500 flex flex-col items-center justify-center h-48 space-y-2">
              <Info size={24} />
              <p className="text-xs font-serif uppercase tracking-widest">Select a map node</p>
              <p className="text-[10px] text-neutral-600 max-w-xs">Click any location node on the map to review sub-locations and teleport.</p>
            </div>
          )}

          {/* Hover metadata card */}
          {hoverNode && (
            <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-serif font-bold text-neutral-200">{hoverNode.name}</span>
                <span className={`text-[10px] uppercase font-bold ${state.level >= hoverNode.levelReq ? 'text-green-500' : 'text-red-500'}`}>
                  {state.level >= hoverNode.levelReq ? 'Unlocked' : `Req Lvl ${hoverNode.levelReq}`}
                </span>
              </div>
              <p className="text-[11px] text-neutral-550">{hoverNode.description}</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
