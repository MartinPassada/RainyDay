// Redirecciona al Home
function goHome() {
    window.location.href = "/";
}

window.onscroll = function() { stickyNavBar() };
window.onload = function() { stickyLoginForm() };

var navbar = document.getElementById("nav");
var loginForm = document.getElementById("loginForm");
var fadedDivPos = document.getElementById("fadedDiv").offsetTop;


function stickyNavBar() {
    if (window.pageYOffset >= fadedDivPos) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

function stickyLoginForm() {
    loginForm.classList.add("sticky");
}


// Muestra y oculta div de generos
function showDiv() {
    var div = document.getElementById("genreButtonsDiv");
    if (div.style.display == "block") {
        div.style.display = "none";
    } else {
        div.style.display = "block";
    }
}

// Auto scroll a la posicion dada (elemento html)
function scrollToSmoothly(pos, time) {
    var currentPos = window.scrollY || window.screenTop;
    if (currentPos < pos) {
        var t = 10;
        for (let i = currentPos; i <= pos; i += 10) {
            t += 10;
            setTimeout(function() {
                window.scrollTo(0, i);
            }, t / 2);
        }
    } else {
        time = time || 2;
        var i = currentPos;
        var x;
        x = setInterval(function() {
            window.scrollTo(0, i);
            i -= 10;
            if (i <= pos) {
                clearInterval(x);
            }
        }, time);
    }
}

// Vacia el titulo de la galeria y lo reemplaza por su correspondiente
function changeGalleryTitleName(title) {
    let headerTitle = document.getElementById("galleryHeaderTitle");
    headerTitle.innerHTML = "";
    headerTitle.innerHTML = title;
}

function showLoginForm() {
    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "flex";
    navbar.style.display = "none";
}

function closeLoginForm() {
    var loginForm = document.getElementById("loginForm");
    navbar.style.display = "block";
    loginForm.style.display = "none";
}