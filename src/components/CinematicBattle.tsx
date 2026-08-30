'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { ApiClient } from '@/lib/api/client';
import { Swords, Shield, Zap } from 'lucide-react';
import PlayerCharacter from './PlayerCharacter';

interface CinematicBattleProps {
  creature: {
    id: string;
    name: string;
    level: number;
    pantheon: 'greek' | 'norse' | 'egyptian';
    description: string;
    rarity: string;
  };
  onBattleEnd: (outcome: 'victory' | 'defeat') => void;
}

export default function CinematicBattle({ creature, onBattleEnd }: CinematicBattleProps) {
  const state = useGameStore();

  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(creature.level * 40 + 60);
  const maxEnemyHp = creature.level * 40 + 60;

  const [battleLogs, setBattleLogs] = useState<string[]>([
    `Encountered ${creature.name} in the arena! Prepare for combat.`
  ]);

  const [isAttacking, setIsAttacking] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [damagePopup, setDamagePopup] = useState<string | null>(null);
  const [combatOutcome, setCombatOutcome] = useState<'victory' | 'defeat' | null>(null);
  const [rewards, setRewards] = useState<{ xp: number; coins: number } | null>(null);

  const triggerScreenShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 500);
  };

  const handleAction = async (actionType: 'attack' | 'defend' | 'exploit_weakness') => {
    if (combatOutcome) return;

    audioEngine.playBattleImpact();
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 400);

    try {
      // Execute backend FastAPI combat turn action endpoint
      const res = await ApiClient.fetchApi<{
        playerDamage: number;
        enemyDamage: number;
        battleLog: string[];
      }>('/combat/action', {
        method: 'POST',
        body: JSON.stringify({
          battleId: `b_${Date.now()}`,
          creatureId: creature.id,
          actionType: actionType
        })
      });

      const pDmg = res.playerDamage;
      const eDmg = res.enemyDamage;

      triggerScreenShake();
      setDamagePopup(`-${pDmg} HP`);
      setTimeout(() => setDamagePopup(null), 1200);

      const nextEnemyHp = Math.max(0, enemyHp - pDmg);
      const nextPlayerHp = Math.max(0, playerHp - eDmg);

      setEnemyHp(nextEnemyHp);
      setPlayerHp(nextPlayerHp);
      setBattleLogs(prev => [...prev, ...res.battleLog]);

      if (nextEnemyHp <= 0) {
        handleVictory();
      } else if (nextPlayerHp <= 0) {
        handleDefeat();
      }
    } catch {
      // Local fallback calculation if backend unreachable
      const pDmg = actionType === 'exploit_weakness' ? 45 : 30;
      const eDmg = actionType === 'defend' ? 5 : 15;

      triggerScreenShake();
      setDamagePopup(`-${pDmg} HP`);
      setTimeout(() => setDamagePopup(null), 1200);

      const nextEnemyHp = Math.max(0, enemyHp - pDmg);
      const nextPlayerHp = Math.max(0, playerHp - eDmg);

      setEnemyHp(nextEnemyHp);
      setPlayerHp(nextPlayerHp);
      setBattleLogs(prev => [...prev, `Struck ${creature.name} for ${pDmg} damage! Countered for ${eDmg} damage.`]);

      if (nextEnemyHp <= 0) handleVictory();
      else if (nextPlayerHp <= 0) handleDefeat();
    }
  };

  const handleVictory = () => {
    audioEngine.playLevelUp();
    setCombatOutcome('victory');
    const xpGain = creature.level * 30 + 50;
    const coinsGain = creature.level * 15 + 25;

    setRewards({ xp: xpGain, coins: coinsGain });
    state.addXp(xpGain);
    state.addCoins(coinsGain);
    state.unlockCodexEntry(creature.id);
    state.unlockAchievement('ach_first_blood');
  };

  const handleDefeat = () => {
    audioEngine.playBattleImpact();
    setCombatOutcome('defeat');
  };

  return (
    <div className={`relative w-full min-h-[550px] bg-neutral-950 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl p-6 font-sans my-4 ${screenShake ? 'animate-bounce' : ''}`}>
      
      {/* ARENA BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(38,26,15,0.4),transparent_80%)] pointer-events-none -z-10" />

      {/* COMBAT HEADER / HEALTH BARS */}
      <div className="grid grid-cols-2 gap-6 border-b border-neutral-850 pb-4">
        {/* PLAYER STATS */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-serif font-bold text-neutral-200">
            <span>MYTHWALKER (LVL {state.level})</span>
            <span className="text-emerald-400">{playerHp} / 100 HP</span>
          </div>
          <div className="w-full h-3 bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${playerHp}%` }} />
          </div>
        </div>

        {/* ENEMY STATS */}
        <div className="space-y-1 text-right">
          <div className="flex justify-between items-center text-xs font-serif font-bold text-neutral-200">
            <span className="text-red-400">{enemyHp} / {maxEnemyHp} HP</span>
            <span>{creature.name.toUpperCase()} (LVL {creature.level})</span>
          </div>
          <div className="w-full h-3 bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${(enemyHp / maxEnemyHp) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* 2D ARENA BATTLE CANVAS */}
      <div className="relative w-full h-[280px] flex items-center justify-between px-12 my-4">
        
        {/* PLAYER SPRITE */}
        <motion.div 
          animate={isAttacking ? { x: [0, 80, 0] } : { y: [0, -4, 0] }}
          transition={isAttacking ? { duration: 0.3 } : { repeat: Infinity, duration: 2.5 }}
          className="relative"
        >
          <PlayerCharacter animatePose={true} size="lg" />
        </motion.div>

        {/* DAMAGE POPUP ANIMATION */}
        {damagePopup && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1.2 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-1/3 -translate-x-1/2 text-2xl font-serif font-black text-amber-400 text-glow-gold z-30"
          >
            {damagePopup}
          </motion.div>
        )}

        {/* ENEMY SPRITE */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-36 h-48 bg-neutral-900 border-2 border-red-500/40 rounded-xl flex flex-col items-center justify-center p-4 text-center shadow-[0_0_25px_rgba(239,68,68,0.2)]"
        >
          <Swords className="text-red-400 mb-2" size={40} />
          <span className="font-serif font-bold text-xs text-neutral-200 line-clamp-2">{creature.name}</span>
          <span className="text-[9px] uppercase tracking-widest text-red-400 mt-1">{creature.rarity}</span>
        </motion.div>
      </div>

      {/* COMBAT ACTIONS & LOG RAIL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* ACTION BUTTONS */}
        <div className="md:col-span-2 grid grid-cols-3 gap-3">
          <button
            onClick={() => handleAction('attack')}
            disabled={!!combatOutcome}
            className="p-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-neutral-950 font-serif font-black tracking-widest text-xs rounded-lg transition-transform hover:scale-105 uppercase flex items-center justify-center gap-1.5"
          >
            <Swords size={16} />
            ATTACK STRIKE
          </button>

          <button
            onClick={() => handleAction('defend')}
            disabled={!!combatOutcome}
            className="p-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-750 disabled:opacity-50 text-neutral-200 font-serif font-bold text-xs rounded-lg transition-colors uppercase flex items-center justify-center gap-1.5"
          >
            <Shield size={16} className="text-blue-400" />
            DEFEND STANCE
          </button>

          <button
            onClick={() => handleAction('exploit_weakness')}
            disabled={!!combatOutcome}
            className="p-3 bg-neutral-900 hover:bg-neutral-850 border border-amber-500/40 disabled:opacity-50 text-amber-400 font-serif font-bold text-xs rounded-lg transition-colors uppercase flex items-center justify-center gap-1.5"
          >
            <Zap size={16} />
            EXPLOIT WEAKNESS
          </button>
        </div>

        {/* BATTLE LOG */}
        <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-lg h-24 overflow-y-auto text-[11px] text-neutral-400 font-mono space-y-1">
          {battleLogs.map((log, i) => (
            <div key={i}>&gt; {log}</div>
          ))}
        </div>
      </div>

      {/* VICTORY / DEFEAT OVERLAY */}
      {combatOutcome && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-6 z-40">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <h3 className={`text-4xl sm:text-5xl font-serif font-black tracking-widest uppercase ${combatOutcome === 'victory' ? 'text-amber-400 text-glow-gold' : 'text-red-500'}`}>
              {combatOutcome === 'victory' ? '⚔️ VICTORY ACHIEVED!' : '💀 DEFEATED IN COMBAT'}
            </h3>
          </motion.div>

          {rewards && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-xl space-y-2 text-xs font-serif text-amber-300">
              <div>+{rewards.xp} PLAYER XP EARNED</div>
              <div>+{rewards.coins} GOLD COINS ACQUIRED</div>
              <div>CODEX ENTRY UNLOCKED FOR {creature.name.toUpperCase()}</div>
            </div>
          )}

          <button
            onClick={() => {
              audioEngine.playClick();
              onBattleEnd(combatOutcome);
            }}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-black tracking-widest text-xs rounded-lg uppercase transition-transform hover:scale-105"
          >
            RETURN TO REALM EXPLORATION
          </button>
        </div>
      )}
    </div>
  );
}
