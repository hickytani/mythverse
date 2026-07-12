'use client';

import React, { use, useMemo } from 'react';
import { useGameStore } from '@/store/gameStore';
import { characters } from '@/data/seed/characters';
import { audioEngine } from '@/utils/audioEngine';
import { 
  Sparkles, 
  ArrowLeft, 
  CheckCircle, 
  BookOpen, 
  Shield, 
  Heart,
  Globe,
  Award
} from 'lucide-react';
import EnvironmentBackground from '@/components/EnvironmentBackground';
import Link from 'next/link';

export default function CharacterDetail({ params }: { params: Promise<{ characterId: string }> }) {
  const { characterId } = use(params);
  const state = useGameStore();

  const character = useMemo(() => {
    return characters.find(c => c.id === characterId) || characters[0];
  }, [characterId]);

  const isUnlocked = state.unlockedCharacterIds.includes(character.id);
  const affinityData = state.characterAffinities[character.id] || { level: 'Encountered', xp: 0 };

  const affinityMilestones = [
    { level: 'Encountered', xpMax: 100 },
    { level: 'Recognised', xpMax: 200 },
    { level: 'Ally', xpMax: 400 },
    { level: 'Trusted', xpMax: 700 },
    { level: 'Champion', xpMax: 1100 },
    { level: 'Chosen', xpMax: 1600 },
    { level: 'Mythic Bond', xpMax: 2500 }
  ];

  const currentMilestone = affinityMilestones.find(m => m.level === affinityData.level) || { level: 'Encountered', xpMax: 100 };

  const handleEquip = () => {
    audioEngine.playQuestComplete();
    state.equipCompanion(character.id);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between py-6 px-4 md:px-8 overflow-hidden font-sans">
      
      {/* Dynamic environment background */}
      <EnvironmentBackground pantheon={character.pantheon} intensity="cinematic" />

      {/* TOP NAV BAR */}
      <div className="relative flex justify-between items-center z-10 bg-neutral-900/40 border border-neutral-850 p-4 rounded-xl backdrop-blur-sm mb-6">
        <Link 
          href="/characters" 
          onClick={() => audioEngine.playClick()}
          className="flex items-center gap-2 text-xs text-neutral-400 hover:text-amber-500 font-serif font-black uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Grid</span>
        </Link>
        <span className="text-[10px] text-neutral-500 font-serif font-bold uppercase tracking-[0.2em] hidden sm:block">
          Allied Deities Node Detail
        </span>
      </div>

      {/* MAIN HERO SPLIT SCREEN */}
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch z-10">
        
        {/* LEFT COLUMN: HERO FULL ARTWORK STAGE */}
        <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-850 rounded-3xl p-6 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center relative overflow-hidden h-[450px] lg:h-auto">
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center, rgba(212,175,55,0.05) 0%, transparent 70%)" />
          <img
            src={character.visualAssets.fullBody}
            alt={character.name}
            className={`h-full object-contain p-4 drop-shadow-[0_0_30px_rgba(0,0,0,0.85)] max-h-[420px] transition-all duration-700 ${!isUnlocked ? 'character-locked' : ''}`}
          />
        </div>

        {/* RIGHT COLUMN: INFORMATION PANEL */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Info Header */}
          <div className="bg-neutral-900/60 border border-neutral-850 p-6 rounded-3xl backdrop-blur-md shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-amber-500 font-serif font-black tracking-widest uppercase block mb-1">
                  {character.pantheon} Pantheon • {character.role}
                </span>
                <h1 className="text-4xl font-serif font-black text-neutral-100 uppercase tracking-wide">
                  {character.name}
                </h1>
                <p className="text-xs text-neutral-450 italic mt-0.5">
                  "{character.title}"
                </p>
              </div>

              <div className="flex gap-2">
                <span className="bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-lg text-xs font-serif font-bold text-amber-400 uppercase tracking-wider">
                  {character.rarity}
                </span>
              </div>
            </div>

            {/* Affinity Meter */}
            <div className="bg-neutral-950/80 border border-neutral-850/80 p-4 rounded-xl space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-neutral-500 uppercase tracking-wider font-semibold">Affinity Mastery</span>
                <span className="text-amber-400 font-serif font-bold uppercase tracking-wider">{affinityData.level}</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden border border-neutral-850">
                <div 
                  className="bg-amber-500 h-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (affinityData.xp / currentMilestone.xpMax) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[8px] text-neutral-500 font-bold uppercase tracking-widest">
                <span>{affinityData.xp} XP</span>
                <span>{currentMilestone.xpMax} XP to Next Bond</span>
              </div>
            </div>

            {/* Biography */}
            <p className="text-xs text-neutral-350 leading-relaxed font-sans border-t border-neutral-850 pt-4">
              {character.biography}
            </p>
          </div>

          {/* Abilities block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Active Ability */}
            <div className="bg-neutral-900/60 border border-neutral-850 p-5 rounded-2xl backdrop-blur-md shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-500">
                <Sparkles size={14} />
                <span className="text-[10px] font-serif font-black uppercase tracking-wider">Active: {character.activeAbility.name}</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                {character.activeAbility.description}
              </p>
            </div>

            {/* Passive Ability */}
            <div className="bg-neutral-900/60 border border-neutral-850 p-5 rounded-2xl backdrop-blur-md shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-blue-400">
                <Shield size={14} />
                <span className="text-[10px] font-serif font-black uppercase tracking-wider">Passive: {character.passiveAbility.name}</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                {character.passiveAbility.description}
              </p>
            </div>

          </div>

          {/* Relational Web & Sources */}
          <div className="bg-neutral-900/60 border border-neutral-850 p-6 rounded-2xl backdrop-blur-md shadow-2xl space-y-4">
            <span className="text-[10px] text-neutral-500 font-serif font-black tracking-widest uppercase block">
              Legendary Relationships & Lore Nodes
            </span>
            <div className="space-y-3">
              {character.relationships.map((rel, i) => (
                <div key={i} className="flex justify-between items-start text-xs border-b border-neutral-850/40 pb-2.5 last:border-b-0 last:pb-0">
                  <div>
                    <span className="font-serif font-bold text-neutral-300 capitalize">{rel.characterId.replace('char_', '')} </span>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold">({rel.type})</span>
                    <p className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed">{rel.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-850 pt-4 grid grid-cols-2 gap-4 text-[10px]">
              <div>
                <span className="text-neutral-500 uppercase font-semibold block mb-1">Signature Weapon</span>
                <span className="font-serif text-neutral-300 font-bold">{character.signatureWeapon}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase font-semibold block mb-1">Historical Sources</span>
                <span className="text-neutral-450">{character.sources.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Companion Action control */}
          <div className="bg-neutral-900/60 border border-neutral-850 p-4 rounded-2xl backdrop-blur-md shadow-2xl flex items-center justify-between">
            {isUnlocked ? (
              <button
                onClick={handleEquip}
                disabled={state.activeCompanionId === character.id}
                className={`w-full py-3.5 rounded-xl font-serif font-bold tracking-widest text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  state.activeCompanionId === character.id
                    ? 'bg-neutral-950 border border-neutral-850 text-neutral-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-600 text-neutral-950 hover:scale-[1.02]'
                }`}
              >
                <CheckCircle size={14} />
                <span>{state.activeCompanionId === character.id ? 'CURRENTLY SUMMONED COMPANION' : 'SUMMON AS ACTIVE COMPANION'}</span>
              </button>
            ) : (
              <div className="w-full text-center py-2.5 text-[11px] text-neutral-500 italic">
                Gateway locked. Complete the quest or trial requirement to recruit {character.name}.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
