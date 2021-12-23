const http = require('http');
const express = require('express');
const app = express();

const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
const port = 3000;


async function connect2url(){
    

    try{
        var server = app.listen(3000);
        console.log('listening on port 3000');
    } catch (err){
        console.error(err);
    } finally {
        server.close();
        console.log('closing connection on port 3000');
    }

}

connect2url();