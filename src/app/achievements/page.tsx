'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { mythologyDb } from '@/data/seed';
import { audioEngine } from '@/utils/audioEngine';
import { Trophy, Shield, Compass, BookOpen, Star, Lock, CheckCircle2, Sword } from 'lucide-react';

const CATEGORY_CONFIG = {
  exploration: { color: '#60a5fa', glow: 'rgba(96,165,250,0.2)', icon: Compass, label: 'Exploration', bg: '🧭' },
  combat:      { color: '#f87171', glow: 'rgba(248,113,113,0.2)', icon: Shield, label: 'Combat', bg: '⚔️' },
  knowledge:   { color: '#a78bfa', glow: 'rgba(167,139,250,0.2)', icon: BookOpen, label: 'Knowledge', bg: '📚' },
  collection:  { color: '#fbbf24', glow: 'rgba(251,191,36,0.2)', icon: Trophy, label: 'Collection', bg: '🏆' },
  campaign:    { color: '#34d399', glow: 'rgba(52,211,153,0.2)', icon: Star, label: 'Campaign', bg: '🌟' },
};

export default function AchievementsScreen() {
  const state = useGameStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'exploration' | 'combat' | 'knowledge' | 'collection' | 'campaign'>('all');

  const filteredAchievements = mythologyDb.achievements.filter(
    a => activeFilter === 'all' || a.category === activeFilter
  );

  const unlockedCount = state.unlockedAchievements.length;
  const totalCount = mythologyDb.achievements.length;
  const pct = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col pb-12 font-sans">
      {/* Dark ceremonial background */}
      <div className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(251,191,36,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(251,191,36,0.03) 0%, transparent 50%),
            #080605
          `
        }}
      />

      <div className="relative z-10 flex flex-col gap-6 p-6 md:p-8">

        {/* ── HEADER BANNER ── */}
        <div
          className="relative rounded-3xl overflow-hidden border p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            borderColor: 'rgba(251,191,36,0.2)',
            background: 'linear-gradient(135deg, rgba(40,30,5,0.98), rgba(15,10,2,0.98))',
            boxShadow: '0 0 60px rgba(251,191,36,0.06)',
          }}
        >
          {/* Background trophies decoration */}
          <div className="absolute right-6 top-6 text-8xl opacity-5 pointer-events-none select-none">🏆</div>

          <div className="space-y-2">
            <span className="text-[10px] text-amber-500 font-serif font-black tracking-[0.35em] uppercase block">
              Legacy Record
            </span>
            <h1 className="text-2xl md:text-4xl font-serif font-black tracking-widest text-neutral-100 uppercase">
              Myth Masteries
            </h1>
            <p className="text-sm text-neutral-500 max-w-lg leading-relaxed">
              Legends are forged through deeds. Each achievement unlocked chronicles your mythological journey and rewards divine essence.
            </p>
          </div>

          {/* Progress */}
          <div className="shrink-0 flex items-center gap-5">
            <div className="text-center">
              <div className="text-3xl font-serif font-black text-amber-400">{unlockedCount}</div>
              <div className="text-[9px] text-neutral-500 uppercase font-serif font-black">Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-serif font-black text-neutral-600">{totalCount}</div>
              <div className="text-[9px] text-neutral-500 uppercase font-serif font-black">Total</div>
            </div>
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(40,35,10,0.8)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="8"
                  strokeDasharray={`${pct * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-sm font-serif font-black text-amber-400">{pct}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CATEGORY FILTER ── */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveFilter('all'); audioEngine.playClick(); }}
            className="px-4 py-2 rounded-xl text-[10px] font-serif font-black uppercase tracking-wider transition-all"
            style={{
              background: activeFilter === 'all' ? 'rgba(212,175,55,0.1)' : 'rgba(10,8,6,0.5)',
              color: activeFilter === 'all' ? '#d4af37' : '#525252',
              border: `1px solid ${activeFilter === 'all' ? 'rgba(212,175,55,0.4)' : 'rgba(40,40,40,0.8)'}`,
            }}
          >
            All
          </button>
          {(Object.entries(CATEGORY_CONFIG) as [string, any][]).map(([key, conf]) => (
            <button
              key={key}
              onClick={() => { setActiveFilter(key as any); audioEngine.playClick(); }}
              className="px-4 py-2 rounded-xl text-[10px] font-serif font-black uppercase tracking-wider transition-all flex items-center gap-1.5"
              style={{
                background: activeFilter === key ? conf.glow : 'rgba(10,8,6,0.5)',
                color: activeFilter === key ? conf.color : '#525252',
                border: `1px solid ${activeFilter === key ? conf.color + '50' : 'rgba(40,40,40,0.8)'}`,
              }}
            >
              <span>{conf.bg}</span>
              {conf.label}
            </button>
          ))}
        </div>

        {/* ── ACHIEVEMENT GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAchievements.map(ach => {
            const unlocked = state.unlockedAchievements.includes(ach.id);
            const catConf = CATEGORY_CONFIG[ach.category as keyof typeof CATEGORY_CONFIG];

            return (
              <div
                key={ach.id}
                className="relative rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  borderColor: unlocked ? (catConf?.color + '40') : 'rgba(30,25,20,0.8)',
                  background: unlocked
                    ? `linear-gradient(145deg, ${catConf?.glow || 'rgba(212,175,55,0.05)'}, rgba(10,8,6,0.95))`
                    : 'rgba(10,8,6,0.7)',
                  boxShadow: unlocked ? `0 0 20px ${catConf?.glow}` : 'none',
                }}
              >
                {/* Top accent bar */}
                <div
                  className="h-0.5 w-full"
                  style={{ background: unlocked ? catConf?.color : 'rgba(40,35,30,0.5)' }}
                />

                <div className="p-5 space-y-3">
                  {/* Icon + Unlock Status */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl"
                      style={{
                        borderColor: unlocked ? (catConf?.color + '50') : 'rgba(40,35,30,0.8)',
                        background: unlocked ? catConf?.glow : 'rgba(10,8,6,0.8)',
                      }}
                    >
                      {unlocked ? ach.icon : '🔒'}
                    </div>
                    {unlocked ? (
                      <CheckCircle2 size={16} style={{ color: catConf?.color }} />
                    ) : (
                      <Lock size={12} className="text-neutral-700 mt-1" />
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <h4
                      className="font-serif font-black text-sm uppercase leading-tight"
                      style={{ color: unlocked ? '#f0f0f0' : '#404040' }}
                    >
                      {ach.title}
                    </h4>
                    <p
                      className="text-[10px] leading-relaxed mt-1"
                      style={{ color: unlocked ? '#888' : '#333' }}
                    >
                      {ach.description}
                    </p>
                  </div>

                  {/* XP Reward + Category */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[9px] font-serif font-black uppercase tracking-wider px-2 py-1 rounded-lg"
                      style={{
                        background: catConf?.glow || 'rgba(40,35,30,0.5)',
                        color: catConf?.color || '#525252',
                        opacity: unlocked ? 1 : 0.4,
                      }}
                    >
                      {ach.category}
                    </span>
                    <span
                      className="text-[10px] font-serif font-black"
                      style={{ color: unlocked ? '#f59e0b' : '#333' }}
                    >
                      +{ach.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
