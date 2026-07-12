'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Sparkles } from 'lucide-react';

interface PlayerCharacterProps {
  previewWeaponId?: string | null;
  previewArmorIds?: {
    head?: string | null;
    chest?: string | null;
    arms?: string | null;
    legs?: string | null;
  };
  animatePose?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// ─────────────────────────────────────────────────────────────────────────────
// ORIGIN-SPECIFIC CHARACTER SVG RENDERERS
// Each returns a unique body shape, stance, and default clothing
// ─────────────────────────────────────────────────────────────────────────────

function ScholarOfDelphiBody() {
  return (
    <g>
      {/* Flowing scholar robes */}
      <path
        d="M70 95 C65 95, 58 110, 55 140 L52 200 C52 210, 60 225, 70 235 L130 235 C140 225, 148 210, 148 200 L145 140 C142 110, 135 95, 130 95 Z"
        fill="url(#scholarRobe)" stroke="#5c4d8a" strokeWidth="1.5"
      />
      {/* Sash / belt */}
      <rect x="72" y="148" width="56" height="6" rx="3" fill="#9b7dcf" opacity="0.7" />
      {/* Inner tunic fold detail */}
      <path d="M85 100 L100 235" stroke="#6b5b9e" strokeWidth="0.8" opacity="0.4" />
      <path d="M115 100 L100 235" stroke="#6b5b9e" strokeWidth="0.8" opacity="0.4" />
      {/* Shoulder drape */}
      <path d="M65 95 C65 88, 80 82, 100 82 C120 82, 135 88, 135 95" fill="none" stroke="#7c6aaf" strokeWidth="2" />
      {/* Head - refined oval */}
      <ellipse cx="100" cy="68" rx="16" ry="19" fill="#2a2218" stroke="#4a3e33" strokeWidth="1.5" />
      {/* Eyes - wise, narrow */}
      <ellipse cx="93" cy="65" rx="2.5" ry="1.5" fill="#c9b896" />
      <ellipse cx="107" cy="65" rx="2.5" ry="1.5" fill="#c9b896" />
      {/* Delphi laurel crown */}
      <path d="M82 56 C85 48, 95 44, 100 44 C105 44, 115 48, 118 56" fill="none" stroke="#8bc34a" strokeWidth="2" />
      <circle cx="88" cy="52" r="2" fill="#6da832" />
      <circle cx="100" cy="47" r="2" fill="#6da832" />
      <circle cx="112" cy="52" r="2" fill="#6da832" />
      {/* Scroll in left hand */}
      <rect x="45" y="155" width="12" height="35" rx="4" fill="#e8d9b0" stroke="#c4b182" strokeWidth="1" />
      <line x1="49" y1="160" x2="49" y2="185" stroke="#a09070" strokeWidth="0.5" />
    </g>
  );
}

function WandererOfMidgardBody() {
  return (
    <g>
      {/* Heavy fur cloak */}
      <path
        d="M62 90 C55 100, 48 130, 48 165 L50 230 L72 240 L128 240 L150 230 L152 165 C152 130, 145 100, 138 90 Z"
        fill="url(#norseFur)" stroke="#4a5568" strokeWidth="1.5"
      />
      {/* Chain mail vest visible */}
      <path d="M75 100 L125 100 L120 170 L80 170 Z" fill="#3d4654" stroke="#5a6577" strokeWidth="1" />
      {/* Chain texture lines */}
      {[110, 120, 130, 140, 150, 160].map(y => (
        <line key={y} x1="78" y1={y} x2="122" y2={y} stroke="#6b7a8e" strokeWidth="0.4" opacity="0.5" />
      ))}
      {/* Thick leather belt */}
      <rect x="70" y="168" width="60" height="8" rx="2" fill="#5c4a3a" stroke="#7d6b55" strokeWidth="1" />
      <circle cx="100" cy="172" r="4" fill="#d4af37" stroke="#b08d24" strokeWidth="1" />
      {/* Fur collar */}
      <path d="M62 90 C70 85, 85 80, 100 80 C115 80, 130 85, 138 90" fill="#7a6e5c" stroke="#8c7f6b" strokeWidth="2" />
      <path d="M65 92 C72 88, 85 84, 100 84 C115 84, 128 88, 135 92" fill="#6b6050" strokeWidth="0" />
      {/* Head - strong jaw */}
      <path d="M84 70 C84 50, 116 50, 116 70 L114 78 C112 82, 108 85, 100 85 C92 85, 88 82, 86 78 Z" fill="#2a2218" stroke="#4a3e33" strokeWidth="1.5" />
      {/* Viking beard */}
      <path d="M88 76 C90 85, 95 90, 100 92 C105 90, 110 85, 112 76" fill="#3a3020" stroke="#5a4b38" strokeWidth="1" />
      {/* Eyes - fierce */}
      <ellipse cx="93" cy="65" rx="3" ry="2" fill="#88b4d4" />
      <ellipse cx="107" cy="65" rx="3" ry="2" fill="#88b4d4" />
      <circle cx="93" cy="65" r="1" fill="#1a2a3a" />
      <circle cx="107" cy="65" r="1" fill="#1a2a3a" />
      {/* Scar across right eye */}
      <line x1="104" y1="58" x2="110" y2="70" stroke="#8a6050" strokeWidth="1.2" opacity="0.6" />
    </g>
  );
}

function KeeperOfTheNileBody() {
  return (
    <g>
      {/* Linen robe - white/gold */}
      <path
        d="M68 92 C60 105, 55 140, 54 180 L56 230 L75 240 L125 240 L144 230 L146 180 C145 140, 140 105, 132 92 Z"
        fill="url(#egyptLinen)" stroke="#b8a060" strokeWidth="1.2"
      />
      {/* Golden collar necklace */}
      <path d="M72 92 C80 87, 90 84, 100 84 C110 84, 120 87, 128 92" fill="none" stroke="#d4af37" strokeWidth="3" />
      <path d="M75 95 C82 90, 92 87, 100 87 C108 87, 118 90, 125 95" fill="none" stroke="#e8c84a" strokeWidth="2" />
      {/* Pendant (Eye of Horus) */}
      <circle cx="100" cy="100" r="6" fill="#d4af37" stroke="#b08d24" strokeWidth="1" />
      <path d="M96 100 L100 96 L104 100 L100 104 Z" fill="#1a1a2e" />
      {/* Wrap belt */}
      <rect x="68" y="162" width="64" height="5" rx="2" fill="#c9a640" opacity="0.6" />
      {/* Head */}
      <ellipse cx="100" cy="66" rx="17" ry="20" fill="#2e2518" stroke="#4a3e33" strokeWidth="1.5" />
      {/* Kohl-lined eyes */}
      <path d="M87 63 L92 61 L97 63 L92 65 Z" fill="#e8d9b0" />
      <path d="M103 63 L108 61 L113 63 L108 65 Z" fill="#e8d9b0" />
      <line x1="97" y1="63" x2="100" y2="65" stroke="#2a1f10" strokeWidth="1" />
      <line x1="103" y1="63" x2="100" y2="65" stroke="#2a1f10" strokeWidth="1" />
      {/* Nemes headdress stripes */}
      <path d="M80 52 C82 42, 100 38, 100 38 C100 38, 118 42, 120 52 L122 75 L115 82 L100 84 L85 82 L78 75 Z" fill="#1e3a5c" stroke="#2a5080" strokeWidth="1" />
      <line x1="90" y1="42" x2="85" y2="78" stroke="#d4af37" strokeWidth="0.6" opacity="0.5" />
      <line x1="100" y1="38" x2="100" y2="84" stroke="#d4af37" strokeWidth="0.6" opacity="0.5" />
      <line x1="110" y1="42" x2="115" y2="78" stroke="#d4af37" strokeWidth="0.6" opacity="0.5" />
      {/* Ankh held in right hand */}
      <g transform="translate(148, 140)">
        <line x1="0" y1="0" x2="0" y2="25" stroke="#d4af37" strokeWidth="2.5" />
        <line x1="-6" y1="10" x2="6" y2="10" stroke="#d4af37" strokeWidth="2.5" />
        <ellipse cx="0" cy="-2" rx="5" ry="6" fill="none" stroke="#d4af37" strokeWidth="2" />
      </g>
    </g>
  );
}

function RuneSeekerBody() {
  return (
    <g>
      {/* Dark traveller cloak */}
      <path
        d="M65 92 C58 108, 50 145, 48 190 L52 235 L75 242 L125 242 L148 235 L152 190 C150 145, 142 108, 135 92 Z"
        fill="#1a1e28" stroke="#2e3442" strokeWidth="1.5"
      />
      {/* Runic vest */}
      <path d="M78 98 L122 98 L118 168 L82 168 Z" fill="#252e3d" stroke="#3a4560" strokeWidth="1" />
      {/* Glowing runes on vest */}
      <text x="90" y="125" fill="#88ccff" fontSize="8" fontFamily="serif" opacity="0.8">ᚱ</text>
      <text x="102" y="140" fill="#88ccff" fontSize="8" fontFamily="serif" opacity="0.8">ᚦ</text>
      <text x="95" y="155" fill="#88ccff" fontSize="8" fontFamily="serif" opacity="0.6">ᛗ</text>
      {/* Belt with rune buckle */}
      <rect x="72" y="166" width="56" height="6" rx="2" fill="#3a3530" />
      <rect x="94" y="164" width="12" height="10" rx="1" fill="#4488bb" stroke="#66aadd" strokeWidth="0.8" />
      {/* Hood */}
      <path d="M78 52 C82 35, 100 30, 100 30 C100 30, 118 35, 122 52 L124 80 L100 88 L76 80 Z" fill="#1a1e28" stroke="#2e3442" strokeWidth="1.5" />
      {/* Shadowed face within hood */}
      <ellipse cx="100" cy="68" rx="14" ry="16" fill="#181c24" />
      {/* Glowing eyes from within hood */}
      <ellipse cx="94" cy="66" rx="2.5" ry="1.5" fill="#66bbff" />
      <ellipse cx="106" cy="66" rx="2.5" ry="1.5" fill="#66bbff" />
      {/* Glow around eyes */}
      <ellipse cx="94" cy="66" rx="4" ry="3" fill="none" stroke="#44aaff" strokeWidth="0.5" opacity="0.4" />
      <ellipse cx="106" cy="66" rx="4" ry="3" fill="none" stroke="#44aaff" strokeWidth="0.5" opacity="0.4" />
      {/* Runestone tablet in left hand */}
      <rect x="38" y="145" width="14" height="22" rx="2" fill="#3a4050" stroke="#5a6580" strokeWidth="1" />
      <text x="41" y="160" fill="#88ccff" fontSize="7" fontFamily="serif">ᚠ</text>
    </g>
  );
}

function TempleGuardianBody() {
  return (
    <g>
      {/* Heavy plate armor torso */}
      <path
        d="M60 92 C55 105, 52 135, 52 170 L55 230 L78 240 L122 240 L145 230 L148 170 C148 135, 145 105, 140 92 Z"
        fill="url(#guardianPlate)" stroke="#8a7b65" strokeWidth="1.5"
      />
      {/* Muscle cuirass detail */}
      <path d="M80 105 L88 130 L100 138 L112 130 L120 105" fill="none" stroke="#a09070" strokeWidth="1.5" opacity="0.5" />
      <path d="M85 138 L100 160 L115 138" fill="none" stroke="#a09070" strokeWidth="1" opacity="0.4" />
      {/* Heavy pauldrons */}
      <path d="M55 92 C50 88, 48 95, 52 110 L65 108 L62 92 Z" fill="#7a6b55" stroke="#8a7b65" strokeWidth="1" />
      <path d="M145 92 C150 88, 152 95, 148 110 L135 108 L138 92 Z" fill="#7a6b55" stroke="#8a7b65" strokeWidth="1" />
      {/* Golden trim across chest */}
      <path d="M65 108 L135 108" stroke="#d4af37" strokeWidth="2" />
      {/* Pteruges (leather strips below belt) */}
      {[75, 85, 95, 105, 115, 125].map(x => (
        <rect key={x} x={x - 3} y="182" width="6" height="22" rx="1" fill="#5c4a3a" stroke="#7d6b55" strokeWidth="0.5" />
      ))}
      {/* Belt */}
      <rect x="65" y="176" width="70" height="8" rx="2" fill="#5c4a3a" stroke="#d4af37" strokeWidth="1" />
      <circle cx="100" cy="180" r="4" fill="#d4af37" />
      {/* Head with Corinthian-style helmet crest position */}
      <path d="M84 68 C84 48, 116 48, 116 68 L114 80 C110 86, 100 88, 100 88 C100 88, 90 86, 86 80 Z" fill="#2e2820" stroke="#4a3e33" strokeWidth="1.5" />
      {/* Stern eyes */}
      <rect x="90" y="64" width="6" height="3" rx="1" fill="#c9a860" />
      <rect x="104" y="64" width="6" height="3" rx="1" fill="#c9a860" />
      {/* Jaw line */}
      <path d="M90 75 L100 82 L110 75" fill="none" stroke="#4a3e33" strokeWidth="1" />
      {/* Large round shield on back (partially visible) */}
      <circle cx="45" cy="145" r="28" fill="none" stroke="#8a7b65" strokeWidth="2" opacity="0.3" />
      <circle cx="45" cy="145" r="20" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.2" />
    </g>
  );
}

function RelicHunterBody() {
  return (
    <g>
      {/* Light explorer jacket */}
      <path
        d="M68 90 C62 102, 58 130, 56 165 L58 228 L78 238 L122 238 L142 228 L144 165 C142 130, 138 102, 132 90 Z"
        fill="#2c2520" stroke="#4a3e33" strokeWidth="1.5"
      />
      {/* Vest with many pockets */}
      <path d="M76 96 L124 96 L120 165 L80 165 Z" fill="#3a3228" stroke="#5a4e40" strokeWidth="1" />
      {/* Pocket details */}
      <rect x="82" y="110" width="14" height="10" rx="1" fill="none" stroke="#5a4e40" strokeWidth="0.8" />
      <rect x="104" y="115" width="14" height="10" rx="1" fill="none" stroke="#5a4e40" strokeWidth="0.8" />
      <rect x="85" y="140" width="10" height="8" rx="1" fill="none" stroke="#5a4e40" strokeWidth="0.8" />
      {/* Bandolier with relics */}
      <line x1="78" y1="96" x2="120" y2="165" stroke="#7d6b55" strokeWidth="2" />
      <circle cx="90" cy="115" r="3" fill="#d4af37" stroke="#b08d24" strokeWidth="0.8" />
      <circle cx="100" cy="135" r="3" fill="#88ccaa" stroke="#66aa88" strokeWidth="0.8" />
      <circle cx="108" cy="150" r="3" fill="#cc8888" stroke="#aa6666" strokeWidth="0.8" />
      {/* Utility belt */}
      <rect x="68" y="163" width="64" height="6" rx="2" fill="#5c4a3a" stroke="#7d6b55" strokeWidth="1" />
      {/* Head with explorer hat */}
      <ellipse cx="100" cy="68" rx="15" ry="17" fill="#2a2218" stroke="#4a3e33" strokeWidth="1.5" />
      {/* Wide-brim hat */}
      <ellipse cx="100" cy="52" rx="28" ry="6" fill="#3a3228" stroke="#5a4e40" strokeWidth="1" />
      <path d="M80 52 C82 40, 100 36, 100 36 C100 36, 118 40, 120 52" fill="#3a3228" stroke="#5a4e40" strokeWidth="1" />
      {/* Keen eyes */}
      <ellipse cx="93" cy="66" rx="2.5" ry="1.8" fill="#b8d4a0" />
      <ellipse cx="107" cy="66" rx="2.5" ry="1.8" fill="#b8d4a0" />
      <circle cx="93" cy="66" r="1" fill="#2a3a1a" />
      <circle cx="107" cy="66" r="1" fill="#2a3a1a" />
      {/* Smirk */}
      <path d="M95 74 C98 77, 102 77, 105 74" fill="none" stroke="#5a4e40" strokeWidth="1" />
      {/* Grappling hook on belt */}
      <g transform="translate(140, 165)">
        <line x1="0" y1="0" x2="0" y2="18" stroke="#888" strokeWidth="1.5" />
        <path d="M-3 18 L0 22 L3 18" fill="none" stroke="#888" strokeWidth="1.5" />
      </g>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG GRADIENT DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

function GradientDefs() {
  return (
    <defs>
      <linearGradient id="scholarRobe" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3d2d6b" />
        <stop offset="100%" stopColor="#251a45" />
      </linearGradient>
      <linearGradient id="norseFur" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a3a40" />
        <stop offset="100%" stopColor="#22252a" />
      </linearGradient>
      <linearGradient id="egyptLinen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e8dcc0" />
        <stop offset="60%" stopColor="#c9b890" />
        <stop offset="100%" stopColor="#a89868" />
      </linearGradient>
      <linearGradient id="guardianPlate" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6b5b45" />
        <stop offset="100%" stopColor="#3a3020" />
      </linearGradient>
      {/* Equipment overlays */}
      <linearGradient id="goldHelm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#a08020" />
      </linearGradient>
      <linearGradient id="goldChest" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c5a880" />
        <stop offset="100%" stopColor="#8a7b55" />
      </linearGradient>
      <radialGradient id="auraGreek" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(168,85,247,0.25)" />
        <stop offset="100%" stopColor="rgba(168,85,247,0)" />
      </radialGradient>
      <radialGradient id="auraNorse" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(100,180,255,0.25)" />
        <stop offset="100%" stopColor="rgba(100,180,255,0)" />
      </radialGradient>
      <radialGradient id="auraEgyptian" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(245,180,50,0.25)" />
        <stop offset="100%" stopColor="rgba(245,180,50,0)" />
      </radialGradient>
    </defs>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EQUIPMENT OVERLAY LAYERS
// ─────────────────────────────────────────────────────────────────────────────

function HelmOverlay() {
  return (
    <motion.g initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }}>
      {/* Ornate helm with crest */}
      <path d="M80 58 C80 38, 120 38, 120 58 L118 72 L82 72 Z" fill="url(#goldHelm)" stroke="#d4af37" strokeWidth="1.5" />
      {/* Face guard slots */}
      <rect x="88" y="60" width="6" height="8" rx="1" fill="#1a1510" />
      <rect x="106" y="60" width="6" height="8" rx="1" fill="#1a1510" />
      {/* Crest plume */}
      <path d="M100 38 C100 28, 105 22, 108 20 L106 38" fill="#c0392b" stroke="#a0301e" strokeWidth="0.8" />
      <path d="M100 38 C100 30, 95 25, 92 22 L94 38" fill="#c0392b" stroke="#a0301e" strokeWidth="0.8" />
    </motion.g>
  );
}

function ChestOverlay() {
  return (
    <motion.g initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }}>
      {/* Chest plate */}
      <path d="M68 105 L132 105 L125 178 L75 178 Z" fill="url(#goldChest)" stroke="#d4af37" strokeWidth="2" />
      {/* Embossed design */}
      <path d="M85 115 L100 130 L115 115" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.6" />
      <circle cx="100" cy="140" r="5" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.4" />
    </motion.g>
  );
}

function ArmsOverlay() {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      {/* Left bracer with gold trim */}
      <path d="M50 128 L62 128 L60 175 L48 175 Z" fill="#b0997c" stroke="#d4af37" strokeWidth="1" />
      <line x1="52" y1="140" x2="60" y2="140" stroke="#d4af37" strokeWidth="0.8" />
      <line x1="52" y1="155" x2="60" y2="155" stroke="#d4af37" strokeWidth="0.8" />
      {/* Right bracer */}
      <path d="M138 128 L150 128 L152 175 L140 175 Z" fill="#b0997c" stroke="#d4af37" strokeWidth="1" />
      <line x1="140" y1="140" x2="150" y2="140" stroke="#d4af37" strokeWidth="0.8" />
      <line x1="140" y1="155" x2="150" y2="155" stroke="#d4af37" strokeWidth="0.8" />
    </motion.g>
  );
}

