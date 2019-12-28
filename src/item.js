export default class Item {

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