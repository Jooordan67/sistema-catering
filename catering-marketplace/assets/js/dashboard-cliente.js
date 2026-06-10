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

const nombreUsuario =
document.getElementById(
    "nombreUsuario"
);

if(nombreUsuario){

    nombreUsuario.textContent =
    usuario.nombre;

}

if(!usuario){

    window.location.href =
    "login.html";

}

const lista =
document.getElementById(
    "listaCotizaciones"
);

const listaPedidos =
document.getElementById(
    "listaPedidos"
);

const carrito =
JSON.parse(
    localStorage.getItem(
        "carrito"
    )
) || [];

if(carrito.length === 0){

    lista.innerHTML = `
        <div class="alert alert-warning">

            No existen cotizaciones.

        </div>
    `;
}
else{

    carrito.forEach((item,index)=>{

        lista.innerHTML += `

    <div class="card mb-3 shadow-sm">

        <div class="card-body">

            <h5>

                COT-${index + 1}

            </h5>

            <p>
                <strong>Servicio:</strong>
                ${item.servicio}
            </p>

            <p>
                <strong>Fecha:</strong>
                ${formatearFecha(item.fecha)}
            </p>

            <p>
                <strong>Evento:</strong>
                ${item.tipoEvento}
            </p>

            <p>
                <strong>Personas:</strong>
                ${item.personas}
            </p>

            <p>
                <strong>Lugar:</strong>
                ${item.lugar}
            </p>

            <p>
                <strong>Observaciones:</strong>
                ${item.observaciones || "-"}
            </p>

            <p>

                <strong>Total:</strong>
                S/. ${item.subtotal}

            </p>

            <span
                class="badge bg-warning">

                Pendiente

            </span>

            <div class="mt-3">

                <button
                    class="btn btn-success btnPedido"
                    data-index="${index}">

                    Solicitar Pedido

                </button>

            </div>

        </div>

    </div>

`;
    });

}

document
.getElementById(
    "btnCerrarSesion"
)
.addEventListener(
    "click",
    ()=>{

        localStorage.removeItem(
            "usuarioLogueado"
        );

        window.location.href =
        "../index.html";

    }
);

document.addEventListener("click", function(e){

    if(
        e.target.classList.contains(
            "btnPedido"
        )
    ){

        const index =
        e.target.dataset.index;

        const carrito =
        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || [];

        const cotizacion =
        carrito[index];

        const pedidos =
        JSON.parse(
            localStorage.getItem(
                "pedidos"
            )
        ) || [];

        pedidos.push({

    id:
    pedidos.length + 1,

    servicio:
    cotizacion.servicio,

    precio:
    cotizacion.precio,

    personas:
    cotizacion.personas,

    fecha:
    cotizacion.fecha,

    tipoEvento:
    cotizacion.tipoEvento,

    lugar:
    cotizacion.lugar,

    observaciones:
    cotizacion.observaciones,

    subtotal:
    cotizacion.subtotal,

    adelanto:
    cotizacion.subtotal * 0.5,

    estado:
    "Confirmación Pendiente"

});
        
        carrito.splice(index, 1);

        localStorage.setItem(
            "pedidos",
            JSON.stringify(
                pedidos
            )
        );

        localStorage.setItem(
    "carrito",
    JSON.stringify(
        carrito
    )
);


        alert(
            "Pedido registrado correctamente"
        );

        location.reload();

    }

});

const pedidos =
JSON.parse(
    localStorage.getItem(
        "pedidos"
    )
) || [];

pedidos.forEach((pedido,index)=>{

    let colorEstado = "secondary";

    if(pedido.estado === "Confirmación Pendiente"){
        colorEstado = "warning";
    }

    if(pedido.estado === "Aprobado por Ventas"){
        colorEstado = "success";
    }

    if(pedido.estado === "Rechazado"){
        colorEstado = "danger";
    }

    listaPedidos.innerHTML += `

    <div class="card mb-3 border-success">

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

                <strong>Adelanto (50%):</strong>
                S/. ${pedido.adelanto}

            </p>

            <span
                class="badge bg-${colorEstado}">

                ${pedido.estado}

            </span>

        </div>

    </div>

`;

});