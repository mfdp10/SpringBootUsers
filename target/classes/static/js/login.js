async function iniciarSesion() {
    const datos = {};
    datos.email = document.getElementById("email").value;
    datos.password = document.getElementById("password").value;

    const response = await fetch("api/login", {
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
    const respuesta = await response.text();

    if (respuesta != "FAIL") {
        localStorage.setItem("token", respuesta);
        localStorage.setItem("email", datos.email);
        location.href = "usuarios.html";
    } else {
        alert("Credenciales incorrectas");
    }
}