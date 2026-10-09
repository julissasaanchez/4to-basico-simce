/* MÓDULO DE SALÓN DE HÉROES, COFRES Y TROFEOS - MIS TABLAS 4° BÁSICO */

window.initProgresoModule = function() {
    renderStatsSummary();
    renderLogrosGallery();
};

function renderStatsSummary() {
    const totalPtsEl = document.getElementById('statsTotalPts');
    const totalStarsEl = document.getElementById('statsTotalStars');
    const levelEl = document.getElementById('statsLevel');
    const simceBestEl = document.getElementById('statsSimceBest');

    if (totalPtsEl) totalPtsEl.textContent = stateMgr.state.totalPoints;
    if (totalStarsEl) totalStarsEl.textContent = stateMgr.state.totalStars;
    if (levelEl) levelEl.textContent = `Nivel ${stateMgr.state.currentLevel}`;
    if (simceBestEl) simceBestEl.textContent = stateMgr.state.simceBestScore > 0 ? `${stateMgr.state.simceBestScore} Pts` : 'Pendiente';
}

function renderLogrosGallery() {
    const grid = document.getElementById('logrosGrid');
    if (!grid) return;
    grid.innerHTML = '';

    LOGROS_LIST.forEach(log => {
        const isUnlocked = stateMgr.state.unlockedLogros.includes(log.id);
        const card = document.createElement('div');
        card.className = `table-card ${isUnlocked ? 'completed' : 'locked'}`;
        card.style.minHeight = '160px';
        card.style.background = isUnlocked ? 'linear-gradient(145deg, #ffffff 0%, #fef3c7 100%)' : '#f1f5f9';
        card.style.border = isUnlocked ? '3px solid #f59e0b' : '2px stroke #cbd5e1';

        card.innerHTML = `
            <div style="font-size:2.8rem; margin-bottom:8px;" class="${isUnlocked ? 'treasure-chest-icon' : ''}">${log.icon}</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--text-dark);">${log.title}</div>
            <div style="font-size:0.9rem; color:var(--text-muted); margin-top:4px;">${log.desc}</div>
            <div style="font-size:0.85rem; font-weight:800; margin-top:10px; color:${isUnlocked ? '#b45309' : 'var(--text-muted)'}">
                ${isUnlocked ? '📦 ¡COFRE DESBLOQUEADO!' : '🔒 Bloqueado'}
            </div>
        `;

        if (isUnlocked) {
            card.addEventListener('click', () => {
                if (window.audio) audio.playVictory();
                if (window.modalSys) {
                    modalSys.showSuccess('📦 ¡Cofre Abrido!', `¡Recompensa de la Insignia "${log.title}"! Obtuviste cristales mágicos de energía.`);
                }
            });
        }

        grid.appendChild(card);
    });
}
