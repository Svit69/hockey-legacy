import { gameState } from './gameState.js';
import { getActiveUpgrades } from './stadiumUpgrades.js';

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
            </div>
            <div class="game-content">
                <!-- Future game content will go here -->
            </div>
        </div>
    `;
}

// Render stadium upgrades popup
function renderStadiumPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    
    const upgrades = getActiveUpgrades();
    
    popup.innerHTML = `
        <div class="popup-container">
            <button class="close-button" onclick="closePopup()">&times;</button>
            <h2 class="popup-title">Улучшение стадиона</h2>
            <div class="upgrades-list">
                ${upgrades.map(upgrade => `
                    <div class="upgrade-card ${upgrade.completed ? 'completed' : ''}" data-id="${upgrade.id}">
                        <img src="${upgrade.icon}" alt="${upgrade.title}" class="upgrade-icon pixelated">
                        <div class="upgrade-info">
                            <div class="upgrade-title">${upgrade.title}</div>
                            <div class="upgrade-description">${upgrade.description}</div>
                        </div>
                        <div class="upgrade-price">
                            <img src="./assets/coin_icon.png" alt="Монеты" class="price-icon">
                            <span class="price-value">${upgrade.price}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
}

// Popup handling
export function openPopup(type) {
    if (type === 'stadium') {
        renderStadiumPopup();
    } else {
        console.log(`Opening ${type} popup`);
    }
}

// Close popup
export function closePopup() {
    const popup = document.querySelector('.popup-overlay');
    if (popup) {
        popup.remove();
    }
}

// Make closePopup available globally
window.closePopup = closePopup;

// Update resource display
export function updateResources() {
    const coinsElement = document.querySelector('.resource-value:first-child');
    const popularityElement = document.querySelector('.resource-value:last-child');
    
    if (coinsElement) coinsElement.textContent = gameState.coins;
    if (popularityElement) popularityElement.textContent = `${gameState.popularity}%`;
} 