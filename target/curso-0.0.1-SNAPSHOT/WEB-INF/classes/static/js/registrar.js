async function registrarUsuario() {
    const datos = {};
    datos.nombre = document.getElementById("nombre").value;
    datos.apellido = document.getElementById("apellido").value;
    datos.email = document.getElementById("email").value;
    datos.password = document.getElementById("password").value;
    let repetirPassword = document.getElementById("repetirPassword").value;


    if (repetirPassword != datos.password) {
        alert("Contraseñas diferentes");
        return;
    }

    const response = await fetch("api/usuario", {
        method: 'post', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(datos)
    });
    alert("Cuenta creada con éxito");
    location.href = "login.html";
}