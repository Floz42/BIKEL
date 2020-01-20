// ESSENTIALS FUNCTIONS FOR WORKING PAGE

$(function(){
    
    const storage = new LocalStorage();
    const canvas = new Canvas(); 
    const reservation = new Reservation();
    
 
// REDUCE OR INCREASE THE NAVBAR ON SCROLL

    $(window).on('scroll', function(){
        if (window.matchMedia('(min-width: 768px)').matches) {
            if ($(window).scrollTop() > 50) {
                $('#menu').css({'animation': 'reduce 0.5s forwards'});
                $('.slogan_menu').css('display', 'none');
                $('#menu img').css('width', '60px');
                $('.title_menu').css('font-size', '1em');
            } if ($(window).scrollTop() <= 50) {
                $('#menu').css('animation', 'reduce-reverse 0.5s forwards');
                $('.slogan_menu').css({'display': 'initial', 'animation': 'opacity 2s'});
                $('#menu img').css('width', 'initial');
                $('.title_menu').css('font-size', '1.5em');
            }
        }
    }); 
});

