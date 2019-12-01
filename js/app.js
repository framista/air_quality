const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
        })
        
        document.querySelectorAll('.nav-link').forEach((link)=>{
            link.addEventListener('click', app.nav); //Dla więcej niż jednej strony "nav-link" będzie klasą obiektów nawigacji
        })
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target'); //W przypadku istnienia więcej niż 1 strony, "data-target" będzie nową właściwością z wartością, która jest nazwą id strony (np. strona ma id "oNas", to "data-target="oNas")
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'is displaying'); //aktywuje się przy zmianie strony

    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        //Aktywuje sie przy kliknięciu nawigacji
        //Coś tam, żeby nieistniejąca strona się ładowała przy powrocie:
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

document.addEventListener('DOMContentLoaded', app.init);

const cityList = document.getElementsByTagName('select')[0];
const searchBtn = document.querySelector('input[type=submit]');

class Station {
    constructor(id, stationName, provinceName) {
        this.stationId = id;
        this.stationName = stationName;
        this.provinceName = provinceName;
    }
}

// find all station with station name and province name

const stationAllUrl = 'https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/findAll';

const stationAllTemp = [];
fetch(stationAllUrl, {
    method: 'GET',
    mode: 'cors'
})
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((response) => {
        response.forEach(element => {
            // not every of cities has province name
            (element.city !== null) ? stationAllTemp.push(new Station(element.id, element.stationName, element.city.commune.provinceName)) : stationAllTemp.push(new Station(element.id, element.stationName, "--------"));
            var last = stationAllTemp[stationAllTemp.length - 1];
            var option = document.createElement("option");
            option.setAttribute("value", element.id);
            var node = document.createTextNode(`${last.stationName} ${last.provinceName}`);
            option.appendChild(node);
            cityList.appendChild(option);
        });
        return stationAllTemp;
    })
    .catch((err) => {
        console.log(err.message);
    });


searchBtn.addEventListener("click", e => {
    e.preventDefault();
    console.log(cityList.options[cityList.selectedIndex].value)
})