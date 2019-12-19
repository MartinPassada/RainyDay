function checkAfterEnter(searchparameter) {

    req = new XMLHttpRequest();

    req.onload = function() {

        if (this.status == 200) {


            if (this.responseText == 'noMember') {

                Swal.fire({
                    title: 'Hacker Detected!',
                    imageUrl: '/img/hackerdetected.jpg',
                    imageWidth: 400,
                    imageHeight: 300,
                    imageAlt: '/img/loading.gif',
                    text: 'Como has llegado hasta aqui sin ser miembro ?',
                    //icon: 'warning',
                    timer: 4500,
                    timerProgressBar: true,
                    onClose: () => {
                        window.location.replace("/community");
                    }
                });
                //alert('Como has llegado hasta aqui sin ser miembro ?');
            } else {

            }

        } else if (this.status == 403) {
            Swal.fire({
                title: 'Hey!',
                text: 'No puedes entrar o permanecer aqui si no estas logueado',
                icon: 'warning',
                timer: 4500,
                timerProgressBar: true,
                onClose: () => {
                    window.location.replace("/community");
                }
            });
            //alert('No puedes entrar o permanecer aqui si no estas logueado');


        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Algo salió mal :(',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            //alert('Algo salio mal');
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
            Swal.fire({
                title: 'Error!',
                text: 'Se rompió algo',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            //alert('se rompio algo');

        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un problema',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            //alert('hubo un problema');
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