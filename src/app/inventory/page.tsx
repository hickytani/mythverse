'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { mythologyDb } from '@/data/seed';
import { audioEngine } from '@/utils/audioEngine';
import { 
  Swords, Shield, Gem, Package, X, Zap, Star,
  ChevronUp, CheckCircle2
} from 'lucide-react';
import PlayerCharacter from '@/components/PlayerCharacter';
import EnvironmentBackground from '@/components/EnvironmentBackground';

const RARITY_CONFIG: Record<string, { color: string; glow: string; label: string }> = {
  Common:    { color: '#9ca3af', glow: 'rgba(156,163,175,0.15)', label: 'COMMON' },
  Uncommon:  { color: '#34d399', glow: 'rgba(52,211,153,0.15)', label: 'UNCOMMON' },
  Rare:      { color: '#60a5fa', glow: 'rgba(96,165,250,0.2)', label: 'RARE' },
  Epic:      { color: '#a78bfa', glow: 'rgba(167,139,250,0.25)', label: 'EPIC' },
  Legendary: { color: '#f59e0b', glow: 'rgba(245,158,11,0.3)', label: 'LEGENDARY' },
  Mythic:    { color: '#f97316', glow: 'rgba(249,115,22,0.3)', label: 'MYTHIC' },
  Divine:    { color: '#d4af37', glow: 'rgba(212,175,55,0.4)', label: 'DIVINE' },
};

const SLOT_ICONS: Record<string, React.ElementType> = {
  weapon: Swords,
  head: Shield,
  chest: Shield,
  arms: Shield,
  legs: Shield,
};

