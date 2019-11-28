function checkAfterEnter(searchparameter) {

    req = new XMLHttpRequest();

    req.onload = function() {

        if (this.status == 200) {


            if (this.responseText == 'noMember') {


                alert('Como has llegado hasta aqui sin ser miembro ?');
                window.location.replace("/community");

            } else {

            }

        } else if (this.status == 403) {

            alert('No puedes entrar o permanecer aqui si no estas logueado');
            window.location.replace("/community");

        } else {
            alert('Algo salio mal');
        }

    }
    req.open("GET", `/checkAfterEnter?forumID=${searchparameter}`);
    req.send();
}

function acceptOrRejectMember(success, userName, forumID, actionClicked) {
    req = new XMLHttpRequest();

    req.onload = function() {

        if (this.status == 200) {


            success(userName);


        } else if (this.status == 500) {

            alert('se rompio algo');

        } else {

            alert('hubo un problema');
        }

    }
    var acceptOrRejectMemberData = {
        userName: userName,
        forumID: forumID,
        actionClicked: actionClicked
    }
    req.open("POST", "/acceptOrRejectMember");
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify(acceptOrRejectMemberData));
}