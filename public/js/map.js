class Map {
    constructor() {
        this.lat = 45.75;
        this.long = 4.85;
        this.zoom = 15;
        this.max_zoom = 19;
        this.token = 'pk.eyJ1IjoiZmxvejQyIiwiYSI6ImNrM3lobDdxNTFnajgzbW8xNnZ3Z3dnYWUifQ.dsgX3doc4gwxo33Jbb5f-w';
        this.mymap = L.map('map').setView([this.lat, this.long], this.zoom);
        this.colorMarker = "green";
        // define different sorts of icons when station is free, closed or almost empty
        this.BikeIcon = new L.Icon({
            iconUrl: 'public/img/bike-green.png',
            iconSize: [45, 45],
            iconAnchor: [23, 0]
        });
        this.OrangeIcon = new L.Icon({
            iconUrl: 'public/img/bike-orange.png',
            iconSize: [45, 45],
            iconAnchor: [23, 0]
        });
        this.RedIcon = new L.Icon({
            iconUrl: 'public/img/bike-red.png',
            iconSize: [45, 45],
            iconAnchor: [23, 0]
        });
        this.initMap();
        this.initMarkers();
        this.location();
        this.canvas_in();
    };

    // adding map to website with openstreetmap and my apikey
    initMap() {
        this.mymap;
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + this.token, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: this.max_zoom,
        id: 'mapbox/streets-v11',
        accessToken: this.token,
    }).addTo(this.mymap);
    };

    // show canvas if inputs aren't empty
    canvas_in() {
        $('.reservation_form').keyup(function(){
            let $name = $('#name');
            let $last_name = $('#last_name');
            if (($name.val()) && ($last_name.val())) {
                $('.canvas').css({'display': 'initial', 'animation': 'opacity 1s' });
            }
        });
    };

    // on click on reservation button, hide information and show reservation input
    location() {
        $('#reservation_button').on('click', function() {
            const canvas = new Canvas();
            sessionStorage.stationName = $('.station_name').html()
            $('#confirm_location').hide();
            $('.form_infos').css({'animation': 'opacity 3s reverse', 'display': 'none'});
            $('.reservation_form').css({'display': 'flex', 'animation': 'opacity 3s'});
            if (((localStorage.getItem('name')) != "") && ((localStorage.getItem('lastname')) != "")) {
                $('.canvas').css({'display': 'initial', 'animation': 'opacity 1s' });
            }
            });
    };

    // change informations if user click on another station and show informations station
    initMarkers() {
        // if user begin a reservation and want to change station
        function change_station() {
            $('.form_infos').css({'animation': 'opacity 3s', 'display': 'flex'});
            $('.reservation_form').css({'display': 'none', 'animation': 'opacity 3s reverse'});
            }
        function open_window() {
            if (window.matchMedia('(min-width: 768px)').matches) {
                if ($('#map_reservation .row').hasClass('col-lg-12')) {
                    $('#map_reservation .row').toggleClass('col-lg-12 col-lg-8');
                    $('.form').css('display', 'flex');
                } 
            } else {
                $('.form').css({'display': 'initial'});
                $('#map_reservation').css('margin-top', '300px');
                $(document).scrollTop(1000);
            }
        }
        // call API and get stations informations to json format
        $.getJSON('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=9ffd0f35cecb00dbe6828d93d273f44587cd29b3', (data) => {
            // do a foreach to get all informations of each station and place it on map 
            $.each(data, (i) => {
              let station = data[i]; 
              if (station.status === "CLOSED") {
                L.marker([station.position.lat, station.position.lng], {icon: this.RedIcon})
                .bindPopup(station.name)
                .addTo(this.mymap)
                .on('click', function() {
                    $('.state_station').text('STATION FERMÉE').css({'backgroundColor': 'red', 'font-size': '1em'});
                    $('.station_name').text(station.name);
                    $('.infos_station').css('display', 'none');
                    open_window();
                }); 
               } else if (station.available_bikes === 0) {
                L.marker([station.position.lat, station.position.lng], {icon: this.RedIcon})
                .bindPopup(station.name)
                .addTo(this.mymap)
                .on('click', function() {
                    $('.state_station').text('AUCUN VÉLO DISPONIBLE').css({'backgroundColor': 'red', 'font-size': '0.7em'});
                    $('.station_name').text(station.name);
                    $('.infos_station').css('display', 'none');
                    open_window();
                    change_station();
                });
               } else if (station.available_bikes < station.bike_stands / 2) {
                L.marker([station.position.lat, station.position.lng], {icon: this.OrangeIcon})
                .bindPopup(station.name)
                .addTo(this.mymap)
                .on('click', function() {
                    $('.state_station').text('STATION OUVERTE').css({'backgroundColor': '#5cadd3', 'font-size': '0.5em'});
                    $('.infos_station').css('display', 'initial');
                    $('.station_name').text(station.name);
                    $('.address').text(station.address);
                    $('.total_bikes').text(station.bike_stands);
                    $('.available_bikes').text(station.available_bikes);
                    open_window();
                    change_station();
                });
              } else {
                L.marker([station.position.lat, station.position.lng], {icon: this.BikeIcon})
                .bindPopup(station.name)
                .addTo(this.mymap) 
                .on('click', function() {
                    $('.state_station').text('STATION OUVERTE').css({'backgroundColor': '#5cadd3', 'font-size': '0.5em'});;
                    $('.infos_station').css('display', 'initial');
                    $('.station_name').text(station.name);
                    $('.address').text(station.address);
                    $('.total_bikes').text(station.bike_stands);
                    $('.available_bikes').text(station.available_bikes);
                    open_window();
                    change_station();
                });
              };
            });
        });
    };   
}
const map_default = new Map();

