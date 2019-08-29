function getUserName(success, failure) {

    req = new XMLHttpRequest();

    req.onload = function() {

        let respObj = this.responseText;

        if (this.status == 200) {

            success(respObj);

        } else {

            failure(respObj.error);
        }
    }

    req.open("GET", "/getUserName");
    req.send();

}

function doLogin(loginData) {

    req = new XMLHttpRequest();

    req.onload = function() {
        const errorMessageDiv = document.getElementById("alertBox-Error");
        const successMessageDiv = document.getElementById("alertBox-Success");

        if (req.status == 200) {

            successMessageDiv.innerHTML = "<strong>Exito!</strong> Datos correctos, redireccionando...";
            successMessageDiv.style.display = "flex";
            setTimeout(function() { successMessageDiv.style.display = "none" }, 2000);
            setTimeout(function() { window.location.replace(req.responseURL) }, 2000);

        } else if (req.status == 403) {
            // 403: No autorizado
            errorMessageDiv.innerHTML = "<strong>Error!</strong> Usuario/email y/o contraseña invalidos";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else {
            // Otro código HTTP
            errorMessageDiv.textContent = `Error inesperado (código ${req.status})`;
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
        }
    }

    req.open("POST", "/login");
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify(loginData));
}

function logOut(success, failure) {

    req = new XMLHttpRequest();

    req.onload = function() {

        if (this.status == 200) {

            window.location.replace(req.responseURL)

        } else if (this.status == 403) {

            console.log("no se pudo desloguear");


        } else {

            failure(respObj.error);
        }
    }

    req.open("GET", "/logOut");
    req.send();

}