stickyLoginForm();

function goHome() {
    window.location.href = "/";
}

window.onscroll = function() { changeUserNameOnCommentsSection(), stickyNavBar() };

window.onload = function() {

    var movieID = this.getCurrentMovieID();

    getComments(
        response => { drawComments(response); },
        error => showError(error),
        movieID);

    function loadingGif() {
        var heartIcon = document.getElementById('heartEmpty-Full');
        heartIcon.src = "/img/loading.gif";

        getLikesForUser(
            response => { changeIcon(response); },
            error => showError(error),
            movieID);
    }
    loadingGif();

};

function changeIcon(value) {

    var heartIcon = document.getElementById('heartEmpty-Full');

    if (value == 'true') {


        heartIcon.src = "/img/hearticonfull.png";

    } else {

        heartIcon.src = "/img/hearticonempty.png";
    }
}


//funcion que dibuja

function drawComments(comments) {


    if (comments.length != 1) {
        for (var i = 0; i < comments.length; i++) {

            //div
            var commentDiv = document.createElement('div');
            commentDiv.setAttribute('class', 'commentDiv');
            commentDiv.setAttribute('id', 'commentDiv');

            //autor
            var authorName = document.createElement('h4');
            authorName.setAttribute('class', 'authorName');
            authorName.setAttribute('id', 'authorName');
            authorName.innerHTML = comments[i].author;

            //text
            var commentText = document.createElement('p');
            commentText.setAttribute('class', 'commentText');
            commentText.setAttribute('id', 'commentText');
            commentText.innerHTML = comments[i].text;

            //date
            var dateText = document.createElement('h5');
            dateText.setAttribute('class', 'dateText');
            dateText.setAttribute('id', 'dateText');
            dateText.innerHTML = "Comentado el: ";
            var dateNumber = new Date(comments[i].date);
            dateNumber = dateNumber.toLocaleString();
            var aux = document.createElement('h5');
            aux.setAttribute('class', 'dateNumber');
            aux.setAttribute('id', 'dateNumber');
            aux.innerHTML = (dateNumber);
            var fullDate = document.createElement('div');
            fullDate.setAttribute('class', 'fullDate');
            fullDate.setAttribute('id', 'fullDate');
            fullDate.append(dateText);
            fullDate.append(aux);

            //Id
            var commentId = document.createElement('h6');
            commentId.innerHTML = comments[i]._id;
            commentId.setAttribute('class', 'commentId' + comments[i].Nro);
            commentId.setAttribute('id', 'commentId' + comments[i].Nro);
            commentId.style.display = 'none';
            commentId.style.visibility = 'hidden';

            //Likes 
            var commentLikes = document.createElement('span');
            commentLikes.innerHTML = comments[i].likes;
            commentLikes.setAttribute('class', 'commentLikes' + comments[i].Nro);
            commentLikes.setAttribute('id', 'commentLikes' + comments[i].Nro);
            commentLikes.style.marginLeft = '33%';
            commentLikes.style.fontSize = 'large';


            var arrowAndLikesDiv = document.createElement('div');
            arrowAndLikesDiv.setAttribute('class', 'arrowAndLikesDiv');
            arrowAndLikesDiv.setAttribute('id', 'arrowAndLikesDiv');


            //arrows for Like 
            var arrowUp = document.createElement('img');
            arrowUp.setAttribute('class', 'arrowUp' + comments[i].Nro);
            arrowUp.setAttribute('id', 'arrowUp' + comments[i].Nro);
            arrowUp.src = '/img/loading.gif'
            arrowUp.style.width = '25px';
            arrowUp.style.height = '25px';
            arrowUp.style.cursor = 'pointer';
            arrowUp.addEventListener("click", function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                getUserName(
                    response => { tryLikeCommentUp(response, target); },
                    error => showError(error),
                );
            }, false);
            var arrowDown = document.createElement('img');
            arrowDown.setAttribute('class', 'arrowDown' + comments[i].Nro);
            arrowDown.setAttribute('id', 'arrowDown' + comments[i].Nro);
            arrowDown.src = '/img/loading.gif'
            arrowDown.style.width = '25px';
            arrowDown.style.height = '25px';
            arrowDown.style.cursor = 'pointer';
            arrowDown.addEventListener("click", function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                getUserName(
                    response => { tryLikeCommentDown(response, target); },
                    error => showError(error),
                );
            }, false);

            arrowAndLikesDiv.appendChild(arrowUp);
            arrowAndLikesDiv.appendChild(commentLikes);
            arrowAndLikesDiv.appendChild(arrowDown);

            commentDiv.appendChild(commentId);
            commentDiv.appendChild(arrowAndLikesDiv);
            commentDiv.appendChild(authorName);
            commentDiv.appendChild(fullDate);
            commentDiv.appendChild(commentText);

            //image
            if (comments[i].image != null) {

                var restoredImage = document.createElement('IMG');
                restoredImage.setAttribute('class', 'restoredImage');
                restoredImage.setAttribute('id', 'restoredImage');
                restoredImage.src = 'data:image/jpeg/png/jpg;charset=utf-8;base64,' + comments[i].image;
                commentDiv.appendChild(restoredImage);
            }
            document.getElementById('commentsSection').appendChild(commentDiv);
        }
    } else {
        for (var i = 0; i < comments.length; i++) {

            //div
            var commentDiv = document.createElement('div');
            commentDiv.setAttribute('class', 'commentDiv');
            commentDiv.setAttribute('id', 'commentDiv');

            //autor
            var authorName = document.createElement('h4');
            authorName.setAttribute('class', 'authorName');
            authorName.setAttribute('id', 'authorName');
            authorName.innerHTML = comments[i].author;

            //text
            var commentText = document.createElement('p');
            commentText.setAttribute('class', 'commentText');
            commentText.setAttribute('id', 'commentText');
            commentText.innerHTML = comments[i].text;

            //date
            var dateText = document.createElement('h5');
            dateText.setAttribute('class', 'dateText');
            dateText.setAttribute('id', 'dateText');
            dateText.innerHTML = "Comentado el: ";
            var dateNumber = new Date(comments[i].date);
            dateNumber = dateNumber.toLocaleString();
            var aux = document.createElement('h5');
            aux.setAttribute('class', 'dateNumber');
            aux.setAttribute('id', 'dateNumber');
            aux.innerHTML = (dateNumber);
            var fullDate = document.createElement('div');
            fullDate.setAttribute('class', 'fullDate');
            fullDate.setAttribute('id', 'fullDate');
            fullDate.append(dateText);
            fullDate.append(aux);

            //Id
            var commentId = document.createElement('h6');
            commentId.innerHTML = comments[i]._id;
            commentId.setAttribute('class', 'commentId' + comments[i].Nro);
            commentId.setAttribute('id', 'commentId' + comments[i].Nro);
            commentId.style.display = 'none';
            commentId.style.visibility = 'hidden';

            //Likes 
            var commentLikes = document.createElement('span');
            commentLikes.innerHTML = comments[i].likes;
            commentLikes.setAttribute('class', 'commentLikes' + comments[i].Nro);
            commentLikes.setAttribute('id', 'commentLikes' + comments[i].Nro);
            commentLikes.style.marginLeft = '33%';
            commentLikes.style.fontSize = 'large';


            var arrowAndLikesDiv = document.createElement('div');
            arrowAndLikesDiv.setAttribute('class', 'arrowAndLikesDiv');
            arrowAndLikesDiv.setAttribute('id', 'arrowAndLikesDiv');


            //arrows for Like 
            var arrowUp = document.createElement('img');
            arrowUp.setAttribute('class', 'arrowUp' + comments[i].Nro);
            arrowUp.setAttribute('id', 'arrowUp' + comments[i].Nro);
            arrowUp.src = '/img/loading.gif'
            arrowUp.style.width = '25px';
            arrowUp.style.height = '25px';
            arrowUp.style.cursor = 'pointer';
            arrowUp.addEventListener("click", function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                getUserName(
                    response => { tryLikeCommentUp(response, target); },
                    error => showError(error),
                );
            }, false);
            var arrowDown = document.createElement('img');
            arrowDown.setAttribute('class', 'arrowDown' + comments[i].Nro);
            arrowDown.setAttribute('id', 'arrowDown' + comments[i].Nro);
            arrowDown.src = '/img/loading.gif'
            arrowDown.style.width = '25px';
            arrowDown.style.height = '25px';
            arrowDown.style.cursor = 'pointer';
            arrowDown.addEventListener("click", function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                getUserName(
                    response => { tryLikeCommentDown(response, target); },
                    error => showError(error),
                );
            }, false);

            arrowAndLikesDiv.appendChild(arrowUp);
            arrowAndLikesDiv.appendChild(commentLikes);
            arrowAndLikesDiv.appendChild(arrowDown);

            commentDiv.appendChild(commentId);
            commentDiv.appendChild(arrowAndLikesDiv);
            commentDiv.appendChild(authorName);
            commentDiv.appendChild(fullDate);
            commentDiv.appendChild(commentText);

            //image
            if (comments[i].image != null) {

                var restoredImage = document.createElement('IMG');
                restoredImage.setAttribute('class', 'restoredImage');
                restoredImage.setAttribute('id', 'restoredImage');
                restoredImage.src = 'data:image/jpeg/png/jpg;charset=utf-8;base64,' + comments[i].image;
                commentDiv.appendChild(restoredImage);
            }

            const commentsSection = document.getElementById('commentsSection');
            var oldComments = document.querySelectorAll('.commentDiv');
            commentsSection.innerHTML = " ";
            commentsSection.appendChild(commentDiv);
            oldComments.forEach(a => {
                commentsSection.appendChild(a);
            });
        }
    }

    getUpLikesForComments(
        response => { changeUpArrowInComments(response); },
        error => showError(error));
    getDownLikesForComments(
        response => { changeDownArrowInComments(response); },
        error => showError(error));

}

