// 小鱼
var babyObj = function () {
    this.x;
    this.y;
    // this.babyEye = new Image();
    this.babyBody = new Image();
    // this.babyTail = new Image();
    this.angle; // 角度
    this.babyTailTimer = 0; // 计时器
    this.babyTailCount = 0; // 执行到那一帧了

    this.babyEyeTimer = 0; // 计时器
    this.babyEyeCount = 0; // 执行到那一帧
    this.babyEyeInterval = 1000; // 时间间隔

    this.babyBodyTimer = 0; // 计时器
    this.babyBodyCount = 0; // 帧
}
// 初始化位置
babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 - 50; // 初始化小鱼的位置
    this.y = canHeight * 0.5 + 50;
    this.angle = 0; // 旋转角度
    // this.babyEye.src = "./src/babyEye0.png"
    this.babyBody.src = "./src/babyFade0.png";
    // this.babyTail.src = "./src/babyTail0.png";

}
// 画小鱼
babyObj.prototype.draw = function () {
    // 趋向于大鱼的坐标
    // leap x,y
    this.x = lerpDistance(mom.x, this.x, 0.96); // 返回值趋向目标值
    this.y = lerpDistance(mom.y, this.y, 0.96); // 返回值趋向目标值

    // leap angle
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI; // 角度
    this.angle = lerpAngle(beta, this.angle, 0.9);

    // baby tail count 尾巴摇动
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8; // 取余数
        this.babyTailTimer = this.babyTailTimer % 50; // 取余数
    }

    // baby eye count 眼睛眨眨
    /** */
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if (this.babyEyeCount == 0) { // 闭眼
            this.babyEyeInterval = Math.random() * 1500 + 2000; // [2000,3500)
        } else { // 眼睛睁开
            this.babyEyeInterval = 200;
        }
    }

    // baby body 鱼身体
    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 300) {
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if (this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            // game over
        }
    }


    ctx1.save();

    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);

    var babyTailCount = this.babyTailCount; // 临时变量
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
    var babyBodyCount = this.babyBodyCount; // 临时变量
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
    var babyEyeCount = this.babyEyeCount; // 临时变量
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);
    ctx1.restore();
}
