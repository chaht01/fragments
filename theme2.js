var TRIANGLEAPP = {};
function triangleInitAnimate() {
    var ctx = TRIANGLEAPP.ctx,
        alpha = TRIANGLEAPP.alpha,
        triangles = TRIANGLEAPP.triangles,
        vertices = TRIANGLEAPP.vertices,
        fps = 100000;
    if(!TRIANGLEAPP.colored){
        TRIANGLEAPP.ctx.fillStyle = "#fff";
    }else{
        TRIANGLEAPP.alpha = 1;
    }
    //setTimeout(function () {
        TRIANGLEAPP.ctx.globalAlpha = alpha;
        if (alpha < 1) {
            TRIANGLEAPP.alpha += 0.5 / TRIANGLEAPP.map.length;
        }
        var random = TRIANGLEAPP.colored ? 0 : Math.floor(Math.random() * TRIANGLEAPP.map.length);
        if (TRIANGLEAPP.map.length) {
            var triangle = TRIANGLEAPP.map.splice(random, 1)[0]; //pop 1 triangle vertices from map
            var sortedX = [].sort.apply([vertices[triangle[0]][0],vertices[triangle[1]][0],vertices[triangle[2]][0]]);
            var sortedY = [].sort.apply([vertices[triangle[0]][1],vertices[triangle[1]][1],vertices[triangle[2]][1]]);
            ctx.beginPath();
            ctx.moveTo(vertices[triangle[0]][0], vertices[triangle[0]][1]);
            ctx.lineTo(vertices[triangle[1]][0], vertices[triangle[1]][1]);
            ctx.lineTo(vertices[triangle[2]][0], vertices[triangle[2]][1]);
            if(TRIANGLEAPP.colored) {
                TRIANGLEAPP.ctx.fillStyle = getAvgColor(sortedX[0], sortedY[0], sortedX[2], sortedY[2], TRIANGLEAPP.imgctx);
            }
            ctx.fill();

            window.requestAnimationFrame(triangleInitAnimate);
        }else{
            console.timeEnd("Initialize");
            if(!TRIANGLEAPP.colored)
                imageEarcutSetup();
        }
    //}, 1/fps);
}
function imageEarcutSetup(){
    var img = new Image();
    var canvas = document.getElementById("triangle-canvas");
    TRIANGLEAPP.imgctx = canvas.getContext("2d");
    var ctx = TRIANGLEAPP.imgctx;
    var width = 415.558,
        height = 360;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, 449, 449, 0, 0, width, height);
    };
    img.src = 'img.jpg';

    //clipping Image
    ctx.beginPath();
    ctx.moveTo(width/2,0);
    ctx.lineTo(width,height);
    ctx.lineTo(0,height);
    ctx.clip();

    imageEarcutAnimate();
}
function imageEarcutAnimate(){
    $("#triangle .inner").css("border-bottom-color","transparent");
    TRIANGLEAPP.colored = true;
    TRIANGLEAPP.vertices =  generateRandomPoints(500);
    TRIANGLEAPP.triangles = Delaunay.triangulate(TRIANGLEAPP.vertices);
    TRIANGLEAPP.map = mapTriangles(TRIANGLEAPP.triangles);
    window.requestAnimationFrame(triangleInitAnimate)
}
function generateRandomPoints(count){
    var vertices =  new Array(count);
    var i, x, y, canvas = TRIANGLEAPP.canvas;

    for (i = 0; i < vertices.length - 3; i++) {
        do {
            x = Math.random();
            y = Math.random();
        } while (Math.pow(3, 0.5) * x + y < 1 || Math.pow(3, 0.5) * x - y > 1);

        x = x * canvas.height;
        y = y * canvas.height;

        vertices[i] = [x, y];
    }
    vertices[i] = [canvas.width/2, 0];
    i++;
    vertices[i] = [0, canvas.height];
    i++;
    vertices[i] = [canvas.width, canvas.height];
    return vertices;
}
function mapTriangles(triangulatedArr){
    var map = [];
    for (var i = 0; i < triangulatedArr.length; i += 3) {
        map.push(triangulatedArr.slice(i, i + 3));
    }
    return map;
}
function theme2() {
    var canvas = document.getElementById("triangle-bg");
        TRIANGLEAPP.canvas = canvas;
        TRIANGLEAPP.ctx = canvas.getContext("2d");
    TRIANGLEAPP.vertices =  generateRandomPoints(80);
    TRIANGLEAPP.triangles = Delaunay.triangulate(TRIANGLEAPP.vertices);
    TRIANGLEAPP.map = mapTriangles(TRIANGLEAPP.triangles);
    TRIANGLEAPP.alpha = 0.5;
    TRIANGLEAPP.colored = false;
    console.time("Initialize");
    window.requestAnimationFrame(triangleInitAnimate)
}