function changeUpArrowInComments(userLikes) {
    var allComments = document.querySelectorAll('.commentDiv');
    if (userLikes == 'Forbidden') {

        allComments.forEach(a => {
            var id = a.firstChild.id;
            var split = id.split('commentId');
            var selector = split[1];
            document.getElementById('arrowUp' + selector).src = '/img/arrowup.png';
            document.getElementById('arrowDown' + selector).src = '/img/arrowdown.png';
        });

    } else {

        allComments.forEach(a => {

            var upFound = false;
            var downFound = false;
            var id = a.firstChild.id;
            var split = id.split('commentId');
            var selector = split[1];
            var serachParameter = a.firstChild.innerHTML;

            for (let h = 0; h < userLikes[0].commentsLiked.length; h++) {
                if (serachParameter == userLikes[0].commentsLiked[h]) {
                    upFound = true;
                }
            }

            if (upFound == true) {
                document.getElementById('arrowUp' + selector).style.zIndex = '-2';
                document.getElementById('arrowDown' + selector).src = '/img/arrowdown.png';
            } else {
                document.getElementById('arrowUp' + selector).src = '/img/arrowup.png';
                document.getElementById('arrowDown' + selector).src = '/img/arrowdown.png';
            }
        });

    }
}

function changeDownArrowInComments(userLikes) {
    var allComments = document.querySelectorAll('.commentDiv');
    if (userLikes == 'Forbidden') {

        allComments.forEach(a => {
            var id = a.firstChild.id;
            var split = id.split('commentId');
            var selector = split[1];
            document.getElementById('arrowUp' + selector).src = '/img/arrowup.png';
            document.getElementById('arrowDown' + selector).src = '/img/arrowdown.png';
        });

    } else {
        allComments.forEach(a => {

            var downFound = false;
            var id = a.firstChild.id;
            var split = id.split('commentId');
            var selector = split[1];
            var serachParameter = a.firstChild.innerHTML;

            for (let i = 0; i < userLikes[0].commentsUnliked.length; i++) {

                if (userLikes[0].commentsUnliked[i] == serachParameter) {
                    downFound = true;
                }
            }
            if (downFound == true) {
                document.getElementById('arrowDown' + selector).style.zIndex = '-2';
                document.getElementById('arrowUp' + selector).src = '/img/arrowup.png';
            } else {
                document.getElementById('arrowUp' + selector).src = '/img/arrowup.png';
                document.getElementById('arrowDown' + selector).src = '/img/arrowdown.png';
            }
        });
    }
}

