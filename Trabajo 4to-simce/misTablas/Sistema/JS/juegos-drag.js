/* MOTOR DE NUEVOS JUEGOS EDUCATIVOS DRAG AND DROP - MIS TABLAS 4° BÁSICO */

// ----------------------------------------------------
// JUEGO 1: EL TEMPLO DE LOS CRISTALES (3 CÁMARAS POR ETAPAS)
// ----------------------------------------------------
window.startJuegoTemploCristales = function() {
    if (window.startArena) startArena('💎 El Templo de los Cristales');

    let currentCamera = 1;
    let cameraScore = 0;

    const area = document.getElementById('gameDynamicContent');

    function renderCamera(camNum) {
        let title = '';
        let numA = 0;
        let numB = 0;
        let opChar = '×';
        let targetAns = 0;

        if (camNum === 1) {
            title = '🔮 Cámara 1: El Portal de la Suma Mística';
            numA = Math.floor(Math.random() * 40) + 20;
            numB = Math.floor(Math.random() * 30) + 10;
            opChar = '+';
            targetAns = numA + numB;
        } else if (camNum === 2) {
            title = '💎 Cámara 2: El Cristal de la Multiplicación';
            numA = Math.floor(Math.random() * 8) + 2;
            numB = Math.floor(Math.random() * 9) + 2;
            opChar = '×';
            targetAns = numA * numB;
        } else {
            title = '⚡ Cámara 3: El Gran Altar del Razonamiento';
            numA = Math.floor(Math.random() * 60) + 40;
            numB = Math.floor(Math.random() * 25) + 10;
            opChar = '-';
            targetAns = numA - numB;
        }

        const options = [targetAns, targetAns + 4, targetAns - 3, targetAns + 10].sort(() => Math.random() - 0.5);

        area.innerHTML = `
            <div style="text-align:center;">
                <h4 style="color:var(--crystal-cyan); font-size:1.6rem; margin-bottom:12px;">${title}</h4>
                <div class="target-question-box">Activa el Cristal de Energía: ${numA} ${opChar} ${numB} = ?</div>
                
                <div style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:25px; margin-top:20px;">
                    <!-- Cristales draggables -->
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        <h5 style="color:var(--text-dark);">💎 Elige el Cristal de Energía:</h5>
                        <div style="display:flex; gap:12px;" id="crystalItemsContainer">
                            ${options.map(opt => `
                                <div class="drag-crystal-energy" draggable="true" data-val="${opt}"
                                     style="background:linear-gradient(135deg, #c084fc 0%, #9333ea 100%); color:white; font-size:1.6rem; font-weight:800; padding:16px 24px; border-radius:var(--radius-md); cursor:grab; box-shadow:0 6px 18px rgba(168,85,247,0.4);">
                                    💎 ${opt}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Altar Drop Zone -->
                    <div id="altarDropZone" style="background:#f3e8ff; border:4px dashed #a855f7; border-radius:var(--radius-xl); padding:30px; width:260px; min-height:180px; text-align:center; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                        <div style="font-size:3.5rem;" class="anim-float">🔮</div>
                        <div style="font-weight:700; color:#6b21a8; margin-top:10px;" id="altarDropText">¡Arrastra aquí el Cristal Mágico!</div>
                    </div>
                </div>
            </div>
        `;

        setupDragAndDropTemplo(targetAns, camNum);
    }

    function setupDragAndDropTemplo(targetAns, camNum) {
        const crystals = document.querySelectorAll('.drag-crystal-energy');
        const altar = document.getElementById('altarDropZone');
        const text = document.getElementById('altarDropText');

        crystals.forEach(c => {
            c.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', c.getAttribute('data-val'));
                if (window.audio) audio.playClick();
            });
        });

        altar.addEventListener('dragover', (e) => {
            e.preventDefault();
            altar.style.background = '#e9d5ff';
        });

        altar.addEventListener('dragleave', () => {
            altar.style.background = '#f3e8ff';
        });

        altar.addEventListener('drop', (e) => {
            e.preventDefault();
            altar.style.background = '#f3e8ff';
            const val = parseInt(e.dataTransfer.getData('text/plain'));

            if (val === targetAns) {
                text.textContent = `✅ ¡CÁMARA ${camNum} ACTIVADA! (${val})`;
                stateMgr.addPoints(50);
                if (window.audio) audio.playVictory();

                if (camNum < 3) {
                    if (window.modalSys) {
                        modalSys.showSuccess(`¡Cámara ${camNum} Completada! 🔮✨`, `¡Excelente! El Cristal ${val} activó el altar. Avanzas a la siguiente cámara.`, () => {
                            renderCamera(camNum + 1);
                        });
                    } else {
                        renderCamera(camNum + 1);
                    }
                } else {
                    stateMgr.completeMission('1-3', 100);
                    if (window.modalSys) {
                        modalSys.showSuccess('🏆 ¡TEMPLO ACTIVADO Y MISIÓN COMPLETADA!', '¡Felicitaciones Héroe! Has recuperado el Cristal Sagrado del Templo y ganaste +100 puntos de energía.');
                    }
                    if (window.refreshDashboardUI) window.refreshDashboardUI();
                }
            } else {
                text.textContent = `❌ ¡Energía inestable! (${val})`;
                if (window.modalSys) {
                    modalSys.showToast('El cristal seleccionado no encaja en el altar. ¡Inténtalo de nuevo!', 'error', '⚠️');
                }
            }
        });
    }

    renderCamera(currentCamera);
};

// ----------------------------------------------------
// JUEGO 2: SUPERMERCADO MATEMÁTICO (DRAG & DROP)
// ----------------------------------------------------
window.startJuegoSupermercado = function() {
    if (window.startArena) startArena('🛒 La Ciudad del Comercio');
    
    const items = [
        { id: 'item1', name: 'Manzanas', price: 200, icon: '🍎' },
        { id: 'item2', name: 'Leche', price: 300, icon: '🥛' },
        { id: 'item3', name: 'Pan', price: 150, icon: '🍞' },
        { id: 'item4', name: 'Queso', price: 400, icon: '🧀' }
    ];

    const targetTotal = 1000;
    const area = document.getElementById('gameDynamicContent');
    area.innerHTML = `
        <div style="text-align:center;">
            <div class="simce-context-box" style="margin-bottom:15px;">
                🛒 <strong>Desafío de Compras:</strong> Arrastra productos a la cesta para juntar exactamente <strong>$${targetTotal}</strong> en total.
            </div>
            
            <div style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:20px; margin-bottom:20px;">
                <div style="background:#f8fafc; border:3px dashed #cbd5e1; border-radius:var(--radius-lg); padding:16px; width:280px;">
                    <h5 style="color:var(--primary); margin-bottom:12px;">🏪 Estante de Productos</h5>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;" id="shelfProducts">
                        ${items.map(it => `
                            <div class="drag-product-item" draggable="true" data-id="${it.id}" data-price="${it.price}" data-name="${it.name}"
                                 style="background:white; border:2px solid #e2e8f0; border-radius:12px; padding:10px; cursor:grab; text-align:center; box-shadow:0 4px 8px rgba(0,0,0,0.05);">
                                <div style="font-size:2rem;">${it.icon}</div>
                                <div style="font-weight:700; font-size:0.9rem;">${it.name}</div>
                                <div style="color:#059669; font-weight:800;">$${it.price}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div id="shoppingCartDropZone" style="background:#fffbeb; border:4px dashed #f59e0b; border-radius:var(--radius-xl); padding:20px; width:300px; min-height:220px; text-align:center; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <h4 style="color:#b45309; margin-bottom:8px;">🛒 Cesta de Compras</h4>
                        <div id="cartItemsContainer" style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; min-height:100px; align-items:center;">
                            <span style="color:#92400e; font-size:0.95rem;">¡Arrastra productos aquí!</span>
                        </div>
                    </div>
                    <div style="margin-top:15px; border-top:2px solid #fde047; padding-top:10px;">
                        <div style="font-size:1.2rem; font-weight:800; color:#b45309;">Total: $<span id="cartTotalDisplay">0</span></div>
                    </div>
                </div>
            </div>

            <div style="display:flex; justify-content:center; gap:14px;">
                <button class="btn-submit" id="btnCheckCart" style="width:auto; padding:12px 30px;">Comprobar Compra 🛒</button>
                <button class="btn-modal btn-modal-secondary" id="btnClearCart">Vaciar Cesta 🔄</button>
            </div>
        </div>
    `;

    setupDragAndDropSupermercado(items, targetTotal);
};

function setupDragAndDropSupermercado(items, targetTotal) {
    let cart = [];
    const shelfItems = document.querySelectorAll('.drag-product-item');
    const dropZone = document.getElementById('shoppingCartDropZone');
    const cartContainer = document.getElementById('cartItemsContainer');
    const totalDisplay = document.getElementById('cartTotalDisplay');

    shelfItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.getAttribute('data-id'));
            if (window.audio) audio.playClick();
        });
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.background = '#fef3c7';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.background = '#fffbeb';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.background = '#fffbeb';
        const id = e.dataTransfer.getData('text/plain');
        const prod = items.find(it => it.id === id);
        if (prod) {
            cart.push(prod);
            renderCartUI();
            if (window.audio) audio.playStar();
        }
    });

    function renderCartUI() {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<span style="color:#92400e; font-size:0.95rem;">¡Arrastra productos aquí!</span>';
        } else {
            cartContainer.innerHTML = cart.map(c => `
                <span style="background:white; border:1px solid #fde047; padding:4px 10px; border-radius:12px; font-weight:700; font-size:0.9rem;">
                    ${c.icon} $${c.price}
                </span>
            `).join('');
        }

        const sum = cart.reduce((acc, curr) => acc + curr.price, 0);
        totalDisplay.textContent = sum;
    }

    document.getElementById('btnClearCart').onclick = () => {
        cart = [];
        renderCartUI();
    };

    document.getElementById('btnCheckCart').onclick = () => {
        const sum = cart.reduce((acc, curr) => acc + curr.price, 0);
        if (sum === targetTotal) {
            stateMgr.completeMission('4-1', 130);
            if (window.modalSys) {
                modalSys.showSuccess('¡Compra Perfecta! 🛒✨', `¡Excelente cálculo Héroe! Lograste juntar exactamente $${targetTotal}. Misión completada.`);
            }
            if (window.refreshDashboardUI) window.refreshDashboardUI();
        } else if (sum < targetTotal) {
            if (window.modalSys) {
                modalSys.showToast(`Te faltan $${targetTotal - sum} para alcanzar los $${targetTotal}. ¡Agrega más productos!`, 'warning', '💡');
            }
        } else {
            if (window.modalSys) {
                modalSys.showToast(`Te pasaste por $${sum - targetTotal}. Vacía la cesta e intenta nuevamente.`, 'error', '⚠️');
            }
        }
    };
}

