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

  const campaign = state.campaignChapters.find(c => c.pantheon === pantheon);
  const progressPercent = Math.floor(
    ((campaign?.nodes.filter(n => n.completed).length || 0) / 5) * 100
  );

  const theme = {
    greek: {
      color: 'text-purple-400 border-purple-500/20 bg-purple-500/5 hover:border-purple-500/50',
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      accentGlow: 'bg-purple-500/5',
      accentColor: 'purple',
      icon: Zap,
      welcome: 'Ascend to Mount Olympus'
    },
    norse: {
      color: 'text-blue-400 border-blue-500/20 bg-blue-500/5 hover:border-blue-500/50',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      accentGlow: 'bg-blue-500/5',
      accentColor: 'blue',
      icon: Flame,
      welcome: 'Explore the Nine Realms'
    },
    egyptian: {
      color: 'text-amber-400 border-amber-500/20 bg-amber-500/5 hover:border-amber-500/50',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      accentGlow: 'bg-amber-500/5',
      accentColor: 'amber',
      icon: Sun,
      welcome: 'Uncover the Solar Temples'
    }
  }[pantheon];

  const IconComponent = theme.icon;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <section className={`relative rounded-2xl overflow-hidden border p-8 ${theme.color} flex flex-col md:flex-row justify-between items-start md:items-center gap-6`}>
        <div className={`absolute inset-0 ${theme.accentGlow} pointer-events-none -z-10`} />
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`border text-[10px] font-serif font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${theme.badge}`}>
              {pantheon} World
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-widest text-neutral-100 uppercase">
            {theme.welcome}
          </h1>
          <p className="text-xs text-neutral-300 max-w-xl">
            You are tuned into the **{pantheon}** dimension. Journey through the active campaigns, explore the local landmarks, or research the native pantheon catalog below.
          </p>
        </div>

        <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 shrink-0 flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border font-serif font-bold text-lg ${theme.badge}`}>
            {progressPercent}%
          </div>
          <div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Story Campaign</div>
            <div className="font-serif font-bold text-xs text-neutral-200">Chapter 1 Progress</div>
          </div>
        </div>
      </section>

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
