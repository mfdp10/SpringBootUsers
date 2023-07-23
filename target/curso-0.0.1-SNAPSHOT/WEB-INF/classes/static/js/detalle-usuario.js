// Call the dataTables jQuery plugin
$(document).ready(function () {
    cargarUsuario();
    $('#usuarios').DataTable();
});

async function cargarUsuario() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const response = await fetch("api/usuario/" + id + "", {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: getHeaders(),
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

    });
    const usuario = await response.json(); // parses JSON response into native JavaScript objects

    let usuariosHtml = "";

        if (usuario!=null) {
            let tel = usuario.telefono != null ? usuario.telefono : "-";

            let usuariosH = "<tr>\n" +
                "<td>" + usuario.id + "</td>\n" +
                "<td>" + usuario.nombre + " " + usuario.apellido + "</td>\n" +
                "<td>" + usuario.email + "</td>\n" +
                "<td>" + tel + "</td>\n" +
                "<td><a href=\"#\" onclick='eliminarUsuario(" + usuario.id + ")' class=\"btn btn-danger btn-circle\">\n" +
                "<i class=\"fas fa-trash\"></i>\n" +
                "</a></td>\n" +
                "</tr>\n"
            usuariosHtml += usuariosH;
        }

    document.querySelector("#usuarios tbody").outerHTML = usuariosHtml;

}

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
}