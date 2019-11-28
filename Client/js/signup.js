function checkUserData() {

    var userData = {
        email: document.getElementById('e-mail').value,
        userName: document.getElementById('user-name').value,
        password1: document.getElementById('password').value,
        moviesLiked: [],
        commentsLiked: [],
        commentsUnliked: []

    };


    let password2 = document.getElementById('repeat-password').value;

    const errorMessageDiv = document.getElementById('alertBox-Error');
    var searchPattern = /^\w+([\.-]?\w{1,10}){0,3}@\w+(\.\w\w\w?){0,3}(\.\w\w\w?)$/ig;
    var passwordPattern = /^([a-zA-Z0-9_.-]{5,15})$/gm;

    if (userData.password1 == '') {
        errorMessageDiv.innerHTML = "Debes introducir una password";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

    } else if (userData.password1.search(passwordPattern)) {
        errorMessageDiv.innerHTML = "La password debe tener entre 5 y 15 caracteres y no debe contener caracteres invalidos";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 5000);

    } else if (userData.password1 === password2) {

        if (userData.email == '') {
            errorMessageDiv.innerHTML = "Debes introducir un e-mail";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else if (userData.email.search(searchPattern)) {
            errorMessageDiv.innerHTML = "E-mail invalido";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else if (userData.userName == '') {
            errorMessageDiv.innerHTML = "El nombre de usuario no puede quedar vacio";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);

        } else if (userData.userName.search(passwordPattern)) {
            errorMessageDiv.innerHTML = "El nombre de usuario debe tener entre 5 y 15 caracteres y no debe contener caracteres invalidos";
            errorMessageDiv.style.display = "flex";
            setTimeout(function() { errorMessageDiv.style.display = "none" }, 5000);
        } else {


            doSignUp(userData);

        }
    } else {
        errorMessageDiv.innerHTML = "Ambas passwords deben que coincidir";
        errorMessageDiv.style.display = "flex";
        setTimeout(function() { errorMessageDiv.style.display = "none" }, 4000);
    }
}