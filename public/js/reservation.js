class Reservation {
        constructor() {
            this.timer = false;
            this.stationName = sessionStorage.stationName;
            this.name = localStorage.getItem('name');
            this.last_name = localStorage.getItem('lastname');
            this.interval;
            this.init();
            this.addEvents();
        }

        // if a reservation is in progress, the user can't do another
        onCheckReservation(e) {
            if (this.timer == true) {
                $('form, .station_name, .infos_station').hide();
                $('.form_infos').css('display', 'flex');
                $('.state_station').text('Une réservation est déjà en cours.').css({'backgroundColor': 'red', 'animation': 'none'});
            }
        }

        // when user cancel the reservation we stop timer, remove stationname in stationStorage and hide headband reservation
        onCancelReservation(e) {
            this.timer = false;
            this.stopTimer();
            $('.reservation_text').html("Votre réservation a bien été annulée.");
            $('.minutes_timer').hide();
            sessionStorage.removeItem('stationName'); 
            $('#cancel_reservation').hide();
            setTimeout(function() { $('#reservation').hide()}, 3000);
        }

        // we centrallize the events in a function
        addEvents() {
          this.onCheckReservation = this.onCheckReservation.bind(this);
          this.onCancelReservation = this.onCancelReservation.bind(this);
          this.init = this.init.bind(this);
          $('#reservation_button').on('click', this.onCheckReservation);
          $('#cancel_reservation').on('click', this.onCancelReservation);
          $('#confirm_location').on('click', this.init);
        }

        // when user validate a reservation we call initReservation after verifications
        init() {
            this.stationName = sessionStorage.stationName;
            if ((this.stationName == undefined) || (this.stationName == null)) {
                 $('#reservation').css('display', 'none');
            } else {
                this.initReservation();
            }
        }

        // we hide form reservation and show headband reservation, and call startTimer who start to 20mn
        initReservation() { 
            if ($('#map_reservation .row').hasClass('col-lg-8')) {
                $('#map_reservation .row').toggleClass('col-lg-12 col-lg-8');
                $('.form').css('display', 'none');
            }  
            if (window.matchMedia('(max-width: 768px)').matches) {
                $('.form').css('display', 'none');
            }
                $('.minutes_timer').css('display', 'flex');
                $('#reservation').css({'display': 'flex'});
                this.timer = true;
                this.startTimer();
                $('#cancel_reservation').show();
                this.name = localStorage.getItem('name'); 
                this.last_name = localStorage.getItem('lastname');
                $('.reservation_text').html("Une réservation au nom de <span style='background-color: #5cadd3; padding: 0.3em;'>" + this.name + " " + this.last_name + "</span> a été prise pour la station <span style='background-color: #5cadd3; padding: 0.3em;'>" + this.stationName + "</span> et expirera dans : ");   
            }

        // function timer who start to 20mn and expire when he arrived    
        startTimer() {
            this.interval = setInterval(() => {
            let minutes = sessionStorage.getItem('minutes_timer');
            let seconds = sessionStorage.getItem('seconds_timer');
            seconds -= 1; 
            if (seconds < 0) {
                seconds = 59;
                minutes -= 1;
            } if ((minutes == 0) && (seconds <= 0)){
                this.stopTimer();
                this.timer = false; 
                $('.minutes_timer').hide();
                $('.reservation_text').html("Votre réservation vient d'expirer.");
                $('#cancel_reservation').hide();
                setTimeout(function() { $('#reservation').hide()}, 3000);
                sessionStorage.setItem('minutes_timer', 20);
                sessionStorage.setItem('seconds_timer', 0);
            } else {
                sessionStorage.setItem('minutes_timer', minutes);
                sessionStorage.setItem('seconds_timer', seconds);
                $('.minutes_timer').html(minutes + " mn et " + seconds + " s.");
                } 
            }, 1000);
        }

        stopTimer() {
            clearInterval(this.interval);
            sessionStorage.clear();
            $('.minutes_timer').html(20 + " mn et " + 0 + " s.");
        }
    }




