/* MOTOR DE FONDOS Y CRISTALES DE ENERGÍA MÍSTICOS - MIS TABLAS 4° BÁSICO */

class BackgroundEffectsEngine {
    constructor() {
        this.container = null;
        this.crystals = ['💎', '🔮', '✨', '⚡', '🌟', '💠'];
        this.activeCrystals = 0;
        this.maxCrystals = 6;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.buildLayer();
            this.spawnMysticStars();
            this.startCrystalLoop();
        });
    }

    buildLayer() {
        if (document.getElementById('bgAnimatedLayer')) return;
        const layer = document.createElement('div');
        layer.id = 'bgAnimatedLayer';
        layer.className = 'bg-animated-layer';
        document.body.appendChild(layer);
        this.container = layer;
    }

    spawnMysticStars() {
        if (!this.container) return;
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.className = 'mystic-star';
            const size = 3 + Math.random() * 5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            this.container.appendChild(star);
        }
    }

    startCrystalLoop() {
        setInterval(() => {
            if (this.activeCrystals < this.maxCrystals) {
                this.spawnSingleCrystal();
            }
        }, 3500);
    }

    spawnSingleCrystal() {
        if (!this.container) return;

        const c = document.createElement('div');
        c.className = 'floating-crystal-item';
        
        const crystalIcon = this.crystals[Math.floor(Math.random() * this.crystals.length)];
        c.textContent = crystalIcon;
        c.style.left = `${8 + Math.random() * 84}%`;
        c.style.animationDuration = `${9 + Math.random() * 5}s`;

        c.addEventListener('click', (e) => {
            e.stopPropagation();
            this.collectCrystal(c);
        });

        this.container.appendChild(c);
        this.activeCrystals++;

        setTimeout(() => {
            if (c.parentNode) {
                c.remove();
                this.activeCrystals--;
            }
        }, 15000);
    }

    collectCrystal(cElem) {
        if (cElem.classList.contains('collected')) return;
        cElem.classList.add('collected');

        if (window.audio) audio.playStar();
        if (window.stateMgr) stateMgr.addPoints(10);

        const rect = cElem.getBoundingClientRect();
        this.createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

        if (window.modalSys) {
            modalSys.showToast('✨ ¡Cristal Mágico Recolectado! +10 Puntos de Energía', 'success', '💎');
        }

        cElem.style.transform = 'scale(1.8) rotate(360deg)';
        cElem.style.opacity = '0';
        cElem.style.transition = 'all 0.4s ease-out';

        setTimeout(() => {
            cElem.remove();
            this.activeCrystals--;
        }, 400);
    }

    createParticleBurst(x, y) {
        const particles = ['✨', '💎', '🌟', '⚡'];
        for (let i = 0; i < 8; i++) {
            const p = document.createElement('div');
            p.style.position = 'fixed';
            p.style.left = `${x}px`;
            p.style.top = `${y}px`;
            p.style.fontSize = '1.4rem';
            p.style.pointerEvents = 'none';
            p.style.zIndex = '2500';
            p.textContent = particles[Math.floor(Math.random() * particles.length)];

            const angle = (i / 8) * Math.PI * 2;
            const distance = 45 + Math.random() * 25;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            p.style.transition = 'all 0.5s ease-out';
            document.body.appendChild(p);

            requestAnimationFrame(() => {
                p.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
                p.style.opacity = '0';
            });

            setTimeout(() => p.remove(), 550);
        }
    }
}

const bgEffects = new BackgroundEffectsEngine();
