import { Myth } from '../../types/game';

export const myths: Myth[] = [
  // --- GREEK MYTHS (10) ---
  {
    id: 'titanomachy',
    title: 'The Titanomachy',
    pantheon: 'greek',
    description: 'The epic ten-year war between the Olympian gods and the ruling Titans.',
    fullStory: 'Before the Olympians, the Titan Cronus ruled. Fearing a prophecy that he would be overthrown by his children, he swallowed them at birth. Rhea hid her sixth child, Zeus, who grew up and returned with a potion to regurgitate his siblings. United with the Hecatoncheires (Hundred-Handed Ones) and Elder Cyclopes, Zeus led a ten-year war, defeating the Titans and imprisoning them in the abyss of Tartarus.',
    characters: ['zeus', 'poseidon', 'hades', 'hera'],
    locations: ['Mount Olympus', 'Tartarus Pit'],
    sources: ['Hesiod\'s Theogony']
  },
  {
    id: 'gigantomachy',
    title: 'The Gigantomachy',
    pantheon: 'greek',
    description: 'The rebellion of the Giants against the Olympian gods, instigated by Gaia.',
    fullStory: 'Angered by the imprisonment of the Titans, Gaia birthed the Giants (Gigas) to overthrow the Olympians. The oracle foretold the gods could only win with the aid of a mortal. Zeus summoned Heracles, who fought alongside the gods, shooting the giants down as Zeus struck them with lightning. Athena crushed Enceladus beneath Sicily, establishing Olympian supremacy.',
    characters: ['zeus', 'athena', 'heracles'],
    locations: ['Mount Olympus', 'Battlefield of Phlegra'],
    sources: ['Apollodorus\'s Library', 'Pindar\'s Odes']
  },
  {
    id: 'prometheus_fire',
    title: 'Prometheus and the Theft of Fire',
    pantheon: 'greek',
    description: 'The Titan Prometheus defies Zeus to gift fire and technology to humanity.',
    fullStory: 'Charged with creating humanity, the Titan Prometheus grew fond of mortals. When Zeus withheld fire, Prometheus stole it in a hollow fennel stalk from the forge of Hephaestus and gave it to mankind. Enraged, Zeus chained Prometheus to a mountain in the Caucasus, where an eagle ate his liver daily, and created Pandora to unleash misfortune upon the world.',
    characters: ['zeus', 'hephaestus'],
    locations: ['Caucasus Mountains', 'Forge of Hephaestus'],
    sources: ['Hesiod\'s Works and Days', 'Aeschylus\'s Prometheus Bound']
  },
  {
    id: 'pandora_box',
    title: 'Pandora\'s Box',
    pantheon: 'greek',
    description: 'The opening of the first jar, releasing all evils and hope into the mortal world.',
    fullStory: 'To punish mankind for accepting fire, Zeus ordered Hephaestus to mold the first woman, Pandora, adorned with gifts from all gods. She was sent to Prometheus\'s brother Epimetheus with a jar (box) she was forbidden to open. Overcome by curiosity, Pandora opened it, releasing sickness, death, and all evils into the world, shutting the lid just in time to trap Hope inside.',
    characters: ['zeus', 'hephaestus'],
    locations: ['Ancient Greece'],
    sources: ['Hesiod\'s Works and Days']
  },
  {
    id: 'labors_heracles',
    title: 'The Twelve Labors of Heracles',
    pantheon: 'greek',
    description: 'A series of twelve tasks Heracles performed to atone for slaying his family.',
    fullStory: 'Driven mad by Hera, Heracles slew his wife Megara and children. Seeking purification, the Delphi Oracle ordered him to serve King Eurystheus of Mycenae, who assigned him twelve impossible tasks. These included slaying the Nemean Lion, killing the Hydra, capturing Cerberus, and fetching the Golden Apples of the Hesperides, proving his divine heroism.',
    characters: ['heracles', 'zeus', 'hera', 'cerberus', 'hydra'],
    locations: ['Nemea', 'Lerna Swamps', 'Underworld Gates'],
    sources: ['Apollodorus\'s Library']
  },
  {
    id: 'slaying_medusa',
    title: 'The Slaying of Medusa',
    pantheon: 'greek',
    description: 'Perseus travels to the edge of the world to decapitate the petrifying Gorgon Medusa.',
    fullStory: 'King Polydectes challenged Perseus to bring him the head of Medusa. Aided by Athena and Hermes, Perseus acquired winged sandals, a bag to hold the head, a polished shield to look at Medusa\'s reflection, and Hades\'s invisibility helm. He infiltrated the Gorgons\' cave, decapitated Medusa while she slept, and used her head to turn his enemies to stone.',
    characters: ['perseus', 'athena', 'hermes', 'gorgon'],
    locations: ['Cave of the Gorgons', 'Seriphos Island'],
    sources: ['Ovid\'s Metamorphoses', 'Hesiod\'s Theogony']
  },
  {
    id: 'theseus_minotaur',
    title: 'Theseus and the Labyrinth',
    pantheon: 'greek',
    description: 'Theseus navigates the Crete Labyrinth to slay the half-bull Minotaur.',
    fullStory: 'Athenians were forced to send seven youths and maidens to Crete every nine years as food for the Minotaur. Theseus volunteered to join the tributes to kill the beast. In Crete, Minos\'s daughter Ariadne fell in love with him, gifting him a ball of thread to trace his steps. Theseus penetrated the maze, slew the Minotaur, and followed the thread back to safety.',
    characters: ['theseus', 'minotaur'],
    locations: ['Crete Labyrinth', 'Knossos Palace'],
    sources: ['Plutarch\'s Life of Theseus', 'Ovid\'s Metamorphoses']
  },
  {
    id: 'golden_fleece_quest',
    title: 'Quest for the Golden Fleece',
    pantheon: 'greek',
    description: 'Jason and the Argonauts sail the Argo to capture the fleece of the golden ram.',
    fullStory: 'Jason sought to reclaim his father\'s throne from King Pelias. Pelias agreed, provided Jason brought him the Golden Fleece from Colchis. Jason built the ship Argo, gathered Greece\'s greatest heroes, and faced trials like the Clashing Rocks. In Colchis, Medea used sorcery to put the fleece-guarding dragon to sleep, allowing Jason to escape with the prize.',
    characters: ['jason', 'heracles', 'athena'],
    locations: ['Colchis', 'Aegean Sea'],
    sources: ['Apollonius Rhodius\'s Argonautica']
  },
  {
    id: 'trojan_horse_myth',
    title: 'The Fall of Troy and the Trojan Horse',
    pantheon: 'greek',
    description: 'Odysseus\'s master stratagem to infiltrate and sack the walled city of Troy.',
    fullStory: 'After ten years of siege, the Greeks failed to break the walls of Troy. Odysseus conceived a plan: they constructed a giant wooden horse, hid a select band of warriors inside, and pretended to sail away. The Trojans pulled the horse inside their gates as a victory offering. At night, the Greeks slipped out, opened the gates for their returned army, and sacked the city.',
    characters: ['odysseus', 'achilles'],
    locations: ['Troy Scaean Gates', 'Battlefield of Scamander'],
    sources: ['Virgil\'s Aeneid Book 2', 'Homer\'s Odyssey']
  },
  {
    id: 'abduction_persephone',
    title: 'The Abduction of Persephone',
    pantheon: 'greek',
    description: 'Hades abducts Demeter\'s daughter, establishing the cyclical seasons of the earth.',
    fullStory: 'Hades fell in love with Persephone and carried her to the Underworld. Her grieving mother Demeter, goddess of harvest, withdrew her blessings, causing a global winter. Zeus intervened. However, because Persephone had eaten pomegranate seeds in the Underworld, she was bound to return there for one-third of the year, causing the cycle of winter and spring.',
    characters: ['hades', 'zeus'],
    locations: ['Underworld', 'Fields of Nysa'],
    sources: ['Homeric Hymn to Demeter', 'Ovid\'s Fasti']
  },

  // --- NORSE MYTHS (10) ---
  {
    id: 'creation_realms',
    title: 'Creation of the Nine Realms',
    pantheon: 'norse',
    description: 'Odin and his brothers construct the cosmos from the body of the giant Ymir.',
    fullStory: 'In the beginning, there was only Ginnungagap, the yawning void between Muspelheim (fire) and Niflheim (ice). Melting frost birthed the giant Ymir. Odin, Vili, and Ve slew Ymir, using his flesh for the earth, his blood for the oceans, his bones for mountains, and his skull for the sky, establishing Midgard and centering the realms along Yggdrasil.',
    characters: ['odin'],
    locations: ['Ginnungagap', 'Midgard', 'Yggdrasil trunk'],
    sources: ['Poetic Edda (Vafþrúðnismál)', 'Prose Edda']
  },
  {
    id: 'sacrifice_eye',
    title: 'The Sacrifice of Odin\'s Eye',
    pantheon: 'norse',
    description: 'The Allfather sacrifices his right eye at Mimir\'s well for cosmic runes and wisdom.',
    fullStory: 'Seeking wisdom to prevent Ragnarök, Odin traveled to the root of Yggdrasil in Jotunheim, where Mimir\'s Well of wisdom lies. The guardian Mimir demanded a heavy price: Odin\'s right eye. Odin plucked his eye out and dropped it into the well. In exchange, he was permitted to drink the magical water, gaining deep cosmic wisdom and knowledge of runes.',
    characters: ['odin'],
    locations: ['Mimir\'s Well of Wisdom', 'Jotunheim'],
    sources: ['Poetic Edda (Völuspá)', 'Prose Edda']
  },
  {
    id: 'theft_mjolnir',
    title: 'The Theft of Mjölnir',
    pantheon: 'norse',
    description: 'Thor disguises himself as the goddess Freyja to reclaim his hammer from a giant.',
    fullStory: 'The giant Thrymr stole Thor\'s hammer Mjölnir, demanding the goddess Freyja as his bride. Loki conceived a plan: Thor dressed in bridal clothes and a veil as Freyja, and Loki acted as his handmaid. At the wedding feast, Thrymr brought out Mjölnir to bless the bride, whereupon Thor seized the hammer, threw off the veil, and slew the giant and his household.',
    characters: ['thor', 'loki', 'freyja'],
    locations: ['Asgard', 'Jotunheim fortress'],
    sources: ['Poetic Edda (Þrymskviða)']
  },
  {
    id: 'binding_fenrir',
    title: 'The Binding of the Wolf Fenrir',
    pantheon: 'norse',
    description: 'Tyr sacrifices his hand to bind the monstrous giant wolf Fenrir with Gleipnir.',
    fullStory: 'Loki\'s wolf child Fenrir grew so rapidly it terrified the Aesir. They tried to bind him under the guise of games, but he broke all chains. The dwarves crafted Gleipnir, a magical silk cord made of impossible items (sound of a cat\'s step, beard of a woman). Fenrir sensed a trick, demanding a god place a hand in his mouth. Tyr volunteered. When Fenrir found he was bound, he bit Tyr\'s hand off.',
    characters: ['tyr', 'loki'],
    locations: ['Asgard', 'Lyngvi Island'],
    sources: ['Prose Edda (Gylfaginning)']
  },
  {
    id: 'death_baldur_myth',
    title: 'The Death of Baldur',
    pantheon: 'norse',
    description: 'Loki uses mistletoe to assassinate Baldur, signaling the approach of Ragnarök.',
    fullStory: 'Baldur suffered premonitions of death. Frigg extracted oaths from all things on Earth not to harm him, except mistletoe, which she deemed too young. Loki discovered this and crafted a dart of mistletoe. He guided Hodr, Baldur\'s blind brother, to throw the dart in a game, piercing Baldur\'s heart. His death marked the first sign of the inevitable Ragnarök.',
    characters: ['baldur', 'loki', 'frigg'],
    locations: ['Asgard', 'Eljudnir Hall of Hel'],
    sources: ['Prose Edda', 'Poetic Edda (Völuspá)']
  },
  {
    id: 'loki_wager',
    title: 'Loki and the Treasures of the Gods',
    pantheon: 'norse',
    description: 'Loki cuts Sif\'s hair and must commission the dwarves to forge legendary weapons.',
    fullStory: 'Loki mischievously sheared Sif\'s golden hair. Thor threatened to break Loki\'s bones unless he replaced it. Loki traveled to Svartalfheim and challenged dwarf smiths to create golden hair. The dwarves not only forged the hair, but also built Skidbladnir (folding ship), Gungnir (spear), Gullinbursti (boar), Draupnir (gold ring), and Thor\'s hammer Mjölnir, enriching the gods.',
    characters: ['loki', 'thor', 'odin'],
    locations: ['Asgard', 'Svartalfheim caves'],
    sources: ['Prose Edda (Skáldskaparmál)']
  },
  {
    id: 'utgarda_loki',
    title: 'Journey to Utgarda-Loki',
    pantheon: 'norse',
    description: 'Thor and Loki face illusory trials in the fortress of the giant king.',
    fullStory: 'Thor and Loki traveled to the fortress of giant King Utgarda-Loki. Challenged to trials, Loki lost an eating contest to Logi, Thor failed to drain a horn cup, lift a cat, or defeat an old woman. The king later revealed it was all magic illusion: Logi was Fire, the horn was connected to the Ocean, the cat was Jörmungandr, and the old woman was Old Age, proving Thor\'s terrifying strength.',
    characters: ['thor', 'loki'],
    locations: ['Utgard Fortress', 'Jotunheim'],
    sources: ['Prose Edda (Gylfaginning)']
  },
  {
    id: 'slaying_fafnir_myth',
    title: 'Sigurd and the Dragon Fafnir',
    pantheon: 'norse',
    description: 'Sigurd slays the dragon of greed and tastes its heart to understand birds.',
    fullStory: 'The dwarf Fafnir murdered his father for a gold hoard and transformed into a dragon of greed. Sigurd\'s tutor Regin urged him to kill the beast. Sigurd forged the sword Gram and stabbed Fafnir from a trench. Tasting the dragon\'s blood allowed him to understand the language of birds, who warned him that Regin planned to betray him, leading Sigurd to slay Regin and claim the hoard.',
    characters: ['sigurd'],
    locations: ['Gnita-heath', 'Valkyrie Mountain'],
    sources: ['Völsunga saga', 'Poetic Edda']
  },
  {
    id: 'ragnarok_war',
    title: 'Ragnarök: The Twilight of the Gods',
    pantheon: 'norse',
    description: 'The final catastrophic battle that destroys and regenerates the Norse cosmos.',
    fullStory: 'Ragnarök begins with Fimbulwinter, a three-year winter. Fenrir breaks his chains, Jörmungandr floods the earth, and Surtr leads fire giants across Bifröst. On the plains of Vigrid, Thor slays Jörmungandr but dies of poison, Odin is devoured by Fenrir, and Heimdall and Loki slay each other. Surtr burns the worlds, which sink into the sea, only to rise again green and renewed.',
    characters: ['odin', 'thor', 'loki', 'heimdall', 'jormungandr', 'surtr', 'hel'],
    locations: ['Vigrid Plains', 'Asgard', 'Midgard Coastline'],
    sources: ['Poetic Edda (Völuspá)', 'Prose Edda']
  },
  {
    id: 'asgard_wall',
    title: 'The Master Builder and the Wall of Asgard',
    pantheon: 'norse',
    description: 'Loki shapeshifts into a mare to prevent a giant builder from claiming the sun and moon.',
    fullStory: 'A builder offered to construct a stone wall around Asgard in three seasons, asking for the goddess Freyja, the sun, and the moon. The gods agreed, provided he used only his stallion Svadilfari. With the horse, the builder worked so fast they faced ruin. Loki shapeshifted into a mare to distract Svadilfari. The builder missed his deadline, was revealed as a giant, and killed by Thor.',
    characters: ['loki', 'thor', 'freyja'],
    locations: ['Asgard wall'],
    sources: ['Prose Edda (Gylfaginning)']
  },

  // --- EGYPTIAN MYTHS (10) ---
  {
    id: 'osiris_resurrection',
    title: 'The Murder and Resurrection of Osiris',
    pantheon: 'egyptian',
    description: 'Seth murders Osiris, and Isis uses magical spells to resurrect him as Underworld Lord.',
    fullStory: 'Osiris ruled Egypt with peace. Jealous, his brother Seth crafted a beautiful chest fitting only Osiris, tricked him into it, sealed it, and threw it into the Nile. Isis retrieved it, but Seth found it and tore Osiris into fourteen pieces, scattering them across Egypt. Isis searched, reassembled the pieces, and used her magic to revive him, conceiving Horus before Osiris descended to rule Duat.',
    characters: ['osiris', 'isis', 'seth', 'anubis'],
    locations: ['Nile Kingdom', 'Abydos Tombs', 'Duat'],
    sources: ['Plutarch\'s Isis and Osiris', 'Book of the Dead']
  },
  {
    id: 'horus_seth_contendings',
    title: 'The Contendings of Horus and Seth',
    pantheon: 'egyptian',
    description: 'Horus fights his uncle Seth for eighty years to claim the throne of Egypt.',
    fullStory: 'Horus claimed the throne as Osiris\'s rightful heir, but Seth claimed he was too young. They fought for eighty years in trials: transforming into hippopotamuses, racing stone boats, and dueling. Isis supported Horus, while Seth tore out Horus\'s eye. The divine tribunal eventually ruled in favor of Horus, naming him King of Egypt and relegating Seth to the desert.',
    characters: ['horus', 'seth', 'isis', 'thoth'],
    locations: ['Nile Marshes', 'Desert of Set', 'Heliopolis Mound'],
    sources: ['The Contendings of Horus and Seth (Papyrus Chester Beatty I)']
  },
  {
    id: 'solar_barque_journey',
    title: 'The Night Journey of the Solar Barque',
    pantheon: 'egyptian',
    description: 'Ra travels through the twelve hours of Duat, spear-fighting the chaos serpent Apophis.',
    fullStory: 'Ra travels across the sky in his day barque (Mandjet). By night, he boards the night barque (Mesektet) to travel through the subterranean Duat. Each hour is a gate guarded by fire demons. At the deepest hour, the massive serpent Apophis tries to swallow the sun. Wielding chaos spears, Seth and Bastet stand at the prow, striking the serpent so Ra can rise again.',
    characters: ['ra', 'seth', 'bastet', 'apophis_serpent'],
    locations: ['First Gate of Night', 'Cavern of Fire', 'Duat'],
    sources: ['Book of Gates', 'Book of Adoration of Ra']
  },
  {
    id: 'secret_name_ra',
    title: 'The Secret Name of Ra',
    pantheon: 'egyptian',
    description: 'Isis crafts a clay serpent to poison Ra, forcing him to reveal his secret name.',
    fullStory: 'Isis sought to acquire supreme magical power over all gods. She collected Ra\'s saliva, mixed it with clay, and crafted a serpent that bit Ra as he walked. The divine poison burned Ra, and none could heal him. Isis offered to cure him on one condition: he must whisper his secret name to her. In agony, Ra revealed his name, giving Isis and her descendants absolute magical dominion.',
    characters: ['ra', 'isis'],
    locations: ['Heliopolis Mound', 'Solar Barque'],
    sources: ['Turin Papyrus', 'Plutarch\'s essays']
  },
  {
    id: 'creation_ennead',
    title: 'The Creation of the Ennead',
    pantheon: 'egyptian',
    description: 'Atum-Ra rises from the primordial waters of Nun to birth the first gods.',
    fullStory: 'In the beginning, there was only Nun, the dark primordial water. The first mound (Benben) rose from the depths. Atum-Ra materialized on the mound. Through self-creation, he spit out Shu (Air) and Tefnut (Moisture). They birthed Geb (Earth) and Nut (Sky), who lay locked in embrace until Shu separated them. Geb and Nut then birthed Osiris, Isis, Seth, and Nephthys.',
    characters: ['ra', 'isis', 'osiris', 'seth', 'nephthys'],
    locations: ['Benben Mound', 'Heliopolis'],
    sources: ['Pyramid Texts', 'Book of the Dead']
  },
  {
    id: 'destruction_mankind',
    title: 'The Destruction of Mankind',
    pantheon: 'egyptian',
    description: 'Ra sends the lioness Sekhmet to punish rebellious mortals, nearly wiping out humanity.',
    fullStory: 'As Ra grew old, humans plotted against him. Ra pulled his eye out and sent it as the goddess Hathor, who transformed into the bloodthirsty lioness Sekhmet, slaughtering humans in the desert. Horrified by the bloodshed, Ra decided to save the survivors. He dyed 7,000 jars of beer red with pomegranate juice, looking like blood. Sekhmet drank it, fell asleep, and woke up peaceful.',
    characters: ['ra', 'sekhmet'],
    locations: ['Desert of Set', 'Heliopolis Temple'],
    sources: ['The Book of the Heavenly Cow']
  },
  {
    id: 'theft_book_thoth',
    title: 'The Theft of the Book of Thoth',
    pantheon: 'egyptian',
    description: 'Prince Khaemwaset penetrates a royal tomb to steal Thoth\'s book of ultimate spells.',
    fullStory: 'Prince Khaemwaset, a scholar and wizard, sought the Book of Thoth, which grants the user power to see the gods, understand animals, and spellbind the heavens. He broke into the tomb of Prince Neferkaptah, whose ghost challenged him to games of Senet. Khaemwaset won by magical tricks, stealing the scroll, only to suffer curses until he returned the book with royal honors.',
    characters: ['khaemwaset', 'thoth'],
    locations: ['Abydos Tombs', 'Memphis Palace'],
    sources: ['Stories of Setne Khaemwaset (Demotic Papyrus)']
  },
  {
    id: 'winged_disc_edfu',
    title: 'The Winged Disc of Edfu',
    pantheon: 'egyptian',
    description: 'Horus transforms into a giant winged disc of light to destroy Seth\'s armies of chaos.',
    fullStory: 'Rebellious armies of chaos arose under Seth. Ra ordered Horus to fly to the heavens. Horus transformed into a giant winged sun disc (Behedeti), emitting dazzling rays of light that blinded the chaos forces, causing them to turn on each other. The symbol was carved above temple gates to ward off evil and protect sacred sites.',
    characters: ['horus', 'ra', 'seth'],
    locations: ['Temple of Edfu', 'Nile Kingdom'],
    sources: ['Edfu Temple Myth of the Winged Disc inscriptions']
  },
  {
    id: 'osiris_judgement',
    title: 'The Weighing of the Heart',
    pantheon: 'egyptian',
    description: 'Osiris and Anubis conduct the final judgment of dead souls in the Hall of Truth.',
    fullStory: 'Deceased souls are guided by Anubis to the Hall of Two Truths. The heart, containing the soul\'s moral record, is placed on a gold scale against the ostrich feather of Ma\'at (truth). Thoth records the score. If the heart is lighter than the feather, Osiris welcomes them to the Field of Reeds. If the heart is heavy with sin, the crocodile demon Ammit devours it, causing final oblivion.',
    characters: ['osiris', 'anubis', 'thoth', 'ammit_beast'],
    locations: ['Hall of Two Truths', 'Field of Reeds'],
    sources: ['Book of the Dead Papyrus of Ani']
  },
  {
    id: 'birth_of_horus',
    title: 'The Birth and Hiding of Horus',
    pantheon: 'egyptian',
    description: 'Isis flees to the delta marshes of Khemmis to raise the infant Horus in secret.',
    fullStory: 'Following Osiris\'s death, Seth claimed absolute rule. Pregnant with Horus, Isis fled to the delta marshes of Khemmis. Guided by Thoth, she hid in the thick papyrus reeds, protecting the infant Horus from Seth\'s scorpions and search parties, raising him until he was strong enough to challenge his uncle for the crown.',
    characters: ['horus', 'isis', 'thoth'],
    locations: ['Nile Marshes', 'Khemmis delta'],
    sources: ['Metternich Stele', 'Pyramid Texts']
  }
];
