'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { audioEngine } from '@/utils/audioEngine';
import { Download, Upload, RefreshCw, Volume2, Shield, Check, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const state = useGameStore();
  const [importedStatus, setImportedStatus] = useState<string | null>(null);

  // EXPORT SAVE DATA
  const handleExportSave = () => {
    audioEngine.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mythverse_save_${state.username || 'guest'}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // IMPORT SAVE DATA
  const handleImportSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.attributes) {
            useGameStore.setState(parsed);
            audioEngine.playLevelUp();
            setImportedStatus('Save state successfully imported!');
          } else {
            setImportedStatus('Invalid save file format.');
          }
        } catch {
          setImportedStatus('Error parsing save file JSON.');
        }
      };
    }
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all MythVerse game progress? This cannot be undone.')) {
      audioEngine.playBattleImpact();
      state.resetStore();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8 font-sans">
      
      {/* HEADER */}
      <div className="border-b border-neutral-800 pb-6 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-widest text-neutral-100 uppercase text-glow-gold">
          REALM SETTINGS & DATA MANAGEMENT
        </h1>
        <p className="text-xs text-neutral-400 font-serif tracking-wider uppercase mt-1">
          Configure local audio, cloud save synchronization, and save state backups.
        </p>
      </div>

      {/* AUDIO SETTINGS */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-4">
        <h3 className="font-serif font-bold text-lg text-amber-400 tracking-wider flex items-center gap-2">
          <Volume2 size={20} />
          Procedural Audio Settings
        </h3>
        <p className="text-xs text-neutral-400 font-serif">
          Manage master sound synthesis and ambient environment music generator.
        </p>

        <div className="flex items-center justify-between p-4 bg-neutral-950 border border-neutral-850 rounded-lg text-xs font-serif">
          <span>Master SFX & Web Audio Synthesizer</span>
          <button
            onClick={() => {
              const muted = state.soundSettings.sfxMuted;
              state.updateSoundSettings({ sfxMuted: !muted, musicMuted: !muted });
              audioEngine.playClick();
            }}
            className={`px-4 py-2 rounded font-bold uppercase transition-all ${
              state.soundSettings.sfxMuted ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
            }`}
          >
            {state.soundSettings.sfxMuted ? 'MUTED' : 'ENABLED'}
          </button>
        </div>
      </motion.div>

      {/* SAVE DATA MANAGEMENT */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-6">
        <div>
          <h3 className="font-serif font-bold text-lg text-amber-400 tracking-wider flex items-center gap-2">
            <Shield size={20} />
            Save File Export / Import Backup
          </h3>
          <p className="text-xs text-neutral-400 font-serif mt-1">
            Download your offline progress as a JSON save file or restore state on another device.
          </p>
        </div>

        {importedStatus && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded text-xs text-amber-300 font-serif flex items-center gap-2">
            <Check size={16} />
            {importedStatus}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
          <button
            onClick={handleExportSave}
            className="flex items-center justify-center gap-2 p-4 bg-neutral-950 hover:bg-neutral-900 border border-amber-500/30 hover:border-amber-500/60 rounded-lg text-neutral-200 hover:text-amber-400 transition-all font-bold tracking-widest uppercase"
          >
            <Download size={16} />
            EXPORT SAVE FILE (JSON)
          </button>

          <label className="flex items-center justify-center gap-2 p-4 bg-neutral-950 hover:bg-neutral-900 border border-amber-500/30 hover:border-amber-500/60 rounded-lg text-neutral-200 hover:text-amber-400 cursor-pointer transition-all font-bold tracking-widest uppercase">
            <Upload size={16} />
            IMPORT SAVE FILE
            <input type="file" accept=".json" onChange={handleImportSave} className="hidden" />
          </label>
        </div>
      </motion.div>

      {/* DANGEROUS ZONE */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 bg-red-950/20 border border-red-900/40 rounded-xl space-y-4">
        <h3 className="font-serif font-bold text-lg text-red-400 tracking-wider flex items-center gap-2">
          <AlertTriangle size={20} />
          Danger Zone
        </h3>
        <p className="text-xs text-neutral-400 font-serif">
          Permanently clear all player state, unlocked codex entries, level progress, and local items.
        </p>

        <button
          onClick={handleResetProgress}
          className="px-6 py-3 bg-red-900/40 hover:bg-red-900/80 border border-red-700 text-red-200 font-serif font-bold tracking-widest text-xs rounded transition-all uppercase flex items-center gap-2"
        >
          <RefreshCw size={14} />
          RESET ALL GAME PROGRESS
        </button>
      </motion.div>

    </div>
  );
}
