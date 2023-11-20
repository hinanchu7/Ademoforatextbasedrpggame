// 添加物品到库存
function addItem(itemId, quantity) {
    // 找到对应的道具定义
    const itemDefinition = items.find(item => item.id === itemId);

    if (itemDefinition) {
        // 检查是否已经有该物品，有则增加数量，否则添加新物品
        const existingItem = playerStats.inventory.find(item => item.id === itemId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            playerStats.inventory.push({
                id: itemId,
                name: itemDefinition.name,
                type: itemDefinition.type,
                quantity: quantity,
            });
        }
    } else {
        console.error(`未找到id为${itemId}的物品定义。`);
    }

    // 更新显示
    checkGameStatus();
    updateGameTime();
    updateInventory();
}

// 删除库存物品

function removeItem(itemId, quantity) {
    // 找到对应的道具定义
    const itemDefinition = items.find(item => item.id === itemId);

    if (itemDefinition) {
        // 找到库存中的该物品
        const existingItem = playerStats.inventory.find(item => item.id === itemId);

        if (existingItem) {
            // 减少数量
            existingItem.quantity -= quantity;

            // 如果数量归零，则从库存中移除
            if (existingItem.quantity === 0) {
                const itemIndex = playerStats.inventory.findIndex(item => item.id === itemId);
                playerStats.inventory.splice(itemIndex, 1);
            }
            // 更新显示
            updateInventory();

        } else {
            console.error(`玩家没有id为${itemId}的物品。`);
        }
    } else {
        console.error(`未找到id为${itemId}的物品定义。`);
    }

    // 更新显示
    checkGameStatus();
    updateGameTime();
    updateInventory();
}

// 更新库存显示
function updateInventory() {
    const inventoryContentElement = document.getElementById('inventoryContent');
    inventoryContentElement.innerHTML = ''; // 清空原有内容

    // 遍历库存中的物品，显示名称和数量
    for (const item of playerStats.inventory) {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} * ${item.quantity}`;
        inventoryContentElement.appendChild(itemElement);
    }
}

// 消耗物品
function consumeItem(itemId, quantity) {
    // 找到对应的道具定义
    const itemDefinition = items.find(item => item.id === itemId);

    if (itemDefinition) {
        // 判定物品类型是否为 consumable
        if (itemDefinition.type === 'consumable') {
            // 找到库存中的该物品
            const existingItem = playerStats.inventory.find(item => item.id === itemId);

            if (existingItem) {
                // 判定库存中数量是否足够
                if (existingItem.quantity >= quantity) {
                    // 减少数量
                    existingItem.quantity -= quantity;

                    // 根据物品定义的属性效果，修改相应的玩家属性
                    for (const property in itemDefinition.properties) {
                        if (playerStats.hasOwnProperty(property)) {
                            playerStats[property] += itemDefinition.properties[property] * quantity;
                        }
                    }
                } else {
                    console.error(`库存中id为${itemId}的物品数量不足。`);
                }

                // 如果数量归零，则从库存中移除
                if (existingItem.quantity === 0) {
                    const itemIndex = playerStats.inventory.findIndex(item => item.id === itemId);
                    playerStats.inventory.splice(itemIndex, 1);
                }

                // 更新显示
                updateInventory();

            } else {
                console.error(`玩家没有id为${itemId}的物品。`);
            }
        } else {
            console.error(`id为${itemId}的物品不是消耗品。`);
        }
    } else {
        console.error(`未找到id为${itemId}的物品定义。`);
    }

    // 更新显示
    checkGameStatus();
    updateGameTime();
    updateInventory();
    updatePlayerStats();
}

// 装备物品
function equipItem(itemId) {
    // 找到对应的道具定义
    const itemDefinition = items.find(item => item.id === itemId);

    if (itemDefinition) {
        // 判断物品类型是否为 weapon、armor 或 accessory
        if (['weapon', 'armor', 'accessory'].includes(itemDefinition.type)) {
            // 检查当前已经装备的同类型物品
            let equippedItem = null;

            switch (itemDefinition.type) {
                case 'weapon':
                    equippedItem = playerStats.weapon;
                    playerStats.weapon = null; // 取消之前装备的物品效果
                    break;
                case 'armor':
                    equippedItem = playerStats.armor;
                    playerStats.armor = null;
                    break;
                case 'accessory':
                    equippedItem = playerStats.accessory;
                    playerStats.accessory = null;
                    break;
            }

            // 如果已经装备了同类型的物品，取消其效果
            if (equippedItem) {
                for (const property in equippedItem.properties) {
                    if (playerStats.hasOwnProperty(property)) {
                        playerStats[property] -= equippedItem.properties[property];
                    }
                }

                // 将已经装备的物品放回库存
                addItem(equippedItem.id, 1);
            }

            // 装备新物品并修改属性
            switch (itemDefinition.type) {
                case 'weapon':
                    playerStats.weapon = itemDefinition;
                    break;
                case 'armor':
                    playerStats.armor = itemDefinition;
                    break;
                case 'accessory':
                    playerStats.accessory = itemDefinition;
                    break;
            }

            for (const property in itemDefinition.properties) {
                if (playerStats.hasOwnProperty(property)) {
                    playerStats[property] += itemDefinition.properties[property];
                }
            }

            // 减少库存中对应物品的数量
            const inventoryItem = playerStats.inventory.find(item => item.id === itemId);
            if (inventoryItem && inventoryItem.quantity > 0) {
                inventoryItem.quantity--;

                // 如果数量归零，则从库存中删除该物品
                if (inventoryItem.quantity === 0) {
                    playerStats.inventory = playerStats.inventory.filter(item => item.id !== itemId);
                }
            }

            // 更新显示
            checkGameStatus();
            updateGameTime();
            updatePlayerStats();
            updateInventory(); // 更新库存显示，确保装备的物品在库存中的数量正确
        } else {
            console.error(`id为${itemId}的物品不是 weapon、armor 或 accessory。`);
        }
    } else {
        console.error(`未找到id为${itemId}的物品定义。`);
    }
}