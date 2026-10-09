/* MOTOR DEL ENSAYO MATEMÁTICO TIPO SIMCE 4° BÁSICO */

const SIMCE_QUESTIONS = [
    {
        id: 1,
        context: "🛒 Compras Escolares",
        question: "Camila fue a la librería y compró 4 paquetes de lápices de colores. Si cada paquete contiene 6 lápices, ¿cuántos lápices compró en total?",
        options: [
            { letter: "A", text: "10 lápices", correct: false, exp: "Sumaste 4 + 6 en vez de multiplicar 4 × 6." },
            { letter: "B", text: "20 lápices", correct: false, exp: "20 no corresponde a la multiplicación de 4 × 6." },
            { letter: "C", text: "24 lápices", correct: true, exp: "¡Excelente! 4 paquetes de 6 lápices es 4 × 6 = 24 lápices." },
            { letter: "D", text: "26 lápices", correct: false, exp: "Recuerda que 4 × 6 = 24." }
        ]
    },
    {
        id: 2,
        context: "🚌 Excursión al Museo",
        question: "Para la excursión de 4° básico se contrataron 3 buses. Si en cada bus viajan 8 estudiantes, ¿cuántos estudiantes van a la excursión?",
        options: [
            { letter: "A", text: "11 estudiantes", correct: false, exp: "No debes sumar 3 + 8." },
            { letter: "B", text: "24 estudiantes", correct: true, exp: "¡Muy bien! 3 buses con 8 estudiantes cada uno es 3 × 8 = 24 estudiantes." },
            { letter: "C", text: "27 estudiantes", correct: false, exp: "3 × 9 es 27, pero eran 8 estudiantes por bus." },
            { letter: "D", text: "30 estudiantes", correct: false, exp: "3 × 10 es 30, pero aquí eran 8 por bus." }
        ]
    },
    {
        id: 3,
        context: "🍪 Convivencia de Curso",
        question: "En la fiesta de fin de año, el profesor llevó 5 cajas de galletas. Si cada caja contiene 9 galletas, ¿cuántas galletas hay en total para compartir?",
        options: [
            { letter: "A", text: "40 galletas", correct: false, exp: "5 × 8 = 40, pero eran 9 galletas por caja." },
            { letter: "B", text: "45 galletas", correct: true, exp: "¡Correcto! 5 cajas con 9 galletas es 5 × 9 = 45 galletas." },
            { letter: "C", text: "50 galletas", correct: false, exp: "5 × 10 = 50." },
            { letter: "D", text: "54 galletas", correct: false, exp: "6 × 9 = 54." }
        ]
    },
    {
        id: 4,
        context: "🏀 Campeonato Deportivo",
        question: "Lucas encestó 7 triples en su partido de básquetbol. Sabiendo que cada triple vale 3 puntos, ¿cuántos puntos consiguió Lucas?",
        options: [
            { letter: "A", text: "21 puntos", correct: true, exp: "¡Excelente! 7 triples de 3 puntos cada uno es 7 × 3 = 21 puntos." },
            { letter: "B", text: "10 puntos", correct: false, exp: "No debes sumar 7 + 3." },
            { letter: "C", text: "18 puntos", correct: false, exp: "6 × 3 = 18." },
            { letter: "D", text: "24 puntos", correct: false, exp: "8 × 3 = 24." }
        ]
    },
    {
        id: 5,
        context: "🎨 Clase de Arte",
        question: "La profesora repartió 6 recipientes con témperas. Cada recipiente tiene 7 tubos de colores distintos. ¿Cuántos tubos de témpera hay en total?",
        options: [
            { letter: "A", text: "13 tubos", correct: false, exp: "Sumaste 6 + 7." },
            { letter: "B", text: "36 tubos", correct: false, exp: "6 × 6 = 36." },
            { letter: "C", text: "42 tubos", correct: true, exp: "¡Correcto! 6 recipientes con 7 tubos es 6 × 7 = 42 tubos de témpera." },
            { letter: "D", text: "48 tubos", correct: false, exp: "6 × 8 = 48." }
        ]
    },
    {
        id: 6,
        context: "🌱 Huerto Escolar",
        question: "En el huerto de la escuela se plantaron 8 filas de lechugas. Si en cada fila se pusieron 8 lechugas, ¿cuántas lechugas se plantaron en total?",
        options: [
            { letter: "A", text: "16 lechugas", correct: false, exp: "No debes sumar 8 + 8." },
            { letter: "B", text: "56 lechugas", correct: false, exp: "8 × 7 = 56." },
            { letter: "C", text: "64 lechugas", correct: true, exp: "¡Muy bien! 8 filas de 8 lechugas es 8 × 8 = 64 lechugas." },
            { letter: "D", text: "72 lechugas", correct: false, exp: "8 × 9 = 72." }
        ]
    },
    {
        id: 7,
        context: "📚 Biblioteca CRA",
        question: "Don Tomás organizó los libros de cuentos en 9 estantes. Si puso 6 libros en cada estante, ¿cuántos libros ordenó en total?",
        options: [
            { letter: "A", text: "45 libros", correct: false, exp: "9 × 5 = 45." },
            { letter: "B", text: "54 libros", correct: true, exp: "¡Perfecto! 9 estantes con 6 libros es 9 × 6 = 54 libros." },
            { letter: "C", text: "63 libros", correct: false, exp: "9 × 7 = 63." },
            { letter: "D", text: "15 libros", correct: false, exp: "No debes sumar 9 + 6." }
        ]
    },
    {
        id: 8,
        context: "⚽ Torneo de Fútbol",
        question: "En el campeonato escolar participan 10 equipos. Si cada equipo tiene 7 jugadores en cancha, ¿cuántos jugadores hay en total jugando?",
        options: [
            { letter: "A", text: "17 jugadores", correct: false, exp: "Sumaste 10 + 7." },
            { letter: "B", text: "70 jugadores", correct: true, exp: "¡Genial! 10 equipos de 7 jugadores es 10 × 7 = 70 jugadores." },
            { letter: "C", text: "77 jugadores", correct: false, exp: "11 × 7 = 77." },
            { letter: "D", text: "60 jugadores", correct: false, exp: "10 × 6 = 60." }
        ]
    },
    {
        id: 9,
        context: "💰 Alcancía y Ahorro",
        question: "Matías guardó durante 4 semanas billetes de $2.000 (o monedas de $2). Si guardó 2 monedas cada día de la semana (7 días), ¿cuántas monedas guardó a la semana?",
        options: [
            { letter: "A", text: "9 monedas", correct: false, exp: "No debes sumar 2 + 7." },
            { letter: "B", text: "14 monedas", correct: true, exp: "¡Correcto! 2 monedas × 7 días = 14 monedas por semana." },
            { letter: "C", text: "16 monedas", correct: false, exp: "2 × 8 = 16." },
            { letter: "D", text: "21 monedas", correct: false, exp: "3 × 7 = 21." }
        ]
    },
    {
        id: 10,
        context: "🎪 Alianzas Escolares",
        question: "La Alianza Amarilla formó 8 columnas de estudiantes para la coreografía. Si en cada columna hay 5 estudiantes, ¿cuántos estudiantes participan?",
        options: [
            { letter: "A", text: "35 estudiantes", correct: false, exp: "8 × 4 = 32 o 7 × 5 = 35." },
            { letter: "B", text: "40 estudiantes", correct: true, exp: "¡Excelente! 8 columnas de 5 estudiantes es 8 × 5 = 40 estudiantes." },
            { letter: "C", text: "45 estudiantes", correct: false, exp: "9 × 5 = 45." },
            { letter: "D", text: "13 estudiantes", correct: false, exp: "No debes sumar 8 + 5." }
        ]
    }
];

