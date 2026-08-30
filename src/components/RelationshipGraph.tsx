'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface RelationshipNode {
  characterId: string;
  name: string;
  relation: string;
  pantheon: string;
}

interface RelationshipGraphProps {
  centerEntity: {
    id: string;
    name: string;
    pantheon: string;
  };
  relationships: RelationshipNode[];
}

export default function RelationshipGraph({ centerEntity, relationships }: RelationshipGraphProps) {
  if (!relationships || relationships.length === 0) {
    return (
      <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-xl text-center text-xs text-neutral-500 font-serif">
        No direct relationship nodes recorded in ancient codex archives.
      </div>
    );
  }

  return (
    <div className="relative p-8 bg-neutral-950/80 border border-amber-500/20 rounded-xl overflow-hidden shadow-2xl my-6">
      <div className="text-center mb-8">
        <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-amber-500 font-bold block mb-1">
          🕸️ MYTHIC LINEAGE & RELATIONSHIP NETWORK
        </span>
        <h4 className="text-xl font-serif font-black tracking-widest text-neutral-100">
          Connections of {centerEntity.name}
        </h4>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 z-10">
        
        {/* CENTER NODE */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative group z-20"
        >
          <div className="w-24 h-24 rounded-full bg-amber-500/10 border-2 border-amber-500 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
            <Sparkles className="text-amber-400 mb-1" size={20} />
            <span className="font-serif font-bold text-xs text-amber-300 line-clamp-1">{centerEntity.name}</span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-sans">{centerEntity.pantheon}</span>
          </div>
        </motion.div>

        {/* CONNECTED NODES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {relationships.map((rel, idx) => (
            <motion.div
              key={rel.characterId || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                href={`/characters/${rel.characterId}`}
                className="flex items-center gap-3 p-3 bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 rounded-lg transition-all hover:scale-105 group"
              >
                <div className="p-2 rounded-full bg-neutral-950 border border-neutral-700 text-amber-400 group-hover:border-amber-500">
                  <User size={16} />
                </div>
                <div>
                  <div className="font-serif font-bold text-xs text-neutral-200 group-hover:text-amber-400 transition-colors">
                    {rel.name}
                  </div>
                  <div className="text-[10px] text-amber-500/80 uppercase tracking-widest font-mono">
                    {rel.relation}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
