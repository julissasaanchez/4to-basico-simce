/* GESTIÓN DE ESTADO Y PROGRESIÓN POR MUNDOS Y NIVELES - MIS TABLAS 4° BÁSICO */

const AVATARS_LIST = [
    { id: 'zorrito', name: 'Zorrito Explorador', icon: '🦊', svg: 'Sistema/IMAGEN/avatares/zorrito.svg', desc: 'Maestro de los acertijos del Valle', color: '#f97316' },
    { id: 'pandita', name: 'Pandita Inventor', icon: '🐼', svg: 'Sistema/IMAGEN/avatares/pandita.svg', desc: 'Construye máquinas y artefactos', color: '#0284c7' },
    { id: 'ranita', name: 'Ranita Alquimista', icon: '🐸', svg: 'Sistema/IMAGEN/avatares/ranita.svg', desc: 'Transforma números y fórmulas', color: '#16a34a' },
    { id: 'unicornio', name: 'Unicornio Guardián', icon: '🦄', svg: 'Sistema/IMAGEN/avatares/unicornio.svg', desc: 'Protege los cristales mágicos', color: '#ec4899' },
    { id: 'tigre', name: 'Tigre Aventurero', icon: '🐯', svg: 'Sistema/IMAGEN/avatares/tigre.svg', desc: 'Supera obstáculos a velocidad', color: '#f59e0b' },
    { id: 'pulpo', name: 'Pulpo Científico', icon: '🐙', svg: 'Sistema/IMAGEN/avatares/pulpo.svg', desc: 'Resuelve problemas complejos', color: '#a855f7' },
    { id: 'gatito', name: 'Gatito Espacial', icon: '🐱', svg: 'Sistema/IMAGEN/avatares/gatito.svg', desc: 'Descubre planetas numéricos', color: '#38bdf8' },
    { id: 'dino', name: 'Dino Viajero', icon: '🦖', svg: 'Sistema/IMAGEN/avatares/dino.svg', desc: 'Fuerza de los mundos antiguos', color: '#22c55e' }
];

const WORLDS_DATA = [
    {
        id: 1,
        title: '🗺️ Mundo 1: El Valle de los Números',
        desc: 'Domina las sumas, restas y lecturas numéricas para activar los primeros portales.',
        bg: 'var(--bg-world1)',
        missions: [
            { id: '1-1', title: 'Portal de las Sumas Mágicas', req: 'Inicio', reward: 50 },
            { id: '1-2', title: 'Camino de las Restas del Valle', req: '1-1', reward: 60 },
            { id: '1-3', title: 'El Gran Acertijo Numérico', req: '1-2', reward: 75 }
        ]
    },
    {
        id: 2,
        title: '🌲 Mundo 2: El Bosque de las Multiplicaciones',
        desc: 'Explora las tablas del 2 al 10 y agrupa cristales de poder.',
        bg: 'var(--bg-world2)',
        missions: [
            { id: '2-1', title: 'Claro de las Tablas (2 a 5)', req: '1-3', reward: 80 },
            { id: '2-2', title: 'Bosque Profundo (Tablas 6 a 9)', req: '2-1', reward: 90 },
            { id: '2-3', title: 'El Cristal del 10 Mágico', req: '2-2', reward: 100 }
        ]
    },
    {
        id: 3,
        title: '⛏️ Mundo 3: Las Minas de la División',
        desc: 'Realiza repartos equitativos y descubre la relación entre multiplicar y dividir.',
        bg: 'var(--bg-world3)',
        missions: [
            { id: '3-1', title: 'Reparto de Gemas Místicas', req: '2-3', reward: 110 },
            { id: '3-2', title: 'Cámara de las Divisiones Exactas', req: '3-1', reward: 120 }
        ]
    },
    {
        id: 4,
        title: '🏙️ Mundo 4: La Ciudad del Comercio e Inventos',
        desc: 'Resuelve problemas cotidianos, compras con presupuesto y ensambla artefactos.',
        bg: 'var(--bg-world4)',
        missions: [
            { id: '4-1', title: 'Gran Mercado de Compras', req: '3-2', reward: 130 },
            { id: '4-2', title: 'Laboratorio de Inventos Mágicos', req: '4-1', reward: 140 }
        ]
    },
    {
        id: 5,
        title: '🐉 Mundo 5: El Templo del Guardián Sabio (SIMCE Final)',
        desc: 'Supera los 10 desafíos integradores del Guardián para completar la Gran Leyenda.',
        bg: 'var(--bg-world5)',
        missions: [
            { id: '5-1', title: 'Fortaleza del Guardián (SIMCE)', req: '4-2', reward: 200 }
        ]
    }
];

