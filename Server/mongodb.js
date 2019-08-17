module.exports.getLatestMovies = getLatestMovies;
module.exports.getGenres = getGenres;
module.exports.searchByGenres = searchByGenres;
module.exports.getMovieInfo = getMovieInfo;
module.exports.getMostWievedMovies = getMostWievedMovies;
module.exports.getRankedMovies = getRankedMovies;
module.exports.validateLogin = validateLogin;
module.exports.addNewUser = addNewUser;


const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017';
const fs = require("fs");
const path = require('path');
const hash = require('./hash.js');




function getLatestMovies(cbOK) { 
    
    mongoClient.connect(mongoURL, function(err, client) {

        if (err) {            
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find().sort({AddedDate:-1}).limit(20).toArray((err, data) => {
                cbOK(data);
            });
        }

    
        client.close();
    });



}

function getGenres(cbOK) { 
    
    mongoClient.connect(mongoURL, function(err, client) {

        if (err) {            
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find().project({"genre": 1.0, "_id": 0.0}).toArray((err, data) => {
                cbOK(data);
            });
        }

        
        client.close();
    });



}

function searchByGenres(cbOK, searchparameter) { 
    mongoClient.connect(mongoURL, function(err, client) {

        if (err) {            
            
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find ( { genre: new RegExp(searchparameter) } ).toArray((err, data) => {
                cbOK(data);
            });
        }

        
        client.close();
    });

}

function getMovieInfo(cbOK, searchparameter) { 
    mongoClient.connect(mongoURL, function(err, client) {
        var ObjectID = require('mongodb').ObjectID;

        if (err) {            
           
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find ({"_id": ObjectID(searchparameter)}).toArray((err, data) => {
                var videoPath = `${data[0].moviePagePath}${data[0].name}.${data[0].filetype}`;
                try {
                    if(fs.readFileSync(path.resolve(__dirname, `../Client${videoPath}`), {})){
                        data[0].exist = true;
                    }
                } catch (err) {
                    console.log(err);
                    if(err.code === 'ENOENT'){
                        data[0].exist = false;
                        
                    }
                }
                cbOK(data);
            });
        }
        client.close();
    });

}

function getMostWievedMovies(cbOK){
    mongoClient.connect(mongoURL, function(err, client) {

        if (err) {            
            
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find().sort({views:-1}).toArray((err, data) => {
                cbOK(data);
            });
        }

        
        client.close();
    });
}

function getRankedMovies(cbOK){
    mongoClient.connect(mongoURL, function(err, client) {

        if (err) {            
            
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("moviesdatabase");
            collection.find().sort({average:-1}).toArray((err, data) => {
                cbOK(data);
            });
        }

        
        client.close();
    });
}

// LOGIN

function validateLogin(loginData, cbOK){
    mongoClient.connect(mongoURL, function(err, client) {
        if (err) {            
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("users");
            collection.find({"$or":[{"email":`${loginData.user}`}, {"userName":`${loginData.user}`}]}).limit(1).toArray((err, data) => {
                console.log(data);
                if (data == ''){
                    //console.log("no se encontraron datos de login para usuario ni email");
                    cbOK(403);
                    
                }else if (data[0].email === loginData.user || data[0].userName === loginData.user && data[0].password === loginData.password){

                    //console.log('todo correcto');
                    cbOK(`${data[0].userName}`);

                }else{

                    cbOK(403);
                }       
            });
        }
        
        client.close();
    });
}

// SIGNUP

function addNewUser(userData, cbOK){
    mongoClient.connect(mongoURL, function(err, client) {
        if (err) {             
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            var db = client.db("admin");
            var collection = db.collection("users");
            collection.find({"$or":[{"email":`${userData.email}`}, {"userName":`${userData.userName}`}]}).limit(1).toArray((err, data) => {
        
                if (data == ''){

                    collection.insertOne( { email: `${userData.email}`, userName: `${userData.userName}`,
                    password: `${userData.password1}`, genreLikes: `${userData.genreLikes}`});
                    
                    //console.log("como el usuario o mail no se encontro, ya fue agregado a la DB");

                    cbOK(`${userData.userName}`);
                    
                }else if (data[0].email === userData.email){
                
                    //console.log("El email ya esta en la DB");
                    cbOK(403);

                }else if (data[0].userName === userData.userName){
                    //console.log("El nombre de usuario esta en uso");
                    cbOK(999);

                }        
            });
        }
        
        //client.close();
    });
}


    