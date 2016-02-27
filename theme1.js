var flag = true;
var _size = 400;
function theme1() {
    var ctx = document.getElementById("dots-canvas").getContext("2d");
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 100, 0, 478, 478, 0, 0, _size, _size);
    };
    img.src = 'night.jpg';
    var newDot = new Dot(0, 0, _size, ctx);
    if(flag) {
        setTimeout(function () {
            newDot.appendDotTo($("#dots .inner"));
            flag = false;
        }, 1000);
    }
}

function Dot(x, y, size, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
}

Dot.prototype.split = function () {
    var children = [];
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 2; i++) {
            var sx = this.x + i * this.size / 2;
            var sy = this.y + j * this.size / 2;
            var childDot = new Dot(sx, sy, this.size / 2, this.ctx);
            childDot.appendDotTo(this.ele);
            children.push(childDot);
        }
    }
    this.children = children;
    this.destroy(this.shape);
};
Dot.prototype.getColor = function () {
    return getAvgColor(this.x, this.y, this.x + this.size, this.y + this.size, this.ctx);
};
Dot.prototype.appendDotTo = function (parent) {

    //Dom element binding
    var that = this;
    var container = $('<div class="recursive-dot-container"></div>')
        .appendTo(parent);
    var ele = $('<div class="recursive-dot"></div>')
        .appendTo(container)
        .css({background : that.getColor()})
        .bind('mouseenter', function (e) {
                that.split();
                e.preventDefault();
            }
        );
    that.ele = container;
    that.shape = ele;
};
Dot.prototype.destroy = function(ele){
    ele.css({"transform":"scale(0)", "opacity":"0"});
}