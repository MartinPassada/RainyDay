// Redirecciona al Home
function goHome() {
    window.location.href = "/";
}

window.onload = function() { stickyLoginForm(), stickyGroupForm() };
window.onscroll = function() { stickyNavBar() };

var navbar = document.getElementById("nav");
var loginForm = document.getElementById("loginForm");
//var fadedDivPos = document.getElementById("fadedDiv").offsetHeight;


function stickyNavBar() {
    if (window.pageYOffset >= 1500) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
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