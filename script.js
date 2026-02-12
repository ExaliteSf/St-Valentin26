/* ======================
   Configuration
   ====================== */

// Texte pour l'effet machine à écrire
const typewriterMessage = "Depuis le jour où je t'ai rencontrée…";

// Liste des raisons d'amour
const loveReasons = [
    "❤️ Ton humour",
    "❤️ Ta façon de me regarder",
    "❤️ Nos délires",
    "❤️ Ta beauté",
    "❤️ Ta gentillesse",
    "❤️ Ton coté fou du bus",
    "❤️ Ta mini tête de mini nain",
    "❤️ Tes petits zoomies"
];

let currentReasonIndex = 0;

const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const openBtn = document.getElementById('open-btn');
const typewriterText = document.getElementById('typewriter-text');
const interactiveSection = document.getElementById('interactive-section');
const revealBtn = document.getElementById('reveal-btn');
const reasonsList = document.getElementById('reasons-list');
const finalSection = document.getElementById('final-section');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const loveMessage = document.getElementById('love-message');
const heartsContainer = document.getElementById('hearts-container');
const footer = document.getElementById('footer');

function typeWriter(text, element, speed = 80) {
    let i = 0;
    element.textContent = '';
    
    return new Promise((resolve) => {
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.add('finished');
                resolve();
            }
        }
        type();
    });
}
function switchScreen(hideScreen, showScreen) {
    hideScreen.classList.remove('active');
    setTimeout(() => {
        showScreen.classList.add('active');
    }, 800);
}

function showReason() {
    if (currentReasonIndex < loveReasons.length) {
        const reasonItem = document.createElement('div');
        reasonItem.className = 'reason-item';
        reasonItem.textContent = loveReasons[currentReasonIndex];
        reasonItem.style.animationDelay = '0.1s';
        reasonsList.appendChild(reasonItem);
        
        currentReasonIndex++;
        if (currentReasonIndex >= loveReasons.length) {
            setTimeout(() => {
                revealBtn.style.opacity = '0';
                setTimeout(() => {
                    revealBtn.style.display = 'none';
                    showFinalSection();
                }, 300);
            }, 800);
        }
    }
}

function showFinalSection() {
    setTimeout(() => {
        finalSection.classList.remove('hidden');
        footer.classList.remove('hidden');
        footer.classList.add('visible');
    }, 500);
}

function moveNoButton(event) {
    event.preventDefault();
    
    const container = finalSection;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();
    const maxX = containerRect.width - buttonRect.width - 20;
    const maxY = containerRect.height - buttonRect.height - 20;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function createFallingHearts() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    const numberOfHearts = 30;
    
    for (let i = 0; i < numberOfHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            const duration = 3 + Math.random() * 2;
            heart.style.animationDuration = duration + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            
            heartsContainer.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, (duration + 2) * 1000);
        }, i * 100);
    }
}

function handleYesResponse() {
    finalSection.classList.add('hidden');
    
    setTimeout(() => {
        loveMessage.classList.remove('hidden');
        createFallingHearts();
    }, 300);
}

openBtn.addEventListener('click', async () => {
    switchScreen(welcomeScreen, mainContent);
    setTimeout(async () => {
        // Démarrer l'effet machine à écrire
        await typeWriter(typewriterMessage, typewriterText, 80);
        setTimeout(() => {
            interactiveSection.classList.remove('hidden');
        }, 1000);
    }, 800);
});

revealBtn.addEventListener('click', () => {
    showReason();
});
yesBtn.addEventListener('click', () => {
    handleYesResponse();
});

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton(e);
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('💕 Site prêt !');
});

document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);