let currentSimceQuestionIdx = 0;
let simceUserAnswers = {};

window.initSimceModule = function() {
    currentSimceQuestionIdx = 0;
    renderSimceSidebarNav();
    renderSimceQuestionCard();
};

function renderSimceSidebarNav() {
    const grid = document.getElementById('simceQuestionNavGrid');
    const statusText = document.getElementById('simceAnsweredStatusText');
    if (!grid) return;
    grid.innerHTML = '';

    let answeredCount = 0;

    SIMCE_QUESTIONS.forEach((q, idx) => {
        const isAnswered = simceUserAnswers[q.id] !== undefined;
        if (isAnswered) answeredCount++;

        const btn = document.createElement('button');
        btn.className = `q-nav-btn ${idx === currentSimceQuestionIdx ? 'active' : ''} ${isAnswered ? 'answered' : ''}`;
        btn.textContent = idx + 1;

        btn.addEventListener('click', () => {
            if (window.audio) audio.playClick();
            currentSimceQuestionIdx = idx;
            renderSimceSidebarNav();
            renderSimceQuestionCard();
        });

        grid.appendChild(btn);
    });

    if (statusText) {
        statusText.textContent = `Respondidas: ${answeredCount} de 10`;
    }
}

function renderSimceQuestionCard() {
    const q = SIMCE_QUESTIONS[currentSimceQuestionIdx];
    const contextEl = document.getElementById('simceContextBox');
    const qTextEl = document.getElementById('simceQuestionText');
    const optionsGrid = document.getElementById('simceOptionsGrid');
    const btnNext = document.getElementById('btnSimceNext');
    const btnFinish = document.getElementById('btnSimceFinish');

    if (contextEl) contextEl.innerHTML = `📌 ${q.context}`;
    if (qTextEl) qTextEl.textContent = `Pregunta ${currentSimceQuestionIdx + 1}: ${q.question}`;

    if (optionsGrid) {
        optionsGrid.innerHTML = '';
        const selectedIdx = simceUserAnswers[q.id];

        q.options.forEach((opt, optIdx) => {
            const btn = document.createElement('button');
            btn.className = `simce-option-btn ${selectedIdx === optIdx ? 'selected' : ''}`;
            btn.innerHTML = `
                <div class="option-letter">${opt.letter}</div>
                <div>${opt.text}</div>
            `;

            btn.addEventListener('click', () => {
                if (window.audio) audio.playClick();
                simceUserAnswers[q.id] = optIdx;
                renderSimceSidebarNav();
                renderSimceQuestionCard();
            });

            optionsGrid.appendChild(btn);
        });
    }

    if (btnNext) {
        if (currentSimceQuestionIdx < SIMCE_QUESTIONS.length - 1) {
            btnNext.style.display = 'block';
            btnNext.onclick = () => {
                currentSimceQuestionIdx++;
                renderSimceSidebarNav();
                renderSimceQuestionCard();
            };
        } else {
            btnNext.style.display = 'none';
        }
    }

    if (btnFinish) {
        btnFinish.onclick = () => {
            finishSimceExam();
        };
    }
}

