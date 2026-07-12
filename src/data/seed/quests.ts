import { CampaignChapter, Quest } from '../../types/game';

// Campaign chapters: 1 chapter per pantheon, each has 5 nodes (total 15 nodes/quests)
export const campaigns: CampaignChapter[] = [
  // --- GREEK CAMPAIGN ---
  {
    id: 'greek_ch1',
    pantheon: 'greek',
    chapterNumber: 1,
    title: 'The Broken Oracle',
    description: 'Travel to Delphi after the sacred oracle falls silent, uncovering a dark conspiracy.',
    nodes: [
      {
        id: 'gk_node1',
        title: 'Investigate the Temple',
        type: 'lore',
        description: 'Read the ancient stone inscriptions in Delphi to understand what caused the oracle\'s silence.',
        completed: false,
        data: { mythId: 'prometheus_fire' }
      },
      {
        id: 'gk_node2',
        title: 'Delphic Whispers',
        type: 'dialogue',
        description: 'Speak with Apollo\'s priests at the temple gate, learning about the toxic vapors.',
        completed: false,
        data: { speaker: 'High Priest Nicander', text: 'A corrupted serpent has blocked the sacred chasm below the temple!' }
      },
      {
        id: 'gk_node3',
        title: 'Search for Delphi Symbols',
        type: 'quiz',
        description: 'Answer questions about Apollo\'s symbols to unlock the seals guarding the lower vaults.',
        completed: false,
        data: { category: 'greek', questionCount: 3 }
      },
      {
        id: 'gk_node4',
        title: 'Slay the Vault Serpent',
        type: 'battle',
        description: 'Defeat the corrupted Desert Serpent nesting in the Delphic vault.',
        completed: false,
        data: { creatureId: 'desert_serpent' } // we reuse desert_serpent stats for the basic vault snake
      },
      {
        id: 'gk_node5',
        title: 'Reclaim the Aegis Fragment',
        type: 'choice',
        description: 'Speak with Apollo, who awards you a piece of his divine shielding.',
        completed: false,
        data: {
          speaker: 'Apollo',
          text: 'You have purified my sanctuary. Carry this Aegis fragment and walk the path of the gods.',
          choices: [
            { text: 'Accept the Aegis Fragment (+20 Reputation)', rewardReputation: 20 },
            { text: 'Ask for Apollo\'s blessing (+5 Spirit)', rewardSpirit: 5 }
          ]
        }
      }
    ],
    rewards: {
      xp: 200,
      coins: 100,
      relicId: 'oracle_crystal'
    }
  },

  // --- NORSE CAMPAIGN ---
  {
    id: 'norse_ch1',
    pantheon: 'norse',
    chapterNumber: 1,
    title: 'The Stolen Echo',
    description: 'Track down a rogue jötunn who stole an echo of Thor\'s hammer in Midgard.',
    nodes: [
      {
        id: 'ns_node1',
        title: 'Scout the Barrow Mounds',
        type: 'lore',
        description: 'Read about barrow mounds and the Draugr guardians protecting them.',
        completed: false,
        data: { mythId: 'creation_realms' }
      },
      {
        id: 'ns_node2',
        title: 'Speak with the Wanderer',
        type: 'dialogue',
        description: 'A hooded old man stands by the path, offering warnings about Loki\'s mischief.',
        completed: false,
        data: { speaker: 'Hooded Wanderer', text: 'The giants have bribed the barrow-dwellers with stolen Norse relics.' }
      },
      {
        id: 'ns_node3',
        title: 'Runic Seal Challenge',
        type: 'quiz',
        description: 'Prove your knowledge of Norse runes to open the crypt doors.',
        completed: false,
        data: { category: 'norse', questionCount: 3 }
      },
      {
        id: 'ns_node4',
        title: 'Defeat the Crypt Warden',
        type: 'battle',
        description: 'Confront the Draugr guarding the stolen hammer fragment.',
        completed: false,
        data: { creatureId: 'draugr' }
      },
      {
        id: 'ns_node5',
        title: 'Reclaim the Hammer Echo',
        type: 'choice',
        description: 'Acquire the weapon, deciding whether to keep it or offer a sacrifice to Odin.',
        completed: false,
        data: {
          speaker: 'Odin\'s Raven',
          text: 'The Allfather watches your deeds. Reclaim the echo or trade it for runic wisdom.',
          choices: [
            { text: 'Keep Mjölnir Echo (+1 Weapon)', rewardWeaponId: 'mjolnir_echo' },
            { text: 'Offer to Odin (+30 Norse reputation)', rewardReputation: 30 }
          ]
        }
      }
    ],
    rewards: {
      xp: 220,
      coins: 120,
      relicId: 'odin_raven_feather'
    }
  },

  // --- EGYPTIAN CAMPAIGN ---
  {
    id: 'egyptian_ch1',
    pantheon: 'egyptian',
    chapterNumber: 1,
    title: 'The Solar Eclipse',
    description: 'Investigate a dark shadow blocking Ra\'s solar barque from rising in Heliopolis.',
    nodes: [
      {
        id: 'eg_node1',
        title: 'Search the Temple Library',
        type: 'lore',
        description: 'Read the creation myths of Heliopolis to discover the weakness of darkness.',
        completed: false,
        data: { mythId: 'creation_ennead' }
      },
      {
        id: 'eg_node2',
        title: 'Arbitration of Thoth',
        type: 'dialogue',
        description: 'The scribe god Thoth blocks the path, demanding answers to his inquiries.',
        completed: false,
        data: { speaker: 'Thoth', text: 'To proceed, you must prove your heart is balanced and your mind is sharp.' }
      },
      {
        id: 'eg_node3',
        title: 'Trial of the Scale',
        type: 'quiz',
        description: 'Complete Thoth\'s riddle quiz to balance the scales of Heliopolis.',
        completed: false,
        data: { category: 'egyptian', questionCount: 3 }
      },
      {
        id: 'eg_node4',
        title: 'Slay the Shadow Swarm',
        type: 'battle',
        description: 'Defeat the Scarab Swarm sent by Seth to delay the solar barque.',
        completed: false,
        data: { creatureId: 'scarab_swarm' }
      },
      {
        id: 'eg_node5',
        title: 'The Sun God\'s Gaze',
        type: 'choice',
        description: 'Restore Ra\'s light, choosing between solar fire or protective wardings.',
        completed: false,
        data: {
          speaker: 'Ra\'s Messenger',
          text: 'You have dispelled the chaos shadows. Ra offers a choice of his divine tokens.',
          choices: [
            { text: 'Claim Eye of Horus Relic (+1 Relic)', rewardRelicId: 'eye_of_horus_relic' },
            { text: 'Receive Sun Blessing (+5 Wisdom)', rewardWisdom: 5 }
          ]
        }
      }
    ],
    rewards: {
      xp: 250,
      coins: 150,
      relicId: 'feather_of_maat'
    }
  }
];

