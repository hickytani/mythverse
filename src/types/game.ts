export type Pantheon = 'greek' | 'norse' | 'egyptian';

export type EntityType = 'god' | 'hero' | 'creature' | 'realm' | 'artifact';

export interface MythicEntity {
  id: string;
  name: string;
  type: EntityType;
  pantheon: Pantheon;
  description: string;
  lore: string;
  attributes: {
    strength: number;
    wisdom: number;
    insight: number;
    endurance: number;
    agility: number;
    spirit: number;
  };
  aliases: string[];
  symbols: string[];
  family: {
    parents: string[];
    children: string[];
    spouses: string[];
    siblings: string[];
  };
  abilities: string[];
  imageUrl: string;
  audioPronunciation?: string;
  sources: string[];
}

export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Divine';

// ─── Character System Types ─────────────────────────────────────────────────

export type CharacterRole = 'Strategist' | 'Warrior' | 'Guardian' | 'Scholar' | 'Seer' | 'Trickster' | 'Healer' | 'Hunter' | 'Ruler' | 'Judge' | 'Destroyer' | 'Protector' | 'Companion';

export type CharacterType = 'deity' | 'hero' | 'guardian' | 'companion';

export type CharacterLockState = 'known' | 'partial' | 'secret';

export type CharacterAnimationState =
  | 'idle'
  | 'selected'
  | 'hovered'
  | 'unlocked'
  | 'levelUp'
  | 'abilityPreview'
  | 'weaponEquipped'
  | 'armorEquipped'
  | 'victory'
  | 'injured'
  | 'questIntro'
  | 'companionActivated';

export type AffinityLevel = 'Encountered' | 'Recognised' | 'Ally' | 'Trusted' | 'Champion' | 'Chosen' | 'Mythic Bond';

export interface CharacterAbility {
  name: string;
  description: string;
  type: 'active' | 'passive';
  icon?: string;
}

export interface CharacterRelationship {
  characterId: string;
  type: 'ally' | 'rival' | 'parent' | 'child' | 'sibling' | 'spouse' | 'mentor' | 'student';
  description: string;
}

export interface CharacterVisualState {
  portrait: string;
  fullBody: string;
  focalPoint: { x: number; y: number };
  scale: number;
  pose?: 'neutral' | 'battle' | 'victory';
}

export interface MythCharacter {
  id: string;
  name: string;
  title: string;
  pantheon: Pantheon;
  type: CharacterType;
  role: CharacterRole;
  rarity: Rarity;
  biography: string;
  lockState: CharacterLockState;
  lockClue: string;
  unlockCondition: string;
  unlockQuestId?: string;
  signatureWeapon: string;
  activeAbility: CharacterAbility;
  passiveAbility: CharacterAbility;
  companionBonus: string;
  relatedQuests: string[];
  relationships: CharacterRelationship[];
  visualAssets: {
    portrait: string;
    fullBody: string;
    background: string;
  };
  animationConfig: {
    idle: string;
    selected: string;
    unlock: string;
    ability: string;
    victory: string;
  };
  dialogueIntro: string;
  sources: string[];
}

export interface Weapon {
  id: string;
  name: string;
  pantheon: Pantheon;
  type: string; // 'Sword' | 'Spear' | 'Axe' | 'Bow' | 'Hammer' | 'Staff' | 'Bident' | 'Trident'
  rarity: Rarity;
  levelReq: number;
  baseDamage: number;
  secondaryStats?: {
    critChance?: number;
    spiritBonus?: number;
    wisdomBonus?: number;
  };
  passiveAbility: string;
  activeAbility: string;
  lore: string;
  imageUrl: string;
  upgradeLevel: number;
}

export type ArmorSlot = 'head' | 'chest' | 'arms' | 'legs';

export interface Armor {
  id: string;
  name: string;
  pantheon: Pantheon;
  slot: ArmorSlot;
  rarity: Rarity;
  levelReq: number;
  defense: number;
  attributes: {
    strength?: number;
    wisdom?: number;
    insight?: number;
    endurance?: number;
    agility?: number;
    spirit?: number;
  };
  setName: string;
  setBonusDesc: string;
  lore: string;
  imageUrl: string;
  upgradeLevel: number;
}

export interface Relic {
  id: string;
  name: string;
  pantheon: Pantheon;
  rarity: Rarity;
  description: string;
  passiveEffect: string;
  lore: string;
  imageUrl: string;
}

export interface Myth {
  id: string;
  title: string;
  pantheon: Pantheon;
  description: string;
  fullStory: string;
  characters: string[]; // Entity IDs
  locations: string[]; // Location names
  sources: string[];
}

export interface QuizQuestion {
  id: string;
  pantheon: Pantheon;
  type: 'multiple-choice' | 'symbol' | 'timeline' | 'weakness';
  question: string;
  options: string[];
  answer: string; // The correct option or ordering
  hint: string;
  difficulty: 'Initiate' | 'Scholar' | 'Champion' | 'Oracle' | 'Mythic';
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'side' | 'daily' | 'weekly';
  pantheon: Pantheon;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mythic';
  recommendedLevel: number;
  questGiver: string;
  objectives: {
    id: string;
    description: string;
    targetCount: number;
    currentCount: number;
  }[];
  rewards: {
    xp: number;
    coins: number;
    materials?: { [name: string]: number };
    itemRewardId?: string; // Weapon, armor, or relic ID
  };
  isCompleted: boolean;
  isClaimed: boolean;
}

export interface CampaignChapter {
  id: string;
  pantheon: Pantheon;
  chapterNumber: number;
  title: string;
  description: string;
  nodes: {
    id: string;
    title: string;
    type: 'lore' | 'dialogue' | 'quiz' | 'battle' | 'choice';
    description: string;
    completed: boolean;
    data: Record<string, unknown>; // Context data based on type
  }[];
  rewards: {
    xp: number;
    coins: number;
    relicId?: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'exploration' | 'combat' | 'knowledge' | 'collection' | 'campaign';
  xpReward: number;
  icon: string;
}

export interface Title {
  id: string;
  name: string;
  requirement: string;
}

export interface GameState {
  // Player state
  username: string;
  origin: string;
  avatarUrl: string;
  title: string;
  level: number;
  xp: number;
  coins: number;
  divineEssence: number;
  oracleTokens: number;
  dailyStreak: number;
  lastLogin: string;
  
  // Attributes
  attributes: {
    strength: number;
    wisdom: number;
    insight: number;
    endurance: number;
    agility: number;
    spirit: number;
    luck: number;
    mythicAffinity: number;
  };
  
  // Pantheon Affinity
  affinity: {
    [key in Pantheon]: {
      reputation: number;
      rank: string;
    };
  };

  // Inventory
  weapons: Weapon[];
  armor: Armor[];
  relics: Relic[];
  equippedWeaponId: string | null;
  equippedArmorIds: {
    head: string | null;
    chest: string | null;
    arms: string | null;
    legs: string | null;
  };
  equippedRelicIds: string[]; // up to 3 active relics
  materials: { [name: string]: number };

  // Quest & Progression state
  activeQuests: Quest[];
  campaignChapters: CampaignChapter[];
  unlockedCodexIds: string[]; // Set of Entity IDs
  quizStreak: number;
  completedQuests: string[];
  unlockedAchievements: string[];

  // Character & Companion state
  unlockedCharacterIds: string[];
  activeCompanionId: string | null;
  characterAffinities: Record<string, { level: AffinityLevel; xp: number }>;
  pendingCharacterUnlock: string | null; // ID of character awaiting unlock animation
  pendingLevelUp: { oldLevel: number; newLevel: number; rewards: string[] } | null;
}
