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