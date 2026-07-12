'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Zap, 
  Flame, 
  Sun, 
  Compass, 
  ChevronRight, 
  ShieldAlert, 
  Trophy, 
  BookOpen, 
  HelpCircle,
  Hammer
} from 'lucide-react';
import { audioEngine } from '@/utils/audioEngine';
import PlayerCharacter from '@/components/PlayerCharacter';

export default function LandingPage() {
  const router = useRouter();
  const [soundOn, setSoundOn] = useState(false);
  const [activePortal, setActivePortal] = useState<string | null>(null);

  const toggleSound = () => {
    if (soundOn) {
      audioEngine.stopAmbient();
      setSoundOn(false);
    } else {
      setSoundOn(true);
      audioEngine.startAmbient('temple');
      audioEngine.playClick();
    }
  };

  const weaponsShowcase = [
    { name: '⚡ Thunderbolt Spear', type: 'Greek Divine', desc: 'Forged by Elder Cyclopes, emits lightning shockwaves.', dmg: 145 },
    { name: '🛡️ Aegis Shield Guard', type: 'Greek Set', desc: 'Decorated with the Gorgon head, petrifies enemy turns.', dmg: 90 },
    { name: '⚔️ Gungnir Shard', type: 'Norse Divine', desc: 'Runic spear-shard destined to never miss its strike.', dmg: 155 },
    { name: '🔱 Khopesh of Horus', type: 'Egyptian Sacred', desc: 'Curved obsidian sickle blade channeling solar fire.', dmg: 130 }
  ];

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen overflow-x-hidden relative selection:bg-amber-500/30 font-sans">
      
      {/* BACKGROUND FLOATING PARALLAX DUST */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(38,26,15,0.2)_0%,transparent_70%)] -z-10 animate-slow-drift" />

      {/* AUDIO CONTROL */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <button 
          onClick={toggleSound}
          className={`p-3 rounded-full border transition-all duration-500 backdrop-blur-md ${soundOn ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-neutral-800 bg-neutral-900/60 text-neutral-500'}`}
        >
          {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        <Link 
          href="/enter" 
          onClick={() => audioEngine.playClick()}
          className="bg-amber-500 hover:bg-amber-600 text-neutral-950 px-8 py-3 rounded-lg font-serif font-black tracking-widest text-xs transition-transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
        >
          PLAY NOW
        </Link>
      </div>

      {/* SECTION 1: HERO VIEW */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-neutral-900/60">
        
        {/* Ruins visual graphics */}
        <div className="absolute w-[800px] h-[800px] rounded-full border border-dashed border-amber-500/5 animate-[spin_300s_linear_infinite] -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.02)_1.5px,transparent_1.5px)] bg-[size:32px_32px] opacity-40 -z-10" />

        <div className="max-w-4xl space-y-8 z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-amber-500 font-serif font-bold tracking-[0.4em] text-xs uppercase block mb-4">
              ⚔️ Discover the Legends. Enter their Worlds. Forge your own Myth.
            </span>
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif font-black tracking-[0.25em] text-neutral-100 text-glow-gold">
              MYTH<span className="text-amber-500">VERSE</span>
            </h1>
          </motion.div>

          {/* Layered character avatar preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="py-4"
          >
            <PlayerCharacter previewWeaponId="spear" animatePose={true} />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed"
          >
            An immersive role-playing experience across Greek, Norse, and Egyptian realms. Slay monsters, upgrade equipment, and unlock ancient codex secrets.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link 
              href="/enter"
              onClick={() => audioEngine.playClick()}
              className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-black tracking-widest text-sm rounded-lg transition-transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              ENTER UNIVERSE
            </Link>
            <Link 
              href="/guide"
              onClick={() => audioEngine.playClick()}
              className="px-10 py-4 border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-700 text-neutral-300 font-serif font-bold tracking-widest text-sm rounded-lg transition-colors"
            >
              GAMEPLAY GUIDE
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THREE WORLD PORTALS */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16 border-b border-neutral-900">
        <div className="text-center space-y-3">
          <span className="text-amber-500 font-serif font-bold tracking-widest text-xs uppercase">Choose Your Alignment</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-widest">THE THREE REALM PORTALS</h2>
          <div className="h-0.5 w-16 bg-amber-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Greek Portal Card */}
          <div 
            onMouseEnter={() => {
              setActivePortal('greek');
              audioEngine.playHover();
            }}
            onMouseLeave={() => setActivePortal(null)}
            className="group relative rounded-2xl overflow-hidden border border-purple-500/20 bg-purple-950/5 p-8 flex flex-col h-[420px] justify-between transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
          >
            <div className="space-y-4">
              <div className="text-purple-400 p-3 bg-purple-500/10 rounded-xl w-fit">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold tracking-wide group-hover:text-purple-400 transition-colors">OLYMPUS</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">Celestial storm clouds, marble columns, and lightning arrows. Scale Mount Olympus, confront the Gorgon Medusa, and obtain lightning attributes.</p>
            </div>
            
            {activePortal === 'greek' ? (
              <span className="text-xs font-serif font-black tracking-widest text-purple-400 uppercase animate-pulse">ENTER OLYMPUS →</span>
            ) : (
              <span className="text-xs font-serif font-bold text-neutral-500 uppercase">Sealed Portal</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Norse Portal Card */}
          <div 
            onMouseEnter={() => {
              setActivePortal('norse');
              audioEngine.playHover();
            }}
            onMouseLeave={() => setActivePortal(null)}
            className="group relative rounded-2xl overflow-hidden border border-blue-500/20 bg-blue-950/5 p-8 flex flex-col h-[420px] justify-between transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
            <div className="space-y-4">
              <div className="text-blue-400 p-3 bg-blue-500/10 rounded-xl w-fit">
                <Flame size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold tracking-wide group-hover:text-blue-400 transition-colors">ASGARD</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">Frozen peaks, runic energy, and Yggdrasil nodes. Cross the Bifröst bridge, explore giant-infested Jotunheim, and fight barrow draugrs.</p>
            </div>
            
            {activePortal === 'norse' ? (
              <span className="text-xs font-serif font-black tracking-widest text-blue-400 uppercase animate-pulse">ENTER ASGARD →</span>
            ) : (
              <span className="text-xs font-serif font-bold text-neutral-500 uppercase">Sealed Portal</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Egyptian Portal Card */}
          <div 
            onMouseEnter={() => {
              setActivePortal('egyptian');
              audioEngine.playHover();
            }}
            onMouseLeave={() => setActivePortal(null)}
            className="group relative rounded-2xl overflow-hidden border border-amber-500/20 bg-amber-950/5 p-8 flex flex-col h-[420px] justify-between transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
          >
            <div className="space-y-4">
              <div className="text-amber-400 p-3 bg-amber-500/10 rounded-xl w-fit">
                <Sun size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold tracking-wide group-hover:text-amber-400 transition-colors">DUAT</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">Sunset dunes, obsidian tombs, and solar barques. Navigate the night gates, weigh your heart against the Feather of Truth, and battle chaos.</p>
            </div>
            
            {activePortal === 'egyptian' ? (
              <span className="text-xs font-serif font-black tracking-widest text-amber-400 uppercase animate-pulse">ENTER DUAT →</span>
            ) : (
              <span className="text-xs font-serif font-bold text-neutral-500 uppercase">Sealed Portal</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

        </div>
      </section>

      {/* SECTION 3: WEAPONS SHOWCASE */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16 border-b border-neutral-900">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-amber-500 font-serif font-bold tracking-widest text-xs uppercase">Sacred Armoury</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold">LEGENDARY ARTIFACT SHOWCASE</h2>
          <div className="h-0.5 w-16 bg-amber-500 mx-auto" />
          <p className="text-xs text-neutral-450 mt-4 leading-relaxed">Unlock celestial relics and upgrade their attributes inside the blacksmith workshop.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weaponsShowcase.map((weap) => (
            <div 
              key={weap.name}
              className="p-5 rounded-xl border border-neutral-850 bg-neutral-950/60 flex flex-col justify-between h-56 hover:border-amber-500/40 transition-colors relative overflow-hidden"
            >
              <div className="space-y-3">
                <span className="text-[9px] text-amber-500 font-serif font-bold uppercase tracking-wider block">{weap.type}</span>
                <h4 className="font-serif font-bold text-neutral-100 text-sm">{weap.name}</h4>
                <p className="text-[11px] text-neutral-450 leading-relaxed">{weap.desc}</p>
              </div>
              <div className="flex justify-between items-center text-xs font-serif pt-4 border-t border-neutral-900">
                <span className="text-neutral-500">Base Rating</span>
                <span className="text-amber-400 font-bold">⚔️ {weap.dmg}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CHARACTER PROGRESSION DETAILS */}
      <section className="py-24 bg-neutral-900/10 border-b border-neutral-900 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <span className="text-amber-500 font-serif font-bold tracking-widest text-xs uppercase">Heroic Ascension</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">BECOME A MYTHWALKER</h2>
            <div className="h-0.5 w-16 bg-amber-500" />
            <p className="text-xs text-neutral-400 leading-relaxed">
              Earn experience by completing campaign missions and testing your knowledge. Unlock attribute tokens to boost statistics and navigate the cosmos tree.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs">
              <div className="p-4 bg-neutral-950/60 border border-neutral-850 rounded-xl space-y-1">
                <span className="text-amber-500 font-serif font-bold uppercase tracking-wider block">⚔️ Combat Stats</span>
                <span className="text-neutral-450">Strength, Agility, and Endurance scaling base weapon damages.</span>
              </div>
              <div className="p-4 bg-neutral-950/60 border border-neutral-850 rounded-xl space-y-1">
                <span className="text-amber-500 font-serif font-bold uppercase tracking-wider block">🔮 Wisdom & Insight</span>
                <span className="text-neutral-450">Extends timers and highlights incorrect responses in the Arena.</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/40 border border-rpg-gold rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center gap-4 border-b border-neutral-800 pb-4">
              <div className="w-12 h-12 rounded-lg bg-neutral-950 border border-amber-500/20 flex items-center justify-center font-serif text-lg font-bold text-amber-500">M</div>
              <div>
                <h4 className="font-serif font-bold text-neutral-100">Heroic Mythwalker</h4>
                <span className="text-[10px] text-amber-500 uppercase tracking-widest font-semibold">Scholar of Delphi</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs text-neutral-350">
              <div className="flex justify-between border-b border-neutral-850 pb-2"><span>Level</span><span className="text-amber-500 font-bold">12</span></div>
              <div className="flex justify-between border-b border-neutral-850 pb-2"><span>XP Progress</span><span>1,450 / 2,100</span></div>
              <div className="flex justify-between border-b border-neutral-850 pb-2"><span>Greek Reputation</span><span className="text-purple-400">Disciple</span></div>
              <div className="flex justify-between border-b border-neutral-850 pb-2"><span>Unlocks</span><span className="text-amber-400">14 Codex Entries</span></div>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CALL PORTAL */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] -z-10" />
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-7xl font-serif font-black tracking-wider text-glow-gold">THE PORTALS ARE ACTIVE</h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Step through the Ley-line Gate, choose your starting alignment, and awaken the legends of old.
          </p>
          <Link 
            href="/enter"
            onClick={() => audioEngine.playClick()}
            className="inline-block px-12 py-5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-black tracking-widest text-sm rounded-lg shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-transform hover:scale-105"
          >
            BEGIN YOUR JOURNEY
          </Link>
        </div>
      </section>

      <footer className="py-12 border-t border-neutral-900 text-center text-[10px] text-neutral-550 uppercase tracking-widest">
        © 2026 MythVerse. All rights reserved. museum-grade web portfolio.
      </footer>
    </div>
  );
}
