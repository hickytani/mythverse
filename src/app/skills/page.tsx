'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { Flame, BookOpen, Compass, Star, Sparkles, Lock, Check, Zap } from 'lucide-react';
import EnvironmentBackground from '@/components/EnvironmentBackground';

interface SkillNode {
  id: string;
  name: string;
  desc: string;
  type: 'active' | 'passive';
  cost: number;
  tier: number;
  prereq?: string;
  color: string;
  glowColor: string;
  icon: string;
}

interface SkillTree {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  nodes: SkillNode[];
}

const SKILL_TREES: SkillTree[] = [
  {
    id: 'warrior',
    title: 'Warrior Path',
    subtitle: 'Strength & Combat',
    icon: Flame,
    accentColor: '#ef4444',
    glowColor: 'rgba(239,68,68,0.3)',
    nodes: [
      { id: 'w_1', name: 'Heavy Strike', desc: 'Weapon strike damage increased by 8%. Enemies are staggered more easily.', type: 'active', cost: 1, tier: 1, color: '#ef4444', glowColor: 'rgba(239,68,68,0.3)', icon: '⚔️' },
      { id: 'w_2', name: 'Vanguard Block', desc: 'Grants +5 defense when equipped with shields. Reduces damage from critical strikes by 10%.', type: 'passive', cost: 1, tier: 2, prereq: 'w_1', color: '#ef4444', glowColor: 'rgba(239,68,68,0.3)', icon: '🛡️' },
      { id: 'w_3', name: 'Crit Charge', desc: '+5% physical critical hit chance. Crits restore 5 Spirit.', type: 'passive', cost: 2, tier: 3, prereq: 'w_2', color: '#f97316', glowColor: 'rgba(249,115,22,0.35)', icon: '💥' },
      { id: 'w_4', name: 'Titan Stance', desc: 'For 3 turns, all strikes deal double damage but cost Spirit. Divine relic: activates Titan buff.', type: 'active', cost: 2, tier: 4, prereq: 'w_3', color: '#f97316', glowColor: 'rgba(249,115,22,0.4)', icon: '🔥' },
    ]
  },
  {
    id: 'scholar',
    title: 'Scholar Path',
    subtitle: 'Wisdom & Lore',
    icon: BookOpen,
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.3)',
    nodes: [
      { id: 's_1', name: 'Delphic Hint', desc: 'Highlights one incorrect answer in Quiz Arena. One use per quiz.', type: 'active', cost: 1, tier: 1, color: '#8b5cf6', glowColor: 'rgba(139,92,246,0.3)', icon: '💡' },
      { id: 's_2', name: 'Scribe Wisdom', desc: '+15% experience from Codex entries. Lore readings provide minor stat bonuses.', type: 'passive', cost: 1, tier: 2, prereq: 's_1', color: '#8b5cf6', glowColor: 'rgba(139,92,246,0.3)', icon: '📜' },
      { id: 's_3', name: 'Chronology Vision', desc: 'Extends battle quiz timers by 10 seconds. Correct quiz answers restore Spirit.', type: 'passive', cost: 2, tier: 3, prereq: 's_2', color: '#a78bfa', glowColor: 'rgba(167,139,250,0.35)', icon: '⏳' },
      { id: 's_4', name: 'Oracle Clarity', desc: 'Once per day, gain a full explanation of the mythological source for any quiz question.', type: 'active', cost: 2, tier: 4, prereq: 's_3', color: '#c4b5fd', glowColor: 'rgba(196,181,253,0.35)', icon: '🔮' },
    ]
  },
  {
    id: 'seer',
    title: 'Seer Path',
    subtitle: 'Agility & Fortune',
    icon: Compass,
    accentColor: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.3)',
    nodes: [
      { id: 'se_1', name: 'Relic Finder', desc: '+10% material drop rates in combat. Rare relics have higher chance of appearing.', type: 'passive', cost: 1, tier: 1, color: '#06b6d4', glowColor: 'rgba(6,182,212,0.3)', icon: '🗺️' },
      { id: 'se_2', name: 'Evasion Wind', desc: '+5% dodge chance against creature attacks. Dodges grant a small Spirit burst.', type: 'passive', cost: 1, tier: 2, prereq: 'se_1', color: '#06b6d4', glowColor: 'rgba(6,182,212,0.3)', icon: '💨' },
      { id: 'se_3', name: 'Ley-Line Map', desc: '+20 pantheon reputation per new realm entered. Unlocks secret codex entries on travel.', type: 'passive', cost: 2, tier: 3, prereq: 'se_2', color: '#22d3ee', glowColor: 'rgba(34,211,238,0.35)', icon: '🌐' },
      { id: 'se_4', name: 'Foresight', desc: 'Preview enemy attack types before each combat turn. +10% critical hit evasion.', type: 'active', cost: 2, tier: 4, prereq: 'se_3', color: '#67e8f9', glowColor: 'rgba(103,232,249,0.35)', icon: '👁️' },
    ]
  },
];

