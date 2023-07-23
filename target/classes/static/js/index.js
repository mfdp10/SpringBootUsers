$(document).ready(function () {
    updateEmailUser();
});
function updateEmailUser()
{
    if (localStorage.email) {
        document.getElementById("email-user").outerHTML = localStorage.email;
    }else{
        document.getElementById("email-user").outerHTML = "Anónimo";
    }
}