function finishSimceExam() {
    const answeredCount = Object.keys(simceUserAnswers).length;
    
    const submitExam = () => {
        let correctCount = 0;
        SIMCE_QUESTIONS.forEach(q => {
            const uAns = simceUserAnswers[q.id];
            if (uAns !== undefined && q.options[uAns].correct) {
                correctCount++;
            }
        });

        stateMgr.recordSimceResult(correctCount);
        const simcePts = Math.round(200 + (correctCount * 15));

        if (window.modalSys) {
            modalSys.showSuccess(
                '🎓 ¡Ensayo SIMCE Finalizado!',
                `¡Felicitaciones, ${stateMgr.state.studentName}!\n\n` +
                `Obtuviste ${correctCount} de 10 respuestas correctas.\n` +
                `Puntaje SIMCE Estimado: ${simcePts} Puntos.`
            );
        }

        if (window.refreshDashboardUI) window.refreshDashboardUI();
    };

    if (answeredCount < SIMCE_QUESTIONS.length) {
        if (window.modalSys) {
            modalSys.showConfirm(
                '⚠️ Preguntas Pendientes',
                `Has respondido ${answeredCount} de 10 preguntas. ¿Deseas entregar el ensayo de todas formas?`,
                submitExam
            );
        } else {
            submitExam();
        }
    } else {
        submitExam();
    }
}
