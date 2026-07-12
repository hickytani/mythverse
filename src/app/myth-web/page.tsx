'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { mythologyDb } from '@/data/seed';
import { audioEngine } from '@/utils/audioEngine';
import { GitBranch, Shield, Compass, Sparkles, ZoomIn, ZoomOut } from 'lucide-react';
import Link from 'next/link';

interface WebNode {
  id: string;
  name: string;
  pantheon: 'greek' | 'norse' | 'egyptian';
  x: number;
  y: number;
  role: string;
  connections: { targetId: string; type: string }[];
}

const initialNodes: WebNode[] = [
  // --- GREEK FAMILY TREE ---
  { id: 'zeus', name: 'Zeus', pantheon: 'greek', x: 250, y: 150, role: 'King of Gods', connections: [{ targetId: 'hera', type: 'spouse/sibling' }, { targetId: 'poseidon', type: 'sibling' }, { targetId: 'hades', type: 'sibling' }, { targetId: 'athena', type: 'child' }, { targetId: 'ares', type: 'child' }] },
  { id: 'hera', name: 'Hera', pantheon: 'greek', x: 400, y: 150, role: 'Queen of Gods', connections: [{ targetId: 'zeus', type: 'spouse/sibling' }, { targetId: 'ares', type: 'child' }] },
  { id: 'poseidon', name: 'Poseidon', pantheon: 'greek', x: 100, y: 120, role: 'Sea Lord', connections: [{ targetId: 'zeus', type: 'sibling' }, { targetId: 'hades', type: 'sibling' }] },
  { id: 'hades', name: 'Hades', pantheon: 'greek', x: 150, y: 220, role: 'Underworld Lord', connections: [{ targetId: 'zeus', type: 'sibling' }, { targetId: 'poseidon', type: 'sibling' }] },
  { id: 'athena', name: 'Athena', pantheon: 'greek', x: 200, y: 300, role: 'Goddess of Wisdom', connections: [{ targetId: 'zeus', type: 'parent' }] },
  { id: 'ares', name: 'Ares', pantheon: 'greek', x: 350, y: 300, role: 'God of War', connections: [{ targetId: 'zeus', type: 'parent' }, { targetId: 'hera', type: 'parent' }] },

  // --- NORSE FAMILY TREE ---
  { id: 'odin', name: 'Odin', pantheon: 'norse', x: 200, y: 480, role: 'Allfather', connections: [{ targetId: 'frigg', type: 'spouse' }, { targetId: 'thor', type: 'child' }, { targetId: 'loki', type: 'blood brother' }] },
  { id: 'frigg', name: 'Frigg', pantheon: 'norse', x: 350, y: 480, role: 'Queen of Asgard', connections: [{ targetId: 'odin', type: 'spouse' }] },
  { id: 'thor', name: 'Thor', pantheon: 'norse', x: 120, y: 580, role: 'Thunder God', connections: [{ targetId: 'odin', type: 'parent' }] },
  { id: 'loki', name: 'Loki', pantheon: 'norse', x: 420, y: 580, role: 'Trickster God', connections: [{ targetId: 'odin', type: 'blood brother' }, { targetId: 'hel', type: 'child' }] },
  { id: 'hel', name: 'Hel', pantheon: 'norse', x: 500, y: 650, role: 'Underworld Queen', connections: [{ targetId: 'loki', type: 'parent' }] },

  // --- EGYPTIAN FAMILY TREE ---
  { id: 'ra', name: 'Ra', pantheon: 'egyptian', x: 650, y: 150, role: 'Sun God', connections: [{ targetId: 'osiris', type: 'grandchild' }, { targetId: 'isis', type: 'grandchild' }, { targetId: 'seth', type: 'grandchild' }] },
  { id: 'osiris', name: 'Osiris', pantheon: 'egyptian', x: 600, y: 280, role: 'Underworld Judge', connections: [{ targetId: 'ra', type: 'creator' }, { targetId: 'isis', type: 'spouse/sibling' }, { targetId: 'seth', type: 'sibling' }, { targetId: 'horus', type: 'child' }, { targetId: 'anubis', type: 'child' }] },
  { id: 'isis', name: 'Isis', pantheon: 'egyptian', x: 750, y: 280, role: 'Magic Goddess', connections: [{ targetId: 'osiris', type: 'spouse/sibling' }, { targetId: 'seth', type: 'sibling' }, { targetId: 'horus', type: 'child' }] },
  { id: 'seth', name: 'Seth', pantheon: 'egyptian', x: 880, y: 250, role: 'Chaos Lord', connections: [{ targetId: 'osiris', type: 'sibling' }, { targetId: 'isis', type: 'sibling' }] },
  { id: 'horus', name: 'Horus', pantheon: 'egyptian', x: 680, y: 400, role: 'Avenger Falcon', connections: [{ targetId: 'osiris', type: 'parent' }, { targetId: 'isis', type: 'parent' }] },
  { id: 'anubis', name: 'Anubis', pantheon: 'egyptian', x: 550, y: 400, role: 'Jackal Embalmer', connections: [{ targetId: 'osiris', type: 'parent' }] }
];