export default function SkillConstellation() {
  const state = useGameStore();
  const [selectedTree, setSelectedTree] = useState<string>('warrior');
  const [unlockedSkills, setUnlockedSkills] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const activeTree = SKILL_TREES.find(t => t.id === selectedTree) || SKILL_TREES[0];

  const canUnlock = (node: SkillNode) => {
    if (unlockedSkills.includes(node.id)) return false; // already have
    if (node.prereq && !unlockedSkills.includes(node.prereq)) return false;
    return true; // simplified: no cost check for MVP display
  };

  const handleUnlock = (node: SkillNode) => {
    if (!canUnlock(node)) return;
    audioEngine.playLevelUp();
    setUnlockedSkills(prev => [...prev, node.id]);
    state.addXp(5); // small XP reward for unlocking
  };

  const totalUnlocked = unlockedSkills.length;
  const totalNodes = SKILL_TREES.reduce((sum, t) => sum + t.nodes.length, 0);

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col overflow-hidden font-sans">
      {/* Cosmic background */}
      <div className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #0c0726 0%, #080510 50%, #050305 100%)'
        }}
      />
      {/* Active tree color wash */}
      <div className="absolute inset-0 transition-all duration-1000 z-0"
        style={{
          background: `radial-gradient(ellipse at 70% 40%, ${activeTree.glowColor} 0%, transparent 55%)`
        }}
      />

      <div className="relative z-10 flex flex-col gap-6 p-6 md:p-8 pb-12">

        {/* ── HEADER ── */}
        <header className="border-b border-neutral-900/60 pb-5">
          <span className="text-[10px] font-serif font-black tracking-[0.35em] uppercase block mb-1"
            style={{ color: activeTree.accentColor }}>
            Skill Constellation
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-black tracking-widest text-neutral-100 uppercase">
            THE CELESTIAL GRID
          </h1>
          <p className="text-xs text-neutral-500 mt-1.5 max-w-xl">
            Channel ley-line energy to unlock divine abilities. Each unlocked constellation node permanently augments your mythwalker.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="text-xs text-neutral-500 font-serif">
              Nodes Unlocked: <span className="font-black text-amber-400">{totalUnlocked}</span> / {totalNodes}
            </div>
            <div className="flex-1 max-w-40 h-1 bg-neutral-900 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(totalUnlocked / totalNodes) * 100}%`, background: activeTree.accentColor }}
              />
            </div>
          </div>
        </header>

        {/* ── MAIN LAYOUT ── */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT: Path Selector */}
          <div className="flex flex-row lg:flex-col gap-3 lg:w-52 shrink-0">
            {SKILL_TREES.map(tree => {
              const isActive = selectedTree === tree.id;
              const pathUnlocked = tree.nodes.filter(n => unlockedSkills.includes(n.id)).length;

              return (
                <button
                  key={tree.id}
                  onClick={() => { setSelectedTree(tree.id); setSelectedNode(null); audioEngine.playClick(); }}
                  className="flex-1 lg:flex-none text-left rounded-2xl p-4 border transition-all duration-500"
                  style={{
                    borderColor: isActive ? tree.accentColor : 'rgba(40,40,40,0.8)',
                    background: isActive
                      ? `linear-gradient(135deg, ${tree.accentColor}15, rgba(10,8,6,0.9))`
                      : 'rgba(12,10,8,0.7)',
                    boxShadow: isActive ? `0 0 25px ${tree.glowColor}` : 'none',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <tree.icon size={14} style={{ color: isActive ? tree.accentColor : '#525252' }} />
                    <span className="font-serif font-black text-xs uppercase tracking-wide"
                      style={{ color: isActive ? '#f0f0f0' : '#525252' }}>
                      {tree.title}
                    </span>
                  </div>
                  <div className="text-[9px] text-neutral-600 mb-2">{tree.subtitle}</div>
                  <div className="flex gap-1">
                    {tree.nodes.map(n => (
                      <div
                        key={n.id}
                        className="w-2 h-2 rounded-full transition-all"
                        style={{
                          background: unlockedSkills.includes(n.id) ? tree.accentColor : 'rgba(255,255,255,0.1)'
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-[9px] mt-1.5 font-serif font-bold"
                    style={{ color: isActive ? tree.accentColor : '#404040' }}>
                    {pathUnlocked} / {tree.nodes.length} unlocked
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Constellation Display */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Constellation Canvas */}
            <div
              className="relative rounded-3xl border overflow-hidden"
              style={{
                borderColor: activeTree.accentColor + '25',
                background: 'linear-gradient(145deg, rgba(5,3,8,0.97), rgba(8,5,16,0.95))',
                minHeight: '280px',
              }}
            >
              {/* Decorative star field within panel */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(1px 1px at 15% 25%, white, transparent),
                    radial-gradient(1px 1px at 75% 15%, white, transparent),
                    radial-gradient(1.5px 1.5px at 45% 65%, white, transparent),
                    radial-gradient(1px 1px at 85% 75%, white, transparent),
                    radial-gradient(1px 1px at 35% 85%, white, transparent),
                    radial-gradient(1px 1px at 90% 40%, white, transparent),
                    radial-gradient(1.5px 1.5px at 60% 35%, white, transparent)`
                }}
              />

              {/* Horizontal node chain */}
              <div className="relative flex items-center justify-around p-8 md:p-12">

                {activeTree.nodes.map((node, idx) => {
                  const unlocked = unlockedSkills.includes(node.id);
                  const available = canUnlock(node);
                  const isSelected = selectedNode?.id === node.id;

                  return (
                    <React.Fragment key={node.id}>
                      {/* Connector line */}
                      {idx > 0 && (
                        <div
                          className="flex-1 h-0.5 transition-all duration-700"
                          style={{
                            background: unlockedSkills.includes(activeTree.nodes[idx - 1].id)
                              ? `linear-gradient(90deg, ${activeTree.accentColor}, ${node.color}50)`
                              : 'rgba(255,255,255,0.06)'
                          }}
                        />
                      )}

                      {/* Node Button */}
                      <button
                        onClick={() => {
                          setSelectedNode(prev => prev?.id === node.id ? null : node);
                          audioEngine.playClick();
                        }}
                        className="relative flex flex-col items-center gap-2 group"
                        title={node.name}
                      >
                        {/* Outer glow ring */}
                        {unlocked && (
                          <div
                            className="absolute inset-0 rounded-full animate-pulse-soft"
                            style={{
                              boxShadow: `0 0 20px ${node.glowColor}`,
                              borderRadius: '50%',
                            }}
                          />
                        )}

                        {/* Node circle */}
                        <div
                          className="relative w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl transition-all duration-300"
                          style={{
                            borderColor: unlocked
                              ? node.color
                              : available
                              ? node.color + '60'
                              : 'rgba(40,40,40,0.6)',
                            background: unlocked
                              ? `radial-gradient(circle, ${node.glowColor}, rgba(5,3,8,0.95))`
                              : available
                              ? 'rgba(20,15,30,0.9)'
                              : 'rgba(10,8,6,0.9)',
                            boxShadow: unlocked
                              ? `0 0 25px ${node.glowColor}, inset 0 0 15px ${node.glowColor}`
                              : isSelected
                              ? `0 0 15px ${node.glowColor}`
                              : 'none',
                            transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                          }}
                        >
                          {unlocked ? node.icon : available ? (
                            <span style={{ filter: 'grayscale(0.7)', opacity: 0.7 }}>{node.icon}</span>
                          ) : (
                            <Lock size={16} className="text-neutral-700" />
                          )}

                          {/* Tier badge */}
                          <div
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full border text-[8px] font-black flex items-center justify-center"
                            style={{
                              borderColor: unlocked ? node.color : 'rgba(40,40,40,0.8)',
                              background: unlocked ? node.color : 'rgba(10,8,6,0.9)',
                              color: unlocked ? '#0c0a08' : '#525252'
                            }}
                          >
                            {node.tier}
                          </div>
                        </div>

                        {/* Node label */}
                        <div className="text-center max-w-[80px]">
                          <div
                            className="text-[9px] font-serif font-black leading-tight uppercase tracking-wide"
                            style={{ color: unlocked ? node.color : available ? '#888' : '#404040' }}
                          >
                            {node.name}
                          </div>
                          <div className="text-[8px] text-neutral-600 mt-0.5">
                            {node.type}
                          </div>
                        </div>
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Node Detail / Unlock Panel */}
            {selectedNode ? (
              <div
                className="rounded-2xl border p-6 transition-all duration-300"
                style={{
                  borderColor: selectedNode.color + '40',
                  background: `linear-gradient(145deg, ${selectedNode.glowColor}, rgba(10,8,6,0.95))`,
                  boxShadow: `0 0 30px ${selectedNode.glowColor}`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{selectedNode.icon}</div>
                    <div>
                      <div
                        className="text-[9px] tracking-[0.3em] uppercase font-serif font-black"
                        style={{ color: selectedNode.color }}
                      >
                        {selectedNode.type === 'active' ? 'Active Ability' : 'Passive Enhancement'} • Tier {selectedNode.tier}
                      </div>
                      <h3 className="font-serif font-black text-lg text-neutral-100 uppercase mt-0.5">
                        {selectedNode.name}
                      </h3>
                    </div>
                  </div>

                  {/* Status */}
                  {unlockedSkills.includes(selectedNode.id) ? (
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-serif font-black uppercase"
                      style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}
                    >
                      <Check size={10} />
                      Unlocked
                    </div>
                  ) : canUnlock(selectedNode) ? (
                    <div
                      className="text-[10px] font-serif font-black uppercase px-3 py-1.5 rounded-lg"
                      style={{
                        background: `${selectedNode.color}20`,
                        color: selectedNode.color,
                        border: `1px solid ${selectedNode.color}40`
                      }}
                    >
                      Available
                    </div>
                  ) : (
                    <div className="text-[10px] font-serif font-black uppercase px-3 py-1.5 rounded-lg text-neutral-600 border border-neutral-800 bg-neutral-950/40">
                      <Lock size={8} className="inline mr-1" />Locked
                    </div>
                  )}
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed mb-5 font-serif">
                  {selectedNode.desc}
                </p>

                {!unlockedSkills.includes(selectedNode.id) && canUnlock(selectedNode) && (
                  <button
                    onClick={() => handleUnlock(selectedNode)}
                    className="w-full py-3.5 rounded-xl font-serif font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: `linear-gradient(135deg, ${selectedNode.color}, ${selectedNode.color}cc)`,
                      color: '#0c0a08',
                      boxShadow: `0 8px 24px ${selectedNode.glowColor}`,
                    }}
                  >
                    <Sparkles size={14} className="inline mr-2" />
                    Unlock {selectedNode.name}
                  </button>
                )}

                {!unlockedSkills.includes(selectedNode.id) && !canUnlock(selectedNode) && selectedNode.prereq && (
                  <div className="text-center text-xs text-neutral-600 font-serif italic">
                    Requires: unlock the previous tier node first
                  </div>
                )}
              </div>
            ) : (
              <div
                className="rounded-2xl border border-neutral-800/30 bg-neutral-950/40 backdrop-blur-sm p-8 text-center"
                style={{ background: 'rgba(8,6,12,0.6)' }}
              >
                <Sparkles size={24} className="text-neutral-700 mx-auto mb-3" />
                <p className="text-xs text-neutral-600 font-serif">
                  Select a constellation node above to view details and unlock divine abilities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
