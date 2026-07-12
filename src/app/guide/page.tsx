'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { Compass, BookOpen, Swords, Hammer, Award, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const tutorialSlides = [
  {
    title: 'Welcome, Mythwalker!',
    desc: 'You are a Mythwalker, a traveler with the rare ability to cross between the legendary realms of Greece, Asgard, and Duat.',
    action: 'Select your starting alignment and begin exploring.',
    focusArea: 'onboarding'
  },
  {
    title: 'Explore World Landmarks',
    desc: 'Venture into Mount Olympus, Asgard, or tombs in Duat. Zoom/pan maps and click nodes to teleport through Ley-lines.',
    action: 'Earn reputation points by exploring new regions.',
    focusArea: 'maps'
  },
  {
    title: 'Accept Quests & Story Campaigns',
    desc: 'Main campaigns advance your alignment chapters (dialogues, choices, battles). Side quests reveal historical myths.',
    action: 'Objectives track automatically and reward experience.',
    focusArea: 'campaign'
  },
  {
    title: 'Strategy Combat & Weaknesses',
    desc: 'Creature fights are turn-based. Tap "Exploit Weakness" to trigger trivia: correct answers multiply hits and stun monsters!',
    action: 'Earn materials (bronze, runes, thread) on victory.',
    focusArea: 'battles'
  },
  {
    title: 'Forging & Skill constellations',
    desc: 'Upgrade weapons and armor pieces at the Forge. Allocate attribute tokens and unlock constellation talents on level up.',
    action: 'Upgrades unlock unique passive perks.',
    focusArea: 'forge'
  }
];

export default function GuideScreen() {
  const state = useGameStore();
  const [slideIdx, setSlideIdx] = useState(0);
  const [tutorialComplete, setTutorialComplete] = useState(false);

  const handleNextSlide = () => {
    audioEngine.playClick();
    if (slideIdx + 1 < tutorialSlides.length) {
      setSlideIdx(prev => prev + 1);
    } else {
      setTutorialComplete(true);
      // Award starter items
      state.addCoins(100);
      state.addXp(50);
      state.unlockAchievement('ach_first_blood'); // tutorial unlock
    }
  };

  const resetTutorial = () => {
    audioEngine.playClick();
    setSlideIdx(0);
    setTutorialComplete(false);
  };

  return (
    <div className="space-y-8 pb-12 font-sans">
      
      {/* Header */}
      <div className="border-b border-neutral-900 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold uppercase tracking-wider text-neutral-100 font-serif">MYTHWALKER HANDBOOK</h1>
          <p className="text-xs text-neutral-500">Master the exploration mechanics, combat sequences, and forging guides.</p>
        </div>
        <Link href="/hub" className="text-xs text-neutral-400 hover:text-amber-500 flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Hub
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* INTERACTIVE GUIDE STEPS (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 space-y-6">
            <h3 className="font-serif font-bold text-neutral-200 text-sm border-b border-neutral-850 pb-2">THE 10 PILLARS OF MYTHVERSE</h3>
            
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-neutral-950 border border-amber-500/30 flex items-center justify-center font-bold text-amber-500 shrink-0">1</span>
                <div>
                  <h4 className="font-serif font-bold text-neutral-200">Ley-line Teleportation</h4>
                  <p className="text-neutral-400 mt-0.5">Access the World Map of your alignment. Hover nodes to view coordinates, select locations, and teleport instantly to discover regional ruins.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-neutral-950 border border-amber-500/30 flex items-center justify-center font-bold text-amber-500 shrink-0">2</span>
                <div>
                  <h4 className="font-serif font-bold text-neutral-200">Campaign Chapters</h4>
                  <p className="text-neutral-400 mt-0.5">Explore stages involving dialogues and choices. Choices award reputation alignment and rare items.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-neutral-950 border border-amber-500/30 flex items-center justify-center font-bold text-amber-500 shrink-0">3</span>
                <div>
                  <h4 className="font-serif font-bold text-neutral-200">Knowledge Battles</h4>
                  <p className="text-neutral-400 mt-0.5">Fight boss creatures (Hydra, Fenrir) in turn-based combat. Exploit weaknesses by answering trivia challenges correctly to deal 1.5x critical damage and stun enemies.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-neutral-950 border border-amber-500/30 flex items-center justify-center font-bold text-amber-500 shrink-0">4</span>
                <div>
                  <h4 className="font-serif font-bold text-neutral-200">Blacksmith Upgrades</h4>
                  <p className="text-neutral-400 mt-0.5">Gather materials like bronze fragments, runes, and spirit threads. Spend them at the Anvil Forge to upgrade equipment, boosting physical attack and shield ratings.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-neutral-950 border border-amber-500/30 flex items-center justify-center font-bold text-amber-500 shrink-0">5</span>
                <div>
                  <h4 className="font-serif font-bold text-neutral-200">Constellation Tree</h4>
                  <p className="text-neutral-400 mt-0.5">Level up to earn talent points. Allocate them across Warrior, Scholar, Seer, and Mythic paths to unlock passive modifiers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE GUIDE SLIDES (Right col) */}
        <div className="space-y-6">
          <div className="bg-neutral-900/40 border border-rpg-gold rounded-2xl p-6 space-y-6 flex flex-col justify-between min-h-[360px]">
            
            {tutorialComplete ? (
              <div className="text-center space-y-4 my-auto">
                <ShieldCheck className="text-green-400 mx-auto" size={44} />
                <h3 className="font-serif font-bold text-neutral-100 text-base">TUTORIAL COMPLETE</h3>
                <p className="text-xs text-neutral-450 leading-relaxed">
                  You have successfully completed the Mythwalker trials! The archives have awarded you:
                </p>
                <div className="p-3 bg-neutral-950 border border-neutral-900 rounded text-xs font-serif text-amber-500">
                  🪙 +100 Coins | +50 XP
                </div>
                <button
                  onClick={resetTutorial}
                  className="w-full py-3 border border-neutral-800 hover:bg-neutral-900 text-neutral-400 font-serif font-bold tracking-widest text-xs uppercase rounded transition-colors"
                >
                  REPLAY TUTORIAL
                </button>
              </div>
            ) : (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-amber-500 uppercase tracking-widest font-serif font-bold">
                    <span>Guided Trial</span>
                    <span>{slideIdx + 1} / {tutorialSlides.length}</span>
                  </div>
                  <h4 className="font-serif font-bold text-neutral-200 text-sm">{tutorialSlides[slideIdx].title}</h4>
                  <p className="text-xs text-neutral-450 leading-relaxed italic">"{tutorialSlides[slideIdx].desc}"</p>
                </div>

                <div className="p-3 bg-neutral-950 border border-neutral-850 rounded text-xs text-neutral-400">
                  <span className="text-[9px] text-neutral-500 uppercase font-semibold block mb-0.5">Objective:</span>
                  {tutorialSlides[slideIdx].action}
                </div>

                <button
                  onClick={handleNextSlide}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-bold tracking-widest text-xs uppercase rounded transition-transform hover:scale-[1.02] flex items-center justify-center gap-1.5"
                >
                  <span>{slideIdx + 1 === tutorialSlides.length ? 'FINISH TRIAL' : 'NEXT STEP'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
            
          </div>
        </div>

      </div>

    </div>
  );
}
