'use client';

import React, { use } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { mythologyDb } from '../../../data/seed';
import { audioEngine } from '../../../utils/audioEngine';
import { 
  Zap, 
  Flame, 
  Sun, 
  Map, 
  ShieldAlert, 
  HelpCircle, 
  Compass, 
  UserCheck, 
  Heart,
  GitBranch,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

import WorldScene from '@/components/WorldScene';

interface Props {
  params: Promise<{ pantheon: string }>;
}

export default function PantheonWorld({ params }: Props) {
  const resolvedParams = use(params);
  const pantheon = resolvedParams.pantheon as 'greek' | 'norse' | 'egyptian';
  const state = useGameStore();

  const handleEntityClick = () => {
    audioEngine.playCodexDiscovery();
  };

  // Filter content native to this pantheon
  const nativeDeities = mythologyDb.deities.filter(d => d.pantheon === pantheon);
  const nativeHeroes = mythologyDb.heroes.filter(h => h.pantheon === pantheon);
  const nativeCreatures = mythologyDb.creatures.filter(c => c.pantheon === pantheon);

  return (
    <div className="space-y-8 pb-12">
      {/* 2D INTERACTIVE WORLD EXPLORATION SCENE */}
      <WorldScene pantheonId={pantheon} />

      {/* Pantheons Options Hub links */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <Link 
          href={`/map/${pantheon}`}
          onClick={() => audioEngine.playClick()}
          className="p-5 rounded-xl border border-neutral-850 bg-neutral-900/10 hover:border-amber-500/30 flex flex-col items-center gap-3 transition-colors text-center"
        >
          <Map className="text-amber-500" size={24} />
          <span className="font-serif font-bold text-xs uppercase tracking-wider">World Map</span>
        </Link>

        <Link 
          href={`/campaign/${pantheon}`}
          onClick={() => audioEngine.playClick()}
          className="p-5 rounded-xl border border-neutral-850 bg-neutral-900/10 hover:border-amber-500/30 flex flex-col items-center gap-3 transition-colors text-center"
        >
          <ShieldAlert className="text-amber-500" size={24} />
          <span className="font-serif font-bold text-xs uppercase tracking-wider">Campaign Chapters</span>
        </Link>

        <Link 
          href="/quiz-arena"
          onClick={() => audioEngine.playClick()}
          className="p-5 rounded-xl border border-neutral-850 bg-neutral-900/10 hover:border-amber-500/30 flex flex-col items-center gap-3 transition-colors text-center"
        >
          <HelpCircle className="text-amber-500" size={24} />
          <span className="font-serif font-bold text-xs uppercase tracking-wider">Quiz Challenge</span>
        </Link>

        <Link 
          href="/myth-web"
          onClick={() => audioEngine.playClick()}
          className="p-5 rounded-xl border border-neutral-850 bg-neutral-900/10 hover:border-amber-500/30 flex flex-col items-center gap-3 transition-colors text-center"
        >
          <GitBranch className="text-amber-500" size={24} />
          <span className="font-serif font-bold text-xs uppercase tracking-wider">Relationship Web</span>
        </Link>

      </section>

      {/* PANTHEON DATABASE TABS (Deities, Heroes, Creatures) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Deities Section */}
        <section className="space-y-4">
          <h3 className="font-serif font-bold text-base tracking-widest text-neutral-400 uppercase flex items-center gap-2">
            <BookOpen size={16} /> Deities ({nativeDeities.length})
          </h3>
          <div className="bg-neutral-900/10 border border-neutral-850 rounded-xl p-4 space-y-3 h-[400px] overflow-y-auto">
            {nativeDeities.map(d => (
              <Link 
                key={d.id}
                href={`/entities/${d.id}`}
                onClick={handleEntityClick}
                className="flex items-center justify-between p-3 rounded-lg bg-neutral-950/60 border border-neutral-850 hover:border-amber-500/30 transition-colors"
              >
                <div>
                  <span className="font-serif text-sm text-neutral-200 block">{d.name}</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
                    {d.aliases[0] || 'Immortal Deity'}
                  </span>
                </div>
                <span className="text-[10px] font-serif bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded text-neutral-400">
                  LORE
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Heroes Section */}
        <section className="space-y-4">
          <h3 className="font-serif font-bold text-base tracking-widest text-neutral-400 uppercase flex items-center gap-2">
            <UserCheck size={16} /> Legendary Heroes ({nativeHeroes.length})
          </h3>
          <div className="bg-neutral-900/10 border border-neutral-850 rounded-xl p-4 space-y-3 h-[400px] overflow-y-auto">
            {nativeHeroes.map(h => (
              <Link 
                key={h.id}
                href={`/entities/${h.id}`}
                onClick={handleEntityClick}
                className="flex items-center justify-between p-3 rounded-lg bg-neutral-950/60 border border-neutral-850 hover:border-amber-500/30 transition-colors"
              >
                <div>
                  <span className="font-serif text-sm text-neutral-200 block">{h.name}</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
                    {h.aliases[0] || 'Legendary Champion'}
                  </span>
                </div>
                <span className="text-[10px] font-serif bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded text-neutral-400">
                  LORE
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Creatures Section */}
        <section className="space-y-4">
          <h3 className="font-serif font-bold text-base tracking-widest text-neutral-400 uppercase flex items-center gap-2">
            <Heart size={16} /> Creatures & Monsters ({nativeCreatures.length})
          </h3>
          <div className="bg-neutral-900/10 border border-neutral-850 rounded-xl p-4 space-y-3 h-[400px] overflow-y-auto">
            {nativeCreatures.map(c => (
              <Link 
                key={c.id}
                href={`/entities/${c.id}`}
                onClick={handleEntityClick}
                className="flex items-center justify-between p-3 rounded-lg bg-neutral-950/60 border border-neutral-850 hover:border-amber-500/30 transition-colors"
              >
                <div>
                  <span className="font-serif text-sm text-neutral-200 block">{c.name}</span>
                  <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-bold ${
                    c.rarity === 'Boss' ? 'bg-red-500/10 text-red-400' : 'bg-neutral-900 text-neutral-400'
                  }`}>
                    {c.rarity}
                  </span>
                </div>
                <span className="text-[10px] font-serif bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded text-neutral-400">
                  LORE
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
