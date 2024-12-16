//ここに追加したいJavaScript、jQueryを記入してください。
//このJavaScriptファイルは、親テーマのJavaScriptファイルのあとに呼び出されます。
//JavaScriptやjQueryで親テーマのjavascript.jsに加えて関数を記入したい時に使用します。

function isQueryParamPresent(param) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    return urlParams.has(param);
}
var isIntroPresent = isQueryParamPresent('intro');

function checkLastAccess(h) {
    const lastAccessTime = localStorage.getItem('lastAccess');
    const currentTime = Date.now();
    var flg;
    if (lastAccessTime) {
        const timeDiff = currentTime - lastAccessTime;
        const span = h * 60 * 60 * 1000;
        if (timeDiff > span) { flg = true; }
        else { flg = false; }
    }
    else { flg = true; }
    localStorage.setItem('lastAccess', currentTime);
    return flg;
}
function displayIntro(boolean) {
    if (boolean) {
        $('#intro').show();
        setTimeout(function () {
            $('#intro').fadeOut();
        }, 3500);
        setTimeout(function () {
            $("#container").show();
        }, 4000);
    }
    else {
        $("#container").show();
    }
}

function FixedAnime() {
    var headerH = $('#header').outerHeight(true);
    var scroll = $(window).scrollTop();
    if (scroll >= headerH) { $('#header').addClass('fixed'); }
    else { $('#header').removeClass('fixed'); }
}

function smoothScroll(){
    $('a').click(function(){
        var speed = 400;
        var url = this+'';
        if (url.indexOf('#') > -1){
            if (url.split('#')[1] === ''){
                $('body,html').animate({scrollTop:0}, speed, 'swing');
            }
            else if (location.href.split('#')[0].indexOf(url.split('#')[0]) > -1){
                var target = $('#'+url.split('#')[1]);
                var position = target.offset().top-(($(window).width() >= 1023)?130:68);
                $('body,html').animate({scrollTop:position}, speed, 'swing');
            }
                            else{location.href(url);}
        }
    });
}

$(window).scroll(function () {
    FixedAnime();
});
$(window).on('load', function () {
    $("#admin-bar-inline-css").remove();
    smoothScroll();
});

$(document).ready(function () {
    if ($("body").hasClass("home")) {
        var $intro = $('#intro');
        $intro.appendTo('body');
        $("#container").hide();
        if (isIntroPresent) {
            displayIntro(true);
        }else{
            displayIntro(checkLastAccess(6));
        }
        
    }
});