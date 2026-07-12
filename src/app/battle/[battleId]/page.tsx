'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { mythologyDb } from '../../../data/seed';
import { audioEngine } from '../../../utils/audioEngine';
import { Swords, Heart, Shield, Zap, RefreshCw, Award, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BattleScreen() {
  const router = useRouter();
  const state = useGameStore();
  const battle = state.battleState;

  const [activeQuestion, setActiveQuestion] = useState<any | null>(null);
  const [combatOutcome, setCombatOutcome] = useState<'victory' | 'defeat' | null>(null);
  const [lootDrops, setLootDrops] = useState<{ [key: string]: number }>({});
  const [xpGained, setXpGained] = useState(0);

  // Safeguard: Redirect if not in battle
  useEffect(() => {
    if (!battle.inBattle) {
      router.push('/hub');
    }
  }, [battle.inBattle]);

  if (!battle.inBattle || !battle.creatureId) {
    return null;
  }

  // Look up opponent stats
  const creature = mythologyDb.creatures.find(c => c.id === battle.creatureId)!;
  const playerWeapon = mythologyDb.weapons.find(w => w.id === state.equippedWeaponId);

  const writeLog = (text: string) => {
    state.updateBattle(prev => ({
      battleLog: [...prev.battleLog, text]
    }));
  };

  const checkCombatEnd = (pHealth: number, eHealth: number) => {
    if (eHealth <= 0) {
      handleVictory();
      return true;
    }
    if (pHealth <= 0) {
      handleDefeat();
      return true;
    }
    return false;
  };

  const handleVictory = () => {
    audioEngine.playLevelUp();
    setCombatOutcome('victory');

    // Calculate dynamic rewards
    const xp = creature.level * 25 + 20;
    const coins = creature.level * 10 + 15;
    setXpGained(xp);

    // Loot drops
    const drops: { [key: string]: number } = {};
    creature.lootTable.forEach(mat => {
      // 60% chance to drop each item
      if (Math.random() < 0.6) {
        drops[mat] = 1;
        state.addMaterial(mat, 1);
      }
    });
    
    // Add rewards to player profile
    state.addXp(xp);
    state.addCoins(coins);
    state.adjustReputation(creature.pantheon, 10);
    state.unlockCodexEntry(creature.id);

    // Custom Greek Vertical Slice Trigger
    if (battle.battleId?.includes('gk_node4') || creature.id === 'desert_serpent') {
      state.unlockCharacter('char_athena');
      const weaponTemplate = mythologyDb.weapons.find(w => w.id === 'bronze_spear');
      if (weaponTemplate) {
        state.acquireWeapon(weaponTemplate);
      }
      // Set campaign node complete
      state.completeCampaignNode('greek', 'greek_ch1', 'gk_node4');
    }

    // Check achievement triggers
    state.unlockAchievement('ach_first_blood');
    if (creature.rarity === 'Boss') {
      if (creature.id === 'typhon') state.unlockAchievement('ach_titan_slayer');
      if (creature.id === 'surtr') state.unlockAchievement('ach_ragnarok_survivor');
      if (creature.id === 'apophis_serpent') state.unlockAchievement('ach_bane_of_chaos');
    }

    setLootDrops(drops);
  };

  const handleDefeat = () => {
    audioEngine.playBattleImpact();
    setCombatOutcome('defeat');
    state.addCoins(-Math.floor(state.coins * 0.05)); // 5% gold loss penalty
  };

  const concludeBattle = () => {
    audioEngine.playClick();
    state.endBattle();
    
    if (combatOutcome === 'defeat') {
      // Resurrect with 25% health in hub
      useGameStore.setState({
        attributes: { ...state.attributes }
      });
      router.push('/hub');
    } else {
      router.push('/hub');
    }
  };

  // --- ACTIONS ---

  const handleStrike = () => {
    if (battle.turn !== 'player' || combatOutcome) return;
    audioEngine.playEquip(); // sword clash sfx

    const weaponDmg = playerWeapon ? playerWeapon.baseDamage : 10;
    const playerStrength = state.attributes.strength;
    const damage = Math.floor(weaponDmg * (1 + playerStrength / 50));
    
    const nextEnemyHp = Math.max(0, battle.enemyHp - damage);
    writeLog(`⚔ You slice ${creature.name} using ${playerWeapon?.name || 'Fists'}, dealing ${damage} physical damage!`);
    
    state.updateBattle(prev => ({ enemyHp: nextEnemyHp, turn: 'enemy' }));
    
    if (!checkCombatEnd(battle.playerHp, nextEnemyHp)) {
      setTimeout(enemyRound, 1200);
    }
  };

  const handleDivineAbility = () => {
    if (battle.turn !== 'player' || combatOutcome || battle.playerSpirit < 30) return;
    audioEngine.playForge();

    const spiritStat = state.attributes.spirit;
    const damage = Math.floor(60 * (1 + spiritStat / 40));
    const nextEnemyHp = Math.max(0, battle.enemyHp - damage);
    
    writeLog(`⚡ You cast Divine Spark, burning ${creature.name} for ${damage} celestial magic damage!`);
    
    state.updateBattle(prev => ({ 
      enemyHp: nextEnemyHp, 
      playerSpirit: prev.playerSpirit - 30, 
      turn: 'enemy' 
    }));

    if (!checkCombatEnd(battle.playerHp, nextEnemyHp)) {
      setTimeout(enemyRound, 1200);
    }
  };

  const triggerExploitWeakness = () => {
    if (battle.turn !== 'player' || combatOutcome) return;
    audioEngine.playClick();

    // Pull quiz questions matching this pantheon
    const list = mythologyDb.quizQuestions.filter(q => q.pantheon === creature.pantheon);
    const randomQuestion = list[Math.floor(Math.random() * list.length)];
    setActiveQuestion(randomQuestion);
  };

  const handleAnswerSubmit = (option: string) => {
    if (!activeQuestion) return;
    audioEngine.playClick();

    const correct = option === activeQuestion.answer;
    setActiveQuestion(null);

    if (correct) {
      // Deal heavy critical damage & stun enemy
      audioEngine.playLevelUp();
      const weaponDmg = playerWeapon ? playerWeapon.baseDamage : 10;
      const wisdomBonus = state.attributes.wisdom;
      const damage = Math.floor(weaponDmg * 1.6 * (1 + wisdomBonus / 40));
      const nextEnemyHp = Math.max(0, battle.enemyHp - damage);

      writeLog(`🎯 Correct Lore Weakness! You deal a crushing ${damage} critical damage! ${creature.name} is stunned!`);
      
      state.updateBattle(prev => ({ 
        enemyHp: nextEnemyHp,
        playerSpirit: Math.min(prev.playerMaxSpirit, prev.playerSpirit + 20)
      }));

      checkCombatEnd(battle.playerHp, nextEnemyHp);

    } else {
      // Failed challenge: missed strike, trigger enemy counters
      audioEngine.playBattleImpact();
      writeLog(`❌ Incorrect Lore! Your strike misses and exposes your flank to ${creature.name}!`);
      
      state.updateBattle(prev => ({ turn: 'enemy' }));
      setTimeout(enemyRound, 1200);
    }
  };

  const enemyRound = () => {
    if (combatOutcome) return;
    audioEngine.playBattleImpact();

    // Calculate enemy damage
    const baseEnemyDmg = creature.level * 8 + 10;
    const playerDef = Object.values(state.equippedArmorIds).reduce((acc, id) => {
      if (!id) return acc;
      const item = state.armor.find(a => a.id === id);
      return acc + (item ? item.defense : 0);
    }, 0);

    const damage = Math.max(5, Math.floor(baseEnemyDmg - playerDef * 0.15));
    const nextPlayerHp = Math.max(0, battle.playerHp - damage);

    const randomAbility = creature.abilities[Math.floor(Math.random() * creature.abilities.length)];
    writeLog(`👹 ${creature.name} casts ${randomAbility}, dealing ${damage} damage to you!`);

    state.updateBattle(prev => ({ playerHp: nextPlayerHp, turn: 'player' }));
    checkCombatEnd(nextPlayerHp, battle.enemyHp);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      
      {/* Visual Arena representation */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-neutral-900/20 border border-neutral-800 rounded-2xl p-6 sm:p-8 min-h-[220px]">
        
        {/* Player column */}
        <div className="space-y-4 text-center md:text-left bg-neutral-950/60 p-5 rounded-xl border border-neutral-850">
          <div className="space-y-1">
            <span className="text-[10px] text-amber-500 font-serif font-bold uppercase tracking-wider block">Player Walker</span>
            <h3 className="font-serif font-bold text-neutral-100 text-lg uppercase">{state.username}</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400 flex items-center gap-1"><Heart size={12} className="text-red-500 fill-red-500" /> HP</span>
              <span className="font-semibold text-neutral-200">{battle.playerHp} / {battle.playerMaxHp}</span>
            </div>
            <div className="w-full bg-neutral-850 h-2.5 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${(battle.playerHp / battle.playerMaxHp) * 100}%` }} />
            </div>

            <div className="flex justify-between items-center text-xs pt-1.5">
              <span className="text-neutral-400 flex items-center gap-1"><Zap size={12} className="text-purple-400 fill-purple-400" /> SPIRIT</span>
              <span className="font-semibold text-neutral-200">{battle.playerSpirit} / {battle.playerMaxSpirit}</span>
            </div>
            <div className="w-full bg-neutral-850 h-2.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full transition-all duration-300" style={{ width: `${(battle.playerSpirit / battle.playerMaxSpirit) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Creature column */}
        <div className="space-y-4 text-center md:text-right bg-neutral-950/60 p-5 rounded-xl border border-neutral-850">
          <div className="space-y-1">
            <span className="text-[10px] text-amber-500 font-serif font-bold uppercase tracking-wider block">
              Opponent: {creature.rarity} (Lvl {creature.level})
            </span>
            <h3 className="font-serif font-bold text-neutral-100 text-lg uppercase">{creature.name}</h3>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400 flex items-center gap-1 md:order-last"><Heart size={12} className="text-red-500 fill-red-500" /> HP</span>
              <span className="font-semibold text-neutral-200">{battle.enemyHp} / {battle.enemyMaxHp}</span>
            </div>
            <div className="w-full bg-neutral-850 h-2.5 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full transition-all duration-300 md:ml-auto" style={{ width: `${(battle.enemyHp / battle.enemyMaxHp) * 100}%` }} />
            </div>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-serif">Weakness: {creature.weakness}</span>
          </div>
        </div>

      </section>

      {/* COMBAT OPTIONS COMMAND PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LOG PANEL (Left 2 cols) */}
        <section className="md:col-span-2 space-y-4">
          <h2 className="text-sm font-serif font-bold tracking-widest text-neutral-400 uppercase">BATTLE LOG</h2>
          <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 h-[240px] overflow-y-auto space-y-2 text-xs font-mono">
            {battle.battleLog.map((log, i) => (
              <div key={i} className={`pb-1.5 border-b border-neutral-900/60 ${
                log.includes('⚔') ? 'text-amber-300' : log.includes('❌') ? 'text-red-400' : log.includes('🎯') ? 'text-green-400' : 'text-neutral-400'
              }`}>
                {log}
              </div>
            ))}
          </div>
        </section>

        {/* CONTROLS COMMANDS CARD */}
        <section className="space-y-4">
          <h2 className="text-sm font-serif font-bold tracking-widest text-neutral-400 uppercase">COMMAND CONSOLE</h2>
          <div className="bg-neutral-900/20 border border-neutral-850 rounded-xl p-5 space-y-3 flex flex-col justify-center h-[240px]">
            {combatOutcome ? (
              <div className="text-center space-y-4">
                <span className="text-xs uppercase tracking-widest text-neutral-500 block font-serif">Combat Concluded</span>
                <h4 className={`text-2xl font-serif font-black tracking-wide ${combatOutcome === 'victory' ? 'text-green-400' : 'text-red-500'}`}>
                  {combatOutcome === 'victory' ? 'VICTORY' : 'DEFEAT'}
                </h4>
                <button
                  onClick={concludeBattle}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-serif font-bold tracking-widest text-xs uppercase rounded transition-colors"
                >
                  RETURN TO SANCTUARY
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center text-xs text-neutral-500 pb-1.5 border-b border-neutral-850">
                  <span>Turn Indicator</span>
                  <span className={`uppercase font-bold ${battle.turn === 'player' ? 'text-amber-500' : 'text-neutral-400'}`}>
                    {battle.turn === 'player' ? 'Your Turn' : 'Enemy Thinking...'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs font-serif font-bold">
                  <button
                    onClick={handleStrike}
                    disabled={battle.turn !== 'player'}
                    className="p-3 bg-neutral-950 border border-neutral-850 hover:border-amber-500/30 text-neutral-250 rounded transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5"
                  >
                    <Swords size={14} /> STRIKE
                  </button>
                  
                  <button
                    onClick={handleDivineAbility}
                    disabled={battle.turn !== 'player' || battle.playerSpirit < 30}
                    className="p-3 bg-neutral-950 border border-neutral-850 hover:border-amber-500/30 text-neutral-250 rounded transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5"
                  >
                    <Zap size={14} /> SPARK (-30)
                  </button>
                </div>

                <button
                  onClick={triggerExploitWeakness}
                  disabled={battle.turn !== 'player'}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-serif font-bold tracking-widest text-xs uppercase rounded transition-colors flex items-center justify-center gap-1.5"
                >
                  <HelpCircle size={14} /> EXPLOIT WEAKNESS
                </button>
              </>
            )}
          </div>
        </section>

      </div>

      {/* EXPLOIT WEAKNESS QUIZ PANEL POPUP */}
      {activeQuestion && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-amber-500 rounded-b" />
            
            <div className="space-y-2">
              <span className="text-[10px] text-amber-500 font-serif font-bold uppercase tracking-wider block">Lore Weakness Challenge</span>
              <h4 className="font-serif font-bold text-neutral-200 text-base leading-relaxed">{activeQuestion.question}</h4>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {activeQuestion.options.map((opt: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSubmit(opt)}
                  className="text-left p-3.5 bg-neutral-950 border border-neutral-850 hover:border-amber-500/50 hover:bg-neutral-900 rounded-lg text-xs text-neutral-250 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
            
            <div className="text-[10px] text-neutral-500 border-t border-neutral-850 pt-3">
              💡 Hint: {activeQuestion.hint}
            </div>
          </div>
        </div>
      )}

      {/* VICTORY LOOT SCREEN OVERLAY POPUP */}
      {combatOutcome === 'victory' && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 text-center shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-green-500 rounded-b" />
            
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-neutral-500 block font-serif">Combat Complete</span>
              <h3 className="text-3xl font-serif font-black text-green-400 tracking-wider">VICTORY</h3>
            </div>

            <p className="text-xs text-neutral-400">You have successfully slain the **{creature.name}** and reclaimed the land!</p>

            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-850 text-xs text-left space-y-2">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block border-b border-neutral-900 pb-1.5">LOOT COLLECTED</span>
              <div className="flex justify-between items-center text-amber-500 font-medium"><span>Gold Coins Earned</span><span>🪙 +{creature.level * 10 + 15}</span></div>
              <div className="flex justify-between items-center text-amber-500 font-medium border-b border-neutral-900 pb-1.5"><span>Experience Gained</span><span>+{xpGained} XP</span></div>
              
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block pt-1.5">MATERIALS DISCOVERED</span>
              {Object.entries(lootDrops).length === 0 ? (
                <span className="text-neutral-600 italic block">No raw materials dropped</span>
              ) : (
                Object.entries(lootDrops).map(([name, qty]) => (
                  <div key={name} className="flex justify-between items-center text-neutral-300">
                    <span className="capitalize">{name.replace('_', ' ')}</span>
                    <span className="font-semibold text-neutral-400">+{qty}</span>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={concludeBattle}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-neutral-100 font-serif font-bold tracking-widest text-xs uppercase rounded transition-colors"
            >
              COLLECT REWARDS & LEAVE
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
