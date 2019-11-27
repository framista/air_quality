const fetch = require('node-fetch');
const mainURL = 'http://api.gios.gov.pl/pjp-api/rest/';
const getIndexURL = 'aqindex/getIndex/';

//TODO: finish object creation
function station(name){
  this.name = name;
  this.stationId = 0;
  this.index = '';
  this.param = [];
}


async function fetchIndex(url) {
    const response = await fetch(url);
    const json = await response.json();
    station.index = json.stIndexLevel.indexLevelName;
    
    //TODO: remove console.log
    console.log(json);
    console.log(station.index);
   
  }
   
fetchIndex('http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/129');
