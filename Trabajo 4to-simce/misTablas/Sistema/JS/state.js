/* GESTIÓN DE ESTADO Y PERSISTENCIA (LOCALSTORAGE) - MIS TABLAS 4° BÁSICO */

const AVATARS_LIST = [
    { id: 'buho', name: 'Búho Sabio', icon: '🦉', desc: 'Maestro de la sabiduría' },
    { id: 'zorro', name: 'Zorro Veloz', icon: '🦊', desc: 'Rápido en cálculos' },
    { id: 'robot', name: 'Robot Calculín', icon: '🤖', desc: 'Precisión digital' },
    { id: 'mago', name: 'Mago de Números', icon: '🧙‍♂️', desc: 'Magia matemática' },
    { id: 'ninja', name: 'Ninja Mates', icon: '🥷', desc: 'Silencioso y enfocado' },
    { id: 'dino', name: 'Dino Cósmico', icon: '🦖', desc: 'Fuerza gigantesca' }
];

const LOGROS_LIST = [
    { id: 'primer_paso', title: '¡Primer Paso!', desc: 'Completaste tu primera tabla de multiplicar.', icon: '🏆', req: 1 },
    { id: 'maestro_5', title: 'Especialista del 5', desc: 'Dominaste la tabla del 5 con 3 estrellas.', icon: '⭐', req: 5 },
    { id: 'cazador_puntos', title: 'Cazador de Puntos', desc: 'Alcanzaste 500 puntos en juegos.', icon: '🎯', req: 500 },
    { id: 'simce_superado', title: 'Héroe SIMCE', desc: 'Rendiste exitosamente el Ensayo SIMCE 4° Básico.', icon: '🎓', req: 'simce' },
    { id: 'leyenda_tablas', title: 'Leyenda de las Tablas', desc: 'Completaste todas las tablas del 2 al 10.', icon: '👑', req: 9 }
];

const DEFAULT_STATE = {
    studentName: '',
    avatar: 'buho',
    totalPoints: 0,
    totalStars: 0,
    currentLevel: 1,
    tableProgress: {
        2: { status: 'unlocked', stars: 0, accuracy: 0, attempts: 0 },
        3: { status: 'locked', stars: 0, accuracy: 0, attempts: 0 },
        4: { status: 'locked', stars: 0, accuracy: 0, attempts: 0 },
        5: { status: 'locked', stars: 0, accuracy: 0, attempts: 0 },
        6: { status: 'locked', stars: 0, accuracy: 0, attempts: 0 },
        7: { status: 'locked', stars: 0, accuracy: 0, attempts: 0 },
        8: { status: 'locked', stars: 0, accuracy: 0, attempts: 0 },
        9: { status: 'locked', stars: 0, accuracy: 0, attempts: 0 },
        10: { status: 'locked', stars: 0, accuracy: 0, attempts: 0 }
    },
    unlockedLogros: [],
    simceBestScore: 0,
    simceCompleted: false
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
                return { ...DEFAULT_STATE, ...parsed };
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

    addStars(count) {
        this.state.totalStars += count;
        this.saveState();
    }

    updateTableProgress(tableNum, stars, accuracy) {
        if (!this.state.tableProgress[tableNum]) return;
        
        const prev = this.state.tableProgress[tableNum];
        prev.status = 'completed';
        if (stars > prev.stars) {
            const addedStars = stars - prev.stars;
            prev.stars = stars;
            this.addStars(addedStars);
        }
        prev.accuracy = Math.max(prev.accuracy, accuracy);
        prev.attempts += 1;

        // Desbloquear siguiente tabla progresivamente
        const nextTable = tableNum + 1;
        if (nextTable <= 10 && this.state.tableProgress[nextTable].status === 'locked') {
            this.state.tableProgress[nextTable].status = 'unlocked';
        }

        this.checkLogros();
        this.saveState();
    }

    checkLevelUp() {
        // Cada 200 puntos = 1 nivel
        const newLevel = Math.floor(this.state.totalPoints / 200) + 1;
        if (newLevel > this.state.currentLevel) {
            this.state.currentLevel = newLevel;
            if (window.audio) audio.playVictory();
        }
    }

    checkLogros() {
        let completedCount = 0;
        Object.keys(this.state.tableProgress).forEach(t => {
            if (this.state.tableProgress[t].status === 'completed') completedCount++;
        });

        if (completedCount >= 1 && !this.state.unlockedLogros.includes('primer_paso')) {
            this.state.unlockedLogros.push('primer_paso');
        }
        if (this.state.tableProgress[5].stars === 3 && !this.state.unlockedLogros.includes('maestro_5')) {
            this.state.unlockedLogros.push('maestro_5');
        }
        if (this.state.totalPoints >= 500 && !this.state.unlockedLogros.includes('cazador_puntos')) {
            this.state.unlockedLogros.push('cazador_puntos');
        }
        if (completedCount >= 9 && !this.state.unlockedLogros.includes('leyenda_tablas')) {
            this.state.unlockedLogros.push('leyenda_tablas');
        }
    }

    recordSimceResult(scoreOutof10) {
        const simcePts = Math.round(200 + (scoreOutof10 * 15)); // Escala SIMCE aprox 200 a 350
        if (simcePts > this.state.simceBestScore) {
            this.state.simceBestScore = simcePts;
        }
        this.state.simceCompleted = true;
        if (!this.state.unlockedLogros.includes('simce_superado')) {
            this.state.unlockedLogros.push('simce_superado');
        }
        this.addPoints(scoreOutof10 * 25);
        this.saveState();
    }

    getAvatarData(avatarId) {
        return AVATARS_LIST.find(a => a.id === avatarId) || AVATARS_LIST[0];
    }
}

const stateMgr = new StateManager();
