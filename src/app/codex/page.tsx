'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useGameStore } from '@/store/gameStore';
import { mythologyDb } from '@/data/seed';
import { audioEngine } from '@/utils/audioEngine';
import { BookOpen, Search, Lock, Eye, Scroll, X } from 'lucide-react';
import Link from 'next/link';

const PANTHEON_CONFIG = {
  greek:    { color: '#7c3aed', glow: 'rgba(124,58,237,0.25)', icon: '⚡', label: 'Greek' },
  norse:    { color: '#2563eb', glow: 'rgba(37,99,235,0.25)', icon: '🌩', label: 'Norse' },
  egyptian: { color: '#d97706', glow: 'rgba(217,119,6,0.25)', icon: '☀', label: 'Egyptian' },
};

const TYPE_CONFIG: Record<string, { icon: string; color: string }> = {
  god:     { icon: '✨', color: '#f59e0b' },
  hero:    { icon: '⚔️', color: '#f87171' },
  creature:{ icon: '🐉', color: '#34d399' },
  realm:   { icon: '🌍', color: '#60a5fa' },
};

export default function CodexChronicle() {
  const state = useGameStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPantheon, setFilterPantheon] = useState<'all' | 'greek' | 'norse' | 'egyptian'>('all');
  const [filterType, setFilterType] = useState<'all' | 'god' | 'hero' | 'creature' | 'realm'>('all');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setSelectedEntry(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const allEntities = useMemo(() => [
    ...mythologyDb.deities,
    ...mythologyDb.heroes,
    ...mythologyDb.creatures,
    ...mythologyDb.realms
  ], []);

  const filteredEntities = useMemo(() => allEntities.filter(ent => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || ent.name.toLowerCase().includes(q) ||
      (ent.aliases?.some((a: string) => a.toLowerCase().includes(q)));
    const matchesPantheon = filterPantheon === 'all' || ent.pantheon === filterPantheon;
    const matchesType = filterType === 'all' || ent.type === filterType;
    return matchesSearch && matchesPantheon && matchesType;
  }), [allEntities, searchQuery, filterPantheon, filterType]);

  const unlockedCount = allEntities.filter(e => state.unlockedCodexIds.includes(e.id)).length;
  const totalCount = allEntities.length;
  const pct = Math.round((unlockedCount / totalCount) * 100);

  const handleEntryClick = (ent: any, unlocked: boolean) => {
    audioEngine.playClick();
    if (unlocked) {
      setSelectedEntry(ent);
      state.unlockCodexEntry(ent.id);
    } else {
      audioEngine.playBattleImpact();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col overflow-hidden font-sans pb-12">
      {/* Parchment background texture */}
      <div className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 0% 0%, rgba(180,130,60,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 100%, rgba(100,60,20,0.05) 0%, transparent 50%),
            #0a0806
          `
        }}
      />

      <div className="relative z-10 flex flex-col gap-6 p-6 md:p-8">

        {/* ── HEADER BANNER ── */}
        <div
          className="relative rounded-3xl overflow-hidden border p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            borderColor: 'rgba(212,175,55,0.2)',
            background: 'linear-gradient(135deg, rgba(30,20,10,0.98), rgba(15,10,5,0.98))',
            boxShadow: '0 0 60px rgba(212,175,55,0.06)',
          }}
        >
          {/* Decorative scroll corners */}
          <div className="absolute top-4 left-4 text-4xl opacity-10 pointer-events-none select-none">📜</div>
          <div className="absolute bottom-4 right-4 text-4xl opacity-10 pointer-events-none select-none">📜</div>

          <div className="space-y-2">
            <span className="text-[10px] text-amber-500 font-serif font-black tracking-[0.35em] uppercase block">
              Mythic Archive
            </span>
            <h1 className="text-2xl md:text-4xl font-serif font-black tracking-widest text-neutral-100 uppercase">
              The Codex Chronicles
            </h1>
            <p className="text-sm text-neutral-500 max-w-lg leading-relaxed">
              Unearth ancient knowledge. Each entry unlocked grants XP and expands the lore of the Three Realms. Explore all pantheons.
            </p>
          </div>

          {/* Progress Ring */}
          <div
            className="relative flex-shrink-0 w-28 h-28 rounded-full border-4 flex items-center justify-center"
            style={{
              borderColor: 'rgba(212,175,55,0.3)',
              background: `conic-gradient(#d4af37 ${pct * 3.6}deg, rgba(30,20,10,0.5) 0deg)`,
              boxShadow: '0 0 30px rgba(212,175,55,0.15)',
            }}
          >
            <div className="w-20 h-20 rounded-full bg-neutral-950 flex flex-col items-center justify-center">
              <div className="text-xl font-serif font-black text-amber-400">{pct}%</div>
              <div className="text-[8px] text-neutral-500 uppercase font-serif font-black">complete</div>
              <div className="text-[9px] text-neutral-400 font-serif">{unlockedCount}/{totalCount}</div>
            </div>
          </div>
        </div>

        {/* ── FILTER CONTROLS ── */}
        <div
          className="flex flex-col md:flex-row gap-3 items-stretch md:items-center p-3 rounded-2xl border border-neutral-800/50"
          style={{ background: 'rgba(10,8,6,0.7)', backdropFilter: 'blur(12px)' }}
        >
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search gods, heroes, realms... (Ctrl+K)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs text-neutral-200 placeholder-neutral-600 rounded-xl border border-neutral-800 bg-neutral-950/80 pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500/40 font-serif"
            />
          </div>

          {/* Pantheon Filter */}
          <div className="flex gap-1.5 flex-wrap">
            {(['all', 'greek', 'norse', 'egyptian'] as const).map(p => {
              const conf = p !== 'all' ? PANTHEON_CONFIG[p] : null;
              return (
                <button
                  key={p}
                  onClick={() => { setFilterPantheon(p); audioEngine.playClick(); }}
                  className="px-3 py-2 rounded-lg text-[10px] font-serif font-black uppercase tracking-wider transition-all"
                  style={{
                    background: filterPantheon === p
                      ? (conf ? conf.glow : 'rgba(212,175,55,0.1)')
                      : 'transparent',
                    color: filterPantheon === p
                      ? (conf ? conf.color : '#d4af37')
                      : '#525252',
                    border: `1px solid ${filterPantheon === p ? (conf ? conf.color + '50' : 'rgba(212,175,55,0.4)') : 'rgba(40,40,40,0.8)'}`,
                  }}
                >
                  {conf && <span className="mr-1">{conf.icon}</span>}
                  {p}
                </button>
              );
            })}
          </div>

          {/* Type Filter */}
          <div className="flex gap-1.5 flex-wrap">
            {(['all', 'god', 'hero', 'creature', 'realm'] as const).map(t => {
              const conf = t !== 'all' ? TYPE_CONFIG[t] : null;
              return (
                <button
                  key={t}
                  onClick={() => { setFilterType(t); audioEngine.playClick(); }}
                  className="px-3 py-2 rounded-lg text-[10px] font-serif font-black uppercase tracking-wider transition-all"
                  style={{
                    background: filterType === t
                      ? (conf ? `${conf.color}18` : 'rgba(212,175,55,0.1)')
                      : 'transparent',
                    color: filterType === t ? (conf ? conf.color : '#d4af37') : '#525252',
                    border: `1px solid ${filterType === t ? (conf ? conf.color + '40' : 'rgba(212,175,55,0.4)') : 'rgba(40,40,40,0.8)'}`,
                  }}
                >
                  {conf && <span className="mr-1">{conf.icon}</span>}
                  {t}
                </button>
              );
            })}
          </div>

          <div className="text-[10px] text-neutral-600 font-serif shrink-0">
            {filteredEntities.length} entries
          </div>
        </div>

        {/* ── CODEX GRID ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredEntities.map(ent => {
            const unlocked = state.unlockedCodexIds.includes(ent.id);
            const panth = PANTHEON_CONFIG[ent.pantheon as keyof typeof PANTHEON_CONFIG];
            const type = TYPE_CONFIG[ent.type] || { icon: '📖', color: '#9ca3af' };

            return (
              <button
                key={ent.id}
                onClick={() => handleEntryClick(ent, unlocked)}
                className="group relative text-left rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                style={{
                  borderColor: unlocked ? (panth?.color + '35') : 'rgba(30,25,20,0.8)',
                  background: unlocked
                    ? `linear-gradient(145deg, ${panth?.glow || 'rgba(212,175,55,0.05)'}, rgba(10,8,6,0.95))`
                    : 'rgba(10,8,6,0.7)',
                  boxShadow: unlocked ? `0 0 15px ${panth?.glow || 'rgba(212,175,55,0.1)'}` : 'none',
                  minHeight: '130px',
                }}
              >
                {/* Top accent bar */}
                <div
                  className="h-1 w-full transition-all duration-300"
                  style={{ background: unlocked ? panth?.color : 'rgba(40,35,30,0.8)' }}
                />

                <div className="flex-1 p-4 flex flex-col justify-between gap-3">
                  {/* Type + Pantheon */}
                  <div className="flex items-center justify-between">
                    <span className="text-base">{unlocked ? type.icon : '🔒'}</span>
                    {unlocked && panth && (
                      <span className="text-sm">{panth.icon}</span>
                    )}
                  </div>

                  {/* Name */}
                  {unlocked ? (
                    <div>
                      <h4 className="font-serif font-black text-xs text-neutral-200 uppercase leading-tight">
                        {ent.name}
                      </h4>
                      <div className="text-[9px] mt-0.5 font-serif font-bold uppercase tracking-wider"
                        style={{ color: type.color }}>
                        {ent.type}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-serif font-black text-xs text-neutral-700 uppercase">
                        Locked Entry
                      </h4>
                      <div className="text-[9px] text-neutral-800 uppercase font-serif">
                        {ent.type} • {ent.pantheon}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    {unlocked ? (
                      <span className="text-[8px] font-serif font-black uppercase tracking-wider flex items-center gap-1"
                        style={{ color: panth?.color }}>
                        <Eye size={8} />
                        Read
                      </span>
                    ) : (
                      <Lock size={10} className="text-neutral-800" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filteredEntities.length === 0 && (
          <div className="text-center py-16 text-neutral-600 space-y-2">
            <Scroll size={28} className="mx-auto opacity-40" />
            <p className="font-serif text-sm">No codex entries match this search.</p>
          </div>
        )}
      </div>

      {/* ── ENTRY DETAIL OVERLAY ── */}
      {selectedEntry && (() => {
        const panth = PANTHEON_CONFIG[selectedEntry.pantheon as keyof typeof PANTHEON_CONFIG];
        const type = TYPE_CONFIG[selectedEntry.type] || { icon: '📖', color: '#9ca3af' };

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
            onClick={() => setSelectedEntry(null)}
          >
            <div
              className="w-full max-w-lg rounded-3xl border overflow-hidden"
              style={{
                borderColor: panth?.color + '40',
                boxShadow: `0 0 80px ${panth?.glow || 'rgba(212,175,55,0.2)'}`,
                background: 'linear-gradient(145deg, #151210, #0c0a08)',
                maxHeight: '85vh',
                overflowY: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="p-6 border-b"
                style={{
                  borderColor: panth?.color + '20',
                  background: `linear-gradient(135deg, ${panth?.glow}, transparent)`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{type.icon}</span>
                    <div>
                      <div className="text-[9px] tracking-[0.3em] uppercase font-serif font-black mb-1"
                        style={{ color: panth?.color }}>
                        {selectedEntry.pantheon} • {selectedEntry.type}
                      </div>
                      <h3 className="font-serif font-black text-2xl text-neutral-100 uppercase">
                        {selectedEntry.name}
                      </h3>
                      {selectedEntry.aliases?.length > 0 && (
                        <div className="text-[10px] text-neutral-600 font-serif mt-1">
                          Also known as: {selectedEntry.aliases.slice(0, 3).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="w-8 h-8 rounded-lg border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-200 transition-colors shrink-0"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Description */}
                <div className="p-4 rounded-xl border border-neutral-800/50 bg-neutral-950/60">
                  <div className="text-[9px] text-neutral-500 uppercase font-serif font-black mb-2">Chronicle</div>
                  <p className="text-sm text-neutral-300 leading-relaxed font-serif">
                    {selectedEntry.description}
                  </p>
                </div>

                {/* Lore */}
                {selectedEntry.lore && (
                  <div className="p-4 rounded-xl border border-neutral-800/40 bg-neutral-950/40">
                    <div className="text-[9px] text-neutral-500 uppercase font-serif font-black mb-2">Ancient Lore</div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-serif italic">
                      "{selectedEntry.lore}"
                    </p>
                  </div>
                )}

                {/* Symbols */}
                {selectedEntry.symbols?.length > 0 && (
                  <div>
                    <div className="text-[9px] text-neutral-500 uppercase font-serif font-black mb-2">Sacred Symbols</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedEntry.symbols.map((sym: string) => (
                        <span key={sym}
                          className="px-3 py-1 rounded-lg text-[10px] font-serif font-bold"
                          style={{
                            background: panth?.glow,
                            color: panth?.color,
                            border: `1px solid ${panth?.color}30`
                          }}>
                          {sym}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attributes */}
                {selectedEntry.attributes && (
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(selectedEntry.attributes).map(([attr, val]) => (
                      <div key={attr} className="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/40 text-center">
                        <div className="text-sm font-serif font-black text-neutral-200">{val as number}</div>
                        <div className="text-[8px] text-neutral-600 uppercase font-serif font-bold">{attr}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Full lore link */}
                <Link
                  href={`/entities/${selectedEntry.id}`}
                  onClick={() => setSelectedEntry(null)}
                  className="w-full py-3.5 rounded-xl font-serif font-black text-sm uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${panth?.color || '#d4af37'}, ${panth?.color || '#d4af37'}cc)`,
                    color: '#0c0a08',
                    boxShadow: `0 8px 24px ${panth?.glow || 'rgba(212,175,55,0.3)'}`,
                  }}
                >
                  <BookOpen size={14} />
                  View Full Chronicle Entry
                </Link>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── COMMAND PALETTE ── */}
      {commandPaletteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setCommandPaletteOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border p-4 shadow-2xl space-y-3"
            style={{
              borderColor: 'rgba(212,175,55,0.3)',
              background: 'rgba(15,12,10,0.98)',
              backdropFilter: 'blur(16px)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-3.5 text-amber-500" />
              <input
                autoFocus
                type="text"
                placeholder="Search all mythological entries..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500/50 text-neutral-100 placeholder-neutral-600 font-serif"
              />
            </div>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {filteredEntities.slice(0, 8).map(ent => {
                const unlocked = state.unlockedCodexIds.includes(ent.id);
                const panth = PANTHEON_CONFIG[ent.pantheon as keyof typeof PANTHEON_CONFIG];
                return (
                  <button
                    key={ent.id}
                    onClick={() => { setCommandPaletteOpen(false); handleEntryClick(ent, unlocked); }}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-neutral-900 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span>{panth?.icon || '📖'}</span>
                      <div>
                        <span className={`text-sm font-serif font-bold ${unlocked ? 'text-neutral-200' : 'text-neutral-600'}`}>
                          {unlocked ? ent.name : 'Locked Entry'}
                        </span>
                        <div className="text-[10px] text-neutral-600 uppercase font-serif">{ent.type} • {ent.pantheon}</div>
                      </div>
                    </div>
                    {unlocked ? <Eye size={12} className="text-neutral-500" /> : <Lock size={12} className="text-neutral-700" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
