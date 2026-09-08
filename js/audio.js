// Home Academy Audio & Speech Engine (Synthesized Web Audio + Web Speech API)

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = typeof localStorage !== 'undefined' ? localStorage.getItem('ha_sound_muted') === 'true' : false;
    this.synth = typeof window !== 'undefined' && window.speechSynthesis ? window.speechSynthesis : null;
    this.recognition = null;
    if (typeof window !== 'undefined') {
      this.initRecognition();
    }
  }

  initAudioContext() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('ha_sound_muted', this.muted);
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.15, startTime = 0, gainLevel = 0.1) {
    if (this.muted) return;
    try {
      this.initAudioContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + startTime);
      osc.stop(this.ctx.currentTime + startTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Correct answer sound: Bright pleasant chime
  playCorrect() {
    if (this.muted) return;
    this.playTone(523.25, 'triangle', 0.12, 0, 0.15);     // C5
    this.playTone(659.25, 'triangle', 0.12, 0.08, 0.15);  // E5
    this.playTone(783.99, 'triangle', 0.25, 0.16, 0.18);  // G5
  }

  playSuccess() {
    this.playCorrect();
  }

  // Wrong answer sound: Gentle low bump
  playWrong() {
    if (this.muted) return;
    this.playTone(220.00, 'sawtooth', 0.15, 0, 0.1);     // A3
    this.playTone(196.00, 'sawtooth', 0.25, 0.12, 0.12);  // G3
  }

  // Level Up / Big Achievement Fanfare
  playLevelUp() {
    if (this.muted) return;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C4 to G5
    notes.forEach((note, index) => {
      this.playTone(note, 'sine', 0.2, index * 0.09, 0.15);
    });
  }

  // Soft button click
  playClick() {
    if (this.muted) return;
    this.playTone(400, 'sine', 0.05, 0, 0.05);
  }

  // Speed round countdown tick
  playTick() {
    if (this.muted) return;
    this.playTone(800, 'triangle', 0.04, 0, 0.04);
  }

  // Text-To-Speech (Pronunciation & Voice Narration)
  speak(text, optionsOrRate = 0.9, pitch = 1.0) {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return false;
    }
    this.synth.cancel(); // Stop any previous speech

    let rate = 0.9;
    let onStart = null;
    let onEnd = null;
    let lang = 'en-US';

    if (typeof optionsOrRate === 'object' && optionsOrRate !== null) {
      rate = optionsOrRate.rate !== undefined ? optionsOrRate.rate : 0.9;
      pitch = optionsOrRate.pitch !== undefined ? optionsOrRate.pitch : 1.0;
      lang = optionsOrRate.lang || 'en-US';
      onStart = optionsOrRate.onStart || null;
      onEnd = optionsOrRate.onEnd || null;
    } else if (typeof optionsOrRate === 'number') {
      rate = optionsOrRate;
    }

    const cleanText = (text || '').replace(/[*_#]/g, '').trim();
    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = lang;

    if (onStart) utterance.onstart = onStart;
    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    // Pick an English voice if available
    try {
      const voices = this.synth.getVoices();
      const enVoice = voices.find(v => (v.lang.startsWith('en') || v.lang.includes('US') || v.lang.includes('GB')) && !v.name.includes('Bad'));
      if (enVoice) {
        utterance.voice = enVoice;
      }
    } catch (e) {}

    this.synth.speak(utterance);
    return true;
  }

  isSpeaking() {
    return !!(this.synth && this.synth.speaking);
  }

  stopSpeech() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Web Speech Recognition for Speaking Practice
  initRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      this.recognition = new SpeechRec();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 3;
    }
  }

  hasSpeechRecognition() {
    return !!this.recognition;
  }

  listenForSpeech(onResult, onError, onEnd) {
    if (!this.recognition) {
      if (onError) onError('Speech recognition is not available in this browser. You can still practice by speaking out loud!');
      return false;
    }

    try {
      this.recognition.onresult = (event) => {
        if (event.results && event.results[0]) {
          const spokenText = event.results[0][0].transcript;
          const confidence = event.results[0][0].confidence;
          if (onResult) onResult(spokenText, confidence);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (onError) onError(event.error);
      };

      this.recognition.onend = () => {
        if (onEnd) onEnd();
      };

      this.recognition.start();
      return true;
    } catch (err) {
      console.warn('Failed to start speech recognition:', err);
      if (onError) onError(err.message);
      return false;
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  }
}

export const sound = new SoundEngine();