/* MOTOR DE SONIDO SINTÉTICO WEB AUDIO API - MIS TABLAS 4° BÁSICO */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Sonido de clic / botón
    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    // Sonido de respuesta correcta / acierto (Arpegio alegre)
    playCorrect() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);

            gain.gain.setValueAtTime(0.2, this.ctx.currentTime + index * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.08 + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + index * 0.08);
            osc.stop(this.ctx.currentTime + index * 0.08 + 0.25);
        });
    }

    // Sonido de error / intento fallido (Buzzer suave)
    playWrong() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.25);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.25);
    }

    // Sonido de Logro / Victoria (Fanfarria)
    playVictory() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const melody = [
            { note: 523.25, time: 0 },
            { note: 523.25, time: 0.12 },
            { note: 523.25, time: 0.24 },
            { note: 659.25, time: 0.36 },
            { note: 783.99, time: 0.55 },
            { note: 1046.50, time: 0.85 }
        ];

        melody.forEach(item => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(item.note, this.ctx.currentTime + item.time);

            gain.gain.setValueAtTime(0.15, this.ctx.currentTime + item.time);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + item.time + 0.3);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + item.time);
            osc.stop(this.ctx.currentTime + item.time + 0.3);
        });
    }

    // Sonido de moneda / estrella
    playStar() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); // B5
        osc.frequency.exponentialRampToValueAtTime(1318.51, this.ctx.currentTime + 0.12); // E6

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.18);
    }
}

const audio = new SoundEngine();
