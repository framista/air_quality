/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar app = {\n    pages: [],\n    show: new Event('show'),\n    init: function init() {\n        app.pages = document.querySelectorAll('.page');\n        app.pages.forEach(function (pg) {\n            pg.addEventListener('show', app.pageShown);\n        });\n\n        document.querySelectorAll('.nav-link').forEach(function (link) {\n            link.addEventListener('click', app.nav); //Dla więcej niż jednej strony \"nav-link\" będzie klasą obiektów nawigacji\n        });\n        history.replaceState({}, 'Home', '#home');\n        window.addEventListener('popstate', app.poppin);\n    },\n    nav: function nav(ev) {\n        ev.preventDefault();\n        var currentPage = ev.target.getAttribute('data-target'); //W przypadku istnienia więcej niż 1 strony, \"data-target\" będzie nową właściwością z wartością, która jest nazwą id strony (np. strona ma id \"oNas\", to \"data-target=\"oNas\")\n        document.querySelector('.active').classList.remove('active');\n        document.getElementById(currentPage).classList.add('active');\n        console.log(currentPage);\n        history.pushState({}, currentPage, '#' + currentPage);\n        document.getElementById(currentPage).dispatchEvent(app.show);\n    },\n    pageShown: function pageShown(ev) {\n        console.log('Page', ev.target.id, 'is displaying'); //aktywuje się przy zmianie strony\n    },\n    poppin: function poppin(ev) {\n        console.log(location.hash, 'popstate event');\n        //Aktywuje sie przy kliknięciu nawigacji\n        //Coś tam, żeby nieistniejąca strona się ładowała przy powrocie:\n        var hash = location.hash.replace('#', '');\n        document.querySelector('.active').classList.remove('active');\n        document.getElementById(hash).classList.add('active');\n        console.log(hash);\n        document.getElementById(hash).dispatchEvent(app.show);\n    }\n};\n\ndocument.addEventListener('DOMContentLoaded', app.init);\n\nvar cityList = document.getElementsByTagName('select')[0];\nvar searchBtn = document.querySelector('input[type=submit]');\nvar city = document.getElementsByClassName('location')[0];\nvar historyBox = document.querySelector('aside');\nvar historyLocal = localStorage.getItem(\"history\");\nvar historyList = [];\nif (historyLocal) {\n    historyLocal.split(\";\").forEach(function (e) {\n        historyList.push(JSON.parse(e));\n    });\n}\n\nvar Station = function Station(id, stationName, provinceName) {\n    _classCallCheck(this, Station);\n\n    this.stationId = id;\n    this.stationName = stationName;\n    this.provinceName = provinceName;\n};\n\nvar item = function () {\n    function item(stationID, stationCity, stationProvince) {\n        _classCallCheck(this, item);\n\n        this.createDiv(stationID, stationCity, stationProvince);\n    }\n\n    _createClass(item, [{\n        key: 'createDiv',\n        value: function createDiv(stationId, stationCity, stationProvince) {\n            var _this = this;\n\n            var stationCity_h2 = document.createElement('h2');\n            stationCity_h2.innerHTML = stationCity;\n            var stationProvince_h4 = document.createElement('h4');\n            stationProvince_h4.innerHTML = stationProvince;\n            var locationInformationBox = document.createElement('div');\n            locationInformationBox.id = stationId;\n            locationInformationBox.classList.add('locationInformation');\n            var parameterBox = document.createElement('div');\n            var removeBtn = document.createElement('button');\n            removeBtn.classList.add('aside__btn');\n            removeBtn.innerHTML = \"X\";\n\n            historyBox.appendChild(locationInformationBox);\n            parameterBox.appendChild(stationCity_h2);\n            parameterBox.appendChild(stationProvince_h4);\n            locationInformationBox.appendChild(parameterBox);\n            locationInformationBox.appendChild(removeBtn);\n\n            removeBtn.addEventListener('click', function (e) {\n                return _this.remove(e, locationInformationBox);\n            });\n            locationInformationBox.addEventListener('click', function (e) {\n                return _this.showParameter(e);\n            });\n        }\n    }, {\n        key: 'remove',\n        value: function remove(e, item) {\n            e.stopPropagation();\n            var stationId = e.target.parentNode.id;\n            historyBox.removeChild(item);\n            var index = historyList.findIndex(function (e) {\n                return e.stationId === stationId;\n            });\n            historyList.splice(index, 1);\n            localStorage.setItem(\"history\", historyList.map(function (e) {\n                return JSON.stringify(e);\n            }).join(\";\"));\n        }\n    }, {\n        key: 'showParameter',\n        value: function showParameter(e) {\n            var stationId = e.currentTarget.id;\n            setLocalization(stationId);\n            searchValues(stationId);\n            searchIndexLevel(stationId);\n        }\n    }]);\n\n    return item;\n}();\n\n// add item from localStorage to aside\n\n\nif (historyLocal) {\n    historyList.forEach(function (e) {\n        return new item(e.stationId, e.stationName, e.provinceName);\n    });\n}\n\n// find all station with station name and province name\nvar stationAllUrl = 'https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/findAll';\nvar stationAllTemp = [];\nfetch(stationAllUrl, {\n    method: 'GET',\n    mode: 'cors'\n}).then(function (response) {\n    if (response.ok) {\n        return response.json();\n    }\n}).then(function (response) {\n    response.forEach(function (element) {\n        // not every of cities has province name\n        element.city !== null ? stationAllTemp.push(new Station(element.id, element.stationName, element.city.commune.provinceName)) : stationAllTemp.push(new Station(element.id, element.stationName, \"--------\"));\n        addOptionToSelect(stationAllTemp, element);\n    });\n}).catch(function (err) {\n    console.log(err.message);\n});\n\nfunction addOptionToSelect(stationAllTemp, element) {\n    var last = stationAllTemp[stationAllTemp.length - 1];\n    var option = document.createElement(\"option\");\n    option.setAttribute(\"value\", element.id);\n    var node = document.createTextNode(last.stationName + ' ' + last.provinceName);\n    option.appendChild(node);\n    cityList.appendChild(option);\n}\n\nsearchBtn.addEventListener(\"click\", function (e) {\n    e.preventDefault();\n    var stationId = cityList.options[cityList.selectedIndex].value;\n    var selectedLocation = setLocalization(stationId);\n    searchValues(stationId);\n    searchIndexLevel(stationId);\n    var isSaved = historyList.some(function (e) {\n        return e.stationId == stationId;\n    });\n    if (!isSaved) {\n        saveToLocalStorage(stationId, selectedLocation[0], selectedLocation[1]);\n        new item(stationId, selectedLocation[0], selectedLocation[1]);\n    }\n});\n\nfunction setLocalization(stationId) {\n    var selectedLocation = [];\n    stationAllTemp.some(function (el) {\n        if (el.stationId == stationId) {\n            city.innerHTML = el.stationName;\n            selectedLocation.push(el.stationName);\n            selectedLocation.push(el.provinceName.toLowerCase());\n        }\n        return el.stationId == stationId;\n    });\n    return selectedLocation;\n}\n\nfunction saveToLocalStorage(id, stationName, provinceName) {\n    historyList.push(new Station(id, stationName, provinceName));\n    localStorage.setItem(\"history\", historyList.map(function (e) {\n        return JSON.stringify(e);\n    }).join(\";\"));\n}\n\nfunction searchValues(stationId) {\n    var sensorsUrl = 'https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/sensors/' + stationId;\n\n    fetch(sensorsUrl, {\n        method: 'GET',\n        mode: 'cors'\n    }).then(function (response) {\n        if (response.ok) {\n            return response.json();\n        }\n    }).then(function (response) {\n        setParameters(response);\n    }).catch(function (err) {\n        console.log(err.message);\n    });\n}\n\nfunction searchIndexLevel(stationId) {\n\n    var sensorsUrl = 'https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/' + stationId;\n\n    fetch(sensorsUrl, {\n        method: 'GET',\n        mode: 'cors'\n    }).then(function (response) {\n        if (response.ok) {\n            return response.json();\n        }\n    }).then(function (response) {\n        var indexLevel = response.stIndexLevel.indexLevelName;\n        setIndexLevel(indexLevel);\n    }).catch(function (err) {\n        console.log(err.message);\n    });\n}\n\nfunction setParameters(response) {\n    var paramsSpan = document.getElementsByClassName('section--value');\n    var paramAvailable = [];\n    response.forEach(function (element) {\n        if (element.param.paramFormula === 'PM10') {\n            paramsSpan[0].innerHTML = element.param.idParam;\n        }\n        if (element.param.paramFormula === 'PM2.5') {\n            paramsSpan[1].innerHTML = element.param.idParam;\n        }\n        if (element.param.paramFormula === 'CO') {\n            paramsSpan[2].innerHTML = element.param.idParam;\n        }\n        if (element.param.paramFormula === 'SO2') {\n            paramsSpan[3].innerHTML = element.param.idParam;\n        }\n        if (element.param.paramFormula === 'NO2') {\n            paramsSpan[4].innerHTML = element.param.idParam;\n        }\n        if (element.param.paramFormula === 'C6H6') {\n            paramsSpan[5].innerHTML = element.param.idParam;\n        }\n        paramAvailable.push(element.param.paramFormula);\n    });\n\n    if (!paramAvailable.includes(\"PM10\")) paramsSpan[0].innerHTML = \"---\";\n    if (!paramAvailable.includes(\"PM2.5\")) paramsSpan[1].innerHTML = \"---\";\n    if (!paramAvailable.includes(\"CO\")) paramsSpan[2].innerHTML = \"---\";\n    if (!paramAvailable.includes(\"SO2\")) paramsSpan[3].innerHTML = \"---\";\n    if (!paramAvailable.includes(\"NO2\")) paramsSpan[4].innerHTML = \"---\";\n    if (!paramAvailable.includes(\"C6H6\")) paramsSpan[5].innerHTML = \"---\";\n}\n\nfunction setIndexLevel(indexLevel) {\n    var indexLevelIcon = document.getElementsByClassName('img_level')[0];\n    switch (indexLevel) {\n        case \"Bardzo dobry\":\n            indexLevelIcon.src = \"css/img/verygood.jpg\";\n            break;\n        case \"Dobry\":\n            indexLevelIcon.src = \"css/img/good.jpg\";\n            break;\n        case \"Umiarkowany\":\n            indexLevelIcon.src = \"css/img/mild.jpg\";\n            break;\n        case \"Zły\":\n            indexLevelIcon.src = \"css/img/bad.jpg\";\n            break;\n        case \"Bardzo zły\":\n            indexLevelIcon.src = \"css/img/terrible.jpg\";\n            break;\n        default:\n            indexLevelIcon.src = \"css/img/nodata.jpg\";\n    }\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });