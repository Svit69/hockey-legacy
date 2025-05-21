// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

import { gameState, loadGameState, saveGameState } from './js/gameState.js';
import { storyTexts, showNextText, skipStory, resetStory } from './js/story.js';
import { renderMainGame, openPopup, updateResources } from './js/ui.js';

// DOM Elements
const storyText = document.getElementById('storyText');
const skipButton = document.getElementById('skipButton');
const gameContainer = document.querySelector('.game-container');

// Initialize game
function init() {
    // Expand Telegram WebApp
    tg.expand();
    
    // Load saved game state
    loadGameState();
    
    // Check if story was already shown
    const storyShown = sessionStorage.getItem('storyShown');
    
    if (storyShown) {
        goToMainGame();
    } else {
        startStory();
    }
}

// Start story sequence
function startStory() {
    skipButton.classList.add('hidden');
    showNextText(storyText, skipButton, completeStory);
}

// Complete story and go to main game
function completeStory() {
    sessionStorage.setItem('storyShown', 'true');
    resetStory();
    goToMainGame();
}

// Go to main game
function goToMainGame() {
    renderMainGame(gameContainer);
    // Make openPopup available globally
    window.openPopup = openPopup;
}

// Event listeners
skipButton.addEventListener('click', () => {
    skipStory();
    completeStory();
});

// Start the game
init(); 