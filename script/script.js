//VARIABLES
let enviar = false;

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
    new Producto("P01","Barra de chocolate", "rutafake", 3500, 50, "Chocolate en barra 70% de cacao."),
    new Producto("P02","Barra de chocolate 2", "rutafake", 4000, 50, "Chocolate en barra 80% de cacao."),
    new Producto("P03","Bombones de Chocolate", "rutafake", 12000, 100, "Bombones de chocolate marca Felfort"),
];


// FUNCIONES

let crearTarjetas = function(array){
    // creo el section contenedor del titulo y el contenedor de las tarjetas
    let contenedor = document.createElement("section");
    contenedor.classList.add("section-prod"); //le asigno la clase al section
    document.body.appendChild(contenedor);// lo declaro hijo del body
    //creo un nuevo nodo dentro del contenedor
    contenedor.innerHTML = `<h3 class="titulo-prod">Productos</h3>`; 
    
    //creacion del contenedor de las tarjetas de productos
    let contenedorTarjetas = document.createElement("div");
    contenedor.appendChild(contenedorTarjetas);// se lo declaro como hijo del nodo section
    contenedorTarjetas.classList.add("cont-prod"); // se le agrega la clase al nodo div

    //bucle creador de tarjetas para cada producto
    for(i = 0; i < array.length; i++) {
        let tarjeta = document.createElement('div'); //crea el nodo div contenedor de la tarjeta
        tarjeta.classList.add("cont-prod__tarjeta"); // se le agrega la clase
        contenedorTarjetas.appendChild(tarjeta); // se lo declara hijo del contenedor de las tarjetas
        //se crea todos los nodos que conforman la tarjeta
        tarjeta.innerHTML = `
            <img>
            <h3 class="nombre-prod">${array[i].nombre}</h3>
            <p class="precio-prod">$${array[i].precio}</p>
            <div class="cont-carrito">
                <button class="botonCantidad" id="btnMas${array[i].identificador}">+</button>
                <div id="contCantidadProducto${array[i].identificador}"><p id="cantidadProducto${array[i].identificador}">0</p></div>
                <button class="botonCantidad" id="btnMenos${array[i].identificador}">-</button>
                    <button class="botonCarrito" id="${array[i].identificador}">Agregar</button>
                
        `;         
    }
}

// LLAMADO
document.addEventListener("DOMContentLoaded", crearTarjetas(arrayProductos));

// BUCLE PARA DETECTAR LOS EVENTOS DE LOS BOTONES DE LAS TARJETAS
let numerodevueltas = 0; // varaible de prueba

for(i = 0; i < arrayProductos.length; i++){
    //varaible para poder operar dentro de las funciones con el identificador
    const indice = `${arrayProductos[i].identificador}`;
    console.log(`${indice}`);
    
    //variable que reemplaza el valor de los productos segun los eventos de sumas o resta
    let cantidadAgregada = 0;

    //variable para borrar la cantidad asignada por defecto
    let cantidadActual = document.getElementById(`cantidadProducto${indice}`);

    //declaracion del boton suma para cada tarjeta
    const buttonMas = document.querySelector(`#btnMas${indice}`);

    //funcion de evento click en el boton de suma
    buttonMas.onclick = () => {

        numerodevueltas++;
        // variable de cantidad de productos se inicia en cero y cada vez suma uno
        cantidadAgregada++;

        //eliminacion del elemento inicial de la tarjeta
        cantidadActual.remove();
        
        // obtenemos el elemento contenedor del contador de productos
        let contCant = document.getElementById(`contCantidadProducto${indice}`);

        // generamos un nuevo nodo con la variable cantidad actual
        contCant.innerHTML = `<p id="cantidadProducto${indice}">${cantidadAgregada}</p>`;

        
        // imprimimos la variable para debug
        console.log(`CLICK BUCLE ${numerodevueltas}`);
    };

    //declaracion del boton resta para cada tarjeta
    const buttonMenos = document.querySelector(`#btnMenos${indice}`);

    //funcion de evento click para el boton de resta
    buttonMenos.onclick = () => {
        //variable debug
        numerodevueltas++;

        //CONDICIONAL PARA NO OBTENER NUMEROS NEGATIVOS
        if(cantidadAgregada > 0){
            // variable de cantidad de productos se inicia en cero y se resta uno
            cantidadAgregada--;
        }
        
        //eliminacion del elemento inicial de la tarjeta;
        //cantidadActual.remove();

        //obtenemos el contenedor del contador de la cantidad de productos
        let contCant = document.getElementById(`contCantidadProducto${indice}`);

        // generammos el nuevo nodo con la cantidad actual
        contCant.innerHTML = `<p id="cantidadProducto${indice}">${cantidadAgregada}</p>`;

        // debug
        console.log(`CLICK BUCLE ${numerodevueltas}`);
    };

    //declaracion del boton de agregar
    const botonAgregar = document.querySelector(`#${indice}`);
    //funcion de evento click para el boton agregar
    let contenedor = document.createElement(`section`); //creando el contenedor del carrito
        contenedor.classList.add("contenedorCarrito"); // aplicando clase al contenedor
        document.body.appendChild(contenedor);//asignando el contenedor carrito como hijo de body

    let verificarContenedor = ""; //array que contiene los ids del carrito 

    //evento del boton de agregar al carrito
    botonAgregar.onclick = () => {
        this.verificarContenedor = verificarContenedor; // declaracion del arrar dentro de la funcion
        
        let cantidadDeCarritos = [`contenedor${botonAgregar.id}`]; //asignacion de cada caarrito segun el id del boton
        console.log("cantidadCarritos: ", cantidadDeCarritos);

        //capturamos el indice en un variable
        let index = arrayProductos.findIndex(x => x.identificador === `${botonAgregar.id}`);
        // variable del total de la compra
        let precioTotal = parseInt(arrayProductos[index].precio) * parseInt(cantidadAgregada); 
        
        //CONDICIONALES PARA CREAR LOS NODOS DEL CARRITO DE COMPRAS
        if(verificarContenedor == `contenedor${botonAgregar.id}`){
            this.cantidadAgregada = cantidadAgregada;
            precioTotal = parseInt(arrayProductos[index].precio) * parseInt(cantidadAgregada);
            console.log(`cantidadAgregadaActualizada: ${cantidadAgregada} || precioTotalActualizado: ${precioTotal}`);
            //LLEGO A ACTUALIZAR LOS VALORES DEL CARRITO PERO NO ENCUENTRO LA FORMA
            //DE IMPRIMIRLOS NUEVAMENTE EN EL NODO CORRESPONDIENTE
            

            

            console.log("actualizar valores");
        }else if(`${cantidadAgregada}` != 0){

            //CONTRUCTOR DEL NODO DEL CARRITO
            let contenedorProducto= document.createElement(`div`);
            contenedorProducto.classList.add("contenedorProducto");
            contenedorProducto.id = `contenedor${botonAgregar.id}`;
            contenedor.appendChild(contenedorProducto);

            verificarContenedor = contenedorProducto.id;

            
            console.log(`el index de este coso es: ${index}` );

            

            contenedorProducto.innerHTML =[`<p>${arrayProductos[index].nombre}</p>
            <p id="cantidadProductoCarrito${index} actualizar${index}">Unidades: ${cantidadAgregada}</p>
            <p id="precioTotal${index} actualizar${index}">Precio Total: ${precioTotal}</p>
            `];
            
        }
            
         }
            
            
            


 }

    

    

//Evento

