function doSignUp(userData) {

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
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else if (req.status == 999) {
            // Nombre Usuario ya esta en uso
            errorMessageDiv.innerHTML = "El Nombre de Usuario ya esta en uso";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
        } else {
            errorMessageDiv.innerHTML = `Error inesperado (código ${req.status})`;
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
        }
    }

    req.open("POST", "/signUp");
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify(userData));
}