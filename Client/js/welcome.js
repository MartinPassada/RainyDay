stickyLoginForm();


function showLoginForm() {
    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "flex";
}

function closeLoginForm() {
    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "none";
}

function stickyLoginForm() {
    loginForm.classList.add("sticky");
}