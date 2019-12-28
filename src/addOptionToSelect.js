export default function addOptionToSelect(stationAllTemp, element) {
    var last = stationAllTemp[stationAllTemp.length - 1];
    var option = document.createElement("option");
    option.setAttribute("value", element.id);
    var node = document.createTextNode(`${last.stationName} ${last.provinceName}`);
    option.appendChild(node);
    cityList.appendChild(option);
}