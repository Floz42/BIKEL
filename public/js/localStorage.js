class LocalStorage {
    constructor() {
        this.getInfos();
        this.setInfos();
    }
    
    // get informations in session storage to fulfill automatically input name and lastname to future reservations
    getInfos() {
        let name = localStorage.getItem('name');
        let lastname  = localStorage.getItem('lastname');
        $('#name').val(name) ;
        $('#last_name').val(lastname) 
    };

    setInfos() {
            this.name = localStorage.getItem('name');
            this.last_name = localStorage.getItem('lastname');
            localStorage.setItem('name', $('#name').val());
            localStorage.setItem('lastname', $('#last_name').val());
    };
};

