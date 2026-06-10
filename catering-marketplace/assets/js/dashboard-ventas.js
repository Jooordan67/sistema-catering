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
    usuario.rol !== "ventas"
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
    "listaPedidosVentas"
);

const pedidos =
JSON.parse(
    localStorage.getItem(
        "pedidos"
    )
) || [];

if(pedidos.length === 0){

    lista.innerHTML = `
        <div class="alert alert-info">

            No existen pedidos.

        </div>
    `;
}

pedidos.forEach((pedido,index)=>{

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
    <strong>Evento:</strong>
    ${pedido.tipoEvento}
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

                <p>

                    <strong>Total:</strong>
                    S/. ${pedido.subtotal}

                </p>

                <p>

                    <strong>Estado:</strong>
                    ${pedido.estado}

                </p>

                <button
                    class="btn btn-success btnAprobar"
                    data-index="${index}">

                    Aprobar

                </button>

                <button
                    class="btn btn-danger btnRechazar"
                    data-index="${index}">

                    Rechazar

                </button>

            </div>

        </div>

    `;
});

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
                "btnAprobar"
            )
        ){

            const index =
            e.target.dataset.index;

            pedidos[index].estado =
            "Aprobado por Ventas";

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
                "btnRechazar"
            )
        ){

            const index =
            e.target.dataset.index;

            pedidos[index].estado =
            "Rechazado";

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