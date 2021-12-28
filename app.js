const XMLHttpRequest = require('xhr2');
const Http = new XMLHttpRequest();

const mongoose = require('mongoose');




const express = require('express');
const { Http2ServerResponse } = require('http2');
const { object } = require('webidl-conversions');
const app = express();
const router = express.Router();


const port = 3000;

//CONNECT TO MONGODB
const dbUser = 'admin';
const dbPassword = 'password1234';
const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.8bj40.mongodb.net/pokedex?retryWrites=true&w=majority`;
const {MongoClient} = require('mongodb');
const client = new MongoClient(dbURI);  


connect2url();
// getPokemon('ditto');
// getPokemonName('ditto');
// getPokemonName('?limit=151');

// listPokemons(5);

// createListing();


async function connect2url(){

    try{
        // var server = app.listen(3000);
        // console.log('listening on port 3000');
        // console.log(url);        
        
        // mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        // .then(console.log('connected to pokedex'))
        // .catch((err) => console.log(err));

        await client.connect()
        .then (result = console.log('connected to pokedex\n')) 
        .then (listPokemons(5));



    } catch (err){
        console.error(err);

    } finally {
        // server.close();
        // console.log('closing connection on port 3000');        
        // .then(mongoose.connection.close());

        console.log('\nclosing connection on pokedex\n');
        client.close();
        
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

async function listPokemons(number){
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${number}`;

    console.log(`First ${number} Pokemons are: `);

    Http.open('get', url);
    Http.send();
    Http.onreadystatechange = (e) => {
        const resp = Http.responseText;
        console.log(resp);
    };    
}

async function createListing(connect2url, newListing){
    const result = await connect2url.db("pokedex").collection("pokemons").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}