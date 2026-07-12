'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { ChevronRight, User, Compass, Circle } from 'lucide-react';
import PlayerCharacter from '@/components/PlayerCharacter';

const origins = [
  {
    name: 'Scholar of Delphi',
    bonus: '+5 Wisdom, +3 Insight',
    desc: 'Studies the scrolls of ancient Greece, gaining deep knowledge of symbols and oracle visions.',
    perk: '+10% bonus XP from Lore discoveries, +20s on quiz timers.',
    stats: { strength: 8, wisdom: 15, insight: 13, endurance: 10, agility: 9, spirit: 10 }
  },
  {
    name: 'Wanderer of Midgard',
    bonus: '+5 Endurance, +3 Strength',
    desc: 'A hardened survivor from the frozen north, trained to withstand creature strikes and icy storms.',
    perk: '+10% max health during creature battles, +5% physical damage.',
    stats: { strength: 13, wisdom: 9, insight: 10, endurance: 15, agility: 10, spirit: 8 }
  },
  {
    name: 'Keeper of the Nile',
    bonus: '+5 Insight, +3 Spirit',
    desc: 'Guardian of secret Egyptian shrines, harnessing magical Heka to manipulate battles and read maps.',
    perk: '+15% chance of finding rare relics and detecting hidden corridors.',
    stats: { strength: 9, wisdom: 12, insight: 15, endurance: 10, agility: 10, spirit: 13 }
  },
  {
    name: 'Rune Seeker',
    bonus: '+5 Insight, +3 Wisdom',
    desc: 'Wanders the frost paths deciphering Odin\'s secret whisper runes etched into stone.',
    perk: '+10% rune shard drops, reveals nearby barrows automatically.',
    stats: { strength: 10, wisdom: 14, insight: 14, endurance: 10, agility: 9, spirit: 11 }
  },
  {
    name: 'Temple Guardian',
    bonus: '+5 Strength, +3 Endurance',
    desc: 'Shield sentinel dedicated to temple sanctuaries, carrying ancient marble shields.',
    perk: '+15% armor shield ratings, +5% base physical block chance.',
    stats: { strength: 14, wisdom: 9, insight: 9, endurance: 14, agility: 9, spirit: 9 }
  },
  {
    name: 'Relic Hunter',
    bonus: '+5 Luck, +3 Agility',
    desc: 'A restless explorer seeking forgotten weapon caches and ancient chests across all boundaries.',
    perk: 'Starts with an extra active relic slot, +10% material drop rates.',
    stats: { strength: 10, wisdom: 10, insight: 11, endurance: 10, agility: 13, spirit: 10 }
  }
];

const pantheons = [
  {
    id: 'greek',
    name: 'Greek Pantheon',
    color: 'border-purple-500/30 bg-purple-500/5 text-purple-400 hover:border-purple-500/60',
    tagline: 'Claim the thunder of Mount Olympus.',
    desc: 'Start with Bronze Spear and Aegis Hood. Access thunderbolts and solve Delphic riddles.'
  },
  {
    id: 'norse',
    name: 'Norse Pantheon',
    color: 'border-blue-500/30 bg-blue-500/5 text-blue-400 hover:border-blue-500/60',
    tagline: 'Awaken the runes of Asgard.',
    desc: 'Start with Raider Axe and Midgard Hood. Access runic frost spells and slay barrow draugrs.'
  },
  {
    id: 'egyptian',
    name: 'Egyptian Pantheon',
    color: 'border-amber-500/30 bg-amber-500/5 text-amber-400 hover:border-amber-500/60',
    tagline: 'Harness the light of Heliopolis.',
    desc: 'Start with Obsidian Khopesh and Nile Cowl. Access solar fire magic and weigh hearts.'
  }
];

