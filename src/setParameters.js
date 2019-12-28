export default function setParameters(response) {
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