export default function MythWeb() {
  const [nodes, setNodes] = useState<WebNode[]>(initialNodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('zeus');
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [filterPantheon, setFilterPantheon] = useState<'all' | 'greek' | 'norse' | 'egyptian'>('all');

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // Mouse drag coordinates tracking
  const handleMouseDown = (id: string) => {
    audioEngine.playHover();
    setDraggingNodeId(id);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingNodeId) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    
    // Scale client coordinate relative to SVG view box
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 800;

    setNodes(prev => prev.map(n => {
      if (n.id === draggingNodeId) {
        return { ...n, x: Math.max(50, Math.min(950, x)), y: Math.max(50, Math.min(750, y)) };
      }
      return n;
    }));
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  const filteredNodes = nodes.filter(
    n => filterPantheon === 'all' || n.pantheon === filterPantheon
  );

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="border-b border-neutral-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold uppercase tracking-wider text-neutral-100">THE MYTH WEB</h1>
          <p className="text-xs text-neutral-500">Explore complex family lineages, rivalries, and alliances. Drag nodes to reshape the web.</p>
        </div>

        {/* Filter buttons */}
        <div className="flex border border-neutral-800 p-1 rounded-lg bg-neutral-950 text-xs shrink-0 font-serif">
          {(['all', 'greek', 'norse', 'egyptian'] as const).map(p => (
            <button
              key={p}
              onClick={() => {
                setFilterPantheon(p);
                setSelectedNodeId(null);
                audioEngine.playClick();
              }}
              className={`px-3 py-1.5 rounded uppercase font-bold transition-colors ${
                filterPantheon === p ? 'bg-neutral-800 text-amber-500' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* INTERACTIVE GRAPH CANVAS (Left 2 cols) */}
        <div className="lg:col-span-2 bg-neutral-950 border border-neutral-900 rounded-2xl p-4 relative aspect-[4/3] min-h-[380px] select-none overflow-hidden">
          
          <svg 
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            viewBox="0 0 1000 800" 
            className="absolute inset-0 w-full h-full cursor-grab z-10"
          >
            {/* Draw connections */}
            {filteredNodes.map(node => {
              return node.connections.map((conn, idx) => {
                const target = nodes.find(n => n.id === conn.targetId);
                // Render line if target exists and is in the active filters
                if (!target || (filterPantheon !== 'all' && target.pantheon !== filterPantheon)) return null;

                const activeConnection = selectedNodeId === node.id || selectedNodeId === target.id;

                return (
                  <line
                    key={`${node.id}_${conn.targetId}_${idx}`}
                    x1={node.x}
                    y1={node.y}
                    x2={target.x}
                    y2={target.y}
                    className={`transition-all ${
                      activeConnection 
                        ? 'stroke-amber-500 stroke-2 opacity-90 filter drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]' 
                        : 'stroke-neutral-850 stroke-1 opacity-20'
                    }`}
                  />
                );
              });
            })}

            {/* Draw nodes */}
            {filteredNodes.map(node => {
              const active = selectedNodeId === node.id;
              const themeColor = {
                greek: 'fill-purple-500/10 stroke-purple-500/50 text-purple-400',
                norse: 'fill-blue-500/10 stroke-blue-500/50 text-blue-400',
                egyptian: 'fill-amber-500/10 stroke-amber-500/50 text-amber-400'
              }[node.pantheon];

              return (
                <g 
                  key={node.id} 
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer group"
                  onMouseDown={() => handleMouseDown(node.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(node.id);
                    audioEngine.playClick();
                  }}
                >
                  <circle 
                    r="34" 
                    className={`transition-all duration-300 ${themeColor} ${
                      active ? 'stroke-amber-500 stroke-2 fill-amber-500/20' : 'hover:scale-105'
                    }`}
                  />
                  <text 
                    textAnchor="middle" 
                    y="4" 
                    className="font-serif font-bold text-xs fill-neutral-200 pointer-events-none tracking-wider select-none uppercase"
                  >
                    {node.name.slice(0, 7)}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Astrolabe instructions */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 opacity-35 text-[10px] font-serif uppercase tracking-widest text-neutral-400">
            <Compass className="animate-[spin_40s_linear_infinite]" size={14} />
            <span>Interactive Node Astro-web</span>
          </div>

        </div>

        {/* SIDE DETAIL DRAWER (Right col) */}
        <div className="space-y-6">
          {selectedNode ? (() => {
            const dbRef = mythologyDb.deities.find(d => d.id === selectedNode.id);
            return (
              <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 space-y-5 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-amber-500 rounded-b" />
                
                <div className="space-y-1">
                  <span className="text-[10px] text-amber-500 font-serif font-bold uppercase tracking-wider block">{selectedNode.pantheon} | {selectedNode.role}</span>
                  <h4 className="font-serif font-bold text-neutral-100 text-base">{selectedNode.name}</h4>
                </div>

                {dbRef ? (
                  <div className="space-y-4 text-xs">
                    <p className="text-neutral-450 leading-relaxed font-light">{dbRef.description}</p>
                    
                    <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-lg">
                      <span className="text-neutral-500 block text-[9px] uppercase">Symbols</span>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {dbRef.symbols.map((sym, i) => (
                          <span key={i} className="bg-amber-500/5 text-amber-500 border border-amber-500/15 rounded px-2 py-0.5 text-[10px]">
                            {sym}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link 
                      href={`/entities/${selectedNode.id}`}
                      onClick={() => audioEngine.playClick()}
                      className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 text-neutral-300 text-center font-serif text-xs rounded transition-colors block uppercase"
                    >
                      OPEN FULL CODEX ARTICLE
                    </Link>
                  </div>
                ) : (
                  <div className="text-xs text-neutral-500 italic">No static lore reference bound.</div>
                )}
              </div>
            );
          })() : (
            <div className="bg-neutral-900/10 border border-neutral-850 border-dashed rounded-2xl p-8 text-center text-neutral-500 flex flex-col items-center justify-center h-48 space-y-2">
              <GitBranch size={24} />
              <span className="font-serif text-xs uppercase tracking-widest block">Select family node</span>
              <span className="text-[10px] text-neutral-605 max-w-xs block mx-auto">Click any circle in the relationship web to highlight connection pathways and open detailed lineages.</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
