import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Fallback intelligent simulated chatbot responses based on seed keywords
const fallbackLoreResponses = (prompt: string): string => {
  const query = prompt.toLowerCase();
  
  if (query.includes('thor') || query.includes('mjolnir') || query.includes('mjölnir')) {
    return `Thor is the Norse god of thunder, storms, and strength. Wielding his mighty hammer Mjölnir, he is Asgard's primary protector against the Jötnar (Frost Giants). Mjölnir was forged by the dwarf brothers Brokkr and Sindri as a result of Loki's wager. In battle, Thor wears Megingjörð (strength belt) and rides a chariot pulled by the goats Tanngrisnir and Tanngnjóstr. During Ragnarök, Thor is destined to slay the World Serpent Jörmungandr, but will perish after taking nine steps due to the serpent's lethal poison.`;
  }
  
  if (query.includes('zeus') || query.includes('olympus') || query.includes('thunderbolt')) {
    return `Zeus is the sovereign ruler of Mount Olympus and King of the Greek gods. Having rescued his siblings by poisoning his father Cronus, he led the Olympians to victory in the ten-year Titanomachy. Zeus controls the sky, weather, and thunder, casting lightning bolts forged by the Elder Cyclopes. His symbols include the Eagle, Scepter, and Aegis. His complex familial network contains children such as Athena, Apollo, Ares, and Heracles, and his jealous wife is the goddess Hera.`;
  }
  
  if (query.includes('osiris') || query.includes('isis') || query.includes('egypt') || query.includes('seth')) {
    return `Osiris was the legendary green-skinned king of Egypt who taught agriculture and laws to humanity. He was murdered and dismembered into fourteen pieces by his jealous brother Seth, god of deserts and chaos. His wife, the arch-mage Isis, recovered his remains and resurrected him using mummification rituals with the jackal god Anubis. Now, Osiris serves as ruler of the Duat (underworld) and chief judge of the Weighing of the Heart, welcoming pure souls to the Field of Reeds (Aaru).`;
  }

  if (query.includes('apophis') || query.includes('apep') || query.includes('serpent')) {
    return `Apophis (or Apep) is the ancient Egyptian serpent of darkness and non-existence (Isfet). Every night in the underworld, Apophis attempts to devour Ra's solar barque during its twelve-hour transition. Seth and Bastet stand at the prow of the barque, spear-fighting the giant coils of the snake to defend the sun, ensuring Ra rises at dawn.`;
  }

  if (query.includes('ragnarok') || query.includes('ragnarök') || query.includes('surtr')) {
    return `Ragnarök is the "Twilight of the Gods" in Norse prophecy. Preceded by Fimbulwinter, the gates of Helheim and Muspelheim will break. Surtr, the giant of fire, will lead the march across Bifröst with his burning sword. On the field of Vigrid, Odin is devoured by Fenrir, Thor falls to Jörmungandr's poison, and Surtr burns the nine realms to ash, which sinks into the ocean to eventually rise again renewed.`;
  }

  if (query.includes('medusa') || query.includes('gorgon')) {
    return `Medusa was one of the three Gorgon sisters, cursed by Athena to have living snakes for hair and a petrifying gaze that turns any onlooker to stone. Perseus defeated her by looking at her reflection through a mirrored shield, decapitating her. From her severed neck sprang the winged horse Pegasus and the giant warrior Chrysaor.`;
  }

  if (query.includes('combat') || query.includes('fight') || query.includes('battle')) {
    return `To succeed in creature combats, utilize "Exploit Weakness" to trigger mythology trivia challenges. Answering correctly will multiply your damage output by 1.5x, disable the creature's next turn, and restore spirit points. Remember: Frost Giants are weak to Fire, Undead are weak to Light/Sun spells, and stone jackal sentinels shatter under heavy bludgeoning axes or hammers!`;
  }

  if (query.includes('forge') || query.includes('upgrade') || query.includes('weapon') || query.includes('armor')) {
    return `In the Forge, you can spend bronze fragments, rune stones, and spirit thread collected from campaign stages and combat loot drops to level up your weapons and armors. Each weapon level increases base damage by 25%, and armor levels boost defense rating by 22%. Fully upgraded level 5 equipment unlocks powerful passive combat traits!`;
  }

  return `As a Mythwalker, your mind must be as sharp as your sword. Ask me specific questions about characters (e.g. Zeus, Thor, Isis), events (Ragnarök, Titanomachy), locations, or combat mechanics, and I will search the ancient libraries for answers.`;
};

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return simulated context answer when API key is missing
      const simulatedReply = fallbackLoreResponses(prompt);
      return NextResponse.json({ reply: simulatedReply });
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are the Gemini Lore Companion, an ancient keeper of legends for the MythVerse platform.
Your task is to answer inquiries about Greek, Norse, and Egyptian mythology.
- Ground your answers in academic and historical sources (e.g. Homer, Hesiod, Prose Edda, Book of the Dead).
- Maintain an atmospheric, wise, and helpful tone (as an ancient oracle or scholar).
- Keep responses relatively concise, structured in clean Markdown, and do not make up facts.
- Distinguish between ancient mythology and modern pop culture adaptations.
- If asked about combat or forge features on the platform, guide the user to explore the map, play quizzes, and upgrade weapons.`;

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + `\n\nUser Question: ${prompt}` }] }
      ]
    });

    const reply = result.response.text();
    return NextResponse.json({ reply });

  } catch (error: unknown) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}
