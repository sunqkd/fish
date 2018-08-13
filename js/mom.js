// 大鱼的绘制
var momObj = function () {
    this.x;// x坐标
    this.y; // y坐标
    this.angle; // 角度
    this.bigEye = new Image(); // 大鱼的眼睛
    this.bigBody = new Image(); // 大鱼的身体
    this.bigTail = new Image(); // 大鱼的尾巴
}
// 初始化
momObj.prototype.init = function () {
    this.x = canWidth * 0.5; // 绘制在中间
    this.y = canHeight * 0.5;
    this.angle = 0; // 角度为零
    this.bigEye.src = "./src/bigEye0.png";
    this.bigBody.src = "./src/bigSwim0.png";
    this.bigTail.src = "./src/bigTail0.png";
}
// 画大鱼
momObj.prototype.draw = function () {
    // 三个参数分别代表 目标值、当前值、比例
    this.x = lerpDistance(mx, this.x, 0.95); // 返回值趋向目标值
    this.y = lerpDistance(my, this.y, 0.95); // 返回值趋向目标值
    // 坐标差 delta angle

    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI; // 角度

    this.angle = lerpAngle(beta, this.angle, 0.9);
    ctx1.save();

    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(this.bigTail, -this.bigTail.width * 0.5 + 30, -this.bigTail.height * 0.5);
    ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
    ctx1.drawImage(this.bigEye, -this.bigEye.width * 0.5, -this.bigEye.height * 0.5);

    ctx1.restore();
}