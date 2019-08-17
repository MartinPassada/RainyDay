// Redirecciona al Home
function goHome(){
    window.location.href="/";
}

window.onscroll = function() {stickyNavBar()};
window.onload = function() {stickyLoginForm()};

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
    navbar.style.display = "none";
}

function closeLoginForm(){
    var loginForm = document.getElementById("loginForm");
    navbar.style.display = "block";
    loginForm.style.display = "none";
}

function checkdata(){

    var loginData = {
        user: document.getElementById("e-mail").value,
        password: document.getElementById("password").value
    };

    const errorMessageDiv = document.getElementById('alertBox-Error');
    var passwordPattern = /^([a-zA-Z0-9_.-]{5,15})$/gm;
    
    if(loginData.password == ''){
        errorMessageDiv.innerHTML = "Debes introducir una password";
        errorMessageDiv.style.display = "flex"; 
        setTimeout(function() {errorMessageDiv.style.display="none"},2300);

    }else if(loginData.user == ''){
        errorMessageDiv.innerHTML = "Debes introducir un e-mail o usuario";
        errorMessageDiv.style.display = "flex"; 
        setTimeout(function() {errorMessageDiv.style.display="none"},3000);

    }else if (loginData.password.search(passwordPattern)){
    errorMessageDiv.innerHTML = "La password debe tener minimo 5 caracteres y maximo 15";
    errorMessageDiv.style.display = "flex"; 
    setTimeout(function() {errorMessageDiv.style.display="none"},3000);
    }else{

        doLogin(loginData);

    }
}


function doLogin(loginData) {

    req = new XMLHttpRequest();
    
    req.onload = function() {
        const errorMessageDiv = document.getElementById("alertBox-Error");
        const successMessageDiv = document.getElementById("alertBox-Success");

        if (req.status == 200) {
            
            successMessageDiv.innerHTML = "<strong>Exito!</strong> Datos correctos, redireccionando...";
            successMessageDiv.style.display = "flex";
            setTimeout(function() {successMessageDiv.style.display="none"},3000);
            setTimeout(function() {window.location.replace(req.responseURL)},3500);

        } else if (req.status == 403) {
            // 403: No autorizado
            errorMessageDiv.innerHTML = "<strong>Error!</strong> Usuario/email y/o contraseña invalidos";
            errorMessageDiv.style.display = "flex"; 
            setTimeout(function() {errorMessageDiv.style.display="none"},3000);
            
        } else {
            // Otro código HTTP
            errorMessageDiv.textContent = `Error inesperado (código ${req.status})`;
            errorMessageDiv.style.display = "flex";
            setTimeout(function() {errorMessageDiv.style.display="none"},3000);
        }
    }
    
    req.open("POST", "/login");
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify(loginData));
}