import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, Pantheon, Rarity, Weapon, Armor, Relic, Quest, CampaignChapter } from '../types/game';
import { mythologyDb } from '../data/seed';

export const getXpForNextLevel = (level: number) => {
  return Math.floor(100 * level * 1.15);
};

export interface GameStoreActions {
  resetStore: () => void;
  onboardPlayer: (username: string, origin: string, pantheon: Pantheon) => void;
  addXp: (amount: number) => { leveledUp: boolean; oldLevel: number; newLevel: number } | null;
  addCoins: (amount: number) => void;
  addOracleTokens: (amount: number) => void;
  addDivineEssence: (amount: number) => void;
  adjustReputation: (pantheon: Pantheon, amount: number) => void;
  unlockCodexEntry: (entityId: string, percentage?: number) => void;
  
  // Equipment/Inventory Actions
  acquireWeapon: (weapon: Omit<Weapon, 'upgradeLevel'>) => void;
  acquireArmor: (armorItem: Omit<Armor, 'upgradeLevel'>) => void;
  acquireRelic: (relic: Relic) => void;
  addMaterial: (name: string, quantity: number) => void;
  equipWeapon: (weaponId: string | null) => void;
  equipArmor: (armorId: string | null, slot: 'head' | 'chest' | 'arms' | 'legs') => void;
  equipRelic: (relicId: string, slotIndex: number) => void;
  unequipRelic: (slotIndex: number) => void;
  
  // Forge Upgrades
  upgradeWeapon: (weaponId: string) => boolean;
  upgradeArmor: (armorId: string) => boolean;
  
  // Quest Actions
  addQuestProgress: (questId: string, objectiveId: string, amount: number) => void;
  claimQuestRewards: (questId: string) => void;
  
  // Campaign Actions
  completeCampaignNode: (pantheon: Pantheon, chapterId: string, nodeId: string) => void;
  claimChapterRewards: (pantheon: Pantheon, chapterId: string) => void;

  // Progression & Settings
  recordQuizScore: (pantheon: Pantheon, difficulty: string, score: number, max: number) => void;
  unlockAchievement: (achievementId: string) => void;
  equipTitle: (titleName: string) => void;
  incrementStreak: () => void;

  // Active Battle State
  battleState: {
    inBattle: boolean;
    battleId: string | null;
    creatureId: string | null;
    playerHp: number;
    playerMaxHp: number;
    playerSpirit: number;
    playerMaxSpirit: number;
    enemyHp: number;
    enemyMaxHp: number;
    battleLog: string[];
    turn: 'player' | 'enemy';
  };
  startBattle: (battleId: string, creatureId: string, playerHp: number, playerMaxHp: number, enemyHp: number, enemyMaxHp: number) => void;
  updateBattle: (updater: (prev: GameStoreActions['battleState']) => Partial<GameStoreActions['battleState']>) => void;
  endBattle: () => void;

  // Sound Config
  soundSettings: {
    musicVolume: number;
    sfxVolume: number;
    musicMuted: boolean;
    sfxMuted: boolean;
    ambientSound: 'none' | 'temple' | 'fjords' | 'desert';
  };
  updateSoundSettings: (settings: Partial<GameStoreActions['soundSettings']>) => void;

  // Character & Companion actions
  unlockCharacter: (characterId: string) => void;
  equipCompanion: (characterId: string | null) => void;
  gainAffinityXp: (characterId: string, amount: number) => void;
  dismissUnlockOverlay: () => void;
  dismissLevelUpOverlay: () => void;
}

const initialGameState: GameState = {
  username: '',
  origin: '',
  avatarUrl: '',
  title: 'Mythwalker',
  level: 1,
  xp: 0,
  coins: 200,
  divineEssence: 0,
  oracleTokens: 5,
  dailyStreak: 0,
  lastLogin: new Date().toISOString(),
  
  attributes: {
    strength: 10,
    wisdom: 10,
    insight: 10,
    endurance: 10,
    agility: 10,
    spirit: 10,
    luck: 10,
    mythicAffinity: 10
  },
  
  affinity: {
    greek: { reputation: 0, rank: 'Outsider' },
    norse: { reputation: 0, rank: 'Outsider' },
    egyptian: { reputation: 0, rank: 'Outsider' }
  },

  weapons: [],
  armor: [],
  relics: [],
  equippedWeaponId: null,
  equippedArmorIds: {
    head: null,
    chest: null,
    arms: null,
    legs: null
  },
  equippedRelicIds: [],
  materials: {
    bronze_fragment: 0,
    rune_stone: 0,
    divine_essence: 0,
    titan_ore: 0,
    spirit_thread: 0,
    sunstone: 0,
    underworld_crystal: 0,
    glacial_core: 0
  },

  activeQuests: [],
  campaignChapters: [],
  unlockedCodexIds: [],
  quizStreak: 0,
  completedQuests: [],
  unlockedAchievements: [],

  unlockedCharacterIds: [],
  activeCompanionId: null,
  characterAffinities: {},
  pendingCharacterUnlock: null,
  pendingLevelUp: null
};

