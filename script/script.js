//Librerias

//VARIABLES
let cantInicial = 0;
let cantTarjetas = 0;

const productosDB = '../data/data.json';
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
let arrayProductos = [];

// FUNCIONES
// Pedido de objetos al servidor
async function pedirObjetosProducto(){
    try{
        const resp = await fetch(productosDB);
        const data = await resp.json();
        data.forEach((producto) => {
        arrayProductos.push(producto);
    });
    }catch{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se puedo obtener los datos del servidor"
        });
    }
}
// Una vez finalizado el pedido se hace el llamado a las funciones dependientes de la respuesta
pedirObjetosProducto().then( () =>{
    crearTarjetas(arrayProductos);
    detectarBotones();
});



let crearTarjetas = function(array){

    let contenedor = document.querySelector(".section-prod");

    //creo un nuevo nodo dentro del contenedor
    const tituloProd = document.createElement('h3');
    tituloProd.textContent = 'Productos';
    tituloProd.classList.add(`tituloProd`);
    contenedor.appendChild(tituloProd);
    
    //creacion del contenedor de las tarjetas de productos
    const contenedorTarjetas = document.createElement("div");
    contenedor.appendChild(contenedorTarjetas);// se lo declaro como hijo del nodo section
    contenedorTarjetas.classList.add("cont-prod"); // se le agrega la clase al nodo div

    //bucle creador de tarjetas para cada producto
    arrayProductos.forEach(function (producto, i) {

        let identificador = array[i].identificador;
    
        const tarjeta = document.createElement('div'); //crea el nodo div contenedor de la tarjeta
        tarjeta.classList.add(`contTarjeta`); // se le agrega la clase
        contenedorTarjetas.appendChild(tarjeta); // se lo declara hijo del contenedor de las tarjetas
        tarjeta.id = `tarjeta${identificador}`; // se agrega un id unico para cada tajeta

        //se crea todos los nodos que conforman la tarjeta
        const imgTarjeta = document.createElement(`img`);
        imgTarjeta.classList.add('imgTarjeta');
        tarjeta.appendChild(imgTarjeta);//declaramos la imagen como hijo de la tarjeta

        const nombreProd = document.createElement("p");
        nombreProd.classList.add("nombreTarjeta");
        tarjeta.appendChild(nombreProd);
        nombreProd.textContent = `${arrayProductos[i].nombre}`;

        const precio = document.createElement('p');
        precio.classList.add('precioTarjeta');
        tarjeta.appendChild(precio);
        precio.textContent = `$${arrayProductos[i].precio}`;

        const contBtnTarjetas = document.createElement(`div`);
        contBtnTarjetas.classList.add('contBtnTarjeta');
        tarjeta.appendChild(contBtnTarjetas);


        const btnMas = document.createElement('button');
        btnMas.classList.add('btnMasTarjeta');
        btnMas.textContent = "+";
        contBtnTarjetas.appendChild(btnMas);

        const cantidad = document.createElement('p');
        cantidad.textContent =`${cantInicial}`;
        contBtnTarjetas.appendChild(cantidad);



        const btnMenos = document.createElement('button');
        btnMenos.classList.add('btnMenosTarjeta');
        btnMenos.textContent = "-";
        contBtnTarjetas.appendChild(btnMenos);

        const btnAgregar = document.createElement('button');
        btnAgregar.classList.add(`btnAgregar`);
        btnAgregar.textContent = `Agregar`;
        contBtnTarjetas.appendChild(btnAgregar);

    
    });    
}

function contadorCantidadTarjetas(){
    const tarjetas = document.querySelectorAll(".contTarjeta");
    let contadorTarjeta = 0;
    if(tarjetas !== null){
        tarjetas.forEach((tarjeta) => {
            contadorTarjeta++;
        });    
    }
    
    return contadorTarjeta;
}


function sumarCant(contenedor){
    let objCant = contenedor.querySelector('p');
    let cant = parseInt(objCant.textContent);

    cant++;

    objCant.textContent = `${cant}`;
}

function restarCant(contenedor){
    let objCant = contenedor.querySelector('p');
    let cant = parseInt(objCant.textContent);

    if(cant > 0){
        cant--;
    }

    objCant.textContent = `${cant}`;
}

function agregarProductosLS(contenedorBtn, contenedorTarj, indice){
    //obtengo el string del precio del producto
    let precio = arrayProductos[indice].precio;
    // le quito el primer caracter ($) y lo conviero a entero
    
    const cantidad = parseInt(contenedorBtn.querySelector('p').textContent);

    let precioTotal = precio * cantidad;

    //calcularmos el precio total y lo agregarmos al localStorage
    if(cantidad > 0  && contenedorTarj.id === `tarjeta${indice}`){
        let agregarProd = {id: `${arrayProductos[indice].identificador}`, nombre: `${arrayProductos[indice].nombre}`, precio: `${precioTotal}`,
        cantidad: `${cantidad}`};
        localStorage.setItem(`producto${indice}`, JSON.stringify(agregarProd));
    }

}

