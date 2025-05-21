import { gameState } from './gameState.js';

// Render main game interface
export function renderMainGame(container) {
    container.innerHTML = `
        <div class="game-scene">
            <div class="top-bar">
                <div class="resource-item">
                    <img src="./assets/coin_icon.png" alt="Монеты" class="resource-icon pixelated">
                    <span class="resource-value">${gameState.coins}</span>
                </div>
                <div class="resource-item">
                    <img src="./assets/popularity_icon.png" alt="Популярность" class="resource-icon pixelated">
                    <span class="resource-value">${gameState.popularity}%</span>
                </div>
                <button class="menu-button pixelated" onclick="openPopup('team')">
                    <img src="./assets/team_icon.png" alt="Состав" class="button-icon">
                    <span>Состав</span>
                </button>
                <button class="menu-button pixelated" onclick="openPopup('stadium')">
                    <img src="./assets/stadium_icon.png" alt="Стадион" class="button-icon">
                    <span>Стадион</span>
                </button>
                <button class="menu-button pixelated" onclick="openPopup('menu')">
                    <img src="./assets/menu_icon.png" alt="Меню" class="button-icon">
                    <span>Меню</span>
                </button>
            </div>
            <div class="game-content">
                <!-- Future game content will go here -->
            </div>
        </div>
    `;
}

// Popup handling
export function openPopup(type) {
    // Placeholder for popup functionality
    console.log(`Opening ${type} popup`);
}

// Update resource display
export function updateResources() {
    const coinsElement = document.querySelector('.resource-value:first-child');
    const popularityElement = document.querySelector('.resource-value:last-child');
    
    if (coinsElement) coinsElement.textContent = gameState.coins;
    if (popularityElement) popularityElement.textContent = `${gameState.popularity}%`;
} 