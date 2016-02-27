'use strict';
$(document).ready(function () {

    $("#dots").click(function (e) {
        if(!$("body").hasClass("theme2")) {
            $(this).addClass("focus");
            $("body").addClass("theme1");
            theme1();
        }
    });
    $("#triangle").click(function(){
       $(this).addClass("focus");
        $("body").addClass("theme2");
        theme2();
        $("#triangle-bg").addClass("init");
    });
    $("#dots").hover(function () {
        if(!$("body").hasClass("theme2")) {
            $("body").addClass("ready1")
        }
    }, function () {
        $("body").removeClass("ready1")
    });
    $("#triangle").hover(function () {
        $("body").addClass("ready2")
    }, function () {
        $("body").removeClass("ready2")
    });
});

function getAvgColor(sx, sy, dx, dy, ctx) {
    var r = 0;
    var g = 0;
    var b = 0;
    var sizeX = dx-sx;
    var sizeY = dy-sy;
    var data = ctx.getImageData(sx, sy, sizeX, sizeY).data;

    for (var i=0; i<data.length ;i+=4){
        r += data[i];
        g += data[i+1];
        b += data[i+2];
    }
    r = Math.floor(r / (data.length /4));
    g = Math.floor(g / (data.length /4));
    b = Math.floor(b / (data.length /4));
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}