import { QuizQuestion } from '../../types/game';

export const quizQuestions: QuizQuestion[] = [
  // ==========================================
  // ============ GREEK PANTHEON (50) ============
  // ==========================================
  
  // 1-10: Deities (Multiple-Choice)
  {
    id: 'gk_q1',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Who is the supreme ruler of Mount Olympus and the god of the sky?',
    options: ['Poseidon', 'Zeus', 'Hades', 'Apollo'],
    answer: 'Zeus',
    hint: 'He overthrew his father Cronus and wields the mighty thunderbolt.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q2',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Which goddess was born fully armed from the forehead of Zeus?',
    options: ['Hera', 'Athena', 'Artemis', 'Aphrodite'],
    answer: 'Athena',
    hint: 'She is the goddess of wisdom and strategic warfare.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q3',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Who is the twin sister of Apollo and goddess of the hunt?',
    options: ['Athena', 'Artemis', 'Hestia', 'Demeter'],
    answer: 'Artemis',
    hint: 'She roams the forests with a silver bow and is associated with the moon.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q4',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Which Greek god is the ruler of the Underworld and the dead?',
    options: ['Hades', 'Thanatos', 'Hermes', 'Charon'],
    answer: 'Hades',
    hint: 'He is the elder brother of Zeus and Poseidon, and husband of Persephone.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q5',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Which god is the messenger of the Olympians and patron of travelers and thieves?',
    options: ['Apollo', 'Hermes', 'Hephaestus', 'Ares'],
    answer: 'Hermes',
    hint: 'He wears winged sandals and carries the caduceus staff.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q6',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Who is the Greek god of fire, metalworking, and sculpture?',
    options: ['Ares', 'Dionysus', 'Hephaestus', 'Hermes'],
    answer: 'Hephaestus',
    hint: 'He is the lame smith-god and husband of Aphrodite.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q7',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Which goddess is the wife of Zeus and queen of the Olympian gods?',
    options: ['Demeter', 'Hera', 'Hestia', 'Aphrodite'],
    answer: 'Hera',
    hint: 'She is the protector of marriage and family.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q8',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Who is the Greek god of raw war, violence, and physical chaos?',
    options: ['Ares', 'Apollo', 'Hephaestus', 'Hermes'],
    answer: 'Ares',
    hint: 'Unlike Athena\'s tactical warfare, this god represents bloodlust.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q9',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Aphrodite is said to have been born from what substance?',
    options: ['Volcanic clay', 'Sea foam', 'A golden egg', 'Zeus\'s thigh'],
    answer: 'Sea foam',
    hint: 'She emerged from the ocean waves after Uranus was castrated.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q10',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Who is the goddess of the harvest, grain, and agriculture?',
    options: ['Hestia', 'Demeter', 'Persephone', 'Rhea'],
    answer: 'Demeter',
    hint: 'Her grief for her daughter Persephone causes the seasons of the earth.',
    difficulty: 'Initiate'
  },
  // 11-20: Symbols (Symbol matching)
  {
    id: 'gk_q11',
    pantheon: 'greek',
    type: 'symbol',
    question: 'The Peacock and the Pomegranate are primary symbols of which goddess?',
    options: ['Athena', 'Hera', 'Demeter', 'Aphrodite'],
    answer: 'Hera',
    hint: 'She is the royal queen of Olympus.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q12',
    pantheon: 'greek',
    type: 'symbol',
    question: 'Which Greek god is symbolized by the Trident, horses, and dolphins?',
    options: ['Poseidon', 'Hermes', 'Dionysus', 'Hades'],
    answer: 'Poseidon',
    hint: 'He is the lord of the oceans and earthquakes.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q13',
    pantheon: 'greek',
    type: 'symbol',
    question: 'The Caduceus (a staff wrapped with two snakes) belongs to which god?',
    options: ['Apollo', 'Asclepius', 'Hermes', 'Zeus'],
    answer: 'Hermes',
    hint: 'He is the winged messenger and guide of dead souls.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q14',
    pantheon: 'greek',
    type: 'symbol',
    question: 'The owl and the Aegis shield are symbols of which deity?',
    options: ['Zeus', 'Athena', 'Ares', 'Hera'],
    answer: 'Athena',
    hint: 'The owl represents her wisdom, and she carries the head of Medusa on her shield.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q15',
    pantheon: 'greek',
    type: 'symbol',
    question: 'Which god is associated with the Bident and the Helm of Invisibility?',
    options: ['Hades', 'Poseidon', 'Zeus', 'Hermes'],
    answer: 'Hades',
    hint: 'He is the dark king who rules the subterranean dead.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q16',
    pantheon: 'greek',
    type: 'symbol',
    question: 'The Lyre, laurel wreath, and golden bow are symbols of which deity?',
    options: ['Dionysus', 'Hermes', 'Apollo', 'Pan'],
    answer: 'Apollo',
    hint: 'He is the god of music, poetry, light, and archery.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q17',
    pantheon: 'greek',
    type: 'symbol',
    question: 'The Myrtle, rose, dove, and scallop shell are sacred to which goddess?',
    options: ['Hera', 'Aphrodite', 'Artemis', 'Hestia'],
    answer: 'Aphrodite',
    hint: 'She is the goddess of love and beauty, born from the sea.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q18',
    pantheon: 'greek',
    type: 'symbol',
    question: 'A helmet, spear, boar, and vulture are symbols of which aggressive deity?',
    options: ['Ares', 'Heracles', 'Zeus', 'Hades'],
    answer: 'Ares',
    hint: 'He is the god of violent warfare.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q19',
    pantheon: 'greek',
    type: 'symbol',
    question: 'The Thyrsus (a pinecone-tipped staff) and ivy are symbols of which god?',
    options: ['Hermes', 'Dionysus', 'Pan', 'Apollo'],
    answer: 'Dionysus',
    hint: 'He is the god of wine, theater, and ecstasy.',
    difficulty: 'Champion'
  },
  {
    id: 'gk_q20',
    pantheon: 'greek',
    type: 'symbol',
    question: 'Which hearth goddess is symbolized by the sacred flame and home hearth?',
    options: ['Demeter', 'Hestia', 'Rhea', 'Leto'],
    answer: 'Hestia',
    hint: 'She is the virgin goddess of the home fires who gave up her seat on Olympus.',
    difficulty: 'Scholar'
  },
  // 21-30: Timelines & Chronology (Order)
  {
    id: 'gk_q21',
    pantheon: 'greek',
    type: 'timeline',
    question: 'Which event occurred FIRST in Greek mythological chronology?',
    options: ['The Trojan War', 'The Titanomachy', 'The Twelve Labors of Heracles', 'The Gigantomachy'],
    answer: 'The Titanomachy',
    hint: 'This was the war where Zeus and his siblings overthrew their father Cronus.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q22',
    pantheon: 'greek',
    type: 'timeline',
    question: 'Who was the FIRST ruler of the cosmos according to Hesiod?',
    options: ['Cronus', 'Zeus', 'Uranus', 'Chaos'],
    answer: 'Chaos',
    hint: 'The infinite void from which Gaia, Tartarus, and Eros emerged.',
    difficulty: 'Champion'
  },
  {
    id: 'gk_q23',
    pantheon: 'greek',
    type: 'timeline',
    question: 'Arrange these generations of gods from OLDEST to YOUNGEST.',
    options: ['Cronus -> Zeus -> Uranus', 'Uranus -> Cronus -> Zeus', 'Zeus -> Cronus -> Uranus', 'Uranus -> Zeus -> Cronus'],
    answer: 'Uranus -> Cronus -> Zeus',
    hint: 'Uranus is the Sky (grandfather), Cronus is the Titan (father), Zeus is the Olympian (son).',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q24',
    pantheon: 'greek',
    type: 'timeline',
    question: 'Which hero completed his quests before the Trojan War took place?',
    options: ['Theseus', 'Perseus', 'Jason', 'All of the above'],
    answer: 'All of the above',
    hint: 'Perseus, Theseus, and Jason were part of the older generation of heroes before Troy.',
    difficulty: 'Champion'
  },
  {
    id: 'gk_q25',
    pantheon: 'greek',
    type: 'timeline',
    question: 'Which of the following events happened LAST in mythological timelines?',
    options: ['The creation of Pandora', 'The flood of Deucalion', 'The return of the Heracleidae', 'The Argonautic expedition'],
    answer: 'The return of the Heracleidae',
    hint: 'This event represents the return of Heracles\' descendants, marking the end of the Heroic Age.',
    difficulty: 'Oracle'
  },
  {
    id: 'gk_q26',
    pantheon: 'greek',
    type: 'timeline',
    question: 'Who was the father of Zeus?',
    options: ['Uranus', 'Cronus', 'Prometheus', 'Hyperion'],
    answer: 'Cronus',
    hint: 'He swallowed his children to prevent being overthrown.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q27',
    pantheon: 'greek',
    type: 'timeline',
    question: 'During which battle did Heracles help the Olympian gods defeat the Giants?',
    options: ['Titanomachy', 'Gigantomachy', 'Trojan War', 'Centauromachy'],
    answer: 'Gigantomachy',
    hint: 'This was Gaia\'s revolt utilizing giant serpent-legged warriors.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q28',
    pantheon: 'greek',
    type: 'timeline',
    question: 'Who was the king of Mycenae for whom Heracles performed the Twelve Labors?',
    options: ['Priam', 'Agamemnon', 'Eurystheus', 'Aegeus'],
    answer: 'Eurystheus',
    hint: 'A cousin of Heracles who was born early due to Hera\'s interference.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q29',
    pantheon: 'greek',
    type: 'timeline',
    question: 'Which hero was killed LAST?',
    options: ['Achilles', 'Theseus', 'Heracles', 'Odysseus'],
    answer: 'Odysseus',
    hint: 'He survived the Trojan war and returned home to Ithaca, living to an old age before his son Telegonus accidentally killed him.',
    difficulty: 'Oracle'
  },
  {
    id: 'gk_q30',
    pantheon: 'greek',
    type: 'timeline',
    question: 'The Golden Age of humanity was ruled by which deity?',
    options: ['Zeus', 'Cronus', 'Uranus', 'Prometheus'],
    answer: 'Cronus',
    hint: 'Humanity lived like gods without sorrow under this Titan\'s reign.',
    difficulty: 'Champion'
  },
  // 31-40: Weaknesses (Combat weaknesses)
  {
    id: 'gk_q31',
    pantheon: 'greek',
    type: 'weakness',
    question: 'How did Heracles prevent the Hydra\'s heads from growing back?',
    options: ['Dipping them in vinegar', 'Cauterizing the necks with fire', 'Freezing them in ice', 'Crushing them with a stone anvil'],
    answer: 'Cauterizing the necks with fire',
    hint: 'His nephew Iolaus helped him burn the wounds immediately after decapitation.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q32',
    pantheon: 'greek',
    type: 'weakness',
    question: 'What is the primary weakness of the Gorgon Medusa?',
    options: ['High-pitch music', 'Reflective surfaces / Mirrored shield', 'Saltwater streams', 'Iron weapons'],
    answer: 'Reflective surfaces / Mirrored shield',
    hint: 'Looking directly at her turns you to stone, so Perseus fought using her reflection.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q33',
    pantheon: 'greek',
    type: 'weakness',
    question: 'How did Bellerophon defeat the fire-breathing Chimera?',
    options: ['Drowning it in a river', 'Tossing lead down its throat', 'Blinding its eyes with sand', 'Singing it to sleep'],
    answer: 'Tossing lead down its throat',
    hint: 'The lead melted under the monster\'s fire breath, blocking its airway.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q34',
    pantheon: 'greek',
    type: 'weakness',
    question: 'What weapon is the father of monsters, Typhon, uniquely weak against?',
    options: ['Poseidon\'s Trident', 'Zeus\'s Thunderbolt', 'Ares\'s Spear', 'Achilles\'s Shield'],
    answer: 'Zeus\'s Thunderbolt',
    hint: 'Zeus blasted him with a hundred thunderbolts before pinning him under Mt. Etna.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q35',
    pantheon: 'greek',
    type: 'weakness',
    question: 'How did Odysseus protect his crew from the sirens\' hypnotic songs?',
    options: ['Plugging their ears with beeswax', 'Tying them to the oars', 'Covering their heads in cloth', 'Playing a louder flute'],
    answer: 'Plugging their ears with beeswax',
    hint: 'While they wore wax, Odysseus tied himself to the mast so he could safely listen.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q36',
    pantheon: 'greek',
    type: 'weakness',
    question: 'What did Theseus use to solve the labyrinth\'s navigation challenge?',
    options: ['A magical map', 'A ball of thread / string', 'Clues on the walls', 'A compass of bronze'],
    answer: 'A ball of thread / string',
    hint: 'Ariadne gifted him this thread, allowing him to trace his steps back out.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q37',
    pantheon: 'greek',
    type: 'weakness',
    question: 'What is the sole physical vulnerability of the champion Achilles?',
    options: ['His right eye', 'His heel', 'His shoulder', 'His throat'],
    answer: 'His heel',
    hint: 'His mother held him by the heel when dipping him in the River Styx.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q38',
    pantheon: 'greek',
    type: 'weakness',
    question: 'The giant Talos of Crete, made of bronze, was defeated by Medea targeting what weakness?',
    options: ['His single eye', 'The bronze plug in his ankle (ichor vein)', 'His metal joints', 'His lack of intelligence'],
    answer: 'The bronze plug in his ankle (ichor vein)',
    hint: 'Medea dislodged the nail, causing his life-giving divine blood (ichor) to drain out.',
    difficulty: 'Champion'
  },
  {
    id: 'gk_q39',
    pantheon: 'greek',
    type: 'weakness',
    question: 'The three-headed gatekeeper Cerberus was put to sleep by Orpheus using what skill?',
    options: ['Throwing drugged cakes', 'Playing the lyre (music)', 'Stroking his three necks', 'Using shadow invisibility cloak'],
    answer: 'Playing the lyre (music)',
    hint: 'Orpheus\'s beautiful songs charmed all of the Underworld, including Hades and the hound.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q40',
    pantheon: 'greek',
    type: 'weakness',
    question: 'What weapon did Heracles use to kill the Nemean Lion after finding its skin immune to metal?',
    options: ['Strangling it with his bare hands', 'Burning it with fire torches', 'Slaying it with wooden arrows', 'Drowning it in a river'],
    answer: 'Strangling it with his bare hands',
    hint: 'Its hide was invulnerable, so Heracles wrestled the beast and choked it to death.',
    difficulty: 'Scholar'
  },
  // 41-50: Advanced Lore (General)
  {
    id: 'gk_q41',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Who was the Greek god of dreams, child of Hypnos?',
    options: ['Morpheus', 'Phobetor', 'Phantasos', 'Thanatos'],
    answer: 'Morpheus',
    hint: 'He shapes dreams, appearing in human forms.',
    difficulty: 'Champion'
  },
  {
    id: 'gk_q42',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Which of the following is NOT one of the three Fates (Moirai)?',
    options: ['Clotho', 'Lachesis', 'Atropos', 'Nemesis'],
    answer: 'Nemesis',
    hint: 'Clotho spins the thread, Lachesis measures it, Atropos cuts it. Nemesis is retribution.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q43',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Who was the Titan goddess of memory and mother of the nine Muses?',
    options: ['Mnemosyne', 'Themis', 'Tethys', 'Rhea'],
    answer: 'Mnemosyne',
    hint: 'Her name is related to memory and mnemonics.',
    difficulty: 'Champion'
  },
  {
    id: 'gk_q44',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Which Greek hero was left on a mountaintop, suckled by a bear, and raced for marriage?',
    options: ['Atalanta', 'Hippomenes', 'Jason', 'Bellerophon'],
    answer: 'Atalanta',
    hint: 'She was a fierce maiden huntress who draw first blood in the Calydonian hunt.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q45',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'What are the names of the two children of Ares representing aspects of war?',
    options: ['Phobos & Deimos', 'Eros & Anteros', 'Castor & Pollux', 'Hypnos & Thanatos'],
    answer: 'Phobos & Deimos',
    hint: 'They represent Fear and Terror, marching with their father.',
    difficulty: 'Scholar'
  },
  {
    id: 'gk_q46',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Which Greek mythological spring was created by a strike of the winged horse Pegasus\'s hoof?',
    options: ['Hippocrene', 'Castalian', 'Achelous', 'Lethe'],
    answer: 'Hippocrene',
    hint: 'Located on Mt. Helicon, it was sacred to the Muses and means "horse\'s spring".',
    difficulty: 'Oracle'
  },
  {
    id: 'gk_q47',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Who was the ferryman of the dead across the River Styx in Hades?',
    options: ['Charon', 'Thanatos', 'Cerberus', 'Hermes'],
    answer: 'Charon',
    hint: 'He requires an obol coin placed in the mouth of the deceased to row them across.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q48',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Which Greek Titan was tasked with holding up the heavens for eternity?',
    options: ['Atlas', 'Prometheus', 'Epimetheus', 'Oceanus'],
    answer: 'Atlas',
    hint: 'He led the Titans in battle and was punished after their defeat.',
    difficulty: 'Initiate'
  },
  {
    id: 'gk_q49',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'Which of the following creatures was NOT born from the blood of Medusa?',
    options: ['Pegasus', 'Chrysaor', 'Chrysomallos', 'Echidna'],
    answer: 'Echidna',
    hint: 'Echidna was the mother of monsters. Pegasus and Chrysaor sprang from Medusa\'s neck.',
    difficulty: 'Oracle'
  },
  {
    id: 'gk_q50',
    pantheon: 'greek',
    type: 'multiple-choice',
    question: 'What is the name of the food of the gods that grants immortality?',
    options: ['Ambrosia', 'Nectar', 'Manna', 'Soma'],
    answer: 'Ambrosia',
    hint: 'It is often consumed alongside nectar (their drink) during feasts.',
    difficulty: 'Initiate'
  },

  // ==========================================
  // ============ NORSE PANTHEON (50) ============
  // ==========================================
  
  // 51-60: Deities (Multiple-Choice)
  {
    id: 'ns_q51',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Who is the supreme leader (Allfather) of the Aesir gods?',
    options: ['Thor', 'Odin', 'Baldur', 'Tyr'],
    answer: 'Odin',
    hint: 'He rides the eight-legged horse Sleipnir and wields the spear Gungnir.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q52',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Which Norse god wields the giant-crushing hammer Mjölnir?',
    options: ['Loki', 'Thor', 'Tyr', 'Heimdall'],
    answer: 'Thor',
    hint: 'He is the red-bearded god of thunder and protector of Midgard.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q53',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Loki is technically a member of what race by blood?',
    options: ['Aesir', 'Vanir', 'Jötunn (Giants)', 'Alfar (Elves)'],
    answer: 'Jötunn (Giants)',
    hint: 'His parents were Farbauti and Laufey, though he swore brotherhood with Odin.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q54',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Who is the guardian of the Bifröst bridge, possessing golden teeth and extreme senses?',
    options: ['Heimdall', 'Tyr', 'Baldur', 'Hermod'],
    answer: 'Heimdall',
    hint: 'He can hear grass grow and blows the Gjallarhorn when Ragnarök starts.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q55',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Which Norse goddess claims half of all fallen warriors to her field Fólkvangr?',
    options: ['Frigg', 'Freyja', 'Hel', 'Sif'],
    answer: 'Freyja',
    hint: 'She is the goddess of beauty, love, war, and Seiðr magic.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q56',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Who is the Norse god of justice, law, and single combat who lost his hand?',
    options: ['Thor', 'Tyr', 'Baldur', 'Freyr'],
    answer: 'Tyr',
    hint: 'He placed his hand in Fenrir\'s jaws to bind the wolf.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q57',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Which god is the twin of Freyja, ruler of Alfheim, who wields an antler weapon?',
    options: ['Baldur', 'Heimdall', 'Freyr', 'Njord'],
    answer: 'Freyr',
    hint: 'He sacrificed his magical sword to marry the giantess Gerdr.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q58',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Who is the wife of Odin and queen of Asgard, associated with marriage and spindles?',
    options: ['Freyja', 'Frigg', 'Idunn', 'Skadi'],
    answer: 'Frigg',
    hint: 'She made all things swear not to harm her son Baldur.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q59',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Which goddess guards the youth-giving golden apples of Asgard?',
    options: ['Frigg', 'Idunn', 'Freyja', 'Nanna'],
    answer: 'Idunn',
    hint: 'Her abduction by the giant Thjazi caused the gods to grow old and grey.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q60',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Who is the ruler of the Norse cold underworld for those who die of sickness?',
    options: ['Hel', 'Loki', 'Angrboda', 'Ran'],
    answer: 'Hel',
    hint: 'She is Loki\'s daughter, half living skin and half rotting flesh.',
    difficulty: 'Initiate'
  },
  // 61-70: Symbols (Symbol matching)
  {
    id: 'ns_q61',
    pantheon: 'norse',
    type: 'symbol',
    question: 'The Valknut (three interlocking triangles) is a symbol primarily associated with which god?',
    options: ['Thor', 'Odin', 'Loki', 'Tyr'],
    answer: 'Odin',
    hint: 'It represents the transition between life, death, and battle warriors.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q62',
    pantheon: 'norse',
    type: 'symbol',
    question: 'Which Norse god is symbolized by the goat-pulled chariot and Mjölnir?',
    options: ['Thor', 'Heimdall', 'Odin', 'Ullr'],
    answer: 'Thor',
    hint: 'His goats Tanngrisnir and Tanngnjóstr pull him through storms.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q63',
    pantheon: 'norse',
    type: 'symbol',
    question: 'The Gungnir spear and the ravens Huginn and Muninn are symbols of which deity?',
    options: ['Heimdall', 'Tyr', 'Odin', 'Freyr'],
    answer: 'Odin',
    hint: 'The ravens represent Thought and Memory.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q64',
    pantheon: 'norse',
    type: 'symbol',
    question: 'A chariot pulled by two large blue cats is a symbol of which Norse goddess?',
    options: ['Freyja', 'Frigg', 'Skadi', 'Sif'],
    answer: 'Freyja',
    hint: 'She is the Vanir goddess of love, war, and magic.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q65',
    pantheon: 'norse',
    type: 'symbol',
    question: 'The Gjallarhorn horn and the rainbow Bifröst bridge are symbols of whom?',
    options: ['Heimdall', 'Odin', 'Hermod', 'Baldur'],
    answer: 'Heimdall',
    hint: 'He is the watchman of the Norse heavens.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q66',
    pantheon: 'norse',
    type: 'symbol',
    question: 'Which god is associated with the interlocking snakes emblem, representing deceit?',
    options: ['Loki', 'Fenrir', 'Jörmungandr', 'Hodr'],
    answer: 'Loki',
    hint: 'He is the shape-shifting harbinger of chaos.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q67',
    pantheon: 'norse',
    type: 'symbol',
    question: 'The golden boar Gullinbursti and folding ship Skidbladnir are symbols of which god?',
    options: ['Freyr', 'Njord', 'Baldur', 'Heimdall'],
    answer: 'Freyr',
    hint: 'He rules over the light elves in Alfheim.',
    difficulty: 'Champion'
  },
  {
    id: 'ns_q68',
    pantheon: 'norse',
    type: 'symbol',
    question: 'The Tiwaz rune (↑) representing justice and combat victory is dedicated to which god?',
    options: ['Odin', 'Thor', 'Tyr', 'Vidar'],
    answer: 'Tyr',
    hint: 'Viking warriors carved this rune on swords before battles.',
    difficulty: 'Champion'
  },
  {
    id: 'ns_q69',
    pantheon: 'norse',
    type: 'symbol',
    question: 'Skiing, bows, and mountain peaks are symbols of which giantess-goddess?',
    options: ['Skadi', 'Gerd', 'Rindr', 'Jord'],
    answer: 'Skadi',
    hint: 'She married Njord but preferred her cold mountain home.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q70',
    pantheon: 'norse',
    type: 'symbol',
    question: 'The eight-legged horse Sleipnir was ridden by Odin but fathered/birthed by whom?',
    options: ['Loki', 'Svadilfari', 'Fenrir', 'Odin himself'],
    answer: 'Loki',
    hint: 'Loki shapeshifted into a mare to distract a builder\'s stallion.',
    difficulty: 'Champion'
  },
  // 71-80: Timelines & Chronology (Order)
  {
    id: 'ns_q71',
    pantheon: 'norse',
    type: 'timeline',
    question: 'What event occurred FIRST in Norse creation history?',
    options: ['The death of Ymir', 'The binding of Fenrir', 'The birth of Sleipnir', 'The death of Baldur'],
    answer: 'The death of Ymir',
    hint: 'Odin slew this primordial giant to create the Earth.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q72',
    pantheon: 'norse',
    type: 'timeline',
    question: 'What catastrophic event happens LAST in Norse prophecy?',
    options: ['Fimbulwinter', 'The battle of Vigrid / Ragnarök', 'The rebirth of the Earth', 'The escape of Fenrir'],
    answer: 'The rebirth of the Earth',
    hint: 'After Surtr burns the cosmos, the green land rises renewed from the sea.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q73',
    pantheon: 'norse',
    type: 'timeline',
    question: 'Arrange these three timeline events from EARLIEST to LATEST.',
    options: ['Odin sacrifices eye -> Baldur dies -> Ragnarök', 'Baldur dies -> Odin sacrifices eye -> Ragnarök', 'Ragnarök -> Baldur dies -> Odin sacrifices eye', 'Odin sacrifices eye -> Ragnarök -> Baldur dies'],
    answer: 'Odin sacrifices eye -> Baldur dies -> Ragnarök',
    hint: 'Odin gained wisdom first, Baldur\'s death is the catalyst, Ragnarök is the finale.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q74',
    pantheon: 'norse',
    type: 'timeline',
    question: 'Loki birthed/fathered his monster children (Fenrir, Jörmungandr, Hel) during which era?',
    options: ['Before Asgard\'s wall was built', 'After Asgard\'s wall was built but before Baldur\'s death', 'After Baldur\'s death', 'During Ragnarök'],
    answer: 'After Asgard\'s wall was built but before Baldur\'s death',
    hint: 'The gods captured and bound these children during the era of Asgard\'s peace.',
    difficulty: 'Champion'
  },
  {
    id: 'ns_q75',
    pantheon: 'norse',
    type: 'timeline',
    question: 'Who was the first giant from whose melting ice sweat other giants were born?',
    options: ['Ymir', 'Buri', 'Borr', 'Mimir'],
    answer: 'Ymir',
    hint: 'He is the grandfather of giants and gods.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q76',
    pantheon: 'norse',
    type: 'timeline',
    question: 'Which Norse king did the hero Sigurd serve, according to the saga?',
    options: ['Hjalprek', 'Ragnar', 'Hrolf Kraki', 'Gylfi'],
    answer: 'Hjalprek',
    hint: 'Sigurd grew up in this king\'s court after his father Sigmund died.',
    difficulty: 'Oracle'
  },
  {
    id: 'ns_q77',
    pantheon: 'norse',
    type: 'timeline',
    question: 'What is the three-year winter that PRECEDES Ragnarök called?',
    options: ['Fimbulwinter', 'Niflwinter', 'Ginnungawinter', 'Surt\'s winter'],
    answer: 'Fimbulwinter',
    hint: 'It means "Great Winter" where snow blows from all directions.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q78',
    pantheon: 'norse',
    type: 'timeline',
    question: 'Who will kill Odin during Ragnarök?',
    options: ['Fenrir', 'Jörmungandr', 'Loki', 'Surtr'],
    answer: 'Fenrir',
    hint: 'The giant wolf will devour the Allfather before Vidar rips the wolf\'s jaws.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q79',
    pantheon: 'norse',
    type: 'timeline',
    question: 'Which of Loki\'s children was born FIRST?',
    options: ['Sleipnir', 'Fenrir', 'Jörmungandr', 'Hel'],
    answer: 'Sleipnir',
    hint: 'He birthed Sleipnir early during the construction of Asgard\'s wall.',
    difficulty: 'Oracle'
  },
  {
    id: 'ns_q80',
    pantheon: 'norse',
    type: 'timeline',
    question: 'Who is the god who survives Ragnarök to lead the new generation?',
    options: ['Vidar', 'Baldur (reborn)', 'Magni & Modi', 'All of the above'],
    answer: 'All of the above',
    hint: 'Vidar, Vali, Thor\'s sons Magni and Modi, and a resurrected Baldur and Hodr rebuild.',
    difficulty: 'Champion'
  },
  // 81-90: Weaknesses (Combat weaknesses)
  {
    id: 'ns_q81',
    pantheon: 'norse',
    type: 'weakness',
    question: 'What is the only substance that could harm the god Baldur?',
    options: ['Mistletoe', 'Silver', 'Runes of fire', 'Underworld frost'],
    answer: 'Mistletoe',
    hint: 'It was deemed too young to swear the oath to Frigg.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q82',
    pantheon: 'norse',
    type: 'weakness',
    question: 'How did the gods successfully bind the giant wolf Fenrir?',
    options: ['Using titanium chains', 'Using a silk ribbon (Gleipnir)', 'Strikng him with lightning', 'Freezing him in Helheim ice'],
    answer: 'Using a silk ribbon (Gleipnir)',
    hint: 'Gleipnir was made of impossible things by dwarf magic.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q83',
    pantheon: 'norse',
    type: 'weakness',
    question: 'What weakness of Frost Giants did Thor exploit to kill Hrungnir?',
    options: ['Hrungnir\'s stone head / Shield placement', 'Shattering Hrungnir\'s clay giant helper Mockurkalfi', 'Hrungnir\'s weak vision', 'All of the above'],
    answer: 'Hrungnir\'s stone head / Shield placement',
    hint: 'Thor threw Mjölnir, smashing Hrungnir\'s stone skull and hone weapon.',
    difficulty: 'Champion'
  },
  {
    id: 'ns_q84',
    pantheon: 'norse',
    type: 'weakness',
    question: 'How did Sigurd kill the dragon Fafnir?',
    options: ['Stabbing Fafnir from a dug trench', 'Slaying it with a bow from a mountain', 'Choking it with chains', 'Blinding it with light spells'],
    answer: 'Stabbing Fafnir from a dug trench',
    hint: 'Odin advised him to dig trenches to avoid the dragon\'s poison blood.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q85',
    pantheon: 'norse',
    type: 'weakness',
    question: 'Norse Trolls are extremely vulnerable to what natural element?',
    options: ['Water', 'Sunlight', 'Frost', 'Iron'],
    answer: 'Sunlight',
    hint: 'Direct sun rays turn trolls instantly into stone.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q86',
    pantheon: 'norse',
    type: 'weakness',
    question: 'How did Thor fish up and challenge the World Serpent Jörmungandr?',
    options: ['Using a ox head as bait', 'Using gold coins', 'Playing a magical flute', 'Diving into the ocean'],
    answer: 'Using a ox head as bait',
    hint: 'He used Hymir\'s black bull head on a heavy chain line.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q87',
    pantheon: 'norse',
    type: 'weakness',
    question: 'Draugr undead are vulnerable to what elements, which completely halts their return?',
    options: ['Salt', 'Decapitation and burning', 'Freezing water', 'Holy oil'],
    answer: 'Decapitation and burning',
    hint: 'Sagas state barrow wights must be beheaded and burned to ashes.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q88',
    pantheon: 'norse',
    type: 'weakness',
    question: 'What is the weakness of the magical horse Svadilfari?',
    options: ['Distraction by a shapeshifted mare (Loki)', 'Runic heavy traps', 'Iron horseshoes', 'Exhaustion in heat'],
    answer: 'Distraction by a shapeshifted mare (Loki)',
    hint: 'Loki lured the stallion away in the forest to delay Asgard\'s wall builder.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q89',
    pantheon: 'norse',
    type: 'weakness',
    question: 'During Ragnarök, what element does the fire giant Surtr use to destroy Yggdrasil?',
    options: ['Lava stomp', 'His flaming sword', 'Acid rain', 'Dark magic'],
    answer: 'His flaming sword',
    hint: 'He flings fire in all directions, engulfing the heavens and earth.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q90',
    pantheon: 'norse',
    type: 'weakness',
    question: 'How was the giant Thjazi killed by the Aesir?',
    options: ['Smothered by fire wood lines', 'Shot by arrows in eagle form', 'Choked by chains', 'Struck by Mjölnir'],
    answer: 'Smothered by fire wood lines',
    hint: 'The gods lit wood shavings as he flew over Asgard\'s walls, burning his feathers.',
    difficulty: 'Champion'
  },
  // 91-100: Advanced Lore (General)
  {
    id: 'ns_q91',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'What is the name of the bridge linking Asgard to Midgard?',
    options: ['Bifröst', 'Gjallarbru', 'Yggdrasil Root', 'Urdr\'s Way'],
    answer: 'Bifröst',
    hint: 'It is a shimmering rainbow bridge made of fire, air, and water.',
    difficulty: 'Initiate'
  },
  {
    id: 'ns_q92',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'What is the name of Odin\'s high seat from which he sees all realms?',
    options: ['Hlidskjalf', 'Bilskirnir', 'Gladsheim', 'Valaskjalf'],
    answer: 'Hlidskjalf',
    hint: 'Only Odin and Frigg are normally permitted to sit there.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q93',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Which dwarf pair forged Mjölnir, Gungnir, and Draupnir?',
    options: ['Brokkr & Sindri', 'Fjalar & Galar', 'Alvis & Dvalin', 'Ivaldi\'s sons'],
    answer: 'Brokkr & Sindri',
    hint: 'They forged them during a wager with Loki, who buzzed in their eyes as a fly.',
    difficulty: 'Champion'
  },
  {
    id: 'ns_q94',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'What is the name of the hall of the dead ruled by Hel?',
    options: ['Eljudnir', 'Sessrumnir', 'Fólkvangr', 'Gimle'],
    answer: 'Eljudnir',
    hint: 'It means "damp" or "misery".',
    difficulty: 'Oracle'
  },
  {
    id: 'ns_q95',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Which giantess rode a wolf with vipers for reins to Baldur\'s funeral?',
    options: ['Hyrrokkin', 'Angrboda', 'Gerdr', 'Thokk'],
    answer: 'Hyrrokkin',
    hint: 'She was summoned to push Baldur\'s massive funeral ship Hringhorni into the sea.',
    difficulty: 'Oracle'
  },
  {
    id: 'ns_q96',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Which of the following is NOT one of the three Norns (Fates)?',
    options: ['Urdr', 'Verdandi', 'Skuld', 'Sigyn'],
    answer: 'Sigyn',
    hint: 'Sigyn is Loki\'s loyal wife. Urdr is Past, Verdandi Present, Skuld Future.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q97',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'What is the name of the squirrel that runs up and down Yggdrasil?',
    options: ['Ratatoskr', 'Nidhogg', 'Veðrfölnir', 'Dvalinn'],
    answer: 'Ratatoskr',
    hint: 'He carries insults between the eagle at the top and the dragon Nidhogg at the roots.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q98',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'What is the drink of the gods that grants wisdom and poetry, brewed from Kvasir\'s blood?',
    options: ['Mead of Poetry', 'Ambrosia', 'Soma', 'Elixir of runes'],
    answer: 'Mead of Poetry',
    hint: 'Odin stole it from the giant Suttungr by shape-shifting into an eagle.',
    difficulty: 'Scholar'
  },
  {
    id: 'ns_q99',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'Which giant refused to weep Baldur back from Helheim, keeping him dead?',
    options: ['Thokk', 'Loki', 'Angrboda', 'Hrym'],
    answer: 'Thokk',
    hint: 'It was Loki in disguise as a giantess in a cave.',
    difficulty: 'Champion'
  },
  {
    id: 'ns_q100',
    pantheon: 'norse',
    type: 'multiple-choice',
    question: 'What is the name of the ship made from dead men\'s nails that sails during Ragnarök?',
    options: ['Naglfar', 'Skidbladnir', 'Hringhorni', 'Sessrumnir'],
    answer: 'Naglfar',
    hint: 'It carries the army of monsters led by the giant Hrym.',
    difficulty: 'Scholar'
  },

  // ==========================================
  // ============ EGYPTIAN PANTHEON (50) ==========
  // ==========================================
  
  // 101-110: Deities (Multiple-Choice)
  {
    id: 'eg_q101',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Who is the supreme Sun God and creator of the Ennead?',
    options: ['Horus', 'Ra', 'Anubis', 'Osiris'],
    answer: 'Ra',
    hint: 'He travels the sky in his solar barque and carries the solar disc.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q102',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Which jackal-headed deity invented mummification and weighs hearts in judgment?',
    options: ['Sobek', 'Anubis', 'Seth', 'Horus'],
    answer: 'Anubis',
    hint: 'He is the guardian of embalming and guide of souls in Duat.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q103',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Which goddess used magic to resurrect her husband Osiris and birth Horus?',
    options: ['Isis', 'Bastet', 'Hathor', 'Nephthys'],
    answer: 'Isis',
    hint: 'She is the queen of magic and protection, represented by throne headdress.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q104',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Who is the green-skinned judge of the dead and lord of the afterlife?',
    options: ['Ra', 'Osiris', 'Seth', 'Anubis'],
    answer: 'Osiris',
    hint: 'He was murdered and dismembered by Seth before resurrecting.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q105',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Which falcon-headed god is the avenger of his father Osiris and patron of pharaohs?',
    options: ['Thoth', 'Horus', 'Anubis', 'Seth'],
    answer: 'Horus',
    hint: 'He fought his uncle Seth for eighty years to claim the crown.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q106',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Who is the god of chaos, violence, deserts, and foreign lands?',
    options: ['Seth', 'Anubis', 'Sobek', 'Ptah'],
    answer: 'Seth',
    hint: 'He has red hair and murdered his brother Osiris.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q107',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Which ibis-headed god is the scribe of the gods, inventor of writing, and arbiter?',
    options: ['Thoth', 'Horus', 'Khepri', 'Ra'],
    answer: 'Thoth',
    hint: 'He records the scores at the Weighing of the Heart.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q108',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Which lioness goddess of war, plagues, and fire was sent to punish mankind?',
    options: ['Bastet', 'Sekhmet', 'Taweret', 'Ma\'at'],
    answer: 'Sekhmet',
    hint: 'Born as the wrathful Eye of Ra, she was pacified with red-dyed beer.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q109',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Which cat-headed goddess is the protector of the home, music, and cats?',
    options: ['Bastet', 'Sekhmet', 'Hathor', 'Isis'],
    answer: 'Bastet',
    hint: 'Her primary temple was at Bubastis, and she carries a sistrum rattle.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q110',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Who is the goddess of cosmic order, law, and truth, represented by an ostrich feather?',
    options: ['Ma\'at', 'Isis', 'Nut', 'Hathor'],
    answer: 'Ma\'at',
    hint: 'Her feather is used as a counterweight in the afterlife judgment scales.',
    difficulty: 'Initiate'
  },
  // 111-120: Symbols (Symbol matching)
  {
    id: 'eg_q111',
    pantheon: 'egyptian',
    type: 'symbol',
    question: 'The Wedjat (an eye with falcon markings) represents which symbol?',
    options: ['Eye of Ra', 'Eye of Horus', 'Eye of Thoth', 'Eye of Anubis'],
    answer: 'Eye of Horus',
    hint: 'It represents healing, royal power, and protection.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q112',
    pantheon: 'egyptian',
    type: 'symbol',
    question: 'The crook and flail (Heka and Nekhakha) are symbols representing which god\'s sovereignty?',
    options: ['Osiris', 'Ra', 'Seth', 'Anubis'],
    answer: 'Osiris',
    hint: 'These symbols of authority were held by agricultural kings and pharaohs.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q113',
    pantheon: 'egyptian',
    type: 'symbol',
    question: 'An ostrich feather worn on the head is the symbol of which deity?',
    options: ['Ma\'at', 'Isis', 'Hathor', 'Tefnut'],
    answer: 'Ma\'at',
    hint: 'She represents truth, justice, and order.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q114',
    pantheon: 'egyptian',
    type: 'symbol',
    question: 'The Tyet symbol, also known as the Knot of Isis, is associated with what?',
    options: ['A golden buckle', 'An anchor of magic', 'A red stone amulet of protection', 'A mummy binding wrapping'],
    answer: 'A red stone amulet of protection',
    hint: 'It represents the protective blood of Isis and feminine magic.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q115',
    pantheon: 'egyptian',
    type: 'symbol',
    question: 'The Scarab beetle (rolling dung/sun) is a symbol of which aspect of the sun god?',
    options: ['Khepri (rising sun)', 'Ra (midday sun)', 'Atum (setting sun)', 'Amon (hidden sun)'],
    answer: 'Khepri (rising sun)',
    hint: 'He represents self-creation and resurrection.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q116',
    pantheon: 'egyptian',
    type: 'symbol',
    question: 'Which Egyptian god is symbolized by a composite "Seth Animal" with square ears?',
    options: ['Seth', 'Anubis', 'Sobek', 'Kha'],
    answer: 'Seth',
    hint: 'He is the god of deserts, storms, and chaos.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q117',
    pantheon: 'egyptian',
    type: 'symbol',
    question: 'The Atef crown (white crown with ostrich feathers) is worn by which deity?',
    options: ['Osiris', 'Horus', 'Ra', 'Geb'],
    answer: 'Osiris',
    hint: 'He is the green-skinned king of the underworld.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q118',
    pantheon: 'egyptian',
    type: 'symbol',
    question: 'A solar disc encircled by a Uraeus cobra is the symbol of whom?',
    options: ['Ra', 'Horus', 'Isis', 'Thoth'],
    answer: 'Ra',
    hint: 'It represents divine kingship and the burning sun.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q119',
    pantheon: 'egyptian',
    type: 'symbol',
    question: 'The Sistrum rattle and collar necklace (Menat) are symbols of which musical goddess?',
    options: ['Bastet', 'Hathor', 'Isis', 'Nut'],
    answer: 'Bastet',
    hint: 'Cats are often depicted sitting near this rattle.',
    difficulty: 'Champion'
  },
  {
    id: 'eg_q120',
    pantheon: 'egyptian',
    type: 'symbol',
    question: 'Which symbol representing eternal life is held by almost all Egyptian gods?',
    options: ['Ankh', 'Was Scepter', 'Shen Ring', 'Djed Pillar'],
    answer: 'Ankh',
    hint: 'It is shaped like a cross with a loop at the top.',
    difficulty: 'Initiate'
  },
  // 121-130: Timelines & Chronology (Order)
  {
    id: 'eg_q121',
    pantheon: 'egyptian',
    type: 'timeline',
    question: 'Who was the FIRST god to arise from the watery void of Nun, according to Heliopolis creation?',
    options: ['Atum-Ra', 'Shu', 'Osiris', 'Horus'],
    answer: 'Atum-Ra',
    hint: 'He created himself on the primeval mound Benben.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q122',
    pantheon: 'egyptian',
    type: 'timeline',
    question: 'Which of the following events occurred LAST in Egyptian mythological history?',
    options: ['The murder of Osiris', 'The contendings of Horus and Seth', 'The reign of Ra on Earth', 'The creation of the Ennead'],
    answer: 'The contendings of Horus and Seth',
    hint: 'This was the eighty-year legal battle and war to settle the crown after Osiris\'s resurrection.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q123',
    pantheon: 'egyptian',
    type: 'timeline',
    question: 'Arrange these generations of Egyptian gods from OLDEST to YOUNGEST.',
    options: ['Ra -> Geb -> Osiris -> Horus', 'Geb -> Ra -> Osiris -> Horus', 'Ra -> Osiris -> Geb -> Horus', 'Ra -> Geb -> Horus -> Osiris'],
    answer: 'Ra -> Geb -> Osiris -> Horus',
    hint: 'Ra (Creator) -> Geb (Earth/father) -> Osiris (King/son) -> Horus (Grandson).',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q124',
    pantheon: 'egyptian',
    type: 'timeline',
    question: 'Which mythological pharaoh did the architect Imhotep serve historically?',
    options: ['Djoser', 'Ramesses II', 'Thutmose IV', 'Tutankhamun'],
    answer: 'Djoser',
    hint: 'Imhotep designed the Step Pyramid at Saqqara for this Third Dynasty king.',
    difficulty: 'Champion'
  },
  {
    id: 'eg_q125',
    pantheon: 'egyptian',
    type: 'timeline',
    question: 'What event caused Ra to send Sekhmet to destroy humanity?',
    options: ['Humanity rebelled because Ra grew old', 'Humans stole the Book of Thoth', 'Osiris was murdered', 'Horus lost his eye'],
    answer: 'Humanity rebelled because Ra grew old',
    hint: 'This myth is recorded in the Book of the Heavenly Cow.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q126',
    pantheon: 'egyptian',
    type: 'timeline',
    question: 'Who resurrected Osiris after he was chopped into pieces?',
    options: ['Isis & Nephthys', 'Horus & Anubis', 'Thoth & Ra', 'Sobek & Seth'],
    answer: 'Isis & Nephthys',
    hint: 'They searched for the parts across Egypt, using embalming help from Anubis.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q127',
    pantheon: 'egyptian',
    type: 'timeline',
    question: 'Who was the father of Anubis?',
    options: ['Osiris', 'Seth', 'Ra', 'Geb'],
    answer: 'Osiris',
    hint: 'Nephthys disguised herself as Isis to conceive this embalmer god with the king.',
    difficulty: 'Champion'
  },
  {
    id: 'eg_q128',
    pantheon: 'egyptian',
    type: 'timeline',
    question: 'Where did Isis hide the baby Horus to protect him from Seth?',
    options: ['The delta marshes of Khemmis', 'The caves of Sinai', 'The temples of Thebes', 'The Underworld Duat'],
    answer: 'The delta marshes of Khemmis',
    hint: 'A dense region of floating papyrus reeds.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q129',
    pantheon: 'egyptian',
    type: 'timeline',
    question: 'Which god ruled Egypt FIRST?',
    options: ['Ra', 'Osiris', 'Horus', 'Seth'],
    answer: 'Ra',
    hint: 'The solar creator ruled during the golden first epoch before ascending to heaven.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q130',
    pantheon: 'egyptian',
    type: 'timeline',
    question: 'Who recording the final judgment scores at Osiris\'s scale?',
    options: ['Thoth', 'Anubis', 'Ma\'at', 'Ra'],
    answer: 'Thoth',
    hint: 'He is the divine scribe of writing and laws.',
    difficulty: 'Initiate'
  },
  // 131-140: Weaknesses (Combat weaknesses)
  {
    id: 'eg_q131',
    pantheon: 'egyptian',
    type: 'weakness',
    question: 'What is the weakness of the chaos serpent Apophis that allows Seth to defeat him daily?',
    options: ['Iron spears / Was Scepter', 'Freezing wind spells', 'Solar eclipses', 'Loud horns'],
    answer: 'Iron spears / Was Scepter',
    hint: 'Seth stands at the prow of the solar boat, stabbing him with a spear.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q132',
    pantheon: 'egyptian',
    type: 'weakness',
    question: 'How did the gods pacify the rampaging lioness Sekhmet to save mankind?',
    options: ['Dyeing beer red to look like blood', 'Chaining her in Saqqara vaults', 'Blinding her with mirror shields', 'Singing a lullaby of peace'],
    answer: 'Dyeing beer red to look like blood',
    hint: 'She drank the pomegranate beer, became intoxicated, and fell asleep.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q133',
    pantheon: 'egyptian',
    type: 'weakness',
    question: 'Mummified tomb guardians and spirits are highly vulnerable to what magic?',
    options: ['Fire / Solar light spells', 'Water / Nile flood spells', 'Shadow magic', 'Physical club impacts'],
    answer: 'Fire / Solar light spells',
    hint: 'Linen and wraps are flammable, and mummies represent decay countered by solar life.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q134',
    pantheon: 'egyptian',
    type: 'weakness',
    question: 'What is the weakness of the devouring demon Ammit?',
    options: ['The Feather of Ma\'at (truth)', 'Anubian jackal claws', 'Drowning in the Nile', 'Iron weapons'],
    answer: 'The Feather of Ma\'at (truth)',
    hint: 'She cannot devour souls whose hearts are balanced with Ma\'at\'s truth.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q135',
    pantheon: 'egyptian',
    type: 'weakness',
    question: 'The sandstorms of Seth are weak against what elemental element?',
    options: ['Water spells', 'Wind deflection shields', 'Solar light arrows', 'Earth bindings'],
    answer: 'Water spells',
    hint: 'Water settles dry desert sands, neutralizing Set\'s storm armor.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q136',
    pantheon: 'egyptian',
    type: 'weakness',
    question: 'How did Ra cure himself of the divine snake bite inflicted by Isis?',
    options: ['Revealing his secret name to Isis', 'Drinking Nile lotus juice', 'Stealing Thoth\'s medicine book', 'Sacrificing his solar disc'],
    answer: 'Revealing his secret name to Isis',
    hint: 'Only Isis\'s magic could heal the snake she created from his spit.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q137',
    pantheon: 'egyptian',
    type: 'weakness',
    question: 'How was the Sphinx of Giza bypassed by historical pilgrims?',
    options: ['Answering its riddle correctly', 'Defeating its stone claws', 'Offering gold coins', 'Throwing sand in its eyes'],
    answer: 'Answering its riddle correctly',
    hint: 'It tests wisdom rather than raw strength, letting the wise pass.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q138',
    pantheon: 'egyptian',
    type: 'weakness',
    question: 'The god Ra, in his night journey, is vulnerable to what cosmic shadow?',
    options: ['Solar Eclipse (Apophis swallowing him)', 'Underworld ice storm', 'Drowning in Nun waters', 'Loss of his scepter'],
    answer: 'Solar Eclipse (Apophis swallowing him)',
    hint: 'If Apophis devours the barque, the cosmos returns to chaotic night.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q139',
    pantheon: 'egyptian',
    type: 'weakness',
    question: 'Flesh-eating scarab swarms are weak against what strategy?',
    options: ['Splash fire spells / Heavy crushing stomps', 'Single sword strikes', 'Shadow concealment', 'Wind gusts'],
    answer: 'Splash fire spells / Heavy crushing stomps',
    hint: 'Individually fragile but dangerous in groups, they must be squashed in mass.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q140',
    pantheon: 'egyptian',
    type: 'weakness',
    question: 'The stone jackal guardians of Anubis are vulnerable to what weapon damage?',
    options: ['Bludgeoning hammers / blunt impact', 'Sharp slash blades', 'Ice freeze spells', 'Wind gust pushes'],
    answer: 'Bludgeoning hammers / blunt impact',
    hint: 'They are carved of obsidian stone, which shatters under heavy impact.',
    difficulty: 'Scholar'
  },
  // 141-150: Advanced Lore (General)
  {
    id: 'eg_q141',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Who was the goddess of the sky, depicted as a star-spangled woman arching over Geb?',
    options: ['Nut', 'Isis', 'Tefnut', 'Hathor'],
    answer: 'Nut',
    hint: 'Her husband/brother is Geb, the earth god below her.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q142',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'What is the name of the primeval mound that rose from Nun waters at creation?',
    options: ['Benben', 'Karnak', 'Abydos', 'Giza'],
    answer: 'Benben',
    hint: 'Obelisks and pyramid capstones (pyramidions) are modeled after it.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q143',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Which of the following is NOT one of the Four Sons of Horus who guard canopic jars?',
    options: ['Imsety', 'Hapy', 'Duamutef', 'Imhotep'],
    answer: 'Imhotep',
    hint: 'Imhotep is the architect sage. The fourth son is Qebehsenuef.',
    difficulty: 'Champion'
  },
  {
    id: 'eg_q144',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Which Egyptian wizard prince is the hero of Demotic stories, searcher of Thoth\'s book?',
    options: ['Khaemwaset', 'Thutmose IV', 'Amenhotep', 'Sneferu'],
    answer: 'Khaemwaset',
    hint: 'He was a son of Ramesses II and high priest of Ptah.',
    difficulty: 'Champion'
  },
  {
    id: 'eg_q145',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Who is the god of the Nile inundation, depicted as a plump man with green skin?',
    options: ['Hapi', 'Osiris', 'Sobek', 'Khnum'],
    answer: 'Hapi',
    hint: 'He represents the fertilizing mud deposits left by annual floods.',
    difficulty: 'Champion'
  },
  {
    id: 'eg_q146',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Which deity fashioned humans on a potter\'s wheel from clay?',
    options: ['Khnum', 'Ptah', 'Atum', 'Thoth'],
    answer: 'Khnum',
    hint: 'The ram-headed god associated with the source of the Nile.',
    difficulty: 'Champion'
  },
  {
    id: 'eg_q147',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'What is the name of the Egyptian paradise where worthy souls spend eternity?',
    options: ['Field of Reeds (Aaru)', 'Duat', 'Heliopolis Mound', 'Hall of Truths'],
    answer: 'Field of Reeds (Aaru)',
    hint: 'It is a place of agricultural abundance and peace, ruled by Osiris.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q148',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Who is the crocodile god of strength, fertility, and military power?',
    options: ['Sobek', 'Anubis', 'Seth', 'Hapi'],
    answer: 'Sobek',
    hint: 'His main cult centers were in Faiyum and Kom Ombo.',
    difficulty: 'Initiate'
  },
  {
    id: 'eg_q149',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'What was the name of Ra\'s sacred sun temple obelisk marker at Heliopolis?',
    options: ['Benben', 'Tehuti', 'Djed', 'Uraeus'],
    answer: 'Benben',
    hint: 'It was the first point of land struck by the sun\'s rays.',
    difficulty: 'Scholar'
  },
  {
    id: 'eg_q150',
    pantheon: 'egyptian',
    type: 'multiple-choice',
    question: 'Which demon eats the souls of those who fail their final judgement in Duat?',
    options: ['Ammit', 'Apophis', 'Sha', 'Babi'],
    answer: 'Ammit',
    hint: 'Part crocodile, part lion, part hippopotamus.',
    difficulty: 'Initiate'
  }
];
