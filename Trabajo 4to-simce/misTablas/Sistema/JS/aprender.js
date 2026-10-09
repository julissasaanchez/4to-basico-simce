/* MÓDULO APRENDER TABLAS - EXPLORACIÓN VISUAL Y OBJETOS CONTABLES INTERACTIVOS */

const PATTERNS_INFO = {
    2: { title: 'Doble y Números Pares', icon: '✌️', desc: '¡Multiplicar por 2 es sumar el número consigo mismo (el doble)! Todos los resultados terminan en 0, 2, 4, 6 u 8.' },
    3: { title: 'Suma Repetida Triple', icon: '☘️', desc: '¡Multiplicar por 3 es contar en grupos de 3! La suma de los dígitos de sus resultados siempre es múltiplo de 3.' },
    4: { title: 'El Doble del Doble', icon: '🍀', desc: '¡El truco de la tabla del 4 es calcular el doble dos veces! Ej: 4 × 6 ➔ el doble de 6 es 12, y el doble de 12 es 24.' },
    5: { title: 'Finaliza en 0 o 5', icon: '🖐️', desc: '¡Facilísimo! Todos los resultados de la tabla del 5 terminan en 0 (si es par) o en 5 (si es impar).' },
    6: { title: 'El Doble del 3', icon: '🎲', desc: 'Los resultados de la tabla del 6 son exactamente el doble de los resultados de la tabla del 3. ¡Todos son números pares!' },
    7: { title: 'Patrón de los Días de la Semana', icon: '🗓️', desc: 'Piensa en las semanas: 1 semana tiene 7 días, 2 semanas tienen 14 días... ¡Avanzas sumando 7 cada vez!' },
    8: { title: 'El Doble del Doble del Doble', icon: '🐙', desc: '¡El pulpo octópodo! Calcula el doble tres veces seguidas. Ej: 8 × 3 ➔ 3 ➔ 6 ➔ 12 ➔ 24.' },
    9: { title: 'La Magia de los Nueve', icon: '🪄', desc: '¡Truco mágico! En la tabla del 9, la suma de los dígitos del resultado SIEMPRE da 9. Ej: 9 × 4 = 36 (3 + 6 = 9).' },
    10: { title: 'Agrega un Cero', icon: '🚀', desc: '¡La tabla más rápida! Para multiplicar cualquier número por 10, simplemente escribe el número y agrégale un 0 al final.' }
};

const ITEM_EMOJIS = ['🍎', '🌸', '⭐', '🚀', '💎', '🚗', '🐱', '⚽', '🍦', '🎁'];

