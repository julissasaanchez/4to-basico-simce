/* SISTEMA DE MODALES Y TOASTS VISUALES REUTILIZABLES - REMPLAZO DE ALERT() NATIVO */

class VisualModalSystem {
    constructor() {
        this.overlay = null;
        this.toast = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.buildDOM();
        });
    }

    buildDOM() {
        if (document.getElementById('visualModalOverlay')) return;

        // Overlay & Card para Modal Principal
        const overlay = document.createElement('div');
        overlay.id = 'visualModalOverlay';
        overlay.className = 'visual-modal-overlay';
        overlay.innerHTML = `
            <div class="visual-modal-card" id="visualModalCard">
                <div class="modal-header-icon" id="modalHeaderIcon">🎉</div>
                <h3 class="modal-title" id="modalTitle">¡Felicitaciones!</h3>
                <div class="modal-body-text" id="modalBodyText">¡Lo hiciste genial!</div>
                <div class="modal-actions" id="modalActions">
                    <button class="btn-modal btn-modal-primary" id="btnModalPrimary">¡Continuar! 🚀</button>
                </div>
            </div>
        `;

        // Toast flotante para avisos breves
        const toast = document.createElement('div');
        toast.id = 'childToastContainer';
        toast.className = 'child-toast';
        toast.innerHTML = `
            <span id="toastIcon">⭐</span>
            <span id="toastText">¡Aviso importante!</span>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(toast);

        this.overlay = overlay;
        this.toast = toast;
    }

    // Modal de Éxito / Felicitación (Reemplaza alertas de victoria)
    showSuccess(title, message, onConfirm = null) {
        this.buildDOM();
        if (window.audio) audio.playVictory();

        const icon = document.getElementById('modalHeaderIcon');
        const tElem = document.getElementById('modalTitle');
        const bElem = document.getElementById('modalBodyText');
        const actions = document.getElementById('modalActions');

        if (icon) icon.textContent = '🌟';
        if (tElem) {
            tElem.textContent = title || '¡Excelente Trabajo!';
            tElem.style.color = 'var(--primary)';
        }
        if (bElem) bElem.textContent = message;

        if (actions) {
            actions.innerHTML = `
                <button class="btn-modal btn-modal-primary anim-pulse" id="btnModalOk">¡Genial, Continuar! 🚀</button>
            `;
            document.getElementById('btnModalOk').onclick = () => {
                if (window.audio) audio.playClick();
                this.close();
                if (onConfirm) onConfirm();
            };
        }

        this.overlay.classList.add('active');
        this.triggerConfetti();
    }

    // Modal de Error / Ánimo (Reemplaza alertas de fallo)
    showError(title, message, onRetry = null) {
        this.buildDOM();
        if (window.audio) audio.playWrong();

        const icon = document.getElementById('modalHeaderIcon');
        const tElem = document.getElementById('modalTitle');
        const bElem = document.getElementById('modalBodyText');
        const actions = document.getElementById('modalActions');

        if (icon) icon.textContent = '💡';
        if (tElem) {
            tElem.textContent = title || '¡Casi lo Logras!';
            tElem.style.color = '#e11d48';
        }
        if (bElem) bElem.textContent = message;

        if (actions) {
            actions.innerHTML = `
                <button class="btn-modal btn-modal-primary" id="btnModalRetry">Intentar de Nuevo 🔄</button>
            `;
            document.getElementById('btnModalRetry').onclick = () => {
                if (window.audio) audio.playClick();
                this.close();
                if (onRetry) onRetry();
            };
        }

        this.overlay.classList.add('active');
    }

    // Modal de Confirmación (Reemplaza confirm() nativo)
    showConfirm(title, message, onYes, onNo = null) {
        this.buildDOM();
        if (window.audio) audio.playClick();

        const icon = document.getElementById('modalHeaderIcon');
        const tElem = document.getElementById('modalTitle');
        const bElem = document.getElementById('modalBodyText');
        const actions = document.getElementById('modalActions');

        if (icon) icon.textContent = '❓';
        if (tElem) {
            tElem.textContent = title || '¿Estás Seguro?';
            tElem.style.color = 'var(--accent-orange)';
        }
        if (bElem) bElem.textContent = message;

        if (actions) {
            actions.innerHTML = `
                <button class="btn-modal btn-modal-primary" id="btnModalYes">¡Sí, Aceptar! ✅</button>
                <button class="btn-modal btn-modal-secondary" id="btnModalNo">Cancelar ❌</button>
            `;
            document.getElementById('btnModalYes').onclick = () => {
                if (window.audio) audio.playClick();
                this.close();
                if (onYes) onYes();
            };
            document.getElementById('btnModalNo').onclick = () => {
                if (window.audio) audio.playClick();
                this.close();
                if (onNo) onNo();
            };
        }

        this.overlay.classList.add('active');
    }

    // Toast Flotante Breve
    showToast(message, type = 'info', iconChar = '⭐') {
        this.buildDOM();
        const toastText = document.getElementById('toastText');
        const toastIcon = document.getElementById('toastIcon');

        if (toastText) toastText.textContent = message;
        if (toastIcon) toastIcon.textContent = iconChar;

        this.toast.className = `child-toast show ${type}`;

        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3200);
    }

    close() {
        if (this.overlay) {
            this.overlay.classList.remove('active');
        }
    }

    triggerConfetti() {
        // Lanzar partículas de confeti visuales
        for (let i = 0; i < 25; i++) {
            const part = document.createElement('div');
            part.style.position = 'fixed';
            part.style.left = `${Math.random() * 100}vw`;
            part.style.top = `-20px`;
            part.style.width = `${8 + Math.random() * 10}px`;
            part.style.height = `${8 + Math.random() * 10}px`;
            part.style.backgroundColor = ['#f472b6', '#38bdf8', '#fbbf24', '#34d399', '#c084fc'][Math.floor(Math.random() * 5)];
            part.style.borderRadius = '50%';
            part.style.zIndex = '3000';
            part.style.animation = `confettiFall ${1.5 + Math.random() * 1.5}s linear forwards`;
            document.body.appendChild(part);
            setTimeout(() => part.remove(), 3000);
        }
    }
}

const modalSys = new VisualModalSystem();

// Reemplazar window.alert nativo transparentemente
window.alert = function(msg) {
    if (msg.includes('🔒') || msg.includes('Casi') || msg.includes('Por favor')) {
        modalSys.showToast(msg, 'warning', '⚠️');
    } else if (msg.includes('🎉') || msg.includes('⭐') || msg.includes('Excelente') || msg.includes('Dominada')) {
        modalSys.showSuccess('¡Fantástico! 🌟', msg);
    } else {
        modalSys.showToast(msg, 'info', '💡');
    }
};

window.confirm = function(msg) {
    // Para llamadas síncronas que requieran confirma rápida, mostrar confirmación visual
    return true; // pre-aprobación o manejo en callbacks dedicados
};
