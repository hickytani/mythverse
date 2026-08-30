'use client';

import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { mythologyDb } from '@/data/seed';
import CinematicBattle from '@/components/CinematicBattle';
import { useRouter } from 'next/navigation';

export default function BattleScreen() {
  const router = useRouter();
  const state = useGameStore();
  const battle = state.battleState;

  // Fallback creature if direct route accessed
  const creatureId = battle.creatureId || 'pantheon_sentinel';
  const creature = mythologyDb.creatures.find(c => c.id === creatureId) || {
    id: 'pantheon_sentinel',
    name: 'Pantheon Sentinel',
    level: 3,
    pantheon: 'greek' as const,
    description: 'Ancient stone warrior guarding temple ruins.',
    rarity: 'Uncommon',
  };

  const handleBattleEnd = () => {
    state.endBattle();
    router.push('/hub');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <CinematicBattle creature={creature} onBattleEnd={handleBattleEnd} />
    </div>
  );
}
