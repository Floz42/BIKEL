class LocalStorage {

    
    // get informations in session storage to fulfill automatically input name and lastname to future reservations
    getInfos() {
        let name = localStorage.getItem('name');
        let lastname  = localStorage.getItem('lastname');
        $('#name').val(name) ;
        $('#last_name').val(lastname) 
    };

    setInfos() {
        localStorage.setItem('name', $('#name').val());
        localStorage.setItem('lastname', $('#last_name').val());
    };
};

 