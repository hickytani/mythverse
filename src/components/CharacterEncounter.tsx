'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { characterAssetRegistry } from '@/data/assets/characters';
import { useGameStore } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { Check, X, Award, User } from 'lucide-react';
import PlayerCharacter from './PlayerCharacter';

interface CharacterEncounterProps {
  characterId: string;
  onClose: () => void;
}

export default function CharacterEncounterModal({ characterId, onClose }: CharacterEncounterProps) {
  const state = useGameStore();
  const character = characterAssetRegistry[characterId] || characterAssetRegistry.char_athena;

  const [dialogueStep, setDialogueStep] = useState(0);
  const [questAccepted, setQuestAccepted] = useState(false);

  const currentAffinity = state.characterAffinities[characterId]?.level || 'Encountered';

  const handleAcceptQuest = () => {
    audioEngine.playLevelUp();
    state.gainAffinityXp(characterId, 50);
    state.unlockCodexEntry(characterId);
    setQuestAccepted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-2xl bg-neutral-950 border border-amber-500/30 rounded-2xl p-6 shadow-2xl relative space-y-6 overflow-hidden"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors"
        >
          <X size={18} />
        </button>

        {/* CHARACTER ENCOUNTER HEADER */}
        <div className="flex items-center gap-4 border-b border-neutral-850 pb-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-full text-amber-400">
            <User size={28} />
          </div>
          <div>
            <span className="text-[10px] font-serif font-bold uppercase tracking-[0.25em] text-amber-500 block">
              MYTHIC CHARACTER ENCOUNTER
            </span>
            <h3 className="text-2xl font-serif font-black tracking-widest text-neutral-100 uppercase">
              {character.name}
            </h3>
            <span className="text-xs text-neutral-400 font-serif italic">
              {character.title} • <span className="text-amber-400 font-bold">Affinity: {currentAffinity}</span>
            </span>
          </div>
        </div>

        {/* 2D ANIMATED CHARACTER ENCOUNTER VIEW */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-neutral-900/40 border border-neutral-850 p-4 rounded-xl">
          <div className="w-40 h-48 flex items-center justify-center bg-neutral-950 border border-neutral-800 rounded-lg relative overflow-hidden">
            <PlayerCharacter animatePose={true} size="md" />
          </div>

          <div className="flex-1 space-y-3">
            <div className="p-3 bg-neutral-950/80 border border-neutral-800 rounded-lg text-xs text-neutral-200 font-serif leading-relaxed italic">
              &quot;{character.dialogueIntro}&quot;
            </div>

            {/* QUEST ASSIGNMENT */}
            {character.initialQuests.map(q => (
              <div key={q.id} className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-amber-300 flex items-center gap-1.5">
                    <Award size={14} />
                    {q.title}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    +{q.rewardXp} XP • +{q.rewardCoins} Coins
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans">{q.description}</p>
                <div className="text-[10px] text-neutral-500 font-mono">Objective: {q.objective}</div>

                {!questAccepted ? (
                  <button
                    onClick={handleAcceptQuest}
                    className="mt-2 w-full py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-black tracking-widest text-xs rounded transition-transform hover:scale-[1.02] flex items-center justify-center gap-1.5 uppercase"
                  >
                    <Check size={14} />
                    ACCEPT QUEST & GAIN AFFINITY
                  </button>
                ) : (
                  <div className="mt-2 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-center text-emerald-400 font-serif text-xs font-bold uppercase flex items-center justify-center gap-1">
                    <Check size={14} />
                    QUEST ACTIVE IN JOURNAL
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DIALOGUE ACTIONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-750 text-neutral-300 font-serif font-bold text-xs rounded transition-colors uppercase tracking-wider"
          >
            DEPART SANCTUARY
          </button>
        </div>
      </motion.div>
    </div>
  );
}
