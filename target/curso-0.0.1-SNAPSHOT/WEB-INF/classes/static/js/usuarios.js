// Call the dataTables jQuery plugin
$(document).ready(function () {
    cargarUsuarios();
    $('#usuarios').DataTable();
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

async function cargarUsuarios() {

    const response = await fetch("api/usuarios", {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: getHeaders(),
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

    });
    const usuarios = await response.json(); // parses JSON response into native JavaScript objects
    let usuariosHtml = "";

    for (let usuario of usuarios) {

        let tel = usuario.telefono != null ? usuario.telefono : "-";

        let usuariosH = "<tr>\n" +
            "<td>" + usuario.id + "</td>\n" +
            "<td>" + usuario.nombre + " " + usuario.apellido + "</td>\n" +
            "<td>" + usuario.email + "</td>\n" +
            "<td>" + tel + "</td>\n" +
            "<td><a href=\"detalle-usuario.html?id=" + usuario.id + "\" class=\"btn btn-info btn-circle\">\n" +
            "      <i class=\"fas fa-info-circle\"></i>\n" +
            "      </a><a href=\"#\" onclick='eliminarUsuario(" + usuario.id + ")' class=\"btn btn-danger btn-circle\">\n" +
            "<i class=\"fas fa-trash\"></i>\n" +
            "</a></td>\n" +
            "</tr>\n"
        usuariosHtml += usuariosH;
    }
    document.querySelector("#usuarios tbody").outerHTML = usuariosHtml;

}

async function eliminarUsuario(id) {
    if (!confirm("Seguro de eliminar el usuario " + id + "")) {
        return;
    }

    const response = await fetch("api/usuario/" + id, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: getHeaders(),
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',

    });
    location.reload();
}

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
}