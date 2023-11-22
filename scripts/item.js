// 道具列表
const items = [
    {
        id: 1,
        name: '食物',
        type: 'consumable',
        probability: 0.5,
        description: '提供营养，恢复饥饿值。',
        lootable: true,
        properties: {
            hunger: 20,
        },
    },
    {
        id: 2,
        name: '水',
        type: 'consumable',
        probability: 0.3,
        description: '解渴的水，恢复口渴值。',
        lootable: true,
        properties: {
            thirst: 30,
        },
    },
    {
        id: 3,
        name: '厨房刀',
        type: 'weapon',
        probability: 0.3,
        description: '一把厨房刀。',
        lootable: false,
        properties: {
            attack: 10,
        },
    },
    {
        id: 4,
        name: '平底锅',
        type: 'armor',
        probability: 0.2,
        description: '锅，能炒菜。',
        lootable: false,
        properties: {
            defense: 5,
        },
    },
    {
        id: 5,
        name: '棒球棍',
        type: 'weapon',
        probability: 0.2,
        description: '棒球棍',
        lootable: false,
        properties: {
            attack: 5,
        },
    },
    {
        id: 6,
        name: '书包',
        type: 'accessory',
        probability: 0.2,
        description: '能装不少东西',
        lootable: false,
        properties: {
            playerStorage: 10,
        },
    },
    {
        id: 7,
        name: '敌敌畏',
        type: 'consumable',
        probability: 0.2,
        description: '啊？',
        lootable: false,
        properties: {
            health: -200,
        },
    },
    
    // 添加更多道具定义
];
