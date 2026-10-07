/* LÓGICA DE NAVEGACIÓN Y MENÚ PRINCIPAL - MIS TABLAS 4° BÁSICO */

document.addEventListener('DOMContentLoaded', () => {
    // Redirigir a login si no hay estudiante registrado
    if (!stateMgr.isLoggedIn()) {
        window.location.href = '../index.html';
        return;
    }

    // Elementos DOM del Header
    const profileAvatarIcon = document.getElementById('profileAvatarIcon');
    const profileStudentName = document.getElementById('profileStudentName');
    const profileLevel = document.getElementById('profileLevel');
    const profileStarsCount = document.getElementById('profileStarsCount');
    const overallProgressFill = document.getElementById('overallProgressFill');
    const overallProgressPercent = document.getElementById('overallProgressPercent');

    // Botones de Navegación Lateral
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewSections = document.querySelectorAll('.view-section');

    // Actualizar datos del usuario en Header
    function updateHeaderUI() {
        const av = stateMgr.getAvatarData(stateMgr.state.avatar);
        profileAvatarIcon.textContent = av.icon;
        profileStudentName.textContent = stateMgr.state.studentName;
        profileLevel.textContent = `Nivel ${stateMgr.state.currentLevel} - ${av.name}`;
        profileStarsCount.textContent = stateMgr.state.totalStars;

        // Calcular porcentaje de avance global de tablas 2-10
        let completedCount = 0;
        let totalStarsPossible = 9 * 3; // 9 tablas x 3 estrellas max
        let starsCollected = 0;

        Object.keys(stateMgr.state.tableProgress).forEach(t => {
            const tableData = stateMgr.state.tableProgress[t];
            if (tableData.status === 'completed') completedCount++;
            starsCollected += tableData.stars;
        });

        const progressPct = Math.round((completedCount / 9) * 100);
        overallProgressFill.style.width = `${progressPct}%`;
        overallProgressPercent.textContent = `${progressPct}%`;
    }

    // Cambiar vista activa
    function switchView(viewId) {
        if (window.audio) audio.playClick();

        navButtons.forEach(btn => {
            if (btn.getAttribute('data-view') === viewId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        viewSections.forEach(sec => {
            if (sec.id === viewId) {
                sec.classList.add('active');
            } else {
                sec.classList.remove('active');
            }
        });

        // Inicializar lógicas de módulo según la vista seleccionada
        if (viewId === 'view-aprender' && window.initAprenderModule) {
            window.initAprenderModule();
        } else if (viewId === 'view-juegos' && window.initJuegosModule) {
            window.initJuegosModule();
        } else if (viewId === 'view-progreso' && window.initProgresoModule) {
            window.initProgresoModule();
        } else if (viewId === 'view-simce' && window.initSimceModule) {
            window.initSimceModule();
        }
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-view');
            switchView(target);
        });
    });

    // Renderizar Mapa/Tarjetas de Tablas 2 al 10 en la Vista "Aprender Tablas"
    function renderTablesMap() {
        const grid = document.getElementById('tablesGridContainer');
        if (!grid) return;
        grid.innerHTML = '';

        for (let i = 2; i <= 10; i++) {
            const tData = stateMgr.state.tableProgress[i] || { status: 'locked', stars: 0 };
            const card = document.createElement('div');
            card.className = `table-card ${tData.status}`;

            let starsHTML = '';
            for (let s = 1; s <= 3; s++) {
                starsHTML += `<span class="star-icon ${s <= tData.stars ? 'filled' : ''}">★</span>`;
            }

            let statusLabel = 'Desbloqueado';
            let iconLabel = '🔓';
            if (tData.status === 'completed') {
                statusLabel = '¡Dominada!';
                iconLabel = '✅';
            } else if (tData.status === 'locked') {
                statusLabel = 'Bloqueada';
                iconLabel = '🔒';
            }

            card.innerHTML = `
                <div class="table-card-number">Tabla del ${i}</div>
                <div class="table-card-info">
                    <div class="table-card-title">Misión Tabla del ${i}</div>
                    <div class="table-card-status">${iconLabel} ${statusLabel}</div>
                    <div class="stars-container">${starsHTML}</div>
                </div>
            `;

            card.addEventListener('click', () => {
                if (tData.status === 'locked') {
                    if (window.audio) audio.playWrong();
                    alert(`🔒 ¡Completa la Tabla del ${i-1} para desbloquear la Tabla del ${i}!`);
                    return;
                }
                // Abrir la tabla seleccionada en el módulo interactivo
                switchView('view-aprender');
                if (window.selectAprenderTable) {
                    window.selectAprenderTable(i);
                }
            });

            grid.appendChild(card);
        }
    }

    // Botón Salir / Cambiar Estudiante
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (confirm('¿Deseas salir o cambiar de estudiante? Se mantendrán tus puntos guardados.')) {
                window.location.href = '../index.html';
            }
        });
    }

    // Exponer función global para actualizar UI tras actividades
    window.refreshDashboardUI = () => {
        updateHeaderUI();
        renderTablesMap();
    };

    // Inicializar UI
    updateHeaderUI();
    renderTablesMap();
});
