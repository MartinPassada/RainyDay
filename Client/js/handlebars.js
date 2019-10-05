stickyLoginForm();



function goHome() {
    window.location.href = "/";
}

window.onscroll = function() { stickyNavBar() };
window.onload = function() { stickyLoginForm() };
//window.onload = function() { getCurrentMovieID() };
window.onload = function() { changeUserNameOnCommentsSection() };



/*window.onload = function() {
    getComments(
        response => { funcionquedibuja(response); },
        error => showError(error),
        genreArray[i]);
};*/

//funcion que dibuja

function getCurrentMovieID() {

    let pathArray = window.location.pathname.split('/');
    let pathID = pathArray[2];
    return pathID;
}

var navbar = document.getElementById("nav");
var commentsSection = document.getElementById("commentsSection").offsetTop;


function stickyNavBar() {
    if (window.pageYOffset >= commentsSection) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

function showLoginForm() {
    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "flex";
    navbar.style.display = "none";
}

function closeLoginForm() {
    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "none";
    navbar.style.display = "block";
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
            currentImage.style.width = '20%';
            currentImage.style.height = '20%';
            currentImage.style.display = 'block';
        };

        reader.readAsDataURL(input.files[0]);
    }
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
        date: Date.now()
    }


    const errorMessageDiv = document.getElementById('error-box');

    var commentaryPattern = /^([a-zA-Z0-9_. ?-]{5,150})$/gm;

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

        console.log(userCommentary);
        postComment(userCommentary);

    } else {

        console.log(userCommentary);
        postComment(userCommentary);
    }
}

function getBase64Image(imgElem) {
    var canvas = document.createElement("canvas");
    canvas.width = imgElem.clientWidth;
    canvas.height = imgElem.clientHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElem, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

}