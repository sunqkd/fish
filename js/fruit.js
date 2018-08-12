// 绘制果实
// 果实类
var fruitObject = function () {
    this.active = []; // 是否活着存放  boolean
    this.orange = new Image(); // 黄色的果实
    this.blue = new Image(); // 蓝色的果实
    this.x = []; // 果实x位置
    this.y = []; // 果实y位置
    this.l = []; // 图片长度
    this.spd = []; // 果实向上飘得速度
    this.fruitType = []; // 果实类型
}
// 果实的数量
fruitObject.prototype.num = 30;
// 初始化

fruitObject.prototype.init = function () {
    this.orange.src = './src/fruit.png';
    this.blue.src = './src/blue.png';
    for (var i = 0; i < this.num; i++) {
        this.active[i] = false; // 初始化果实都处于休眠状态
        this.x[i] = 0;
        this.y[i] = 0;
        this.spd[i] = Math.random() * 0.01 + 0.005; // [0.005, 0.015)
        this.fruitType[i] = "";
    }
}

// 画果实
fruitObject.prototype.draw = function () {
    /**
     *果实找到一个海葵定位，然后长大，然后向上飘
     */
    for (var i = 0; i < this.num; i++) {
        if (this.active[i]) {
            // 果实选择
            if (this.fruitType[i] == "blue") {
                var pic = this.blue
            } else {
                var pic = this.orange
            }

            if (this.l[i] < 10) {
                this.l[i] += this.spd[i] * deltaTime; // 长大(速度不相同)
            } else {
                this.y[i] -= this.spd[i] * 7 * deltaTime; // 上升(速度不相同)
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

            if (this.y[i] < 10) {
                this.active[i] = false;
            }
        }

    }
}

// 果实出生
fruitObject.prototype.born = function (i) {
    var aneId = Math.floor(Math.random() * ane.num); // 0-49 随机海葵位置
    this.x[i] = ane.x[aneId]; // 海葵的x坐标
    this.y[i] = canHeight - ane.len[aneId]; //海葵的y坐标
    this.l[i] = 0;
    this.active[i] = true;
    var ran = Math.random();
    if (ran < 0.2) {
        this.fruitType[i] = "blue";
    } else {
        this.fruitType[i] = "orange";
    }
}
// 果实死亡
fruitObject.prototype.dead = function (i) {
    this.active[i] = false;
}
// 检测是否需要产生果实
function fruitMonitor() {
    var num = 0;
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.active[i]) {
            num++;
        }
    }
    if (num < 15) {
        // 果实出生
        sendFruit()
        return;
    }
}

// 判断果实是否是存活状态
function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.active[i]) {
            fruit.born(i) // 果实出生
            return;
        }
    }
}
