//creo la clase que va a alojar a los objetos para luego poder manipularlos
class Servicio {
    constructor(datos) {
        this.id = parseInt(datos.id);
        this.nombre = datos.nombre;
        this.precio = parseFloat(datos.precio);
        this.imagen = datos.imagen;
    }
    sumarIva() {
        this.precio *= 1.21;
    }
}
const prefijo = "serviciosID";

//contenedorServicios guarda al div html..
let contenedorServicios = document.getElementById("seccionServicios");
//creo una funcion para generar el html en el que van a estar todos mis servicios
function servicios(servicio) {
    //creo el contenedor que va a alojar a los div de cada servicio que ofresco
    let contenedor = document.createElement("div");
    contenedor.id = prefijo + servicio.id;
    contenedor.classList.add("col-mb-2", "mb-4");
    contenedor.innerHTML = `<div class="card">
    <img src="${servicio.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${servicio.nombre}</h5>
    <p class="card-text">$${servicio.precio}</p>
    <button id="${servicio.id}" class = "botonComprar">COMPRAR</button>
    </div>`;
    //genero un nodo hijo por cada servicio que agrego (un div por cada servicio, al div que va a contener a todos)
    contenedorServicios.appendChild(contenedor);
}

//itero para incluir cada servicio al html generado por la funcion servicios
for (const crearServicios of DATOS) {
    //llamo a la funcion que va a crear los objetos del html
    servicios(crearServicios);
}

//tomo los botones a traves de la clase para identificar que producto selecciono
let botones = document.getElementsByClassName("botonComprar");

//itero botones para detectar que boton selecciono el usuario y ahi llamo a la funcion <carrito>
for (const botonUsr of botones) {
    botonUsr.onclick = carritoUsr;
    console.log(carritoUsr);
}



//const va a alojar los servicios que seleccione el usuario en un array
const serviciosSeleccionados = [];

//seleccionadosStorage guarda los servicios que seleccione el usuario en el localstorage

const seleccionadosStorage = [];

//funcion que toma del localStorage lo que selecciono el usuario
function carritoUsr(clickUsr) {
    let opcionUsr = clickUsr.target.id;
    let servicioUsr = new Servicio(DATOS.find(objeto => objeto.id == opcionUsr));
    console.log(opcionUsr);
    serviciosSeleccionados.push(servicioUsr);
    //llamo a la funcion para guardar en el localstorage
    guardarLocalStorage ("serviciosStorage",serviciosSeleccionados);
   
    //recupero los elementos del localstorage y genero los elementos del dom
    recuperarLocalStorage ("serviciosStorage");


   pagoTotal();
   imprimirTotal(montoTotal); 
   console.log(montoTotal);   
   carritoFinal(seleccionadosStorage);

}

//funcion para guardar en el localStorage
function guardarLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));   
}


//funcion para recuperar los datos del localStorage
let almacenados = "";
function recuperarLocalStorage(clave) {
    let almacenados = JSON.parse(localStorage.getItem(clave));
    seleccionadosStorage.length = 0;
    for (const recuperar of almacenados) {
        seleccionadosStorage.push(new Servicio(recuperar));
    }
console.log(almacenados);
}

//funcion que imprime en pantalla los servicios que selecciona el usuario e imprime el total que va a pagar el usuario

function carritoFinal(compra) {
    let compraFinal = "";
    for (const servicioFinal of compra) {
        compraFinal += `<a href="#" class="list-group-item list-group-item-action active">
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${servicioFinal.nombre} $${servicioFinal.precio}</h5>
        </div>`;
    }
    document.getElementById("miCarrito").innerHTML = compraFinal;
    console.log(compraFinal);

}


//aplicacion de Jquery 
$(".bontonComprar").click(function(e){
    e.preventDefault()
    $(".list-group-item list-group-item-action active").slideDown("3000");
})

    $(".botonComprar").click(function(e){
        e.preventDefault()
        $(this).text("SELECCIONADO")
               .css("background","#c26e3e");
    })

$(".botonComprar").click (function(e){ 
        e.preventDefault();
        $(".notificacion").prepend(`<h5> Se agrego un servicio al carrito </h5>`);
        $("h5").fadeOut("fast",function(e){
            $("h3").delay(1000)
                   .fadeIn(500);
        })
})
                        


let montoTotal = 0;
function pagoTotal() {
seleccionadosStorage.forEach((servicio) =>{
    montoTotal += servicio.precio;
})
}

function imprimirTotal(servicio) {
    let imprimir = document.getElementById("aPagar");
    imprimir.innerHTML =`<h5 class="card-header">Monto a pagar</h5>
    <div class="card-body">
    <p class="card-text">$${servicio}</p>
    <a href="#" class="btnConfirmar">Confirmar Compra</a>
    </div>`
}
