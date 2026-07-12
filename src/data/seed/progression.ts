import { Achievement, Title } from '../../types/game';

export const achievements: Achievement[] = [
  // --- EXPLORATION ACHIEVEMENTS (6) ---
  {
    id: 'ach_first_step',
    title: 'First Step Into Myth',
    description: 'Begin your journey and select a starting pantheon origin.',
    category: 'exploration',
    xpReward: 50,
    icon: 'Compass'
  },
  {
    id: 'ach_explorer_olympus',
    title: 'Explorer of Olympus',
    description: 'Explore all locations on the Greek world map.',
    category: 'exploration',
    xpReward: 100,
    icon: 'MapPin'
  },
  {
    id: 'ach_nine_realms_travel',
    title: 'Nine Realms Traveller',
    description: 'Explore all locations on the Norse world map.',
    category: 'exploration',
    xpReward: 100,
    icon: 'Trees'
  },
  {
    id: 'ach_nile_explorer',
    title: 'Nile Explorer',
    description: 'Explore all locations on the Egyptian world map.',
    category: 'exploration',
    xpReward: 100,
    icon: 'Sun'
  },
  {
    id: 'ach_cartographer_legends',
    title: 'Cartographer of Legends',
    description: 'Unlock 15 separate locations across the entire universe.',
    category: 'exploration',
    xpReward: 150,
    icon: 'Map'
  },
  {
    id: 'ach_underworld_voyager',
    title: 'Underworld Voyager',
    description: 'Visit the Underworld or Helheim or Duat.',
    category: 'exploration',
    xpReward: 80,
    icon: 'Skull'
  },

  // --- COMBAT ACHIEVEMENTS (6) ---
  {
    id: 'ach_first_blood',
    title: 'First Blood',
    description: 'Defeat your first mythological creature in battle.',
    category: 'combat',
    xpReward: 50,
    icon: 'Sword'
  },
  {
    id: 'ach_creature_chronicler',
    title: 'Creature Chronicler',
    description: 'Defeat 10 different species of creatures.',
    category: 'combat',
    xpReward: 120,
    icon: 'BookOpen'
  },
  {
    id: 'ach_titan_slayer',
    title: 'Titan Slayer',
    description: 'Defeat the Titan-class boss Typhon.',
    category: 'combat',
    xpReward: 250,
    icon: 'Flame'
  },
  {
    id: 'ach_ragnarok_survivor',
    title: 'Ragnarök Survivor',
    description: 'Defeat the fire giant boss Surtr.',
    category: 'combat',
    xpReward: 250,
    icon: 'ShieldAlert'
  },
  {
    id: 'ach_bane_of_chaos',
    title: 'Bane of Chaos',
    description: 'Defeat the chaos dragon boss Apophis.',
    category: 'combat',
    xpReward: 250,
    icon: 'Zap'
  },
  {
    id: 'ach_immortal_spark',
    title: 'Immortal Spark',
    description: 'Survive a creature battle with less than 5% health remaining.',
    category: 'combat',
    xpReward: 100,
    icon: 'Heart'
  },

  // --- KNOWLEDGE ACHIEVEMENTS (6) ---
  {
    id: 'ach_scholar_delphi',
    title: 'Scholar of Delphi',
    description: 'Correctly answer 5 consecutive questions about Greek mythology.',
    category: 'knowledge',
    xpReward: 80,
    icon: 'GraduationCap'
  },
  {
    id: 'ach_rune_seeker',
    title: 'Rune Seeker',
    description: 'Correctly answer 5 consecutive questions about Norse mythology.',
    category: 'knowledge',
    xpReward: 80,
    icon: 'Scroll'
  },
  {
    id: 'ach_nile_scribe',
    title: 'Nile Scribe',
    description: 'Correctly answer 5 consecutive questions about Egyptian mythology.',
    category: 'knowledge',
    xpReward: 80,
    icon: 'PenTool'
  },
  {
    id: 'ach_eye_of_thoth',
    title: 'Eye of Thoth',
    description: 'Answer 50 total quiz questions correctly across the arena.',
    category: 'knowledge',
    xpReward: 150,
    icon: 'Eye'
  },
  {
    id: 'ach_oracle_cosmos',
    title: 'Oracle of the Cosmos',
    description: 'Complete a Quiz Arena run on Mythic difficulty with 100% accuracy.',
    category: 'knowledge',
    xpReward: 200,
    icon: 'Sparkles'
  },
  {
    id: 'ach_fools_luck',
    title: 'Fool\'s Luck',
    description: 'Fail a battle quiz challenge 3 times but still win the battle.',
    category: 'knowledge',
    xpReward: 50,
    icon: 'HelpCircle'
  },

  // --- COLLECTION ACHIEVEMENTS (6) ---
  {
    id: 'ach_weapon_collector',
    title: 'Weapon Collector',
    description: 'Acquire 5 different weapons in your inventory.',
    category: 'collection',
    xpReward: 60,
    icon: 'Swords'
  },
  {
    id: 'ach_armorer_olympus',
    title: 'Armorer of Olympus',
    description: 'Acquire a complete set of armor (head, chest, arms, legs of one set).',
    category: 'collection',
    xpReward: 120,
    icon: 'Shirt'
  },
  {
    id: 'ach_relic_keeper',
    title: 'Relic Keeper',
    description: 'Unlock 5 unique relics in your collection.',
    category: 'collection',
    xpReward: 100,
    icon: 'Gem'
  },
  {
    id: 'ach_weapon_master',
    title: 'Weapon Master',
    description: 'Upgrade any weapon to level 5 at the Forge.',
    category: 'collection',
    xpReward: 150,
    icon: 'Hammer'
  },
  {
    id: 'ach_mythic_completer',
    title: 'Mythic Scholar',
    description: 'Unlock 30 total entries in the Codex.',
    category: 'collection',
    xpReward: 200,
    icon: 'Library'
  },
  {
    id: 'ach_hoarder',
    title: 'Hoarder of Sigils',
    description: 'Gather 500 total mythic coins in your profile.',
    category: 'collection',
    xpReward: 80,
    icon: 'Coins'
  },

  // --- CAMPAIGN ACHIEVEMENTS (6) ---
  {
    id: 'ach_greek_savior',
    title: 'Oracle\'s Purifier',
    description: 'Complete Greek Campaign Chapter 1.',
    category: 'campaign',
    xpReward: 100,
    icon: 'Award'
  },
  {
    id: 'ach_norse_savior',
    title: 'Hammer Defender',
    description: 'Complete Norse Campaign Chapter 1.',
    category: 'campaign',
    xpReward: 100,
    icon: 'Award'
  },
  {
    id: 'ach_egyptian_savior',
    title: 'Solar Eclipse Dispeller',
    description: 'Complete Egyptian Campaign Chapter 1.',
    category: 'campaign',
    xpReward: 100,
    icon: 'Award'
  },
  {
    id: 'ach_mythwalker_champion',
    title: 'Mythwalker Champion',
    description: 'Reach Level 10 on your profile.',
    category: 'campaign',
    xpReward: 150,
    icon: 'Crown'
  },
  {
    id: 'ach_legacy_builder',
    title: 'Legacy Builder',
    description: 'Reach Level 20 on your profile.',
    category: 'campaign',
    xpReward: 250,
    icon: 'Trophy'
  },
  {
    id: 'ach_reputation_chosen',
    title: 'Chosen of the Pantheon',
    description: 'Reach reputation rank "Chosen" with any pantheon.',
    category: 'campaign',
    xpReward: 120,
    icon: 'UserCheck'
  }
];

