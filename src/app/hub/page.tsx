'use client';

import React from 'react';
import { useGameStore, getXpForNextLevel } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { 
  Sparkles, 
  Flame, 
  Compass, 
  BookOpen, 
  Hammer, 
  Trophy, 
  Shield,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import PlayerCharacter from '@/components/PlayerCharacter';
import EnvironmentBackground from '@/components/EnvironmentBackground';
import { characters } from '@/data/seed/characters';

export default function GameHub() {
  const state = useGameStore();

  const handleQuestClaim = (questId: string) => {
    audioEngine.playQuestComplete();
    state.claimQuestRewards(questId);
  };

  // Find active companion details
  const activeCompanion = state.activeCompanionId 
    ? characters.find(c => c.id === state.activeCompanionId) 
    : null;

  // Choose pantheon environment based on first active quest or default Greek
  let currentPantheon: 'greek' | 'norse' | 'egyptian' = 'greek';
  if (state.origin.includes('Midgard') || state.origin.includes('Rune')) {
    currentPantheon = 'norse';
  } else if (state.origin.includes('Nile') || state.origin.includes('Temple')) {
    currentPantheon = 'egyptian';
  }

  const dailyQuests = [
    { id: 'daily_1', title: 'Complete one Arena Quiz', xp: 50, coins: 20, done: state.completedQuests.includes('daily_1') || false },
    { id: 'daily_2', title: 'Upgrade a weapon at the Forge', xp: 60, coins: 30, done: state.weapons.some(w => w.upgradeLevel > 0) },
    { id: 'daily_3', title: 'Read one Myth in the Codex', xp: 40, coins: 15, done: state.unlockedCodexIds.length > 5 }
  ];

  const hotspots = [
    { name: 'Pantheon Portals', desc: 'Travel to Greek, Norse, & Egyptian Worlds', path: '/worlds', icon: Compass, color: 'border-amber-500/30 text-amber-400 bg-amber-500/5 hover:border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.15)]' },
    { name: 'Quest Table', desc: 'Consult active side quests & daily tasks', path: '/quests', icon: BookOpen, color: 'border-purple-500/30 text-purple-400 bg-purple-500/5 hover:border-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.15)]' },
    { name: 'Sacred Armoury', desc: 'Inspect your active equipment & gear sets', path: '/inventory', icon: Shield, color: 'border-blue-500/30 text-blue-400 bg-blue-500/5 hover:border-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.15)]' },
    { name: 'Anvil Forge', desc: 'Upgrade weapons & craft divine relics', path: '/forge', icon: Hammer, color: 'border-red-500/30 text-red-400 bg-red-500/5 hover:border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.15)]' },
    { name: 'Skill Constellation', desc: 'Unlock passive runes & active combat stances', path: '/skills', icon: Sparkles, color: 'border-green-500/30 text-green-400 bg-green-500/5 hover:border-green-500/80 shadow-[0_0_15px_rgba(34,197,94,0.15)]' },
    { name: 'Deities & Allies', desc: 'Browse unlocked gods & equip companions', path: '/characters', icon: Trophy, color: 'border-pink-500/30 text-pink-400 bg-pink-500/5 hover:border-pink-500/80 shadow-[0_0_15px_rgba(236,72,153,0.15)]' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between py-6 px-4 md:px-8 overflow-hidden font-sans">
      
      {/* Dynamic environmental background */}
      <EnvironmentBackground pantheon={currentPantheon} intensity="cinematic" />

      {/* TOP HEADER SUMMARY */}
      <header className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-900/60 border border-neutral-850 p-6 rounded-2xl backdrop-blur-md shadow-2xl z-10">
        <div>
          <span className="text-[10px] text-amber-500 font-serif font-black tracking-[0.25em] uppercase block mb-1">
            Hall of Echoes • Sanctuary
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-black tracking-wide text-neutral-100 uppercase">
            SANCTUARY OF <span className="text-amber-400">{state.username || 'MYTHWALKER'}</span>
          </h1>
          <p className="text-xs text-neutral-450 max-w-xl mt-1 leading-relaxed">
            Welcome to the sanctuary between realms. Here, the Ley-lines intersect. Choose a destination or consult your companions.
          </p>
        </div>

        {/* Level Indicator */}
        <div className="flex items-center gap-4 bg-neutral-950/80 border border-neutral-850 rounded-xl p-3.5 shrink-0 shadow-lg">
          <div className="w-10 h-10 rounded bg-neutral-900 border border-amber-500/30 flex items-center justify-center font-serif text-lg font-bold text-amber-500">
            {state.level}
          </div>
          <div>
            <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-serif font-bold">Current Title</div>
            <div className="font-serif font-bold text-xs text-neutral-200">{state.title}</div>
            <div className="w-32 bg-neutral-850 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${(state.xp / getXpForNextLevel(state.level)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* CENTRAL STAGE */}
      <main className="relative my-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center z-10">
        
        {/* INTERACTIVE DESTINATION HOTSPOTS */}
        <div className="space-y-3 order-2 lg:order-1">
          <span className="text-[9px] text-neutral-500 font-serif font-bold uppercase tracking-[0.2em] block pl-1">
            Sanctuary Gates
          </span>
          <div className="grid grid-cols-1 gap-3">
            {hotspots.map((hs, i) => (
              <Link 
                key={i}
                href={hs.path}
                onClick={() => audioEngine.playClick()}
                className={`p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${hs.color}`}
              >
                <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 shrink-0">
                  <hs.icon size={18} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-neutral-200">{hs.name}</h3>
                  <p className="text-[10px] text-neutral-450 mt-0.5">{hs.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ACTIVE AVATAR STAGE (CENTRAL RPG SELECTION STAGE) */}
        <div className="flex flex-col items-center justify-center space-y-4 order-1 lg:order-2">
          
          <div className="relative w-64 md:w-80">
            <PlayerCharacter animatePose={true} size="lg" />

            {/* Glowing pedestal base */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-10 bg-amber-500/10 rounded-full blur-md border-b border-amber-500/20" />
          </div>

          <div className="text-center bg-neutral-900/40 border border-neutral-850 p-4 rounded-2xl backdrop-blur-sm shadow-xl w-64">
            <h4 className="font-serif text-sm font-bold text-neutral-200 uppercase tracking-wide">{state.username}</h4>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mt-0.5 font-bold">{state.origin}</span>
            {activeCompanion && (
              <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-center gap-2 text-[10px] text-amber-400 font-serif">
                <span>Companion: {activeCompanion.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* COMPANION & ACTIVE QUEST LOGS */}
        <div className="space-y-6 order-3">
          
          {/* Active Companion Stage */}
          <div className="bg-neutral-900/60 border border-neutral-850 p-6 rounded-2xl backdrop-blur-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-neutral-500 font-serif font-black tracking-widest uppercase">Companion Node</span>
              <Link href="/characters" className="text-[9px] text-amber-500 uppercase tracking-wider font-bold hover:underline">Manage</Link>
            </div>

            {activeCompanion ? (
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl border border-amber-500/30 overflow-hidden bg-neutral-950 shrink-0">
                    <img 
                      src={activeCompanion.visualAssets.portrait} 
                      alt={activeCompanion.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-neutral-200 text-sm">{activeCompanion.name}</h3>
                    <span className="text-[9px] text-neutral-500 uppercase tracking-wider block font-bold">{activeCompanion.title}</span>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-400 bg-neutral-950/40 border border-neutral-850/50 p-3 rounded-lg leading-relaxed">
                  "{activeCompanion.activeAbility.description}"
                </p>
              </div>
            ) : (
              <div className="text-center py-6 text-neutral-500 text-xs flex flex-col items-center justify-center gap-2">
                <Compass className="text-neutral-700" size={24} />
                <span>No mythological companion equipped. Visit the character gallery to recruit one.</span>
              </div>
            )}
          </div>

          {/* Daily Sanctuary Tasks */}
          <div className="bg-neutral-900/60 border border-neutral-850 p-6 rounded-2xl backdrop-blur-md shadow-2xl space-y-4">
            <span className="text-[10px] text-neutral-500 font-serif font-black tracking-widest uppercase block">Sanctuary Runes</span>
            <div className="space-y-2">
              {dailyQuests.map((dq) => (
                <div key={dq.id} className="p-3 rounded-lg bg-neutral-950/40 border border-neutral-850/40 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`p-0.5 rounded-full border ${dq.done ? 'bg-green-500/15 border-green-500/35 text-green-400' : 'border-neutral-800 text-neutral-600'}`}>
                      <CheckCircle size={10} />
                    </div>
                    <span className={`text-[11px] ${dq.done ? 'line-through text-neutral-500' : 'text-neutral-350'}`}>{dq.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER STATS LOG */}
      <footer className="relative border-t border-neutral-900 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-neutral-500 uppercase tracking-widest z-10">
        <div>Streak: {state.dailyStreak} Days 🔥</div>
        <div>© 2026 MythVerse RPG Sanctuary</div>
      </footer>
    </div>
  );
}
