import { MythicEntity } from '../../types/game';

export const heroes: MythicEntity[] = [
  // --- GREEK HEROES (7) ---
  {
    id: 'heracles',
    name: 'Heracles',
    type: 'hero',
    pantheon: 'greek',
    description: 'The greatest Greek hero, known for his incredible strength and the Twelve Labors.',
    lore: 'Son of Zeus and the mortal Alcmene, Heracles was driven mad by Hera and slew his own family. To atone, he completed twelve impossible labors, ultimately ascending to Mount Olympus as a full god upon his death.',
    attributes: { strength: 99, wisdom: 65, insight: 70, endurance: 98, agility: 75, spirit: 85 },
    aliases: ['Hercules', 'Slayer of the Hydra', 'Club Bearer'],
    symbols: ['Lion Skin Cloak', 'Wooden Club', 'Bow and Arrows'],
    family: {
      parents: ['Zeus', 'Alcmene'],
      children: ['Hyllus', 'Alexiares', 'Anicetus'],
      spouses: ['Megara', 'Deianira', 'Hebe'],
      siblings: ['Apollo', 'Ares', 'Athena', 'Hermes', 'Iphicles']
    },
    abilities: ['Nemean Hide Defense', 'Hydra Arrow Strike', 'Colossus Slam'],
    imageUrl: '/images/entities/heracles.webp',
    sources: ['Apollodorus\'s Library', 'Euripides\'s Heracles']
  },
  {
    id: 'perseus',
    name: 'Perseus',
    type: 'hero',
    pantheon: 'greek',
    description: 'The slayer of Medusa and rescuer of Andromeda, aided by divine artifacts.',
    lore: 'Perseus was sent on a deadly quest to fetch the head of the Gorgon Medusa. Guided by Hermes and Athena, he acquired winged sandals, a polished shield, a sickle, and the helm of invisibility, successfully slaying the monster.',
    attributes: { strength: 80, wisdom: 85, insight: 90, endurance: 85, agility: 92, spirit: 80 },
    aliases: ['Gorgon Slayer', 'Rescuer of Andromeda'],
    symbols: ['Medusa\'s Head', 'Winged Sandals', 'Harpe Sickle Sword'],
    family: {
      parents: ['Zeus', 'Danae'],
      children: ['Perses', 'Alcaeus', 'Electryon'],
      spouses: ['Andromeda'],
      siblings: ['Heracles', 'Apollo', 'Athena']
    },
    abilities: ['Gorgon petrification', 'Winged sandals flight', 'Mirrored shield dodge'],
    imageUrl: '/images/entities/perseus.webp',
    sources: ['Ovid\'s Metamorphoses', 'Apollodorus\'s Library']
  },
  {
    id: 'achilles',
    name: 'Achilles',
    type: 'hero',
    pantheon: 'greek',
    description: 'The champion of the Trojan War, virtually invulnerable except for his heel.',
    lore: 'Born to the nymph Thetis, Achilles was dipped in the River Styx, making him invulnerable except for his heel where she held him. He became the central hero of Homer\'s Iliad, choosing a short, glorious life over a long, forgotten one.',
    attributes: { strength: 95, wisdom: 70, insight: 75, endurance: 96, agility: 94, spirit: 82 },
    aliases: ['Swift-Footed Achilles', 'Champion of Phthia'],
    symbols: ['Shield of Achilles', 'Myrmidon Spear', 'Golden Armor'],
    family: {
      parents: ['Peleus', 'Thetis'],
      children: ['Neoptolemus'],
      spouses: ['Deidamia'],
      siblings: []
    },
    abilities: ['Stygian Shielding', 'Swift-Footed Thrust', 'Heroic Spear throw'],
    imageUrl: '/images/entities/achilles.webp',
    sources: ['Homer\'s Iliad', 'Statius\'s Achilleid']
  },
  {
    id: 'odysseus',
    name: 'Odysseus',
    type: 'hero',
    pantheon: 'greek',
    description: 'The cunning king of Ithaca who conceived the Trojan Horse and survived a 10-year odyssey.',
    lore: 'Famous for his brilliant intellect and resourcefulness, Odysseus spent ten years fighting at Troy and another ten years wandering the seas to return home to his wife Penelope, outsmarting monsters and gods alike.',
    attributes: { strength: 80, wisdom: 96, insight: 98, endurance: 90, agility: 86, spirit: 88 },
    aliases: ['Ulysses', 'The Cunning One', 'Sacker of Cities'],
    symbols: ['Trojan Horse', 'Great Bow of Odysseus', 'Sailor Chiton'],
    family: {
      parents: ['Laertes', 'Anticlea'],
      children: ['Telemachus', 'Telegonus'],
      spouses: ['Penelope'],
      siblings: []
    },
    abilities: ['Cunning Stratagem', 'Precision Bowshot', 'Sirens\' Immunity'],
    imageUrl: '/images/entities/odysseus.webp',
    sources: ['Homer\'s Odyssey', 'Homer\'s Iliad']
  },
  {
    id: 'theseus',
    name: 'Theseus',
    type: 'hero',
    pantheon: 'greek',
    description: 'The founder-king of Athens who navigated the Crete Labyrinth to slay the Minotaur.',
    lore: 'Theseus traveled from Troezen to Athens, defeating six labors along the way. In Crete, with the help of Ariadne and her ball of string, he successfully navigated the Labyrinth and killed the half-bull Minotaur.',
    attributes: { strength: 88, wisdom: 82, insight: 85, endurance: 90, agility: 88, spirit: 80 },
    aliases: ['Slayer of the Minotaur', 'King of Athens'],
    symbols: ['Labyrinth Thread', 'Bronze Club', 'Bull Horns'],
    family: {
      parents: ['Aegeus or Poseidon', 'Aethra'],
      children: ['Hippolytus', 'Demophon'],
      spouses: ['Ariadne', 'Phaedra'],
      siblings: []
    },
    abilities: ['Labyrinth Pathfinder', 'Minotaur Grapple', 'Athenian Strike'],
    imageUrl: '/images/entities/theseus.webp',
    sources: ['Plutarch\'s Life of Theseus', 'Ovid\'s Metamorphoses']
  },
  {
    id: 'jason',
    name: 'Jason',
    type: 'hero',
    pantheon: 'greek',
    description: 'The leader of the Argonauts who sailed the Argo to capture the legendary Golden Fleece.',
    lore: 'Sent by his usurper uncle Pelias to retrieve the Golden Fleece, Jason assembled Greece\'s greatest heroes (the Argonauts) and sailed to Colchis. Supported by the sorceress Medea, he overcame the dragon guarding the fleece.',
    attributes: { strength: 82, wisdom: 80, insight: 84, endurance: 85, agility: 85, spirit: 82 },
    aliases: ['Leader of the Argonauts'],
    symbols: ['Golden Fleece', 'Ship Argo', 'One Sandal'],
    family: {
      parents: ['Aeson', 'Alcimede'],
      children: ['Mermerus', 'Pheres'],
      spouses: ['Medea', 'Creusa'],
      siblings: []
    },
    abilities: ['Argonaut Call', 'Golden Fleece Shield', 'Medea\'s Potion buff'],
    imageUrl: '/images/entities/jason.webp',
    sources: ['Apollonius Rhodius\'s Argonautica', 'Euripides\'s Medea']
  },
  {
    id: 'atalanta',
    name: 'Atalanta',
    type: 'hero',
    pantheon: 'greek',
    description: 'The swift-footed huntress who drew first blood in the Calydonian Boar Hunt.',
    lore: 'Abandoned on a mountaintop and raised by a bear, Atalanta became a fearsome huntress sworn to virginity. She joined the Argonauts, won the Calydonian Boar Hunt, and challenged suitors to a footrace, lost only to golden apples.',
    attributes: { strength: 80, wisdom: 84, insight: 90, endurance: 88, agility: 98, spirit: 80 },
    aliases: ['The Swift Huntress', 'Slayer of Centaurs'],
    symbols: ['Golden Apples', 'Calydonian Boar Hide', 'Forest Bow'],
    family: {
      parents: ['Iasus', 'Clymene'],
      children: ['Parthenopaeus'],
      spouses: ['Hippomenes'],
      siblings: []
    },
    abilities: ['Apex Speed', 'First Blood arrow', 'Golden Apple diversion'],
    imageUrl: '/images/entities/atalanta.webp',
    sources: ['Ovid\'s Metamorphoses', 'Apollodorus\'s Library']
  },

  // --- NORSE HEROES (5) ---
  {
    id: 'sigurd',
    name: 'Sigurd',
    type: 'hero',
    pantheon: 'norse',
    description: 'The legendary dragon slayer who killed Fafnir and bathed in his blood for invulnerability.',
    lore: 'Sigurd reforged his father\'s broken sword Gram. Advised by Odin, he dug a pit to ambush and slay the dragon Fafnir. Roasting the dragon\'s heart allowed him to understand birds, and bathing in the blood made him invulnerable.',
    attributes: { strength: 96, wisdom: 75, insight: 88, endurance: 96, agility: 82, spirit: 88 },
    aliases: ['Siegfried', 'Slayer of Fafnir', 'Fafnisbane'],
    symbols: ['Sword Gram', 'Fafnir\'s Heart', 'Dragon Blood Shield'],
    family: {
      parents: ['Sigmund', 'Hjordis'],
      children: ['Aslaug'],
      spouses: ['Brynhild (Valkyrie)', 'Gudrun'],
      siblings: []
    },
    abilities: ['Gram Pierce', 'Dragon Blood barrier', 'Language of Birds'],
    imageUrl: '/images/entities/sigurd.webp',
    sources: ['Völsunga saga', 'Poetic Edda (Fáfnismál)']
  },
  {
    id: 'ragnar_lothbrok',
    name: 'Ragnar Lothbrok',
    type: 'hero',
    pantheon: 'norse',
    description: 'The legendary Viking king and raider who claimed descent from Odin.',
    lore: 'Ragnar was a historical and mythological Norse chieftain. Famous for raiding England and France, wearing protective shaggy breeches to slay giant serpents, he met his end in a snake pit, predicting his sons\' vengeance.',
    attributes: { strength: 90, wisdom: 85, insight: 88, endurance: 92, agility: 84, spirit: 90 },
    aliases: ['Shaggy-Breeches', 'Viking King'],
    symbols: ['Raven Banner', 'Snake Pit', 'Viking Shield'],
    family: {
      parents: ['Sigurd Ring'],
      children: ['Ivar the Boneless', 'Bjorn Ironside', 'Sigurd Snake-in-the-Eye', 'Ubba'],
      spouses: ['Lagertha', 'Thora Town-Hart', 'Aslaug'],
      siblings: []
    },
    abilities: ['Viking Raid call', 'Raven Banner buff', 'Snake Pit resilience'],
    imageUrl: '/images/entities/ragnar.webp',
    sources: ['Saga of Ragnar Lodbrok', 'Gesta Danorum']
  },
  {
    id: 'beowulf',
    name: 'Beowulf',
    type: 'hero',
    pantheon: 'norse',
    description: 'The Geatish hero who defeated Grendel, Grendel\'s Mother, and a horde dragon.',
    lore: 'Possessing the strength of thirty men, Beowulf traveled to Denmark to save King Hrothgar\'s hall by ripping off the arm of the monster Grendel. He slew Grendel\'s Mother underwater and died defeating a treasure dragon.',
    attributes: { strength: 98, wisdom: 80, insight: 82, endurance: 95, agility: 78, spirit: 86 },
    aliases: ['Slayer of Grendel', 'King of the Geats'],
    symbols: ['Grendel\'s Claw', 'Giant\'s Sword', 'Golden Armor Vest'],
    family: {
      parents: ['Ecgtheow'],
      children: [],
      spouses: [],
      siblings: []
    },
    abilities: ['Grendel Grip', 'Giant-Sword Sunder', 'Dragon\'s Bane stance'],
    imageUrl: '/images/entities/beowulf.webp',
    sources: ['Beowulf (Old English Epic)']
  },
  {
    id: 'starkad',
    name: 'Starkad',
    type: 'hero',
    pantheon: 'norse',
    description: 'The giant-born warrior cursed by Thor and blessed by Odin to live three lifetimes.',
    lore: 'Blessed by Odin with heroic talent and long life, but cursed by Thor with giant heritage, multi-arms, and three acts of infamy. Starkad is a tragic, colossal warrior of raw combat power and sorrow.',
    attributes: { strength: 96, wisdom: 80, insight: 70, endurance: 98, agility: 70, spirit: 82 },
    aliases: ['Starcatherus', 'The Old Giant Warrior'],
    symbols: ['Rune Sword', 'Battle Scars', 'Twin Axes'],
    family: {
      parents: ['Storverk'],
      children: [],
      spouses: [],
      siblings: []
    },
    abilities: ['Giant Strength slash', 'Three Lifetimes shield', 'Thor\'s Curse counter'],
    imageUrl: '/images/entities/starkad.webp',
    sources: ['Gesta Danorum', 'Gautreks saga']
  },
  {
    id: 'egil',
    name: 'Egil Skallagrimsson',
    type: 'hero',
    pantheon: 'norse',
    description: 'The warrior-poet who used runic magic and brute strength to survive Kings\' wraths.',
    lore: 'Egil was a complex hero: a brutal, ugly warrior in combat and a brilliant, emotional poet. He carved runes to detect poison, fought duels, and composed the famous poem Sonatorrek to grieve his lost sons.',
    attributes: { strength: 92, wisdom: 92, insight: 94, endurance: 90, agility: 80, spirit: 94 },
    aliases: ['Egil the Skald', 'The Rune Poet'],
    symbols: ['Drinking Horn', 'Rune staff', 'Poetry Scroll'],
    family: {
      parents: ['Skallagrim', 'Bera'],
      children: ['Thorgerdr', 'Bodvar', 'Gunnar'],
      spouses: ['Asgerdr'],
      siblings: ['Thorolf']
    },
    abilities: ['Rune Detection ward', 'Skaldic Verse heal', 'Berserk Cleave'],
    imageUrl: '/images/entities/egil.webp',
    sources: ['Egil\'s Saga']
  },

  // --- EGYPTIAN HEROES (3) ---
  {
    id: 'imhotep',
    name: 'Imhotep',
    type: 'hero',
    pantheon: 'egyptian',
    description: 'The architect, physician, and sage who was later deified as a god of healing.',
    lore: 'A historical chancellor to Pharaoh Djoser, Imhotep designed the step pyramid at Saqqara. Renowned for his wisdom, medicine, and knowledge of scriptures, he was mythologized as a son of Ptah and god of healing.',
    attributes: { strength: 60, wisdom: 99, insight: 98, endurance: 80, agility: 74, spirit: 95 },
    aliases: ['Son of Ptah', 'Sage of Saqqara', 'Lord of Healing'],
    symbols: ['Scroll of Papyrus', 'Step Pyramid model', 'Medicine Bowl'],
    family: {
      parents: ['Ptah', 'Kheredu-ankh'],
      children: [],
      spouses: [],
      siblings: []
    },
    abilities: ['Architectural Ward', 'Physician\'s Tonic', 'Divine Blueprint shield'],
    imageUrl: '/images/entities/imhotep.webp',
    sources: ['Famine Stele', 'Pliny the Elder\'s writings']
  },
  {
    id: 'khaemwaset',
    name: 'Prince Khaemwaset',
    type: 'hero',
    pantheon: 'egyptian',
    description: 'The scholar-prince, magician, and protector of ancient temples.',
    lore: 'A son of Ramesses II, Khaemwaset was Egypt\'s first "archaeologist," restoring ancient pyramids. In Egyptian folklore, he was Setne Khaemwaset, a powerful magician who entered tombs to acquire the sacred Book of Thoth.',
    attributes: { strength: 70, wisdom: 98, insight: 99, endurance: 82, agility: 76, spirit: 98 },
    aliases: ['Setne Khaemwaset', 'The Wizard Prince'],
    symbols: ['Book of Thoth', 'Temple Relic', 'Hieroglyph staff'],
    family: {
      parents: ['Ramesses II', 'Isetnofret'],
      children: [],
      spouses: [],
      siblings: ['Merneptah', 'Bintanath']
    },
    abilities: ['Thoth\'s Forbidden Spell', 'Tomb Ward break', 'Relic Channeling'],
    imageUrl: '/images/entities/khaemwaset.webp',
    sources: ['Stories of Setne Khaemwaset (Demotic Papyrus)']
  },
  {
    id: 'sinuhe',
    name: 'Sinuhe',
    type: 'hero',
    pantheon: 'egyptian',
    description: 'The royal courtier who fled Egypt, became a legendary warrior in Syria, and returned home.',
    lore: 'Following the death of Amenemhat I, Sinuhe fled to Retjenu (Syria). He married a chieftain\'s daughter, defeated a mighty local giant in single combat, and was eventually welcomed back to Egypt with full royal honors.',
    attributes: { strength: 86, wisdom: 85, insight: 88, endurance: 92, agility: 90, spirit: 78 },
    aliases: ['Sinuhe the Exile', 'Chieftain of Retjenu'],
    symbols: ['Egyptian Dagger', 'Foreign Bow', 'Exile Cloak'],
    family: {
      parents: [],
      children: [],
      spouses: [],
      siblings: []
    },
    abilities: ['Champion\'s Duel strike', 'Exile Endurance shield', 'Foreign Bow volley'],
    imageUrl: '/images/entities/sinuhe.webp',
    sources: ['The Story of Sinuhe (Middle Kingdom Literature)']
  }
];
