var TRIANGLEAPP = {};
function triangleInitAnimate() {
    var ctx = TRIANGLEAPP.ctx,
        alpha = TRIANGLEAPP.alpha,
        triangles = TRIANGLEAPP.triangles,
        vertices = TRIANGLEAPP.vertices;
    setTimeout(function () {
        TRIANGLEAPP.ctx.globalAlpha = alpha;
        if (alpha < 1) {
            TRIANGLEAPP.alpha += 0.5 / TRIANGLEAPP.map.length;
        }
        var random = Math.floor(Math.random() * TRIANGLEAPP.map.length);
        if (TRIANGLEAPP.map.length) {
            var triangle = TRIANGLEAPP.map.splice(random, 1)[0];
            ctx.beginPath();
            ctx.moveTo(vertices[triangle[0]][0], vertices[triangle[0]][1]);
            ctx.lineTo(vertices[triangle[1]][0], vertices[triangle[1]][1]);
            ctx.lineTo(vertices[triangle[2]][0], vertices[triangle[2]][1]);
            ctx.fill();
            window.requestAnimationFrame(triangleInitAnimate);
        }else{
            console.timeEnd("start")
        }
    }, 1000 / 1000);
}
function theme2() {
    var canvas = document.getElementById("triangle-bg");

        TRIANGLEAPP.ctx = canvas.getContext("2d");
        TRIANGLEAPP.vertices = new Array(100);
        var i, x, y;

    for (i = 0; i < TRIANGLEAPP.vertices.length - 3; i++) {
        do {
            x = Math.random();
            y = Math.random();
        } while (Math.pow(3, 0.5) * x + y < 1 || Math.pow(3, 0.5) * x - y > 1);

        x = x * canvas.height;
        y = y * canvas.height;

        TRIANGLEAPP.vertices[i] = [x, y];
    }
    TRIANGLEAPP.vertices[i] = [canvas.width/2, 0];
    i++;
    TRIANGLEAPP.vertices[i] = [0, canvas.height];
    i++;
    TRIANGLEAPP.vertices[i] = [canvas.width, canvas.height];
    TRIANGLEAPP.triangles = Delaunay.triangulate(TRIANGLEAPP.vertices);
    TRIANGLEAPP.map = [];
    for (var i = 0; i < TRIANGLEAPP.triangles.length; i += 3) {
        TRIANGLEAPP.map.push(TRIANGLEAPP.triangles.slice(i, i + 3));
    }
    TRIANGLEAPP.alpha = 0.5;
    TRIANGLEAPP.ctx.fillStyle = "#fff";
    console.time("start");
    window.requestAnimationFrame(triangleInitAnimate)
}