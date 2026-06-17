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
    usuario.rol !== "logistica"
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

const lista =
document.getElementById(
    "listaLogistica"
);

const pedidos =
JSON.parse(
    localStorage.getItem(
        "pedidos"
    )
) || [];

const pedidosLogistica =
pedidos.filter(
    pedido =>
    pedido.estado ===
    "En Preparación"
);

if(
    pedidosLogistica.length === 0
){

    lista.innerHTML = `
        <div class="alert alert-info">

            No existen pedidos para despacho.

        </div>
    `;

}

pedidosLogistica.forEach(
    pedido => {

        lista.innerHTML += `

        <div class="card mb-3 shadow-sm">

            <div class="card-body">

                <h5>

                    PED-${pedido.id}

                </h5>

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
    <strong>Observaciones:</strong>
    ${pedido.observaciones || "-"}
</p>

                <button
                    class="btn btn-primary btnRuta"
                    data-id="${pedido.id}">

                    En Ruta

                </button>

                <button
                    class="btn btn-success btnEntregado"
                    data-id="${pedido.id}">

                    Entregado

                </button>

            </div>

        </div>

        `;
    }
);

document.addEventListener(
    "click",
    function(e){

        const pedidos =
        JSON.parse(
            localStorage.getItem(
                "pedidos"
            )
        ) || [];

        if(
            e.target.classList.contains(
                "btnRuta"
            )
        ){

            const id =
            parseInt(
                e.target.dataset.id
            );

            const pedido =
            pedidos.find(
                p => p.id === id
            );

            pedido.estado =
            "En Ruta";

            localStorage.setItem(
                "pedidos",
                JSON.stringify(
                    pedidos
                )
            );

            location.reload();
        }

        if(
            e.target.classList.contains(
                "btnEntregado"
            )
        ){

            const id =
            parseInt(
                e.target.dataset.id
            );

            const pedido =
            pedidos.find(
                p => p.id === id
            );

            pedido.estado =
            "Entregado";

            localStorage.setItem(
                "pedidos",
                JSON.stringify(
                    pedidos
                )
            );

            location.reload();
        }

    }
);

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