import { MythicEntity } from '../../types/game';

export const deities: MythicEntity[] = [
  // --- GREEK PANTHEON (10) ---
  {
    id: 'zeus',
    name: 'Zeus',
    type: 'god',
    pantheon: 'greek',
    description: 'The King of the Gods, ruler of Mount Olympus, and god of the sky, weather, thunder, and lightning.',
    lore: 'Zeus overthrew his father Cronus to become the supreme ruler of the cosmos. He rules from Mount Olympus and maintains order and justice among gods and mortals, brandishing his mighty thunderbolt.',
    attributes: { strength: 95, wisdom: 85, insight: 90, endurance: 90, agility: 80, spirit: 98 },
    aliases: ['Jupiter', 'Cloud-Gatherer', 'Father of Gods and Men'],
    symbols: ['Thunderbolt', 'Eagle', 'Oak Tree', 'Scepter'],
    family: {
      parents: ['Cronus', 'Rhea'],
      children: ['Athena', 'Apollo', 'Artemis', 'Ares', 'Hermes', 'Dionysus', 'Heracles', 'Perseus'],
      spouses: ['Hera'],
      siblings: ['Poseidon', 'Hades', 'Hera', 'Demeter', 'Hestia']
    },
    abilities: ['Thunderbolt Strike', 'Storm Call', 'Aegis Shielding'],
    imageUrl: '/images/entities/zeus.webp',
    sources: ['Hesiod\'s Theogony', 'Homer\'s Iliad']
  },
  {
    id: 'hera',
    name: 'Hera',
    type: 'god',
    pantheon: 'greek',
    description: 'Queen of the Gods, goddess of marriage, family, childbirth, and the stars.',
    lore: 'Hera is the wife and sister of Zeus. Known for her majestic and solemn nature, she is the fierce protector of marriage and monogamy, though she often seeks vengeance against Zeus\'s paramours.',
    attributes: { strength: 80, wisdom: 92, insight: 95, endurance: 85, agility: 70, spirit: 90 },
    aliases: ['Juno', 'Queen of Heaven', 'White-Armed Goddess'],
    symbols: ['Peacock', 'Pomegranate', 'Diadem', 'Lily'],
    family: {
      parents: ['Cronus', 'Rhea'],
      children: ['Ares', 'Hephaestus', 'Hebe', 'Eileithyia'],
      spouses: ['Zeus'],
      siblings: ['Zeus', 'Poseidon', 'Hades', 'Demeter', 'Hestia']
    },
    abilities: ['Royal Decree', 'Starry Veil', 'Matriarch\'s Wrath'],
    imageUrl: '/images/entities/hera.webp',
    sources: ['Homer\'s Iliad', 'Homeric Hymn to Hera']
  },
  {
    id: 'poseidon',
    name: 'Poseidon',
    type: 'god',
    pantheon: 'greek',
    description: 'God of the sea, storms, earthquakes, and horses.',
    lore: 'As one of the Big Three, Poseidon controls the oceans and all waters. With a strike of his Trident, he can shatter rocks, create tidal waves, and summon devastating tempests.',
    attributes: { strength: 94, wisdom: 80, insight: 85, endurance: 92, agility: 75, spirit: 95 },
    aliases: ['Neptune', 'Earth-Shaker', 'Storm Lord'],
    symbols: ['Trident', 'Dolphin', 'Horse', 'Bull'],
    family: {
      parents: ['Cronus', 'Rhea'],
      children: ['Triton', 'Pegasus', 'Polyphemus', 'Theseus'],
      spouses: ['Amphitrite'],
      siblings: ['Zeus', 'Hades', 'Hera', 'Demeter', 'Hestia']
    },
    abilities: ['Tsunami Slam', 'Earthquake Shiver', 'Oceanic Surge'],
    imageUrl: '/images/entities/poseidon.webp',
    sources: ['Homer\'s Odyssey', 'Hesiod\'s Theogony']
  },
  {
    id: 'hades',
    name: 'Hades',
    type: 'god',
    pantheon: 'greek',
    description: 'God of the Underworld, the dead, and hidden wealth of the earth.',
    lore: 'Hades was allotted the dark underworld after the Titanomachy. He guards the souls of the deceased, assisted by his multi-headed hound Cerberus, maintaining the balance between life and death.',
    attributes: { strength: 90, wisdom: 88, insight: 94, endurance: 95, agility: 70, spirit: 96 },
    aliases: ['Pluto', 'The Rich One', 'Lord of the Dead'],
    symbols: ['Helm of Darkness', 'Bident', 'Cerberus', 'Key of Hades'],
    family: {
      parents: ['Cronus', 'Rhea'],
      children: [],
      spouses: ['Persephone'],
      siblings: ['Zeus', 'Poseidon', 'Hera', 'Demeter', 'Hestia']
    },
    abilities: ['Soul Reap', 'Shadow Cloak', 'Summon Cerberus'],
    imageUrl: '/images/entities/hades.webp',
    sources: ['Homer\'s Iliad', 'Homeric Hymn to Demeter']
  },
  {
    id: 'athena',
    name: 'Athena',
    type: 'god',
    pantheon: 'greek',
    description: 'Goddess of wisdom, strategic warfare, handicraft, and reason.',
    lore: 'Born fully armored from the forehead of Zeus, Athena represents intellectual strategy in combat, contrasting Ares\'s raw bloodlust. She is the patron goddess of Athens and heroes.',
    attributes: { strength: 88, wisdom: 98, insight: 96, endurance: 88, agility: 85, spirit: 94 },
    aliases: ['Minerva', 'Pallas Athena', 'Goddess of the Aegis'],
    symbols: ['Owl', 'Olive Tree', 'Aegis Shield', 'Spear'],
    family: {
      parents: ['Zeus', 'Metis'],
      children: [],
      spouses: [],
      siblings: ['Apollo', 'Artemis', 'Ares', 'Hermes', 'Hephaestus']
    },
    abilities: ['Tactical Strike', 'Aegis Shield', 'Wisdom Glow'],
    imageUrl: '/images/entities/athena.webp',
    sources: ['Hesiod\'s Theogony', 'Pindar\'s Odes']
  },
  {
    id: 'apollo',
    name: 'Apollo',
    type: 'god',
    pantheon: 'greek',
    description: 'God of light, the sun, music, poetry, archery, medicine, and prophecy.',
    lore: 'The twin brother of Artemis, Apollo is the archetype of youth and beauty. He rides his chariot across the sky, inspires the Oracle of Delphi, and heals or brings plagues with his golden arrows.',
    attributes: { strength: 82, wisdom: 90, insight: 98, endurance: 80, agility: 90, spirit: 95 },
    aliases: ['Phoebus', 'The Sun Archer', 'Pythian Apollo'],
    symbols: ['Lyre', 'Laurel Wreath', 'Bow and Arrow', 'Raven'],
    family: {
      parents: ['Zeus', 'Leto'],
      children: ['Asclepius', 'Orpheus', 'Aristaeus'],
      spouses: [],
      siblings: ['Artemis', 'Athena', 'Ares', 'Hermes', 'Hephaestus']
    },
    abilities: ['Solar Flare Arrow', 'Healing Melody', 'Prophetic Vision'],
    imageUrl: '/images/entities/apollo.webp',
    sources: ['Homeric Hymn to Apollo', 'Ovid\'s Metamorphoses']
  },
  {
    id: 'artemis',
    name: 'Artemis',
    type: 'god',
    pantheon: 'greek',
    description: 'Goddess of the hunt, the wilderness, wild animals, childbirth, and the moon.',
    lore: 'Artemis is the maiden huntress who roams the forests of Greece with her band of nymphs. Armed with a silver bow, she guards wild nature and acts as protector of young girls.',
    attributes: { strength: 85, wisdom: 87, insight: 92, endurance: 90, agility: 96, spirit: 91 },
    aliases: ['Diana', 'Mistress of Animals', 'Moon Huntress'],
    symbols: ['Bow and Arrow', 'Stag', 'Hunting Dog', 'Crescent Moon'],
    family: {
      parents: ['Zeus', 'Leto'],
      children: [],
      spouses: [],
      siblings: ['Apollo', 'Athena', 'Ares', 'Hermes', 'Hephaestus']
    },
    abilities: ['Moon Arrow barrage', 'Wild Beast Summon', 'Swift Tracker'],
    imageUrl: '/images/entities/artemis.webp',
    sources: ['Callimachus\'s Hymn to Artemis', 'Homer\'s Odyssey']
  },
  {
    id: 'ares',
    name: 'Ares',
    type: 'god',
    pantheon: 'greek',
    description: 'God of chaotic war, physical violence, courage, and bloodshed.',
    lore: 'Ares represents the physical, violent, and untamed aspect of war. He excels in raw combat power, marching into battle accompanied by his sons Phobos (Fear) and Deimos (Terror).',
    attributes: { strength: 98, wisdom: 60, insight: 65, endurance: 94, agility: 82, spirit: 88 },
    aliases: ['Mars', 'Bane of Mortals', 'Spear Wielder'],
    symbols: ['Spear', 'Helmet', 'Boar', 'Vulture'],
    family: {
      parents: ['Zeus', 'Hera'],
      children: ['Phobos', 'Deimos', 'Enyo', 'Eros'],
      spouses: [],
      siblings: ['Athena', 'Apollo', 'Artemis', 'Hermes', 'Hephaestus']
    },
    abilities: ['Berserk Rage', 'Bloodlust Spear', 'Vanguard Leap'],
    imageUrl: '/images/entities/ares.webp',
    sources: ['Homer\'s Iliad', 'Homeric Hymn to Ares']
  },
  {
    id: 'aphrodite',
    name: 'Aphrodite',
    type: 'god',
    pantheon: 'greek',
    description: 'Goddess of love, beauty, pleasure, passion, and procreation.',
    lore: 'Born from the sea foam after Uranus was castrated, Aphrodite possesses irresistible beauty. Her charms can sway both mortal and immortal hearts, instigating grand conflicts like the Trojan War.',
    attributes: { strength: 70, wisdom: 85, insight: 94, endurance: 80, agility: 80, spirit: 94 },
    aliases: ['Venus', 'Foam-Born Goddess', 'Cytherea'],
    symbols: ['Myrtle', 'Rose', 'Dove', 'Swan', 'Scallop Shell'],
    family: {
      parents: ['Uranus (foam) or Zeus and Dione'],
      children: ['Eros', 'Aeneas', 'Hermaphroditus'],
      spouses: ['Hephaestus'],
      siblings: ['Ares', 'Hermes', 'Athena', 'Apollo']
    },
    abilities: ['Allure Wave', 'Golden Apple Dazzle', 'Eros Arrow charm'],
    imageUrl: '/images/entities/aphrodite.webp',
    sources: ['Hesiod\'s Theogony', 'Homeric Hymns to Aphrodite']
  },
  {
    id: 'hermes',
    name: 'Hermes',
    type: 'god',
    pantheon: 'greek',
    description: 'Messenger of the Gods, god of travel, commerce, thieves, language, and athletics.',
    lore: 'Hermes is the swift trickster of Olympus, wearing winged sandals that carry him between realms. As a psychopomp, he guides the souls of the deceased to Hades\'s underworld.',
    attributes: { strength: 75, wisdom: 90, insight: 92, endurance: 82, agility: 99, spirit: 92 },
    aliases: ['Mercury', 'Psychopomp', 'Winged Messenger'],
    symbols: ['Caduceus', 'Winged Sandals', 'Talaria', 'Petasos'],
    family: {
      parents: ['Zeus', 'Maia'],
      children: ['Pan', 'Autolycus', 'Hermaphroditus'],
      spouses: [],
      siblings: ['Athena', 'Apollo', 'Artemis', 'Ares', 'Hephaestus']
    },
    abilities: ['Winged Dash', 'Trickster Swap', 'Caduceus Siphon'],
    imageUrl: '/images/entities/hermes.webp',
    sources: ['Homeric Hymn to Hermes', 'Apollodorus\'s Library']
  },

  // --- NORSE PANTHEON (10) ---
  {
    id: 'odin',
    name: 'Odin',
    type: 'god',
    pantheon: 'norse',
    description: 'The Allfather, ruler of Asgard, god of wisdom, poetry, war, death, and runes.',
    lore: 'Odin sacrificed his eye at Mimir\'s well for cosmic wisdom and hung himself on Yggdrasil to unlock the runes. He sits on his throne Hlidskjalf, directing his Valkyries to gather fallen warriors for Valhalla.',
    attributes: { strength: 92, wisdom: 99, insight: 99, endurance: 90, agility: 75, spirit: 98 },
    aliases: ['Allfather', 'Woden', 'Wotan', 'The One-Eyed God'],
    symbols: ['Gungnir Spear', 'Valknut', 'Ravens (Huginn & Muninn)', 'Wolves (Geri & Freki)'],
    family: {
      parents: ['Borr', 'Bestla'],
      children: ['Thor', 'Baldur', 'Hodr', 'Vali', 'Vidar'],
      spouses: ['Frigg'],
      siblings: ['Vili', 'Ve']
    },
    abilities: ['Rune Curse', 'Allfather\'s Gaze', 'Gungnir Thrust'],
    imageUrl: '/images/entities/odin.webp',
    sources: ['Poetic Edda', 'Prose Edda (Gylfaginning)']
  },
  {
    id: 'frigg',
    name: 'Frigg',
    type: 'god',
    pantheon: 'norse',
    description: 'Queen of the Aesir, goddess of marriage, motherhood, prophecy, and domestic arts.',
    lore: 'Wife of Odin, Frigg is the only other deity permitted to sit on Odin\'s high seat. She holds prophetic knowledge of the future but does not speak of it, spinning clouds from her loom.',
    attributes: { strength: 78, wisdom: 96, insight: 98, endurance: 88, agility: 72, spirit: 93 },
    aliases: ['Frika', 'Mother of Aesir', 'Queen of Asgard'],
    symbols: ['Spindle', 'Key ring', 'Falcon Feather Cloak'],
    family: {
      parents: ['Fjorgynn'],
      children: ['Baldur', 'Hodr'],
      spouses: ['Odin'],
      siblings: []
    },
    abilities: ['Fate Weaver', 'Motherly Ward', 'Mist of Protection'],
    imageUrl: '/images/entities/frigg.webp',
    sources: ['Poetic Edda (Lokasenna)', 'Prose Edda']
  },
  {
    id: 'thor',
    name: 'Thor',
    type: 'god',
    pantheon: 'norse',
    description: 'God of thunder, lightning, storms, strength, and the protection of humanity.',
    lore: 'The fiercest protector of Asgard and Midgard, Thor wields the heavy hammer Mjölnir, wears the strength-doubling belt Megingjörð, and rides a chariot pulled by goats, crushing Frost Giants.',
    attributes: { strength: 99, wisdom: 70, insight: 72, endurance: 98, agility: 76, spirit: 94 },
    aliases: ['Donar', 'Thunderer', 'Slayer of Giants'],
    symbols: ['Mjölnir', 'Megingjörð', 'Goats (Tanngrisnir & Tanngnjóstr)'],
    family: {
      parents: ['Odin', 'Jord'],
      children: ['Magni', 'Modi', 'Thrud'],
      spouses: ['Sif'],
      siblings: ['Baldur', 'Vidar', 'Vali']
    },
    abilities: ['Mjölnir Throw', 'Thunder Smash', 'Megingjörð Overdrive'],
    imageUrl: '/images/entities/thor.webp',
    sources: ['Poetic Edda (Völuspá)', 'Prose Edda']
  },
  {
    id: 'loki',
    name: 'Loki',
    type: 'god',
    pantheon: 'norse',
    description: 'The trickster god, shapeshifter, harbinger of chaos, and father of monsters.',
    lore: 'Loki is a jötunn (giant) by blood who swore blood brotherhood with Odin. He oscillates between aiding and sabotaging the Aesir, ultimately leading the army of monsters during Ragnarök.',
    attributes: { strength: 76, wisdom: 92, insight: 94, endurance: 82, agility: 95, spirit: 95 },
    aliases: ['Trickster', 'Lopt', 'Father of Lies'],
    symbols: ['Interlocking Snakes', 'Liar\'s Tongue', 'Mistletoe Arrow'],
    family: {
      parents: ['Farbauti', 'Laufey'],
      children: ['Fenrir', 'Jörmungandr', 'Hel', 'Sleipnir', 'Nari', 'Vali'],
      spouses: ['Sigyn'],
      siblings: ['Helblindi', 'Byleistr']
    },
    abilities: ['Shapeshift Illusion', 'Venom Drip', 'Trickster\'s Backstab'],
    imageUrl: '/images/entities/loki.webp',
    sources: ['Poetic Edda (Lokasenna)', 'Prose Edda']
  },
  {
    id: 'baldur',
    name: 'Baldur',
    type: 'god',
    pantheon: 'norse',
    description: 'God of light, beauty, joy, purity, and peace.',
    lore: 'Loved by all, Baldur was immune to all threats on Earth except mistletoe, due to his mother Frigg\'s oath. Tricked by Loki, his blind brother Hodr shot him with a mistletoe dart, causing his death and signaling Ragnarök.',
    attributes: { strength: 80, wisdom: 90, insight: 92, endurance: 99, agility: 82, spirit: 96 },
    aliases: ['Baldr', 'The Shining God', 'The Invulnerable'],
    symbols: ['Sunbeam', 'Mistletoe Dart', 'Hringhorni Ship'],
    family: {
      parents: ['Odin', 'Frigg'],
      children: ['Forseti'],
      spouses: ['Nanna'],
      siblings: ['Thor', 'Hodr', 'Vidar', 'Vali']
    },
    abilities: ['Blinding Radiance', 'Divine Immunity', 'Rebirth Beacon'],
    imageUrl: '/images/entities/baldur.webp',
    sources: ['Poetic Edda (Baldrs Draumar)', 'Prose Edda']
  },
  {
    id: 'heimdall',
    name: 'Heimdall',
    type: 'god',
    pantheon: 'norse',
    description: 'Watchman of the Gods, guardian of the Bifröst bridge, possessor of keen senses.',
    lore: 'Heimdall has gold teeth, needs less sleep than a bird, can see for a hundred leagues, and hear grass grow. He stands guard with the Gjallarhorn to sound the alarm when Ragnarök begins.',
    attributes: { strength: 86, wisdom: 92, insight: 99, endurance: 94, agility: 80, spirit: 92 },
    aliases: ['Heimdallr', 'The White God', 'Guardian of Bifröst'],
    symbols: ['Gjallarhorn', 'Gulltoppr Horse', 'Bifröst Bridge'],
    family: {
      parents: ['Nine Maidens (Mothers)'],
      children: [],
      spouses: [],
      siblings: []
    },
    abilities: ['Gjallarhorn Alarm', 'Omnipresent Senses', 'Bifröst Flash'],
    imageUrl: '/images/entities/heimdall.webp',
    sources: ['Poetic Edda (Völuspá)', 'Prose Edda']
  },
  {
    id: 'freyja',
    name: 'Freyja',
    type: 'god',
    pantheon: 'norse',
    description: 'Goddess of love, beauty, fertility, gold, war, death, and Seiðr magic.',
    lore: 'A member of the Vanir who joined the Aesir, Freyja rules over her heavenly field Fólkvangr, receiving half of all slain warriors. She practices the magical art of Seiðr and rides in a cat-drawn chariot.',
    attributes: { strength: 84, wisdom: 92, insight: 95, endurance: 84, agility: 88, spirit: 97 },
    aliases: ['Freya', 'Valfreyja', 'Lady of Fólkvangr'],
    symbols: ['Brísingamen Necklace', 'Falcon Feather Cloak', 'Chariot drawn by Cats'],
    family: {
      parents: ['Njord', 'Nerthus'],
      children: ['Hnoss', 'Gersemi'],
      spouses: ['Odr'],
      siblings: ['Freyr']
    },
    abilities: ['Seiðr Soul Drain', 'Fólkvangr Rebirth', 'Golden Tears magic'],
    imageUrl: '/images/entities/freyja.webp',
    sources: ['Poetic Edda (Grímnismál)', 'Prose Edda']
  },
  {
    id: 'freyr',
    name: 'Freyr',
    type: 'god',
    pantheon: 'norse',
    description: 'God of fertility, peace, prosperity, sunshine, rain, and harvest.',
    lore: 'Freyja\'s twin brother Freyr rules over Alfheim. He possesses Skidbladnir (a folding ship) and Gullinbursti (a golden boar), but tragically sacrificed his self-fighting magical sword to win the hand of Gerdr.',
    attributes: { strength: 82, wisdom: 85, insight: 88, endurance: 90, agility: 84, spirit: 91 },
    aliases: ['Frey', 'Yngvi-Freyr', 'Lord of Elves'],
    symbols: ['Golden Boar (Gullinbursti)', 'Skidbladnir Ship', 'Antler Weapon'],
    family: {
      parents: ['Njord', 'Nerthus'],
      children: ['Fjolnir'],
      spouses: ['Gerdr'],
      siblings: ['Freyja']
    },
    abilities: ['Harvest Bless', 'Sunbeam Strike', 'Antler Bash'],
    imageUrl: '/images/entities/freyr.webp',
    sources: ['Poetic Edda (Skírnismál)', 'Prose Edda']
  },
  {
    id: 'tyr',
    name: 'Tyr',
    type: 'god',
    pantheon: 'norse',
    description: 'God of honorable war, justice, oaths, and law.',
    lore: 'Tyr is the boldest of the gods. He sacrificed his right hand to the great wolf Fenrir so the gods could successfully bind the beast with the magic cord Gleipnir, proving his absolute commitment to justice.',
    attributes: { strength: 90, wisdom: 90, insight: 84, endurance: 95, agility: 78, spirit: 89 },
    aliases: ['Tiwaz', 'The One-Handed God', 'Lord of Swords'],
    symbols: ['One Hand', 'Tiwaz Rune (↑)', 'Great Wolf Chains'],
    family: {
      parents: ['Odin or Hymir'],
      children: [],
      spouses: [],
      siblings: []
    },
    abilities: ['Sacrificial Strike', 'Oath Shield', 'Justice Sever'],
    imageUrl: '/images/entities/tyr.webp',
    sources: ['Poetic Edda (Hymiskvida)', 'Prose Edda']
  },
  {
    id: 'hel',
    name: 'Hel',
    type: 'god',
    pantheon: 'norse',
    description: 'Goddess and ruler of Helheim, the underworld realm of the dead.',
    lore: 'A daughter of Loki, Hel was cast down by Odin to rule the realm of those who die of old age or sickness. Her body is half living flesh and half rotting corpse, embodying the cold finality of death.',
    attributes: { strength: 80, wisdom: 88, insight: 92, endurance: 92, agility: 65, spirit: 94 },
    aliases: ['Hela', 'Mistress of the Cold', 'Queen of Helheim'],
    symbols: ['Rotting Face', 'Eljudnir Hall', 'Dish Hunger'],
    family: {
      parents: ['Loki', 'Angrboda'],
      children: [],
      spouses: [],
      siblings: ['Fenrir', 'Jörmungandr']
    },
    abilities: ['Grave Frostbite', 'Decay Curse', 'Underworld Gate'],
    imageUrl: '/images/entities/hel.webp',
    sources: ['Poetic Edda', 'Prose Edda (Gylfaginning)']
  },

  // --- EGYPTIAN PANTHEON (10) ---
  {
    id: 'ra',
    name: 'Ra',
    type: 'god',
    pantheon: 'egyptian',
    description: 'The Sun God, creator of the cosmos, and lord of order, kings, and the sky.',
    lore: 'Ra is the supreme deity who created the universe. He travels across the sky in his solar barque by day, and through the underworld (Duat) by night, battling the chaos serpent Apophis to rise again.',
    attributes: { strength: 92, wisdom: 97, insight: 98, endurance: 88, agility: 80, spirit: 99 },
    aliases: ['Re', 'Khepri', 'Atum', 'Amon-Ra'],
    symbols: ['Solar Disc', 'Uraeus Cobra', 'Falcon', 'Eye of Ra'],
    family: {
      parents: ['Nun (primordial waters)'],
      children: ['Shu', 'Tefnut', 'Bastet', 'Hathor', 'Sekhmet'],
      spouses: [],
      siblings: []
    },
    abilities: ['Solar Beam', 'Adfiltration of Apophis', 'Eye of Ra Strike'],
    imageUrl: '/images/entities/ra.webp',
    sources: ['Book of the Dead', 'Egyptian Sun Litany']
  },
  {
    id: 'isis',
    name: 'Isis',
    type: 'god',
    pantheon: 'egyptian',
    description: 'Goddess of magic, motherhood, healing, fertility, and protection.',
    lore: 'Isis is the premier magician of Egypt. She used her supreme intelligence to learn Ra\'s secret name, resurrected her husband Osiris after his murder by Seth, and successfully hid her son Horus in the marshes.',
    attributes: { strength: 75, wisdom: 99, insight: 99, endurance: 85, agility: 82, spirit: 99 },
    aliases: ['Aset', 'Great of Magic', 'Queen of Throne'],
    symbols: ['Throne Headdress', 'Knot of Isis (Tyet)', 'Kite Wings'],
    family: {
      parents: ['Geb', 'Nut'],
      children: ['Horus'],
      spouses: ['Osiris'],
      siblings: ['Osiris', 'Seth', 'Nephthys']
    },
    abilities: ['Resurrection Words', 'Divine Hekas', 'Throne Shield'],
    imageUrl: '/images/entities/isis.webp',
    sources: ['Plutarch\'s Isis and Osiris', 'Book of the Dead']
  },
  {
    id: 'osiris',
    name: 'Osiris',
    type: 'god',
    pantheon: 'egyptian',
    description: 'Lord of the Underworld, judge of the dead, god of agriculture and resurrection.',
    lore: 'Originally a mythical king of Egypt, Osiris was murdered and dismembered by his jealous brother Seth. Reassembled by Isis and embalmed by Anubis, he rose again to rule Duat, judging dead souls.',
    attributes: { strength: 80, wisdom: 94, insight: 92, endurance: 95, agility: 60, spirit: 96 },
    aliases: ['Usir', 'Foremost of the Westerners', 'Lord of Eternity'],
    symbols: ['Atef Crown', 'Crook and Flail', 'Green Skin (resurrection)'],
    family: {
      parents: ['Geb', 'Nut'],
      children: ['Horus', 'Anubis'],
      spouses: ['Isis'],
      siblings: ['Isis', 'Seth', 'Nephthys']
    },
    abilities: ['Judgment Balance', 'Agricultural Growth', 'Eternity Shell'],
    imageUrl: '/images/entities/osiris.webp',
    sources: ['Book of the Dead', 'Pyramid Texts']
  },
  {
    id: 'horus',
    name: 'Horus',
    type: 'god',
    pantheon: 'egyptian',
    description: 'God of kingship, the sky, retribution, and protection.',
    lore: 'The son of Osiris and Isis, Horus fought a legendary conflict against his uncle Seth to avenge his father\'s death and reclaim the throne. He lost his left eye in battle, which became the Eye of Horus symbol.',
    attributes: { strength: 92, wisdom: 85, insight: 95, endurance: 90, agility: 92, spirit: 94 },
    aliases: ['Heru', 'The Avenger', 'Lord of the Sky'],
    symbols: ['Falcon', 'Double Crown (Pschent)', 'Eye of Horus (Wedjat)'],
    family: {
      parents: ['Osiris', 'Isis'],
      children: ['Four Sons of Horus'],
      spouses: ['Hathor'],
      siblings: ['Anubis']
    },
    abilities: ['Falcon Dive', 'Eye of Horus Shield', 'Retribution Strike'],
    imageUrl: '/images/entities/horus.webp',
    sources: ['The Contendings of Horus and Seth', 'Temple of Edfu inscriptions']
  },
  {
    id: 'anubis',
    name: 'Anubis',
    type: 'god',
    pantheon: 'egyptian',
    description: 'God of mummification, embalming, tombs, and guide of souls in the afterlife.',
    lore: 'Anubis is the jackal-headed god who invented mummification to embalm Osiris. He guides deceased souls to the Hall of Ma\'at and conducts the Weighing of the Heart ceremony to determine their fate.',
    attributes: { strength: 85, wisdom: 90, insight: 96, endurance: 92, agility: 88, spirit: 95 },
    aliases: ['Inpu', 'Lord of the Sacred Land', 'Weigher of Hearts'],
    symbols: ['Jackal', 'Scale of Ma\'at', 'Embalming Wrappings'],
    family: {
      parents: ['Osiris', 'Nephthys'],
      children: ['Kebechet'],
      spouses: ['Anput'],
      siblings: ['Horus']
    },
    abilities: ['Weigh the Heart', 'Jackal Claw slash', 'Mummification Grip'],
    imageUrl: '/images/entities/anubis.webp',
    sources: ['Book of the Dead', 'Coffin Texts']
  },
  {
    id: 'seth',
    name: 'Seth',
    type: 'god',
    pantheon: 'egyptian',
    description: 'God of chaos, violence, deserts, storms, and foreign lands.',
    lore: 'Seth is the red-haired lord of deserts. While he murdered his brother Osiris, he also serves Ra as defender of the solar barque, spear-fighting the chaos dragon Apophis every night.',
    attributes: { strength: 96, wisdom: 75, insight: 80, endurance: 94, agility: 85, spirit: 92 },
    aliases: ['Set', 'Sutekh', 'Lord of the Red Land'],
    symbols: ['Set Animal', 'Was Scepter', 'Red Desert Sand'],
    family: {
      parents: ['Geb', 'Nut'],
      children: ['Sobek'],
      spouses: ['Nephthys', 'Taweret'],
      siblings: ['Osiris', 'Isis', 'Nephthys']
    },
    abilities: ['Desert Sandstorm', 'Spear of Chaos', 'Apophis Defense strike'],
    imageUrl: '/images/entities/seth.webp',
    sources: ['The Contendings of Horus and Seth', 'Pyramid Texts']
  },
  {
    id: 'thoth',
    name: 'Thoth',
    type: 'god',
    pantheon: 'egyptian',
    description: 'God of wisdom, writing, science, magic, the moon, and judgment.',
    lore: 'Thoth is the scribe of the gods, inventor of hieroglyphs, and keeper of divine records. In disputes, he acts as the official arbitrator and maintains the cosmic balance (Ma\'at) alongside Ra.',
    attributes: { strength: 70, wisdom: 99, insight: 99, endurance: 82, agility: 80, spirit: 98 },
    aliases: ['Djehuty', 'Lord of Books', 'Scribe of Ma\'at'],
    symbols: ['Ibis', 'Baboon', 'Writing Palette', 'Crescent Moon'],
    family: {
      parents: ['Ra or born from Horus\'s head'],
      children: [],
      spouses: ['Seshat'],
      siblings: []
    },
    abilities: ['Hieroglyphic Shield', 'Scribe\'s Truth', 'Lunar Eclipse magic'],
    imageUrl: '/images/entities/thoth.webp',
    sources: ['Book of Thoth', 'Coffin Texts']
  },
  {
    id: 'nephthys',
    name: 'Nephthys',
    type: 'god',
    pantheon: 'egyptian',
    description: 'Goddess of mourning, rivers, night, service, and protective magic.',
    lore: 'Nephthys represents the dark counterpart of Isis. Disgusted by Seth\'s murder of Osiris, she allied with Isis to recover Osiris\'s body, using her mourning songs and magic to guide the dead.',
    attributes: { strength: 74, wisdom: 92, insight: 94, endurance: 88, agility: 80, spirit: 92 },
    aliases: ['Nebet-Het', 'Lady of the Temple House'],
    symbols: ['Temple Hieroglyph Headdress', 'Falcon Wings', 'Lamentation Shroud'],
    family: {
      parents: ['Geb', 'Nut'],
      children: ['Anubis'],
      spouses: ['Seth'],
      siblings: ['Osiris', 'Isis', 'Seth']
    },
    abilities: ['Lamentation Healing', 'Night Camouflage', 'Shroud Protection'],
    imageUrl: '/images/entities/nephthys.webp',
    sources: ['Pyramid Texts', 'Plutarch\'s Isis and Osiris']
  },
  {
    id: 'bastet',
    name: 'Bastet',
    type: 'god',
    pantheon: 'egyptian',
    description: 'Goddess of cats, home, fertility, domesticity, and protection against disease.',
    lore: 'Originally a fierce lioness protector (representing the sun\'s destructive force), Bastet evolved into a gentler cat-headed guardian of the home, music, and dance, though she retains her wild claws.',
    attributes: { strength: 80, wisdom: 82, insight: 88, endurance: 85, agility: 96, spirit: 89 },
    aliases: ['Bast', 'Lady of Bubastis', 'Cat Goddess'],
    symbols: ['Cat', 'Sistrum Rattle', 'Aegis collar', 'Ointment Jar'],
    family: {
      parents: ['Ra'],
      children: ['Maahes'],
      spouses: [],
      siblings: ['Sekhmet', 'Hathor']
    },
    abilities: ['Feline Agility', 'Sistrum Daze', 'Guardian Claws'],
    imageUrl: '/images/entities/bastet.webp',
    sources: ['Book of the Dead', 'Bubastis Temple tablets']
  },
  {
    id: 'sekhmet',
    name: 'Sekhmet',
    type: 'god',
    pantheon: 'egyptian',
    description: 'Lioness goddess of war, fire, plagues, healing, and divine vengeance.',
    lore: 'Born as the wrathful Eye of Ra, Sekhmet was sent to punish rebellious humans. She grew so bloodthirsty she nearly wiped out mankind, until the gods tricked her by dyeing beer red to look like blood, which put her to sleep.',
    attributes: { strength: 97, wisdom: 78, insight: 82, endurance: 95, agility: 88, spirit: 95 },
    aliases: ['The Powerful One', 'Lady of Plagues', 'Red Lioness'],
    symbols: ['Lioness', 'Solar Disc', 'Uraeus', 'Blood Cup'],
    family: {
      parents: ['Ra'],
      children: ['Nefertem'],
      spouses: ['Ptah'],
      siblings: ['Bastet', 'Hathor']
    },
    abilities: ['Wrath of the Eye', 'Plague Siphon', 'Scorching Roar'],
    imageUrl: '/images/entities/sekhmet.webp',
    sources: ['The Destruction of Mankind', 'Pyramid Texts']
  }
];
