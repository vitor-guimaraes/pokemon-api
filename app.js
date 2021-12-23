const XMLHttpRequest = require('xhr2');
const Http = new XMLHttpRequest();

const express = require('express');
const app = express();
const router = express.Router();


const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const port = 3000;



Http.open("GET", url);
Http.send();
Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
  }

async function connect2url(){

    try{
        var server = app.listen(3000);
        console.log('listening on port 3000');
        console.log(url);

    } catch (err){
        console.error(err);

    } finally {
        server.close();
        console.log('closing connection on port 3000');
    }

}
