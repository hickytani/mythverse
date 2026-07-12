'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  CheckCircle,
  HelpCircle,
  Play,
  ArrowRight,
  User,
  Compass
} from 'lucide-react';
import { characters } from '@/data/seed/characters';
import MythDialogueScene from '@/components/MythDialogueScene';
import { useRouter } from 'next/navigation';
import EnvironmentBackground from '@/components/EnvironmentBackground';

export default function QuestsJournal() {
  const router = useRouter();
  const state = useGameStore();

  const [activeDialogueChar, setActiveDialogueChar] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Greek Vertical Slice Dialogues
  const athenaTutorialDialogues = [
    {
      text: "The Oracle of Delphi has fallen silent. A toxic vapors leak from the chasm, but the priests speak of a dark, scaly shadow nesting in the lower vaults.",
      choices: ["I will travel to Delphi immediately.", "Is there a weapon I can use?", "Who or what did this?"]
    },
    {
      text: "Take this Spear of Pallas. Seek the Vault Serpent nesting below the Delphi temple. It feeds on the ley-line energy. Cut it down, and the Oracle's voice will return.",
      choices: ["I accept this task.", "Tell me more about the serpent's weakness."]
    }
  ];

  const handleQuestClaim = (questId: string) => {
    audioEngine.playQuestComplete();
    state.claimQuestRewards(questId);
  };

  const handleAthenaTalk = () => {
    audioEngine.playClick();
    setActiveDialogueChar('char_athena');
    setActiveStep(0);
  };

  const handleDialogueChoice = (idx: number) => {
    if (activeStep < athenaTutorialDialogues.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      // Conclude dialogue and trigger Delphi quest unlock/start!
      setActiveDialogueChar(null);
      
      // Make sure Greek campaign node gk_node1 is unlocked or complete!
      // Add custom quest/campaign trigger:
      // Let's redirect player to Greek campaign Delphi temple quest!
      audioEngine.playQuestComplete();
      
      // Add the Broken Oracle quest to active quests if not already there
      const hasQuest = state.activeQuests.some(q => q.id === 'quest_broken_oracle');
      if (!hasQuest) {
        const questTemplate = {
          id: 'quest_broken_oracle',
          title: 'The Broken Oracle',
          description: 'Defeat the corrupted Vault Serpent in Delphi and obtain Athena\'s alignment.',
          type: 'main' as const,
          pantheon: 'greek' as const,
          difficulty: 'Medium' as const,
          recommendedLevel: 1,
          questGiver: 'Athena',
          objectives: [
            { id: 'obj_1', description: 'Confront the Delphi Vault Serpent', targetCount: 1, currentCount: 0 }
          ],
          rewards: {
            xp: 150,
            coins: 50,
            itemRewardId: 'bronze_spear'
          },
          isCompleted: false,
          isClaimed: false
        };
        // Add to active quests
        useGameStore.setState({
          activeQuests: [questTemplate, ...state.activeQuests]
        });
      }

      router.push('/campaign/greek');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between py-6 px-4 md:px-8 overflow-hidden font-sans">
      
      {/* Background layer */}
      <EnvironmentBackground pantheon="greek" intensity="cinematic" />

      {/* Main Container */}
      <div className="relative max-w-4xl mx-auto w-full space-y-6 z-10">
        
        {/* Header Title */}
        <header className="border-b border-neutral-900 pb-4">
          <span className="text-[10px] text-amber-500 font-serif font-black tracking-widest uppercase block mb-1">Quest Log & Codex Chronicle</span>
          <h1 className="text-2xl md:text-3xl font-serif font-black tracking-wide text-neutral-100 uppercase">PARCHMENT JOURNAL</h1>
        </header>

        {/* DIALOGUE STAGE PANEL */}
        {activeDialogueChar && (
          <div className="animate-fade-in">
            <MythDialogueScene 
              speaker={{
                name: 'Athena',
                title: 'Goddess of Wisdom & Strategy',
                avatarUrl: '/images/characters/athena/full-body.png',
                pantheon: 'greek'
              }}
              dialogue={athenaTutorialDialogues[activeStep].text}
              choices={athenaTutorialDialogues[activeStep].choices}
              onSelectChoice={handleDialogueChoice}
              onClose={() => setActiveDialogueChar(null)}
            />
          </div>
        )}

        {/* QUEST GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Main Active Quests (Left 7 cols) */}
          <div className="md:col-span-7 bg-[#f2e8cf] text-[#1a1510] border border-[#d4c5a1] rounded-3xl p-6 shadow-2xl relative">
            {/* Dec decorative margins */}
            <div className="absolute top-0 bottom-0 left-4 w-[1px] bg-red-400/20" />
            
            <div className="pl-6 space-y-6">
              <div>
                <span className="text-[10px] text-red-700/60 font-serif font-black tracking-widest uppercase block mb-1">Quest Scroll</span>
                <h3 className="text-lg font-serif font-black tracking-wide text-neutral-900 uppercase">ACTIVE SCROLLS</h3>
              </div>

              <div className="space-y-4">
                {/* Special Athena Tutorial Hook banner */}
                {!state.completedQuests.includes('quest_broken_oracle') && (
                  <div className="p-4 bg-neutral-950/5 border border-red-800/10 rounded-xl space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[9px] text-red-800 font-serif font-bold uppercase tracking-wider block">Sacred Alliance Initiation</span>
                        <h4 className="font-serif font-bold text-sm text-neutral-900 mt-0.5">SPOKEN DEITY: ATHENA</h4>
                        <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                          Consult Athena at the sanctuary to accept the Delphi Temple quest and obtain her alignment companion slot.
                        </p>
                      </div>
                      
                      <button
                        onClick={handleAthenaTalk}
                        className="px-4 py-2 bg-neutral-950 hover:bg-neutral-900 text-amber-500 font-serif font-bold tracking-widest text-[10px] rounded transition-all shrink-0 hover:scale-[1.02]"
                      >
                        TALK
                      </button>
                    </div>
                  </div>
                )}

                {state.activeQuests.map((q) => (
                  <div key={q.id} className="p-4 bg-neutral-950/5 border border-amber-900/10 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-black text-neutral-900 text-sm uppercase tracking-wide">{q.title}</span>
                        <span className="text-[8px] bg-red-800/10 text-red-800 uppercase px-2 py-0.5 rounded font-black tracking-widest">{q.difficulty}</span>
                      </div>
                      <p className="text-xs text-neutral-700 mt-1">{q.description}</p>
                    </div>

                    {q.isCompleted ? (
                      <button
                        onClick={() => handleQuestClaim(q.id)}
                        className="px-4 py-2 bg-neutral-950 hover:bg-neutral-900 text-amber-500 font-serif font-bold tracking-widest text-[10px] rounded transition-colors shrink-0"
                      >
                        CLAIM REWARDS
                      </button>
                    ) : (
                      <span className="text-[9px] text-neutral-500 uppercase font-bold bg-neutral-950/5 border border-neutral-900/10 px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                ))}

                {state.activeQuests.length === 0 && (
                  <div className="text-center py-8 text-neutral-500 text-xs italic">
                    Your journal is clear. Speak with the gods to accept campaign chapters.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Daily Tasks & Streaks (Right 5 cols) */}
          <div className="md:col-span-5 bg-neutral-900/60 border border-neutral-850 rounded-3xl p-6 space-y-4">
            <span className="text-[10px] text-neutral-500 font-serif font-black tracking-widest uppercase block">Daily Sanctuary Runes</span>
            <div className="space-y-3">
              <div className="p-3 bg-neutral-950/60 border border-neutral-850/60 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className={`p-0.5 rounded-full border ${state.completedQuests.includes('daily_1') ? 'bg-green-500/15 border-green-500/35 text-green-400' : 'border-neutral-800 text-neutral-600'}`}>
                    <CheckCircle size={10} />
                  </div>
                  <span className="text-[11px] text-neutral-300">Complete one Arena Quiz</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-950/60 border border-neutral-850/60 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className={`p-0.5 rounded-full border ${state.weapons.some(w => w.upgradeLevel > 0) ? 'bg-green-500/15 border-green-500/35 text-green-400' : 'border-neutral-800 text-neutral-600'}`}>
                    <CheckCircle size={10} />
                  </div>
                  <span className="text-[11px] text-neutral-300">Upgrade a weapon at the Forge</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-950/60 border border-neutral-850/60 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className={`p-0.5 rounded-full border ${state.unlockedCodexIds.length > 5 ? 'bg-green-500/15 border-green-500/35 text-green-400' : 'border-neutral-800 text-neutral-600'}`}>
                    <CheckCircle size={10} />
                  </div>
                  <span className="text-[11px] text-neutral-300">Read one Myth in the Codex</span>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-850 pt-4 flex justify-between items-center text-xs">
              <div>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest block">Daily Streak</span>
                <span className="text-amber-500 font-serif font-black text-sm">{state.dailyStreak} Days 🔥</span>
              </div>
              <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-serif font-bold">Resets Daily</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
