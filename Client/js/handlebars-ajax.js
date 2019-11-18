function getComments(success, failure, searchparameter) {

    req = new XMLHttpRequest();

    req.onload = function() {


        let respObj = JSON.parse(this.responseText);


        if (this.status == 200) {

            success(respObj);

        } else {

            failure(respObj.error);
        }

    }

    req.open("GET", `/getComments?movieID=${searchparameter}`);
    req.send();

}

function getLastComment(success, failure, searchparameter) {

    req = new XMLHttpRequest();

    req.onload = function() {


        let respObj = JSON.parse(this.responseText);


        if (this.status == 200) {

            success(respObj);

        } else {

            failure(respObj.error);
        }

    }

    req.open("GET", `/getLastComment?movieID=${searchparameter}`);
    req.send();

}

function getLikesForUser(success, failure, movieID, ) {

    req = new XMLHttpRequest();

    req.onload = function() {


        let respObj = this.responseText;

        if (this.status == 200) {

            success(respObj);

        } else if (this.status == 403) {

            success(respObj)

        } else {

            failure(respObj);

        }

    }

    req.open("GET", `/getLikesForUser?movieID=${movieID}`);
    req.send();

}

function getUpLikesForComments(success, failure) {

    req = new XMLHttpRequest();

    req.onload = function() {

        var respObj;
        if (this.status == 200) {

            if (this.responseText == 'Usuario Anonimo') {
                let string = 'Forbidden';
                success(string);
            } else {
                respObj = JSON.parse(this.responseText);
                success(respObj);
            }

        } else if (this.status == 403) {

            success(respObj);

        } else {

            failure(respObj);

        }

    }

    req.open("GET", '/getUpLikesForComments');
    req.send();
}

function getDownLikesForComments(success, failure) {

    req = new XMLHttpRequest();

    req.onload = function() {

        var respObj;
        if (this.status == 200) {

            if (this.responseText == 'Usuario Anonimo') {
                let string = 'Forbidden';
                success(string);
            } else {
                respObj = JSON.parse(this.responseText);
                success(respObj);
            }

        } else if (this.status == 403) {

            success(respObj);

        } else {

            failure(respObj);

        }

    }

    req.open("GET", '/getDownLikesForComments');
    req.send();
}


function postComment(userCommentary) {
    req = new XMLHttpRequest();


    req.onload = function() {

        const errorMessageDiv = document.getElementById("error-box");
        const successMessageDiv = document.getElementById("success-box");

        if (this.status == 200) {

            var movieID = getCurrentMovieID();
            successMessageDiv.innerHTML = "<strong>Exito!</strong> Estamos publicando tu comentario..";
            successMessageDiv.style.display = "flex";
            setTimeout(function() { successMessageDiv.style.display = "none" }, 2000);
            getLastComment(
                response => { drawComments(response); },
                error => showError(error),
                movieID);
            //setTimeout(function() { window.location.reload(true) }, 1500);


        } else if (this.status == 500) {

            errorMessageDiv.innerHTML = "<strong>Oh no !! :(</strong> Hemos tenido un problema";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else {

            errorMessageDiv.textContent = `Algo se rompió (código ${req.status})`;
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        }
    }

    req.open("POST", "/postComments");
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify(userCommentary));
}

function postLike(userName, movieID) {
    req = new XMLHttpRequest();

    req.onload = function() {

        const errorMessageDiv = document.getElementById("errorBoxForLike");


        if (this.status == 200) {

            const heartIcon = document.getElementById('heartEmpty-Full');
            const likesNumber = document.getElementById('likesNumber');


            if (this.responseText == 'se agrego like') {

                likesNumber.innerHTML++;
                heartIcon.src = "/img/hearticonfull.png";

            } else if (this.responseText == 'se quito like') {
                likesNumber.innerHTML--;
                heartIcon.src = "/img/hearticonempty.png";

            }


        } else if (this.status == 500) {

            errorMessageDiv.innerHTML = "<strong>Oh no !! :(</strong> Hemos tenido un problema";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else {

            errorMessageDiv.textContent = `Algo se rompió (código ${req.status})`;
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        }

    }
    req.open("POST", "/postLike");
    req.setRequestHeader('Content-type', 'application/json');
    var likeData = { userName: userName, movieID: movieID };
    req.send(JSON.stringify(likeData));
}

function postLikeCommentUp(userName, commentLikeData) {
    req = new XMLHttpRequest();

    req.onload = function() {


        if (this.status == 200) {

            if (this.responseText == 'se agrego like') {

                commentLikeData.arrowUp.style.zIndex = '-2';
                commentLikeData.commentsLikes.innerHTML++;

            } else if (this.responseText == 'se quito like') {

                commentLikeData.commentsLikes.innerHTML++;
                commentLikeData.arrowDown.src = '/img/arrowdown.png';
                commentLikeData.arrowDown.style.zIndex = '0';

            } else if (this.responseText == 'Nop...') {
                alert('Nop...');
            }


        } else if (this.status == 500) {

            alert("Oh no !! Hemos tenido un problema");


        } else {

            alert('Algo se rompió');


        }

    }
    req.open("POST", "/postLikeCommentUp");
    req.setRequestHeader('Content-type', 'application/json');
    var likeData = {
        userName: userName,
        commentsId: commentLikeData.commentsId
    };
    req.send(JSON.stringify(likeData));
}

function postLikeCommentDown(userName, commentLikeData) {
    req = new XMLHttpRequest();

    req.onload = function() {

        const errorMessageDiv = document.getElementById("errorBoxForCommentsLike");

        if (this.status == 200) {


            if (this.responseText == 'se agrego like') {

                commentLikeData.arrowDown.style.zIndex = '-2';
                commentLikeData.commentsLikes.innerHTML--;

            } else if (this.responseText == 'se quito like') {

                commentLikeData.commentsLikes.innerHTML--;
                commentLikeData.arrowUp.src = '/img/arrowup.png';
                commentLikeData.arrowUp.style.zIndex = '0';

            } else if (this.responseText == 'Nop...') {
                alert('Nop...');
            }



        } else if (this.status == 500) {

            alert("Oh no !! Hemos tenido un problema");


        } else {

            alert('Algo se rompió');


        }

    }
    req.open("POST", "/postLikeCommentDown");
    req.setRequestHeader('Content-type', 'application/json');
    var likeData = {
        userName: userName,
        commentsId: commentLikeData.commentsId
    };
    req.send(JSON.stringify(likeData));
}