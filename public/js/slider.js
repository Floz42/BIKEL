class Slider {
    constructor() {
        this.i = 0;
        this.nbImages = $('.one_slide').length;
        this.image = $('.one_slide');
        this.dot = $('.dot');
        this.currentImage = () => $('.one_slide')[this.i];
        this.currentDot = () => $('.dot')[this.i];
        this.button_next = $('#next');
        this.button_prev = $('#prev');
        this.button_playPause = $('#playPause');
        this.document = $('document');
        this.animation = setInterval(this.next.bind(this), 5000);
        this.activeArrow = true;

        this.animateSlider();


        this.button_playPause.on('click', this.playPause.bind(this));
        this.button_next.on('click', this.next.bind(this));
        this.button_prev.on('click', this.prev.bind(this));
        $(document).on('keydown', this.arrow.bind(this));

        // when user is on input, or map, arrow function are not activate
        $('input, #map').focusin(() => {
            this.activeArrow = false;
        });
        $('input, #map').focusout(() => {
            this.activeArrow = true;
        });
    };

    // hide images and show current image and add css to current dot (in relation with next function)
    animateSlider() {
        $(this.image).css('display', 'none');
        $(this.dot).css('color', 'silver');
        $(this.currentImage()).css('display', 'flex');
        $(this.currentDot()).css('color', '#5cadd3'); 
    };

    // increment i (the current index of image)
    next() {
        if (this.i < this.nbImages -1) {
            this.i++;
        } else {
            this.i = 0;
        }
        this.animateSlider();
    };

    prev() {
        if (this.i > 0) {
            this.i--;
        } else {
            this.i = this.nbImages -1;
        }
        this.animateSlider();
    };

    // replace the button to click and stop animation if pause activate
    playPause() {
        this.animation;
        console.log(this.animation)
        if (this.button_playPause.hasClass('fa-pause-circle')) {
            this.button_playPause.toggleClass('fa-pause-circle fa-play-circle')
            clearInterval(this.animation);
        } else if (this.button_playPause.hasClass('fa-play-circle')) {
            this.button_playPause.toggleClass('fa-pause-circle fa-play-circle')
            this.animation = setInterval(this.next.bind(this), 5000); ;
        }
    };

    // switch for arrow left and right with css same animations than "hover"
    arrow(e){
        if (this.activeArrow) {
            switch(e.keyCode){
                case 37: 
                    this.prev();
                    setTimeout(() => {
                        this.button_prev.addClass('blue');
                    }, 100);
                    this.button_prev.removeClass('blue');
                    break;
                case 39: 
                    this.next();
                    setTimeout(() => {
                        this.button_next.addClass('blue');
                    }, 100);
                    this.button_next.removeClass('blue');
                    break;
            }
        }
    };
};

const slider = new Slider();