export const useGameStore = create<GameState & GameStoreActions>()(
  persist(
    (set, get) => ({
      ...initialGameState,

      battleState: {
        inBattle: false,
        battleId: null,
        creatureId: null,
        playerHp: 0,
        playerMaxHp: 100,
        playerSpirit: 0,
        playerMaxSpirit: 100,
        enemyHp: 0,
        enemyMaxHp: 100,
        battleLog: [],
        turn: 'player'
      },

      soundSettings: {
        musicVolume: 0.5,
        sfxVolume: 0.5,
        musicMuted: false,
        sfxMuted: false,
        ambientSound: 'none'
      },

      resetStore: () => {
        set({ ...initialGameState });
      },

      onboardPlayer: (username, origin, pantheon) => {
        // Base starting attributes modified by origin
        const baseAttrs = {
          strength: 10,
          wisdom: 10,
          insight: 10,
          endurance: 10,
          agility: 10,
          spirit: 10,
          luck: 10,
          mythicAffinity: 10
        };

        if (origin === 'Scholar of Delphi') {
          baseAttrs.wisdom += 5;
          baseAttrs.insight += 3;
        } else if (origin === 'Wanderer of Midgard') {
          baseAttrs.endurance += 5;
          baseAttrs.strength += 3;
        } else if (origin === 'Keeper of the Nile') {
          baseAttrs.insight += 5;
          baseAttrs.spirit += 3;
        } else if (origin === 'Relic Hunter') {
          baseAttrs.luck += 5;
          baseAttrs.agility += 3;
        }

        // Set starting weapon, armor and campaign based on starting pantheon
        const startWeapons: { [key in Pantheon]: string } = {
          greek: 'bronze_spear',
          norse: 'raider_axe',
          egyptian: 'khopesh_horus'
        };

        const startArmors: { [key in Pantheon]: string[] } = {
          greek: ['spartan_helmet', 'spartan_chest', 'spartan_arms', 'spartan_legs'],
          norse: ['midgard_hood', 'midgard_chest', 'midgard_arms', 'midgard_legs'],
          egyptian: ['scribe_hood', 'scribe_chest', 'scribe_arms', 'scribe_legs']
        };

        const startingCampaigns = JSON.parse(JSON.stringify(mythologyDb.campaigns)); // Deep copy campaigns

        // Find starting equipment templates from DB
        const startingWeaponTemplate = mythologyDb.weapons.find(w => w.id === startWeapons[pantheon])!;
        const startingArmorTemplates = startArmors[pantheon].map(
          id => mythologyDb.armor.find(a => a.id === id)!
        );

        const newWeapon: Weapon = { ...startingWeaponTemplate, upgradeLevel: 0 };
        const newArmors: Armor[] = startingArmorTemplates.map(a => ({ ...a, upgradeLevel: 0 }));

        const startingQuests = mythologyDb.sideQuests.filter(q => q.pantheon === pantheon).slice(0, 3);

        set({
          username,
          origin,
          attributes: baseAttrs,
          weapons: [newWeapon],
          armor: newArmors,
          equippedWeaponId: newWeapon.id,
          equippedArmorIds: {
            head: newArmors.find(a => a.slot === 'head')?.id || null,
            chest: newArmors.find(a => a.slot === 'chest')?.id || null,
            arms: newArmors.find(a => a.slot === 'arms')?.id || null,
            legs: newArmors.find(a => a.slot === 'legs')?.id || null
          },
          activeQuests: startingQuests,
          campaignChapters: startingCampaigns,
          unlockedCodexIds: [startingWeaponTemplate.id, ...newArmors.map(a => a.id)],
          unlockedAchievements: ['ach_first_step'],
          affinity: {
            greek: { reputation: pantheon === 'greek' ? 50 : 0, rank: pantheon === 'greek' ? 'Visitor' : 'Outsider' },
            norse: { reputation: pantheon === 'norse' ? 50 : 0, rank: pantheon === 'norse' ? 'Visitor' : 'Outsider' },
            egyptian: { reputation: pantheon === 'egyptian' ? 50 : 0, rank: pantheon === 'egyptian' ? 'Visitor' : 'Outsider' }
          },
          unlockedCharacterIds: [],
          activeCompanionId: null,
          characterAffinities: {},
          pendingCharacterUnlock: null,
          pendingLevelUp: null
        });
      },

      addXp: (amount) => {
        const currentXp = get().xp;
        const currentLevel = get().level;
        let newXp = currentXp + amount;
        let level = currentLevel;
        let leveledUp = false;

        while (newXp >= getXpForNextLevel(level)) {
          newXp -= getXpForNextLevel(level);
          level += 1;
          leveledUp = true;
        }

        if (leveledUp) {
          // Grant stat gains upon level up
          const oldAttrs = get().attributes;
          const upgradedAttrs = {
            strength: oldAttrs.strength + 2,
            wisdom: oldAttrs.wisdom + 2,
            insight: oldAttrs.insight + 2,
            endurance: oldAttrs.endurance + 2,
            agility: oldAttrs.agility + 2,
            spirit: oldAttrs.spirit + 2,
            luck: oldAttrs.luck + 1,
            mythicAffinity: oldAttrs.mythicAffinity + 1
          };

          // Level targets achievements triggers
          const achievementsUnlocked = [...get().unlockedAchievements];
          if (level >= 10 && !achievementsUnlocked.includes('ach_mythwalker_champion')) {
            achievementsUnlocked.push('ach_mythwalker_champion');
          }
          if (level >= 20 && !achievementsUnlocked.includes('ach_legacy_builder')) {
            achievementsUnlocked.push('ach_legacy_builder');
          }

          const rewards = [
            `+2 Strength, Wisdom, Insight, Endurance, Agility, Spirit`,
            `+1 Luck, Mythic Affinity`,
            `+1 Skill Point`
          ];

          set({
            level,
            xp: newXp,
            attributes: upgradedAttrs,
            unlockedAchievements: achievementsUnlocked,
            pendingLevelUp: {
              oldLevel: currentLevel,
              newLevel: level,
              rewards
            }
          });

          return { leveledUp: true, oldLevel: currentLevel, newLevel: level };
        } else {
          set({ xp: newXp });
          return null;
        }
      },

      addCoins: (amount) => {
        const nextCoins = get().coins + amount;
        const achievementsUnlocked = [...get().unlockedAchievements];
        if (nextCoins >= 500 && !achievementsUnlocked.includes('ach_hoarder')) {
          achievementsUnlocked.push('ach_hoarder');
        }
        set({ coins: nextCoins, unlockedAchievements: achievementsUnlocked });
      },

      addOracleTokens: (amount) => set({ oracleTokens: Math.max(0, get().oracleTokens + amount) }),
      
      addDivineEssence: (amount) => set({ divineEssence: Math.max(0, get().divineEssence + amount) }),

      adjustReputation: (pantheon, amount) => {
        const currentAff = get().affinity[pantheon];
        const newRep = Math.max(0, currentAff.reputation + amount);
        
        let newRank = 'Outsider';
        if (newRep >= 500) newRank = 'Chosen';
        else if (newRep >= 300) newRank = 'Guardian';
        else if (newRep >= 150) newRank = 'Champion';
        else if (newRep >= 80) newRank = 'Disciple';
        else if (newRep >= 40) newRank = 'Initiate';
        else if (newRep >= 15) newRank = 'Visitor';

        const achievementsUnlocked = [...get().unlockedAchievements];
        if (newRank === 'Chosen' && !achievementsUnlocked.includes('ach_reputation_chosen')) {
          achievementsUnlocked.push('ach_reputation_chosen');
        }

        set({
          affinity: {
            ...get().affinity,
            [pantheon]: { reputation: newRep, rank: newRank }
          },
          unlockedAchievements: achievementsUnlocked
        });
      },

      unlockCodexEntry: (entityId, percentage = 100) => {
        const currentIds = get().unlockedCodexIds;
        if (!currentIds.includes(entityId)) {
          const nextUnlocked = [...currentIds, entityId];
          const achievementsUnlocked = [...get().unlockedAchievements];
          if (nextUnlocked.length >= 30 && !achievementsUnlocked.includes('ach_mythic_completer')) {
            achievementsUnlocked.push('ach_mythic_completer');
          }
          set({
            unlockedCodexIds: nextUnlocked,
            unlockedAchievements: achievementsUnlocked
          });
        }
      },

      acquireWeapon: (weapon) => {
        set({ weapons: [...get().weapons, { ...weapon, upgradeLevel: 0 }] });
        get().unlockCodexEntry(weapon.id);
      },

      acquireArmor: (armorItem) => {
        set({ armor: [...get().armor, { ...armorItem, upgradeLevel: 0 }] });
        get().unlockCodexEntry(armorItem.id);
      },

      acquireRelic: (relic) => {
        set({ relics: [...get().relics, relic] });
        get().unlockCodexEntry(relic.id);
      },

      addMaterial: (name, quantity) => {
        const currentMaterials = get().materials;
        const newQty = Math.max(0, (currentMaterials[name] || 0) + quantity);
        set({
          materials: {
            ...currentMaterials,
            [name]: newQty
          }
        });
      },

      equipWeapon: (weaponId) => set({ equippedWeaponId: weaponId }),

      equipArmor: (armorId, slot) => {
        set({
          equippedArmorIds: {
            ...get().equippedArmorIds,
            [slot]: armorId
          }
        });
      },

      equipRelic: (relicId, slotIndex) => {
        const relicIds = [...get().equippedRelicIds];
        relicIds[slotIndex] = relicId;
        set({ equippedRelicIds: relicIds });
      },

      unequipRelic: (slotIndex) => {
        const relicIds = [...get().equippedRelicIds];
        relicIds.splice(slotIndex, 1);
        set({ equippedRelicIds: relicIds });
      },

      upgradeWeapon: (weaponId) => {
        const weaponsList = [...get().weapons];
        const wIndex = weaponsList.findIndex(w => w.id === weaponId);
        if (wIndex === -1) return false;
        
        const weapon = weaponsList[wIndex];
        const nextUpgradeLevel = weapon.upgradeLevel + 1;
        
        // Upgrade requirements: bronze shards, essence etc.
        const costMultiplier = nextUpgradeLevel;
        const materialsRequired = {
          bronze_fragment: 5 * costMultiplier,
          rune_stone: 2 * costMultiplier
        };

        const currentMats = get().materials;
        const hasEnough = Object.entries(materialsRequired).every(
          ([mat, req]) => (currentMats[mat] || 0) >= req
        );

        if (!hasEnough) return false;

        // Deduct materials
        const nextMats = { ...currentMats };
        Object.entries(materialsRequired).forEach(([mat, req]) => {
          nextMats[mat] -= req;
        });

        // Upgrade weapon damage
        weaponsList[wIndex] = {
          ...weapon,
          upgradeLevel: nextUpgradeLevel,
          baseDamage: Math.floor(weapon.baseDamage * 1.25)
        };

        const achievementsUnlocked = [...get().unlockedAchievements];
        if (nextUpgradeLevel >= 5 && !achievementsUnlocked.includes('ach_weapon_master')) {
          achievementsUnlocked.push('ach_weapon_master');
        }

        set({
          weapons: weaponsList,
          materials: nextMats,
          unlockedAchievements: achievementsUnlocked
        });
        return true;
      },

      upgradeArmor: (armorId) => {
        const armorList = [...get().armor];
        const aIndex = armorList.findIndex(a => a.id === armorId);
        if (aIndex === -1) return false;

        const arm = armorList[aIndex];
        const nextUpgradeLevel = arm.upgradeLevel + 1;
        
        const costMultiplier = nextUpgradeLevel;
        const materialsRequired = {
          bronze_fragment: 4 * costMultiplier,
          spirit_thread: 2 * costMultiplier
        };

        const currentMats = get().materials;
        const hasEnough = Object.entries(materialsRequired).every(
          ([mat, req]) => (currentMats[mat] || 0) >= req
        );

        if (!hasEnough) return false;

        // Deduct materials
        const nextMats = { ...currentMats };
        Object.entries(materialsRequired).forEach(([mat, req]) => {
          nextMats[mat] -= req;
        });

        // Upgrade defense
        armorList[aIndex] = {
          ...arm,
          upgradeLevel: nextUpgradeLevel,
          defense: Math.floor(arm.defense * 1.22)
        };

        set({
          armor: armorList,
          materials: nextMats
        });
        return true;
      },

      addQuestProgress: (questId, objectiveId, amount) => {
        const activeList = [...get().activeQuests];
        const qIndex = activeList.findIndex(q => q.id === questId);
        if (qIndex === -1) return;

        const quest = activeList[qIndex];
        const objectives = quest.objectives.map(obj => {
          if (obj.id === objectiveId) {
            const nextCount = Math.min(obj.targetCount, obj.currentCount + amount);
            return { ...obj, currentCount: nextCount };
          }
          return obj;
        });

        const isCompleted = objectives.every(obj => obj.currentCount >= obj.targetCount);

        activeList[qIndex] = {
          ...quest,
          objectives,
          isCompleted
        };

        set({ activeQuests: activeList });
      },

      claimQuestRewards: (questId) => {
        const activeList = [...get().activeQuests];
        const qIndex = activeList.findIndex(q => q.id === questId);
        if (qIndex === -1) return;

        const quest = activeList[qIndex];
        if (!quest.isCompleted || quest.isClaimed) return;

        // Apply rewards
        const rewards = quest.rewards;
        get().addXp(rewards.xp);
        get().addCoins(rewards.coins);

        if (rewards.materials) {
          Object.entries(rewards.materials).forEach(([matName, matQty]) => {
            get().addMaterial(matName, matQty);
          });
        }

        if (rewards.itemRewardId) {
          // Check weapons database
          const wTemplate = mythologyDb.weapons.find(w => w.id === rewards.itemRewardId);
          const aTemplate = mythologyDb.armor.find(a => a.id === rewards.itemRewardId);
          const rTemplate = mythologyDb.relics.find(r => r.id === rewards.itemRewardId);

          if (wTemplate) get().acquireWeapon(wTemplate);
          else if (aTemplate) get().acquireArmor(aTemplate);
          else if (rTemplate) get().acquireRelic(rTemplate);
        }

        // Remove from active and push to completed
        const updatedActive = activeList.filter(q => q.id !== questId);
        const achievementsUnlocked = [...get().unlockedAchievements];
        if (get().completedQuests.length === 0 && !achievementsUnlocked.includes('ach_first_blood')) {
          // First quest completion triggers first blood if it was combat or quest completed
        }

        set({
          activeQuests: updatedActive,
          completedQuests: [...get().completedQuests, questId]
        });
      },

      completeCampaignNode: (pantheon, chapterId, nodeId) => {
        const campaignChapters = [...get().campaignChapters];
        const chIndex = campaignChapters.findIndex(ch => ch.id === chapterId && ch.pantheon === pantheon);
        if (chIndex === -1) return;

        const chapter = campaignChapters[chIndex];
        const nodes = chapter.nodes.map(n => {
          if (n.id === nodeId) {
            return { ...n, completed: true };
          }
          return n;
        });

        campaignChapters[chIndex] = {
          ...chapter,
          nodes
        };

        set({ campaignChapters });
      },

      claimChapterRewards: (pantheon, chapterId) => {
        const campaignChapters = [...get().campaignChapters];
        const chIndex = campaignChapters.findIndex(ch => ch.id === chapterId && ch.pantheon === pantheon);
        if (chIndex === -1) return;

        const chapter = campaignChapters[chIndex];
        const allDone = chapter.nodes.every(n => n.completed);
        if (!allDone) return;

        get().addXp(chapter.rewards.xp);
        get().addCoins(chapter.rewards.coins);
        
        if (chapter.rewards.relicId) {
          const rTemplate = mythologyDb.relics.find(r => r.id === chapter.rewards.relicId);
          if (rTemplate) get().acquireRelic(rTemplate);
        }

        // Achievements triggers based on chapter completion
        const achievementsUnlocked = [...get().unlockedAchievements];
        if (chapterId === 'greek_ch1' && !achievementsUnlocked.includes('ach_greek_savior')) {
          achievementsUnlocked.push('ach_greek_savior');
        } else if (chapterId === 'norse_ch1' && !achievementsUnlocked.includes('ach_norse_savior')) {
          achievementsUnlocked.push('ach_norse_savior');
        } else if (chapterId === 'egyptian_ch1' && !achievementsUnlocked.includes('ach_egyptian_savior')) {
          achievementsUnlocked.push('ach_egyptian_savior');
        }

        set({ unlockedAchievements: achievementsUnlocked });
      },

      recordQuizScore: (pantheon, difficulty, score, max) => {
        const pct = (score / max) * 100;
        const quizStreak = score === max ? get().quizStreak + 1 : 0;
        
        // Quiz related achievements
        const achievementsUnlocked = [...get().unlockedAchievements];
        if (score === max) {
          if (pantheon === 'greek' && !achievementsUnlocked.includes('ach_scholar_delphi')) {
            achievementsUnlocked.push('ach_scholar_delphi');
          } else if (pantheon === 'norse' && !achievementsUnlocked.includes('ach_rune_seeker')) {
            achievementsUnlocked.push('ach_rune_seeker');
          } else if (pantheon === 'egyptian' && !achievementsUnlocked.includes('ach_nile_scribe')) {
            achievementsUnlocked.push('ach_nile_scribe');
          }
          
          if (difficulty === 'Mythic' && !achievementsUnlocked.includes('ach_oracle_cosmos')) {
            achievementsUnlocked.push('ach_oracle_cosmos');
          }
        }

        // Reward player with experience and tokens
        const xpGained = score * 10;
        const tokensGained = score === max ? 2 : 1;
        
        get().addXp(xpGained);
        get().addOracleTokens(tokensGained);

        set({
          quizStreak,
          unlockedAchievements: achievementsUnlocked
        });
      },

      unlockAchievement: (achievementId) => {
        const unlocked = get().unlockedAchievements;
        if (!unlocked.includes(achievementId)) {
          const ach = mythologyDb.achievements.find(a => a.id === achievementId);
          if (ach) {
            get().addXp(ach.xpReward);
          }
          set({ unlockedAchievements: [...unlocked, achievementId] });
        }
      },

      equipTitle: (titleName) => set({ title: titleName }),

      incrementStreak: () => set({ dailyStreak: get().dailyStreak + 1 }),

      startBattle: (battleId, creatureId, playerHp, playerMaxHp, enemyHp, enemyMaxHp) => {
        set({
          battleState: {
            inBattle: true,
            battleId,
            creatureId,
            playerHp,
            playerMaxHp,
            playerSpirit: 50,
            playerMaxSpirit: 100,
            enemyHp,
            enemyMaxHp,
            battleLog: [`A wild creature approaches! Battle started.`],
            turn: 'player'
          }
        });
      },

      updateBattle: (updater) => {
        const nextState = updater(get().battleState);
        set({
          battleState: {
            ...get().battleState,
            ...nextState
          }
        });
      },

      endBattle: () => {
        set({
          battleState: {
            inBattle: false,
            battleId: null,
            creatureId: null,
            playerHp: 0,
            playerMaxHp: 100,
            playerSpirit: 0,
            playerMaxSpirit: 100,
            enemyHp: 0,
            enemyMaxHp: 100,
            battleLog: [],
            turn: 'player'
          }
        });
      },

      updateSoundSettings: (settings) => {
        set({
          soundSettings: {
            ...get().soundSettings,
            ...settings
          }
        });
      },

      unlockCharacter: (characterId) => {
        const unlocked = get().unlockedCharacterIds;
        if (!unlocked.includes(characterId)) {
          set({
            unlockedCharacterIds: [...unlocked, characterId],
            pendingCharacterUnlock: characterId
          });
        }
      },

      equipCompanion: (characterId) => {
        set({ activeCompanionId: characterId });
      },

      gainAffinityXp: (characterId, amount) => {
        const affinities = { ...get().characterAffinities };
        const current = affinities[characterId] || { level: 'Encountered', xp: 0 };
        let nextXp = current.xp + amount;
        let currentLvl = current.level;

        const levelThresholds: Record<AffinityLevel, number> = {
          'Encountered': 100,
          'Recognised': 200,
          'Ally': 400,
          'Trusted': 700,
          'Champion': 1100,
          'Chosen': 1600,
          'Mythic Bond': Infinity
        };

        const levels: AffinityLevel[] = ['Encountered', 'Recognised', 'Ally', 'Trusted', 'Champion', 'Chosen', 'Mythic Bond'];

        let lvlIdx = levels.indexOf(currentLvl);
        while (lvlIdx < levels.length - 1 && nextXp >= levelThresholds[currentLvl]) {
          nextXp -= levelThresholds[currentLvl];
          lvlIdx += 1;
          currentLvl = levels[lvlIdx];
        }

        affinities[characterId] = { level: currentLvl, xp: nextXp };
        set({ characterAffinities: affinities });
      },

      dismissUnlockOverlay: () => {
        set({ pendingCharacterUnlock: null });
      },

      dismissLevelUpOverlay: () => {
        set({ pendingLevelUp: null });
      }
    }),
    {
      name: 'mythverse_game_state',
      partialize: (state) => {
        // Exclude ephemeral battle states from local persistence
        const { battleState, ...persisted } = state;
        return persisted;
      }
    }
  )
);
