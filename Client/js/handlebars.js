stickyLoginForm();
changeUserNameOnCommentsSection();

function goHome() {
    window.location.href = "/";
}

window.onscroll = function() { stickyNavBar() };
window.onload = function() { stickyLoginForm() };

var navbar = document.getElementById("nav");
//var loginForm = document.getElementById("loginForm");
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

    checkSessionStatus(
        response => {
            tryComment(response);
        },
        error => showError(error)
    );

}

function tryComment(value) {
    console.log(value);

    if (value == true) {

        checkCommentary();

    } else if (value == false) {

        const errorMessageDiv = document.getElementById('alertBox-Error');
        errorMessageDiv.innerHTML = "Debes iniciar sesion para comentar";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
    }
}

function checkCommentary() {

    var userCommentary = {
        commentary: document.getElementById('commentTextArea').value,
        image: document.getElementById('currentImage')
    }

    const errorMessageDiv = document.getElementById('alertBox-Error');

    var commentaryPattern = /^([a-zA-Z0-9_.-]{5,150})$/gm;

    if (userCommentary.commentary == '') {
        errorMessageDiv.innerHTML = "Debes introducir una comentario";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

    } else if (userCommentary.commentary.search(commentaryPattern)) {
        errorMessageDiv.innerHTML = "El comentario debe tener entre 5 y 150 caracteres y no contener caracteres invalidos";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 5000);
    } else {

        postComment(userCommentary);

    }
}