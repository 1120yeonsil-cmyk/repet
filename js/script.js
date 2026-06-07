let petMemories = JSON.parse(localStorage.getItem('petMemories')) || [];

const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const memoryContainer = document.getElementById('memoryContainer');
const feedBtn = document.getElementById('feedBtn');
const bathBtn = document.getElementById('bathBtn');
const messageBtn = document.getElementById('messageBtn');

// 사진 업로드 미리보기
photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            photoPreview.src = event.target.result;
            photoPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// 추억 생성
generateBtn.addEventListener('click', () => {
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
        showNotification('추억을 입력해주세요!');
        return;
    }
    
    if (!photoPreview.src) {
        showNotification('사진을 업로드해주세요!');
        return;
    }
    
    const memory = {
        id: Date.now(),
        photo: photoPreview.src,
        prompt: prompt,
        createdAt: new Date().toLocaleString('ko-KR')
    };
    
    petMemories.unshift(memory);
    localStorage.setItem('petMemories', JSON.stringify(petMemories));
    
    photoInput.value = '';
    photoPreview.src = '';
    photoPreview.style.display = 'none';
    promptInput.value = '';
    
    renderMemories();
    showNotification('✨ 추억이 저장되었습니다!');
});

// 추억 표시
function renderMemories() {
    if (petMemories.length === 0) {
        memoryContainer.innerHTML = '<p>아직 저장된 추억이 없습니다. 소중한 순간을 기록해주세요!</p>';
        return;
    }
    
    memoryContainer.innerHTML = petMemories.map(memory => `
        <div class="memory-card">
            <img src="${memory.photo}" alt="추억">
            <p>${memory.prompt}</p>
            <p class="memory-timestamp">${memory.createdAt}</p>
            <button onclick="deleteMemory(${memory.id})">🗑️ 삭제</button>
        </div>
    `).join('');
}

// 추억 삭제
function deleteMemory(id) {
    petMemories = petMemories.filter(m => m.id !== id);
    localStorage.setItem('petMemories', JSON.stringify(petMemories));
    renderMemories();
    showNotification('추억이 삭제되었습니다.');
}

// 돌보기 기능
feedBtn.addEventListener('click', () => {
    showNotification('🍖 반려동물에게 맛있는 밥을 주었습니다!');
});

bathBtn.addEventListener('click', () => {
    showNotification('🛁 반려동물을 깨끗하게 씻겨주었습니다!');
});

messageBtn.addEventListener('click', () => {
    const message = prompt('💬 응원 메시지를 입력하세요:');
    if (message) {
        showNotification(`💬 "${message}" - 반려동물이 들었습니다!`);
    }
});

// 알림 표시
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 초기 렌더링
renderMemories();