export default function SacredArmoury() {
  const state = useGameStore();

  const [activeTab, setActiveTab] = useState<'weapons' | 'armor' | 'relics' | 'materials'>('weapons');
  const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);
  const [activeLoadout, setActiveLoadout] = useState<'battle' | 'exploration' | 'scholar'>('battle');
  const [activeSlotFilter, setActiveSlotFilter] = useState<'head' | 'chest' | 'arms' | 'legs' | null>(null);

  const handleEquip = (item: Record<string, any>) => {
    audioEngine.playEquip();
    if (activeTab === 'weapons') {
      state.equipWeapon(item.id);
    } else if (activeTab === 'armor') {
      state.equipArmor(item.id, item.slot);
    } else if (activeTab === 'relics') {
      const current = [...state.equippedRelicIds];
      state.equipRelic(item.id, current.length < 3 ? current.length : 0);
    }
    setSelectedItem(null);
  };

  const applyPreset = (preset: typeof activeLoadout) => {
    audioEngine.playEquip();
    setActiveLoadout(preset);
    if (preset === 'battle') {
      const best = [...state.weapons].sort((a, b) => b.baseDamage - a.baseDamage)[0];
      if (best) state.equipWeapon(best.id);
    }
  };

  const getEquippedWeapon = () => state.weapons.find(w => w.id === state.equippedWeaponId);
  const getEquippedArmor = (slot: 'head' | 'chest' | 'arms' | 'legs') =>
    state.armor.find(a => a.id === state.equippedArmorIds[slot]);

  const itemsList: any[] = activeTab === 'weapons' ? state.weapons
    : activeTab === 'armor' ? (activeSlotFilter ? state.armor.filter(a => a.slot === activeSlotFilter) : state.armor)
    : activeTab === 'relics' ? state.relics
    : Object.entries(state.materials).filter(([,qty]) => qty > 0).map(([name, qty]) => ({ id: name, name, quantity: qty }));

  const isEquippedItem = (item: any) =>
    state.equippedWeaponId === item.id ||
    Object.values(state.equippedArmorIds).includes(item.id) ||
    state.equippedRelicIds.includes(item.id);

  const tabs = [
    { id: 'weapons', label: 'Weapons', icon: Swords },
    { id: 'armor', label: 'Armour', icon: Shield },
    { id: 'relics', label: 'Relics', icon: Gem },
    { id: 'materials', label: 'Materials', icon: Package },
  ] as const;

  const equippedSlots = [
    { key: 'weapon', label: 'Weapon', get: () => getEquippedWeapon() },
    { key: 'head',   label: 'Helm',   get: () => getEquippedArmor('head') },
    { key: 'chest',  label: 'Chest',  get: () => getEquippedArmor('chest') },
    { key: 'arms',   label: 'Arms',   get: () => getEquippedArmor('arms') },
    { key: 'legs',   label: 'Legs',   get: () => getEquippedArmor('legs') },
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col pb-8 overflow-hidden font-sans">
      <EnvironmentBackground pantheon="greek" intensity="subtle" />

      <div className="relative z-10 flex flex-col gap-6 p-6 md:p-8">

        {/* ── HEADER ── */}
        <header className="flex items-end justify-between border-b border-neutral-900/60 pb-5">
          <div>
            <span className="text-[10px] text-amber-500 font-serif font-black tracking-[0.35em] uppercase block mb-1">
              Divine Equipment
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-black tracking-widest text-neutral-100 uppercase">
              THE SACRED ARMOURY
            </h1>
            <p className="text-xs text-neutral-500 mt-1.5 max-w-xl">
              Inspect your divine equipment, equip sacred weapons, and configure battle loadouts.
            </p>
          </div>
          {/* Loadout Selector */}
          <div className="flex gap-1.5 shrink-0">
            {(['battle', 'exploration', 'scholar'] as const).map(p => (
              <button
                key={p}
                onClick={() => applyPreset(p)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-serif font-black tracking-widest uppercase transition-all ${
                  activeLoadout === p
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40'
                    : 'text-neutral-500 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </header>

        {/* ── MAIN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── LEFT: Avatar + Equipped Slots ── */}
          <div className="lg:col-span-3 flex flex-col gap-4">

            {/* Avatar Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800/50 bg-neutral-950/60 backdrop-blur-sm flex flex-col items-center py-4"
              style={{ boxShadow: '0 0 40px rgba(212,175,55,0.05)' }}>
              <div className="text-[9px] tracking-widest uppercase font-serif font-black text-neutral-500 mb-3">Mythwalker</div>
              <div className="w-48">
                <PlayerCharacter animatePose size="md" />
              </div>
              <div className="mt-3 text-center">
                <div className="font-serif font-black text-xs text-neutral-200 uppercase">{state.username}</div>
                <div className="text-[9px] text-neutral-500 uppercase tracking-wider">Level {state.level} • {state.title}</div>
              </div>
            </div>

            {/* Equipment Slots */}
            <div className="rounded-2xl border border-neutral-800/50 bg-neutral-950/60 backdrop-blur-sm p-4 space-y-2">
              <div className="text-[9px] text-neutral-500 uppercase font-serif font-black tracking-widest mb-3">
                Equipment Slots
              </div>
              {equippedSlots.map(slot => {
                const item = slot.get();
                const rarity = item?.rarity ? RARITY_CONFIG[item.rarity] : null;

                return (
                  <button
                    key={slot.key}
                    onClick={() => {
                      audioEngine.playClick();
                      if (slot.key === 'weapon') { setActiveTab('weapons'); setActiveSlotFilter(null); }
                      else { setActiveTab('armor'); setActiveSlotFilter(slot.key as any); }
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200"
                    style={{
                      borderColor: item ? (rarity?.color + '50') : 'rgba(40,40,40,0.8)',
                      background: item ? (rarity?.glow) : 'rgba(10,8,6,0.5)',
                    }}
                  >
                    <span className="text-[10px] text-neutral-500 font-serif font-black uppercase tracking-wider">
                      {slot.label}
                    </span>
                    <span
                      className="text-[10px] font-serif font-bold truncate max-w-[90px] text-right"
                      style={{ color: item ? (rarity?.color || '#d4af37') : '#404040' }}
                    >
                      {item ? item.name : '— Empty —'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Item Browser + Detail ── */}
          <div className="lg:col-span-9 flex flex-col gap-4">

            {/* Tab Bar */}
            <div className="flex gap-2 p-1 bg-neutral-950/80 border border-neutral-800/50 rounded-xl backdrop-blur-sm">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveSlotFilter(null);
                    setSelectedItem(null);
                    audioEngine.playClick();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[11px] font-serif font-black uppercase tracking-wider transition-all duration-200"
                  style={{
                    background: activeTab === tab.id ? 'rgba(212,175,55,0.1)' : 'transparent',
                    color: activeTab === tab.id ? '#d4af37' : '#525252',
                    borderBottom: activeTab === tab.id ? '2px solid #d4af37' : '2px solid transparent',
                  }}
                >
                  <tab.icon size={12} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Armor Slot Sub-Filter */}
            {activeTab === 'armor' && (
              <div className="flex gap-2">
                {(['head', 'chest', 'arms', 'legs'] as const).map(slot => (
                  <button
                    key={slot}
                    onClick={() => {
                      setActiveSlotFilter(prev => prev === slot ? null : slot);
                      audioEngine.playClick();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-serif font-black uppercase tracking-wider transition-all ${
                      activeSlotFilter === slot
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40'
                        : 'text-neutral-500 border border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}

            {/* Item Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 min-h-[280px]">
              {itemsList.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-neutral-600 gap-2">
                  <Package size={28} className="opacity-40" />
                  <p className="text-xs font-serif">No items in this category</p>
                </div>
              ) : (
                itemsList.map((item: any, i: number) => {
                  const rarity = item.rarity ? RARITY_CONFIG[item.rarity] : null;
                  const equipped = isEquippedItem(item);

                  return (
                    <button
                      key={item.id + '_' + i}
                      onClick={() => {
                        setSelectedItem(item);
                        audioEngine.playClick();
                      }}
                      className="group relative text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5"
                      style={{
                        borderColor: equipped ? '#d4af37' : (rarity?.color + '30') || 'rgba(40,40,40,0.8)',
                        background: equipped
                          ? 'rgba(212,175,55,0.08)'
                          : (rarity?.glow || 'rgba(12,10,8,0.7)'),
                        boxShadow: equipped
                          ? '0 0 20px rgba(212,175,55,0.1)'
                          : rarity ? `0 0 10px ${rarity.glow}` : 'none',
                        backdropFilter: 'blur(8px)',
                        minHeight: '110px',
                      }}
                    >
                      {/* Equipped badge */}
                      {equipped && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 rounded px-1.5 py-0.5">
                          <CheckCircle2 size={8} className="text-amber-500" />
                          <span className="text-[8px] text-amber-500 font-bold uppercase tracking-wide">On</span>
                        </div>
                      )}

                      {/* Upgrade stars */}
                      {item.upgradeLevel !== undefined && item.upgradeLevel > 0 && (
                        <div className="absolute top-2 left-2 flex gap-0.5">
                          {Array.from({ length: Math.min(item.upgradeLevel, 5) }).map((_, si) => (
                            <Star key={si} size={7} className="text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      )}

                      <div className="mt-3">
                        <h4 className="font-serif font-bold text-xs text-neutral-200 leading-tight mt-1">
                          {item.name || item.id}
                        </h4>
                        {rarity && (
                          <span
                            className="text-[8px] font-black uppercase tracking-wider block mt-1"
                            style={{ color: rarity.color }}
                          >
                            {rarity.label}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {item.quantity !== undefined ? (
                          <span className="text-xs font-bold text-amber-400">×{item.quantity}</span>
                        ) : item.baseDamage ? (
                          <span className="text-[10px] text-neutral-400">
                            <span className="text-red-400 font-bold">{item.baseDamage}</span> DMG
                          </span>
                        ) : item.defense ? (
                          <span className="text-[10px] text-neutral-400">
                            <span className="text-blue-400 font-bold">{item.defense}</span> DEF
                          </span>
                        ) : (
                          <span className="text-[10px] text-purple-400 font-serif">Relic</span>
                        )}
                        <ChevronUp size={12} className="text-neutral-600 group-hover:text-neutral-400 rotate-90 transition-colors" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-950/60 border border-neutral-800/40 rounded-2xl backdrop-blur-sm text-center">
              {[
                { label: 'Weapons', value: state.weapons.length, color: '#f87171' },
                { label: 'Armor Pieces', value: state.armor.length, color: '#60a5fa' },
                { label: 'Relics', value: state.relics.length, color: '#c084fc' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-lg font-serif font-black" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-serif font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ITEM DETAIL OVERLAY ── */}
      {selectedItem && activeTab !== 'materials' && (() => {
        const rarity = selectedItem.rarity ? RARITY_CONFIG[selectedItem.rarity] : null;
        const equipped = isEquippedItem(selectedItem);

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="w-full max-w-md rounded-3xl border p-0 overflow-hidden shadow-2xl"
              style={{
                borderColor: rarity?.color + '50' || '#2a2520',
                boxShadow: `0 0 60px ${rarity?.glow || 'rgba(212,175,55,0.2)'}`,
                background: 'linear-gradient(145deg, #151210, #0c0a08)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header band */}
              <div
                className="p-6 border-b"
                style={{
                  borderColor: rarity?.color + '20',
                  background: `linear-gradient(135deg, ${rarity?.glow || 'rgba(212,175,55,0.05)'}, transparent)`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[9px] tracking-[0.3em] uppercase font-serif font-black mb-1"
                      style={{ color: rarity?.color || '#d4af37' }}>
                      {rarity?.label || 'ITEM'} • {selectedItem.type || selectedItem.slot || 'Relic'}
                    </div>
                    <h3 className="font-serif font-black text-xl text-neutral-100 uppercase tracking-wider">
                      {selectedItem.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-8 h-8 rounded-lg border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-200 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Lore */}
                <div className="p-4 rounded-xl border border-neutral-800/50 bg-neutral-950/60">
                  <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-serif font-black mb-2">Chronicle</div>
                  <p className="text-xs text-neutral-400 italic leading-relaxed font-serif">
                    "{selectedItem.lore || selectedItem.description || 'A relic of ancient power.'}"
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedItem.baseDamage && (
                    <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/30 text-center">
                      <div className="text-xs text-neutral-500 uppercase font-serif font-black">Damage</div>
                      <div className="text-2xl font-serif font-black text-red-400">{selectedItem.baseDamage}</div>
                    </div>
                  )}
                  {selectedItem.defense && (
                    <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-900/30 text-center">
                      <div className="text-xs text-neutral-500 uppercase font-serif font-black">Defense</div>
                      <div className="text-2xl font-serif font-black text-blue-400">{selectedItem.defense}</div>
                    </div>
                  )}
                  {selectedItem.upgradeLevel !== undefined && (
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-center">
                      <div className="text-xs text-neutral-500 uppercase font-serif font-black">Tier</div>
                      <div className="text-2xl font-serif font-black text-amber-400">+{selectedItem.upgradeLevel}</div>
                    </div>
                  )}
                </div>

                {/* Passive */}
                {(selectedItem.passiveAbility || selectedItem.passiveEffect) && (
                  <div className="p-3 rounded-xl border border-amber-800/30 bg-amber-950/10 flex items-start gap-2">
                    <Zap size={12} className="text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[9px] text-amber-500 uppercase font-serif font-black tracking-wider">Passive</div>
                      <div className="text-xs text-neutral-300 mt-1">{selectedItem.passiveAbility || selectedItem.passiveEffect}</div>
                    </div>
                  </div>
                )}

                {/* Equip Button */}
                {!equipped ? (
                  <button
                    onClick={() => handleEquip(selectedItem)}
                    className="w-full py-3.5 rounded-xl font-serif font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: `linear-gradient(135deg, ${rarity?.color || '#d4af37'}, ${rarity?.color || '#d4af37'}cc)`,
                      color: '#0c0a08',
                      boxShadow: `0 8px 24px ${rarity?.glow || 'rgba(212,175,55,0.3)'}`,
                    }}
                  >
                    Equip This Artifact
                  </button>
                ) : (
                  <div className="w-full py-3.5 rounded-xl font-serif font-black text-sm uppercase tracking-widest text-center"
                    style={{ background: 'rgba(52,211,153,0.08)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}>
                    ✓ Currently Equipped
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
