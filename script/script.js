// CLASES
class Producto{
    constructor(identificador, nombre, imagen, precio, stock, descripcion){
        this.identificador = identificador;
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
        this.descripcion = descripcion;
    }
}

// DECLARACION DE OBJETOS
let arrayProductos = [
    new Producto("prod1","Barra de chocolate", "rutafake", 3500, 50, "Chocolate en barra 70% de cacao."),
    new Producto("prod2","Barra de chocolate 2", "rutafake", 4000, 50, "Chocolate en barra 80% de cacao."),
    new Producto("prod3","Bombones de Chocolate", "rutafake", 12000, 100, "Bombones de chocolate marca Felfort"),
];


// FUNCIONES

let crearTarjetas = function(array){
    // creo el section contenedor del titulo y el contenedor de las tarjetas
    let contenedor = document.createElement("section");
    contenedor.classList.add("section-prod"); //le asigno la clase al section
    document.body.appendChild(contenedor);// lo declaro hijo del body
    contenedor.innerHTML = `<h3 class="titulo-prod">Productos</h3>`;
    
    //creacion del contenedor de las tarjetas de productos
    let contenedorTarjetas = document.createElement("div");
    contenedor.appendChild(contenedorTarjetas);
    contenedorTarjetas.classList.add("cont-prod");

    //bucle creador de tarjetas para cada producto
    for(i = 0; i < array.length; i++) {
        let tarjeta = document.createElement('div');
        tarjeta.classList.add("cont-prod__tarjeta");
        contenedorTarjetas.appendChild(tarjeta);
        tarjeta.innerHTML = `
            <img>
            <h3 class="nombre-prod">${array[i].nombre}</h3>
            <p class="precio-prod">$${array[i].precio}</p>
            <div class="cont-carrito">
                <button class="botonCantidad" id="btnMas${array[i].identificador}">+</button>
                <p id="cantidadProducto${array[i].identificador}">0</p>
                <button class="botonCantidad" id="btnMenos${array[i].identificador}">-</button>
                <div class="boton-carrito">
                    <p>Agregar</p>
                </div>
        `;         
    }
}

// LLAMADO
document.addEventListener("DOMContentLoaded", crearTarjetas(arrayProductos));
//crearTarjetas(arrayProductos);