function getCurrentMovieID() {

    let pathArray = window.location.pathname.split('/');
    let pathID = pathArray[2];
    return pathID;
}

var navbar = document.getElementById("nav");


function stickyNavBar() {
    if (window.pageYOffset >= 1000) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

function showLoginForm() {
    var loginForm = document.getElementById("loginForm");
    document.getElementById('movieDetailDiv').style.zIndex = '-1';
    loginForm.style.display = "flex";
    navbar.style.display = "none";
}

function closeLoginForm() {
    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "none";
    navbar.style.display = "block";
    document.getElementById('movieDetailDiv').style.zIndex = '0';
}

function stickyLoginForm() {
    loginForm.classList.add("sticky");
}

function changeUserNameOnCommentsSection() {
    var userNameOnCommentsSection = document.getElementById('userNameTitle');
    var loggedUserName = document.getElementById('userNameLink').innerHTML;
    userNameOnCommentsSection.innerHTML = loggedUserName;
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            currentImage = document.getElementById('currentImage');
            currentImage.src = e.target.result;
            //currentImage.style.width = '70%';
            //currentImage.style.height = '70%';
            currentImage.style.display = 'block';
        };

    }

    reader.readAsDataURL(input.files[0]);

}

function checkUserStatus() {

    getUserName(
        response => {
            tryComment(response);
        },
        error => showError(error)
    );

}



