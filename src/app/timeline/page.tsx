'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { mythologyDb } from '@/data/seed';
import { audioEngine } from '@/utils/audioEngine';
import { Clock, Eye, AlertCircle, Bookmark, Compass } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  pantheon: 'greek' | 'norse' | 'egyptian';
  era: string;
  description: string;
  details: string;
  source: string;
}

const timelineEvents: TimelineEvent[] = [
  // --- GREEK TIMELINE ---
  {
    id: 'gr_t1',
    title: 'The Primordial Cosmogony',
    pantheon: 'greek',
    era: 'Cosmic Origin',
    description: 'Chaos separates, birthing Gaia (Earth), Uranus (Sky), and Tartarus (Underworld).',
    details: 'In the beginning was Chaos, the void. Gaia materialized and birthed Uranus to cover her. Their union generated the Titans, Elder Cyclopes, and Hecatoncheires, launching the initial age of gods.',
    source: 'Hesiod\'s Theogony'
  },
  {
    id: 'gr_t2',
    title: 'The Titanomachy Revolt',
    pantheon: 'greek',
    era: 'Divine War Era',
    description: 'Zeus poisons Cronus, releasing his swallowed siblings and initiating a ten-year war.',
    details: 'Fearing overthrow, Cronus swallowed his offspring. Rhea hid Zeus in Crete. When grown, Zeus fed Cronus an emetic, freeing Hades, Poseidon, Hera, Demeter, and Hestia. Together with the Cyclopes, they defeated the Titans.',
    source: 'Apollodorus\'s Library'
  },
  {
    id: 'gr_t3',
    title: 'The Theft of Fire',
    pantheon: 'greek',
    era: 'Humanity Age',
    description: 'Prometheus steals sparks from Hephaestus\'s forge, gifting technology to mortals.',
    details: 'Seeking to aid the fragile human race, Prometheus smuggled fire inside a hollow stalk of fennel. For this act of hubris, Zeus chained him to Mt. Caucasus and sent Pandora to release earthly plagues.',
    source: 'Aeschylus\'s Prometheus Bound'
  },
  {
    id: 'gr_t4',
    title: 'The Slaying of Medusa',
    pantheon: 'greek',
    era: 'Heroic Age',
    description: 'Perseus decapitates the Gorgon, using her petrifying gaze to rescue Andromeda.',
    details: 'Aided by Athena\'s mirrored shield and Hermes\' winged sandals, Perseus penetrated the Gorgon\'s cavern, sliced Medusa\'s head in her sleep, and escaped, spawning the winged stallion Pegasus.',
    source: 'Ovid\'s Metamorphoses'
  },
  {
    id: 'gr_t5',
    title: 'The Siege of Troy',
    pantheon: 'greek',
    era: 'Trojan War Era',
    description: 'Odysseus devises the Trojan Horse, ending the ten-year siege of Ilium.',
    details: 'Following the abduction of Helen, the Achaean coalition sailed to Troy. After ten years of stalemate and Achilles\' death, Odysseus built a massive wooden horse. Trojans dragged it inside, leading to their doom.',
    source: 'Homer\'s Iliad & Virgil\'s Aeneid'
  },

  // --- NORSE TIMELINE ---
  {
    id: 'nr_t1',
    title: 'Dismemberment of Ymir',
    pantheon: 'norse',
    era: 'Cosmic Origin',
    description: 'Odin, Vili, and Ve slay the primordial giant Ymir to forge Midgard.',
    details: 'Ice of Niflheim melted in fire of Muspelheim, forming Ymir. The first gods arose and slew Ymir, carving his flesh into earth, his blood into oceans, his bones into cliffs, and skull into the sky.',
    source: 'Prose Edda (Gylfaginning)'
  },
  {
    id: 'nr_t2',
    title: 'The Binding of Fenrir',
    pantheon: 'norse',
    era: 'Aesir Consolidation',
    description: 'Tyr sacrifices his right hand to bind the monstrous giant wolf with Gleipnir.',
    details: 'Fenrir grew to threaten Asgard. Dwarves forged Gleipnir (silken rope of impossible items). Fenrir refused binding unless a god put a hand in his mouth. Tyr stepped up, losing his hand for Asgard\'s safety.',
    source: 'Poetic Edda (Völuspá)'
  },
  {
    id: 'nr_t3',
    title: 'The Assassination of Baldur',
    pantheon: 'norse',
    era: 'Prelude to Ragnarök',
    description: 'Loki guides blind Hodr to shoot Baldur with a mistletoe dart.',
    details: 'Loki discovered mistletoe was the only plant that did not swear to spare Baldur. He guided Hodr to throw a dart of mistletoe, piercing Baldur\'s chest and ending peace in Asgard.',
    source: 'Prose Edda'
  },
  {
    id: 'nr_t4',
    title: 'Ragnarök Cataclysm',
    pantheon: 'norse',
    era: 'Cosmic Apocalypse',
    description: 'Surtr leads fire giants across Bifröst, burning the nine realms to ash.',
    details: 'A three-year winter blocks the sun. Fenrir breaks free, Thor slays Jörmungandr but falls to poison, and Surtr ignites Yggdrasil. The realms sink into the sea, only to rise green and reborn.',
    source: 'Poetic Edda (Völuspá)'
  },

  // --- EGYPTIAN TIMELINE ---
  {
    id: 'eg_t1',
    title: 'Atum-Ra Arises',
    pantheon: 'egyptian',
    era: 'Cosmic Origin',
    description: 'Ra materializes on the Benben mound, spawning Shu (Air) and Tefnut (Moisture).',
    details: 'From the dark waters of Nun, a primeval dirt mound rose. Atum-Ra materialized, spit out Shu and Tefnut, who generated Geb (Earth) and Nut (Sky) to separate cosmos from chaos.',
    source: 'Pyramid Creation Texts'
  },
  {
    id: 'eg_t2',
    title: 'Dismemberment of Osiris',
    pantheon: 'egyptian',
    era: 'Murder of the King',
    description: 'Seth traps Osiris in a chest and chops his body into fourteen pieces.',
    details: 'Jealous of Osiris\'s reign, Seth tricked him into a gilded chest, sealed it, and threw it in the Nile. He later chopped Osiris into fourteen parts, scattering them across Egypt.',
    source: 'Plutarch\'s Isis and Osiris'
  },
  {
    id: 'eg_t3',
    title: 'Resurrection & Underworld Seat',
    pantheon: 'egyptian',
    era: 'Judgment Era',
    description: 'Isis gathers Osiris\'s remains, resurrecting him to judge souls in Duat.',
    details: 'Isis searched the Nile delta, gathered Osiris\'s parts, and used magical words to resurrect him. Too weakened to rule Earth, Osiris descended to rule the Underworld, judging dead souls.',
    source: 'Book of the Dead'
  },
  {
    id: 'eg_t4',
    title: 'Horus Avengers the Throne',
    pantheon: 'egyptian',
    era: 'Dynastic Retribution',
    description: 'Horus defeats his uncle Seth, claiming kingship over upper and lower Egypt.',
    details: 'Following eighty years of legal battles and combats (hippopotamus duels, stone boats), Horus defeated Seth. The divine tribunal officially named Horus Pharaoh, establishing order.',
    source: 'The Contendings of Horus and Seth'
  }
];

