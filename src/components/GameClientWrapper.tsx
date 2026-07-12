'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useGameStore, getXpForNextLevel } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { 
  Compass, 
  Map, 
  BookOpen, 
  ShieldAlert, 
  User, 
  Hammer, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  X, 
  Sparkles, 
  Send,
  Loader,
  Trophy,
  HelpCircle,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import CharacterUnlockOverlay from './CharacterUnlockOverlay';
import LevelUpOverlay from './LevelUpOverlay';
import { characters } from '@/data/seed/characters';
import { Settings } from 'lucide-react';

export default function GameClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const state = useGameStore();

  const [soundOn, setSoundOn] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Local Chat Companion State
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Greetings, Mythwalker. I am your Gemini Lore Companion. Ask me any question about the legends, gods, weapons, or campaigns.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  // Auto trigger ambient sound based on path
  useEffect(() => {
    if (!soundOn) {
      audioEngine.stopAmbient();
      return;
    }
    if (pathname.includes('/greek')) {
      audioEngine.startAmbient('temple');
    } else if (pathname.includes('/norse')) {
      audioEngine.startAmbient('fjords');
    } else if (pathname.includes('/egyptian')) {
      audioEngine.startAmbient('desert');
    } else {
      audioEngine.stopAmbient();
    }
  }, [pathname, soundOn]);

  const toggleSound = () => {
    if (soundOn) {
      audioEngine.stopAmbient();
      state.updateSoundSettings({ musicMuted: true, sfxMuted: true });
      setSoundOn(false);
    } else {
      setSoundOn(true);
      state.updateSoundSettings({ musicMuted: false, sfxMuted: false });
      audioEngine.playClick();
      // start correct ambient track
      if (pathname.includes('/greek')) audioEngine.startAmbient('temple');
      else if (pathname.includes('/norse')) audioEngine.startAmbient('fjords');
      else if (pathname.includes('/egyptian')) audioEngine.startAmbient('desert');
    }
  };

  // Run AI chat prompt via route API
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loadingAi) return;

    audioEngine.playClick();
    const text = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoadingAi(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          history: messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }))
        })
      });

      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
        audioEngine.playCodexDiscovery();
      } else {
        setMessages(prev => [...prev, { role: 'model', text: 'Forgive me, the cosmic connection failed. Let us try again.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'The realms are unstable. AI connection lost.' }]);
    } finally {
      setLoadingAi(false);
    }
  };

  const menuGroups = [
    {
      title: 'PLAY',
      links: [
        { name: 'Nexus Hub', path: '/hub', icon: Compass },
        { name: 'World Map', path: `/map/${pathname.includes('/greek') ? 'greek' : pathname.includes('/norse') ? 'norse' : pathname.includes('/egyptian') ? 'egyptian' : 'greek'}`, icon: Map },
        { name: 'Campaign', path: `/campaign/${pathname.includes('/greek') ? 'greek' : pathname.includes('/norse') ? 'norse' : pathname.includes('/egyptian') ? 'egyptian' : 'greek'}`, icon: ShieldAlert },
        { name: 'Active Quests', path: '/quests', icon: BookOpen }
      ]
    },
    {
      title: 'MYTHWALKER',
      links: [
        { name: 'Character Profile', path: '/character', icon: User },
        { name: 'Sacred Constellations', path: '/skills', icon: Sparkles },
        { name: 'Armoury', path: '/inventory', icon: ShieldAlert },
        { name: 'Blacksmith Forge', path: '/forge', icon: Hammer }
      ]
    },
    {
      title: 'ARCHIVES',
      links: [
        { name: 'Deities & Companions', path: '/characters', icon: User },
        { name: 'Codex Archive', path: '/codex', icon: BookOpen },
        { name: 'Quiz Arena', path: '/quiz-arena', icon: HelpCircle },
        { name: 'Hall of Legends', path: '/achievements', icon: Trophy }
      ]
    },
    {
      title: 'SYSTEM',
      links: [
        { name: 'Game Guide', path: '/guide', icon: HelpCircle },
        { name: 'Lore Companion', path: '/lore-companion', icon: Sparkles },
        { name: 'Settings', path: '/settings', icon: Settings }
      ]
    }
  ];

  // Disable UI wrapper on landing page
  const isLanding = pathname === '/' || pathname === '/enter' || pathname === '/onboarding';

  if (isLanding) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 overflow-x-hidden selection:bg-amber-500/30">
        {children}
      </div>
    );
  }

  // If user is not onboarded, redirect to onboarding (client safeguard)
  const isHydrated = state.username !== '';
  if (!isHydrated && pathname !== '/onboarding' && pathname !== '/enter' && pathname !== '/') {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-amber-500 font-serif">
        <Loader className="animate-spin mb-4" size={40} />
        <span className="text-xl animate-pulse tracking-widest uppercase">Connecting to Yggdrasil...</span>
      </div>
    );
  }

  // Find active companion details
  const activeCompanion = state.activeCompanionId 
    ? characters.find(c => c.id === state.activeCompanionId) 
    : null;

  // Active quest display
  const activeQuest = state.activeQuests[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col overflow-x-hidden selection:bg-amber-500/30 relative">
      
      {/* BACKGROUND PARTICLES EFFECT */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(180,130,50,0.06),transparent_60%)] bg-no-repeat bg-cover -z-10" />

      {/* TOP HUD HEADER */}
      <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-lg">
        
        {/* LEFT EMBLEM & HAMBURGER */}
        <div className="flex items-center gap-4">
          <button 
            className="p-1.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-amber-500 hover:border-amber-500/30 transition-all cursor-pointer" 
            onClick={() => {
              setMenuOpen(!menuOpen);
              audioEngine.playClick();
            }}
          >
            <Menu size={20} />
          </button>
          <Link href="/hub" className="font-serif text-lg md:text-xl tracking-widest text-amber-500 hover:text-amber-400 flex items-center gap-2 font-black">
            <span>MYTHVERSE</span>
          </Link>
        </div>

        {/* MIDDLE CHARACTER STATUS (TOP RPG HUD) */}
        <div className="hidden lg:flex items-center gap-6 bg-neutral-900/40 border border-neutral-850 rounded-full px-5 py-1.5 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-serif font-black">LV.{state.level}</span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-200 font-bold uppercase tracking-wider">{state.username}</span>
            <span className="text-neutral-500 font-serif">({state.title})</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest">XP</span>
            <div className="w-24 bg-neutral-800 rounded-full h-2 overflow-hidden border border-neutral-850">
              <div 
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-full transition-all duration-300"
                style={{ width: `${(state.xp / getXpForNextLevel(state.level)) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-bold flex items-center gap-1 font-serif">🪙 {state.coins}</span>
            <span className="text-purple-400 font-bold flex items-center gap-1 font-serif">✨ {state.divineEssence}</span>
          </div>
        </div>

        {/* COMPANION & ACTIVE QUEST HUD AREA */}
        <div className="flex items-center gap-4">
          
          {/* Active Companion Status */}
          {activeCompanion ? (
            <Link href="/characters" className="flex items-center gap-2 bg-amber-500/5 border border-amber-500/25 px-2.5 py-1 rounded-lg hover:bg-amber-500/10 transition-colors">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-500/40 bg-neutral-950 shrink-0">
                <img 
                  src={activeCompanion.visualAssets.portrait} 
                  alt={activeCompanion.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[10px] hidden sm:block">
                <span className="text-[8px] text-neutral-500 uppercase tracking-wider block font-semibold">Active Companion</span>
                <span className="text-amber-400 font-serif font-bold">{activeCompanion.name}</span>
              </div>
            </Link>
          ) : (
            <Link href="/characters" className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-800 px-2.5 py-1 rounded-lg hover:border-amber-500/20 transition-all text-neutral-500 hover:text-amber-500">
              <div className="w-6 h-6 rounded-full border border-neutral-800 flex items-center justify-center bg-neutral-950 text-[10px] font-black shrink-0">
                ?
              </div>
              <span className="text-[10px] uppercase tracking-wider hidden sm:inline font-semibold">Select Companion</span>
            </Link>
          )}

          {/* Active Quest short HUD */}
          {activeQuest && (
            <div className="hidden xl:flex flex-col text-[10px] border-l border-neutral-800 pl-4 max-w-[150px]">
              <span className="text-[8px] text-neutral-500 uppercase tracking-wider block font-semibold">Active Quest</span>
              <span className="text-neutral-300 truncate font-serif font-semibold">{activeQuest.title}</span>
            </div>
          )}

          {/* AUDIO & CHAT CONTROLS */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleSound}
              className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer ${soundOn ? 'border-amber-500/50 bg-amber-500/10 text-amber-400' : 'border-neutral-850 text-neutral-500 hover:border-neutral-800'}`}
              title="Toggle Ambient Audio"
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button 
              onClick={() => {
                setChatOpen(true);
                audioEngine.playClick();
              }}
              className="p-2 rounded-lg border border-neutral-850 text-neutral-300 hover:border-amber-500/30 hover:text-amber-400 transition-all cursor-pointer"
              title="AI Lore Companion"
            >
              <MessageSquare size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* FULL SCREEN GAME OVERLAY MENU */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-start animate-fade-in"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-neutral-950 border-r border-neutral-850 p-6 flex flex-col h-full overflow-y-auto shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Header / Dismiss */}
            <div className="flex justify-between items-center pb-6 border-b border-neutral-850 mb-6">
              <span className="font-serif text-xl tracking-[0.2em] text-amber-500 font-black">MYTHIC PORTAL</span>
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  audioEngine.playClick();
                }}
                className="p-1 rounded bg-neutral-900 border border-neutral-850 text-neutral-400 hover:text-neutral-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* User card in menu */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-850 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-neutral-950 border border-amber-500/30 flex items-center justify-center font-serif text-lg font-bold text-amber-500 shadow-md">
                {state.level}
              </div>
              <div>
                <div className="font-serif font-black text-sm text-neutral-200 uppercase tracking-wide">{state.username}</div>
                <div className="text-[10px] text-neutral-500 font-serif font-bold uppercase tracking-wider">{state.title}</div>
              </div>
            </div>

            {/* Menu groups links */}
            <div className="space-y-6 flex-1">
              {menuGroups.map((group) => (
                <div key={group.title} className="space-y-2">
                  <h4 className="text-[10px] font-serif font-bold tracking-[0.25em] text-neutral-500 uppercase">{group.title}</h4>
                  <div className="space-y-1">
                    {group.links.map((link) => {
                      const active = pathname === link.path || pathname.startsWith(link.path + '/');
                      return (
                        <Link
                          key={link.path}
                          href={link.path}
                          onClick={() => {
                            setMenuOpen(false);
                            audioEngine.playClick();
                          }}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                            active
                              ? 'bg-amber-500/10 border-l-2 border-amber-500 text-amber-400 font-bold'
                              : 'text-neutral-400 hover:bg-neutral-900/60 hover:text-neutral-100'
                          }`}
                        >
                          <link.icon size={14} className="shrink-0" />
                          <span>{link.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="mt-8 pt-4 border-t border-neutral-900 text-center text-[9px] text-neutral-600 uppercase tracking-widest">
              MythVerse RPG • Version 1.0.0
            </div>
          </div>
        </div>
      )}

      {/* MAIN GAME CONTENT */}
      <div className="flex-1 flex flex-col relative">
        <main className="flex-1 p-4 md:p-8 min-w-0 max-w-full overflow-y-auto">
          {children}
        </main>
      </div>

      {/* SLIDE-OVER AI LORE COMPANION PANEL */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end" onClick={() => setChatOpen(false)}>
          <div 
            className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 flex flex-col h-full shadow-2xl relative" 
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/40">
              <div className="flex items-center gap-2">
                <Sparkles className="text-amber-500" size={20} />
                <span className="font-serif tracking-wider text-amber-500 font-semibold text-lg">LORE COMPANION</span>
              </div>
              <button 
                onClick={() => {
                  setChatOpen(false);
                  audioEngine.playClick();
                }}
                className="text-neutral-400 hover:text-neutral-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, index) => (
                <div key={index} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-amber-500/10 border border-amber-500/20 text-neutral-100'
                      : 'bg-neutral-950/60 border border-neutral-800 text-neutral-300'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loadingAi && (
                <div className="flex justify-start">
                  <div className="bg-neutral-950/60 border border-neutral-800 rounded-2xl px-4 py-3 flex items-center gap-2.5 text-sm text-neutral-400">
                    <Loader className="animate-spin text-amber-500" size={16} />
                    <span>Retrieving cosmic legends...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-800 bg-neutral-950/30 flex gap-2">
              <input
                type="text"
                placeholder="Ask about gods, myths, or weapons..."
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500/50 text-neutral-100 placeholder-neutral-500"
              />
              <button
                type="submit"
                disabled={loadingAi || !inputMessage.trim()}
                className="p-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-semibold rounded-lg transition-colors flex items-center justify-center shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
      <CharacterUnlockOverlay />
      <LevelUpOverlay />
    </div>
  );
}
