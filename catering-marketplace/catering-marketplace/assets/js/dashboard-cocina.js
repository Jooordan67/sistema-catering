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
    usuario.rol !== "cocina"
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
    "listaProduccion"
);

const pedidos =
JSON.parse(
    localStorage.getItem(
        "pedidos"
    )
) || [];

const pedidosProduccion =
pedidos.filter(
    pedido =>
    pedido.estado ===
    "Aprobado por Ventas"
);

if(
    pedidosProduccion.length === 0
){

    lista.innerHTML = `
        <div class="alert alert-info">

            No existen pedidos para producción.

        </div>
    `;

}

pedidosProduccion.forEach(
    pedido => {

        lista.innerHTML += `

        <div class="card mb-3">

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
                    class="btn btn-warning btnPreparacion"
                    data-id="${pedido.id}">

                    Iniciar Preparación

                </button>

            </div>

        </div>

        `;
    }
);

document.addEventListener(
    "click",
    function(e){

        if(
            e.target.classList.contains(
                "btnPreparacion"
            )
        ){

            const id =
            parseInt(
                e.target.dataset.id
            );

            const pedidos =
            JSON.parse(
                localStorage.getItem(
                    "pedidos"
                )
            ) || [];

            const pedido =
            pedidos.find(
                p => p.id === id
            );

            pedido.estado =
            "En Preparación";

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