let currentSelectedTable = 2;
let currentMultiplier = 1;
let totalInteractiveItems = 0;
let selectedItemsCount = 0;

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
    totalInteractiveItems = res;
    selectedItemsCount = 0;

    // Actualizar ecuación
    if (eqDisplay) {
        eqDisplay.innerHTML = `
            <span class="eq-number">${currentSelectedTable}</span>
            <span class="eq-times">×</span>
            <span class="eq-number">${currentMultiplier}</span>
            <span class="eq-equals">=</span>
            <span class="eq-number eq-result" id="eqResultDisplay">${res}</span>
        `;
    }

    // Renderizar representación de grupos con OBJETOS CONTABLES INTERACTIVOS
    if (visualGroups) {
        visualGroups.innerHTML = `
            <div style="width:100%; text-align:center; margin-bottom:12px;">
                <span id="counterStatusBadge" style="font-size:1.1rem; font-weight:700; color:var(--primary); background:#e0e7ff; padding:6px 16px; border-radius:20px;">
                    👉 ¡Haz clic en los objetos para contarlos!: 0 / ${totalInteractiveItems}
                </span>
                <button id="btnResetCount" style="margin-left:10px; padding:4px 12px; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:12px; font-weight:700; cursor:pointer;">🔄 Reiniciar Conteo</button>
            </div>
            <div id="interactiveItemsWrapper" style="display:flex; flex-wrap:wrap; justify-content:center; gap:14px; width:100%;"></div>
        `;

        const wrapper = document.getElementById('interactiveItemsWrapper');
        const emoji = ITEM_EMOJIS[(currentSelectedTable - 2) % ITEM_EMOJIS.length];

        let globalItemIndex = 0;
        for (let g = 0; g < currentMultiplier; g++) {
            const groupBox = document.createElement('div');
            groupBox.className = 'group-box';
            groupBox.style.position = 'relative';

            const groupLabel = document.createElement('span');
            groupLabel.style.position = 'absolute';
            groupLabel.style.top = '-10px';
            groupLabel.style.left = '10px';
            groupLabel.style.background = 'var(--primary)';
            groupLabel.style.color = 'white';
            groupLabel.style.fontSize = '0.75rem';
            groupLabel.style.padding = '2px 8px';
            groupLabel.style.borderRadius = '8px';
            groupLabel.style.fontWeight = '800';
            groupLabel.textContent = `Grupo ${g + 1}`;
            groupBox.appendChild(groupLabel);

            for (let item = 0; item < currentSelectedTable; item++) {
                globalItemIndex++;
                const itemElem = document.createElement('div');
                itemElem.className = 'item-icon interactive-countable';
                itemElem.setAttribute('data-counted', 'false');
                itemElem.style.cursor = 'pointer';
                itemElem.style.transition = 'transform 0.2s, filter 0.2s, background 0.2s';
                itemElem.style.borderRadius = '50%';
                itemElem.style.padding = '4px';
                itemElem.textContent = emoji;

                itemElem.addEventListener('click', () => {
                    const isCounted = itemElem.getAttribute('data-counted') === 'true';
                    if (!isCounted) {
                        itemElem.setAttribute('data-counted', 'true');
                        itemElem.style.background = '#fde047';
                        itemElem.style.boxShadow = '0 0 12px #f59e0b';
                        itemElem.style.transform = 'scale(1.25)';
                        selectedItemsCount++;
                        if (window.audio) audio.playClick();
                    } else {
                        itemElem.setAttribute('data-counted', 'false');
                        itemElem.style.background = 'transparent';
                        itemElem.style.boxShadow = 'none';
                        itemElem.style.transform = 'scale(1)';
                        selectedItemsCount--;
                        if (window.audio) audio.playClick();
                    }
                    updateCounterBadge();
                });

                groupBox.appendChild(itemElem);
            }
            wrapper.appendChild(groupBox);
        }

        const btnReset = document.getElementById('btnResetCount');
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                document.querySelectorAll('.interactive-countable').forEach(el => {
                    el.setAttribute('data-counted', 'false');
                    el.style.background = 'transparent';
                    el.style.boxShadow = 'none';
                    el.style.transform = 'scale(1)';
                });
                selectedItemsCount = 0;
                updateCounterBadge();
            });
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
            item.innerHTML = `<small>${currentSelectedTable}×${k}</small><br><strong>${currentSelectedTable * k}</strong>`;
            tableSeqGrid.appendChild(item);
        }
    }
}

function updateCounterBadge() {
    const badge = document.getElementById('counterStatusBadge');
    if (!badge) return;

    badge.textContent = `👉 ¡Has contado ${selectedItemsCount} de ${totalInteractiveItems} elementos! (${currentMultiplier} grupos de ${currentSelectedTable})`;

    if (selectedItemsCount === totalInteractiveItems && totalInteractiveItems > 0) {
        badge.style.background = '#dcfce7';
        badge.style.color = '#166534';
        badge.textContent = `🎉 ¡Completaste el conteo! ${currentMultiplier} grupos de ${currentSelectedTable} es igual a ${totalInteractiveItems}.`;
        if (window.modalSys) {
            modalSys.showToast(`🎉 ¡Genial! Has contado los ${totalInteractiveItems} elementos correctamente.`, 'success', '⭐');
        }
    } else {
        badge.style.background = '#e0e7ff';
        badge.style.color = 'var(--primary)';
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
            stateMgr.updateTableProgress(currentSelectedTable, 3, 100);
            if (window.modalSys) {
                modalSys.showSuccess('¡Misión Cumplida! ⭐', `¡Felicitaciones! Has dominado la Tabla del ${currentSelectedTable} y ganaste 3 Estrellas.`);
            }
            if (window.refreshDashboardUI) window.refreshDashboardUI();
        });
    }
});