export default function Onboarding() {
  const router = useRouter();
  const onboardPlayer = useGameStore(state => state.onboardPlayer);

  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState(0);
  const [selectedPantheon, setSelectedPantheon] = useState<'greek' | 'norse' | 'egyptian'>('greek');

  const handleNext = () => {
    if (step === 1 && !username.trim()) {
      audioEngine.playBattleImpact();
      return;
    }
    audioEngine.playClick();
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    audioEngine.playClick();
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleComplete = () => {
    audioEngine.playLevelUp();
    onboardPlayer(username, origins[selectedOrigin].name, selectedPantheon);
    router.push('/hub');
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-between bg-neutral-950 p-6 md:p-12 relative overflow-hidden font-sans"
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(38, 26, 15, 0.05) 0%, transparent 85%)'
      }}
    >
      {/* Astrolabe graphic background */}
      <div className="absolute w-[600px] h-[600px] border border-neutral-900 rounded-full -z-10 animate-spin-slow" />

      {/* HEADER */}
      <header className="flex justify-between items-center max-w-5xl mx-auto w-full border-b border-neutral-900 pb-4">
        <span className="font-serif text-lg tracking-[0.2em] text-amber-500 font-bold">MYTHWALKER SANCTUARY</span>
        <div className="flex gap-2">
          {[1, 2, 3].map(num => (
            <Circle key={num} className={`w-2.5 h-2.5 ${step >= num ? 'fill-amber-500 text-amber-500' : 'text-neutral-800'}`} />
          ))}
        </div>
      </header>

      {/* STEP CONTENT CONTAINER */}
      <main className="flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full space-y-6"
            >
              <div className="space-y-2">
                <span className="text-amber-500 text-[10px] font-serif font-bold tracking-widest uppercase">Stage 1 of 3</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold">DECLARE YOUR MYTHIC IDENTITY</h2>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">Step through the Ley-line gate. Type the name that will be recorded in the scrolls of Olympus, Asgard, and Heliopolis.</p>
              </div>

              <div className="space-y-4 max-w-md pt-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider block">Mythwalker Avatar Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={18}
                      placeholder="e.g., AchillesSeeker, ThorDisciple"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full bg-neutral-900/60 border border-neutral-800 rounded pl-12 pr-4 py-3.5 focus:outline-none focus:border-amber-500/50 text-neutral-100 placeholder-neutral-600 font-serif"
                    />
                    <User className="absolute left-4 top-4 text-neutral-600" size={16} />
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!username.trim()}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-900 disabled:text-neutral-600 text-neutral-950 font-serif font-bold tracking-widest px-8 py-3.5 rounded transition-transform hover:scale-[1.02] text-xs flex items-center justify-center gap-2"
                >
                  <span>CHOOSE ORIGIN PATH</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
            >
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-2">
                  <span className="text-amber-500 text-[10px] font-serif font-bold tracking-widest uppercase">Stage 2 of 3</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold">SELECT YOUR ORIGIN</h2>
                  <p className="text-xs text-neutral-400">Origins determine starting attribute allocations and distinct passive properties.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-2 text-xs">
                  {origins.map((origin, index) => (
                    <button
                      key={origin.name}
                      onClick={() => {
                        setSelectedOrigin(index);
                        audioEngine.playClick();
                      }}
                      className={`text-left p-4 rounded border transition-colors ${
                        selectedOrigin === index 
                          ? 'border-amber-500 bg-amber-500/5' 
                          : 'border-neutral-900 bg-neutral-950/60 hover:border-neutral-800'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif font-bold text-neutral-200">{origin.name}</h3>
                        <span className="text-[9px] text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded">{origin.bonus}</span>
                      </div>
                      <p className="text-[11px] text-neutral-450 leading-relaxed mb-2.5">{origin.desc}</p>
                      <span className="text-[9px] font-semibold text-neutral-400 bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded block">
                        💡 {origin.perk}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={handleBack} className="px-6 py-3.5 border border-neutral-800 hover:bg-neutral-900 text-neutral-400 font-serif tracking-widest text-xs rounded">
                    BACK
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-bold tracking-widest px-8 py-3.5 rounded transition-transform hover:scale-[1.02] text-xs flex items-center justify-center gap-2"
                  >
                    <span>ALIGN PORTAL</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Character layered preview */}
              <div className="space-y-4">
                <span className="text-[10px] text-neutral-500 font-serif uppercase tracking-widest block text-center">TRAVELLER PREVIEW</span>
                <PlayerCharacter previewWeaponId={null} previewArmorIds={{ head: null, chest: null, arms: null, legs: null }} />
                <div className="text-center bg-neutral-950/60 border border-neutral-900 p-4 rounded text-xs">
                  <span className="text-amber-500 font-serif font-semibold">Origin Stats Summary:</span>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-[10px] text-neutral-450">
                    <div>STR: {origins[selectedOrigin].stats.strength}</div>
                    <div>WIS: {origins[selectedOrigin].stats.wisdom}</div>
                    <div>INS: {origins[selectedOrigin].stats.insight}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full space-y-6"
            >
              <div className="space-y-2">
                <span className="text-amber-500 text-[10px] font-serif font-bold tracking-widest uppercase">Stage 3 of 3</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold">AWAKEN YOUR STARTING PANTHEON</h2>
                <p className="text-xs text-neutral-400">Choose your starting portal. You will begin inside this world with its native starter weapon and head guard equipped.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
                {pantheons.map((pant) => (
                  <button
                    key={pant.id}
                    onClick={() => {
                      setSelectedPantheon(pant.id as any);
                      audioEngine.playClick();
                    }}
                    className={`text-left p-6 rounded border flex flex-col justify-between h-[230px] transition-colors ${
                      selectedPantheon === pant.id 
                        ? `${pant.color} border-amber-500 bg-amber-500/5` 
                        : 'border-neutral-900 bg-neutral-950/60 hover:border-neutral-800 text-neutral-450'
                    }`}
                  >
                    <div className="space-y-3">
                      <h3 className="font-serif font-bold text-neutral-200 text-base">{pant.name}</h3>
                      <p className="text-[10px] text-amber-500 font-serif font-bold uppercase tracking-wider">{pant.tagline}</p>
                      <p className="text-xs text-neutral-450 leading-relaxed">{pant.desc}</p>
                    </div>
                    <span className="text-[10px] font-serif font-bold tracking-wider uppercase block mt-4">
                      {selectedPantheon === pant.id ? '✓ Selected' : 'Align Portal'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="px-6 py-3.5 border border-neutral-800 hover:bg-neutral-900 text-neutral-400 font-serif tracking-widest text-xs rounded">
                  BACK
                </button>
                <button
                  onClick={handleComplete}
                  className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-black tracking-widest px-10 py-3.5 rounded transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.3)] text-xs"
                >
                  ENTER HALL OF ECHOES
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto w-full text-center text-[10px] text-neutral-600 pt-4 border-t border-neutral-900 uppercase tracking-widest">
        © 2026 MythVerse. Choose wisely, for your stats will shape your battles.
      </footer>
    </div>
  );
}
