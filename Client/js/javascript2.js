// Redirecciona al Home
function goHome(){
    window.location.href="/";
}

// Muestra y oculta div de generos
function showDiv() {
    var div = document.getElementById("genreButtonsDiv");
    if (div.style.display == "block") {
        div.style.display = "none";
    } 
    else {
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
function changeGalleryTitleName(title){
    let headerTitle = document.getElementById("galleryHeaderTitle");
    headerTitle.innerHTML = "";
    headerTitle.innerHTML = title;
}

function showLoginForm(){
    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "flex";
}

function closeLoginForm(){
    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "none";
}

function doLogin() {

    req = new XMLHttpRequest();
    
    req.onload = function() {
        const errorMessageDiv = document.getElementById("alertBox-Error");
        console.log("hasta aca llego");

        if (req.status == 200) {
            window.location.replace(req.responseURL);

        } else if (req.status == 403) {
            // 403: No autorizado
            errorMessageDiv.style.display = "flex"; 
            
        } else {
            // Otro código HTTP
            errorMessageDiv.textContent = `Error inesperado (código ${request.status})`;
            errorMessageDiv.style.display = "flex";
        }
    }
    var data = {
        user: document.getElementById("E-mail-input").value,
        password: document.getElementById("Password-input").value
    }
    req.open("POST", "/login");
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify(data));

}