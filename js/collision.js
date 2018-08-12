// 碰撞检测
/**
 * 判断大鱼和果实的距离
 */
function momFruitCollision() {
    for (var i = 0; i < fruit.num; i++) {
        if(fruit.active[i]){
            var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y) // 勾股定理算出斜边的值
            if(l <= 500){
                // 果实被吃掉
                fruit.dead(i);
            }
        }
    }
}