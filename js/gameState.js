// Game state management
export const gameState = {
    coins: 1000,
    popularity: 50
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