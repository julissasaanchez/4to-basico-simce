/* MOTOR DE LOS 7 MINIJUEGOS EDUCATIVOS - MIS TABLAS 4° BÁSICO */

let currentGameMode = null;
let gameScore = 0;
let gameTimer = null;
let timeLeft = 30;

window.initJuegosModule = function() {
    showGamesMenu();
};

function showGamesMenu() {
    const menu = document.getElementById('gamesMenuGrid');
    const arena = document.getElementById('gameArenaContainer');
    if (menu) menu.style.display = 'grid';
    if (arena) arena.style.display = 'none';
}

function startArena(title) {
    const menu = document.getElementById('gamesMenuGrid');
    const arena = document.getElementById('gameArenaContainer');
    const arenaTitle = document.getElementById('arenaTitle');
    
    if (menu) menu.style.display = 'none';
    if (arena) arena.style.display = 'flex';
    if (arenaTitle) arenaTitle.textContent = title;

    gameScore = 0;
    updateGameScoreUI();
    if (gameTimer) clearInterval(gameTimer);
}

function updateGameScoreUI() {
    const scoreElem = document.getElementById('gameScoreDisplay');
    if (scoreElem) scoreElem.textContent = `Puntos: ${gameScore}`;
}

// ----------------------------------------------------
// 1. MEMORIA MATEMÁTICA
// ----------------------------------------------------
window.startJuegoMemoria = function() {
    currentGameMode = 'memoria';
    startArena('🧠 Memoria Matemática');
    const area = document.getElementById('gameDynamicContent');
    area.innerHTML = '<div class="memory-grid" id="memoryGrid"></div>';
    
    const grid = document.getElementById('memoryGrid');
    const pairs = [
        { exp: '6 × 7', ans: '42' },
        { exp: '8 × 4', ans: '32' },
        { exp: '9 × 3', ans: '27' },
        { exp: '5 × 8', ans: '40' }
    ];

    let cardsData = [];
    pairs.forEach((p, idx) => {
        cardsData.push({ id: idx, text: p.exp, type: 'exp', match: p.ans });
        cardsData.push({ id: idx, text: p.ans, type: 'ans', match: p.exp });
    });

    cardsData.sort(() => Math.random() - 0.5);

    let firstCard = null;
    let lockGrid = false;
    let matchedPairs = 0;

    cardsData.forEach(cd => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-front">❓</div>
                <div class="memory-back">${cd.text}</div>
            </div>
        `;

        card.addEventListener('click', () => {
            if (lockGrid || card.classList.contains('flipped') || card.classList.contains('matched')) return;

            if (window.audio) audio.playClick();
            card.classList.add('flipped');

            if (!firstCard) {
                firstCard = { card, data: cd };
            } else {
                lockGrid = true;
                if (firstCard.data.id === cd.id && firstCard.data.type !== cd.type) {
                    // Match correcto
                    if (window.audio) audio.playCorrect();
                    firstCard.card.classList.add('matched');
                    card.classList.add('matched');
                    matchedPairs++;
                    gameScore += 50;
                    updateGameScoreUI();
                    firstCard = null;
                    lockGrid = false;

                    if (matchedPairs === pairs.length) {
                        setTimeout(() => finishGameWin('¡Excelente memoria! Has encontrado todas las parejas.'), 500);
                    }
                } else {
                    // Fallo
                    if (window.audio) audio.playWrong();
                    setTimeout(() => {
                        firstCard.card.classList.remove('flipped');
                        card.classList.remove('flipped');
                        firstCard = null;
                        lockGrid = false;
                    }, 1000);
                }
            }
        });

        grid.appendChild(card);
    });
};

// ----------------------------------------------------
// 2. ATRAPA EL RESULTADO (BURBUJAS FLOTANTES)
// ----------------------------------------------------
window.startJuegoAtrapa = function() {
    currentGameMode = 'atrapa';
    startArena('🎈 Atrapa el Resultado');
    
    let a = Math.floor(Math.random() * 8) + 2;
    let b = Math.floor(Math.random() * 9) + 2;
    let correct = a * b;

    const area = document.getElementById('gameDynamicContent');
    area.innerHTML = `
        <div class="target-question-box">¿Cuánto es ${a} × ${b}?</div>
        <div class="bubble-arena" id="bubbleArena"></div>
    `;

    const arenaEl = document.getElementById('bubbleArena');
    const options = [correct, correct + 2, correct - 3, correct + 5, correct - 1].sort(() => Math.random() - 0.5);

    options.forEach((num, i) => {
        const bub = document.createElement('div');
        bub.className = 'floating-bubble';
        bub.textContent = num;
        bub.style.left = `${15 + (i * 18)}%`;
        bub.style.bottom = `-80px`;
        arenaEl.appendChild(bub);

        let pos = -80;
        let speed = 1.5 + Math.random() * 1.5;
        let interval = setInterval(() => {
            pos += speed;
            bub.style.bottom = `${pos}px`;
            if (pos > 380) {
                pos = -80;
            }
        }, 30);

        bub.addEventListener('click', () => {
            clearInterval(interval);
            if (num === correct) {
                if (window.audio) audio.playCorrect();
                gameScore += 40;
                bub.style.background = 'var(--accent-green)';
                bub.style.transform = 'scale(1.4)';
                setTimeout(() => finishGameWin(`¡Muy rápido! ${a} × ${b} es ${correct}.`), 400);
            } else {
                if (window.audio) audio.playWrong();
                bub.style.background = '#ef4444';
            }
        });
    });
};

// ----------------------------------------------------
// 4. ¿QUIÉN TIENE LA RESPUESTA?
// ----------------------------------------------------
window.startJuegoPersonajes = function() {
    currentGameMode = 'personajes';
    startArena('🧙‍♂️ ¿Quién tiene la respuesta?');

    let a = Math.floor(Math.random() * 7) + 3;
    let b = Math.floor(Math.random() * 8) + 2;
    let correct = a * b;

    const options = [correct, correct + 4, correct - 2, correct + 10].sort(() => Math.random() - 0.5);

    const area = document.getElementById('gameDynamicContent');
    area.innerHTML = `
        <div class="target-question-box">¿Cuál personaje sostiene el resultado de ${a} × ${b}?</div>
        <div class="characters-row" id="charRow"></div>
    `;

    const row = document.getElementById('charRow');
    options.forEach((val, idx) => {
        const charData = AVATARS_LIST[idx % AVATARS_LIST.length];
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <div class="char-img" style="font-size:3.5rem">${charData.icon}</div>
            <div style="font-weight:700; color:white; margin-bottom:8px">${charData.name}</div>
            <div class="char-sign">${val}</div>
        `;

        card.addEventListener('click', () => {
            if (val === correct) {
                if (window.audio) audio.playVictory();
                gameScore += 50;
                finishGameWin(`¡Correcto! ${charData.name} tenía el número ${correct}.`);
            } else {
                if (window.audio) audio.playWrong();
                card.style.borderColor = '#ef4444';
            }
        });

        row.appendChild(card);
    });
};

