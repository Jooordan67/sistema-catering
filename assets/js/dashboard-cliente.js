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

function diasRestantes(
    fechaEvento
){

    const hoy =
    new Date();

    hoy.setHours(
        0,0,0,0
    );

    const fecha =
    new Date(
        fechaEvento
    );

    return Math.ceil(
        (
            fecha - hoy
        ) /
        (
            1000 * 60 * 60 * 24
        )
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

const modalModificar =
new bootstrap.Modal(
    document.getElementById(
        "modalModificarPedido"
    )
);

const modalPago =
new bootstrap.Modal(
    document.getElementById(
        "modalPago"
    )
);

const metodoPago =
document.getElementById(
    "metodoPago"
);

const datosPago =
document.getElementById(
    "datosPago"
);

function mostrarCamposPago(){

    if(
        metodoPago.value ===
        "Tarjeta"
    ){

        datosPago.innerHTML = `

            <input
                type="text"
                class="form-control mb-2"
                id="numeroTarjeta"
                placeholder="Número de Tarjeta">

            <div class="row">

                <div class="col-6">

                    <input
                        type="text"
                        class="form-control"
                        id="fechaTarjeta"
                        placeholder="MM/AA">

                </div>

                <div class="col-6">

                    <input
                        type="text"
                        class="form-control"
                        id="cvvTarjeta"
                        placeholder="CVV">

                </div>

            </div>

        `;

    }

    if(
        metodoPago.value ===
        "Yape"
    ){

        datosPago.innerHTML = `

            <input
                type="text"
                class="form-control mb-2"
                id="numeroYape"
                placeholder="Número Yape">

            <input
                type="text"
                class="form-control"
                id="codigoYape"
                placeholder="Código de Aprobación">

        `;

    }



}

metodoPago.addEventListener(
    "change",
    mostrarCamposPago
);

mostrarCamposPago();

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

    document.getElementById(
        "cotizacionSeleccionada"
    ).value = index;

    document.getElementById(
        "montoPago"
    ).textContent =
    (
        cotizacion.subtotal * 0.5
    ).toFixed(2);

    modalPago.show();

}
        
        

    if(
    e.target.classList.contains(
        "btnCambio"
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

    if(
        diasRestantes(
            pedido.fecha
        ) < 8
    ){

        alert(
            "No se permiten cambios con menos de 8 días de anticipación."
        );

        return;

    }

    pedido.estado =
    "Cambio Solicitado";

    localStorage.setItem(
        "pedidos",
        JSON.stringify(
            pedidos
        )
    );

    alert(
        "Solicitud de cambio registrada."
    );

    location.reload();

}

if(
    e.target.classList.contains(
        "btnCancelar"
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

    if(
        diasRestantes(
            pedido.fecha
        ) < 8
    ){

        alert(
            "No se permiten cancelaciones con menos de 8 días de anticipación."
        );

        return;

    }

    pedido.estado =
    "Cancelación Solicitada";

    localStorage.setItem(
        "pedidos",
        JSON.stringify(
            pedidos
        )
    );

    alert(
        "Solicitud de cancelación registrada."
    );

    location.reload();

}

if(
    e.target.classList.contains(
        "btnModificar"
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

    document.getElementById(
        "pedidoModificarId"
    ).value =
    pedido.id;

    document.getElementById(
        "modFecha"
    ).value =
    pedido.fecha;

    document.getElementById(
        "modPersonas"
    ).value =
    pedido.personas;

    document.getElementById(
        "modLugar"
    ).value =
    pedido.lugar;

    document.getElementById(
        "modObservaciones"
    ).value =
    pedido.observaciones || "";

    modalModificar.show();

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

    if(
    pedido.estado ===
    "Cambio Solicitado"
){
    colorEstado = "info";
}

if(
    pedido.estado ===
    "Cambio Aprobado"
){
    colorEstado = "primary";
}

if(
    pedido.estado ===
    "Cancelación Solicitada"
){
    colorEstado = "dark";
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
            

${
    pedido.estado === "Confirmación Pendiente" ||
    pedido.estado === "Aprobado por Ventas"
    ? `
    <div class="mt-3">

        <button
            class="btn btn-warning btnCambio"
            data-id="${pedido.id}">

            Solicitar Cambio

        </button>

        <button
            class="btn btn-danger btnCancelar"
            data-id="${pedido.id}">

            Solicitar Cancelación

        </button>

    </div>
    `
    : ""
}

${
    pedido.estado === "Cambio Aprobado"
    ? `
    <div class="mt-3">

        <button
            class="btn btn-primary btnModificar"
            data-id="${pedido.id}">

            Modificar Pedido

        </button>

    </div>
    `
    : ""
}

        </div>

    </div>

`;

});

document
.getElementById(
    "btnConfirmarPago"
)
.addEventListener(
    "click",
    ()=>{

        const metodo =
document.getElementById(
    "metodoPago"
).value;

if(
    metodo === "Yape"
){

    const numero =
    document.getElementById(
        "numeroYape"
    ).value;

    const codigo =
    document.getElementById(
        "codigoYape"
    ).value;

    if(
        !numero ||
        !codigo
    ){

        alert(
            "Complete los datos de Yape."
        );

        return;

    }

}

if(
    metodo === "Transferencia"
){

    const banco =
    document.getElementById(
        "bancoOrigen"
    ).value;

    const cuenta =
    document.getElementById(
        "numeroCuenta"
    ).value;

    const cci =
    document.getElementById(
        "cci"
    ).value;

    const dni =
    document.getElementById(
        "dniTitular"
    ).value;

    if(
        !banco ||
        !cuenta ||
        !cci ||
        !dni
    ){

        alert(
            "Complete los datos de transferencia."
        );

        return;

    }

}

if(
    metodo === "Tarjeta"
){

    const tarjeta =
    document.getElementById(
        "numeroTarjeta"
    ).value;

    const fecha =
    document.getElementById(
        "fechaTarjeta"
    ).value;

    const cvv =
    document.getElementById(
        "cvvTarjeta"
    ).value;

    if(
        !tarjeta ||
        !fecha ||
        !cvv
    ){

        alert(
            "Complete los datos de la tarjeta."
        );

        return;

    }

}
        
        const index =
        document.getElementById(
            "cotizacionSeleccionada"
        ).value;

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
            "Confirmación Pendiente",

            pagoRegistrado:
            true

        });

        carrito.splice(
            index,
            1
        );

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

        modalPago.hide();

        alert(
            "Pago realizado correctamente. Pedido registrado."
        );

        location.reload();

    }
);