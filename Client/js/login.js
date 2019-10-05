getUserName(
    response => {
        UserNameOnNavBar(response);
    },
    error => showError(error)
);

function UserNameOnNavBar(userName) {
    let navList = document.getElementById('navList');
    let userNameLink = document.createElement("li");
    userNameLink.setAttribute('class', 'userNameLink');
    userNameLink.setAttribute('id', 'userNameLink');

    if (userName !== "Usuario Anonimo") {
        userNameLink.innerHTML = userName;

        let logInButton = document.getElementById('LogInButton');
        logInButton.style.display = "none";

        var logOutButton = document.createElement("button");
        logOutButton.innerHTML = "Cerrar Sesion";
        logOutButton.addEventListener("click", function() {
            logOut(error => showError(error))
        });

        navList.appendChild(logOutButton);

    } else {

        userNameLink.innerHTML = userName;
    }


    navList.appendChild(userNameLink);
}

function checkdata() {

    var loginData = {
        user: document.getElementById("e-mail").value,
        password: document.getElementById("password").value
    };

    const errorMessageDiv = document.getElementById('alertBox-Error');
    var passwordPattern = /^([a-zA-Z0-9_.-]{5,15})$/gm;

    if (loginData.password == '') {
        errorMessageDiv.innerHTML = "Debes introducir una password";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

    } else if (loginData.user == '') {
        errorMessageDiv.innerHTML = "Debes introducir un e-mail o usuario";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

    } else if (loginData.password.search(passwordPattern)) {
        errorMessageDiv.innerHTML = "La password debe tener entre 5 y 15 caracteres y no debe contener caracteres invalidos";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 5000);
    } else {

        doLogin(loginData);

    }
}