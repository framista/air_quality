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