/* LÓGICA DE SELECCIÓN DE HÉROE Y REGISTRO - MIS TABLAS 4° BÁSICO */

document.addEventListener('DOMContentLoaded', () => {
    const studentNameInput = document.getElementById('studentNameInput');
    const avatarGrid = document.getElementById('avatarGrid');
    const btnEnter = document.getElementById('btnEnter');

    let selectedAvatar = 'zorrito';

    // Renderizar avatares héroe en formato de tarjeta 3D con descripciones
    function renderHeroAvatars() {
        if (!avatarGrid) return;
        avatarGrid.innerHTML = '';
        AVATARS_LIST.forEach(av => {
            const card = document.createElement('div');
            card.className = `avatar-card ${av.id === selectedAvatar ? 'selected' : ''}`;
            card.setAttribute('data-id', av.id);
            card.style.padding = '14px 10px';
            card.innerHTML = `
                <div class="avatar-icon-container" style="width:70px; height:70px; margin:0 auto; display:flex; align-items:center; justify-content:center;">
                    <img src="${av.svg}" alt="${av.name}" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.15));" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <span style="display:none; font-size:3rem;">${av.icon}</span>
                </div>
                <div class="avatar-name" style="margin-top:8px; font-size:1.05rem; font-weight:800; color:${av.color};">${av.name}</div>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px; line-height:1.2;">${av.desc}</div>
            `;

            card.addEventListener('click', () => {
                if (window.audio) audio.playClick();
                selectedAvatar = av.id;
                document.querySelectorAll('.avatar-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            });
            avatarGrid.appendChild(card);
        });
    }

    renderHeroAvatars();

    if (stateMgr.state.studentName) {
        studentNameInput.value = stateMgr.state.studentName;
        if (stateMgr.state.avatar) {
            selectedAvatar = stateMgr.state.avatar;
            renderHeroAvatars();
        }
    }

    btnEnter.addEventListener('click', () => {
        const name = studentNameInput.value.trim();
        if (!name) {
            if (window.modalSys) {
                modalSys.showToast('✏️ ¡Por favor ingresa el nombre de tu héroe para comenzar!', 'warning', '⚠️');
            }
            studentNameInput.focus();
            return;
        }
        if (name.length < 2) {
            if (window.modalSys) {
                modalSys.showToast('😊 El nombre debe tener al menos 2 letras.', 'info', '💡');
            }
            return;
        }

        if (window.audio) audio.playVictory();

        stateMgr.setStudent(name, selectedAvatar);

        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.4s ease';

        setTimeout(() => {
            window.location.href = 'Sistema/index.html';
        }, 400);
    });

    studentNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnEnter.click();
        }
    });
});
