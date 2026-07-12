import { Relic } from '../../types/game';

export const relics: Relic[] = [
  // --- GREEK RELICS (5) ---
  {
    id: 'golden_fleece',
    name: 'Golden Fleece Fragment',
    pantheon: 'greek',
    rarity: 'Epic',
    description: 'A glowing patch of fleece taken from the legendary ram of Colchis.',
    passiveEffect: 'Fleece Warmth: Restores 5% of max health at the end of each combat round.',
    lore: 'The Golden Fleece was the target of Jason and the Argonauts, representing royal authority and physical restoration.',
    imageUrl: '/images/relics/golden_fleece.webp'
  },
  {
    id: 'ariadne_thread',
    name: 'Ariadne\'s Thread',
    pantheon: 'greek',
    rarity: 'Rare',
    description: 'A ball of shining red thread used to navigate the Crete Labyrinth.',
    passiveEffect: 'Pathfinder: Increases the player\'s dodge chance by 10% during boss encounters.',
    lore: 'Given to Theseus by Ariadne, this magical thread allowed him to escape the Labyrinth after slaying the Minotaur.',
    imageUrl: '/images/relics/ariadne_thread.webp'
  },
  {
    id: 'oracle_crystal',
    name: 'Oracle Crystal Shard',
    pantheon: 'greek',
    rarity: 'Epic',
    description: 'A crystal vaporized in the chasm of Delphi, holding prophetic echoes.',
    passiveEffect: 'Sight of Delphi: Automatically highlights one incorrect answer in the Quiz Arena.',
    lore: 'Sourced from the Delphi sanctuary, it resonates with the prophetic visions of Apollo.',
    imageUrl: '/images/relics/oracle_crystal.webp'
  },
  {
    id: 'titan_chain',
    name: 'Titan Chain Link',
    pantheon: 'greek',
    rarity: 'Epic',
    description: 'A heavy metal link used to bind Titans in the pits of Tartarus.',
    passiveEffect: 'Tartarus Shackle: Reduces enemy agility by 15% during battles.',
    lore: 'Forged by the elder cyclopes, these chains successfully held Cronus and the Titans in Tartarus.',
    imageUrl: '/images/relics/titan_chain.webp'
  },
  {
    id: 'cap_hades_relic',
    name: 'Helm of Darkness Fragment',
    pantheon: 'greek',
    rarity: 'Legendary',
    description: 'A piece of dark fabric from Hades\'s invisibility helmet.',
    passiveEffect: 'Unseen Stance: Grants the player +12% evasion and prevents critical hits against them.',
    lore: 'Forged for Hades during the Titanomachy, it grants absolute concealment from physical and divine eyes.',
    imageUrl: '/images/relics/helm_darkness.webp'
  },

  // --- NORSE RELICS (5) ---
  {
    id: 'yggdrasil_seed',
    name: 'Yggdrasil Seed',
    pantheon: 'norse',
    rarity: 'Legendary',
    description: 'A small glowing seed collected from the roots of the World Tree.',
    passiveEffect: 'Nine Realms Shield: Grants 10% resistance to all magical elemental damage.',
    lore: 'The World Tree Yggdrasil connects the nine worlds of Norse cosmology. Its seeds contain trace elements of cosmic order.',
    imageUrl: '/images/relics/yggdrasil_seed.webp'
  },
  {
    id: 'odin_raven_feather',
    name: 'Odin\'s Raven Feather',
    pantheon: 'norse',
    rarity: 'Epic',
    description: 'A dark, glossy feather shed by Huginn or Muninn.',
    passiveEffect: 'Thought & Memory: Earns +15% more XP from reading lore codex entries.',
    lore: 'Odin sends his ravens Huginn (Thought) and Muninn (Memory) to fly around the cosmos, reporting secrets.',
    imageUrl: '/images/relics/raven_feather.webp'
  },
  {
    id: 'valkyrie_sigil',
    name: 'Valkyrie Sigil',
    pantheon: 'norse',
    rarity: 'Rare',
    description: 'A runic silver medallion worn by Odin\'s battle maidens.',
    passiveEffect: 'Valkyrie Grace: Increases physical weapon critical hit chance by 8%.',
    lore: 'Used by Valkyries to mark brave warriors destined for the halls of Valhalla.',
    imageUrl: '/images/relics/valkyrie_sigil.webp'
  },
  {
    id: 'mimir_wisdom_eye',
    name: 'Mimir\'s Wisdom Shard',
    pantheon: 'norse',
    rarity: 'Legendary',
    description: 'A fossilized drop of water from Mimir\'s well of cosmic secrets.',
    passiveEffect: 'Well of Secrets: Adds 15 seconds to all battle quiz question timers.',
    lore: 'Odin sacrificed his eye to drink from Mimir\'s well and acquire supreme wisdom of the runes.',
    imageUrl: '/images/relics/mimir_wisdom.webp'
  },
  {
    id: 'draupnir_ring',
    name: 'Draupnir Gold Ring',
    pantheon: 'norse',
    rarity: 'Epic',
    description: 'A duplicate of Odin\'s magical self-multiplying gold ring.',
    passiveEffect: 'Golden Multiplication: Grants +20% bonus coins earned from quest rewards.',
    lore: 'Forged by the dwarves Brokkr and Sindri, Draupnir drips eight identical rings every ninth night.',
    imageUrl: '/images/relics/draupnir.webp'
  },

  // --- EGYPTIAN RELICS (5) ---
  {
    id: 'eye_of_horus_relic',
    name: 'Eye of Horus (Wedjat)',
    pantheon: 'egyptian',
    rarity: 'Legendary',
    description: 'The sacred wedjat symbol, representing royal protection and healing.',
    passiveEffect: 'Wedjat Ward: 15% chance to dodge magical spells and heal for 20 HP.',
    lore: 'Lost during Horus\'s battle with Seth, the eye was restored by Thoth and offered to revive Osiris.',
    imageUrl: '/images/relics/eye_horus.webp'
  },
  {
    id: 'feather_of_maat',
    name: 'Feather of Ma\'at',
    pantheon: 'egyptian',
    rarity: 'Legendary',
    description: 'The pure ostrich feather of truth, law, and cosmic order.',
    passiveEffect: 'Balance of Truth: Increases spirit capacity by +25 and reduces ability costs by 15%.',
    lore: 'The feather against which hearts are weighed in Anubis\'s weighing ceremony to judge souls.',
    imageUrl: '/images/relics/feather_maat.webp'
  },
  {
    id: 'scale_anubis_relic',
    name: 'Scale of Anubis Fragment',
    pantheon: 'egyptian',
    rarity: 'Epic',
    description: 'A balance weight from the scale of the Weighing of the Heart.',
    passiveEffect: 'Weight of Doom: Basic attacks reduce enemy defense attributes by 10% for 2 rounds.',
    lore: 'Used by the jackal god to weigh hearts against the feather of truth in the Halls of Ma\'at.',
    imageUrl: '/images/relics/scale_anubis.webp'
  },
  {
    id: 'tyet_knot',
    name: 'Tyet (Knot of Isis)',
    pantheon: 'egyptian',
    rarity: 'Rare',
    description: 'A red amulet representing the blood of Isis and protective magic.',
    passiveEffect: 'Isis Protection: Absorbs up to 40 elemental magic damage at the start of battle.',
    lore: 'Worn by mummies to invoke Isis\'s protective wings and resurrection spells.',
    imageUrl: '/images/relics/tyet_knot.webp'
  },
  {
    id: 'scarab_khepri',
    name: 'Scarab of Khepri',
    pantheon: 'egyptian',
    rarity: 'Rare',
    description: 'A carved stone beetle representing the rising sun and rebirth.',
    passiveEffect: 'Dawn Rebirth: Automatically revives the player with 15% health once per battle.',
    lore: 'Scarab amulets are symbols of renewal, representing the beetle god who rolls the sun across the sky.',
    imageUrl: '/images/relics/scarab_khepri.webp'
  }
];
