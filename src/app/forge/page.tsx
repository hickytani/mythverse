'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { Hammer, Swords, Shield, Flame, AlertCircle, Zap, Star, Package, Check, ChevronRight } from 'lucide-react';
import EnvironmentBackground from '@/components/EnvironmentBackground';

const RARITY_CONFIG: Record<string, { color: string; glow: string }> = {
  Common:    { color: '#9ca3af', glow: 'rgba(156,163,175,0.15)' },
  Uncommon:  { color: '#34d399', glow: 'rgba(52,211,153,0.15)' },
  Rare:      { color: '#60a5fa', glow: 'rgba(96,165,250,0.2)' },
  Epic:      { color: '#a78bfa', glow: 'rgba(167,139,250,0.25)' },
  Legendary: { color: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
  Mythic:    { color: '#f97316', glow: 'rgba(249,115,22,0.3)' },
  Divine:    { color: '#d4af37', glow: 'rgba(212,175,55,0.4)' },
};

const MATERIAL_CONFIG: Record<string, { icon: string; color: string; label: string }> = {
  bronze_fragment: { icon: '🪙', color: '#cd7f32', label: 'Bronze Fragments' },
  rune_stone:      { icon: '🪨', color: '#60a5fa', label: 'Rune Stones' },
  titan_ore:       { icon: '⚙️', color: '#a0a0a0', label: 'Titan Ore' },
  spirit_thread:   { icon: '🧵', color: '#c084fc', label: 'Spirit Thread' },
  sunstone:        { icon: '🌟', color: '#fbbf24', label: 'Sunstone' },
  glacial_core:    { icon: '❄️', color: '#93c5fd', label: 'Glacial Core' },
  underworld_crystal: { icon: '💎', color: '#818cf8', label: 'Underworld Crystal' },
  divine_essence:  { icon: '✨', color: '#f0abfc', label: 'Divine Essence' },
};

export default function AnvilForge() {
  const state = useGameStore();
  const [upgradeCategory, setUpgradeCategory] = useState<'weapons' | 'armor'>('weapons');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isForging, setIsForging] = useState(false);
  const [forgeResult, setForgeResult] = useState<'success' | 'fail' | null>(null);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);

  const items = upgradeCategory === 'weapons' ? state.weapons : state.armor;
  const selectedItem = items.find(i => i.id === selectedId) as Record<string, any> | undefined;

  const getUpgradeCost = (item: Record<string, any> | undefined) => {
    if (!item) return {};
    const nextLvl = item.upgradeLevel + 1;
    return {
      bronze_fragment: 5 * nextLvl,
      ...(item.pantheon === 'norse' && { rune_stone: 2 * nextLvl }),
      ...(item.pantheon === 'egyptian' && { spirit_thread: 2 * nextLvl }),
      ...(item.pantheon === 'greek' && { titan_ore: 2 * nextLvl }),
    };
  };

  const upgradeCost = selectedItem ? getUpgradeCost(selectedItem) : {};
  const canAfford = Object.entries(upgradeCost).every(([name, qty]) => (state.materials[name] || 0) >= (qty as number));

  const handleForge = async () => {
    if (!selectedItem || isForging) return;
    audioEngine.playForge();
    setUpgradeError(null);
    setIsForging(true);
    setForgeResult(null);

    await new Promise(res => setTimeout(res, 900));

    let success = false;
    if (upgradeCategory === 'weapons') success = state.upgradeWeapon(selectedItem.id);
    else success = state.upgradeArmor(selectedItem.id);

    setIsForging(false);

    if (success) {
      setForgeResult('success');
      audioEngine.playLevelUp();
      setTimeout(() => setForgeResult(null), 2500);
    } else {
      setForgeResult('fail');
      setUpgradeError(canAfford ? 'Forging process failed.' : 'Insufficient materials for this upgrade.');
      setTimeout(() => { setForgeResult(null); setUpgradeError(null); }, 2500);
    }
  };

  const hasMaterials = Object.entries(state.materials).some(([, qty]) => qty > 0);

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col overflow-hidden font-sans">
      <EnvironmentBackground pantheon="greek" intensity="subtle" />

      <div className="relative z-10 flex flex-col gap-6 p-6 md:p-8 pb-12">

        {/* ── HEADER ── */}
        <header className="border-b border-neutral-900/60 pb-5">
          <span className="text-[10px] text-red-500 font-serif font-black tracking-[0.35em] uppercase block mb-1">
            Divine Smithing
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-black tracking-widest text-neutral-100 uppercase">
            THE ANVIL FORGE
          </h1>
          <p className="text-xs text-neutral-500 mt-1.5 max-w-xl">
            Feed the divine flames. Strike the anvil. Temper your weapons with mythological materials to ascend beyond mortal limits.
          </p>
        </header>

        {/* ── MAIN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── LEFT: Item Selector ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Category Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-950/80 border border-neutral-800/50 rounded-xl">
              {(['weapons', 'armor'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => { setUpgradeCategory(cat); setSelectedId(null); audioEngine.playClick(); }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-[11px] font-serif font-black uppercase tracking-wider transition-all"
                  style={{
                    background: upgradeCategory === cat ? 'rgba(239,68,68,0.1)' : 'transparent',
                    color: upgradeCategory === cat ? '#f87171' : '#525252',
                    borderBottom: upgradeCategory === cat ? '2px solid #ef4444' : '2px solid transparent',
                  }}
                >
                  {cat === 'weapons' ? <Swords size={12} /> : <Shield size={12} />}
                  {cat}
                </button>
              ))}
            </div>

            {/* Item List */}
            <div className="rounded-2xl border border-neutral-800/50 bg-neutral-950/60 backdrop-blur-sm overflow-hidden">
              <div className="p-4 border-b border-neutral-800/40">
                <div className="text-[9px] text-neutral-500 uppercase font-serif font-black tracking-widest">
                  Select Item to Upgrade
                </div>
              </div>
              <div className="divide-y divide-neutral-900/40 max-h-[320px] overflow-y-auto">
                {items.length === 0 ? (
                  <div className="p-8 text-center text-neutral-600 text-xs font-serif">No items owned.</div>
                ) : (
                  items.map((item: any) => {
                    const rarity = item.rarity ? RARITY_CONFIG[item.rarity] : null;
                    const isSelected = selectedId === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => { setSelectedId(item.id); audioEngine.playClick(); }}
                        className="w-full flex items-center justify-between p-4 text-left transition-all duration-200"
                        style={{
                          background: isSelected ? `${rarity?.glow || 'rgba(212,175,55,0.05)'}` : 'transparent',
                          borderLeft: isSelected ? `3px solid ${rarity?.color || '#d4af37'}` : '3px solid transparent',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {/* Upgrade tier stars */}
                          <div className="w-10 h-10 rounded-xl border flex items-center justify-center flex-col shrink-0"
                            style={{
                              borderColor: rarity?.color + '40' || '#2a2520',
                              background: rarity?.glow || 'rgba(10,8,6,0.5)',
                            }}>
                            <span className="text-xs" style={{ color: rarity?.color }}>
                              {item.pantheon === 'greek' ? '⚡' : item.pantheon === 'norse' ? '🌩' : '☀'}
                            </span>
                          </div>
                          <div>
                            <div className="font-serif font-bold text-xs text-neutral-200">{item.name}</div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-[8px] uppercase font-black tracking-wider" style={{ color: rarity?.color }}>
                                {item.rarity}
                              </span>
                              {item.slot && (
                                <span className="text-[8px] text-neutral-600">• {item.slot}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {/* Stars for upgrade level */}
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, si) => (
                              <Star
                                key={si}
                                size={8}
                                className={si < item.upgradeLevel ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'}
                              />
                            ))}
                          </div>
                          {isSelected && <ChevronRight size={12} style={{ color: rarity?.color }} />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Forge Panel ── */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {selectedItem ? (
              <>
                {/* Selected Item Detail */}
                <div
                  className="rounded-2xl border p-6 backdrop-blur-sm"
                  style={{
                    borderColor: RARITY_CONFIG[selectedItem.rarity]?.color + '30' || '#2a2520',
                    background: `linear-gradient(145deg, ${RARITY_CONFIG[selectedItem.rarity]?.glow || 'rgba(212,175,55,0.05)'}, rgba(10,8,6,0.9))`,
                  }}
                >
                  {/* Item Header */}
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <div
                        className="text-[9px] tracking-[0.3em] uppercase font-serif font-black mb-1"
                        style={{ color: RARITY_CONFIG[selectedItem.rarity]?.color || '#d4af37' }}>
                        {selectedItem.rarity} {selectedItem.type || selectedItem.slot || ''}
                      </div>
                      <h3 className="font-serif font-black text-xl text-neutral-100 uppercase">{selectedItem.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-neutral-500 uppercase font-serif font-black">Current Tier</div>
                      <div className="text-2xl font-serif font-black text-amber-400">+{selectedItem.upgradeLevel}</div>
                    </div>
                  </div>

                  {/* Stat Preview */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {selectedItem.baseDamage && (
                      <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/30 text-center">
                        <div className="text-[9px] text-neutral-500 uppercase font-serif font-black">Base Damage</div>
                        <div className="text-xl font-serif font-black text-red-400">{selectedItem.baseDamage}</div>
                        <div className="text-[9px] text-green-400">→ {Math.floor(selectedItem.baseDamage * 1.25)} after</div>
                      </div>
                    )}
                    {selectedItem.defense && (
                      <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-900/30 text-center">
                        <div className="text-[9px] text-neutral-500 uppercase font-serif font-black">Defense</div>
                        <div className="text-xl font-serif font-black text-blue-400">{selectedItem.defense}</div>
                        <div className="text-[9px] text-green-400">→ {Math.floor(selectedItem.defense * 1.22)} after</div>
                      </div>
                    )}
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-center">
                      <div className="text-[9px] text-neutral-500 uppercase font-serif font-black">Upgrade Tier</div>
                      <div className="text-xl font-serif font-black text-amber-400">+{selectedItem.upgradeLevel} → +{selectedItem.upgradeLevel + 1}</div>
                    </div>
                  </div>

                  {/* Passive Ability */}
                  {selectedItem.passiveAbility && (
                    <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/50 flex items-start gap-2 mb-5">
                      <Zap size={12} className="text-amber-500 mt-0.5 shrink-0" />
                      <div className="text-xs text-neutral-400">{selectedItem.passiveAbility}</div>
                    </div>
                  )}

                  {/* Materials Required */}
                  <div className="space-y-3 mb-6">
                    <div className="text-[9px] text-neutral-500 uppercase font-serif font-black tracking-widest">
                      Materials Required
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(upgradeCost).filter(([, qty]) => (qty as number) > 0).map(([mat, qty]) => {
                        const matConf = MATERIAL_CONFIG[mat];
                        const have = state.materials[mat] || 0;
                        const enough = have >= (qty as number);

                        return (
                          <div
                            key={mat}
                            className="flex items-center justify-between p-3 rounded-xl border"
                            style={{
                              borderColor: enough ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)',
                              background: enough ? 'rgba(52,211,153,0.05)' : 'rgba(239,68,68,0.05)',
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span>{matConf?.icon || '📦'}</span>
                              <span className="text-[10px] text-neutral-400 font-serif">{matConf?.label || mat}</span>
                            </div>
                            <div className="text-xs font-serif font-black"
                              style={{ color: enough ? '#34d399' : '#f87171' }}>
                              {have} / {qty as number}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* FORGE BUTTON */}
                  <button
                    onClick={handleForge}
                    disabled={!canAfford || isForging}
                    className="w-full py-4 rounded-2xl font-serif font-black text-base uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: isForging
                        ? 'rgba(239,68,68,0.1)'
                        : canAfford
                        ? 'linear-gradient(135deg, #b91c1c, #dc2626)'
                        : 'rgba(40,40,40,0.5)',
                      color: canAfford || isForging ? '#fff' : '#525252',
                      boxShadow: canAfford && !isForging ? '0 8px 32px rgba(220,38,38,0.4)' : 'none',
                      cursor: canAfford && !isForging ? 'pointer' : 'not-allowed',
                    }}
                  >
                    {isForging ? (
                      <span className="flex items-center justify-center gap-3">
                        <Flame size={16} className="animate-pulse" />
                        Forging in Progress...
                      </span>
                    ) : forgeResult === 'success' ? (
                      <span className="flex items-center justify-center gap-3 text-green-400">
                        <Check size={16} />
                        UPGRADE SUCCESSFUL!
                      </span>
                    ) : forgeResult === 'fail' ? (
                      <span className="flex items-center justify-center gap-3 text-red-400">
                        <AlertCircle size={16} />
                        Forging Failed
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        <Hammer size={16} />
                        STRIKE THE ANVIL
                      </span>
                    )}
                  </button>

                  {upgradeError && (
                    <div className="mt-3 p-3 rounded-xl bg-red-950/20 border border-red-900/30 flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle size={12} />
                      {upgradeError}
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Empty State */
              <div
                className="rounded-3xl border border-neutral-800/30 bg-neutral-950/40 backdrop-blur-sm flex flex-col items-center justify-center p-16 gap-6 text-center"
                style={{ minHeight: '400px' }}
              >
                <div className="w-20 h-20 rounded-2xl border border-red-900/30 bg-red-950/10 flex items-center justify-center">
                  <Hammer size={32} className="text-red-900" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-neutral-400 uppercase tracking-wider">
                    Select an Item
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2 font-serif max-w-xs leading-relaxed">
                    Choose a weapon or armour from the left panel to inspect its upgrade path and required materials.
                  </p>
                </div>
              </div>
            )}

            {/* Materials Stash */}
            <div className="rounded-2xl border border-neutral-800/50 bg-neutral-950/60 backdrop-blur-sm p-5">
              <div className="text-[9px] text-neutral-500 uppercase font-serif font-black tracking-widest mb-4 flex items-center gap-2">
                <Package size={10} />
                Material Stash
              </div>
              {!hasMaterials ? (
                <p className="text-xs text-neutral-600 font-serif italic">No crafting materials. Defeat creatures in battle to collect them.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(state.materials)
                    .filter(([, qty]) => qty > 0)
                    .map(([mat, qty]) => {
                      const conf = MATERIAL_CONFIG[mat];
                      return (
                        <div
                          key={mat}
                          className="p-3 rounded-xl border border-neutral-800/40 bg-neutral-950/40 text-center"
                        >
                          <div className="text-xl mb-1">{conf?.icon || '📦'}</div>
                          <div className="text-sm font-serif font-black text-neutral-200">{qty}</div>
                          <div className="text-[8px] text-neutral-500 font-serif uppercase tracking-wide leading-tight mt-0.5">
                            {conf?.label || mat}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
