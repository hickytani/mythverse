'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { Shield, Sparkles, User, Key, Globe } from 'lucide-react';
import Link from 'next/link';

export default function EnterUniverse() {
  const router = useRouter();
  const resetStore = useGameStore(state => state.resetStore);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGuestEntry = () => {
    audioEngine.playClick();
    resetStore(); // Reset state first
    router.push('/onboarding');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister && !username) return;
    if (!email || !password) return;

    audioEngine.playForge();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      resetStore();
      
      if (isRegister) {
        router.push('/onboarding');
      } else {
        const startOnboard = useGameStore.getState().onboardPlayer;
        startOnboard(username || email.split('@')[0], 'Scholar of Delphi', 'greek');
        router.push('/hub');
      }
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 relative overflow-hidden font-sans"
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(38, 26, 15, 0.1) 0%, transparent 80%)'
      }}
    >
      {/* Background patterns */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-neutral-900/60 animate-spin-slow -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-neutral-900/30 border border-rpg-gold backdrop-blur-lg rounded-xl p-8 space-y-6 shadow-2xl relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-amber-500 rounded-b" />

        <div className="text-center space-y-2">
          <Link href="/" className="font-serif text-3xl font-black tracking-[0.2em] text-neutral-100 hover:text-amber-400 transition-colors text-glow-gold">
            MYTHVERSE
          </Link>
          <p className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] font-serif">Gate of Entrance</p>
        </div>

        {/* AUTH SELECTOR */}
        <div className="grid grid-cols-2 border border-neutral-850 p-0.5 rounded bg-neutral-950 text-xs">
          <button 
            type="button"
            onClick={() => {
              setIsRegister(false);
              audioEngine.playClick();
            }}
            className={`py-2 rounded font-serif font-bold uppercase transition-colors ${!isRegister ? 'bg-neutral-850 text-amber-500' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            SIGN IN
          </button>
          <button 
            type="button"
            onClick={() => {
              setIsRegister(true);
              audioEngine.playClick();
            }}
            className={`py-2 rounded font-serif font-bold uppercase transition-colors ${isRegister ? 'bg-neutral-850 text-amber-500' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            REGISTER
          </button>
        </div>

        {/* AUTH FORM */}
        <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div className="space-y-1">
              <label className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider block">Mythwalker Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded px-10 py-3 focus:outline-none focus:border-amber-500/50 text-neutral-100 placeholder-neutral-600 font-serif"
                />
                <User className="absolute left-3 top-3 text-neutral-600" size={16} />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="walker@mythverse.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-850 rounded px-10 py-3 focus:outline-none focus:border-amber-500/50 text-neutral-100 placeholder-neutral-600 font-serif"
              />
              <Globe className="absolute left-3 top-3 text-neutral-600" size={16} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider block">Security Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-850 rounded px-10 py-3 focus:outline-none focus:border-amber-500/50 text-neutral-100 placeholder-neutral-600 font-serif"
              />
              <Key className="absolute left-3 top-3 text-neutral-600" size={16} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-950 border border-neutral-850 hover:border-amber-500/50 text-neutral-200 hover:text-amber-400 font-serif font-bold tracking-widest py-3 rounded transition-all uppercase text-[11px] mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse">AWAKENING REALM CORE...</span>
            ) : (
              <span>{isRegister ? 'CREATE ACCOUNT' : 'ENTER UNIVERSE'}</span>
            )}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-neutral-900"></div>
          <span className="flex-shrink mx-4 text-neutral-600 text-[10px] font-semibold tracking-widest uppercase font-serif">OR</span>
          <div className="flex-grow border-t border-neutral-900"></div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGuestEntry}
            className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-black tracking-widest py-3.5 rounded transition-transform hover:scale-[1.02] shadow-[0_0_15px_rgba(245,158,11,0.2)] text-[11px] flex items-center justify-center gap-2"
          >
            <Sparkles size={14} />
            <span>PLAY AS GUEST (INSTANT ACCESS)</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
