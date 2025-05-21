// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Story text array
const storyTexts = [
    "Ваш дедушка скончался, хоккей — был его самой главной страстью в жизни.",
    "Он оставил вам в наследство хоккейную коробку в далеком сибирском городе.",
    "И попросил вас сделать невозможное — вернуть хоккей туда, где от него остались только голые борта и память.",
    "Вы собрали семью — жену, детей — и отправились туда, в морозный, забытый город, чтобы исполнить последнюю просьбу дедушки."
];

// DOM Elements
const storyText = document.getElementById('storyText');
const skipButton = document.getElementById('skipButton');

// Game state
let currentTextIndex = 0;
let isTyping = false;
let typingTimeout = null;

// Expand Telegram WebApp
tg.expand();

// Check if story was already shown
const storyShown = sessionStorage.getItem('storyShown');

// Initialize game
function init() {
    if (storyShown) {
        goToMainGame();
    } else {
        startStory();
    }
}

// Start story sequence
function startStory() {
    skipButton.classList.add('hidden');
    showNextText();
}

// Typewriter effect
function typeWriter(text, element, callback) {
    let index = 0;
    isTyping = true;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            typingTimeout = setTimeout(type, 50); // Adjust typing speed here
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }
    
    element.textContent = '';
    type();
}

// Show next story text
function showNextText() {
    if (currentTextIndex < storyTexts.length) {
        typeWriter(storyTexts[currentTextIndex], storyText, () => {
            currentTextIndex++;
            if (currentTextIndex === 1) {
                skipButton.classList.remove('hidden');
            }
            if (currentTextIndex < storyTexts.length) {
                setTimeout(showNextText, 2000); // Delay between texts
            } else {
                setTimeout(completeStory, 3000); // Delay before completing story
            }
        });
    }
}

// Skip story
function skipStory() {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
    completeStory();
}

// Complete story and go to main game
function completeStory() {
    sessionStorage.setItem('storyShown', 'true');
    goToMainGame();
}

// Go to main game
function goToMainGame() {
    // For now, just show welcome message
    document.querySelector('.game-container').innerHTML = `
        <div class="story-screen">
            <div class="story-content">
                <div class="story-text">Добро пожаловать в игру</div>
            </div>
        </div>
    `;
}

// Event listeners
skipButton.addEventListener('click', skipStory);

// Start the game
init(); 