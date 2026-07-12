'use client';

import React, { useState, useMemo } from 'react';
import { useGameStore } from '@/store/gameStore';
import { characters } from '@/data/seed/characters';
import { MythCharacter, Pantheon, Rarity, CharacterRole } from '@/types/game';
import { audioEngine } from '@/utils/audioEngine';
import { 
  Sparkles, 
  Trophy, 
  Search, 
  Compass, 
  Filter, 
  Lock, 
  Unlock, 
  ChevronRight,
  Shield,
  Info,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import EnvironmentBackground from '@/components/EnvironmentBackground';
import Link from 'next/link';

export default function CharactersGallery() {
  const state = useGameStore();

  const [selectedPantheon, setSelectedPantheon] = useState<Pantheon | 'all'>('all');
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'all'>('all');
  const [selectedRole, setSelectedRole] = useState<CharacterRole | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>('char_athena');

  // Filter character database list
  const filteredCharacters = useMemo(() => {
    return characters.filter(c => {
      if (selectedPantheon !== 'all' && c.pantheon !== selectedPantheon) return false;
      if (selectedRarity !== 'all' && c.rarity !== selectedRarity) return false;
      if (selectedRole !== 'all' && c.role !== selectedRole) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        // For partially discovered/secret, search matches the clues or type if name is hidden
        const isUnlocked = state.unlockedCharacterIds.includes(c.id);
        const nameMatches = c.name.toLowerCase().includes(query);
        const titleMatches = c.title.toLowerCase().includes(query);
        
        if (c.lockState === 'secret' && !isUnlocked) {
          return c.lockClue.toLowerCase().includes(query) || c.pantheon.includes(query);
        }
        return nameMatches || titleMatches;
      }
      return true;
    });
  }, [selectedPantheon, selectedRarity, selectedRole, searchQuery, state.unlockedCharacterIds]);

  // Selected character details helper
  const activeChar = useMemo(() => {
    return characters.find(c => c.id === selectedId) || characters[0];
  }, [selectedId]);

  const activeCharUnlocked = state.unlockedCharacterIds.includes(activeChar.id);

  // Stats: Total characters unlocked
  const completionPercentage = useMemo(() => {
    const unlockedCount = characters.filter(c => state.unlockedCharacterIds.includes(c.id)).length;
    return Math.round((unlockedCount / characters.length) * 100);
  }, [state.unlockedCharacterIds]);

  const handleEquipCompanion = (charId: string) => {
    audioEngine.playQuestComplete();
    state.equipCompanion(charId);
  };

  const handleSelectChar = (id: string) => {
    audioEngine.playClick();
    setSelectedId(id);
  };

  // Helper for rendering locks
  const getLockDisplay = (c: MythCharacter) => {
    const unlocked = state.unlockedCharacterIds.includes(c.id);
    if (unlocked) return { status: 'unlocked', label: c.name, subLabel: c.title, silhouette: false };

    if (c.lockState === 'known') {
      return { 
        status: 'known_locked', 
        label: c.name, 
        subLabel: 'Locked Ally', 
        silhouette: true,
        clue: c.unlockCondition 
      };
    } else if (c.lockState === 'partial') {
      return { 
        status: 'partial_locked', 
        label: c.title.toUpperCase(), 
        subLabel: `Discovered Clue: ${c.lockClue}`,
        silhouette: true,
        clue: `Seen in ${c.pantheon.toUpperCase()}`
      };
    } else {
      return { 
        status: 'secret_locked', 
        label: 'SECRET DEITY', 
        subLabel: 'Identity Cryptic', 
        silhouette: true,
        clue: c.lockClue 
      };
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between py-6 px-4 md:px-8 overflow-hidden font-sans">
      
      {/* Background layer */}
      <EnvironmentBackground pantheon={activeChar.pantheon} intensity="cinematic" />

      {/* TOP FILTER HUD */}
      <header className="relative flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-4 bg-neutral-900/60 border border-neutral-850 p-5 rounded-2xl backdrop-blur-md shadow-2xl z-10 text-xs">
        
        {/* Left Search and stats summary */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search alignment grid..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-neutral-950/80 border border-neutral-850 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-amber-500/50 text-neutral-200"
            />
            <Search className="absolute left-3 top-2.5 text-neutral-500" size={14} />
          </div>

          <div className="flex items-center gap-2 bg-neutral-950/60 border border-neutral-850 px-4 py-2 rounded-lg">
            <Trophy size={14} className="text-amber-500 shrink-0" />
            <span className="text-neutral-400 font-serif font-bold uppercase tracking-wider">Alignment Completion:</span>
            <span className="text-amber-400 font-bold">{completionPercentage}%</span>
            <div className="w-20 bg-neutral-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-500 h-full" style={{ width: `${completionPercentage}%` }} />
            </div>
          </div>
        </div>

        {/* Filter selection dropdowns */}
        <div className="flex flex-wrap gap-3">
          {/* Pantheon tabs */}
          <div className="flex bg-neutral-950 border border-neutral-850 p-1 rounded-lg">
            {(['all', 'greek', 'norse', 'egyptian'] as const).map(p => (
              <button
                key={p}
                onClick={() => { setSelectedPantheon(p); audioEngine.playClick(); }}
                className={`px-3 py-1.5 rounded-md uppercase tracking-wider font-semibold font-serif text-[10px] ${
                  selectedPantheon === p ? 'bg-amber-500/10 text-amber-500' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Rarity selector */}
          <select
            value={selectedRarity}
            onChange={e => { setSelectedRarity(e.target.value as any); audioEngine.playClick(); }}
            className="bg-neutral-950 border border-neutral-850 rounded-lg px-3 py-2 text-neutral-400 focus:outline-none font-serif text-[10px] uppercase font-bold"
          >
            <option value="all">All Rarities</option>
            <option value="Common">Common</option>
            <option value="Rare">Rare</option>
            <option value="Epic">Epic</option>
            <option value="Legendary">Legendary</option>
            <option value="Mythic">Mythic</option>
            <option value="Divine">Divine</option>
          </select>

          {/* Role selector */}
          <select
            value={selectedRole}
            onChange={e => { setSelectedRole(e.target.value as any); audioEngine.playClick(); }}
            className="bg-neutral-950 border border-neutral-850 rounded-lg px-3 py-2 text-neutral-400 focus:outline-none font-serif text-[10px] uppercase font-bold"
          >
            <option value="all">All Roles</option>
            <option value="Strategist">Strategist</option>
            <option value="Warrior">Warrior</option>
            <option value="Guardian">Guardian</option>
            <option value="Scholar">Scholar</option>
            <option value="Seer">Seer</option>
            <option value="Trickster">Trickster</option>
            <option value="Healer">Healer</option>
            <option value="Hunter">Hunter</option>
            <option value="Ruler">Ruler</option>
            <option value="Judge">Judge</option>
            <option value="Destroyer">Destroyer</option>
            <option value="Protector">Protector</option>
          </select>
        </div>

      </header>

      {/* CORE SPLIT GRID VIEW */}
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 z-10 items-stretch">
        
        {/* LEFT COLUMN: CARDS RAIL */}
        <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-850 rounded-3xl p-4 md:p-6 backdrop-blur-md shadow-2xl flex flex-col justify-between overflow-y-auto max-h-[580px]">
          <div className="space-y-3">
            <span className="text-[10px] text-neutral-500 font-serif font-black tracking-widest uppercase block pl-1">
              Select Character Node
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {filteredCharacters.map(c => {
                const info = getLockDisplay(c);
                const isSelected = selectedId === c.id;
                
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectChar(c.id)}
                    className={`text-left p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                        : 'border-neutral-850/60 bg-neutral-950/60 hover:border-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Portrait Thumbnail */}
                      <div className="w-12 h-12 rounded-lg border border-neutral-850 overflow-hidden bg-neutral-900 shrink-0 relative flex items-center justify-center">
                        <img 
                          src={c.visualAssets.portrait} 
                          alt={c.name} 
                          className={`w-full h-full object-cover ${info.silhouette ? 'character-locked' : ''}`}
                        />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-xs text-neutral-200 truncate max-w-[180px]">{info.label}</h4>
                        <span className="text-[9px] text-neutral-500 font-serif font-bold block uppercase tracking-wider">{info.subLabel}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[8px] uppercase px-2 py-0.5 rounded font-black tracking-widest ${
                        c.pantheon === 'greek' ? 'bg-purple-500/10 text-purple-400' : c.pantheon === 'norse' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {c.pantheon}
                      </span>
                      {info.status === 'unlocked' ? (
                        <Unlock size={12} className="text-amber-500" />
                      ) : (
                        <Lock size={12} className="text-neutral-600" />
                      )}
                    </div>
                  </button>
                );
              })}

              {filteredCharacters.length === 0 && (
                <div className="text-center py-12 text-neutral-600 font-serif text-xs">
                  No alignment nodes match your filter configuration.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL STAGE PREVIEW */}
        <div className="lg:col-span-7 bg-neutral-900/60 border border-amber-500/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle overlay decorative grid */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Character Stage Showcase */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-amber-500 text-[10px] font-serif font-black tracking-[0.25em] uppercase block mb-1">
                  Selected Deity stage
                </span>
                
                {/* Check if locked/unlocked details */}
                <h2 className="text-3xl font-serif font-black text-neutral-100 uppercase tracking-wide">
                  {state.unlockedCharacterIds.includes(activeChar.id) || activeChar.lockState === 'known' ? activeChar.name : 'SILHOUETTE IDENTITY'}
                </h2>
                
                <span className="text-xs text-neutral-450 italic mt-0.5 block">
                  {state.unlockedCharacterIds.includes(activeChar.id) || activeChar.lockState === 'known' ? activeChar.title : 'Details hidden until discovered'}
                </span>
              </div>

              {/* Rarity & Role Badges */}
              <div className="flex gap-2">
                <span className="bg-neutral-950/80 border border-neutral-850 px-2.5 py-1 rounded text-[9px] font-serif font-bold uppercase tracking-wider text-amber-400">
                  {activeChar.rarity}
                </span>
                <span className="bg-neutral-950/80 border border-neutral-850 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider text-neutral-300">
                  {activeChar.role}
                </span>
              </div>
            </div>

            {/* Display Stage Container */}
            <div className="relative h-64 bg-neutral-950/85 border border-neutral-850/80 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
              <img
                src={activeChar.visualAssets.fullBody}
                alt={activeChar.name}
                className={`h-full object-contain p-4 transition-all duration-700 ${!activeCharUnlocked ? 'character-locked' : ''}`}
              />
              {!activeCharUnlocked && (
                <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-neutral-950/90 border border-neutral-850 rounded-xl p-4 max-w-sm space-y-2.5 shadow-2xl">
                    <div className="flex items-center justify-center gap-2 text-amber-500">
                      <Lock size={16} />
                      <span className="text-xs font-serif font-black tracking-widest uppercase">LOCKED DEITY GATEWAY</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-serif">
                      {activeChar.lockState === 'known' 
                        ? `UNLOCK CONDITION: ${activeChar.unlockCondition}` 
                        : activeChar.lockState === 'partial'
                        ? `LOCATION CLUE: Discovered around ${activeChar.lockClue}.`
                        : `CRYPTIC MYSTERY: ${activeChar.lockClue}`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Unlocked Attributes / Abilities Detail */}
            {activeCharUnlocked ? (
              <div className="space-y-4">
                <div className="bg-neutral-950/40 border border-neutral-850/50 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Sparkles size={14} />
                    <span className="text-[11px] font-serif font-bold uppercase tracking-wider">Active Ability: {activeChar.activeAbility.name}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">{activeChar.activeAbility.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-950/40 border border-neutral-850/50 p-3 rounded-xl">
                    <span className="text-[9px] text-neutral-500 uppercase tracking-wider block mb-1">Passive Stance</span>
                    <span className="text-xs font-serif font-bold text-neutral-250 block">{activeChar.passiveAbility.name}</span>
                    <p className="text-[10px] text-neutral-450 mt-1 leading-relaxed">{activeChar.passiveAbility.description}</p>
                  </div>

                  <div className="bg-neutral-950/40 border border-neutral-850/50 p-3 rounded-xl">
                    <span className="text-[9px] text-neutral-500 uppercase tracking-wider block mb-1">Companion Exploration Bonus</span>
                    <span className="text-xs font-serif font-bold text-amber-400 block">⚡ Aura Link</span>
                    <p className="text-[10px] text-neutral-450 mt-1 leading-relaxed">{activeChar.companionBonus}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 bg-neutral-950/30 border border-neutral-850/30 rounded-xl">
                <p className="text-[11px] text-neutral-500 italic">
                  Complete related campaign storylines and exploration trials to secure this deity's alignment and summon them as an active companion.
                </p>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="border-t border-neutral-850 pt-4 flex flex-col sm:flex-row gap-3 mt-6">
            {activeCharUnlocked ? (
              <>
                <button
                  onClick={() => handleEquipCompanion(activeChar.id)}
                  disabled={state.activeCompanionId === activeChar.id}
                  className={`flex-1 font-serif font-bold tracking-widest px-6 py-3 rounded-xl transition-all text-xs flex items-center justify-center gap-2 ${
                    state.activeCompanionId === activeChar.id
                      ? 'bg-neutral-900 border border-neutral-800 text-neutral-500 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-600 text-neutral-950 hover:scale-[1.02] cursor-pointer'
                  }`}
                >
                  <CheckCircle size={14} />
                  <span>{state.activeCompanionId === activeChar.id ? 'ACTIVE COMPANION' : 'EQUIP AS COMPANION'}</span>
                </button>

                <Link
                  href={`/characters/${activeChar.id}`}
                  onClick={() => audioEngine.playClick()}
                  className="flex-1 border border-neutral-800 hover:bg-neutral-850 text-neutral-300 font-serif tracking-widest px-6 py-3 rounded-xl transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Info size={14} />
                  <span>INSPECT ALLY LORE</span>
                </Link>
              </>
            ) : (
              <button
                disabled={true}
                className="w-full bg-neutral-950 border border-neutral-900 text-neutral-600 font-serif font-bold tracking-widest py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <Lock size={14} />
                <span>ALIGNMENT DEITY GATEWAY LOCKED</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
