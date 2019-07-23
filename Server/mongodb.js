module.exports.getLatestMovies = getLatestMovies;
module.exports.getGenres = getGenres;
module.exports.searchByGenres = searchByGenres;
module.exports.getMovieInfo = getMovieInfo;
module.exports.getMostWievedMovies = getMostWievedMovies;
module.exports.getRankedMovies = getRankedMovies;


const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017';




function getLatestMovies(cbOK) { 
    
    mongoClient.connect(mongoURL, function(err, client) {

        if (err) {            
            // Error en la conexión
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find().sort({AddedDate:-1}).limit(20).toArray((err, data) => {
                cbOK(data);
            });
        }

        // Cierro la conexión
        client.close();
    });



}

function getGenres(cbOK) { 
    
    mongoClient.connect(mongoURL, function(err, client) {

        if (err) {            
            // Error en la conexión
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find().project({"genre": 1.0, "_id": 0.0}).toArray((err, data) => {
                cbOK(data);
            });
        }

        // Cierro la conexión
        client.close();
    });



}

function searchByGenres(cbOK, searchparameter) { 
    mongoClient.connect(mongoURL, function(err, client) {

        if (err) {            
            // Error en la conexión
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find ( { genre: new RegExp(searchparameter) } ).toArray((err, data) => {
                cbOK(data);
            });
        }

        // Cierro la conexión
        client.close();
    });



}

function getMovieInfo(cbOK, searchparameter) { 
    mongoClient.connect(mongoURL, function(err, client) {
        var ObjectID = require('mongodb').ObjectID;

        if (err) {            
            // Error en la conexión
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find ({"_id": ObjectID(searchparameter)}).toArray((err, data) => {
                cbOK(data);
            });
        }

        // Cierro la conexión
        client.close();
    });



}

function getMostWievedMovies(cbOK){
    mongoClient.connect(mongoURL, function(err, client) {

        if (err) {            
            // Error en la conexión
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find().sort({views:-1}).toArray((err, data) => {
                cbOK(data);
            });
        }

        // Cierro la conexión
        client.close();
    });
}

function getRankedMovies(cbOK){
    mongoClient.connect(mongoURL, function(err, client) {

        if (err) {            
            // Error en la conexión
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find().sort({average:-1}).toArray((err, data) => {
                cbOK(data);
            });
        }

        // Cierro la conexión
        client.close();
    });
}
    