import { gameState, saveGameState } from './gameState.js';
import { getActiveUpgrades } from './stadiumUpgrades.js';

// Render main game interface
export function renderMainGame(container) {
    updateGameScene();
    container.innerHTML = `
        <div class="game-scene" style="background-image: url('./assets/stage_${gameState.completedUpgrades.includes('fix_boards') ? '1' : '0'}.png')">
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

// Update game scene
function updateGameScene() {
    const gameScene = document.querySelector('.game-scene');
    if (gameScene) {
        gameScene.style.backgroundImage = `url('./assets/stage_${gameState.completedUpgrades.includes('fix_boards') ? '1' : '0'}.png')`;
    }
}

// Handle upgrade purchase
function handleUpgradePurchase(upgradeCard, upgrade) {
    if (gameState.coins < upgrade.price) {
        upgradeCard.classList.add('cannot-afford');
        setTimeout(() => upgradeCard.classList.remove('cannot-afford'), 500);
        return;
    }

    upgradeCard.classList.add('purchasing');
    
    // Update game state
    gameState.coins -= upgrade.price;
    upgrade.completed = true;
    if (!gameState.completedUpgrades.includes(upgrade.id)) {
        gameState.completedUpgrades.push(upgrade.id);
    }
    saveGameState();

    // Update UI
    updateResources();
    
    // Change background if fix_boards is purchased
    if (upgrade.id === 'fix_boards') {
        updateGameScene();
    }

    // Remove card after animation and reflow the list
    setTimeout(() => {
        upgradeCard.classList.add('completed');
        setTimeout(() => {
            // Re-render the upgrades list
            const upgradesList = document.querySelector('.upgrades-list');
            if (upgradesList) {
                const remainingUpgrades = getActiveUpgrades().filter(u => !u.completed);
                upgradesList.innerHTML = remainingUpgrades.map(upgrade => `
                    <div class="upgrade-card" data-id="${upgrade.id}">
                        <img src="${upgrade.icon}" alt="${upgrade.title}" class="upgrade-icon pixelated">
                        <div class="upgrade-info">
                            <div class="upgrade-title">${upgrade.title}</div>
                        </div>
                        <div class="upgrade-price">
                            <img src="./assets/coin_icon.png" alt="Монеты" class="price-icon">
                            <span class="price-value">${upgrade.price}</span>
                        </div>
                    </div>
                `).join('');

                // Reattach click handlers
                attachUpgradeHandlers(upgradesList);
            }
        }, 500);
    }, 500);
}

// Attach click handlers to upgrade cards
function attachUpgradeHandlers(container) {
    const upgradeCards = container.querySelectorAll('.upgrade-card:not(.completed)');
    upgradeCards.forEach(card => {
        card.addEventListener('click', () => {
            const upgradeId = card.dataset.id;
            const upgrade = getActiveUpgrades().find(u => u.id === upgradeId);
            if (upgrade && !upgrade.completed) {
                handleUpgradePurchase(card, upgrade);
            }
        });
    });
}

// Render stadium upgrades popup
function renderStadiumPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    
    const upgrades = getActiveUpgrades().filter(u => !u.completed);
    
    popup.innerHTML = `
        <div class="popup-container">
            <button class="close-button" onclick="closePopup()">&times;</button>
            <h2 class="popup-title">Улучшение стадиона</h2>
            <div class="upgrades-list">
                ${upgrades.map(upgrade => `
                    <div class="upgrade-card" data-id="${upgrade.id}">
                        <img src="${upgrade.icon}" alt="${upgrade.title}" class="upgrade-icon pixelated">
                        <div class="upgrade-info">
                            <div class="upgrade-title">${upgrade.title}</div>
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

    // Add click handlers for upgrade cards
    const upgradesList = popup.querySelector('.upgrades-list');
    attachUpgradeHandlers(upgradesList);
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
window.openPopup = openPopup;

// Update resource display
export function updateResources() {
    const coinsElements = document.querySelectorAll('.resource-value');
    const coinsElement = coinsElements[0];
    const popularityElement = coinsElements[1];
    
    if (coinsElement) coinsElement.textContent = gameState.coins;
    if (popularityElement) popularityElement.textContent = `${gameState.popularity}%`;
} 