// 30 Side Quests: 10 Greek, 10 Norse, 10 Egyptian
export const sideQuests: Quest[] = [
  // --- GREEK SIDE QUESTS (10) ---
  {
    id: 'gk_side1',
    title: 'The Weaver\'s Challenge',
    description: 'A local weaver claims Athena is jealous of her skills. Investigate the hubris.',
    type: 'side',
    pantheon: 'greek',
    difficulty: 'Easy',
    recommendedLevel: 2,
    questGiver: 'Arachne',
    objectives: [{ id: 'gks1_1', description: 'Read "Prometheus and the Theft of Fire" to understand hubris.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 50, coins: 30 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'gk_side2',
    title: 'Nemean Pest Control',
    description: 'Slay the minor beast terrorizing Nemean travelers.',
    type: 'side',
    pantheon: 'greek',
    difficulty: 'Medium',
    recommendedLevel: 4,
    questGiver: 'Mycenaean Villager',
    objectives: [{ id: 'gks2_1', description: 'Defeat a Harpy in combat.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 80, coins: 50 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'gk_side3',
    title: 'The Golden Apples',
    description: 'Research the dragon Ladon guarding the Hesperides gardens.',
    type: 'side',
    pantheon: 'greek',
    difficulty: 'Medium',
    recommendedLevel: 5,
    questGiver: 'Heracles',
    objectives: [{ id: 'gks3_1', description: 'Complete 3 questions in Greek Quiz Arena.', targetCount: 3, currentCount: 0 }],
    rewards: { xp: 90, coins: 60 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'gk_side4',
    title: 'Ariadne\'s Lament',
    description: 'Recover a thread spool from Crete\'s outer rings.',
    type: 'side',
    pantheon: 'greek',
    difficulty: 'Easy',
    recommendedLevel: 3,
    questGiver: 'Ariadne',
    objectives: [{ id: 'gks4_1', description: 'Explore Crete Labyrinth realm.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 60, coins: 40, itemRewardId: 'ariadne_thread' },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'gk_side5',
    title: 'Titan Omens',
    description: 'Investigate reports of tremors beneath Mount Etna.',
    type: 'side',
    pantheon: 'greek',
    difficulty: 'Hard',
    recommendedLevel: 10,
    questGiver: 'Hades',
    objectives: [{ id: 'gks5_1', description: 'Defeat a Cyclops in combat.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 150, coins: 100 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'gk_side6',
    title: 'Apollo\'s Arrows',
    description: 'Collect silver arrowheads from Delphi vaults.',
    type: 'side',
    pantheon: 'greek',
    difficulty: 'Medium',
    recommendedLevel: 6,
    questGiver: 'Apollo\'s Priest',
    objectives: [{ id: 'gks6_1', description: 'Solve 2 Greek symbol challenges.', targetCount: 2, currentCount: 0 }],
    rewards: { xp: 85, coins: 55, materials: { bronze_fragment: 5 } },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'gk_side7',
    title: 'Underworld Escape',
    description: 'Assist a wandering soul stuck in Asphodel.',
    type: 'side',
    pantheon: 'greek',
    difficulty: 'Hard',
    recommendedLevel: 12,
    questGiver: 'Lost Soul',
    objectives: [{ id: 'gks7_1', description: 'Visit Elysium region in Underworld.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 160, coins: 90, materials: { underworld_crystal: 2 } },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'gk_side8',
    title: 'Tribute to Poseidon',
    description: 'Offer tribute at the cliffs of Cape Sounion to calm seas.',
    type: 'side',
    pantheon: 'greek',
    difficulty: 'Easy',
    recommendedLevel: 2,
    questGiver: 'Fisherman Aegus',
    objectives: [{ id: 'gks8_1', description: 'Read "The Fall of Troy and the Trojan Horse".', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 50, coins: 30 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'gk_side9',
    title: 'Labors of Hephaestus',
    description: 'Gather volcanic slag from Hephaestus\'s forge.',
    type: 'side',
    pantheon: 'greek',
    difficulty: 'Medium',
    recommendedLevel: 8,
    questGiver: 'Hephaestus\'s Assistant',
    objectives: [{ id: 'gks9_1', description: 'Defeat a Chimera in battle.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 120, coins: 80, materials: { titan_ore: 3 } },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'gk_side10',
    title: 'Hera\'s Judgment',
    description: 'Settle a dispute between two cities over who owns a sacred peacock.',
    type: 'side',
    pantheon: 'greek',
    difficulty: 'Medium',
    recommendedLevel: 6,
    questGiver: 'Hera\'s Priestess',
    objectives: [{ id: 'gks10_1', description: 'Complete a Greek Quiz Arena on Champion difficulty.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 110, coins: 70 },
    isCompleted: false,
    isClaimed: false
  },

  // --- NORSE SIDE QUESTS (10) ---
  {
    id: 'ns_side1',
    title: 'The Rune Stones',
    description: 'Examine ancient runestones scattered across Midgard.',
    type: 'side',
    pantheon: 'norse',
    difficulty: 'Easy',
    recommendedLevel: 2,
    questGiver: 'Skald Sigurd',
    objectives: [{ id: 'nss1_1', description: 'Read "The Sacrifice of Odin\'s Eye".', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 55, coins: 35 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'ns_side2',
    title: 'Barrow Purge',
    description: 'Slay the Draugr infestation in the northern mounds.',
    type: 'side',
    pantheon: 'norse',
    difficulty: 'Medium',
    recommendedLevel: 4,
    questGiver: 'Midgard Chieftain',
    objectives: [{ id: 'nss2_1', description: 'Defeat a Draugr in combat.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 85, coins: 45, materials: { rune_stone: 3 } },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'ns_side3',
    title: 'The Apples of Idunn',
    description: 'Learn about the theft of Idunn\'s apples by the giant Thjazi.',
    type: 'side',
    pantheon: 'norse',
    difficulty: 'Easy',
    recommendedLevel: 3,
    questGiver: 'Idunn',
    objectives: [{ id: 'nss3_1', description: 'Solve 2 Norse symbol challenges.', targetCount: 2, currentCount: 0 }],
    rewards: { xp: 60, coins: 40 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'ns_side4',
    title: 'Frost Giant Incursion',
    description: 'Slay a giant scout creeping across the Midgard border.',
    type: 'side',
    pantheon: 'norse',
    difficulty: 'Hard',
    recommendedLevel: 8,
    questGiver: 'Heimdall',
    objectives: [{ id: 'nss4_1', description: 'Defeat a Frost Giant in battle.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 140, coins: 80, materials: { glacial_core: 1 } },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'ns_side5',
    title: 'Mimir\'s Whispers',
    description: 'Collect water from the roots of the World Tree.',
    type: 'side',
    pantheon: 'norse',
    difficulty: 'Medium',
    recommendedLevel: 5,
    questGiver: 'Mimir',
    objectives: [{ id: 'nss5_1', description: 'Explore Mimir\'s Well region in Jotunheim.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 95, coins: 50, itemRewardId: 'mimir_wisdom_eye' },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'ns_side6',
    title: 'Fenrir\'s Leash',
    description: 'Investigate the material elements used to construct Gleipnir.',
    type: 'side',
    pantheon: 'norse',
    difficulty: 'Medium',
    recommendedLevel: 6,
    questGiver: 'Tyr',
    objectives: [{ id: 'nss6_1', description: 'Read "The Binding of the Wolf Fenrir".', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 100, coins: 60 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'ns_side7',
    title: 'The Cat\'s Chariot',
    description: 'Retrieve magical catnip herbs for Freyja\'s chariot cats.',
    type: 'side',
    pantheon: 'norse',
    difficulty: 'Easy',
    recommendedLevel: 2,
    questGiver: 'Freyja',
    objectives: [{ id: 'nss7_1', description: 'Solve a Norse quiz in the Quiz Arena.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 50, coins: 35 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'ns_side8',
    title: 'Ironwood Secrets',
    description: 'Gather magical bark from Jotunheim\'s Ironwood forest.',
    type: 'side',
    pantheon: 'norse',
    difficulty: 'Hard',
    recommendedLevel: 9,
    questGiver: 'Loki',
    objectives: [{ id: 'nss8_1', description: 'Defeat a Fenrir Spawn in combat.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 130, coins: 90, materials: { spirit_thread: 3 } },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'ns_side9',
    title: 'Heimdall\'s Vision',
    description: 'Polish the lens of Gjallarhorn to clear the guardian\'s sight.',
    type: 'side',
    pantheon: 'norse',
    difficulty: 'Medium',
    recommendedLevel: 5,
    questGiver: 'Heimdall\'s Assistant',
    objectives: [{ id: 'nss9_1', description: 'Complete a Norse Quiz Arena on Initiate difficulty.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 80, coins: 50 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'ns_side10',
    title: 'The Forge of Brokkr',
    description: 'Help the dwarf smiths Brokkr and Sindri load the forge bellows.',
    type: 'side',
    pantheon: 'norse',
    difficulty: 'Medium',
    recommendedLevel: 7,
    questGiver: 'Brokkr',
    objectives: [{ id: 'nss10_1', description: 'Solve 2 timeline ordering challenges in Norse.', targetCount: 2, currentCount: 0 }],
    rewards: { xp: 110, coins: 70, materials: { rune_stone: 5 } },
    isCompleted: false,
    isClaimed: false
  },

  // --- EGYPTIAN SIDE QUESTS (10) ---
  {
    id: 'eg_side1',
    title: 'Scribe Registration',
    description: 'Read the creation histories of Egypt in Heliopolis library.',
    type: 'side',
    pantheon: 'egyptian',
    difficulty: 'Easy',
    recommendedLevel: 1,
    questGiver: 'High Scribe Pentaur',
    objectives: [{ id: 'egs1_1', description: 'Read "The Creation of the Ennead".', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 45, coins: 25 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'eg_side2',
    title: 'Tomb Raider Hunt',
    description: 'Defeat a reanimated royal guardian inside Saqqara tomb.',
    type: 'side',
    pantheon: 'egyptian',
    difficulty: 'Medium',
    recommendedLevel: 3,
    questGiver: 'Temple Priest',
    objectives: [{ id: 'egs2_1', description: 'Defeat a Tomb Guardian in battle.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 80, coins: 50, materials: { bronze_fragment: 3 } },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'eg_side3',
    title: 'Riddles of the Sphinx',
    description: 'Answer Sphinx\'s trivia riddle questions.',
    type: 'side',
    pantheon: 'egyptian',
    difficulty: 'Medium',
    recommendedLevel: 5,
    questGiver: 'Sphinx',
    objectives: [{ id: 'egs3_1', description: 'Solve a Sphinx Riddle quiz.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 95, coins: 55 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'eg_side4',
    title: 'Heart Balance Weight',
    description: 'Recover a stolen scales pan from Set\'s desert temple.',
    type: 'side',
    pantheon: 'egyptian',
    difficulty: 'Hard',
    recommendedLevel: 9,
    questGiver: 'Anubis',
    objectives: [{ id: 'egs4_1', description: 'Defeat a Set Beast in combat.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 130, coins: 85, itemRewardId: 'scale_anubis_relic' },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'eg_side5',
    title: 'Book of Thoth Search',
    description: 'Explore the Osireion chambers to find the tomb of Neferkaptah.',
    type: 'side',
    pantheon: 'egyptian',
    difficulty: 'Medium',
    recommendedLevel: 6,
    questGiver: 'Prince Khaemwaset',
    objectives: [{ id: 'egs5_1', description: 'Visit Abydos Osireion region.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 100, coins: 60 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'eg_side6',
    title: 'Eye of Horus Restoration',
    description: 'Help Horus recover his left eye lost during the wars with Seth.',
    type: 'side',
    pantheon: 'egyptian',
    difficulty: 'Hard',
    recommendedLevel: 10,
    questGiver: 'Horus',
    objectives: [{ id: 'egs6_1', description: 'Read "The Contendings of Horus and Seth".', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 150, coins: 90, itemRewardId: 'eye_of_horus_relic' },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'eg_side7',
    title: 'Red Sands Cleansing',
    description: 'Defeat a swarm of toxic scarabs creeping near Memphis oasis.',
    type: 'side',
    pantheon: 'egyptian',
    difficulty: 'Easy',
    recommendedLevel: 2,
    questGiver: 'Oasis merchant',
    objectives: [{ id: 'egs7_1', description: 'Defeat a Scarab Swarm in battle.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 60, coins: 35 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'eg_side8',
    title: 'The Winged Sun',
    description: 'Inscribe the protective winged disc symbol on the Heliopolis gate.',
    type: 'side',
    pantheon: 'egyptian',
    difficulty: 'Medium',
    recommendedLevel: 4,
    questGiver: 'Ra\'s Priest',
    objectives: [{ id: 'egs8_1', description: 'Complete an Egyptian Quiz Arena on Initiate difficulty.', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 75, coins: 45, materials: { sunstone: 2 } },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'eg_side9',
    title: 'The Tears of Isis',
    description: 'Learn about the Nile flooding caused by Isis grieving for Osiris.',
    type: 'side',
    pantheon: 'egyptian',
    difficulty: 'Easy',
    recommendedLevel: 2,
    questGiver: 'Isis\'s Priestess',
    objectives: [{ id: 'egs9_1', description: 'Read "The Murder and Resurrection of Osiris".', targetCount: 1, currentCount: 0 }],
    rewards: { xp: 55, coins: 30 },
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'eg_side10',
    title: 'Sacred Mummification',
    description: 'Help Anubis prepare the royal linens for a pharaoh\'s burial.',
    type: 'side',
    pantheon: 'egyptian',
    difficulty: 'Medium',
    recommendedLevel: 6,
    questGiver: 'Anubis\'s embalmer',
    objectives: [{ id: 'egs10_1', description: 'Solve 2 Egyptian symbol matching challenges.', targetCount: 2, currentCount: 0 }],
    rewards: { xp: 95, coins: 50, materials: { spirit_thread: 4 } },
    isCompleted: false,
    isClaimed: false
  }
];
