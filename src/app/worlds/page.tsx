'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { ChevronRight, Sword, Zap, Sun, MapPin, Trophy, BookOpen, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const WORLDS = [
  {
    id: 'greek',
    name: 'OLYMPUS',
    subtitle: 'Greek Pantheon',
    tagline: 'Where Thunder meets Hubris',
    lore: 'The gods of Olympus watch from their celestial peaks. Below, heroes forge their legends in Delphi\'s temples, Crete\'s labyrinth, and the Stygian dark of Hades\' realm. The Fates weave your destiny — will you defy it?',
    realm: 'Mount Olympus • Delphi • Tartarus • The Labyrinth',
    primaryGods: ['Zeus', 'Athena', 'Poseidon', 'Hades'],
    accentColor: '#7c3aed', // violet
    glowColor: 'rgba(124, 58, 237, 0.4)',
    borderColor: 'rgba(124, 58, 237, 0.3)',
    hoverGlow: '0 0 60px rgba(124, 58, 237, 0.3)',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(0,0,0,0) 70%)',
    bgGradient: 'from-violet-950/80 via-neutral-950/60 to-neutral-950',
    icon: '⚡',
    unlocked: true,
    campaignKey: 'greek',
  },
  {
    id: 'norse',
    name: 'MIDGARD',
    subtitle: 'Norse Pantheon',
    tagline: 'Ice, Thunder & Ragnarök\'s Edge',
    lore: 'Cross the Bifröst to Asgard, venture into frost-giant Jotunheim, and sail longships through storm-wracked seas. The World Tree, Yggdrasil, connects nine realms — each holding secrets for those brave enough to seek them.',
    realm: 'Asgard • Midgard • Jotunheim • Helheim',
    primaryGods: ['Thor', 'Odin', 'Loki', 'Freyja'],
    accentColor: '#2563eb', // blue
    glowColor: 'rgba(37, 99, 235, 0.4)',
    borderColor: 'rgba(37, 99, 235, 0.3)',
    hoverGlow: '0 0 60px rgba(37, 99, 235, 0.3)',
    gradient: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(0,0,0,0) 70%)',
    bgGradient: 'from-blue-950/80 via-neutral-950/60 to-neutral-950',
    icon: '🌩',
    unlocked: true,
    campaignKey: 'norse',
  },
  {
    id: 'egyptian',
    name: 'KEMET',
    subtitle: 'Egyptian Pantheon',
    tagline: 'Sand, Stars & the Scales of Ma\'at',
    lore: 'Sail the solar barque through the Duat underworld, stand before Osiris\' scales, and unravel the secrets of pyramid-tombs. Ra illuminates the sky; Anubis guards the dead. Which side of eternity will you choose?',
    realm: 'Heliopolis • Duat • Thebes • The Desert of Chaos',
    primaryGods: ['Ra', 'Anubis', 'Isis', 'Horus'],
    accentColor: '#d97706', // amber
    glowColor: 'rgba(217, 119, 6, 0.4)',
    borderColor: 'rgba(217, 119, 6, 0.3)',
    hoverGlow: '0 0 60px rgba(217, 119, 6, 0.3)',
    gradient: 'linear-gradient(135deg, rgba(217,119,6,0.12) 0%, rgba(0,0,0,0) 70%)',
    bgGradient: 'from-amber-950/80 via-neutral-950/60 to-neutral-950',
    icon: '☀',
    unlocked: true,
    campaignKey: 'egyptian',
  }
];

