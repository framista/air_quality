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

class Station {
    constructor(id, stationName, provinceName) {
        this.stationId = id;
        this.stationName = stationName;
        this.provinceName = provinceName;
    }
}

class item {

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

// add item from localStorage to aside
if (historyLocal) {
    historyList.forEach(e => new item(e.stationId, e.stationName, e.provinceName));
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

function addOptionToSelect(stationAllTemp, element) {
    var last = stationAllTemp[stationAllTemp.length - 1];
    var option = document.createElement("option");
    option.setAttribute("value", element.id);
    var node = document.createTextNode(`${last.stationName} ${last.provinceName}`);
    option.appendChild(node);
    cityList.appendChild(option);
}

searchBtn.addEventListener("click", e => {
    e.preventDefault();
    let stationId = cityList.options[cityList.selectedIndex].value;
    let selectedLocation = setLocalization(stationId);
    searchValues(stationId);
    searchIndexLevel(stationId);
    let isSaved = historyList.some(e => e.stationId == stationId);
    if (!isSaved) {
        saveToLocalStorage(stationId, selectedLocation[0], selectedLocation[1]);
        new item(stationId, selectedLocation[0], selectedLocation[1]);
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

function setParameters(response) {
    const paramsSpan = document.getElementsByClassName('section--value');
    const paramAvailable = [];
    response.forEach(element => {
        if (element.param.paramFormula === 'PM10') {
            paramsSpan[0].innerHTML = element.param.idParam;
        }
        if (element.param.paramFormula === 'PM2.5') {
            paramsSpan[1].innerHTML = element.param.idParam;
        }
        if (element.param.paramFormula === 'CO') {
            paramsSpan[2].innerHTML = element.param.idParam;
        }
        if (element.param.paramFormula === 'SO2') {
            paramsSpan[3].innerHTML = element.param.idParam;
        }
        if (element.param.paramFormula === 'NO2') {
            paramsSpan[4].innerHTML = element.param.idParam;
        }
        if (element.param.paramFormula === 'C6H6') {
            paramsSpan[5].innerHTML = element.param.idParam;
        }
        paramAvailable.push(element.param.paramFormula);
    });

    if (!paramAvailable.includes("PM10")) paramsSpan[0].innerHTML = "---";
    if (!paramAvailable.includes("PM2.5")) paramsSpan[1].innerHTML = "---";
    if (!paramAvailable.includes("CO")) paramsSpan[2].innerHTML = "---";
    if (!paramAvailable.includes("SO2")) paramsSpan[3].innerHTML = "---";
    if (!paramAvailable.includes("NO2")) paramsSpan[4].innerHTML = "---";
    if (!paramAvailable.includes("C6H6")) paramsSpan[5].innerHTML = "---";

}

function setIndexLevel(indexLevel) {
    const indexLevelIcon = document.getElementsByClassName('img_level')[0];
    switch (indexLevel) {
        case "Bardzo dobry":
            indexLevelIcon.src = "css/img/verygood.jpg";
            break;
        case "Dobry":
            indexLevelIcon.src = "css/img/good.jpg";
            break;
        case "Umiarkowany":
            indexLevelIcon.src = "css/img/mild.jpg";
            break;
        case "Zły":
            indexLevelIcon.src = "css/img/bad.jpg";
            break;
        case "Bardzo zły":
            indexLevelIcon.src = "css/img/terrible.jpg";
            break;
        default:
            indexLevelIcon.src = "css/img/nodata.jpg";
    }
}


