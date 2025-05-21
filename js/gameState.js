// Game state management
export const gameState = {
    coins: 1000,
    popularity: 50,
    completedUpgrades: []
};

// Save game state to localStorage
export function saveGameState() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Load game state from localStorage
export function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        Object.assign(gameState, JSON.parse(savedState));
    }
}

// Update game state after upgrade purchase
export function updateAfterPurchase(upgradeId) {
    if (!gameState.completedUpgrades.includes(upgradeId)) {
        gameState.completedUpgrades.push(upgradeId);
    }
    saveGameState();
} 