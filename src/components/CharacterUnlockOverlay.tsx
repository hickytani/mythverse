'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { characters } from '@/data/seed/characters';
import { Sparkles, Trophy, Check, ArrowRight } from 'lucide-react';
import { audioEngine } from '@/utils/audioEngine';
import Image from 'next/image';

export default function CharacterUnlockOverlay() {
  const pendingUnlockId = useGameStore(state => state.pendingCharacterUnlock);
  const dismissUnlock = useGameStore(state => state.dismissUnlockOverlay);
  const equipCompanion = useGameStore(state => state.equipCompanion);

  const character = characters.find(c => c.id === pendingUnlockId);
  const [showContents, setShowContents] = useState(false);

  useEffect(() => {
    if (pendingUnlockId) {
      audioEngine.playLevelUp(); // Play epic reveal audio
      setShowContents(true);
    } else {
      setShowContents(false);
    }
  }, [pendingUnlockId]);

  if (!character) return null;

  const handleEquip = () => {
    audioEngine.playClick();
    equipCompanion(character.id);
    dismissUnlock();
  };

  return (
    <AnimatePresence>
      {showContents && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          {/* Cosmic particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  y: [0, -100],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 4 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl bg-neutral-900 border border-amber-500/30 rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-[0_0_50px_rgba(245,158,11,0.2)]"
          >
            {/* Background design elements */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Character Artwork Stage */}
            <div className="relative w-64 h-80 shrink-0 bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden group shadow-2xl flex items-center justify-center">
              {/* Silhouette reveal effect */}
              <motion.div
                initial={{ filter: 'brightness(0) contrast(1.4)' }}
                animate={{ filter: 'brightness(1) contrast(1)' }}
                transition={{ delay: 1.5, duration: 2 }}
                className="w-full h-full relative"
              >
                <img
                  src={character.visualAssets.fullBody}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Pantheon Sigil Background */}
              <div className="absolute top-4 left-4 text-xs font-serif font-black tracking-widest text-amber-500/30">
                {character.pantheon.toUpperCase()}
              </div>
            </div>

            {/* Info and Unlock Rewards */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-1">
                <motion.span
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-amber-500 text-[10px] font-serif font-bold tracking-[0.3em] uppercase block"
                >
                  New Mythological Ally Unlocked
                </motion.span>
                <motion.h2
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl md:text-5xl font-serif font-black text-neutral-100 uppercase"
                >
                  {character.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-xs text-neutral-450 italic"
                >
                  "{character.title}"
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-2 gap-4 text-left border-y border-neutral-850 py-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold block">Rarity</span>
                  <span className="text-xs text-amber-400 font-serif font-bold uppercase tracking-widest">{character.rarity}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold block">Role</span>
                  <span className="text-xs text-neutral-300 font-serif font-bold">{character.role}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="space-y-3 text-left"
              >
                <div className="bg-neutral-950/60 border border-neutral-850 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={14} />
                    <span className="text-[11px] font-serif font-bold text-amber-500 uppercase tracking-wider">Companion Ability: {character.activeAbility.name}</span>
                  </div>
                  <p className="text-[11px] text-neutral-450 leading-relaxed">
                    {character.activeAbility.description}
                  </p>
                </div>

                <div className="bg-neutral-950/60 border border-neutral-850 p-4 rounded-xl space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Companion Exploration Bonus</span>
                  <p className="text-xs font-serif text-neutral-300">
                    {character.companionBonus}
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="flex flex-col sm:flex-row gap-3 pt-2"
              >
                <button
                  onClick={handleEquip}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-bold tracking-widest px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02] text-xs flex items-center justify-center gap-2"
                >
                  <Check size={14} />
                  <span>EQUIP AS COMPANION</span>
                </button>
                <button
                  onClick={() => {
                    audioEngine.playClick();
                    dismissUnlock();
                  }}
                  className="flex-1 border border-neutral-800 hover:bg-neutral-850 text-neutral-400 font-serif tracking-widest px-6 py-3.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-2"
                >
                  <span>RETURN TO SANCTUARY</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
