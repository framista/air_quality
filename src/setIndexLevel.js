export default function setIndexLevel(indexLevel) {
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


