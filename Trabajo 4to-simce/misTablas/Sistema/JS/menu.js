/* LÓGICA DEL MAPA DE EXPEDICIÓN Y NAVEGACIÓN DE MUNDOS - MIS TABLAS 4° BÁSICO */

document.addEventListener('DOMContentLoaded', () => {
    if (!stateMgr.isLoggedIn()) {
        window.location.href = '../index.html';
        return;
    }

    const profileAvatarIcon = document.getElementById('profileAvatarIcon');
    const profileStudentName = document.getElementById('profileStudentName');
    const profileLevel = document.getElementById('profileLevel');
    const profileStarsCount = document.getElementById('profileStarsCount');
    const overallProgressFill = document.getElementById('overallProgressFill');
    const overallProgressPercent = document.getElementById('overallProgressPercent');

    const navButtons = document.querySelectorAll('.nav-btn');
    const viewSections = document.querySelectorAll('.view-section');

    function updateHeaderUI() {
        const av = stateMgr.getAvatarData(stateMgr.state.avatar);
        if (profileAvatarIcon) {
            profileAvatarIcon.innerHTML = `
                <img src="${av.svg}" alt="${av.name}" style="width:100%; height:100%; object-fit:contain;"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <span style="display:none; font-size:1.6rem;">${av.icon}</span>
            `;
        }
        if (profileStudentName) profileStudentName.textContent = stateMgr.state.studentName;
        if (profileLevel) profileLevel.textContent = `Nivel ${stateMgr.state.currentLevel} - ${av.name}`;
        if (profileStarsCount) profileStarsCount.textContent = stateMgr.state.totalStars;

        let totalMissions = 0;
        WORLDS_DATA.forEach(w => totalMissions += w.missions.length);
        const completedCount = stateMgr.state.completedMissions.length;

        const progressPct = Math.round((completedCount / totalMissions) * 100);
        if (overallProgressFill) overallProgressFill.style.width = `${progressPct}%`;
        if (overallProgressPercent) overallProgressPercent.textContent = `${progressPct}%`;
    }

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

    // Renderizar el MAPA INTERACTIVO DE MUNDOS Y PORTALES
    function renderWorldsMap() {
        const container = document.getElementById('worldsMapContainer');
        if (!container) return;
        container.innerHTML = '';

        WORLDS_DATA.forEach(world => {
            const isWorldUnlocked = stateMgr.state.unlockedWorlds.includes(world.id);
            
            const worldCard = document.createElement('div');
            worldCard.className = `world-sector-card ${isWorldUnlocked ? 'unlocked' : 'locked'}`;
            worldCard.style.background = world.bg;
            worldCard.style.borderRadius = 'var(--radius-xl)';
            worldCard.style.padding = '28px';
            worldCard.style.marginBottom = '24px';
            worldCard.style.border = '3px solid rgba(255,255,255,0.2)';
            worldCard.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';

            let missionsHTML = '';
            world.missions.forEach((m, mIdx) => {
                const isCompleted = stateMgr.state.completedMissions.includes(m.id);
                let isMissionUnlocked = false;

                if (m.req === 'Inicio') {
                    isMissionUnlocked = isWorldUnlocked;
                } else {
                    isMissionUnlocked = stateMgr.state.completedMissions.includes(m.req);
                }

                let nodeStatusClass = 'locked';
                let iconChar = '🔒';
                if (isCompleted) {
                    nodeStatusClass = 'completed';
                    iconChar = '✅';
                } else if (isMissionUnlocked) {
                    nodeStatusClass = 'unlocked';
                    iconChar = '🌀';
                }

                missionsHTML += `
                    <div class="portal-node ${nodeStatusClass}" data-mission-id="${m.id}" data-world-id="${world.id}"
                         style="background:rgba(255,255,255,0.92); border:3px solid var(--primary); border-radius:var(--radius-lg); padding:16px 20px; flex:1; min-width:200px; text-align:center;">
                        <div style="font-size:2rem; margin-bottom:4px;">${iconChar}</div>
                        <div style="font-weight:800; font-size:1.1rem; color:var(--text-dark);">${m.title}</div>
                        <div style="font-size:0.85rem; font-weight:700; color:var(--accent-orange); margin-top:4px;">
                            ${isCompleted ? '⭐ Dominado (+ ' + m.reward + ' Pts)' : (isMissionUnlocked ? '✨ ¡Disponible!' : '🔒 Bloqueado')}
                        </div>
                    </div>
                `;
            });

            worldCard.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                    <div>
                        <h3 style="color:white; font-size:1.8rem;">${world.title} ${isWorldUnlocked ? '🔓' : '🔒'}</h3>
                        <p style="color:rgba(255,255,255,0.8); font-size:1.05rem;">${world.desc}</p>
                    </div>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:16px;">
                    ${missionsHTML}
                </div>
            `;

            container.appendChild(worldCard);
        });

        // Event listeners para hacer clic en los nodos de portal
        document.querySelectorAll('.portal-node').forEach(node => {
            node.addEventListener('click', () => {
                const missionId = node.getAttribute('data-mission-id');
                const worldId = parseInt(node.getAttribute('data-world-id'));

                if (node.classList.contains('locked')) {
                    if (window.modalSys) {
                        modalSys.showToast('🔒 Completa las misiones anteriores para desbloquear este portal.', 'warning', '🔒');
                    }
                    return;
                }

                // Iniciar la misión correspondiente
                launchMissionById(missionId, worldId);
            });
        });
    }

    function launchMissionById(mId, wId) {
        if (mId === '1-1' || mId === '1-2' || mId === '1-3') {
            switchView('view-aprender');
            if (window.selectAprenderTable) window.selectAprenderTable(2);
        } else if (mId.startsWith('2-')) {
            switchView('view-aprender');
            if (window.selectAprenderTable) window.selectAprenderTable(5);
        } else if (mId === '3-1' || mId === '3-2') {
            switchView('view-juegos');
            if (window.startJuegoMemoria) window.startJuegoMemoria();
        } else if (mId === '4-1') {
            switchView('view-juegos');
            if (window.startJuegoSupermercado) window.startJuegoSupermercado();
        } else if (mId === '4-2') {
            switchView('view-juegos');
            if (window.startJuegoMisionEspacial) window.startJuegoMisionEspacial();
        } else if (mId === '5-1') {
            switchView('view-simce');
        }
    }

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (window.modalSys) {
                modalSys.showConfirm('🚪 Cambiar de Héroe', '¿Deseas salir a la selección de personaje? Tu progreso se guardará automáticamente.', () => {
                    window.location.href = '../index.html';
                });
            } else {
                window.location.href = '../index.html';
            }
        });
    }

    window.refreshDashboardUI = () => {
        updateHeaderUI();
        renderWorldsMap();
    };

    updateHeaderUI();
    renderWorldsMap();
});
