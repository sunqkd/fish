//绘制海葵

// 海葵类
var aneObj = function () {
    this.x = [];
    this.len = []; // 高度
}

// 海葵的个数
aneObj.prototype.num = 50;
// 初始化
aneObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.x[i] = i * 16 + Math.random() * 20 // [0,1) 海葵x轴位置
        this.len[i] = 200 + Math.random() * 50 // 海葵的高度
    }
}
// 绘制海葵
aneObj.prototype.draw = function () {

    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 15;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = '#3b154e';
    for (var i = 0; i < this.num; i++) {
        // beginPath moveTo lineTo strokeStyle stroke lineWidth lineCap globalAlpha 
        ctx2.beginPath();
        ctx2.moveTo(this.x[i], canHeight);
        ctx2.lineTo(this.x[i], canHeight - this.len[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}