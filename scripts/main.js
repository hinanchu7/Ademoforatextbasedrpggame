// 初始设置

const gameTime = {
    days: 1,
    hours: 8,
    minutes: 30,
}

const playerStats = {
    health: 100,
    sanity: 100,
    hunger: 100,
    thirst: 100,
    fatigue: 100,
    attack: 10,
    defense: 5,
    inventory: [],
    equipment: null,
    weapon: null,
    armor: null,
}

const updateAttributes = ['health', 'sanity', 'hunger', 'thirst', 'fatigue'];

// 更新游戏时间

function updateGameTime() {
    if (gameTime.minutes >= 60) {
        gameTime.minutes = 0;
        gameTime.hours++;

    if (gameTime.hours >= 24) {
        gameTime.hours = 0;
        gameTime.days++;
    }
}
    const gameTimeElement = document.getElementById('gameTime');
    gameTimeElement.textContent = `第${gameTime.days}天，${String(gameTime.hours).padStart(2, '0')}:${gameTime.minutes}`;
    
}

// 更新玩家状态栏

function updateStatBar() {
    // 迭代要更新的属性数组
    updateAttributes.forEach(function(statName) {
        // 获取对应的属性条和容器元素
        var statBarContainer = document.getElementById(statName + "Bar");
        var statBar = document.getElementById(statName);

        // 获取对应属性的当前值和最大值
        var currentValue = playerStats[statName];
        var maxValue = 100;  // 假设所有属性的最大值都是100，可以根据实际情况调整

        // 计算新的宽度
        var newWidth = (currentValue / maxValue) * 100;

        // 应用新的宽度并触发动画
        statBar.style.width = newWidth + "%";
    });
}

// 更新玩家信息

function updatePlayerStats() {
    // 获取属性显示元素
    const weaponElement = document.getElementById('weapon');
    const armorElement = document.getElementById('armor');
    const accessoryElement = document.getElementById('accessory');

    // 更新血量条
    updateStatBar();

    // 如果有武器、防具和道具，显示它们的名称
    weaponElement.textContent = `武器：${playerStats.weapon ? playerStats.weapon.name : '无'}`;
    armorElement.textContent = `防具：${playerStats.armor ? playerStats.armor.name : '无'}`;
    accessoryElement.textContent = `道具：${playerStats.accessory ? playerStats.accessory.name : '无'}`;
}

// 判断游戏是否获胜或失败
function checkGameStatus() {
    if (gameTime.days > 30 && playerStats.sanity > 40 && playerStats.health > 0) {
        alert("恭喜，你存活了30天并保持了理智，获得胜利！");
        location.reload();
        resetGameData();
        // 在此可以触发游戏胜利的相关逻辑
    } else if (playerStats.health <= 0 || playerStats.sanity < 20) {
        alert('宁嘎了捏');
        location.reload();
        resetGameData();
    }
}

// 增加游戏时间的函数
function addTime(minutes, hours, days) {
    gameTime.minutes += minutes;
    gameTime.hours += hours;
    gameTime.days += days;

    // 处理时间溢出
    if (gameTime.minutes >= 60) {
        gameTime.hours += Math.floor(gameTime.minutes / 60);
        gameTime.minutes %= 60;
    }

    if (gameTime.hours >= 24) {
        gameTime.days += Math.floor(gameTime.hours / 24);
        gameTime.hours %= 24;
    }

    // 更新显示
    updateGameTime();
    checkGameStatus();
    updateInventory();
    updatePlayerStats();
}

// 重置游戏数据到默认值
function resetGameData() {
    gameTime.days = 1;
    gameTime.hours = 8;
    gameTime.minutes = 30;

    playerStats.health = 100;
    playerStats.sanity = 100;
    playerStats.hunger = 100;
    playerStats.thirst = 100;
    playerStats.fatigue = 100;
    playerStats.attack = 10;
    playerStats.defense = 5;
    playerStats.inventory = [];
    playerStats.equipment = null;
    playerStats.weapon = null;
    playerStats.armor = null;

    // 可根据需要继续添加其他属性的重置

    // 更新显示
    updateGameTime();
    updatePlayerStats();
    updateInventory();
}


// test

function test(stats) {
    // 随机选择一个属性名
    var statNames = Object.keys(stats);
    var randomStatIndex = Math.floor(Math.random() * statNames.length);
    var randomStatName = statNames[randomStatIndex];

    // 将选中属性的值减少10
    if (typeof stats[randomStatName] === 'number') {
        stats[randomStatName] -= 10;
        console.log("Test: Decreased", randomStatName, "by 10. New value:", stats[randomStatName]);
    } else {
        console.log("Test: Skipped", randomStatName, "because it is not a number.");
    }
    updatePlayerStats();
}