function tryComment(value) {

    let errorMessageDiv = document.getElementById('error-box');

    if (value !== "Usuario Anonimo") {

        checkCommentary(value);


    } else if (value == "Usuario Anonimo") {

        errorMessageDiv.innerHTML = "Debes iniciar sesion para comentar";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
    } else {
        errorMessageDiv.innerHTML = "Algio salió mal :(";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
    }
}


function checkCommentary(userName) {

    let selectedImage = document.getElementById('currentImage');

    var userCommentary = {
        text: document.getElementById('commentTextArea').value,
        author: userName,
        movieID: getCurrentMovieID(),
        likes: 0,
        date: Date.now()
    }


    const errorMessageDiv = document.getElementById('error-box');

    var commentaryPattern = /^([\s\w\d áéíóú a-zA-Z0-9_+/.:'!’"#ñ,()¿?*=-]{5,150})$/g;

    if (userCommentary.text == '') {
        errorMessageDiv.innerHTML = "Debes introducir un comentario";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

    } else if (userCommentary.text.search(commentaryPattern)) {
        errorMessageDiv.innerHTML = "El comentario debe tener entre 5 y 150 caracteres y no contener caracteres invalidos";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 5000);
    } else if (selectedImage.src !== (window.location.href + '#')) {

        userCommentary.image = getBase64Image(selectedImage);

        postComment(userCommentary);

        //erase inputs 
        document.getElementById('commentTextArea').value = "";
        document.getElementById('imageInput').innerHTML = null;
        selectedImage.src = '#';
        selectedImage.style.display = 'none';


    } else {

        postComment(userCommentary);

        //erase inputs 
        document.getElementById('commentTextArea').value = "";
        document.getElementById('imageInput').innerHTML = null;
        selectedImage.src = '#';
        selectedImage.style.display = 'none';

    }

}

function getBase64Image(imgElem) {
    var canvas = document.createElement("canvas");
    canvas.width = imgElem.clientWidth;
    canvas.height = imgElem.clientHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElem, 0, 0);
    var dataURL = canvas.toDataURL("image/png/jpg/jpeg");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

}

function checkUserStatusForLike() {

    getUserName(
        response => {
            tryLike(response);
        },
        error => showError(error)
    );

}

function tryLike(value) {

    let errorMessageDiv = document.getElementById('errorBoxForLike');
    let playerDiv = document.getElementById('playerdiv');

    if (value !== "Usuario Anonimo") {


        let movieID = getCurrentMovieID();
        postLike(value, movieID);


    } else if (value == "Usuario Anonimo") {

        errorMessageDiv.innerHTML = "Debes iniciar sesion para realizar esta accion";
        playerDiv.style.marginTop = '2%';
        errorMessageDiv.style.display = "flex";

        setTimeout(function() {
            playerDiv.style.marginTop = '5%',
                errorMessageDiv.style.display = "none"
        }, 4000);


    } else {
        errorMessageDiv.innerHTML = "Algio salió mal :(";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
    }
}

function tryLikeCommentUp(value, target) {

    let idName = target.id;
    let split = idName.split('arrowUp');
    let selector = split[1];

    var commentLikeData = {
        commentsId: document.getElementById('commentId' + selector).innerHTML,
        commentsLikes: document.getElementById('commentLikes' + selector),
        arrowUp: document.getElementById('arrowUp' + selector),
        arrowDown: document.getElementById('arrowDown' + selector),
    }

    if (value !== "Usuario Anonimo") {

        postLikeCommentUp(value, commentLikeData);

    } else if (value == "Usuario Anonimo") {
        alert("Debes iniciar sesion para realizar esta accion");

    } else {
        alert("Algio salió mal :(");

    }
}

