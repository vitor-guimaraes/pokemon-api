// import { mongoConnection } from "./app"


const fetchUrl = require("fetch").fetchUrl;

const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

fetchUrl(url, function(error, meta, body) {
    if (!error) {
        var data = new String();
        data = JSON.parse(body)
        // Do something with data
        console.log(data)
    }
});
       