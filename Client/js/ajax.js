
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






