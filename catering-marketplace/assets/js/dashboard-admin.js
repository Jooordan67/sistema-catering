const usuario =
JSON.parse(
    localStorage.getItem(
        "usuarioLogueado"
    )
);

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

if(
    !usuario ||
    usuario.rol !== "admin"
){

    window.location.href =
    "../index.html";

}

const nombreUsuario =
document.getElementById(
    "nombreUsuario"
);

if(nombreUsuario){

    nombreUsuario.textContent =
    usuario.nombre;

}


const pedidos =
JSON.parse(
    localStorage.getItem(
        "pedidos"
    )
) || [];

const lista =
document.getElementById(
    "listaAdministrador"
);

document.getElementById(
    "totalPedidos"
).textContent =
    pedidos.length;

let ventas = 0;
let pendientes = 0;
let entregados = 0;

pedidos.forEach(pedido => {

    ventas += pedido.subtotal;

    if(
        pedido.estado ===
        "Confirmación Pendiente"
    ){
        pendientes++;
    }

    if(
        pedido.estado ===
        "Entregado"
    ){
        entregados++;
    }

    let color = "secondary";

    switch(pedido.estado){

        case "Confirmación Pendiente":
            color = "warning";
            break;

        case "Aprobado por Ventas":
            color = "primary";
            break;

        case "En Preparación":
            color = "info";
            break;

        case "En Ruta":
            color = "dark";
            break;

        case "Entregado":
            color = "success";
            break;

    }

    lista.innerHTML += `

    <div class="card mb-3 shadow-sm">

        <div class="card-body">

            <div class="d-flex justify-content-between">

                <h5>
                    PED-${pedido.id}
                </h5>

                <span
                    class="badge bg-${color}">
                    ${pedido.estado}
                </span>

            </div>

            <p>
                <strong>Servicio:</strong>
                ${pedido.servicio}
            </p>

            <p>
                <strong>Fecha:</strong>
                ${formatearFecha(pedido.fecha)}
            </p>

            <p>
                <strong>Personas:</strong>
                ${pedido.personas}
            </p>

            <p>
                <strong>Lugar:</strong>
                ${pedido.lugar}
            </p>

            <p>
                <strong>Total:</strong>
                S/. ${pedido.subtotal}
            </p>

        </div>

    </div>

    `;
});

document.getElementById(
    "ventasTotales"
).textContent =
    `S/. ${ventas.toLocaleString()}`;

document.getElementById(
    "pendientes"
).textContent =
    pendientes;

document.getElementById(
    "entregados"
).textContent =
    entregados;

    const btnCerrarSesion =
document.getElementById(
    "btnCerrarSesion"
);

if(btnCerrarSesion){

    btnCerrarSesion.addEventListener(
        "click",
        ()=>{

            localStorage.removeItem(
                "usuarioLogueado"
            );

            window.location.href =
            "../index.html";

        }
    );

}