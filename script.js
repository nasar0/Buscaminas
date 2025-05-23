let filas = 20;
let colum = 20;
let lado = 30;  // Corrección: Definir tamaño fijo de las celdas
let minas = Math.floor((filas * colum) * 0.05);
let marcas = 0;

let html = "";
let tablero = [];

let enJuego = true;
let juego = false;

function nuevoJuego() {
    reiniciarVariables();
    generarTablero();
    generarTableroJuego();
    annadirEvento();
    refresh();

}
function annadirEvento() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < colum; c++) {
            let celda = document.getElementById(`celda-${c}-${f}`);
            celda.addEventListener("dblclick", me => {
                dobleClic(celda, c, f, me);
            })
            celda.addEventListener("mouseup", me => {
                Clic(celda, c, f, me);
            })
        }
    }
}

function Clic(celda, c, f, me) {
    if (!enJuego) {
        return;
    }
    if (tablero[c][f].estado === "descubierto") {
        return; // No hacer nada si ya está descubierto
    }

    switch (me.button) {
        case 0: // Clic izquierdo
            if (tablero[c][f].estado === "marcado") {
                break; // No hacer nada si está marcado
            }
            while (!juego && tablero[c][f].valor === -1) {
                generarTableroJuego(); // Genera el tablero si hay mina
            }
            tablero[c][f].estado = "descubierto"; // Descubrir la celda
            juego = true;
            if (tablero[c][f].valor == 0) {
                abrirArea(c, f)
            }
            break;
        case 1:
            break;
        case 2: // Clic derecho
            if (tablero[c][f].estado === "marcado") {
                tablero[c][f].estado = undefined; // Desmarcar la celda
                marcas--; // Decrementar marcas
            } else {
                tablero[c][f].estado = "marcado"; // Marcar la celda
                marcas++; // Incrementar marcas
            }
            break;

        default:
            break;
    }
    refresh(); // Refresca el tablero después de cualquier acción
}
function abrirArea(c, f) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            try {
                if (tablero[c + i][f + j].estado != "descubierto") {
                    if (tablero[c + i][f + j].estado != "marcado") {
                        tablero[c + i][f + j].estado = "descubierto"
                        if (tablero[c + i][f + j].valor == 0) {
                            abrirArea(c + i, f + j);
                        }
                    }
                }
            } catch (e) {

            }
        }
    }
}

function generarTablero() {

    html = "";


    for (let f = 0; f < filas; f++) {
        html += `<tr>`;
        for (let c = 0; c < colum; c++) {

            html += `<td id="celda-${c}-${f}" style="width:${lado}px;height:${lado}px;">`;
            html += `</td>`;
        }
        html += `</tr>`;
    }


    let tableroInHtml = document.getElementById("tablero");
    tableroInHtml.innerHTML = html;

    let tableroHTML = document.getElementById("tablero")
    tableroHTML.innerHTML = html
    tableroHTML.style.width = colum * lado + "px"
    tableroHTML.style.height = filas * lado + "px"
    tableroHTML.style.background = "slategray"

}

function generarTableroJuego() {
    vaciarTablero();
    ponerMinas();
    contadorMinas();
}

function vaciarTablero() {
    tablero = [];
    for (let c = 0; c < colum; c++) {
        tablero.push([]);
    }
}

function ponerMinas() {
    for (let i = 0; i < minas; i++) {
        let c;
        let f;
        do {
            c = Math.floor(Math.random() * colum);
            f = Math.floor(Math.random() * filas);
        } while (tablero[c][f]);
        tablero[c][f] = { valor: -1 };
    }
}

function contadorMinas() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < colum; c++) {
            if (!tablero[c][f]) {
                let contador = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i == 0 && j == 0) {
                            continue;
                        }
                        try {
                            if (tablero[c + i][f + j].valor === -1) {
                                contador++;
                            }
                        } catch (e) {

                        }
                    }

                }
                tablero[c][f] = { valor: contador };
            }
        }
    }
}
function reiniciarVariables() {
    marcas = 0
    enJuego = true
    juegoIniciado = false
}
function refresh() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < colum; c++) {
            let celda = document.getElementById(`celda-${c}-${f}`);
            if (tablero[c][f].estado == "descubierto") {
                celda.style.boxShadow = "none";
                switch (tablero[c][f].valor) {
                    case -1:
                        celda.innerHTML = `<img src="https://cdn2.steamgriddb.com/icon_thumb/5698620bc382e43590e89eefc3097d3e.png" alt="">`;
                        celda.style.background = "white";
                        break;
                    case 0:
                        break;
                    default:
                        celda.innerHTML = tablero[c][f].valor;
                        break;
                }
            }
            if (tablero[c][f].estado === "marcado") {
                celda.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/552/552062.png" alt="">`;
                celda.style.color = "lightblue"; 
                celda.style.backgroundColor = "lightgray"; 
            }

            if (tablero[c][f].estado === undefined) {
                celda.innerHTML = ""
                celda.style.background = "";
            }


        }
    }
    VerfiPerder();
    VerfiGan();
    actualizarPanelMinas()
}
function actualizarPanelMinas() {
    let panel = document.getElementById("minas");
    panel.innerHTML = minas - marcas;
}
function VerfiPerder() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < colum; c++) {
            if (tablero[c][f].valor == -1) {
                if (tablero[c][f].estado == "descubierto") {
                    let tablerohtml = document.getElementById("tablero");
                    tablerohtml.style.background = "Red";
                    enJuego = false;
                }
            }
        }
    }
    if (enJuego) {
        return;
    }
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < colum; c++) {
            if (tablero[c][f].valor == -1) {
                let celda = document.getElementById(`celda-${c}-${f}`);
                celda.innerHTML = `<img src="https://cdn2.steamgriddb.com/icon_thumb/5698620bc382e43590e89eefc3097d3e.png" alt="">`;
                celda.style.color = "black";
            }

        }
    }
}
function VerfiGan() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < colum; c++) {
            if (tablero[c][f].estado != "descubierto") {
                if (tablero[c][f].valor == -1) {
                    continue;
                } else {
                    return;
                }
            }
        }
    }
    let tablerohtml = document.getElementById("tablero");
    tablerohtml.style.background = "green";
    enJuego = false;
}


async function ajustes() {
    const {
        value: ajustes
    } = await swal.fire({
        title: "Ajustes",
        html: `
                Dificultad &nbsp; (minas/área)
                <br>
                <br>
                <input onchange="cambiarValor()" oninput="this.onchange()" id="dificultad" type="range" min="10" max="40" step="1" value="${100 * minas / (filas * colum)}" onchange="">
                <span id="valor-dificultad">${100 * minas / (filas * colum)}%</span>
                <br>
                <br>
                Filas
                <br>
                <input class="swal2-input" type="number" value=${filas} placeholder="filas" id="filas" min="10" max="1000" step="1">
                <br>
                columa
                <br>
                <input class="swal2-input" type="number" value=${colum} placeholder="colum" id="colum" min="10" max="1000" step="1">
                <br>
                `,
        confirmButtonText: "Establecer",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        preConfirm: () => {
            return {
                colum: document.getElementById("colum").value,
                filas: document.getElementById("filas").value,
                dificultad: document.getElementById("dificultad").value
            }
        }
    })
    if (!ajustes) {
        return
    }
    filas = Math.floor(ajustes.filas)
    colum = Math.floor(ajustes.colum)
    minas = Math.floor(colum * filas * ajustes.dificultad / 100)
    nuevoJuego()
}
nuevoJuego();