function contarProdAlmacenados(){
    let prodAlmacenados = 0;

    //creo una variable para filtrar entre los productos almacenados
    //de los otros elementos del local storage
    for(i = 0; i < localStorage.length; i++){
        const clave = localStorage.key(i);
        if(clave.includes(`producto`)){
            prodAlmacenados++;
        }
    }
    return prodAlmacenados;
}

function calcularPrecioTotal(){
    let precioTotal = 0;
    for(i = 0; i < localStorage.length; i++){
        const clave = localStorage.key(i);
        if(clave.includes('producto')){
            let producto = JSON.parse(localStorage[clave]);
            
            precioTotal += parseInt(producto.precio);
        }
    }
    return precioTotal;
}

function creadorProdCarrito(productoLS, clave){
    // esta es la funcion que crea los contenedores dentro del carrito
    const existeContProd = document.querySelector(`#cont${clave}`);

    const contCarritoProductos = document.querySelector('.contCarritoProductos'); // obtiene el nodo del carrito

    

    //si no existe el contenedor del carrito lo crea, sino lo actualiza 
    if(existeContProd === null){ 
        const contenedorProducto = document.createElement('div');
            contenedorProducto.classList.add('contProd');
            contenedorProducto.id = `cont${clave}`;
            contCarritoProductos.appendChild(contenedorProducto);

        //bucle para crear los nodos hijos de cada contenedor de producto en el carrito
        for(x = 1; x <=  4; x++){
               switch(x){
                    case 1:
                        contBtnEliminar = document.createElement('div');
                        contenedorProducto.appendChild(contBtnEliminar);
                        break;
                    case 2:
                       const contNombre = document.createElement('div');
                        contNombre.classList.add('contTextocarrito');
                       contenedorProducto.appendChild(contNombre);

                       const textoNombre = document.createElement('p');
                       contNombre.appendChild(textoNombre);
                       textoNombre.textContent = `${productoLS['nombre']}`;
                    break;
                    case 3: 
                        const contUnidades = document.createElement('div');
                        contUnidades.classList.add('contTextocarrito');
                        contenedorProducto.appendChild(contUnidades);
                        
                        const textoUnidades = document.createElement('p');
                        textoUnidades.textContent = `${productoLS['cantidad']}`;
                        contUnidades.appendChild(textoUnidades);
                    break;

                    case 4:
                        const contPrecio = document.createElement('div');
                        contPrecio.classList.add('contTextoCarrito');
                        contenedorProducto.appendChild(contPrecio);

                        const textoPrecio = document.createElement('p');
                        textoPrecio.textContent = `$${productoLS['precio']}`;
                        contPrecio.appendChild(textoPrecio);

                    break;

                }
           }  
       
        }else{
            //si ya esta creado el nodo cambio los valores del producto tomando el LS
            const contenedor = document.getElementById(`cont${clave}`);
            const nodosHijos = contenedor.childNodes;

            for(x = 1; x <= nodosHijos.length; x++){
                let cont = nodosHijos[x];
                switch(x){
                    case 1:
                        const cantidad = cont.querySelector('p');
                        cantidad.remove();

                        const cantidadNueva = document.createElement('p');
                        cantidadNueva.textContent = `${productoLS['cantidad']}`;
                        cont.appendChild(cantidadNueva);

                    break;
                    case 2:
                        const precio = cont.querySelector('p');
                        precio.remove();

                        const precioNuevo = document.createElement('p');
                        precioNuevo.textContent = `$${productoLS['precio']}`;
                        cont.appendChild(precioNuevo);
                    break;
                }

            }
            
        }
}

function crearCarritoInicio(){
    //ESTA ES LA FUNCION QUE CREA EL CARRITO CUANDO SE ACTUALIZA LA PAGINA SI EXISTE ALGO EN EL LOCALS
    let productosAlmacenados = contarProdAlmacenados();

    //creo el contenedor del carrito
    
    if(productosAlmacenados > 0){
        let contCarrito = document.createElement("section");
        contCarrito.classList.add('contCarrito');
        document.body.appendChild(contCarrito);

        const carritoIndice = document.createElement('div');
        carritoIndice.classList.add('carritoIndice');
        contCarrito.appendChild(carritoIndice);

        let nombreIndice = document.createElement('p');
        nombreIndice.textContent = 'Producto';
        nombreIndice.classList.add('producto');
        carritoIndice.appendChild(nombreIndice);

        let cantidadIndice = document.createElement('p');
        cantidadIndice.textContent = 'Unidades';
        cantidadIndice.classList.add('unidades');
        carritoIndice.appendChild(cantidadIndice);

        let precioIndice = document.createElement('p');
        precioIndice.textContent = 'Precio';
        precioIndice.classList.add('precio');
        carritoIndice.appendChild(precioIndice);


        const contCarritoProductos = document.createElement('div');
        contCarritoProductos.classList.add('contCarritoProductos');
        contCarrito.appendChild(contCarritoProductos);
    }
    
    
    //bucle para crear cada uno de los contenedores del producto en le carrito
    for(i = 0; i < productosAlmacenados; i++){ 
        let clave = localStorage.key(i);
        let productoLS = JSON.parse(localStorage.getItem(clave));
        creadorProdCarrito(productoLS, clave);
    }   

    crearCarritoPrecioTotal();

}

