/* LÓGICA DE LOGIN Y REGISTRO - MIS TABLAS 4° BÁSICO */

document.addEventListener('DOMContentLoaded', () => {
    const studentNameInput = document.getElementById('studentNameInput');
    const avatarGrid = document.getElementById('avatarGrid');
    const btnEnter = document.getElementById('btnEnter');
    const toastMsg = document.getElementById('toastMsg');

    let selectedAvatar = 'buho';

    // Renderizar avatares
    function renderAvatars() {
        avatarGrid.innerHTML = '';
        AVATARS_LIST.forEach(av => {
            const card = document.createElement('div');
            card.className = `avatar-card ${av.id === selectedAvatar ? 'selected' : ''}`;
            card.setAttribute('data-id', av.id);
            card.innerHTML = `
                <div class="avatar-icon">${av.icon}</div>
                <div class="avatar-name">${av.name}</div>
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

    renderAvatars();

    // Si ya existe un perfil guardado, rellenar el nombre
    if (stateMgr.state.studentName) {
        studentNameInput.value = stateMgr.state.studentName;
        if (stateMgr.state.avatar) {
            selectedAvatar = stateMgr.state.avatar;
            renderAvatars();
        }
    }

    function showToast(msg) {
        toastMsg.textContent = msg;
        toastMsg.classList.add('show');
        if (window.audio) audio.playWrong();
        setTimeout(() => {
            toastMsg.classList.remove('show');
        }, 3000);
    }

    btnEnter.addEventListener('click', () => {
        const name = studentNameInput.value.trim();
        if (!name) {
            showToast('¡Por favor ingresa tu nombre para continuar! ✏️');
            studentNameInput.focus();
            return;
        }
        if (name.length < 2) {
            showToast('El nombre debe tener al menos 2 caracteres 😊');
            return;
        }

        if (window.audio) audio.playVictory();

        // Guardar estado y acceder al sistema
        stateMgr.setStudent(name, selectedAvatar);

        // Transición suave antes de redirigir
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