function LegsOverlay() {
  return (
    <motion.g initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 100 }}>
      {/* Greaves */}
      <path d="M78 188 L98 188 L96 238 L76 238 Z" fill="#9e8a71" stroke="#d4af37" strokeWidth="1.5" />
      <path d="M102 188 L122 188 L124 238 L104 238 Z" fill="#9e8a71" stroke="#d4af37" strokeWidth="1.5" />
      {/* Knee guards */}
      <ellipse cx="88" cy="190" rx="8" ry="5" fill="#b09a78" stroke="#d4af37" strokeWidth="1" />
      <ellipse cx="112" cy="190" rx="8" ry="5" fill="#b09a78" stroke="#d4af37" strokeWidth="1" />
    </motion.g>
  );
}

function WeaponOverlay({ weaponId }: { weaponId: string }) {
  const isSpear = weaponId.includes('spear') || weaponId.includes('trident') || weaponId.includes('bident');
  const isAxe = weaponId.includes('axe');
  const isKhopesh = weaponId.includes('khopesh');

  return (
    <motion.g
      initial={{ rotate: -20, scale: 0.7, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12 }}
    >
      {isSpear ? (
        <g>
          {/* Long spear shaft */}
          <line x1="148" y1="15" x2="148" y2="235" stroke="#5a4832" strokeWidth="3.5" />
          {/* Ornate spearhead */}
          <path d="M143 20 L148 2 L153 20 L148 28 Z" fill="#d4af37" stroke="#b08d24" strokeWidth="1" />
          <line x1="148" y1="8" x2="148" y2="22" stroke="#e8d060" strokeWidth="0.5" />
          {/* Butt cap */}
          <circle cx="148" cy="235" r="3" fill="#8a7b55" />
        </g>
      ) : isAxe ? (
        <g>
          {/* Axe handle */}
          <line x1="148" y1="80" x2="148" y2="200" stroke="#5a4832" strokeWidth="4" />
          {/* Axe head */}
          <path d="M148 80 L165 60 C170 55, 172 70, 168 85 L148 95 Z" fill="#8899aa" stroke="#667788" strokeWidth="1.5" />
          {/* Rune on axe head */}
          <text x="155" y="78" fill="#88ccff" fontSize="7" fontFamily="serif" opacity="0.7">ᚨ</text>
          {/* Pommel */}
          <circle cx="148" cy="200" r="4" fill="#5a4832" stroke="#7d6b55" strokeWidth="1" />
        </g>
      ) : isKhopesh ? (
        <g>
          {/* Khopesh handle */}
          <line x1="145" y1="135" x2="145" y2="185" stroke="#5a4832" strokeWidth="3.5" />
          {/* Curved blade */}
          <path d="M145 135 L145 80 C145 65, 160 55, 170 60 C175 62, 172 72, 165 78 L148 95" fill="none" stroke="#cccccc" strokeWidth="3" />
          <path d="M145 135 L145 82 C145 68, 158 58, 166 62" fill="none" stroke="#eeeeee" strokeWidth="1" opacity="0.4" />
          {/* Pommel */}
          <circle cx="145" cy="185" r="4" fill="#d4af37" stroke="#b08d24" strokeWidth="1" />
        </g>
      ) : (
        <g>
          {/* Default sword */}
          <line x1="145" y1="125" x2="145" y2="180" stroke="#4a3e33" strokeWidth="4" />
          {/* Crossguard */}
          <line x1="133" y1="128" x2="157" y2="128" stroke="#d4af37" strokeWidth="3" />
          {/* Blade */}
          <path d="M140 125 L140 30 L145 18 L150 30 L150 125 Z" fill="#c8c8c8" stroke="#999" strokeWidth="1.2" />
          {/* Fuller line */}
          <line x1="145" y1="35" x2="145" y2="120" stroke="#ddd" strokeWidth="0.8" opacity="0.4" />
          {/* Pommel */}
          <circle cx="145" cy="182" r="4" fill="#d4af37" />
        </g>
      )}
    </motion.g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING PARTICLE SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

function PantheonParticles({ pantheon }: { pantheon: 'greek' | 'norse' | 'egyptian' }) {
  const config = {
    greek: { colors: ['#a855f7', '#c084fc', '#7c3aed'], icon: '⚡' },
    norse: { colors: ['#60a5fa', '#93c5fd', '#3b82f6'], icon: '❄' },
    egyptian: { colors: ['#fbbf24', '#f59e0b', '#d97706'], icon: '☀' },
  }[pantheon];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating embers/sparks */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ opacity: 0, y: 280, x: 20 + i * 30 }}
          animate={{
            opacity: [0, 0.7, 0.3, 0],
            y: [280, 100 - i * 15, 40, -20],
            x: [20 + i * 30, 25 + i * 30 + (Math.random() - 0.5) * 40, 20 + i * 30],
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.6,
          }}
          className="absolute"
          style={{ color: config.colors[i % config.colors.length] }}
        >
          <Sparkles size={8 + (i % 3) * 2} />
        </motion.div>
      ))}
      {/* Pantheon-specific floating symbols */}
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={`symbol-${i}`}
          initial={{ opacity: 0, y: 200, x: 60 + i * 60 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [200, 80, -10],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 3,
          }}
          className="absolute text-sm"
          style={{ color: config.colors[0] }}
        >
          {config.icon}
        </motion.span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function PlayerCharacter({
  previewWeaponId,
  previewArmorIds,
  animatePose = false,
  size = 'md',
}: PlayerCharacterProps) {
  const state = useGameStore();

  const weaponId = previewWeaponId !== undefined ? previewWeaponId : state.equippedWeaponId;
  const armorIds = previewArmorIds !== undefined ? previewArmorIds : state.equippedArmorIds;
  const origin = state.origin || 'Scholar of Delphi';

  // Deduce pantheon from origin
  let pantheon: 'greek' | 'norse' | 'egyptian' = 'greek';
  if (origin.includes('Midgard') || origin.includes('Rune')) pantheon = 'norse';
  else if (origin.includes('Nile') || origin.includes('Temple')) pantheon = 'egyptian';

  const themeConfig = {
    greek: {
      glow: 'shadow-[0_0_40px_rgba(168,85,247,0.25)]',
      border: 'border-purple-500/25',
      bgGlow: 'from-purple-950/20 via-neutral-950 to-neutral-950',
      auraId: 'auraGreek',
    },
    norse: {
      glow: 'shadow-[0_0_40px_rgba(100,180,255,0.25)]',
      border: 'border-blue-500/25',
      bgGlow: 'from-blue-950/20 via-neutral-950 to-neutral-950',
      auraId: 'auraNorse',
    },
    egyptian: {
      glow: 'shadow-[0_0_40px_rgba(245,180,50,0.25)]',
      border: 'border-amber-500/25',
      bgGlow: 'from-amber-950/20 via-neutral-950 to-neutral-950',
      auraId: 'auraEgyptian',
    },
  }[pantheon];

  // Select body renderer
  const BodyRenderer = useMemo(() => {
    if (origin.includes('Scholar')) return ScholarOfDelphiBody;
    if (origin.includes('Wanderer') || origin.includes('Midgard')) return WandererOfMidgardBody;
    if (origin.includes('Nile') || origin.includes('Keeper')) return KeeperOfTheNileBody;
    if (origin.includes('Rune')) return RuneSeekerBody;
    if (origin.includes('Temple') || origin.includes('Guardian')) return TempleGuardianBody;
    if (origin.includes('Relic') || origin.includes('Hunter')) return RelicHunterBody;
    return ScholarOfDelphiBody;
  }, [origin]);

  const sizeClasses = {
    sm: 'w-full h-56 max-w-[200px]',
    md: 'w-full h-80 max-w-[280px]',
    lg: 'w-full h-96 max-w-[340px]',
  }[size];

  return (
    <div className={`relative ${sizeClasses} mx-auto rounded-2xl border ${themeConfig.border} ${themeConfig.glow} bg-gradient-to-b ${themeConfig.bgGlow} flex items-center justify-center overflow-hidden`}>

      {/* Background aura circle */}
      <div className="absolute w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-60">
        <svg width="100%" height="100%">
          <circle cx="50%" cy="50%" r="48%" fill={`url(#${themeConfig.auraId})`} />
        </svg>
      </div>

      {/* Pantheon particle system */}
      <PantheonParticles pantheon={pantheon} />

      {/* Ground shadow ellipse */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/40 rounded-full blur-sm" />

      {/* Main character with idle breathing animation */}
      <motion.div
        className="relative w-52 h-64 flex items-center justify-center"
        animate={
          animatePose
            ? { y: [0, -6, 0], scale: [1, 1.02, 1], rotate: [0, 0.5, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          duration: animatePose ? 3 : 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 200 250" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]">
          <GradientDefs />

          {/* Origin-specific body */}
          <BodyRenderer />

          {/* Equipment overlays – layered on top of body */}
          {armorIds?.head && <HelmOverlay />}
          {armorIds?.chest && <ChestOverlay />}
          {armorIds?.arms && <ArmsOverlay />}
          {armorIds?.legs && <LegsOverlay />}
          {weaponId && <WeaponOverlay weaponId={weaponId} />}

        </svg>
      </motion.div>

      {/* Origin label badge */}
      <div className="absolute top-2 left-2 bg-neutral-950/80 border border-neutral-800 px-2.5 py-1 rounded text-[8px] text-amber-500 uppercase tracking-widest font-serif font-bold">
        {origin.split(' ')[0]}
      </div>

      {/* Level indicator */}
      <div className="absolute top-2 right-2 bg-neutral-950/80 border border-neutral-800 px-2 py-1 rounded text-[8px] text-neutral-400 uppercase tracking-widest font-serif">
        Lv.{state.level}
      </div>
    </div>
  );
}
