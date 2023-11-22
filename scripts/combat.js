// 生成掉落奖励
function generateLoots() {
    const loots = [];

    // 从可拾取的物品中选择
    const lootableItems = items.filter(item => item.lootable === true);

    for (const item of lootableItems) {
        const quantity = Math.floor(Math.random() * 3); // 随机生成数量（0到2）
        loots.push({
            id: item.id,
            name: item.name,
            type: item.type,
            quantity: quantity,
        });
    }

    return loots;
}

// 敌人角色定义
const enemyCharacters = [
    {
        id: 1,
        name: '哥布林',
        description: '矮小的生物，喜欢袭击路人。',
        loots: generateLoots(),
        properties: {
            attack: 8,
            defense: 2,
        },
        probability: 0.5, // 生成概率为50%
    },
    {
        id: 2,
        name: '巨魔',
        description: '高大且强壮的怪物，擅长近身战斗。',
        loots: generateLoots(),
        properties: {
            attack: 15,
            defense: 5,
        },
        probability: 0.3, // 生成概率为30%
    },
    // 添加更多敌人定义...
];

// 生成敌人
function generateEnemies(param) {
    if (typeof param === 'number') {
        // 如果传入的是数字，则生成对应id的敌人
        const enemy = enemyCharacters.find(enemy => enemy.id === param);
        if (enemy) {
            return {
                id: enemy.id,
                name: enemy.name,
                description: enemy.description,
                loots: enemy.loots,
                properties: { ...enemy.properties },
            };
        } else {
            console.error(`未找到id为${param}的敌人。`);
            return null;
        }
    } else if (param === 'random') {
        // 如果传入的是字符串 'random'，则随机生成一个敌人
        const totalProbability = enemyCharacters.reduce((sum, enemy) => sum + enemy.probability, 0);
        const randomValue = Math.random() * totalProbability;
        let currentProbability = 0;

        for (const enemy of enemyCharacters) {
            currentProbability += enemy.probability;
            if (randomValue <= currentProbability) {
                return {
                    id: enemy.id,
                    name: enemy.name,
                    description: enemy.description,
                    loots: enemy.loots,
                    properties: { ...enemy.properties },
                };
            }
        }
        console.error('敌人生成失败。');
        return null;
    } else {
        console.error('无效的参数。');
        return null;
    }
}


// 初始化战斗
function initializeCombat(param) {
    // 第一步：生成怪物
    const enemy = generateEnemies(param);

    // 第二步：将玩家的属性（仅包括攻击和防御）传到 id 为 playerCombatStats 的 div 中显示
    const playerCombatStatsElement = document.getElementById('playerCombatStats');
    playerCombatStatsElement.textContent = `攻击：${playerStats.attack}，防御：${playerStats.defense}`;

    // 第三步：将怪物的属性传到 id 为 enemyCombatStats 的 div 中显示
    const enemyCombatStatsElement = document.getElementById('enemyCombatStats');
    enemyCombatStatsElement.textContent = `攻击：${enemy.properties.attack}，防御：${enemy.properties.defense}`;

    // 第四步：通过随机数决定玩家和怪物的先后手
    const isPlayerFirst = Math.random() < 0.5;

    // 如果玩家先手
    if (isPlayerFirst) {
        // 等待玩家选择动作
        // 这里可以添加代码来处理玩家选择动作的逻辑
    } else {
        // 如果敌人先手，则敌人先攻击，进行伤害判定
        performEnemyAttack(enemy);

        // 等待玩家选择动作
        // 这里可以添加代码来处理玩家选择动作的逻辑
    }
}

// 敌人攻击玩家
function performEnemyAttack(enemy) {
    // 这里可以添加代码来处理敌人攻击玩家的逻辑，例如计算伤害、更新玩家属性等
}