export const titles: Title[] = [
  { id: 'title_mythwalker', name: 'Mythwalker', requirement: 'Starter Title.' },
  { id: 'title_delphi', name: 'Scholar of Delphi', requirement: 'Complete Greek Campaign Chapter 1.' },
  { id: 'title_midgard', name: 'Wanderer of Midgard', requirement: 'Complete Norse Campaign Chapter 1.' },
  { id: 'title_nile', name: 'Keeper of the Nile', requirement: 'Complete Egyptian Campaign Chapter 1.' },
  { id: 'title_titan', name: 'Titanbreaker', requirement: 'Defeat the boss Typhon.' },
  { id: 'title_relic_hunter', name: 'Relic Hunter', requirement: 'Equip 3 active relics.' },
  { id: 'title_chosen_gods', name: 'Chosen of the Gods', requirement: 'Reach reputation rank "Chosen" with any pantheon.' },
  { id: 'title_scribe_maat', name: 'Scribe of Ma\'at', requirement: 'Complete 20 Egyptian quiz questions correctly.' },
  { id: 'title_einherjar', name: 'Einherjar Champion', requirement: 'Defeat 15 total Norse creatures.' },
  { id: 'title_seer_oracle', name: 'Seer of the Oracle', requirement: 'Reach Level 15.' },
  { id: 'title_dragon_slayer', name: 'Dragon Slayer', requirement: 'Defeat the dragon Fafnir.' },
  { id: 'title_forge_lord', name: 'Lord of the Forge', requirement: 'Upgrade any weapon or armor to Level 5.' },
  { id: 'title_guardian_asgard', name: 'Guardian of Asgard', requirement: 'Defeat the boss Surtr.' },
  { id: 'title_underworld', name: 'Underworld Voyager', requirement: 'Explore the Greek Underworld, Helheim, and Duat.' },
  { id: 'title_solar_sentinel', name: 'Solar Sentinel', requirement: 'Defeat the boss Apophis.' },
  { id: 'title_archivist', name: 'Grand Archivist', requirement: 'Unlock 35 entries in the Codex.' },
  { id: 'title_monster_hunter', name: 'Monster Hunter', requirement: 'Defeat 25 creatures in battles.' },
  { id: 'title_valhalla_champ', name: 'Chosen of Valhalla', requirement: 'Acquire the full Valkyrie Sentinel Armor Set.' },
  { id: 'title_ra_chosen', name: 'Chosen of Ra', requirement: 'Acquire the Royal Sun Disc weapon.' },
  { id: 'title_knowledge_deity', name: 'Deity of Knowledge', requirement: 'Complete a Mythic difficulty quiz with 100% accuracy.' }
];
