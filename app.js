const options = document.getElementsByTagName('select')[0];
console.log(options)
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
            console.log(element.id + " " + element.stationName + " " + element.city.commune.provinceName)
            stationAllTemp.push(new Station(element.id, element.stationName, element.city.commune.provinceName));
            var option = document.createElement("option");
            option.setAttribute("value", element.id);
            var node = document.createTextNode(`${element.stationName} ${element.city.commune.provinceName}`);
            option.appendChild(node);
            options.appendChild(option);
        });

        return stationAllTemp;
    })
    .catch((err) => {
        console.log(err.message);
    });
