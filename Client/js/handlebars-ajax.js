function getComments(success, failure, searchparameter) {

    req = new XMLHttpRequest();

    req.onload = function() {

        let respObj = JSON.parse(this.responseText);

        if (this.status == 200) {

            success(respObj, searchparameter);
        } else {

            failure(respObj.error);
        }

    }

    req.open("GET", `/getComments?movieID=${window.location}`);
    req.send();

}

function postComment(userCommentary) {
    req = new XMLHttpRequest();


    req.onload = function() {
        const errorMessageDiv = document.getElementById("error-box");
        const successMessageDiv = document.getElementById("success-box");

        if (req.status == 200) {

            successMessageDiv.innerHTML = "<strong>Exito!</strong> Estamos publicando tu comentario..";
            successMessageDiv.style.display = "flex";
            setTimeout(function() { successMessageDiv.style.display = "none" }, 2000);
            //setTimeout(function() { window.location.replace('back') }, 2000);

        } else if (req.status == 500) {

            errorMessageDiv.innerHTML = "<strong>Oh no !! :(</strong> Hemos tenido un problema";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else {

            errorMessageDiv.textContent = `Algo se rompió (código ${req.status})`;
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        }
    }

    req.open("POST", "/postComments");
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify(userCommentary));
}