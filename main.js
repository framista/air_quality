const fetch = require('node-fetch');
const mainURL = 'http://api.gios.gov.pl/pjp-api/rest/';
const getIndexURL = 'aqindex/getIndex/';


async function fetchIndex(url) {
    const response = await fetch(url);
    const json = await response.json();
   
    console.log(json);
  }
   
  fetchIndex('http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/129');