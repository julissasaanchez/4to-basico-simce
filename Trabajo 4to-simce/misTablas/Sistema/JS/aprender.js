/* MÓDULO APRENDER TABLAS - EXPLORACIÓN VISUAL Y CONCEPTUAL DE MULTIPLICACIONES */

const PATTERNS_INFO = {
    2: { title: 'Doble y Números Pares', icon: '✌️', desc: '¡Multiplicar por 2 es sumar el número consigo mismo (el doble)! Todos los resultados terminan en 0, 2, 4, 6 u 8 (números pares).' },
    3: { title: 'Suma Repetida Triple', icon: '☘️', desc: '¡Multiplicar por 3 es contar en grupos de 3! La suma de los dígitos de sus resultados siempre es un múltiplo de 3 (3, 6, 9).' },
    4: { title: 'El Doble del Doble', icon: '🍀', desc: '¡El truco de la tabla del 4 es calcular el doble dos veces! Ej: 4 × 6 ➔ el doble de 6 es 12, y el doble de 12 es 24.' },
    5: { title: 'Finaliza en 0 o 5', icon: '🖐️', desc: '¡Facilísimo! Todos los resultados de la tabla del 5 terminan en 0 (si es par) o en 5 (si es impar).' },
    6: { title: 'El Doble del 3', icon: '🎲', desc: 'Los resultados de la tabla del 6 son exactamente el doble de los resultados de la tabla del 3. ¡Todos son números pares!' },
    7: { title: 'Patrón de los Días de la Semana', icon: '🗓️', desc: 'Piensa en las semanas: 1 semana tiene 7 días, 2 semanas tienen 14 días... ¡Avanzas sumando 7 cada vez!' },
    8: { title: 'El Doble del Doble del Doble', icon: '🐙', desc: '¡El pulpo octópodo! Calcula el doble tres veces seguidas. Ej: 8 × 3 ➔ 3 ➔ 6 ➔ 12 ➔ 24.' },
    9: { title: 'La Magia de los Nueve', icon: '🪄', desc: '¡Truco mágico! En la tabla del 9, la suma de los dígitos del resultado SIEMPRE da 9. Ej: 9 × 4 = 36 (3 + 6 = 9).' },
    10: { title: 'Agrega un Cero', icon: '🚀', desc: '¡La tabla más rápida! Para multiplicar cualquier número por 10, simplemente escribe el número y agrégale un 0 al final.' }
};

const ITEM_EMOJIS = ['🍎', '⭐', '🚀', '💎', '🚗', '🐱', '⚽', '🍦', '🎁'];

let currentSelectedTable = 2;
let currentMultiplier = 1;

window.initAprenderModule = function() {
    renderTablePills();
    updateVisualizer();
};

window.selectAprenderTable = function(tableNum) {
    currentSelectedTable = tableNum;
    currentMultiplier = 1;
    renderTablePills();
    updateVisualizer();
};

function renderTablePills() {
    const container = document.getElementById('tablePillsContainer');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 2; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.className = `pill-table-btn ${i === currentSelectedTable ? 'active' : ''}`;
        btn.textContent = `Tabla del ${i}`;
        btn.addEventListener('click', () => {
            if (window.audio) audio.playClick();
            currentSelectedTable = i;
            currentMultiplier = 1;
            renderTablePills();
            updateVisualizer();
        });
        container.appendChild(btn);
    }
}

function updateVisualizer() {
    const eqDisplay = document.getElementById('equationDisplay');
    const visualGroups = document.getElementById('visualGroupsContainer');
    const multiplierSlider = document.getElementById('multiplierSlider');
    const patternTitle = document.getElementById('patternTitle');
    const patternDesc = document.getElementById('patternDesc');
    const tableSeqGrid = document.getElementById('tableSeqGrid');

    if (multiplierSlider) {
        multiplierSlider.value = currentMultiplier;
    }

    const res = currentSelectedTable * currentMultiplier;

    // Actualizar ecuación
    if (eqDisplay) {
        eqDisplay.innerHTML = `
            <span class="eq-number">${currentSelectedTable}</span>
            <span class="eq-times">×</span>
            <span class="eq-number">${currentMultiplier}</span>
            <span class="eq-equals">=</span>
            <span class="eq-number eq-result">${res}</span>
        `;
    }

    // Renderizar representación de grupos de objetos
    if (visualGroups) {
        visualGroups.innerHTML = '';
        const emoji = ITEM_EMOJIS[(currentSelectedTable - 2) % ITEM_EMOJIS.length];

        for (let g = 0; g < currentMultiplier; g++) {
            const groupBox = document.createElement('div');
            groupBox.className = 'group-box';
            
            let itemsHTML = '';
            for (let item = 0; item < currentSelectedTable; item++) {
                itemsHTML += `<span class="item-icon">${emoji}</span>`;
            }
            groupBox.innerHTML = itemsHTML;
            visualGroups.appendChild(groupBox);
        }
    }

    // Actualizar patrón de la tabla
    const pat = PATTERNS_INFO[currentSelectedTable];
    if (patternTitle && pat) {
        patternTitle.innerHTML = `${pat.icon} ${pat.title}`;
    }
    if (patternDesc && pat) {
        patternDesc.textContent = pat.desc;
    }

    // Grid con la secuencia completa (1 a 10)
    if (tableSeqGrid) {
        tableSeqGrid.innerHTML = '';
        for (let k = 1; k <= 10; k++) {
            const item = document.createElement('div');
            item.className = `seq-item ${k === currentMultiplier ? 'active-seq' : ''}`;
            item.style.background = k === currentMultiplier ? 'var(--primary)' : 'rgba(255,255,255,0.08)';
            item.innerHTML = `<small>${currentSelectedTable}×${k}</small><br><strong>${currentSelectedTable * k}</strong>`;
            tableSeqGrid.appendChild(item);
        }
    }
}

// Event listeners para controles del slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('multiplierSlider');
    if (slider) {
        slider.addEventListener('input', (e) => {
            currentMultiplier = parseInt(e.target.value);
            updateVisualizer();
        });
    }

    const btnPracticarTabla = document.getElementById('btnPracticarTabla');
    if (btnPracticarTabla) {
        btnPracticarTabla.addEventListener('click', () => {
            if (window.audio) audio.playStar();
            // Marcar avance en la tabla actual
            stateMgr.updateTableProgress(currentSelectedTable, 3, 100);
            alert(`🎉 ¡Excelente! Has completado y dominado la Tabla del ${currentSelectedTable}. ¡Has ganado 3 Estrellas!`);
            if (window.refreshDashboardUI) window.refreshDashboardUI();
        });
    }
});
