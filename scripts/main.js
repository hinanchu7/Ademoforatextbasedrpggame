const player = {
    health: 100,
    sanity: 100,
    hunger: 100,
    thirst: 100,
    fatigue: 100,
    infection: 100,
    inventory: [],
    location: "404室（家）",
    equipment: null,
    weapon: null,
    armor: null,
};


const gameTime = {
    days: 1,
    hours: 8,
    minutes: 30,
}

// update
function update() {
    updateTime();
}
// 更新游戏时间          --------------
// 更新显示函数
function updateDisplay() {
    // 更新日期显示
    const gameDateElement = document.getElementById("gameDate");
    gameDateElement.textContent = "Day " + gameTime.days;

    // 更新时间显示
    const gameTimeElement = document.getElementById("gameTime");
    gameTimeElement.textContent = `${formatTime(gameTime.hours)}:${formatTime(gameTime.minutes)}`;

    // 更新玩家位置
    const playerLocationElement = document.getElementById("player-location");
    playerLocationElement.textContent = "你的位置：" + player.location;
}

// 格式化时间函数，确保显示两位数
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function updateTime(addDays, addHours, addMinutes) {
    // 添加时间
    gameTime.minutes += addMinutes;
    gameTime.hours += addHours;
    gameTime.days += addDays;
    const totalMinutes = updateTime.addDays * 1440 + updateTime.addHours * 60 + updateTime.minutes;

    // 处理分钟溢出
    if (gameTime.minutes >= 60) {
        gameTime.minutes -= 60;
        gameTime.hours += 1;
    }

    // 处理小时溢出
    if (gameTime.hours >= 24) {
        gameTime.hours -= 24;
        gameTime.days += 1;
    }
    updateDisplay();
}


// 判定玩家输入的指令

document.addEventListener("DOMContentLoaded", function () {
    // 监听输入框的回车键事件
    document.getElementById("input-box").addEventListener("keyup", function (event) {
        // 判断按下的键是否是回车键
        if (event.key === "Enter") {
            // 获取输入框的值
            const playerInput = document.getElementById("input-box").value;

            // 清空输入框
            document.getElementById("input-box").value = "";

            // 调用处理玩家输入的函数
            checkInput(playerInput);
        }
    });

    // 示例处理玩家输入的函数
    function checkInput(input) {
        // 根据玩家输入执行相应的动作
        if (input.toLowerCase() === "sleep") {
            actionSleep();
        }
        else if (input.toLowerCase() === "test") {
            actionTest();
        }
        else
            printLog("指令不对捏，请重新输入。")
    }

    // 新的函数，用于将内容打印到日志中
    function printLog(content) {
        const logContainer = document.getElementById("log");

        // 创建日志条目元素
        const logEntry = document.createElement("div");
        logEntry.textContent = content;
        logEntry.classList.add("log-entry", "new"); // 添加样式类

        // 将新条目添加到日志容器
        logContainer.appendChild(logEntry);

        // 限制日志条目数量
        const logEntries = logContainer.getElementsByClassName("log-entry");
        if (logEntries.length > 9) {
            logContainer.removeChild(logEntries[0]);
        }

        // 更新旧条目样式
        for (let i = 0; i < logEntries.length - 1; i++) {
            logEntries[i].classList.remove("new");
            logEntries[i].classList.add("old");
        }
    }

    // 新的动作函数，用于恢复玩家的疲劳
    function actionSleep() {
        if (player.fatigue < 30) {
            // Generate a random fatigue increase between 60 and 80
            const fatigueIncrease = Math.floor(Math.random() * (80 - 60 + 1)) + 60;
    
            // Update the log
            printLog("你睡得很好，精力恢复了不少。");
    
            // Update the game time
            updateTime(0, 8, 0);
    
            // Update player fatigue
            player.fatigue += fatigueIncrease;
    
            console.log("玩家疲劳增加：" + fatigueIncrease);
        } else {
            // If fatigue is not below 30, inform the player
            printLog("你太精神了，不想睡觉。");
        }
    }

    function actionTest() {
        updateTime(0, 24, 0);
    }
});

