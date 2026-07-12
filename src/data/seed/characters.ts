import { MythCharacter } from '../../types/game';

export const characters: MythCharacter[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // GREEK PANTHEON (6)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'char_athena',
    name: 'Athena',
    title: 'Goddess of Wisdom and Strategic Warfare',
    pantheon: 'greek',
    type: 'deity',
    role: 'Strategist',
    rarity: 'Divine',
    biography: 'Born fully armored from the forehead of Zeus, Athena is the embodiment of intellectual strategy in combat. Unlike Ares, whose fury is blind, Athena plans every movement, anticipates every counter, and strikes with precise wisdom. She is the patron of Athens, guardian of heroes, and the voice that whispers the right answer when all paths seem lost. Those who earn her trust find that knowledge becomes their sharpest weapon.',
    lockState: 'known',
    lockClue: 'The grey-eyed goddess waits in the Oracle\'s silence.',
    unlockCondition: 'Complete "The Broken Oracle" quest in the Greek campaign.',
    unlockQuestId: 'quest_broken_oracle',
    signatureWeapon: 'Spear of Pallas',
    activeAbility: {
      name: 'Aegis Insight',
      description: 'Reveals one enemy weakness before battle. Correct lore answers deal 25% more damage for 3 turns.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Strategic Mind',
      description: '+10% bonus XP from all lore discoveries. Quiz timers extended by 20 seconds.',
      type: 'passive'
    },
    companionBonus: 'Reveals one enemy weakness in battle. Grants +10% XP from lore discoveries.',
    relatedQuests: ['quest_broken_oracle', 'quest_athenas_trial', 'quest_aegis_restoration'],
    relationships: [
      { characterId: 'char_zeus', type: 'parent', description: 'Born from the mind of Zeus, she is his most trusted divine strategist.' },
      { characterId: 'char_poseidon', type: 'rival', description: 'Competed for patronage of Athens, winning with the gift of the olive tree.' },
      { characterId: 'char_heracles', type: 'mentor', description: 'Guided Heracles through his labors, providing divine counsel.' }
    ],
    visualAssets: {
      portrait: '/images/characters/athena/full-body.png',
      fullBody: '/images/characters/athena/full-body.png',
      background: '/images/environments/greek-temple.png'
    },
    animationConfig: {
      idle: 'breathe-subtle',
      selected: 'spear-present',
      unlock: 'aegis-reveal',
      ability: 'wisdom-pulse',
      victory: 'shield-salute'
    },
    dialogueIntro: 'The Oracle has fallen silent. Something beneath the temple is interfering with her sight. I need a mind unclouded by fear—yours will do.',
    sources: ['Hesiod\'s Theogony', 'Pindar\'s Odes', 'Homer\'s Odyssey']
  },
  {
    id: 'char_zeus',
    name: 'Zeus',
    title: 'King of the Gods, Lord of Thunder',
    pantheon: 'greek',
    type: 'deity',
    role: 'Ruler',
    rarity: 'Divine',
    biography: 'Zeus overthrew his father Cronus to claim dominion over sky and storm. From his throne atop Mount Olympus, he maintains cosmic order with the thunderbolt—forged by the Cyclopes during the Titanomachy. His gaze pierces illusion, his judgment shapes the fate of mortals, and his wrath reshapes landscapes. To earn the favor of Zeus is to carry the weight of divine expectation.',
    lockState: 'known',
    lockClue: 'The thunder god watches from Olympus. Prove your worth through his trials.',
    unlockCondition: 'Reach Champion rank with Greek pantheon affinity.',
    signatureWeapon: 'Thunderbolt of Olympus',
    activeAbility: {
      name: 'Thunderbolt Strike',
      description: 'Calls down divine lightning dealing massive damage to all enemies. 30% chance to stun.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Olympian Authority',
      description: '+15% reputation gain with all Greek entities. Unlocks hidden Olympus dialogue.',
      type: 'passive'
    },
    companionBonus: 'Lightning strikes deal area damage. +15% Greek reputation gain.',
    relatedQuests: ['quest_throne_of_olympus', 'quest_titan_echo'],
    relationships: [
      { characterId: 'char_athena', type: 'parent', description: 'Father of Athena, born from his own mind.' },
      { characterId: 'char_hades', type: 'sibling', description: 'Drew lots with his brothers after the Titanomachy.' },
      { characterId: 'char_poseidon', type: 'sibling', description: 'Lord of the seas, eternal brother and occasional rival.' }
    ],
    visualAssets: {
      portrait: '/images/characters/zeus/full-body.png',
      fullBody: '/images/characters/zeus/full-body.png',
      background: '/images/environments/greek-temple.png'
    },
    animationConfig: { idle: 'storm-crackle', selected: 'bolt-raise', unlock: 'thunder-reveal', ability: 'storm-call', victory: 'bolt-salute' },
    dialogueIntro: 'You dare approach the throne of Olympus? Speak quickly, mortal. My patience, like my lightning, strikes without warning.',
    sources: ['Hesiod\'s Theogony', 'Homer\'s Iliad']
  },
  {
    id: 'char_hades',
    name: 'Hades',
    title: 'Lord of the Underworld, Guardian of Souls',
    pantheon: 'greek',
    type: 'deity',
    role: 'Judge',
    rarity: 'Mythic',
    biography: 'Hades drew the underworld in the divine lottery and has ruled it ever since with quiet, unyielding authority. He is not evil—he is inevitable. Every soul arrives at his gates eventually. With Cerberus at his side and the Helm of Darkness on his brow, Hades sees what others deny: that endings are also beginnings. His domain holds both punishment and the Elysian Fields.',
    lockState: 'partial',
    lockClue: 'The ruler of shadows judges those who descend. Seek the river that separates the living from the dead.',
    unlockCondition: 'Discover the entrance to the Underworld in the Greek campaign.',
    signatureWeapon: 'Bident of the Dead',
    activeAbility: {
      name: 'Soul Reap',
      description: 'Drains 20% of enemy health and converts it to player spirit energy.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Death\'s Patience',
      description: 'When health drops below 25%, gain 40% damage reduction for 2 turns.',
      type: 'passive'
    },
    companionBonus: 'Drains enemy health on critical hits. +40% damage reduction when near death.',
    relatedQuests: ['quest_gates_of_tartarus', 'quest_river_styx'],
    relationships: [
      { characterId: 'char_zeus', type: 'sibling', description: 'Brothers who divided the cosmos after war.' },
      { characterId: 'char_poseidon', type: 'sibling', description: 'Lord of the seas, rarely visits the underworld.' }
    ],
    visualAssets: {
      portrait: '/images/characters/hades/full-body.png',
      fullBody: '/images/characters/hades/full-body.png',
      background: '/images/environments/greek-temple.png'
    },
    animationConfig: { idle: 'shadow-drift', selected: 'bident-raise', unlock: 'darkness-reveal', ability: 'soul-drain', victory: 'shadow-throne' },
    dialogueIntro: 'Ah. Another living soul in my domain. How... unexpected. Tell me, Mythwalker—do you seek something from the dead, or have you come to join them?',
    sources: ['Homeric Hymn to Demeter', 'Homer\'s Iliad']
  },
  {
    id: 'char_poseidon',
    name: 'Poseidon',
    title: 'God of the Sea, Earth-Shaker',
    pantheon: 'greek',
    type: 'deity',
    role: 'Destroyer',
    rarity: 'Divine',
    biography: 'Poseidon commands every current, every storm, every tremor beneath the earth. With a single strike of his trident, he can shatter coastlines or calm raging waters. Sailors pray to him, warriors fear his wrath, and the very foundations of the world tremble at his displeasure. Yet he can also be generous—granting safe passage to those who honor the sea.',
    lockState: 'known',
    lockClue: 'The Earth-Shaker awaits tribute upon the waves.',
    unlockCondition: 'Survive a sea voyage encounter in the Greek campaign.',
    signatureWeapon: 'Trident of the Deep',
    activeAbility: {
      name: 'Tsunami Slam',
      description: 'Summons a massive wave dealing water damage and pushing enemies back.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Ocean\'s Embrace',
      description: '+20% defense when fighting near water. Heal 5% HP per turn in coastal regions.',
      type: 'passive'
    },
    companionBonus: 'Water-based attacks gain +20% damage. Coastal region healing.',
    relatedQuests: ['quest_sunken_temple', 'quest_ocean_crossing'],
    relationships: [
      { characterId: 'char_zeus', type: 'sibling', description: 'Brother and co-ruler of the cosmos.' },
      { characterId: 'char_athena', type: 'rival', description: 'Lost the contest for Athens patronage.' }
    ],
    visualAssets: {
      portrait: '/images/characters/poseidon/full-body.png',
      fullBody: '/images/characters/poseidon/full-body.png',
      background: '/images/environments/greek-temple.png'
    },
    animationConfig: { idle: 'wave-sway', selected: 'trident-slam', unlock: 'ocean-reveal', ability: 'tsunami-rise', victory: 'wave-crown' },
    dialogueIntro: 'The sea remembers every slight, Mythwalker. Tread carefully upon my shores.',
    sources: ['Homer\'s Odyssey', 'Hesiod\'s Theogony']
  },
  {
    id: 'char_artemis',
    name: 'Artemis',
    title: 'Goddess of the Hunt, Moon Huntress',
    pantheon: 'greek',
    type: 'deity',
    role: 'Hunter',
    rarity: 'Legendary',
    biography: 'Artemis roams the wild forests of Greece with her silver bow and her band of sworn nymphs. She is the protector of wilderness, the guardian of young creatures, and the most skilled archer among the gods. Under the crescent moon, her arrows find their mark without fail. She asks for no devotion—only respect for the wild places she guards.',
    lockState: 'known',
    lockClue: 'The huntress watches from the forest. Track her sacred stag.',
    unlockCondition: 'Complete a tracking quest in the Greek wilderness.',
    signatureWeapon: 'Silver Bow of Selene',
    activeAbility: {
      name: 'Moon Arrow Barrage',
      description: 'Fires 5 silver arrows in rapid succession, each dealing escalating damage.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Wild Tracker',
      description: '+15% chance to find rare materials in wilderness regions. Reveals hidden paths.',
      type: 'passive'
    },
    companionBonus: 'Ranged attacks gain bonus silver damage. Reveals hidden paths in wilderness.',
    relatedQuests: ['quest_sacred_stag', 'quest_moonlit_hunt'],
    relationships: [
      { characterId: 'char_zeus', type: 'parent', description: 'Daughter of Zeus and the Titaness Leto.' }
    ],
    visualAssets: {
      portrait: '/images/characters/artemis/full-body.png',
      fullBody: '/images/characters/artemis/full-body.png',
      background: '/images/environments/greek-temple.png'
    },
    animationConfig: { idle: 'bow-ready', selected: 'arrow-nock', unlock: 'moon-reveal', ability: 'arrow-storm', victory: 'hunter-salute' },
    dialogueIntro: 'You move loudly, Mythwalker. In my forests, silence is survival. Learn quickly, or become prey.',
    sources: ['Callimachus\'s Hymn to Artemis', 'Homer\'s Odyssey']
  },
  {
    id: 'char_heracles',
    name: 'Heracles',
    title: 'Champion of Olympus, Lion Slayer',
    pantheon: 'greek',
    type: 'hero',
    role: 'Warrior',
    rarity: 'Legendary',
    biography: 'The greatest hero of Greek mythology, Heracles endured twelve impossible labors and emerged divine. Son of Zeus and the mortal Alcmene, he bridges the gap between gods and men. His strength is unmatched, his courage unbreakable, and his lion-skin cloak is a trophy that reminds the world: even monsters fall to human determination backed by divine blood.',
    lockState: 'known',
    lockClue: 'The lion-slayer tests those who claim heroism.',
    unlockCondition: 'Win 5 creature battles in the Greek campaign.',
    signatureWeapon: 'Club of Heracles',
    activeAbility: {
      name: 'Nemean Fury',
      description: 'Enters a rage state dealing 50% more damage for 4 turns. Cannot be stunned.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Lion\'s Resilience',
      description: '+20% maximum health. Recover 3% HP after winning any battle.',
      type: 'passive'
    },
    companionBonus: '+20% max health in battle. Physical attacks deal bonus damage.',
    relatedQuests: ['quest_nemean_lion', 'quest_hydra_hunt'],
    relationships: [
      { characterId: 'char_zeus', type: 'parent', description: 'Son of Zeus, half-god, half-mortal.' },
      { characterId: 'char_athena', type: 'ally', description: 'Athena guided him through his twelve labors.' }
    ],
    visualAssets: {
      portrait: '/images/characters/heracles/full-body.png',
      fullBody: '/images/characters/heracles/full-body.png',
      background: '/images/environments/greek-temple.png'
    },
    animationConfig: { idle: 'muscle-flex', selected: 'club-raise', unlock: 'lion-roar', ability: 'fury-smash', victory: 'lion-trophy' },
    dialogueIntro: 'Labors, Mythwalker. That\'s what separates heroes from dreamers. Are you ready to bleed for glory?',
    sources: ['Apollodorus\' Bibliotheca', 'Ovid\'s Metamorphoses']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NORSE PANTHEON (6)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'char_odin',
    name: 'Odin',
    title: 'All-Father, Seeker of Wisdom',
    pantheon: 'norse',
    type: 'deity',
    role: 'Scholar',
    rarity: 'Divine',
    biography: 'Odin sacrificed his eye at the Well of Mimir and hung from Yggdrasil for nine days to gain the knowledge of runes. The All-Father does not fight with brute force—he fights with knowledge, cunning, and the inevitability of fate. His ravens Huginn and Muninn survey all nine worlds. His wolves Geri and Freki feast at his table. And in Valhalla, he prepares the worthy for Ragnarök.',
    lockState: 'known',
    lockClue: 'The one-eyed wanderer appears when wisdom is tested.',
    unlockCondition: 'Decipher 5 rune inscriptions in the Norse campaign.',
    signatureWeapon: 'Gungnir, the Swaying One',
    activeAbility: {
      name: 'Rune of Fate',
      description: 'Reveals the enemy\'s next 3 actions. Guaranteed critical hit on next attack.',
      type: 'active'
    },
    passiveAbility: {
      name: 'All-Sight',
      description: 'Quiz questions reveal one incorrect answer automatically. +15% Norse lore XP.',
      type: 'passive'
    },
    companionBonus: 'Reveals enemy attack patterns. +15% Norse lore XP.',
    relatedQuests: ['quest_well_of_mimir', 'quest_rune_prophecy'],
    relationships: [
      { characterId: 'char_thor', type: 'parent', description: 'Father of Thor, the thunder god.' },
      { characterId: 'char_loki', type: 'ally', description: 'Blood-brothers bound by oath, despite Loki\'s chaotic nature.' }
    ],
    visualAssets: {
      portrait: '/images/characters/odin/full-body.png',
      fullBody: '/images/characters/odin/full-body.png',
      background: '/images/environments/norse-mountain.png'
    },
    animationConfig: { idle: 'staff-lean', selected: 'raven-call', unlock: 'rune-reveal', ability: 'fate-weave', victory: 'valhalla-salute' },
    dialogueIntro: 'I gave an eye for wisdom, Mythwalker. What are you willing to sacrifice?',
    sources: ['Prose Edda', 'Poetic Edda', 'Hávamál']
  },
  {
    id: 'char_thor',
    name: 'Thor',
    title: 'God of Thunder, Protector of Midgard',
    pantheon: 'norse',
    type: 'deity',
    role: 'Warrior',
    rarity: 'Divine',
    biography: 'Thor is the storm made flesh. With Mjölnir in hand, he is the shield of Midgard against frost giants, serpents, and the creeping chaos of Jötunheim. He is not subtle—he is honest, brave, and relentless. Lightning answers his call, thunder follows his footsteps, and when the final battle comes at Ragnarök, Thor will face the World Serpent knowing he cannot survive. He will fight anyway.',
    lockState: 'known',
    lockClue: 'Thunder echoes through the mountains. Follow the storm.',
    unlockCondition: 'Defeat a frost giant in the Norse campaign.',
    signatureWeapon: 'Mjölnir',
    activeAbility: {
      name: 'Mjölnir Strike',
      description: 'Hurls the divine hammer dealing massive lightning damage. Returns to hand. 30% stun chance.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Storm\'s Fury',
      description: '+25% lightning damage. Immune to stun effects.',
      type: 'passive'
    },
    companionBonus: 'Lightning attacks deal +25% damage. Stun immunity for player.',
    relatedQuests: ['quest_jotunheim_gate', 'quest_serpent_hunt'],
    relationships: [
      { characterId: 'char_odin', type: 'parent', description: 'Son of the All-Father.' },
      { characterId: 'char_loki', type: 'rival', description: 'Adopted brother, constant source of chaos and reluctant ally.' }
    ],
    visualAssets: {
      portrait: '/images/characters/thor/full-body.png',
      fullBody: '/images/characters/thor/full-body.png',
      background: '/images/environments/norse-mountain.png'
    },
    animationConfig: { idle: 'hammer-rest', selected: 'lightning-crackle', unlock: 'thunder-reveal', ability: 'hammer-throw', victory: 'hammer-raise' },
    dialogueIntro: 'Giants threaten Midgard, Mythwalker. I do not need eloquence—I need fighters. Are you one?',
    sources: ['Prose Edda', 'Poetic Edda', 'Hymiskviða']
  },
  {
    id: 'char_loki',
    name: 'Loki',
    title: 'The Trickster, Shape-Shifter',
    pantheon: 'norse',
    type: 'deity',
    role: 'Trickster',
    rarity: 'Mythic',
    biography: 'Loki is neither fully god nor fully giant. He is the fire that warms and the fire that burns. His cunning has saved the gods as many times as it has endangered them. He orchestrated Baldur\'s death, sired Fenrir and Hel, and will lead the forces of chaos at Ragnarök. Yet without Loki, the gods would have no Mjölnir, no Sleipnir, no wall of Asgard.',
    lockState: 'partial',
    lockClue: 'The shape-shifter reveals himself only to those who see through illusion.',
    unlockCondition: 'See through 3 deceptions in Norse quests.',
    signatureWeapon: 'Lævateinn',
    activeAbility: {
      name: 'Shapeshifter\'s Gambit',
      description: 'Copies the last enemy ability used and reflects it back with 150% power.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Silver Tongue',
      description: 'Dialogue choices reveal hidden quest paths. +20% chance to avoid traps.',
      type: 'passive'
    },
    companionBonus: 'Reflects enemy abilities. Reveals hidden dialogue options.',
    relatedQuests: ['quest_loki_bargain', 'quest_binding_of_fenrir'],
    relationships: [
      { characterId: 'char_odin', type: 'ally', description: 'Blood-brothers, bound by ancient oath.' },
      { characterId: 'char_thor', type: 'rival', description: 'Constant friction masked as brotherhood.' }
    ],
    visualAssets: {
      portrait: '/images/characters/loki/full-body.png',
      fullBody: '/images/characters/loki/full-body.png',
      background: '/images/environments/norse-mountain.png'
    },
    animationConfig: { idle: 'flame-flicker', selected: 'illusion-shift', unlock: 'mask-reveal', ability: 'shape-change', victory: 'grin-bow' },
    dialogueIntro: 'Oh, a new plaything. Tell me, Mythwalker—do you trust your own eyes? You shouldn\'t.',
    sources: ['Prose Edda', 'Lokasenna', 'Gylfaginning']
  },
  {
    id: 'char_freyja',
    name: 'Freyja',
    title: 'Goddess of Love, War, and Seiðr Magic',
    pantheon: 'norse',
    type: 'deity',
    role: 'Healer',
    rarity: 'Legendary',
    biography: 'Freyja is a goddess of contradictions—she governs love and beauty, yet she also claims half of the battle-slain for her hall Fólkvangr. She is the greatest practitioner of Seiðr magic, capable of shaping fate itself. She weeps tears of gold for her lost husband Óðr and rides into battle in a chariot pulled by cats. No force in the nine worlds should be underestimated less.',
    lockState: 'known',
    lockClue: 'Golden tears mark the path to the Vanir goddess.',
    unlockCondition: 'Complete a Seiðr magic ritual in the Norse campaign.',
    signatureWeapon: 'Brísingamen (Necklace of Power)',
    activeAbility: {
      name: 'Seiðr Healing',
      description: 'Restores 40% health to player and companion. Removes all debuffs.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Fólkvangr\'s Grace',
      description: 'After battle victory, heal 10% HP. +10% magic damage.',
      type: 'passive'
    },
    companionBonus: 'Post-battle healing. Debuff removal. +10% magic damage.',
    relatedQuests: ['quest_brisingamen', 'quest_seidr_ritual'],
    relationships: [
      { characterId: 'char_odin', type: 'ally', description: 'Taught Odin the ways of Seiðr magic.' },
      { characterId: 'char_loki', type: 'rival', description: 'Loki stole her necklace Brísingamen.' }
    ],
    visualAssets: {
      portrait: '/images/characters/freyja/full-body.png',
      fullBody: '/images/characters/freyja/full-body.png',
      background: '/images/environments/norse-mountain.png'
    },
    animationConfig: { idle: 'magic-glow', selected: 'necklace-shine', unlock: 'gold-tears', ability: 'seidr-cast', victory: 'grace-bow' },
    dialogueIntro: 'The threads of fate are tangled, Mythwalker. Let me teach you to read them—before they snap.',
    sources: ['Prose Edda', 'Þrymskviða', 'Sörla þáttr']
  },
  {
    id: 'char_tyr',
    name: 'Tyr',
    title: 'God of War and Justice, The One-Handed',
    pantheon: 'norse',
    type: 'deity',
    role: 'Guardian',
    rarity: 'Legendary',
    biography: 'Tyr placed his hand in the mouth of Fenrir so the gods could bind the wolf. He knew the cost. He paid it without hesitation. That single act defines everything about Tyr: he is the god of just war, of sacrifice for the greater good, of the courage to do what must be done even when it costs everything. His one remaining hand holds the sword of justice.',
    lockState: 'known',
    lockClue: 'The one-handed god values sacrifice above all.',
    unlockCondition: 'Make a sacrifice choice in a Norse campaign dialogue.',
    signatureWeapon: 'Sword of Justice',
    activeAbility: {
      name: 'Binding Oath',
      description: 'Reduces enemy attack by 30% for 5 turns. Cannot be dispelled.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Sacrifice\'s Reward',
      description: 'When player takes damage, gain +5% damage bonus stacking up to 25%.',
      type: 'passive'
    },
    companionBonus: 'Enemy attack reduction. Damage bonus from taking hits.',
    relatedQuests: ['quest_fenrir_binding', 'quest_justice_trial'],
    relationships: [
      { characterId: 'char_odin', type: 'ally', description: 'Loyal warrior of the All-Father.' },
      { characterId: 'char_thor', type: 'ally', description: 'Battle-brothers who fight side by side.' }
    ],
    visualAssets: {
      portrait: '/images/characters/tyr/full-body.png',
      fullBody: '/images/characters/tyr/full-body.png',
      background: '/images/environments/norse-mountain.png'
    },
    animationConfig: { idle: 'sword-rest', selected: 'oath-raise', unlock: 'sacrifice-reveal', ability: 'binding-strike', victory: 'justice-salute' },
    dialogueIntro: 'Justice demands a price, Mythwalker. Every oath, every battle, every choice—there is always a cost. Are you prepared to pay it?',
    sources: ['Prose Edda', 'Hymiskviða']
  },
  {
    id: 'char_valkyrie_eir',
    name: 'Valkyrie Eir',
    title: 'Chooser of the Slain, Battle Maiden',
    pantheon: 'norse',
    type: 'guardian',
    role: 'Healer',
    rarity: 'Epic',
    biography: 'Eir rides among the Valkyries selecting the bravest of the fallen for Valhalla. But unlike her sisters who focus on death, Eir is also a healer—the finest in all nine worlds. She tends to the wounds of Einherjar in Odin\'s hall, mending what was broken so warriors can fight again. In her presence, even mortal wounds find relief.',
    lockState: 'known',
    lockClue: 'The battle-maiden descends when valor is proven on the field.',
    unlockCondition: 'Win a battle with less than 10% health remaining.',
    signatureWeapon: 'Valkyrie Spear',
    activeAbility: {
      name: 'Valkyrie\'s Mercy',
      description: 'Resurrects from a killing blow once per battle with 30% HP.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Battle Mending',
      description: 'Heal 2% HP each turn in combat. +10% healing from all sources.',
      type: 'passive'
    },
    companionBonus: 'One-time death prevention per battle. Passive HP regeneration.',
    relatedQuests: ['quest_valhalla_gates', 'quest_einherjar_trial'],
    relationships: [
      { characterId: 'char_odin', type: 'ally', description: 'Serves the All-Father as a chooser of the slain.' },
      { characterId: 'char_freyja', type: 'ally', description: 'Freyja claims half the battle-slain; the Valkyries deliver Odin\'s half.' }
    ],
    visualAssets: {
      portrait: '/images/characters/valkyrie-eir/full-body.png',
      fullBody: '/images/characters/valkyrie-eir/full-body.png',
      background: '/images/environments/norse-mountain.png'
    },
    animationConfig: { idle: 'wing-flutter', selected: 'spear-present', unlock: 'descent-reveal', ability: 'heal-light', victory: 'ascend' },
    dialogueIntro: 'You fight well, mortal. But fighting well and surviving are different arts. Let me teach you the latter.',
    sources: ['Prose Edda', 'Fjölsvinnsmál']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EGYPTIAN PANTHEON (6)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'char_ra',
    name: 'Ra',
    title: 'Sun God, Creator of All',
    pantheon: 'egyptian',
    type: 'deity',
    role: 'Ruler',
    rarity: 'Divine',
    biography: 'Ra sails the solar barque across the sky each day, bringing light and life to the world. Each night, he descends into the Duat to battle the chaos serpent Apophis, emerging victorious at dawn. He is the first god, the creator, the source of all light. His eye—the Eye of Ra—is a force of destruction that can scorch entire armies. To stand in Ra\'s light is to stand in truth.',
    lockState: 'known',
    lockClue: 'The sun god\'s barque sails at dawn. Witness his journey to earn his gaze.',
    unlockCondition: 'Complete the solar barque journey in the Egyptian campaign.',
    signatureWeapon: 'Staff of the Sun',
    activeAbility: {
      name: 'Solar Flare',
      description: 'Unleashes the Eye of Ra, dealing massive fire damage and blinding enemies for 2 turns.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Dawn\'s Renewal',
      description: 'At the start of each battle, restore 15% HP. +20% fire damage.',
      type: 'passive'
    },
    companionBonus: 'Fire damage +20%. Battle-start healing. Blinding attacks.',
    relatedQuests: ['quest_solar_barque', 'quest_apophis_battle'],
    relationships: [
      { characterId: 'char_horus', type: 'parent', description: 'Grandfather of Horus through the Osiris lineage.' },
      { characterId: 'char_isis', type: 'rival', description: 'Isis tricked Ra into revealing his secret name.' }
    ],
    visualAssets: {
      portrait: '/images/characters/ra/full-body.png',
      fullBody: '/images/characters/ra/full-body.png',
      background: '/images/environments/egyptian-temple.png'
    },
    animationConfig: { idle: 'sun-glow', selected: 'staff-raise', unlock: 'dawn-reveal', ability: 'solar-blast', victory: 'sun-crown' },
    dialogueIntro: 'I have sailed the heavens since before your kind drew breath. Speak your purpose, Mythwalker, and I shall judge if the sun will shine upon your path.',
    sources: ['Book of the Dead', 'Pyramid Texts', 'Coffin Texts']
  },
  {
    id: 'char_anubis',
    name: 'Anubis',
    title: 'Guardian of the Dead, Weigher of Hearts',
    pantheon: 'egyptian',
    type: 'deity',
    role: 'Judge',
    rarity: 'Mythic',
    biography: 'Anubis stands at the threshold between life and death. With jackal-keen senses, he guides the newly dead through the treacherous passages of the Duat and oversees the weighing of hearts against the feather of Ma\'at. His judgment is absolute, his patience infinite, and his loyalty to the dead unwavering. He invented embalming to preserve his father Osiris, and he will preserve any soul deemed worthy.',
    lockState: 'known',
    lockClue: 'The jackal-headed guardian watches the scales. Prove your heart is lighter than Ma\'at\'s feather.',
    unlockCondition: 'Pass the Trial of the Heart in the Egyptian campaign.',
    unlockQuestId: 'quest_heart_trial',
    signatureWeapon: 'Scales of Ma\'at',
    activeAbility: {
      name: 'Heart Judgment',
      description: 'Weighs the enemy\'s actions. If they attacked last turn, deal 200% damage. If they defended, drain their spirit.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Guide of the Dead',
      description: 'Reveals hidden passages in underworld regions. +15% dark resistance.',
      type: 'passive'
    },
    companionBonus: 'Counter-based damage bonus. Reveals hidden Duat paths. Dark resistance.',
    relatedQuests: ['quest_heart_trial', 'quest_duat_passage'],
    relationships: [
      { characterId: 'char_isis', type: 'ally', description: 'Raised by Isis after being abandoned.' },
      { characterId: 'char_horus', type: 'ally', description: 'Allies in the protection of Osiris\'s legacy.' }
    ],
    visualAssets: {
      portrait: '/images/characters/anubis/full-body.png',
      fullBody: '/images/characters/anubis/full-body.png',
      background: '/images/environments/egyptian-temple.png'
    },
    animationConfig: { idle: 'staff-sway', selected: 'scales-raise', unlock: 'jackal-reveal', ability: 'heart-weigh', victory: 'judgment-nod' },
    dialogueIntro: 'Every heart tells a story, Mythwalker. When your time comes, I will weigh yours. Until then... walk carefully.',
    sources: ['Book of the Dead', 'Pyramid Texts']
  },
  {
    id: 'char_horus',
    name: 'Horus',
    title: 'Sky God, Avenger of Osiris',
    pantheon: 'egyptian',
    type: 'deity',
    role: 'Warrior',
    rarity: 'Legendary',
    biography: 'Horus waged war against his uncle Set to reclaim the throne of Egypt stolen after Osiris\'s murder. With the head of a falcon and the Eye that sees all truth, Horus represents righteous vengeance and legitimate kingship. His left eye is the moon, his right eye the sun, and together they watch over Egypt from horizon to horizon.',
    lockState: 'known',
    lockClue: 'The falcon god seeks allies against the usurper.',
    unlockCondition: 'Defeat Set\'s forces in an Egyptian battle encounter.',
    signatureWeapon: 'Was Scepter of Kingship',
    activeAbility: {
      name: 'Eye of Horus',
      description: 'Marks an enemy, causing all attacks against them to deal 30% more damage for 3 turns.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Falcon\'s Sight',
      description: 'Increases critical hit chance by 15%. Reveals enemy health bars.',
      type: 'passive'
    },
    companionBonus: 'Enemy damage amplification mark. +15% critical hit chance.',
    relatedQuests: ['quest_throne_of_egypt', 'quest_eye_restoration'],
    relationships: [
      { characterId: 'char_isis', type: 'parent', description: 'Son of Isis and Osiris.' },
      { characterId: 'char_anubis', type: 'ally', description: 'Allied guardians of Osiris\'s legacy.' }
    ],
    visualAssets: {
      portrait: '/images/characters/horus/full-body.png',
      fullBody: '/images/characters/horus/full-body.png',
      background: '/images/environments/egyptian-temple.png'
    },
    animationConfig: { idle: 'falcon-watch', selected: 'scepter-raise', unlock: 'eye-reveal', ability: 'eye-mark', victory: 'falcon-cry' },
    dialogueIntro: 'My father\'s throne was stolen. My eye was torn from my skull. I fought for both and reclaimed both. Tell me, Mythwalker—what will you fight for?',
    sources: ['Contendings of Horus and Set', 'Pyramid Texts']
  },
  {
    id: 'char_isis',
    name: 'Isis',
    title: 'Goddess of Magic, Throne of Egypt',
    pantheon: 'egyptian',
    type: 'deity',
    role: 'Protector',
    rarity: 'Divine',
    biography: 'Isis is the most powerful magician among the gods. She reassembled her murdered husband Osiris, tricked Ra into revealing his secret name, and protected her son Horus from Set\'s assassins. Her magic heals what is broken, her wings shelter those she loves, and her cunning outmatches even the greatest divine minds. She is the throne upon which Egyptian civilization sits.',
    lockState: 'known',
    lockClue: 'The great enchantress guards the secrets of resurrection.',
    unlockCondition: 'Discover the secret of Osiris\'s resurrection in the Egyptian campaign.',
    signatureWeapon: 'Tyet Knot of Protection',
    activeAbility: {
      name: 'Wings of Protection',
      description: 'Creates a magical shield absorbing 50% of incoming damage for 3 turns.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Great Enchantress',
      description: '+20% effectiveness of all healing and protective abilities. Reveals hidden magical traps.',
      type: 'passive'
    },
    companionBonus: 'Damage absorption shield. Enhanced healing. Magical trap detection.',
    relatedQuests: ['quest_osiris_resurrection', 'quest_secret_name'],
    relationships: [
      { characterId: 'char_horus', type: 'parent', description: 'Mother of Horus, who she raised in hiding.' },
      { characterId: 'char_anubis', type: 'ally', description: 'Raised Anubis as her own child.' },
      { characterId: 'char_ra', type: 'rival', description: 'Tricked Ra into revealing his true name to gain power.' }
    ],
    visualAssets: {
      portrait: '/images/characters/isis/full-body.png',
      fullBody: '/images/characters/isis/full-body.png',
      background: '/images/environments/egyptian-temple.png'
    },
    animationConfig: { idle: 'wing-fold', selected: 'magic-weave', unlock: 'wing-unfurl', ability: 'shield-cast', victory: 'throne-sit' },
    dialogueIntro: 'Every broken thing can be mended, Mythwalker. I reassembled a god from scattered pieces. Your quest? I can guide you through worse.',
    sources: ['Metternich Stela', 'Great Hymn to Isis']
  },
  {
    id: 'char_thoth',
    name: 'Thoth',
    title: 'God of Knowledge, Inventor of Writing',
    pantheon: 'egyptian',
    type: 'deity',
    role: 'Scholar',
    rarity: 'Legendary',
    biography: 'Thoth records everything. He invented writing, measured time, and maintains the cosmic balance. With his ibis head and moon-disc crown, he stands as the divine scribe at every judgment, every ritual, every moment where knowledge makes the difference between order and chaos. He gambled with the moon to create five extra days of the year and once healed the Eye of Horus.',
    lockState: 'known',
    lockClue: 'The ibis-headed scribe appears where knowledge is pursued.',
    unlockCondition: 'Answer 10 quiz questions correctly in the Egyptian category.',
    signatureWeapon: 'Reed Pen of Creation',
    activeAbility: {
      name: 'Words of Power',
      description: 'Inscribes a protective glyph that heals 20% HP and grants +20% wisdom for 3 turns.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Divine Scribe',
      description: 'Quiz rewards doubled. +1 extra hint per quiz. Codex entries reveal 20% more lore.',
      type: 'passive'
    },
    companionBonus: 'Doubled quiz rewards. Extra hints. Enhanced Codex lore.',
    relatedQuests: ['quest_library_of_thoth', 'quest_moon_gambit'],
    relationships: [
      { characterId: 'char_ra', type: 'ally', description: 'Serves as Ra\'s vizier and keeper of cosmic records.' },
      { characterId: 'char_isis', type: 'ally', description: 'Helped Isis with spells to resurrect Osiris.' }
    ],
    visualAssets: {
      portrait: '/images/characters/thoth/full-body.png',
      fullBody: '/images/characters/thoth/full-body.png',
      background: '/images/environments/egyptian-temple.png'
    },
    animationConfig: { idle: 'scroll-read', selected: 'pen-raise', unlock: 'glyph-reveal', ability: 'word-inscribe', victory: 'scroll-nod' },
    dialogueIntro: 'Ah, a mind that seeks. How refreshing. Most mortals prefer ignorance—it hurts less. But you and I, Mythwalker, we know that knowledge is the only true weapon.',
    sources: ['Book of Thoth', 'Pyramid Texts']
  },
  {
    id: 'char_sekhmet',
    name: 'Sekhmet',
    title: 'The Lioness, Eye of Ra\'s Wrath',
    pantheon: 'egyptian',
    type: 'deity',
    role: 'Destroyer',
    rarity: 'Mythic',
    biography: 'Sekhmet is war incarnate. Ra sent her to punish humanity, and she nearly destroyed them all—drunk on blood, unstoppable in her fury. The gods tricked her with beer dyed red as blood to stop the slaughter. Now she serves as both healer and destroyer: her breath creates deserts, her rage flattens armies, and her medical knowledge cures plagues. She is the reminder that divine power has a terrible, beautiful edge.',
    lockState: 'partial',
    lockClue: 'The lioness stirs when blood is spilled. Approach with caution.',
    unlockCondition: 'Survive a boss encounter with Sekhmet\'s test in the Egyptian campaign.',
    signatureWeapon: 'Ankh of Destruction',
    activeAbility: {
      name: 'Lioness Fury',
      description: 'Enters berserker mode: +50% damage, -20% defense for 4 turns. Attacks hit all enemies.',
      type: 'active'
    },
    passiveAbility: {
      name: 'Plague and Cure',
      description: 'Attacks have 10% chance to inflict poison. Player immune to poison.',
      type: 'passive'
    },
    companionBonus: 'Area damage attacks. Poison infliction. Poison immunity.',
    relatedQuests: ['quest_sekhmet_trial', 'quest_beer_deception'],
    relationships: [
      { characterId: 'char_ra', type: 'parent', description: 'Created by Ra as his weapon of divine punishment.' },
      { characterId: 'char_isis', type: 'rival', description: 'Isis feared Sekhmet\'s uncontrollable rage.' }
    ],
    visualAssets: {
      portrait: '/images/characters/sekhmet/full-body.png',
      fullBody: '/images/characters/sekhmet/full-body.png',
      background: '/images/environments/egyptian-temple.png'
    },
    animationConfig: { idle: 'lion-prowl', selected: 'roar', unlock: 'fire-reveal', ability: 'fury-unleash', victory: 'dominance-stand' },
    dialogueIntro: 'I was made to destroy, Mythwalker. Ra pointed, and I obeyed. Now tell me—should I point at you, or beside you?',
    sources: ['Book of the Heavenly Cow', 'Litany of Sekhmet']
  }
];
