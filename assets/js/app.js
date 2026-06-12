const preciosServicios = {

    "Buffet Premium": 55,

    "Coffee Break Empresarial": 25,

    "Fiesta de Cumpleaños": 35

};

function formatearFecha(fechaISO){

    return new Date(fechaISO)
    .toLocaleDateString(
        "es-PE",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}

const botonesServicio =
document.querySelectorAll(".btn-servicio");

const inputServicio =
document.getElementById(
    "servicioSeleccionado"
);

const modal =
new bootstrap.Modal(
    document.getElementById(
        "modalCotizacion"
    )
);

const contador =
document.getElementById(
    "contadorCarrito"
);

// =====================
// CONTADOR CARRITO
// =====================

function actualizarContador() {

    const carrito =
        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || [];

    contador.textContent =
        carrito.length;
}

// =====================
// RENDERIZAR CARRITO
// =====================

function renderizarCarrito() {

    const lista =
        document.getElementById(
            "listaCarrito"
        );

    if (!lista) return;

    const carrito =
        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || [];

    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {

        lista.innerHTML = `
            <p class="text-muted">
                No hay servicios agregados.
            </p>
        `;

        return;
    }

    carrito.forEach((item, index) => {
        total += item.subtotal;

        lista.innerHTML += `
            <div class="card mb-3 shadow-sm">

                <div class="card-body">

                    <h6 class="fw-bold">
                        ${item.servicio}
                    </h6>

                    <small>
                        <strong>Fecha:</strong>
                        ${formatearFecha(item.fecha)}
                    </small>

                    <br>

                    <small>
                        <strong>Evento:</strong>
                        ${item.tipoEvento}
                    </small>

                    <br>

                    <small>
                        <strong>Personas:</strong>
                        ${item.personas}
                    </small>

                    <br>

                    <small>
                        <strong>Lugar:</strong>
                        ${item.lugar}
                    </small>

                    <br>

<small>
    <strong>Precio Persona:</strong>
    S/. ${item.precio}
</small>

<br>

<small>
    <strong>Subtotal:</strong>
    S/. ${item.subtotal}
</small>

                    <br>

                    <small>
                        <strong>Observaciones:</strong>
                        ${item.observaciones || "-"}
                    </small>

                </div>

            </div>
        `;
    }
);
document.getElementById(
    "totalCotizacion"
).textContent =
    `S/. ${total.toLocaleString()}`;

}

// =====================
// CARGA INICIAL
// =====================

actualizarContador();
renderizarCarrito();

// =====================
// BOTONES SERVICIO
// =====================

botonesServicio.forEach(btn => {

    btn.addEventListener("click", () => {

        inputServicio.value =
            btn.dataset.servicio;

        modal.show();

    });

});

// =====================
// FORMULARIO
// =====================

document
.getElementById("formCotizacion")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const servicio =
document.getElementById(
    "servicioSeleccionado"
).value;

const personas =
parseInt(
    document.getElementById(
        "cantidadPersonas"
    ).value
);

const fechaEvento =
document.getElementById(
    "fechaEvento"
).value;

const hoy = new Date();

hoy.setHours(
    0,0,0,0
);

const fechaSeleccionada =
new Date(
    fechaEvento
);

const diferenciaDias =
Math.ceil(
    (
        fechaSeleccionada - hoy
    ) /
    (
        1000 * 60 * 60 * 24
    )
);

if(
    diferenciaDias < 10
){

    alert(
        "Los eventos deben solicitarse con un mínimo de 10 días de anticipación."
    );

    return;

}

const carritoExistente =
JSON.parse(
    localStorage.getItem(
        "carrito"
    )
) || [];

const pedidosExistentes =
JSON.parse(
    localStorage.getItem(
        "pedidos"
    )
) || [];

let eventosMismaFecha = 0;

carritoExistente.forEach(
    item => {

        if(
            item.fecha ===
            fechaEvento
        ){

            eventosMismaFecha++;

        }

    }
);

pedidosExistentes.forEach(
    pedido => {

        if(
            pedido.fecha ===
            fechaEvento
        ){

            eventosMismaFecha++;

        }

    }
);

if(
    eventosMismaFecha >= 3
){

    alert(
        "No hay disponibilidad para la fecha seleccionada. Máximo 3 eventos por día."
    );

    return;

}

const precio =
preciosServicios[servicio];

const subtotal =
precio * personas;

const item = {

    servicio,

    precio,

    personas,

    subtotal,

    fecha:
    fechaEvento,

    tipoEvento:
        document.getElementById(
            "tipoEvento"
        ).value,

    lugar:
        document.getElementById(
            "lugarEvento"
        ).value,

    observaciones:
        document.getElementById(
            "observaciones"
        ).value

};

    const carrito =
        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || [];

    carrito.push(item);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    actualizarContador();
    renderizarCarrito();

    alert(
        "Servicio agregado al carrito"
    );

    modal.hide();

    this.reset();

});

const btnCotizacion =
document.getElementById(
    "btnGenerarCotizacion"
);

if(btnCotizacion){

    btnCotizacion.addEventListener(
        "click",
        ()=>{

            const usuario =
            localStorage.getItem(
                "usuarioLogueado"
            );

            if(!usuario){

                alert(
                    "Debe iniciar sesión para solicitar una cotización"
                );

                window.location.href =
                "/pages/login.html";

                return;
            }

            window.location.href =
            "/pages/dashboard-cliente.html";

        }
    );

}

// =====================
// SESIÓN
// =====================

const usuarioLogueado =
JSON.parse(
    localStorage.getItem(
        "usuarioLogueado"
    )
);

const contenedorSesion =
document.getElementById(
    "contenedorSesion"
);

if(
    usuarioLogueado &&
    contenedorSesion
){

    const menuCatalogo =
document.getElementById(
    "menuCatalogo"
);

const menuContacto =
document.getElementById(
    "menuContacto"
);

const menuCarrito =
document.getElementById(
    "menuCarrito"
);

if(
    usuarioLogueado.rol === "ventas" ||
    usuarioLogueado.rol === "cocina" ||
    usuarioLogueado.rol === "logistica" ||
    usuarioLogueado.rol === "admin"
){

    if(menuCatalogo)
        menuCatalogo.style.display =
        "none";

    if(menuContacto)
        menuContacto.style.display =
        "none";

    if(menuCarrito)
        menuCarrito.style.display =
        "none";
}

    let dashboard = "";

    switch(
        usuarioLogueado.rol
    ){

        case "cliente":
            dashboard =
            "/pages/dashboard-cliente.html";
            break;

        case "ventas":
            dashboard =
            "/pages/dashboard-ventas.html";
            break;

        case "cocina":
            dashboard =
            "/pages/dashboard-cocina.html";
            break;

        case "logistica":
            dashboard =
            "/pages/dashboard-logistica.html";
            break;

        case "admin":
            dashboard =
            "/pages/dashboard-admin.html";
            break;

    }

    contenedorSesion.innerHTML = `

        <span
            class="text-white me-2">

            Hola,
            ${usuarioLogueado.nombre}

        </span>

        <a
            href="${dashboard}"
            class="btn btn-primary btn-sm me-2">

            Mi Panel

        </a>

        <button
            class="btn btn-danger btn-sm"
            id="btnCerrarSesionNavbar">

            Cerrar Sesión

        </button>

    `;

    document
    .getElementById(
        "btnCerrarSesionNavbar"
    )
    .addEventListener(
        "click",
        ()=>{

            localStorage.removeItem(
                "usuarioLogueado"
            );

            window.location.reload();

        }
    );

}