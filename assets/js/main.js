$(document).ready(function() {
    $(".music-site").fadeIn();
});
$(function() {
    var windowWidth = window.innerWidth;

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
                $(".menu-over").removeClass('show');
                return false;
            }
        }
    });
    $('.menu-icon').click(function() {
        $(this).siblings('.menu-over').toggleClass('show');
    })
    $('.contador').countdown('2017/09/16 16:00:00', function(event) {
        if(windowWidth > 767) {
            $(this).html(event.strftime(
                '%D <span>dias</span> ' +
                '%H <span>horas</span> ' +
                '%M <span>minutos</span> ' +
                '%S <span>segudos</span>'
            ));
        }else {
            $(this).html(event.strftime(
                '%D <span>dias</span><br>' +
                '%H <span>horas</span><br>' +
                '%M <span>minutos</span><br>' +
                '%S <span>segudos</span>'
            ));
        }
    });
    var flip = true,
    pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
    play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26",
    $animation = $('#animation');

    $(".ytp-play-button").on('click', function() {
       flip = !flip;
        $animation.attr({
            "from": flip ? pause : play,
            "to": flip ? play : pause
        }).get(0).beginElement();

        if($('.music-site').hasClass( "play" )) {
            $('#music-play').trigger('pause');
            $('.music-site').addClass('pause');
            $(".music-site").removeClass('play');
        } else {
            $('#music-play').trigger('play');            
            $('.music-site').addClass('play');
            $(".music-site").removeClass('pause');
        }
    });
});
$(window).bind('scroll',function(e){
    var scrolled = $(window).scrollTop();

    $('.parallax-esquerda').css('bottom',(1700-(scrolled*.55))+'px');
    $('.parallax-direita').css('bottom',(1300-(scrolled*.40))+'px');
});
$(function () {  
    var msie6 = $.browser == 'msie' && $.browser.version < 7;

    if (!msie6) {
        var top = $('.site-nav').offset().top - parseFloat($('.site-nav').css('margin-top').replace(/auto/, 0));
        $(window).scroll(function (event) {
            var y = $(this).scrollTop();

            if (y >= top) {
                $('.menu-fixed').fadeIn();
            }
            else {
                $('.menu-fixed').fadeOut();
            }
        });
    }  
});
