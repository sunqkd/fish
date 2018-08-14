var can1;
var can2;

var ctx1;
var ctx2;

var lastTime; // 上一帧执行时间
var deltaTime; // 两帧间隔的时间差

var canWidth; // canvas的宽和高
var canHeight;
var ane; // 海葵
var fruit; // 果实
var bgPic = new Image(); // 背景图
var mom; // 大鱼

var mx;
var my; // 鼠标点的位置

var baby; // 小鱼
var babyTail = []; // 小鱼尾巴数组
var babyEye = []; // 小鱼翻眼睛
var babyBody = []; // 小鱼身体

document.body.onload = game; // game 函数作为主入口
function game() {
    // 初始化工作
    init();
    lastTime = Date.now(); // 当前时间
    deltaTime = 0;
    gameloop();
}
// 初始化
function init() {
    // 获得canvas context
    can1 = document.getElementById("canvas1");
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById("canvas2");
    ctx2 = can2.getContext('2d');

    // 鼠标移动事件
    can1.addEventListener('mousemove', onMouseMove, false);

    // 背景图
    bgPic.src = "./src/background.jpg";
    canWidth = can1.width;
    canHeight = can1.height;
    // 海葵
    ane = new aneObj();
    ane.init(); // 初始化

    // 果实
    fruit = new fruitObject();
    fruit.init(); // 初始化

    // 大鱼
    mom = new momObj();
    mom.init(); // 初始化
    // 小鱼尾巴数组
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./src/bigTail" + i + ".png";
    }
    // 小鱼眼睛数组
    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }
    // 小鱼身体变白实现
    for (var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src ="./src/babyFade" + i +".png";

    }

    // 鼠标的的初始化
    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    // 初始化小鱼
    baby = new babyObj();
    baby.init();


}

// 关键帧
function gameloop() {
    window.requestAnimationFrame(gameloop) // 相对于 settimeout、setinterval 更科学智能计算
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now; // 更新上一次时间
    if (deltaTime > 40) {
        deltaTime = 40;
    }
    drawBackground(); // 绘制背景图
    ane.draw(); // 绘制海葵
    fruitMonitor(); // 每一帧都要判断
    fruit.draw();// 绘制果实
    ctx1.clearRect(0, 0, canWidth, canHeight); // 清除
    mom.draw();//绘制大鱼
    momFruitCollision(); // 碰撞检测

    baby.draw();// 绘制小鱼
}


// 鼠标移动函数
function onMouseMove(e) {
    if (e.offSetX || e.layerX) {
        mx = e.offSetX == undefined ? e.layerX : e.offSetX;
        my = e.offSetY == undefined ? e.layerY : e.offSetY;

    }
}