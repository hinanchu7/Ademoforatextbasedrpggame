// 地图
const areas = [
    {
        id: 1,
        name: '大厅',
        isLocked: false,
        loots: generateLoots(),
    },
    {
        id: 2,
        name: '群友房间',
        isLocked: true,
        loots: generateLoots(),
    }
]

// 进入区域函数

function enterArea(id) {
    const area = areas.find(area => area.id === id);

    if (area) {
        if (area.isLocked) {
            // 门锁住了
            printToLog('门锁住了。');
        } else {
            // 进入房间
            printToLog(`你进入了${area.name}。`);

            // 进一步处理你想要实现的逻辑，比如处理房间内的掉落物品等等
        }
    } else {
        console.error(`未找到id为${id}的区域。`);
    }
}
