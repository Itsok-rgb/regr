// Configuration - Customize these!
const CONFIG = {
    relationshipStartDate: new Date(2023, 0, 14),

    // Memories WITH image or GIF assets
    memories: [
        { icon: '☕', title: 'First Date', description: 'That coffee shop where it all began', image: 'assets/images/first-date.jpg' },
        { icon: '🎬', title: 'Movie Night', description: 'When we watched our favorite film together', image: 'assets/images/movie-night.jpg' },
        { icon: '🌅', title: 'Beach Sunset', description: 'Watching the sunset by the ocean', image: 'assets/images/beach-sunset.jpg' },
        { icon: '🎂', title: 'Birthday Surprise', description: 'The cake that made you smile', image: 'assets/images/birthday.jpg' },
        { icon: '✈️', title: 'Adventure Trip', description: 'Our unforgettable journey together', image: 'assets/images/trip.jpg' },
        { icon: '🎵', title: 'Concert', description: 'Dancing to our favorite songs', image: 'assets/images/concert.jpg' }
    ],

    // GIF assets (external)
    gifYes: 'https://media.tenor.com/3Z0PzEp1-qoAAAAC/yes.gif',
    gifNo: 'https://media.tenor.com/8h66AntqQwMAAAAC/sorry.gif'
};

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    createFloatingHearts();
    generateMemoryCards();
    startCounter();
});

// -------------------- SCREEN NAVIGATION --------------------
function startProposal() {
    showNextScreen('memoryScreen');
}

function showNextScreen(nextId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const nextScreen = document.getElementById(nextId);
    if (nextScreen) nextScreen.classList.add('active');
}

// -------------------- FLOATING HEARTS --------------------
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💞'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';

        container.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }, 300);
}

// -------------------- MEMORY CARDS WITH IMAGES --------------------
function generateMemoryCards() {
    const memoryCards = document.getElementById('memoryCards');
    memoryCards.innerHTML = '';

    CONFIG.memories.forEach((memory, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card animate-in';
        card.style.animationDelay = `${index * 0.2}s`;

        card.innerHTML = `
            <img src="${memory.image}" alt="${memory.title}" class="memory-image">
            <div class="memory-icon">${memory.icon}</div>
            <h3>${memory.title}</h3>
            <p>${memory.description}</p>
        `;

        memoryCards.appendChild(card);
    });
}

// -------------------- TIME COUNTER --------------------
function startCounter() {
    function updateCounter() {
        const now = new Date();
        const diff = now - CONFIG.relationshipStartDate;

        document.getElementById('daysCounter').textContent =
            Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hoursCounter').textContent =
            Math.floor((diff / (1000 * 60 * 60)) % 24);
        document.getElementById('minutesCounter').textContent =
            Math.floor((diff / (1000 * 60)) % 60);
        document.getElementById('secondsCounter').textContent =
            Math.floor((diff / 1000) % 60);
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}

// -------------------- PROPOSAL BUTTONS --------------------
function handleYes() {
    showNextScreen('successScreen');
    showGif('yes');
}

function handleNo() {
    showGif('no');
    alert("Oops — try again! 😄");
}

function moveNoButton() {
    const btn = document.getElementById('noBtn');
    btn.style.position = 'absolute';
    btn.style.left = Math.random() * (window.innerWidth - btn.offsetWidth) + 'px';
    btn.style.top = Math.random() * (window.innerHeight - btn.offsetHeight) + 'px';
}

// -------------------- SHOW GIF --------------------
function showGif(type) {
    // Remove any old GIF
    document.querySelectorAll('.temp-gif').forEach(el => el.remove());

    const gifUrl = (type === 'yes') ? CONFIG.gifYes : CONFIG.gifNo;

    const img = document.createElement('img');
    img.src = gifUrl;
    img.className = 'temp-gif';
    img.style.position = 'fixed';
    img.style.top = '50%';
    img.style.left = '50%';
    img.style.transform = 'translate(-50%, -50%)';
    img.style.maxWidth = '300px';
    img.style.zIndex = '9999';

    document.body.appendChild(img);

    // Auto‑hide after 2.5 seconds
    setTimeout(() => {
        img.remove();
    }, 2500);
}
