'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { worldDefinitions, WorldDefinition } from '@/data/assets/worlds';
import { characterAssetRegistry } from '@/data/assets/characters';
import { MapPin, Swords, User, BookOpen } from 'lucide-react';
import CharacterEncounterModal from './CharacterEncounter';
import { audioEngine } from '@/utils/audioEngine';
import { useRouter } from 'next/navigation';

interface WorldSceneProps {
  pantheonId: 'greek' | 'norse' | 'egyptian';
}

export default function WorldScene({ pantheonId }: WorldSceneProps) {
  const router = useRouter();
  const world: WorldDefinition = worldDefinitions[pantheonId] || worldDefinitions.greek;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

  // PARTICLES EFFECT (CANVAS)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const particles = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: (Math.random() - 0.5) * 0.8,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = world.theme.particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [world]);

  const handleLocationClick = (loc: WorldDefinition['locations'][0]) => {
    audioEngine.playClick();
    setActiveLocationId(loc.id);

    if (loc.characterId) {
      setSelectedCharacterId(loc.characterId);
    } else if (loc.type === 'arena') {
      // Start Arena Battle
      router.push(`/battle/${pantheonId}_arena_b1`);
    }
  };

  return (
    <div className="relative w-full min-h-[600px] bg-neutral-950 border border-amber-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans my-4">
      
      {/* 2D PARALLAX BACKGROUND & ATMOSPHERE */}
      <div className={`absolute inset-0 bg-gradient-to-b ${world.theme.bgGradient} opacity-90 -z-10`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none -z-10" />

      {/* CANVAS PARTICLES */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* WORLD SCENE HEADER */}
      <div className="relative z-10 p-6 flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-850/80 bg-neutral-950/60 backdrop-blur-md">
        <div>
          <span className="text-[10px] font-serif font-black uppercase tracking-[0.3em]" style={{ color: world.accentColor }}>
            ⚡ 2D MYTHIC REALM EXPLORATION
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-black tracking-widest text-neutral-100 uppercase">
            {world.name}
          </h2>
          <p className="text-xs text-neutral-400 font-serif italic mt-0.5">
            &quot;{world.tagline}&quot;
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <button
            onClick={() => router.push('/quests')}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-750 rounded-lg text-xs font-serif font-bold tracking-wider text-neutral-200 flex items-center gap-2 transition-transform hover:scale-105"
          >
            <BookOpen size={14} className="text-amber-400" />
            <span>QUEST JOURNAL</span>
          </button>
        </div>
      </div>

      {/* 2D INTERACTIVE LOCATION MAP GRID */}
      <div className="relative w-full h-[480px] p-6 z-10">
        
        {/* PARALLAX LANDSCAPE WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <span className="font-serif text-[120px] font-black uppercase tracking-widest text-neutral-500">
            {world.pantheon}
          </span>
        </div>

        {/* MAP HOTSPOT NODES */}
        {world.locations.map(loc => {
          const charAssigned = loc.characterId ? characterAssetRegistry[loc.characterId] : null;

          return (
            <motion.div
              key={loc.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              onClick={() => handleLocationClick(loc)}
            >
              {/* GLOW PULSE */}
              <div 
                className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-125 shadow-lg"
                style={{
                  borderColor: world.accentColor,
                  backgroundColor: `${world.accentColor}20`,
                  boxShadow: `0 0 20px ${world.accentColor}40`,
                }}
              >
                {loc.type === 'arena' ? (
                  <Swords size={20} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                ) : charAssigned ? (
                  <User size={20} className="text-amber-300" />
                ) : (
                  <MapPin size={20} className="text-amber-400" />
                )}
              </div>

              {/* LOCATION TOOLTIP PREVIEW */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 w-44 bg-neutral-900/90 border border-neutral-800 rounded-lg p-2.5 text-center backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity shadow-xl">
                <div className="font-serif font-bold text-xs text-neutral-100">{loc.name}</div>
                <div className="text-[9px] text-neutral-400 font-sans line-clamp-1 mt-0.5">{loc.description}</div>
                {charAssigned && (
                  <span className="inline-block mt-1 text-[8px] uppercase tracking-widest font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    ENCOUNTER: {charAssigned.name}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CHARACTER ENCOUNTER MODAL */}
      {selectedCharacterId && (
        <CharacterEncounterModal
          characterId={selectedCharacterId}
          onClose={() => setSelectedCharacterId(null)}
        />
      )}
    </div>
  );
}
