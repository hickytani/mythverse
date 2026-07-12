'use client';

import React, { use } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { mythologyDb } from '../../../data/seed';
import { audioEngine } from '../../../utils/audioEngine';
import { 
  ArrowLeft, 
  Volume2, 
  Heart, 
  HelpCircle, 
  Bookmark, 
  Share2, 
  Link2,
  Users,
  Compass,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ entityId: string }>;
}

export default function EntityProfile({ params }: Props) {
  const resolvedParams = use(params);
  const entityId = resolvedParams.entityId;
  const state = useGameStore();

  // Find the entity across deities, heroes, and creatures
  const deity = mythologyDb.deities.find(d => d.id === entityId);
  const hero = mythologyDb.heroes.find(h => h.id === entityId);
  const creature = mythologyDb.creatures.find(c => c.id === entityId);

  const entity = deity || hero || creature;

  if (!entity) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-red-500 font-serif space-y-2">
        <h2 className="text-2xl font-black">ENTITY NOT FOUND</h2>
        <Link href="/codex" className="text-xs text-neutral-400 underline">Return to Codex</Link>
      </div>
    );
  }

  // Track page view or mark codex unlocked
  React.useEffect(() => {
    state.unlockCodexEntry(entityId);
  }, [entityId]);

  // Audio speech synthesis helper for pronunciation
  const handlePronounce = () => {
    audioEngine.playHover();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(entity.name);
      // Try to find a classic/english voice
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US'));
      if (voice) utterance.voice = voice;
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getPantheonColor = () => {
    if (entity.pantheon === 'greek') return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    if (entity.pantheon === 'norse') return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
  };

  const attributeKeys = [
    { label: 'Strength', val: entity.attributes.strength, color: 'bg-red-500' },
    { label: 'Wisdom', val: entity.attributes.wisdom, color: 'bg-green-500' },
    { label: 'Insight', val: entity.attributes.insight, color: 'bg-blue-500' },
    { label: 'Endurance', val: entity.attributes.endurance, color: 'bg-orange-500' },
    { label: 'Agility', val: entity.attributes.agility, color: 'bg-teal-500' },
    { label: 'Spirit', val: entity.attributes.spirit, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header breadcrumb */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
        <Link 
          href="/codex" 
          onClick={() => audioEngine.playClick()} 
          className="flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-200"
        >
          <ArrowLeft size={14} /> Back to Codex
        </Link>
        <div className="flex gap-2">
          <button onClick={() => audioEngine.playClick()} className="p-2 border border-neutral-850 rounded hover:bg-neutral-900 text-neutral-400"><Bookmark size={14} /></button>
          <button onClick={() => audioEngine.playClick()} className="p-2 border border-neutral-850 rounded hover:bg-neutral-900 text-neutral-400"><Share2 size={14} /></button>
        </div>
      </div>

      {/* SPLASH PROFILE PANEL */}
      <section className="relative rounded-2xl border border-neutral-800 bg-neutral-900/10 p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-2xl overflow-hidden">
        
        {/* Procedural Canvas Artwork Box */}
        <div className="w-56 h-72 rounded-xl border border-neutral-800 bg-neutral-950 flex flex-col items-center justify-center text-center p-6 shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_60%)]" />
          <span className="font-serif text-6xl opacity-10 select-none block uppercase tracking-widest mb-4">{entity.name[0]}</span>
          <h3 className="font-serif font-black text-neutral-200 tracking-wider text-xl uppercase">{entity.name}</h3>
          <span className={`text-[9px] font-bold uppercase border px-2.5 py-0.5 rounded-full mt-2 block w-fit mx-auto ${getPantheonColor()}`}>
            {entity.pantheon} {entity.type}
          </span>
          <button 
            onClick={handlePronounce}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 hover:border-amber-500/30 rounded text-[10px] text-neutral-400 transition-colors"
          >
            <Volume2 size={12} /> Speak
          </button>
        </div>

        {/* DETAILS CORE */}
        <div className="flex-grow space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-wider text-neutral-100 uppercase flex items-center gap-3">
              <span>{entity.name}</span>
            </h1>
            <div className="flex flex-wrap gap-2 text-xs">
              {entity.aliases.map((alias, i) => (
                <span key={i} className="text-neutral-500 bg-neutral-950/60 border border-neutral-850 px-2.5 py-0.5 rounded-full font-serif font-medium">
                  {alias}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs text-neutral-500 uppercase tracking-widest font-semibold border-b border-neutral-850 pb-1">Lore Transcript</h4>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">{entity.lore}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Symbols */}
            <div className="space-y-2">
              <h5 className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Sacred Symbols</h5>
              <div className="flex flex-wrap gap-1.5">
                {entity.symbols.map((sym, i) => (
                  <span key={i} className="text-xs text-amber-500 bg-amber-500/5 border border-amber-500/15 rounded px-2.5 py-1">
                    ⚜ {sym}
                  </span>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div className="space-y-2">
              <h5 className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Active Abilities</h5>
              <div className="flex flex-wrap gap-1.5">
                {entity.abilities.map((abi, i) => (
                  <span key={i} className="text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1">
                    ⚔ {abi}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ATTRIBUTES AND RELATIONSHIPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Attributes display */}
        <section className="bg-neutral-900/20 border border-neutral-850 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif font-bold text-base tracking-widest text-neutral-400 uppercase flex items-center gap-2">
            <Compass size={16} /> RPG Combat Attributes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {attributeKeys.map(attr => (
              <div key={attr.label} className="space-y-1 bg-neutral-950/60 p-3 rounded-lg border border-neutral-855">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-semibold">{attr.label}</span>
                  <span className="font-bold text-neutral-200">{attr.val}</span>
                </div>
                <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full ${attr.color}`} style={{ width: `${attr.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Family relationships */}
        <section className="bg-neutral-900/20 border border-neutral-855 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif font-bold text-base tracking-widest text-neutral-400 uppercase flex items-center gap-2">
            <Users size={16} /> Relational Connections
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-neutral-500 block mb-1">Parents</span>
              <div className="space-y-1">
                {entity.family.parents.length === 0 ? (
                  <span className="text-neutral-600 block">Primordial origin</span>
                ) : (
                  entity.family.parents.map((p, i) => (
                    <span key={i} className="text-neutral-300 block">✦ {p}</span>
                  ))
                )}
              </div>
            </div>
            
            <div>
              <span className="text-neutral-500 block mb-1">Siblings</span>
              <div className="space-y-1">
                {entity.family.siblings.length === 0 ? (
                  <span className="text-neutral-600 block">None</span>
                ) : (
                  entity.family.siblings.map((s, i) => (
                    <span key={i} className="text-neutral-300 block">✦ {s}</span>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-neutral-855 pt-3">
              <span className="text-neutral-500 block mb-1">Children</span>
              <div className="space-y-1">
                {entity.family.children.length === 0 ? (
                  <span className="text-neutral-600 block">None</span>
                ) : (
                  entity.family.children.map((c, i) => (
                    <span key={i} className="text-neutral-300 block">✦ {c}</span>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-neutral-855 pt-3">
              <span className="text-neutral-500 block mb-1">Spouses</span>
              <div className="space-y-1">
                {entity.family.spouses.length === 0 ? (
                  <span className="text-neutral-600 block">None</span>
                ) : (
                  entity.family.spouses.map((sp, i) => (
                    <span key={i} className="text-neutral-300 block">✦ {sp}</span>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* LITERATURE REFERENCE */}
      <section className="bg-neutral-900/10 border border-neutral-855 rounded-2xl p-6 space-y-3">
        <h3 className="font-serif font-bold text-sm tracking-widest text-neutral-400 uppercase flex items-center gap-2">
          <Briefcase size={16} /> Historic Source Citations
        </h3>
        <div className="space-y-1 text-xs text-neutral-400">
          {entity.sources.map((src, i) => (
            <div key={i} className="flex items-center gap-2">
              <Link2 size={12} className="text-neutral-500" />
              <span className="font-serif italic text-neutral-300">{src}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