export default function TimelineScreen() {
  const [filter, setFilter] = useState<'all' | 'greek' | 'norse' | 'egyptian'>('all');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const filteredEvents = timelineEvents.filter(
    e => filter === 'all' || e.pantheon === filter
  );

  const handleEventClick = (ev: TimelineEvent) => {
    audioEngine.playClick();
    setSelectedEvent(ev);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="border-b border-neutral-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold uppercase tracking-wider text-neutral-100">MYTHOLOGICAL CHRONOLOGY</h1>
          <p className="text-xs text-neutral-500">Trace cosmic milestones from primordial chaos to heroic wars and apocalypses.</p>
        </div>
        
        {/* Filters */}
        <div className="flex border border-neutral-800 p-1 rounded-lg bg-neutral-950 text-xs shrink-0 font-serif">
          {(['all', 'greek', 'norse', 'egyptian'] as const).map(p => (
            <button
              key={p}
              onClick={() => {
                setFilter(p);
                setSelectedEvent(null);
                audioEngine.playClick();
              }}
              className={`px-3 py-1.5 rounded uppercase font-bold transition-colors ${
                filter === p ? 'bg-neutral-800 text-amber-500' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* VERTICAL TIMELINE LOG (Left 2 cols) */}
        <div className="lg:col-span-2 relative border-l border-neutral-850 pl-8 ml-6 space-y-8">
          {filteredEvents.map((ev, index) => {
            const color = {
              greek: 'border-purple-500 text-purple-400',
              norse: 'border-blue-500 text-blue-400',
              egyptian: 'border-amber-500 text-amber-400'
            }[ev.pantheon];

            return (
              <div key={ev.id} className="relative group">
                
                {/* Timeline circle */}
                <div className={`absolute -left-12 top-1 w-8 h-8 rounded-full bg-neutral-950 border-2 flex items-center justify-center font-mono text-[10px] font-bold ${color}`}>
                  {index + 1}
                </div>

                <div 
                  onClick={() => handleEventClick(ev)}
                  className={`p-5 rounded-xl border border-neutral-850 bg-neutral-950/60 hover:border-amber-500/30 transition-all cursor-pointer ${
                    selectedEvent?.id === ev.id ? 'border-amber-500 bg-neutral-900/40' : ''
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-neutral-500">
                    <span>{ev.era}</span>
                    <span className="font-serif">{ev.pantheon}</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-neutral-200 mt-1">{ev.title}</h3>
                  <p className="text-xs text-neutral-450 mt-1.5 leading-relaxed">{ev.description}</p>
                </div>

              </div>
            );
          })}
        </div>

        {/* SIDE DETAIL DRAWER (Right col) */}
        <div className="space-y-6">
          {selectedEvent ? (
            <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-amber-500 rounded-b" />
              
              <div className="space-y-1">
                <span className="text-[10px] text-amber-500 font-serif font-bold uppercase tracking-wider block">{selectedEvent.era}</span>
                <h4 className="font-serif font-bold text-neutral-100 text-base">{selectedEvent.title}</h4>
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-lg text-xs leading-relaxed text-neutral-300">
                <span className="text-[9px] text-neutral-500 uppercase font-semibold block mb-1">CHRONICLE DETAILS</span>
                {selectedEvent.details}
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-lg text-xs text-neutral-400">
                <span className="text-[9px] text-neutral-500 uppercase font-semibold block mb-1">HISTORICAL SOURCE</span>
                <span className="font-serif italic text-neutral-300">✦ {selectedEvent.source}</span>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-900/10 border border-neutral-850 border-dashed rounded-2xl p-8 text-center text-neutral-500 flex flex-col items-center justify-center h-48 space-y-2">
              <Clock size={24} />
              <span className="font-serif text-xs uppercase tracking-widest block">Select timeline node</span>
              <span className="text-[10px] text-neutral-605 max-w-xs block mx-auto">Click any event card in the timeline list to unlock detailed literature analysis and sources.</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
