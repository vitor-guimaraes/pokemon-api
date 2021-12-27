const XMLHttpRequest = require('xhr2');
const Http = new XMLHttpRequest();

const mongoose = require('mongoose');


const express = require('express');
const app = express();
const router = express.Router();


const port = 3000;




connect2url();
getPokemon('ditto');

async function connect2url(){

    try{
        // var server = app.listen(3000);
        // console.log('listening on port 3000');
        // console.log(url);

        const dbUser = 'admin';
        const dbPassword = 'password1234';
        const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.8bj40.mongodb.net/pokedex?retryWrites=true&w=majority`;
        
        mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(console.log('connected to pokedex'))
        .catch((err) => console.log(err));

    } catch (err){
        console.error(err);

    } finally {
        // server.close();
        // console.log('closing connection on port 3000');
        await getPokemon()
        .then(mongoose.connection.close());
        console.log('closing connection on pokedex');
    }

}

//GET
async function getPokemon(pokemon){

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;


    try {
    Http.open('GET', url);
    Http.send();
    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
      };
    } catch (err) {
        console.error(err);
    }
};