// ----------------------------------------------------
// 5. DESAFÍO CONTRA EL TIEMPO
// ----------------------------------------------------
window.startJuegoTiempo = function() {
    currentGameMode = 'tiempo';
    startArena('⚡ Desafío contra el Tiempo');
    timeLeft = 30;

    const area = document.getElementById('gameDynamicContent');
    area.innerHTML = `
        <div style="text-align:center;">
            <div class="game-timer-badge" id="timerBadge" style="display:inline-block; font-size:1.8rem; margin-bottom:20px;">⏰ 30s</div>
            <div class="target-question-box" id="speedQuestion">...</div>
            <div style="display:flex; justify-content:center; gap:16px; margin-top:20px;" id="speedOptions"></div>
        </div>
    `;

    gameTimer = setInterval(() => {
        timeLeft--;
        const tElem = document.getElementById('timerBadge');
        if (tElem) tElem.textContent = `⏰ ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            if (window.audio) audio.playVictory();
            finishGameWin(`⏰ ¡Tiempo agotado! Has acumulado ${gameScore} puntos.`);
        }
    }, 1000);

    nextSpeedQuestion();
};

function nextSpeedQuestion() {
    if (timeLeft <= 0) return;
    let a = Math.floor(Math.random() * 8) + 2;
    let b = Math.floor(Math.random() * 9) + 2;
    let correct = a * b;

    const qElem = document.getElementById('speedQuestion');
    const optElem = document.getElementById('speedOptions');
    if (!qElem || !optElem) return;

    qElem.textContent = `${a} × ${b} = ?`;
    optElem.innerHTML = '';

    const options = [correct, correct + 3, correct - 2, correct + 6].sort(() => Math.random() - 0.5);
    options.forEach(val => {
        const btn = document.createElement('button');
        btn.className = 'btn-submit';
        btn.style.width = 'auto';
        btn.style.padding = '12px 30px';
        btn.textContent = val;

        btn.addEventListener('click', () => {
            if (val === correct) {
                if (window.audio) audio.playCorrect();
                gameScore += 20;
                updateGameScoreUI();
                nextSpeedQuestion();
            } else {
                if (window.audio) audio.playWrong();
                btn.style.background = '#ef4444';
            }
        });
        optElem.appendChild(btn);
    });
}

// ----------------------------------------------------
// 7. DETECTIVE MATEMÁTICO
// ----------------------------------------------------
window.startJuegoDetective = function() {
    currentGameMode = 'detective';
    startArena('🕵️ Detective Matemático');

    const clues = [
        { text: 'Soy mayor que 20 y menor que 30. Aparezco en la tabla del 4 y en la del 6. ¿Quién soy?', ans: 24, opts: [24, 28, 20, 30] },
        { text: 'Si me multiplicas por 9 obtienes 63. ¿Qué número soy?', ans: 7, opts: [6, 7, 8, 9] },
        { text: 'Soy un número par. Estoy en la tabla del 5 y en la del 10, y soy menor que 50. ¿Quién soy?', ans: 40, opts: [35, 40, 45, 55] }
    ];

    const clue = clues[Math.floor(Math.random() * clues.length)];

    const area = document.getElementById('gameDynamicContent');
    area.innerHTML = `
        <div style="max-width:600px; margin:0 auto; text-align:center;">
            <div class="simce-context-box" style="font-size:1.3rem; margin-bottom:25px;">🔍 Pista Confidencial:<br><br>"${clue.text}"</div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;" id="detectiveOpts"></div>
        </div>
    `;

    const optElem = document.getElementById('detectiveOpts');
    clue.opts.forEach(val => {
        const btn = document.createElement('button');
        btn.className = 'btn-submit';
        btn.style.background = 'rgba(255,255,255,0.08)';
        btn.style.border = '2px solid var(--panel-border)';
        btn.textContent = val;

        btn.addEventListener('click', () => {
            if (val === clue.ans) {
                if (window.audio) audio.playVictory();
                gameScore += 60;
                finishGameWin(`🎉 ¡Caso resuelto! El número misterioso era ${clue.ans}.`);
            } else {
                if (window.audio) audio.playWrong();
                btn.style.borderColor = '#ef4444';
            }
        });
        optElem.appendChild(btn);
    });
};

function finishGameWin(msg) {
    if (gameTimer) clearInterval(gameTimer);
    stateMgr.addPoints(gameScore);
    alert(`${msg}\n\n⭐ Has ganado +${gameScore} Puntos.`);
    if (window.refreshDashboardUI) window.refreshDashboardUI();
    showGamesMenu();
}
