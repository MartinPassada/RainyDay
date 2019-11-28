function createGroup(groupData) {

    req = new XMLHttpRequest();

    req.onload = function() {
        const errorMessageDiv = document.getElementById("alertBox-ErrorForGroupsForm");
        const successMessageDiv = document.getElementById("alertBox-SuccessForGroupsForm");

        if (req.status == 200) {

            successMessageDiv.innerHTML = "El grupo se ha creado exitosamente";
            successMessageDiv.style.display = "flex";
            document.getElementById("groupName").value = "";
            document.getElementById("groupDescription").value = "";
            setTimeout(function() { successMessageDiv.style.display = "none" }, 2000);
            setTimeout(function() { window.location.reload() }, 500);

        } else if (req.status == 403) {
            // 403: No autorizado
            errorMessageDiv.innerHTML = "El Nombre del grupo ya esta en uso";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else {
            // Otro código HTTP
            errorMessageDiv.textContent = `Error inesperado (código ${req.status})`;
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
        }
    }

    req.open("POST", "/createGroup");
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify(groupData));
}

function subscribe(failure, groupTitle, statusImg, target) {
    req = new XMLHttpRequest();

    req.onload = function() {

        //const errorMessageDiv = document.getElementById("errorBoxForLike");


        if (this.status == 200) {


            if (this.responseText == 'se agrego a request') {

                statusImg.src = "img/requested.png";
                target.innerHTML = 'CANCELAR SOLICITUD'

            } else if (this.responseText == 'se borro la subscripcion') {

                statusImg.src = "img/nomember.png";
                target.innerHTML = 'ENTRAR AL GRUPO'

            } else if (this.responseText == 'se quito de request') {

                statusImg.src = "img/nomember.png";
                target.innerHTML = 'ENTRAR AL GRUPO'

            }

        } else if (this.status == 500) {

            errorMessageDiv.innerHTML = "<strong>Oh no !! :(</strong> Hemos tenido un problema";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else {

            errorMessageDiv.textContent = `Algo se rompió (código ${req.status})`;
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        }

    }
    var subscribeData = {
        groupTitle: groupTitle,
    }
    req.open("POST", "/subscribe");
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify(subscribeData));
}

function checkBeforeEnter(searchparameter) {

    const errorMessageDiv = document.getElementById('boxCommunityError');

    req = new XMLHttpRequest();

    req.onload = function() {

        if (this.status == 200) {

            if (this.responseText == 'noMember') {

                if (window.pageYOffset <= 150) {
                    errorMessageDiv.innerHTML = "Solo se permite la entrada a miembros";
                    errorMessageDiv.style.display = "flex";
                    setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
                } else {
                    alert('Solo se permite la entrada a miembros');
                }
            } else if (this.responseText !== 'noMember') {

                var respObj = JSON.parse(this.responseText);
                let forumID = respObj[0]._id;

                window.location.href = "/Forum/" + `${forumID}`;

            }
        } else if (this.status == 403) {

            if (window.pageYOffset <= 150) {
                errorMessageDiv.innerHTML = "Inicia sesion para realizar esta accion";
                errorMessageDiv.style.display = "flex";
                setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
            } else {
                alert('Inicia sesion para realizar esta accion');
            }

        } else {

            if (window.pageYOffset <= 150) {
                errorMessageDiv.innerHTML = "Algo salio mal";
                errorMessageDiv.style.display = "flex";
                setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
            } else {
                alert('Algo salio mal');
            }
        }

    }
    req.open("GET", `/checkBeforeEnter?groupTitle=${searchparameter}`);
    req.send();

}