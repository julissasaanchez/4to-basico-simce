/* MÓDULO DE PROGRESO Y LOGROS - MIS TABLAS 4° BÁSICO */

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
        card.style.minHeight = '140px';

        card.innerHTML = `
            <div style="font-size:2.5rem; margin-bottom:8px;">${log.icon}</div>
            <div style="font-size:1.1rem; font-weight:700; color:white;">${log.title}</div>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">${log.desc}</div>
            <div style="font-size:0.8rem; font-weight:700; margin-top:8px; color:${isUnlocked ? 'var(--accent-green)' : 'var(--text-muted)'}">
                ${isUnlocked ? '✨ ¡DESBLOQUEADO!' : '🔒 Bloqueado'}
            </div>
        `;

        grid.appendChild(card);
    });
}