// ----------------------------------------------------
// JUEGO 3: MISIÓN ESPACIAL MATEMÁTICA (DRAG & DROP)
// ----------------------------------------------------
window.startJuegoMisionEspacial = function() {
    if (window.startArena) startArena('🚀 Expedición Espacial Planetaria');

    let a = Math.floor(Math.random() * 7) + 3;
    let b = Math.floor(Math.random() * 8) + 2;
    let correct = a * b;

    const options = [correct, correct + 5, correct - 4, correct + 12].sort(() => Math.random() - 0.5);

    const area = document.getElementById('gameDynamicContent');
    area.innerHTML = `
        <div style="text-align:center;">
            <div class="target-question-box">🚀 Propulsa la nave resolviendo: ${a} × ${b} = ?</div>
            
            <div style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:30px; margin-top:20px;">
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <h5 style="color:var(--primary);">⛽ Tanques de Combustible:</h5>
                    <div style="display:flex; gap:12px;" id="fuelTanksContainer">
                        ${options.map(opt => `
                            <div class="drag-fuel-tank" draggable="true" data-value="${opt}"
                                 style="background:var(--pink-gradient); color:white; font-size:1.5rem; font-weight:800; padding:16px 24px; border-radius:var(--radius-md); cursor:grab; box-shadow:0 6px 16px rgba(236,72,153,0.3);">
                                ⛽ ${opt}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div id="spaceShipDropZone" style="background:#e0f2fe; border:4px dashed #38bdf8; border-radius:var(--radius-xl); padding:30px; width:260px; min-height:180px; text-align:center; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                    <div style="font-size:3.5rem;" class="anim-float">🚀</div>
                    <div style="font-weight:700; color:#0369a1; margin-top:10px;" id="shipDropText">¡Arrastra aquí el combustible correcto!</div>
                </div>
            </div>
        </div>
    `;

    setupDragAndDropEspacial(correct);
};

function setupDragAndDropEspacial(correct) {
    const tanks = document.querySelectorAll('.drag-fuel-tank');
    const dropZone = document.getElementById('spaceShipDropZone');
    const dropText = document.getElementById('shipDropText');

    tanks.forEach(tank => {
        tank.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', tank.getAttribute('data-value'));
            if (window.audio) audio.playClick();
        });
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.background = '#bae6fd';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.background = '#e0f2fe';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.background = '#e0f2fe';
        const val = parseInt(e.dataTransfer.getData('text/plain'));

        if (val === correct) {
            dropText.textContent = `✅ ¡DESPEGUE EXITOSO! (${val})`;
            stateMgr.completeMission('4-2', 140);
            if (window.modalSys) {
                modalSys.showSuccess('¡Despegue Exitoso! 🚀✨', `¡Excelente cálculo! La nave ha despegado al espacio. Misión completada.`);
            }
            if (window.refreshDashboardUI) window.refreshDashboardUI();
        } else {
            dropText.textContent = `❌ ¡Combustible equivocado! (${val})`;
            if (window.modalSys) {
                modalSys.showToast('El valor de combustible es incorrecto. ¡Inténtalo de nuevo!', 'error', '⚠️');
            }
        }
    });
}