function crearCarritoAgregado(indice){
    //ESTA FUNCION CREA EL CARRITO SI NO EXISTE CUANDO SE AGREGA UN PRODUCTO

    const exiteContCarrito = document.querySelector('.contCarrito');
    const exiteIndiceCarrito = document.querySelector('.carritoIndice')
    let productosAlmacenados = contarProdAlmacenados();

    if(exiteContCarrito === null && productosAlmacenados > 0){
        
        const contCarrito = document.createElement("section");
        contCarrito.classList.add('contCarrito');
        document.body.appendChild(contCarrito);
        
        if(exiteIndiceCarrito === null){
            const carritoIndice = document.createElement('div');
        carritoIndice.classList.add('carritoIndice');
        contCarrito.appendChild(carritoIndice);

        let nombreIndice = document.createElement('p');
        nombreIndice.textContent = 'Producto';
        nombreIndice.classList.add('producto');
        carritoIndice.appendChild(nombreIndice);

        let cantidadIndice = document.createElement('p');
        cantidadIndice.textContent = 'Unidades';
        cantidadIndice.classList.add('unidades');
        carritoIndice.appendChild(cantidadIndice);

        let precioIndice = document.createElement('p');
        precioIndice.textContent = 'Precio';
        precioIndice.classList.add('precio');
        carritoIndice.appendChild(precioIndice);
        }
        

        const contCarritoProductos = document.createElement('div');
        contCarritoProductos.classList.add('contCarritoProductos');
        contCarrito.appendChild(contCarritoProductos);

    }

    

    let clave = `producto${indice}`;

    let productoLS = JSON.parse(localStorage.getItem(`${clave}`));

    creadorProdCarrito(productoLS, clave);   
    crearCarritoPrecioTotal();
}

function crearCarritoPrecioTotal(){
    //creo el contenedor con el precio final del carrito
    const contenedor = document.querySelector('.contCarrito');
    const contenedorTotal = document.querySelector('.carritoPrecioTotal');
    const precio = calcularPrecioTotal();

    if(contenedor !== null && contenedorTotal == null){
        const contTotal = document.createElement('div');
        contTotal.classList.add('carritoPrecioTotal');
        contenedor.appendChild(contTotal);

        const contPrecio = document.createElement('div');
        contTotal.appendChild(contPrecio);

        const textoPrecio = document.createElement('p');
        contPrecio.appendChild(textoPrecio);

        textoPrecio.textContent = `Total: $${precio}`;

        const botonFinalizar = document.createElement('button');
        botonFinalizar.classList.add('btnFinalizarCompra');
        botonFinalizar.id = 'btnFinalizarCompra';
        botonFinalizar.textContent = 'Finalizar Compra';
        contPrecio.appendChild(botonFinalizar);

    }else if(contenedor !== null){
        const textoPrecio = contenedorTotal.querySelector('p');
        textoPrecio.textContent = `Total: $${precio}`;
    }   

    detectarBtnFinalizar();
}


// LLAMADO A LAS FUNCIONES QUE SE EJECUTAN AL INICIO DE LA PAGINA
document.addEventListener("DOMContentLoaded", pedirObjetosProducto());
document.addEventListener("DOMContentLoaded", crearCarritoInicio());

//declaramos el array de botones
const botonesMas = document.getElementsByClassName(`btnMasTarjeta`);
const botonesMenos = document.getElementsByClassName(`btnMenosTarjeta`);
const botonesAgregar = document.getElementsByClassName(`btnAgregar`);

// FUNCIONES PARA EL LLAMADO A LOS EVENTO DE LOS BOTONES 

function detectarBtnFinalizar(){
    let btnFinalizar = document.querySelector("#btnFinalizarCompra");

    if(btnFinalizar !== null){
        btnFinalizar.addEventListener('click' , () => {
            Swal.fire({
                title: 'Gracias por elegirnos',
                text: 'Su compra ha finalizado con Exito',
                icon: 'success',
                confirmButtonText:'Continuar'
            });
        });
    }
}


//Funcion para la deteccion de elementos generados a partir de la cantidad de productos que haya
function detectarBotones(){
    for(i = 0; i < arrayProductos.length; i++){
        let indice = i;   
        //declaramos el contenedor padre de lo botones de cada tarjeta
        const contenedorBtnMas = botonesMas[i].parentNode; 
        
        const contenedorBtnMenos = botonesMenos[i].parentNode;
        const contenedorAgregar = botonesAgregar[i].parentNode;
        const contenedorTarjeta = contenedorAgregar.parentNode;
    
        
        botonesMas[i].onclick = () => {
            sumarCant(contenedorBtnMas);
        }
    
        botonesMenos[i].onclick = () => {
            restarCant(contenedorBtnMenos);
        }
    
        botonesAgregar[i].onclick = () => {
            agregarProductosLS(contenedorAgregar, contenedorTarjeta, indice);
            crearCarritoAgregado(indice);
        }
    }

}