export default function WorldsPortal() {
  const state = useGameStore();
  const [hoveredWorld, setHoveredWorld] = useState<string | null>(null);
  const [activeWorld, setActiveWorld] = useState<string>('greek');

  const selected = WORLDS.find(w => w.id === activeWorld) || WORLDS[0];

  const getProgress = (pantheon: string) => {
    const chapter = state.campaignChapters.find(c => c.pantheon === pantheon);
    if (!chapter) return { done: 0, total: 5 };
    return {
      done: chapter.nodes.filter(n => n.completed).length,
      total: chapter.nodes.length || 5
    };
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col overflow-hidden font-sans">

      {/* ── FULL SCREEN ANIMATED BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        {/* Starfield base */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, #0d0726 0%, #080510 40%, #050305 100%)'
          }}
        />
        {/* Active world color wash */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, ${selected.glowColor} 0%, transparent 60%)`
          }}
        />
        {/* Particle dots (CSS-only starfield) */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 10% 20%, white, transparent),
              radial-gradient(1px 1px at 80% 10%, white, transparent),
              radial-gradient(1.5px 1.5px at 60% 70%, white, transparent),
              radial-gradient(1px 1px at 40% 85%, white, transparent),
              radial-gradient(1px 1px at 90% 55%, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 25% 45%, white, transparent),
              radial-gradient(1.5px 1.5px at 70% 30%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 15% 75%, white, transparent),
              radial-gradient(1px 1px at 55% 15%, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 85% 80%, white, transparent)`
          }}
        />
      </div>

      {/* ── CONTENT LAYER ── */}
      <div className="relative z-10 flex-1 flex flex-col p-6 md:p-10 gap-8">

        {/* Header */}
        <header className="text-center space-y-2">
          <span className="text-[10px] tracking-[0.4em] uppercase font-serif font-black"
            style={{ color: selected.accentColor }}>
            Ley-Line Gateway
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-widest text-neutral-100 uppercase">
            THE THREE REALMS
          </h1>
          <p className="text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Step through a ley-line portal to enter a mythological world. Each realm offers campaigns, battles, and divine companions.
          </p>
        </header>

        {/* ── MAIN LAYOUT: Selector Rail + Detail Panel ── */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 items-start">

          {/* LEFT: World Selector Rail */}
          <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-64 shrink-0">
            {WORLDS.map(world => {
              const prog = getProgress(world.campaignKey);
              const isActive = activeWorld === world.id;

              return (
                <button
                  key={world.id}
                  onClick={() => {
                    audioEngine.playClick();
                    setActiveWorld(world.id);
                  }}
                  onMouseEnter={() => setHoveredWorld(world.id)}
                  onMouseLeave={() => setHoveredWorld(null)}
                  className="flex-1 lg:flex-none group relative text-left rounded-2xl p-4 border transition-all duration-500 overflow-hidden"
                  style={{
                    borderColor: isActive ? world.accentColor : 'rgba(40,40,40,0.8)',
                    background: isActive
                      ? `linear-gradient(135deg, ${world.accentColor}18 0%, rgba(10,8,6,0.9) 100%)`
                      : 'rgba(12,10,8,0.7)',
                    boxShadow: isActive ? `0 0 30px ${world.glowColor}` : 'none',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Accent left border */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 rounded-r-full"
                      style={{ background: world.accentColor }}
                    />
                  )}

                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{world.icon}</span>
                    <div>
                      <div className="font-serif font-black text-sm text-neutral-100 tracking-wider uppercase">{world.subtitle}</div>
                      <div className="text-[10px] text-neutral-500 font-serif uppercase tracking-widest">{world.name}</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-neutral-900 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(prog.done / prog.total) * 100}%`,
                          background: world.accentColor
                        }}
                      />
                    </div>
                    <span className="text-[9px] text-neutral-500 font-serif font-bold">
                      {prog.done}/{prog.total}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Detail Panel */}
          <div className="flex-1 relative rounded-3xl overflow-hidden border transition-all duration-700"
            style={{
              borderColor: selected.borderColor,
              boxShadow: selected.hoverGlow,
              background: `linear-gradient(145deg, ${selected.accentColor}0a 0%, rgba(10,8,6,0.96) 60%)`,
              backdropFilter: 'blur(20px)',
            }}>

            {/* Panel Content */}
            <div className="p-8 md:p-10 flex flex-col h-full gap-8">

              {/* World Title Block */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{selected.icon}</span>
                  <div>
                    <span className="text-[10px] tracking-[0.3em] font-serif font-black uppercase"
                      style={{ color: selected.accentColor }}>
                      {selected.subtitle}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black tracking-widest text-neutral-100 uppercase">
                      {selected.name}
                    </h2>
                  </div>
                </div>
                <p className="text-base text-neutral-400 font-serif italic tracking-wide">
                  &quot;{selected.tagline}&quot;
                </p>
              </div>

              {/* Lore Block */}
              <div className="rounded-2xl p-6 border"
                style={{
                  borderColor: `${selected.accentColor}20`,
                  background: 'rgba(0,0,0,0.3)',
                }}>
                <div className="text-[9px] tracking-[0.3em] uppercase font-serif font-black mb-3"
                  style={{ color: selected.accentColor }}>
                  Ancient Chronicle
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {selected.lore}
                </p>
              </div>

              {/* Two Column Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Realm Locations */}
                <div className="rounded-xl p-4 border border-neutral-800/50 bg-neutral-950/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} style={{ color: selected.accentColor }} />
                    <span className="text-[10px] uppercase tracking-widest font-serif font-black text-neutral-500">Realms</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{selected.realm}</p>
                </div>

                {/* Primary Gods */}
                <div className="rounded-xl p-4 border border-neutral-800/50 bg-neutral-950/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <Trophy size={14} style={{ color: selected.accentColor }} />
                    <span className="text-[10px] uppercase tracking-widest font-serif font-black text-neutral-500">Divine Pantheon</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.primaryGods.map(god => (
                      <span
                        key={god}
                        className="text-[10px] font-serif font-bold px-2 py-1 rounded-md"
                        style={{
                          background: `${selected.accentColor}15`,
                          color: selected.accentColor,
                          border: `1px solid ${selected.accentColor}30`
                        }}>
                        {god}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Campaign Progress */}
              <div className="rounded-xl p-5 border border-neutral-800/50 bg-neutral-950/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} style={{ color: selected.accentColor }} />
                    <span className="text-[10px] uppercase tracking-widest font-serif font-black text-neutral-500">Campaign Progress</span>
                  </div>
                  <span className="text-xs font-serif font-bold" style={{ color: selected.accentColor }}>
                    {getProgress(selected.campaignKey).done} / {getProgress(selected.campaignKey).total} Chapters
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: getProgress(selected.campaignKey).total }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-2 rounded-full transition-all duration-500"
                      style={{
                        background: i < getProgress(selected.campaignKey).done
                          ? selected.accentColor
                          : 'rgba(255,255,255,0.08)'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* ENTER PORTAL Button */}
              <div className="flex items-center gap-4">
                <Link
                  href={`/worlds/${selected.id}`}
                  onClick={() => {
                    audioEngine.playForge();
                    if (selected.id === 'greek') audioEngine.startAmbient('temple');
                    else if (selected.id === 'norse') audioEngine.startAmbient('fjords');
                    else if (selected.id === 'egyptian') audioEngine.startAmbient('desert');
                  }}
                  className="group flex-1 relative flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-serif font-black text-sm tracking-[0.2em] uppercase text-neutral-950 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${selected.accentColor}, ${selected.accentColor}cc)`,
                    boxShadow: `0 8px 32px ${selected.glowColor}`,
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>{selected.icon}</span>
                    ENTER {selected.name}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Shine sweep */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                </Link>

                <Link
                  href="/campaign/greek"
                  onClick={() => audioEngine.playClick()}
                  className="flex items-center gap-2 py-4 px-6 rounded-2xl border font-serif font-bold text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-200 transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}
                >
                  <Sword size={14} />
                  Campaign
                </Link>
              </div>
            </div>

            {/* Decorative corner rune */}
            <div
              className="absolute top-6 right-6 text-5xl opacity-10 animate-spin-slow pointer-events-none select-none"
              style={{ color: selected.accentColor }}>
              {selected.icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
