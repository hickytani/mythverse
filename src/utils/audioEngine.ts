class AudioEngine {
  private ctx: AudioContext | null = null;
  private currentAmbientOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private ambientType: 'none' | 'temple' | 'fjords' | 'desert' = 'none';

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- INTERFACE EFFECTS (Procedural Web Audio Synthesis) ---

  playHover() {
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playClick() {
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playEquip() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Metallic clash (high frequency square + bandpass noise)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.linearRampToValueAtTime(220, now + 0.25);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(440, now);
    osc2.frequency.linearRampToValueAtTime(110, now + 0.2);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(now + 0.3);
    osc2.stop(now + 0.3);
  }

  playForge() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Anvil strike: high bell ping + low hammer punch + metal ringing
    const ping = this.ctx.createOscillator();
    const ringing = this.ctx.createOscillator();
    const punch = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    ping.type = 'sine';
    ping.frequency.setValueAtTime(2200, now);
    ping.frequency.exponentialRampToValueAtTime(1200, now + 0.4);

    ringing.type = 'triangle';
    ringing.frequency.setValueAtTime(880, now);

    punch.type = 'sine';
    punch.frequency.setValueAtTime(150, now);
    punch.frequency.exponentialRampToValueAtTime(40, now + 0.15);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    ping.connect(gain);
    ringing.connect(gain);
    punch.connect(gain);
    gain.connect(this.ctx.destination);

    ping.start();
    ringing.start();
    punch.start();
    
    ping.stop(now + 0.6);
    ringing.stop(now + 0.6);
    punch.stop(now + 0.6);
  }

  playLevelUp() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Glorious rising arpeggio chord (C major add9)
    const notes = [130.81, 164.81, 196.00, 293.66, 329.63, 392.00, 587.33];
    
    notes.forEach((freq, index) => {
      const noteOsc = this.ctx!.createOscillator();
      const noteGain = this.ctx!.createGain();

      noteOsc.type = 'sine';
      noteOsc.frequency.setValueAtTime(freq, now + index * 0.1);
      
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.08, now + index * 0.1 + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + 1.2);

      noteOsc.connect(noteGain);
      noteGain.connect(this.ctx!.destination);

      noteOsc.start(now + index * 0.1);
      noteOsc.stop(now + index * 0.1 + 1.5);
    });
  }

  playQuestComplete() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Chords: G Maj -> C Maj
    const gChord = [196.00, 246.94, 293.66];
    const cChord = [261.63, 329.63, 392.00];

    gChord.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start();
      osc.stop(now + 0.5);
    });

    cChord.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.4);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + 0.4);
      osc.stop(now + 1.8);
    });
  }

  playBattleImpact() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(now + 0.4);
  }

  playCodexDiscovery() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Mystical high bell shimmer
    const frequencies = [880, 1109, 1318, 1760];
    frequencies.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      
      gain.gain.setValueAtTime(0.06, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.8);
      
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 1.0);
    });
  }

  // --- AMBIENT SOUNDTRACKS (Procedural synthesis of soundscapes) ---

  startAmbient(type: 'temple' | 'fjords' | 'desert') {
    this.initCtx();
    if (!this.ctx) return;

    if (this.ambientType === type) return;
    this.stopAmbient();

    this.ambientType = type;
    const now = this.ctx.currentTime;

    if (type === 'temple') {
      // Celestial Greek: Soft, airy detuned sine chords
      const frequencies = [220.00, 277.18, 329.63, 440.00];
      frequencies.forEach(freq => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 2, now);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.02, now + 2.0); // slow fade in

        // Connect LFO for filter movement
        const lfo = this.ctx!.createOscillator();
        const lfoGain = this.ctx!.createGain();
        lfo.frequency.value = 0.1 + Math.random() * 0.1;
        lfoGain.gain.value = 0.005;
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);

        lfo.start();
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start();

        this.currentAmbientOscs.push({ osc, gain });
      });
    } else if (type === 'fjords') {
      // Cold Norse: low rumbling drone + howling wind noise
      const lowDrone = [73.42, 110.00, 146.83];
      lowDrone.forEach(freq => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        
        // Low pass filter
        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 180;

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.015, now + 3.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start();

        this.currentAmbientOscs.push({ osc, gain });
      });
    } else if (type === 'desert') {
      // Egyptian Sands: warm low drones + sliding pitch sitar string notes
      const drone = [110.00, 165.00];
      drone.forEach(freq => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 2.0);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start();

        this.currentAmbientOscs.push({ osc, gain });
      });
    }
  }

  stopAmbient() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.currentAmbientOscs.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0, now + 1.0); // smooth fade out
        setTimeout(() => {
          try { osc.stop(); } catch(e) {}
        }, 1200);
      } catch(e) {}
    });
    this.currentAmbientOscs = [];
    this.ambientType = 'none';
  }
}

export const audioEngine = new AudioEngine();
export default audioEngine;
