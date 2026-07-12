'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Pantheon } from '@/types/game';

interface EnvironmentBackgroundProps {
  pantheon: Pantheon;
  intensity?: 'subtle' | 'cinematic';
  parallax?: boolean;
}

export default function EnvironmentBackground({
  pantheon,
  intensity = 'cinematic',
  parallax = true
}: EnvironmentBackgroundProps) {
  // Config per pantheon
  const config = {
    greek: {
      bg: 'from-amber-950/20 via-neutral-950 to-neutral-950',
      radial: 'radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)',
      particleColor: 'rgba(168, 85, 247, 0.3)',
      particleCount: 15,
      columnsColor: 'border-purple-500/5'
    },
    norse: {
      bg: 'from-blue-950/20 via-neutral-950 to-neutral-950',
      radial: 'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
      particleColor: 'rgba(255, 255, 255, 0.4)',
      particleCount: 25,
      columnsColor: 'border-blue-500/5'
    },
    egyptian: {
      bg: 'from-orange-950/20 via-neutral-950 to-neutral-950',
      radial: 'radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)',
      particleColor: 'rgba(245, 158, 11, 0.3)',
      particleCount: 20,
      columnsColor: 'border-amber-500/5'
    }
  }[pantheon];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-20 bg-gradient-to-b ${config.bg}`}>
      {/* Pantheon radial glow */}
      <div 
        className="absolute inset-0"
        style={{ backgroundImage: config.radial }}
      />

      {/* Atmospheric dust / snow particles */}
      <div className="absolute inset-0">
        {[...Array(config.particleCount)].map((_, i) => {
          const size = Math.random() * (pantheon === 'norse' ? 4 : 3) + 1;
          const duration = Math.random() * 8 + (pantheon === 'norse' ? 4 : 6);
          const delay = Math.random() * 5;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: config.particleColor,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: pantheon === 'norse' ? '0 0 8px rgba(255, 255, 255, 0.8)' : `0 0 6px ${config.particleColor}`
              }}
              animate={{
                y: pantheon === 'norse' ? [0, 400] : [0, -150],
                x: [0, (Math.random() - 0.5) * 80],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'linear'
              }}
            />
          );
        })}
      </div>

      {/* Subtle architecture structures/shadows behind */}
      {intensity === 'cinematic' && (
        <div className="absolute inset-x-0 bottom-0 h-96 opacity-15 flex justify-around items-end">
          {pantheon === 'greek' && (
            <>
              <div className={`w-12 h-[350px] border-x ${config.columnsColor} bg-white/[0.01]`} />
              <div className={`w-12 h-[400px] border-x ${config.columnsColor} bg-white/[0.01]`} />
              <div className={`w-12 h-[300px] border-x ${config.columnsColor} bg-white/[0.01]`} />
            </>
          )}
          {pantheon === 'norse' && (
            <>
              {/* Rune pillars */}
              <div className="w-16 h-80 bg-neutral-900/30 border border-neutral-800/40 rounded flex flex-col items-center justify-around py-6 text-blue-500/20 text-xs font-serif">
                <span>ᛟ</span><span>ᚱ</span><span>ᚢ</span>
              </div>
              <div className="w-16 h-96 bg-neutral-900/30 border border-neutral-800/40 rounded flex flex-col items-center justify-around py-6 text-blue-500/20 text-xs font-serif">
                <span>ᛚ</span><span>ᛒ</span><span>ᚠ</span>
              </div>
            </>
          )}
          {pantheon === 'egyptian' && (
            <>
              {/* Pyramids outlines */}
              <div className="w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[200px] border-b-neutral-900/40 relative">
                <div className="absolute w-[300px] h-[2px] bg-amber-500/5 bottom-0 -left-[150px]" />
              </div>
              <div className="w-0 h-0 border-l-[200px] border-l-transparent border-r-[200px] border-r-transparent border-b-[280px] border-b-neutral-900/40 relative">
                <div className="absolute w-[400px] h-[2px] bg-amber-500/5 bottom-0 -left-[200px]" />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
