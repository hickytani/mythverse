'use client';

import React, { use, useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { mythologyDb } from '../../../data/seed';
import { audioEngine } from '../../../utils/audioEngine';
import { 
  ArrowLeft, 
  BookOpen, 
  MessageSquare, 
  HelpCircle, 
  Swords, 
  Award, 
  CheckCircle,
  Play,
  AwardIcon,
  Crown
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  params: Promise<{ pantheon: string }>;
}

export default function PantheonCampaign({ params }: Props) {
  const resolvedParams = use(params);
  const pantheon = resolvedParams.pantheon as 'greek' | 'norse' | 'egyptian';
  const router = useRouter();
  
  const state = useGameStore();
  const campaign = state.campaignChapters.find(c => c.pantheon === pantheon);
  
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [choiceCompleted, setChoiceCompleted] = useState(false);

  if (!campaign) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-red-500 font-serif">
        <h2 className="text-xl">Campaign Data Sealed</h2>
      </div>
    );
  }

  const handleNodeExecute = (node: any) => {
    audioEngine.playClick();
    
    if (node.type === 'battle') {
      // route to battle screen
      const battleId = `battle_${node.id}`;
      // Initialize combat state in Zustand store
      // Player HP is calculated based on Endurance
      const pMaxHp = state.attributes.endurance * 15;
      
      // Look up opponent stats
      const creature = mythologyDb.creatures.find(c => c.id === node.data.creatureId)!;
      state.startBattle(battleId, creature.id, pMaxHp, pMaxHp, creature.health, creature.health);
      
      router.push(`/battle/${battleId}`);
      return;
    }

    if (node.type === 'quiz') {
      // redirect to quiz arena directly
      router.push('/quiz-arena');
      return;
    }

    if (node.type === 'lore') {
      // redirect to codex or display lore content directly
      router.push('/codex');
      return;
    }

    // Otherwise, it is a dialog or choice node
    setActiveNodeId(node.id);
    setDialogueOpen(true);
  };

  const handleDialogueClose = (nodeId: string) => {
    audioEngine.playQuestComplete();
    setDialogueOpen(false);
    state.completeCampaignNode(pantheon, campaign.id, nodeId);
  };

  const handleChoice = (nodeId: string, choice: any) => {
    audioEngine.playLevelUp();
    
    // Apply rewards
    if (choice.rewardReputation) state.adjustReputation(pantheon, choice.rewardReputation);
    if (choice.rewardSpirit) {
      // Grant attribute boost
      const currentAttrs = state.attributes;
      useGameStore.setState({
        attributes: { ...currentAttrs, spirit: currentAttrs.spirit + choice.rewardSpirit }
      });
    }
    if (choice.rewardWeaponId) {
      const template = mythologyDb.weapons.find(w => w.id === choice.rewardWeaponId);
      if (template) state.acquireWeapon(template);
    }
    if (choice.rewardRelicId) {
      const template = mythologyDb.relics.find(r => r.id === choice.rewardRelicId);
      if (template) state.acquireRelic(template);
    }

    setDialogueOpen(false);
    state.completeCampaignNode(pantheon, campaign.id, nodeId);
    setChoiceCompleted(true);
  };

  const claimChapterAwards = () => {
    audioEngine.playQuestComplete();
    state.claimChapterRewards(pantheon, campaign.id);
  };

  const isChapterComplete = campaign.nodes.every(n => n.completed);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
        <div className="flex items-center gap-3">
          <Link href={`/worlds/${pantheon}`} onClick={() => audioEngine.playClick()} className="p-2 border border-neutral-800 rounded hover:bg-neutral-900 text-neutral-400">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold uppercase tracking-wider text-neutral-100">{campaign.title}</h1>
            <p className="text-xs text-neutral-500">Pantheon Campaign Chapter {campaign.chapterNumber}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        
        {/* PROGRESS STEPPER (Left 2 cols) */}
        <div className="md:col-span-2 space-y-6">
          <p className="text-sm text-neutral-400 italic">"{campaign.description}"</p>
          
          <div className="space-y-4 relative border-l border-neutral-800 pl-6 ml-4">
            
            {campaign.nodes.map((node, index) => {
              const nodeIcons = {
                lore: BookOpen,
                dialogue: MessageSquare,
                quiz: HelpCircle,
                battle: Swords,
                choice: Award
              }[node.type];
              
              const NodeIcon = nodeIcons;
              const isLocked = index > 0 && !campaign.nodes[index - 1].completed;

              return (
                <div key={node.id} className="relative group pb-4">
                  {/* Glowing dot index indicator */}
                  <div className={`absolute -left-10 top-0.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    node.completed 
                      ? 'border-green-500 bg-green-500/10 text-green-400' 
                      : isLocked 
                        ? 'border-neutral-850 bg-neutral-950 text-neutral-600'
                        : 'border-amber-500 bg-amber-500/15 text-amber-400'
                  }`}>
                    <NodeIcon size={14} />
                  </div>

                  <div className={`p-4 rounded-xl border transition-all ${
                    node.completed 
                      ? 'border-green-500/20 bg-green-500/5' 
                      : isLocked 
                        ? 'border-neutral-900 bg-neutral-950/20 opacity-40 cursor-not-allowed'
                        : 'border-amber-500/20 bg-neutral-900/60 shadow-[0_0_10px_rgba(245,158,11,0.05)]'
                  }`}>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] text-neutral-500 font-serif font-bold uppercase tracking-wider block">
                          Stage {index + 1}: {node.type}
                        </span>
                        <h3 className="font-serif font-bold text-neutral-200 text-sm mt-0.5">{node.title}</h3>
                        <p className="text-xs text-neutral-450 mt-1 leading-relaxed">{node.description}</p>
                      </div>
                      
                      {node.completed ? (
                        <span className="text-xs text-green-400 font-serif font-bold flex items-center gap-1">
                          <CheckCircle size={14} /> Complete
                        </span>
                      ) : isLocked ? (
                        <span className="text-[10px] text-neutral-600 uppercase font-semibold">Locked</span>
                      ) : (
                        <button
                          onClick={() => handleNodeExecute(node)}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-bold tracking-widest text-xs rounded flex items-center gap-1.5 transition-colors"
                        >
                          <Play size={12} className="fill-neutral-950" /> ACTIVATE
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REWARDS CARD PANEL (Right Col) */}
        <div className="space-y-6">
          <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-neutral-200 tracking-wider text-sm border-b border-neutral-850 pb-2 flex items-center gap-2">
              <Crown size={16} className="text-amber-500" /> CHAPTER COMPLETION
            </h3>
            
            <div className="space-y-3">
              <span className="text-xs text-neutral-400 block">Rewards upon completion:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-neutral-950 p-2.5 rounded border border-neutral-850"><span className="text-neutral-500 block text-[9px]">EXPERIENCE</span><span className="text-amber-500 font-bold">+{campaign.rewards.xp} XP</span></div>
                <div className="bg-neutral-950 p-2.5 rounded border border-neutral-850"><span className="text-neutral-500 block text-[9px]">GOLD COINS</span><span className="text-amber-500 font-bold">🪙 {campaign.rewards.coins}</span></div>
              </div>
              
              {campaign.rewards.relicId && (
                <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-lg text-xs flex justify-between items-center">
                  <div>
                    <span className="text-neutral-500 block text-[9px] uppercase">Relic Reward</span>
                    <span className="text-purple-400 font-medium">✨ {mythologyDb.relics.find(r => r.id === campaign.rewards.relicId)?.name || 'Celestial Relic'}</span>
                  </div>
                </div>
              )}
            </div>

            {isChapterComplete ? (
              <button
                onClick={claimChapterAwards}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-black tracking-widest text-xs uppercase rounded transition-colors"
              >
                CLAIM CHAPTER REWARDS
              </button>
            ) : (
              <div className="text-center p-3 bg-neutral-950 border border-neutral-850 rounded text-xs text-neutral-500">
                Complete all stages to claim the treasures of the gods.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* DIALOGUE & CHOICE DIALOG POPUP */}
      {dialogueOpen && activeNodeId && (() => {
        const node = campaign.nodes.find(n => n.id === activeNodeId)!;
        return (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 shadow-2xl relative">
              
              <div className="space-y-1">
                <span className="text-[10px] text-amber-500 font-serif font-bold uppercase tracking-wider block">Campaign Dialogue</span>
                <h4 className="font-serif font-black text-neutral-200 text-lg uppercase">{node.data.speaker || 'Oracle Echo'}</h4>
              </div>

              <div className="p-4 bg-neutral-950/60 border border-neutral-850 rounded-lg text-sm text-neutral-300 italic leading-relaxed">
                "{node.data.text}"
              </div>

              {node.type === 'choice' ? (
                <div className="space-y-2">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block">Select your choice:</span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {node.data.choices.map((choice: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handleChoice(node.id, choice)}
                        className="text-left p-3.5 bg-neutral-950 border border-neutral-850 hover:border-amber-500/50 hover:bg-neutral-900 rounded-lg text-xs text-neutral-250 transition-colors flex justify-between items-center"
                      >
                        <span>{choice.text}</span>
                        <span className="text-[9px] uppercase font-bold text-amber-500">Select</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleDialogueClose(node.id)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-bold tracking-widest text-xs uppercase rounded transition-colors"
                >
                  CONCLUDE DISCUSSION
                </button>
              )}
            </div>
          </div>
        );
      })()}

    </div>
  );
}
