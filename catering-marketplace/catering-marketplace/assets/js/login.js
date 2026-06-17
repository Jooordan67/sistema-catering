const usuarios = [

    {
        nombre: "Cliente Demo",
        correo: "cliente@test.com",
        password: "123456",
        rol: "cliente"
    },

    {
        nombre: "Ventas Demo",
        correo: "ventas@test.com",
        password: "123456",
        rol: "ventas"
    },

    {
        nombre: "Cocina Demo",
        correo: "cocina@test.com",
        password: "123456",
        rol: "cocina"
    },

    {
        nombre: "Logistica Demo",
        correo: "logistica@test.com",
        password: "123456",
        rol: "logistica"
    },

    {
        nombre: "Administrador",
        correo: "admin@test.com",
        password: "123456",
        rol: "admin"
    }

];

document
.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const correo =
    document.getElementById(
        "correo"
    ).value;

    const password =
    document.getElementById(
        "password"
    ).value;

    const usuario =
    usuarios.find(
        u =>
        u.correo === correo &&
        u.password === password
    );

    if(!usuario){

        alert(
            "Credenciales incorrectas"
        );

        return;
    }

    localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify(usuario)
    );

    switch(usuario.rol){

        case "cliente":

            window.location.href =
            "dashboard-cliente.html";

            break;

        case "ventas":

            window.location.href =
            "dashboard-ventas.html";

            break;

        case "cocina":

            window.location.href =
            "dashboard-cocina.html";

            break;

        case "logistica":

            window.location.href =
            "dashboard-logistica.html";

            break;

        case "admin":

            window.location.href =
            "dashboard-admin.html";

            break;

    }

});