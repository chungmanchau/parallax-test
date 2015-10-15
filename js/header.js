$(document).ready(function(){
    var scrollTop = $(document).scrollTop();
    var headerTop = $("#header").offset().top;

    $(window).scroll( function() {
        if ($(window).scrollTop() > $("#header").height())
            $('#header').addClass('fixed');
        else
            $('#header').removeClass('fixed');
    } );
});
