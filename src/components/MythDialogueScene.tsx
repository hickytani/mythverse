'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, ChevronRight, X } from 'lucide-react';
import { audioEngine } from '@/utils/audioEngine';

interface MythDialogueSceneProps {
  speaker: {
    name: string;
    title: string;
    avatarUrl: string;
    pantheon: string;
  };
  dialogue: string;
  choices: string[];
  onSelectChoice: (index: number) => void;
  onClose?: () => void;
}

export default function MythDialogueScene({
  speaker,
  dialogue,
  choices,
  onSelectChoice,
  onClose
}: MythDialogueSceneProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleChoice = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    audioEngine.playQuestComplete();
    setTimeout(() => {
      onSelectChoice(index);
      setSelected(null);
    }, 400);
  };

  return (
    <div className="bg-neutral-900/90 border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden shadow-2xl backdrop-blur-sm flex flex-col md:flex-row gap-6 items-center">
      {/* Background design elements */}
      <div className="absolute -left-12 -top-12 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Speaker Avatar Stage */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
        <img
          src={speaker.avatarUrl}
          alt={speaker.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent py-1.5 text-center">
          <span className="text-[9px] font-serif font-black tracking-widest text-amber-500 uppercase">{speaker.pantheon}</span>
        </div>
      </div>

      {/* Dialogue Text & Choices */}
      <div className="flex-1 space-y-4 w-full">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-amber-500 font-serif font-bold text-base tracking-wide uppercase">{speaker.name}</span>
            {onClose && (
              <button 
                onClick={() => {
                  audioEngine.playClick();
                  onClose();
                }}
                className="text-neutral-500 hover:text-neutral-300"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">{speaker.title}</span>
        </div>

        {/* Typed-like dialogue bubble */}
        <p className="text-xs text-neutral-300 leading-relaxed font-sans bg-neutral-950/40 p-4 rounded-xl border border-neutral-850/60">
          &quot;{dialogue}&quot;
        </p>

        {/* Choices rail */}
        <div className="space-y-2">
          {choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleChoice(i)}
              disabled={selected !== null}
              className={`w-full text-left p-3 rounded-lg border text-xs font-serif transition-all duration-300 flex items-center justify-between gap-3 ${
                selected === i
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                  : 'border-neutral-850 bg-neutral-950 hover:border-amber-500/30 hover:bg-neutral-900/45 text-neutral-300'
              }`}
            >
              <span>{choice}</span>
              <ChevronRight size={14} className="text-neutral-600 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
