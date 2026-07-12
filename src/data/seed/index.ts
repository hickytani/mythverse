import { deities } from './deities';
import { heroes } from './heroes';
import { creatures, CreatureEntity } from './creatures';
import { realms, RealmEntity } from './realms';
import { weapons } from './weapons';
import { armor } from './armor';
import { relics } from './relics';
import { myths } from './myths';
import { campaigns, sideQuests } from './quests';
import { quizQuestions } from './quizzes';
import { achievements, titles } from './progression';
import { characters } from './characters';

export const mythologyDb = {
  deities,
  heroes,
  creatures,
  realms,
  weapons,
  armor,
  relics,
  myths,
  campaigns,
  sideQuests,
  quizQuestions,
  achievements,
  titles,
  characters
};

export type MythologyDb = typeof mythologyDb;

export type { CreatureEntity, RealmEntity };
export { deities, heroes, creatures, realms, weapons, armor, relics, myths, campaigns, sideQuests, quizQuestions, achievements, titles, characters };