const DEFAULT_STATE = {
    studentName: '',
    avatar: 'zorrito',
    totalPoints: 0,
    totalStars: 0,
    currentLevel: 1,
    unlockedWorlds: [1],
    completedMissions: [],
    tableProgress: {
        2: { status: 'unlocked', stars: 0 },
        3: { status: 'unlocked', stars: 0 },
        4: { status: 'locked', stars: 0 },
        5: { status: 'locked', stars: 0 },
        6: { status: 'locked', stars: 0 },
        7: { status: 'locked', stars: 0 },
        8: { status: 'locked', stars: 0 },
        9: { status: 'locked', stars: 0 },
        10: { status: 'locked', stars: 0 }
    },
    unlockedLogros: [],
    simceBestScore: 0
};

class StateManager {
    constructor() {
        this.STORAGE_KEY = 'mis_tablas_4to_simce_data';
        this.state = this.loadState();
    }

    loadState() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                let loaded = { ...DEFAULT_STATE, ...parsed };
                if (!AVATARS_LIST.some(a => a.id === loaded.avatar)) {
                    loaded.avatar = 'zorrito';
                }
                return loaded;
            }
        } catch (e) {
            console.error('Error al cargar estado:', e);
        }
        return { ...DEFAULT_STATE };
    }

    saveState() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error('Error al guardar estado:', e);
        }
    }

    setStudent(name, avatarId) {
        this.state.studentName = name;
        this.state.avatar = avatarId;
        this.saveState();
    }

    isLoggedIn() {
        return this.state.studentName && this.state.studentName.trim().length > 0;
    }

    addPoints(pts) {
        this.state.totalPoints += pts;
        this.checkLevelUp();
        this.saveState();
    }

    completeMission(missionId, rewardPts) {
        if (!this.state.completedMissions.includes(missionId)) {
            this.state.completedMissions.push(missionId);
            this.state.totalStars += 3;
            this.addPoints(rewardPts);
        }

        // Desbloquear mundos progresivamente
        if (missionId === '1-3' && !this.state.unlockedWorlds.includes(2)) this.state.unlockedWorlds.push(2);
        if (missionId === '2-3' && !this.state.unlockedWorlds.includes(3)) this.state.unlockedWorlds.push(3);
        if (missionId === '3-2' && !this.state.unlockedWorlds.includes(4)) this.state.unlockedWorlds.push(4);
        if (missionId === '4-2' && !this.state.unlockedWorlds.includes(5)) this.state.unlockedWorlds.push(5);

        this.saveState();
    }

    updateTableProgress(tableNum, stars) {
        if (!this.state.tableProgress[tableNum]) return;
        const prev = this.state.tableProgress[tableNum];
        prev.status = 'completed';
        if (stars > prev.stars) {
            this.state.totalStars += (stars - prev.stars);
            prev.stars = stars;
        }

        const next = tableNum + 1;
        if (next <= 10 && this.state.tableProgress[next].status === 'locked') {
            this.state.tableProgress[next].status = 'unlocked';
        }

        this.saveState();
    }

    checkLevelUp() {
        const newLevel = Math.floor(this.state.totalPoints / 180) + 1;
        if (newLevel > this.state.currentLevel) {
            this.state.currentLevel = newLevel;
            if (window.audio) audio.playVictory();
        }
    }

    recordSimceResult(scoreOutof10) {
        const simcePts = Math.round(200 + (scoreOutof10 * 15));
        if (simcePts > this.state.simceBestScore) {
            this.state.simceBestScore = simcePts;
        }
        this.completeMission('5-1', scoreOutof10 * 20);
        this.saveState();
    }

    getAvatarData(avatarId) {
        return AVATARS_LIST.find(a => a.id === avatarId) || AVATARS_LIST[0];
    }
}

const stateMgr = new StateManager();
