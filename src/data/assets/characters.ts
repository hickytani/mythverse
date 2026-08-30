export interface CharacterAssetDefinition {
  id: string;
  name: string;
  title: string;
  pantheon: 'greek' | 'norse' | 'egyptian';
  avatarSvgType: 'scholar' | 'wanderer' | 'keeper' | 'rune';
  dialogueIntro: string;
  affinityThresholds: Record<string, number>;
  initialQuests: {
    id: string;
    title: string;
    description: string;
    objective: string;
    rewardXp: number;
    rewardCoins: number;
  }[];
}

export const characterAssetRegistry: Record<string, CharacterAssetDefinition> = {
  char_athena: {
    id: 'char_athena',
    name: 'Athena',
    title: 'Goddess of Wisdom & Strategic Warfare',
    pantheon: 'greek',
    avatarSvgType: 'scholar',
    dialogueIntro: 'Greetings, Mythwalker. Courage without strategy is mere madness. State your purpose before the Parthenon.',
    affinityThresholds: { Encountered: 0, Ally: 100, Trusted: 300, Champion: 600 },
    initialQuests: [
      {
        id: 'q_athena_trial',
        title: "Athena's Delphic Trial",
        description: 'Demonstrate your grasp of Olympian lore by answering quiz challenges or defeating the Gorgon Sentinel.',
        objective: 'Defeat 1 creature in Olympian Arena or complete a Greek Quiz.',
        rewardXp: 150,
        rewardCoins: 75,
      },
    ],
  },
  char_zeus: {
    id: 'char_zeus',
    name: 'Zeus',
    title: 'King of Olympus & Sovereign of Thunder',
    pantheon: 'greek',
    avatarSvgType: 'scholar',
    dialogueIntro: 'Mortal, you stand in the presence of the Aegis. Hear the thunder roll across the peaks of Olympus!',
    affinityThresholds: { Encountered: 0, Ally: 150, Trusted: 400, Champion: 800 },
    initialQuests: [
      {
        id: 'q_zeus_thunder',
        title: 'Claim the Thunder Bolt',
        description: 'Prove your mettle in the Forge by upgrading your signature weapon to Level 2.',
        objective: 'Upgrade any weapon at the Forge.',
        rewardXp: 200,
        rewardCoins: 100,
      },
    ],
  },
  char_thor: {
    id: 'char_thor',
    name: 'Thor Odinson',
    title: 'Asgardian Champion & Lord of Mjölnir',
    pantheon: 'norse',
    avatarSvgType: 'wanderer',
    dialogueIntro: 'HA! A newcomer to Midgard! Grab your weapon and let us see if your arm is strong enough for Mjölnir!',
    affinityThresholds: { Encountered: 0, Ally: 100, Trusted: 300, Champion: 600 },
    initialQuests: [
      {
        id: 'q_thor_draugr',
        title: 'Barrow Draugr Cleanse',
        description: 'Drive back the frost draugr threatening the gates of Bifröst.',
        objective: 'Win 1 combat battle in Midgard Barrow Grounds.',
        rewardXp: 180,
        rewardCoins: 90,
      },
    ],
  },
  char_anubis: {
    id: 'char_anubis',
    name: 'Anubis',
    title: 'Lord of the Sacred Land & Guide of Souls',
    pantheon: 'egyptian',
    avatarSvgType: 'keeper',
    dialogueIntro: 'Step softly across the sands, traveler. Maat weighs every secret of the heart upon her golden scales.',
    affinityThresholds: { Encountered: 0, Ally: 100, Trusted: 300, Champion: 600 },
    initialQuests: [
      {
        id: 'q_anubis_feather',
        title: 'Feather of Maat',
        description: 'Unlock 3 entries in the Codex to prove your respect for ancient Egyptian records.',
        objective: 'Discover 3 Codex entities.',
        rewardXp: 160,
        rewardCoins: 80,
      },
    ],
  },
};
