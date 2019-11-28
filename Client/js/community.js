stickyLoginForm();
stickyGroupForm();
addSubscribeEvent();
addEnterForumEvent();


window.onscroll = function() { stickyNavBar() }

function stickyLoginForm() {
    loginForm.classList.add("sticky");
}

function addSubscribeEvent() {
    var groupTitle;
    var subscribeButtons = document.querySelectorAll('.EnterGroupButton');
    subscribeButtons.forEach(b => {
        b.addEventListener('click', function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;
            statusImg = target.parentElement.children[0];
            statusImg.src = 'img/loading2.gif';
            groupTitle = target.parentElement.parentElement.children[0].innerHTML;

            subscribe(
                error => showError(error),
                groupTitle, statusImg, target
            );

        }, false);
    });
}

function addEnterForumEvent() {
    var groupsTitles = document.querySelectorAll('.groupTitle');
    groupsTitles.forEach(t => {
        t.addEventListener('click', function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;
            groupTitle = target.innerHTML;
            checkBeforeEnter(groupTitle);
        }, false);
    });
}

function goHome() {
    window.location.href = "/";
}

//var navbar = document.getElementById("nav");

function stickyNavBar() {
    var navbar = document.getElementById("nav");
    if (window.pageYOffset >= 1000) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}


function stickyGroupForm() {
    groupForm.classList.add("sticky");
}

function closeGroupForm() {
    var navbar = document.getElementById("nav");
    var loginForm = document.getElementById("groupForm");
    navbar.style.display = "block";
    loginForm.style.display = "none";
}

function showCreateGroupForm() {
    var navbar = document.getElementById("nav");
    var loginForm = document.getElementById("groupForm");
    loginForm.style.display = "flex";
    navbar.style.display = "none";
}

function checkUserStatusAndCreateGroup() {
    getUserName(
        response => {
            checkGroupData(response);
        },
        error => showError(error)
    );
}

function checkGroupData(userName) {
    const errorMessageDiv = document.getElementById('alertBox-ErrorForGroupsForm');

    if (userName !== "Usuario Anonimo") {

        var groupData = {
            groupName: document.getElementById("groupName").value,
            groupDescription: document.getElementById("groupDescription").value,
            creator: userName,
            members: [],
            joinRequests: [],

        };

        var groupDescriptionPattern = /^([\s\w\d áéíóú a-zA-Z0-9_+/.:'!’"#ñ,()¿?*=-]{5,150})$/g;
        var groupNamePattern = /^([\s\w\d áéíóú a-zA-Z0-9_+/.:'!’"#ñ,()¿?*=-]{5,45})$/gm;

        if (groupData.groupName == '') {
            errorMessageDiv.innerHTML = "Debes introducir un nombre para el grupo";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else if (groupData.groupName.search(groupNamePattern)) {
            errorMessageDiv.innerHTML = "El nombre del grupo debe tener entre 5 y 45 caracteres y no debe contener caracteres invalidos";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 5000);

        } else if (groupData.groupDescription == '') {
            errorMessageDiv.innerHTML = "Debes introducir una descripcion";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else if (groupData.groupDescription.search(groupDescriptionPattern)) {
            errorMessageDiv.innerHTML = "La descripcion del grupo debe contener entre 5 y 150 caracteres, sin caracteres invalidos";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 5000);
        } else {

            createGroup(groupData);
            //erase inputs
            /*document.getElementById("groupName").value = "";
            document.getElementById("groupDescription").value = "";*/

        }
    } else {

        errorMessageDiv.innerHTML = "Debes iniciar sesion para realizar esta accion";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

    }
}