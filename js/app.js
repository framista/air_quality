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
    setLocalization(stationId);
    searchValues(stationId);
    searchIndexLevel(stationId);
})

function setLocalization(stationId) {
    stationAllTemp.some(el => {
        if (el.stationId == stationId) {
            city.innerHTML = el.stationName;
        }
        return el.stationId == stationId; // break loop, when found
    })
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
    console.log(indexLevel)
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