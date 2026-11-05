// ─────────────────────────────────────────────────────────────
// Sound Engine — Web Audio API Synthesizer
// 100% Native, 0-dependency, offline-ready tactile terminal audio
// ─────────────────────────────────────────────────────────────

class SoundEngine {
  private ctx: AudioContext | null = null
  public muted: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('iedc_terminal_muted')
        if (saved !== null) {
          this.muted = saved === 'true'
        }
      } catch {
        // Ignore storage errors
      }
    }
  }

  private init(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        this.ctx = new AudioContextClass()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  public toggleMute(): boolean {
    this.muted = !this.muted
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('iedc_terminal_muted', String(this.muted))
      } catch {
        // Ignore storage errors
      }
    }
    if (!this.muted) {
      this.playKeyClack()
    }
    return this.muted
  }

  /**
   * Authentic mechanical keyboard / terminal key clack
   */
  public playKeyClack() {
    if (this.muted) return
    const ctx = this.init()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    const freq = 1200 + Math.random() * 600
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, now)
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.02)

    gain.gain.setValueAtTime(0.045, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.02)
  }

  /**
   * Terminal return / command execution confirmation beep
   */
  public playEnter() {
    if (this.muted) return
    const ctx = this.init()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, now)
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.06)

    gain.gain.setValueAtTime(0.07, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.06)
  }

  /**
   * Terminal CRT boot chime
   */
  public playBoot() {
    if (this.muted) return
    const ctx = this.init()
    if (!ctx) return

    const now = ctx.currentTime
    const freqs = [440, 659.25, 880]

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const start = now + idx * 0.07

      osc.type = 'sine'
      osc.frequency.setValueAtTime(f, start)

      gain.gain.setValueAtTime(0.06, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.18)
    })
  }

  /**
   * Terminal command error beep
   */
  public playError() {
    if (this.muted) return
    const ctx = this.init()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(180, now)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.12)
  }

  /**
   * 03:00 AM Crisis alarm siren
   */
  public playAlarm() {
    if (this.muted) return
    const ctx = this.init()
    if (!ctx) return

    const now = ctx.currentTime
    const tones = [920, 600, 920, 600]

    tones.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const start = now + idx * 0.09

      osc.type = 'square'
      osc.frequency.setValueAtTime(freq, start)

      gain.gain.setValueAtTime(0.05, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.08)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.08)
    })
  }

  /**
   * Success / Blueprint compilation chime
   */
  public playSuccess() {
    if (this.muted) return
    const ctx = this.init()
    if (!ctx) return

    const now = ctx.currentTime
    const chord = [523.25, 659.25, 783.99, 1046.5]

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const start = now + idx * 0.05

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, start)

      gain.gain.setValueAtTime(0.07, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.3)
    })
  }
}

export const sound = new SoundEngine()
