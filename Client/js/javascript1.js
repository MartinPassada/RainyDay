var galleryDiv = document.getElementById("gallery");
var genreDiv = document.getElementById('genreButtonsDiv');
var linkMostWieved = document.getElementById("linkMostViewed");
var linkRanking = document.getElementById("linkRanking");

linkRanking.addEventListener("click", function() {
    getRankedMovies(
        response => { showRankedMovies(response); },
        error => showError(error));
});


linkMostWieved.addEventListener("click", function() {
    getMostViewedMovies(
        response => { showMostViewedMovies(response); },
        error => showError(error));
});

getLatestMovies(
    response => {
        createMovieList(response);
    },
    error => showError(error)
);

getGenres(
    response => {
        createGenreList(response);
    },
    error => showError(error)
);



/**
 * Función que crea una lista de películas en el body
 * @param movies es un array con [{object}] los trae la funcion getLatestMovies
 */

function createMovieList(movies) {

    var movieList = document.createElement("ul");
    movieList.setAttribute("class", "movieList");
    movieList.setAttribute("id", "movieList");

    for (let i = 0; i < movies.length; i++) {
        let divImage = document.createElement("div");
        divImage.setAttribute("class", "divImage");
        anchor = document.createElement("a");
        anchor.href = movies[i].moviePagePath + movies[i]._id;
        let link = document.createElement("li");
        let image = document.createElement("img");
        image.src = movies[i].imagePath;
        image.width = 160;
        image.height = 242;
        let movieName = document.createTextNode(movies[i].name);
        let year = document.createElement("span");
        year.setAttribute("class", "movieYear");
        year.innerHTML = movies[i].year;
        //appends
        divImage.appendChild(image);
        divImage.append(year);
        divImage.append(movieName);
        anchor.appendChild(divImage);
        link.appendChild(anchor);
        movieList.appendChild(link);
    }
    galleryDiv.appendChild(movieList);
}

/**
 * Función que crea una lista de divs para buscar por genero al hacerles click (son divs con imagenes)
 * @param genres es un array con [{object}] los trae la funcion getData
 */
function createGenreList(genres) {

    //filtro los generos.
    var genreArray = [];
    for (let i = 0; i < genres.length; i++) {
        genreArray.push(...(genres[i].genre.split(',')));
    }
    genreArray = genreArray.filter(function(itemValue, itemIndex, arraySelf) { return genreArray.indexOf(itemValue) === itemIndex });
    //armo una lista
    var genreList = document.createElement('ul');
    genreList.setAttribute("class", "genreList");
    genreList.setAttribute("id", "genreList");

    // armo botones
    for (let i = 0; i < genreArray.length; i++) {

        let link = document.createElement("li");
        let divButtonWithImage = document.createElement("div");
        divButtonWithImage.setAttribute("class", "divButtonWithImage");
        let img = document.createElement("img");
        imagePath = `img/${genreArray[i]}.jpg`;
        img.src = imagePath;
        img.maxwidth = 160;
        img.maxheight = 160;
        genreList.appendChild(link);
        link.appendChild(divButtonWithImage);
        let name = document.createElement("h3");
        name = genreArray[i];
        divButtonWithImage.append(img);
        divButtonWithImage.append(name);
        divButtonWithImage.addEventListener("click", function() {
            getSearchByGenre(
                response => { FilteredMovieList(response, genreArray[i]); },
                error => showError(error),
                genreArray[i]);
        });


    }
    genreDiv.appendChild(genreList);

}

/** 
 * funcion que arma una lista con peliculas por genero buscado y las muestra en el home
 * @param searchresult es un array con [{object}] los trae la funcion getsearchByGenre
 */
function FilteredMovieList(searchresult, genretitle) {
    galleryDiv.innerHTML = "";
    let galleryTitle = document.getElementById("galleryHeaderTitle");
    galleryTitle.innerHTML = "";
    galleryTitle.innerHTML = genretitle;

    var movieList = document.createElement("ul");
    movieList.setAttribute("class", "movieList");
    movieList.setAttribute("id", "movieList");

    for (let i = 0; i < searchresult.length; i++) {
        let divImage = document.createElement("div");
        divImage.setAttribute("class", "divImage");
        anchor = document.createElement("a");
        anchor.href = searchresult[i].moviePagePath + searchresult[i]._id;
        let link = document.createElement("li");
        let image = document.createElement("img");
        image.src = searchresult[i].imagePath;
        image.width = 160;
        image.height = 242;
        let movieName = document.createTextNode(searchresult[i].name);
        let year = document.createElement("span");
        year.setAttribute("class", "movieYear");
        year.innerHTML = searchresult[i].year;
        //appends
        divImage.appendChild(image);
        divImage.append(year);
        divImage.append(movieName);
        anchor.appendChild(divImage);
        link.appendChild(anchor);
        movieList.appendChild(link);
    }
    galleryDiv.appendChild(movieList);
}


/**
 * Muestra un mensaje de error por consola
 * 
 * @param {string} strError 
 */
function showError(strError) {
    console.log(`ERROR: ${strError}`);
}

function showMostViewedMovies(mostWieved) {
    galleryDiv.innerHTML = "";
    var movieList = document.createElement("ul");
    movieList.setAttribute("class", "movieList");
    movieList.setAttribute("id", "movieList");

    for (let i = 0; i < mostWieved.length; i++) {
        let divImage = document.createElement("div");
        divImage.setAttribute("class", "divImage");
        anchor = document.createElement("a");
        anchor.href = mostWieved[i].moviePagePath + mostWieved[i]._id;
        let link = document.createElement("li");
        let image = document.createElement("img");
        image.src = mostWieved[i].imagePath;
        image.width = 160;
        image.height = 242;
        let movieName = document.createTextNode(mostWieved[i].name);
        let year = document.createElement("span");
        year.setAttribute("class", "movieYear");
        year.innerHTML = mostWieved[i].year;
        //appends
        divImage.appendChild(image);
        divImage.append(year);
        divImage.append(movieName);
        anchor.appendChild(divImage);
        link.appendChild(anchor);
        movieList.appendChild(link);
    }
    galleryDiv.appendChild(movieList);
}

function showRankedMovies(rankedMovies) {
    galleryDiv.innerHTML = "";
    var movieList = document.createElement("ul");
    movieList.setAttribute("class", "movieList");
    movieList.setAttribute("id", "movieList");

    for (let i = 0; i < rankedMovies.length; i++) {
        let divImage = document.createElement("div");
        divImage.setAttribute("class", "divImage");
        anchor = document.createElement("a");
        anchor.href = rankedMovies[i].moviePagePath + rankedMovies[i]._id;
        let link = document.createElement("li");
        let image = document.createElement("img");
        image.src = rankedMovies[i].imagePath;
        image.width = 160;
        image.height = 242;
        let movieName = document.createTextNode(rankedMovies[i].name);
        let year = document.createElement("span");
        year.setAttribute("class", "movieYear");
        year.innerHTML = rankedMovies[i].year;
        //appends
        divImage.appendChild(image);
        divImage.append(year);
        divImage.append(movieName);
        anchor.appendChild(divImage);
        link.appendChild(anchor);
        movieList.appendChild(link);
    }
    galleryDiv.appendChild(movieList);
}