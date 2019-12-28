import Station from './station'
import setIndexLevel from './setIndexLevel'
import setParameters from './setParameters'
import addOptionToSelect from './addOptionToSelect'

const app = {
    pages: [],
    show: new Event('show'),
    init: function () {
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg) => {
            pg.addEventListener('show', app.pageShown);
        })

        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', app.nav); //Dla więcej niż jednej strony "nav-link" będzie klasą obiektów nawigacji
        })
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function (ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target'); //W przypadku istnienia więcej niż 1 strony, "data-target" będzie nową właściwością z wartością, która jest nazwą id strony (np. strona ma id "oNas", to "data-target="oNas")
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function (ev) {
        console.log('Page', ev.target.id, 'is displaying'); //aktywuje się przy zmianie strony

    },
    poppin: function (ev) {
        console.log(location.hash, 'popstate event');
        //Aktywuje sie przy kliknięciu nawigacji
        //Coś tam, żeby nieistniejąca strona się ładowała przy powrocie:
        let hash = location.hash.replace('#', '');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

class Item {

    constructor(stationID, stationCity, stationProvince) {
        this.createDiv(stationID, stationCity, stationProvince);
    }

    createDiv(stationId, stationCity, stationProvince) {
        let stationCity_h2 = document.createElement('h2');
        stationCity_h2.innerHTML = stationCity;
        let stationProvince_h4 = document.createElement('h4');
        stationProvince_h4.innerHTML = stationProvince;
        let locationInformationBox = document.createElement('div');
        locationInformationBox.id = stationId;
        locationInformationBox.classList.add('locationInformation');
        let parameterBox = document.createElement('div');
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('aside__btn');
        removeBtn.innerHTML = "X"

        historyBox.appendChild(locationInformationBox);
        parameterBox.appendChild(stationCity_h2);
        parameterBox.appendChild(stationProvince_h4);
        locationInformationBox.appendChild(parameterBox);
        locationInformationBox.appendChild(removeBtn);

        removeBtn.addEventListener('click', (e) => this.remove(e, locationInformationBox));
        locationInformationBox.addEventListener('click', (e) => this.showParameter(e))
    }

    remove(e, item) {
        e.stopPropagation();
        let stationId = e.target.parentNode.id;
        historyBox.removeChild(item);
        let index = historyList.findIndex( e => e.stationId === stationId);
        historyList.splice(index, 1);
        localStorage.setItem("history", historyList.map( e => JSON.stringify(e)).join(";"));
    }

    showParameter(e) {
        let stationId = e.currentTarget.id;
        setLocalization(stationId);
        searchValues(stationId);
        searchIndexLevel(stationId);
    }

}

document.addEventListener('DOMContentLoaded', app.init);

const cityList = document.getElementsByTagName('select')[0];
const searchBtn = document.querySelector('input[type=submit]');
const city = document.getElementsByClassName('location')[0];
const historyBox = document.querySelector('aside');
var historyLocal = localStorage.getItem("history");
const historyList = [];
if (historyLocal) {
    historyLocal.split(";").forEach(e => {
        historyList.push(JSON.parse(e));
    });
}

// add item from localStorage to aside
if (historyLocal) {
    historyList.forEach(e => new Item(e.stationId, e.stationName, e.provinceName));
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
            addOptionToSelect(stationAllTemp, element);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });


searchBtn.addEventListener("click", e => {
    e.preventDefault();
    let stationId = cityList.options[cityList.selectedIndex].value;
    let selectedLocation = setLocalization(stationId);
    searchValues(stationId);
    searchIndexLevel(stationId);
    let isSaved = historyList.some(e => e.stationId == stationId);
    if (!isSaved) {
        saveToLocalStorage(stationId, selectedLocation[0], selectedLocation[1]);
        new Item(stationId, selectedLocation[0], selectedLocation[1]);
    }
})

function setLocalization(stationId) {
    const selectedLocation = [];
    stationAllTemp.some(el => {
        if (el.stationId == stationId) {
            city.innerHTML = el.stationName;
            selectedLocation.push(el.stationName);
            selectedLocation.push(el.provinceName.toLowerCase());
        }
        return el.stationId == stationId; 
    })
    return selectedLocation;
}

function saveToLocalStorage(id, stationName, provinceName) {
    historyList.push(new Station(id, stationName, provinceName));
    localStorage.setItem("history", historyList.map( e => JSON.stringify(e)).join(";"));
}

function searchValues(stationId) {
    const sensorsUrl = `https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/sensors/${stationId}`;

    fetch(sensorsUrl, {
        method: 'GET',
        mode: 'cors'
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            setParameters(response);
        })
        .catch((err) => {
            console.log(err.message);
        });
}

function searchIndexLevel(stationId) {

    const sensorsUrl = `https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/${stationId}`;

    fetch(sensorsUrl, {
        method: 'GET',
        mode: 'cors'
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            let indexLevel = response.stIndexLevel.indexLevelName;
            setIndexLevel(indexLevel);
        })
        .catch((err) => {
            console.log(err.message);
        });
}

