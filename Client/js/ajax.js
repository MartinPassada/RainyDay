
/**Trae @param movies es un array con [{object}] lo parsea y ejecuta funciones createList y createGenreDivs */
function getLatestMovies(success, failure) {

    req = new XMLHttpRequest();

    req.onload = function() {

        let respObj = JSON.parse(this.responseText);

        if (this.status == 200) {
           
            success(respObj);
            
        } else {
           
            failure(respObj.error);
        }

    }

    req.open("GET", "/latestmovies");
    req.send();

}

function getGenres(success, failure) {

    req = new XMLHttpRequest();

    req.onload = function() {

        let respObj = JSON.parse(this.responseText);

        if (this.status == 200) {
           
            success(respObj);
        } else {
           
            failure(respObj.error);
        }

    }

    req.open("GET", "/genres");
    req.send();

}
 
function getSearchByGenre(success, failure, searchparameter) {

    req = new XMLHttpRequest();

    req.onload = function() {

        let respObj = JSON.parse(this.responseText);

        if (this.status == 200) {
           
            success(respObj, searchparameter);
        } else {
           
            failure(respObj.error);
        }

    }

    req.open("GET", `/searchbygenre?genre=${searchparameter}`);
    req.send();

}

function getMostViewedMovies(success, failure) {

    req = new XMLHttpRequest();

    req.onload = function() {

        let respObj = JSON.parse(this.responseText);

        if (this.status == 200) {
           
            success(respObj);
        } else {
           
            failure(respObj.error);
        }

    }

    req.open("GET", "/mostviewed");
    req.send();

}

function getRankedMovies(success, failure) {

    req = new XMLHttpRequest();

    req.onload = function() {

        let respObj = JSON.parse(this.responseText);

        if (this.status == 200) {
           
            success(respObj);
        } else {
           
            failure(respObj.error);
        }

    }

    req.open("GET", "/ranked");
    req.send();

}

function checkSessionStatus(success, failure) {

    req = new XMLHttpRequest();

    req.onload = function() {

        let respObj = this.responseText;

        if (this.status == 200) {
           
            success(respObj);

        }else if (this.status == 403){
            // si no esta logueado, igual cambio el nombre de usuario a "usuario anonimo"

            success(respObj)

        }else{

            failure(respObj.error);
        }
    }

    req.open("GET", "/checkSessionStatus");
    req.send();

}

function logOut(success, failure) {

    req = new XMLHttpRequest();

    req.onload = function() {

        if (this.status == 200) {
           
            window.location.replace(req.responseURL)

        }else if (this.status == 403){
            
            console.log("no se pudo desloguear");


        }else{

            failure(respObj.error);
        }
    }

    req.open("GET", "/logOut");
    req.send();

}