function tryLikeCommentDown(value, target) {


    let idName = target.id;
    let split = idName.split('arrowDown');
    let selector = split[1];

    var commentLikeData = {
        commentsId: document.getElementById('commentId' + selector).innerHTML,
        commentsLikes: document.getElementById('commentLikes' + selector),
        arrowDown: document.getElementById('arrowDown' + selector),
        arrowUp: document.getElementById('arrowUp' + selector),

    }

    if (value !== "Usuario Anonimo") {

        postLikeCommentDown(value, commentLikeData);

    } else if (value == "Usuario Anonimo") {
        alert("Debes iniciar sesion para realizar esta accion");

    } else {
        alert("Algio salió mal :(");

    }
}


function setUpComment(comments) {

    if (comments.length == 1) {

        for (var i = 0; i < comments.length; i++) {

            //div
            var commentDiv = document.createElement('div');
            commentDiv.setAttribute('class', 'commentDiv');
            commentDiv.setAttribute('id', 'commentDiv');

            //autor
            var authorName = document.createElement('h4');
            authorName.setAttribute('class', 'authorName');
            authorName.setAttribute('id', 'authorName');
            authorName.innerHTML = comments[i].author;

            //text
            var commentText = document.createElement('p');
            commentText.setAttribute('class', 'commentText');
            commentText.setAttribute('id', 'commentText');
            commentText.innerHTML = comments[i].text;

            //date
            var dateText = document.createElement('h5');
            dateText.setAttribute('class', 'dateText');
            dateText.setAttribute('id', 'dateText');
            dateText.innerHTML = "Comentado el: ";
            var dateNumber = new Date(comments[i].date);
            dateNumber = dateNumber.toLocaleString();
            var aux = document.createElement('h5');
            aux.setAttribute('class', 'dateNumber');
            aux.setAttribute('id', 'dateNumber');
            aux.innerHTML = (dateNumber);
            var fullDate = document.createElement('div');
            fullDate.setAttribute('class', 'fullDate');
            fullDate.setAttribute('id', 'fullDate');
            fullDate.append(dateText);
            fullDate.append(aux);

            //Id
            var commentId = document.createElement('h6');
            commentId.innerHTML = comments[i]._id;
            commentId.setAttribute('class', 'commentId' + i);
            commentId.setAttribute('id', 'commentId' + i);
            commentId.style.display = 'none';
            commentId.style.visibility = 'hidden';

            //Likes 
            var commentLikes = document.createElement('span');
            commentLikes.innerHTML = comments[i].likes;
            commentLikes.setAttribute('class', 'commentLikes' + i);
            commentLikes.setAttribute('id', 'commentLikes' + i);
            commentLikes.style.marginLeft = '33%';
            commentLikes.style.fontSize = 'large';


            var arrowAndLikesDiv = document.createElement('div');
            arrowAndLikesDiv.setAttribute('class', 'arrowAndLikesDiv');
            arrowAndLikesDiv.setAttribute('id', 'arrowAndLikesDiv');


            //arrows for Like 
            var arrowUp = document.createElement('img');
            arrowUp.setAttribute('class', 'arrowUp' + i);
            arrowUp.setAttribute('id', 'arrowUp' + i);
            arrowUp.src = '/img/loading.gif'
            arrowUp.style.width = '25px';
            arrowUp.style.height = '25px';
            arrowUp.style.cursor = 'pointer';
            arrowUp.addEventListener("click", function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                getUserName(
                    response => { tryLikeCommentUp(response, target); },
                    error => showError(error),
                );
            }, false);
            var arrowDown = document.createElement('img');
            arrowDown.setAttribute('class', 'arrowDown' + i);
            arrowDown.setAttribute('id', 'arrowDown' + i);
            arrowDown.src = '/img/loading.gif'
            arrowDown.style.width = '25px';
            arrowDown.style.height = '25px';
            arrowDown.style.cursor = 'pointer';
            arrowDown.addEventListener("click", function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                getUserName(
                    response => { tryLikeCommentDown(response, target); },
                    error => showError(error),
                );
            }, false);

            arrowAndLikesDiv.appendChild(arrowUp);
            arrowAndLikesDiv.appendChild(commentLikes);
            arrowAndLikesDiv.appendChild(arrowDown);

            commentDiv.appendChild(commentId);
            commentDiv.appendChild(arrowAndLikesDiv);
            commentDiv.appendChild(authorName);
            commentDiv.appendChild(fullDate);
            commentDiv.appendChild(commentText);

            //image
            if (comments[i].image != null) {

                var restoredImage = document.createElement('IMG');
                restoredImage.setAttribute('class', 'restoredImage');
                restoredImage.setAttribute('id', 'restoredImage');
                restoredImage.src = 'data:image/jpeg/png/jpg;charset=utf-8;base64,' + comments[i].image;
                commentDiv.appendChild(restoredImage);
            }
            return commentDiv
        }

    }
    for (var i = 1; i < comments.length; i++) {

        //div
        var commentDiv = document.createElement('div');
        commentDiv.setAttribute('class', 'commentDiv');
        commentDiv.setAttribute('id', 'commentDiv');

        //autor
        var authorName = document.createElement('h4');
        authorName.setAttribute('class', 'authorName');
        authorName.setAttribute('id', 'authorName');
        authorName.innerHTML = comments[i].author;

        //text
        var commentText = document.createElement('p');
        commentText.setAttribute('class', 'commentText');
        commentText.setAttribute('id', 'commentText');
        commentText.innerHTML = comments[i].text;

        //date
        var dateText = document.createElement('h5');
        dateText.setAttribute('class', 'dateText');
        dateText.setAttribute('id', 'dateText');
        dateText.innerHTML = "Comentado el: ";
        var dateNumber = new Date(comments[i].date);
        dateNumber = dateNumber.toLocaleString();
        var aux = document.createElement('h5');
        aux.setAttribute('class', 'dateNumber');
        aux.setAttribute('id', 'dateNumber');
        aux.innerHTML = (dateNumber);
        var fullDate = document.createElement('div');
        fullDate.setAttribute('class', 'fullDate');
        fullDate.setAttribute('id', 'fullDate');
        fullDate.append(dateText);
        fullDate.append(aux);

        //Id
        var commentId = document.createElement('h6');
        commentId.innerHTML = comments[i]._id;
        commentId.setAttribute('class', 'commentId' + i);
        commentId.setAttribute('id', 'commentId' + i);
        commentId.style.display = 'none';
        commentId.style.visibility = 'hidden';

        //Likes 
        var commentLikes = document.createElement('span');
        commentLikes.innerHTML = comments[i].likes;
        commentLikes.setAttribute('class', 'commentLikes' + i);
        commentLikes.setAttribute('id', 'commentLikes' + i);
        commentLikes.style.marginLeft = '33%';
        commentLikes.style.fontSize = 'large';


        var arrowAndLikesDiv = document.createElement('div');
        arrowAndLikesDiv.setAttribute('class', 'arrowAndLikesDiv');
        arrowAndLikesDiv.setAttribute('id', 'arrowAndLikesDiv');


        //arrows for Like 
        var arrowUp = document.createElement('img');
        arrowUp.setAttribute('class', 'arrowUp' + i);
        arrowUp.setAttribute('id', 'arrowUp' + i);
        arrowUp.src = '/img/loading.gif'
        arrowUp.style.width = '25px';
        arrowUp.style.height = '25px';
        arrowUp.style.cursor = 'pointer';
        arrowUp.addEventListener("click", function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            getUserName(
                response => { tryLikeCommentUp(response, target); },
                error => showError(error),
            );
        }, false);
        var arrowDown = document.createElement('img');
        arrowDown.setAttribute('class', 'arrowDown' + i);
        arrowDown.setAttribute('id', 'arrowDown' + i);
        arrowDown.src = '/img/loading.gif'
        arrowDown.style.width = '25px';
        arrowDown.style.height = '25px';
        arrowDown.style.cursor = 'pointer';
        arrowDown.addEventListener("click", function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            getUserName(
                response => { tryLikeCommentDown(response, target); },
                error => showError(error),
            );
        }, false);

        arrowAndLikesDiv.appendChild(arrowUp);
        arrowAndLikesDiv.appendChild(commentLikes);
        arrowAndLikesDiv.appendChild(arrowDown);

        commentDiv.appendChild(commentId);
        commentDiv.appendChild(arrowAndLikesDiv);
        commentDiv.appendChild(authorName);
        commentDiv.appendChild(fullDate);
        commentDiv.appendChild(commentText);

        //image
        if (comments[i].image != null) {

            var restoredImage = document.createElement('IMG');
            restoredImage.setAttribute('class', 'restoredImage');
            restoredImage.setAttribute('id', 'restoredImage');
            restoredImage.src = 'data:image/jpeg/png/jpg;charset=utf-8;base64,' + comments[i].image;
            commentDiv.appendChild(restoredImage);
        }
        return commentDiv;
    }

}