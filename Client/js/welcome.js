stickyLoginForm();


function showLoginForm(){
    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "flex";
}

function closeLoginForm(){
    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "none";
}

function stickyLoginForm(){
    loginForm.classList.add("sticky");
} 

function checkUserData(){

    var userData = {
        email:document.getElementById('e-mail').value,
        userName:document.getElementById('user-name').value,
        password1:document.getElementById('password').value,
        genreLikes:[]
        
    };

    let password2 = document.getElementById('repeat-password').value;
    
    const errorMessageDiv = document.getElementById('alertBox-Error');
    var searchPattern = /^\w+([\.-]?\w{1,10}){0,3}@\w+(\.\w\w\w?){0,3}(\.\w\w\w?)$/ig;
    var passwordPattern = /^([a-zA-Z0-9_.-]{5,15})$/gm;
    
    if(userData.password1 == ''){
        errorMessageDiv.innerHTML = "Debes introducir una password";
        errorMessageDiv.style.display = "flex"; 
        setTimeout(function() {errorMessageDiv.style.display="none"},2300);

    }else if (userData.password1.search(passwordPattern)){
        errorMessageDiv.innerHTML = "La password debe tener minimo 5 caracteres y maximo 15";
        errorMessageDiv.style.display = "flex"; 
        setTimeout(function() {errorMessageDiv.style.display="none"},3000);

    }else if (userData.password1 === password2){

        if(userData.email == ''){
        errorMessageDiv.innerHTML = "Debes introducir un e-mail";
        errorMessageDiv.style.display = "flex"; 
        setTimeout(function() {errorMessageDiv.style.display="none"},3000);

        }else if (userData.email.search(searchPattern)){
        errorMessageDiv.innerHTML = "E-mail invalido";
        errorMessageDiv.style.display = "flex"; 
        setTimeout(function() {errorMessageDiv.style.display="none"},3000);

        }else if(userData.userName == ''){
        errorMessageDiv.innerHTML = "El nombre de usuario no puede quedar vacio";
        errorMessageDiv.style.display = "flex"; 
        setTimeout(function() {errorMessageDiv.style.display="none"},3000);

        }else if (userData.userName.search(passwordPattern)){
        errorMessageDiv.innerHTML = "El nombre de usuario debe tener minimo 5 caracteres y maximo 15";
        errorMessageDiv.style.display = "flex"; 
        setTimeout(function() {errorMessageDiv.style.display="none"},3000);
        }else{

            
            doSignUp(userData);

        }
    }else {
        errorMessageDiv.innerHTML = "Ambas passwords deben que coincidir";
        errorMessageDiv.style.display = "flex"; 
        setTimeout(function() {errorMessageDiv.style.display="none"},3000);
    }
}

//AJAX
function doSignUp(userData){

    req = new XMLHttpRequest();
    
    req.onload = function() {
        const errorMessageDiv = document.getElementById("alertBox-Error");
        //const successMessageDiv = document.getElementById("alertBox-Success");

        if (req.status == 200) {

            window.location.replace(req.responseURL);

        } else if (req.status == 403) {
            //Mail ya existe
            errorMessageDiv.innerHTML = "El E-mail ya existe";
            errorMessageDiv.style.display = "flex"; 
            setTimeout(function() {errorMessageDiv.style.display="none"},3000);
            
        } else if (req.status == 999) {
            // Nombre Usuario ya esta en uso
            errorMessageDiv.innerHTML = "El Nombre de Usuario ya esta en uso";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() {errorMessageDiv.style.display="none"},3000);
        }else {
            errorMessageDiv.innerHTML = `Error inesperado (código ${req.status})`;
            errorMessageDiv.style.display = "flex";
            setTimeout(function() {errorMessageDiv.style.display="none"},3000);
        }
    }
    
    req.open("POST", "/signUp");
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify(userData));
}




