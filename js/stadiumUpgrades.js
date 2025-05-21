export const stadiumUpgrades = {
    // Активные улучшения
    active: [
        {
            id: 'fix_boards',
            title: 'Починить деревянные борта',
            description: 'Старые борта прогнили и требуют срочного ремонта. Без этого играть опасно.',
            icon: './assets/fix_boards_icon.png',
            price: 400,
            completed: false
        },
        {
            id: 'build_roof',
            title: 'Сделать навес над трибуной',
            description: 'Зрителям некомфортно смотреть матчи под снегом. Навес защитит их от непогоды.',
            icon: './assets/build_roof_icon.png',
            price: 400,
            completed: false
        },
        {
            id: 'clean_parking',
            title: 'Почистить парковку от снега',
            description: 'Заваленная снегом парковка отпугивает зрителей. Нужно организовать уборку.',
            icon: './assets/clean_parking_icon.png',
            price: 100,
            completed: false
        }
    ],
    // Заблокированные улучшения (будут открываться по мере прогресса)
    locked: [
        {
            id: 'install_lights',
            title: 'Установить освещение',
            description: 'Вечерние матчи привлекут больше зрителей',
            icon: './assets/lights_icon.png',
            price: 5000,
            requirements: ['fix_boards', 'build_roof']
        },
        // Другие улучшения можно добавить позже
    ]
};

// Функция для проверки доступности улучшения
export function isUpgradeAvailable(upgradeId, completedUpgrades) {
    const upgrade = [...stadiumUpgrades.active, ...stadiumUpgrades.locked]
        .find(u => u.id === upgradeId);
    
    if (!upgrade) return false;
    if (!upgrade.requirements) return true;
    
    return upgrade.requirements.every(reqId => completedUpgrades.includes(reqId));
}

// Функция для получения всех активных улучшений
export function getActiveUpgrades() {
    return stadiumUpgrades.active;
} 