'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Trophy, Check, Sparkles } from 'lucide-react';
import { audioEngine } from '@/utils/audioEngine';

export default function LevelUpOverlay() {
  const pendingLevelUp = useGameStore(state => state.pendingLevelUp);
  const dismissLevelUp = useGameStore(state => state.dismissLevelUpOverlay);
  const [showContents, setShowContents] = useState(false);

  useEffect(() => {
    if (pendingLevelUp) {
      audioEngine.playLevelUp(); // Trigger level up audio synthesize
      setShowContents(true);
    } else {
      setShowContents(false);
    }
  }, [pendingLevelUp]);

  if (!pendingLevelUp) return null;

  return (
    <AnimatePresence>
      {showContents && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          {/* Energy beams */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"
                style={{ top: `${20 + i * 15}%` }}
                animate={{
                  x: [-1000, 1000],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg bg-neutral-900 border border-amber-500/30 rounded-3xl p-8 relative overflow-hidden text-center shadow-[0_0_50px_rgba(245,158,11,0.25)]"
          >
            {/* Background design elements */}
            <div className="absolute -left-16 -top-16 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              {/* Level Medallion */}
              <div className="relative mx-auto w-28 h-28 flex items-center justify-center">
                <motion.div 
                  className="absolute inset-0 rounded-full border border-amber-500/30 bg-amber-500/5 animate-spin-slow"
                />
                <motion.div 
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-neutral-950 border-2 border-amber-500 flex items-center justify-center font-serif text-3xl font-black text-amber-500 shadow-2xl"
                >
                  {pendingLevelUp.newLevel}
                </motion.div>
                <motion.div
                  className="absolute -inset-2 rounded-full border border-amber-500/20"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              <div className="space-y-1">
                <span className="text-amber-500 text-[10px] font-serif font-bold tracking-[0.3em] uppercase block">Ascension Complete</span>
                <h2 className="text-3xl font-serif font-black text-neutral-100 uppercase tracking-wide">
                  LEVEL UP
                </h2>
                <p className="text-xs text-neutral-450">
                  You have grown stronger. The Ley-lines of the cosmos realign to your will.
                </p>
              </div>

              {/* Attributes and Rewards */}
              <div className="space-y-3 bg-neutral-950/60 border border-neutral-850 p-6 rounded-2xl text-left">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold block mb-2">Rewards Unlocked</span>
                <div className="space-y-2">
                  {pendingLevelUp.rewards.map((reward, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                      className="flex items-center gap-3 text-xs text-neutral-300"
                    >
                      <div className="p-0.5 rounded-full bg-amber-500/10 text-amber-400">
                        <Sparkles size={12} />
                      </div>
                      <span>{reward}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Proceed Action Button */}
              <button
                onClick={() => {
                  audioEngine.playLevelUp();
                  dismissLevelUp();
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-bold tracking-widest py-3.5 rounded-xl transition-all hover:scale-[1.02] text-xs flex items-center justify-center gap-2"
              >
                <Check size={14} />
                <span>CONFIRM ASCENSION</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
