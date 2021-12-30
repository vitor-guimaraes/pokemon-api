const XMLHttpRequest = require('xhr2');
const Http = new XMLHttpRequest();

// const mongoose = require('mongoose');
// const express = require('express');
// const { Http2ServerResponse } = require('http2');
// const { object } = require('webidl-conversions');
// const app = express();
// const router = express.Router();

var bodyParser = require('body-parser');

const port = 3000;

//CONNECT TO MONGODB

const dbUser = 'admin';
const dbPassword = 'password1234';
const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.8bj40.mongodb.net/pokedex?retryWrites=true&w=majority`;

const {MongoClient} = require('mongodb');
const client = new MongoClient(dbURI);  

 const mongoConnection = {
    dbUser,
    dbPassword,
    dbURI,
    client
};


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
            .then (listPokemons(21));
            // .then (importIntoDB(5));
            
        // await importIntoDB(1);

        // await createListing();


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
    
    Http.onreadystatechange = (e) => {
        //readyState === 4 -> fim da operacao 
        if(Http.readyState === 4){
            let resp = Http.responseText;
            resp = JSON.parse(resp);
            console.log(resp)
            return resp.results;
        }
    };
    Http.send();
}


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log('Databases:');
    databasesList.databases.forEach(db => {if (db.name == 'pokedex')
                                             console.log(` - ${db.name}`)
                                            });
};

//NAO TA FUNCIONANDO
async function listCollections(client){
    databasesList = await client.db().getCollectionNames() ;
 
    console.log('Collections:');
    databasesList.databases.collections.forEach(collection => console.log(` - ${collection.name}`));
};

async function createListing(client, resp){
    const result = await client.db('pokedex').collection('pokemons').insertOne(resp);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}


//IMPORT INTO DB

async function importIntoDB(results){
      //TODO - Fazer um map do results e salvar no mongo

        // const result = client.db('pokedex').collection('pokemons').insertOne(resp);
        // console.log(`New listing created with the following id: ${result.insertedId}`);

};
