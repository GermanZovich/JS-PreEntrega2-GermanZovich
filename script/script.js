//VARIABLES
let cantInicial = 0;
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
    new Producto("0","Barra de chocolate", "rutafake", 3500, 50, "Chocolate en barra 70% de cacao."),
    new Producto("1","Barra de chocolate 2", "rutafake", 4000, 50, "Chocolate en barra 80% de cacao."),
    new Producto("2","Bombones de Chocolate", "rutafake", 12000, 100, "Bombones de chocolate marca Felfort"),
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
    //contenedorTarjetas.id = `tarjeta${array.identificador}`;

    //bucle creador de tarjetas para cada producto
    arrayProductos.forEach(function (producto, i) {

        let identificador = array[i].identificador;
    
        let tarjeta = document.createElement('div'); //crea el nodo div contenedor de la tarjeta
        tarjeta.classList.add(`contTarjeta`); // se le agrega la clase
        contenedorTarjetas.appendChild(tarjeta); // se lo declara hijo del contenedor de las tarjetas
        tarjeta.id = `tarjeta${identificador}`; // se agrega un id unico para cada tajeta

        //se crea todos los nodos que conforman la tarjeta
        let imgTarjeta = document.createElement(`img`);
        //aplicando estilos a las imagenes del
        imgTarjeta.setAttribute("style", `border: 1px solid red;
         width: 300px; height: 200px;
         overflow:hidden;
         `);
        tarjeta.appendChild(imgTarjeta);//declaramos la imagen como hijo de la tarjeta

        let nombreProd = document.createElement("p");
        nombreProd.classList.add("nombreTarjeta");
        tarjeta.appendChild(nombreProd);
        nombreProd.textContent = `${arrayProductos[i].nombre}`;

        let precio = document.createElement('p');
        precio.classList.add('precioTarjeta');
        tarjeta.appendChild(precio);
        precio.textContent = `$${arrayProductos[i].precio}`;

        let contBtnTarjetas = document.createElement(`div`);
        contBtnTarjetas.classList.add('contBtnTarjeta');
        tarjeta.appendChild(contBtnTarjetas);


        let btnMas = document.createElement('button');
        btnMas.classList.add('btnMasTarjeta');
        btnMas.textContent = "+";
        contBtnTarjetas.appendChild(btnMas);

        let cantidad = document.createElement('p');
        cantidad.textContent =`${cantInicial}`;
        contBtnTarjetas.appendChild(cantidad);



        let btnMenos = document.createElement('button');
        btnMenos.classList.add('btnMenosTarjeta');
        btnMenos.textContent = "-";
        contBtnTarjetas.appendChild(btnMenos);

        let btnAgregar = document.createElement('button');
        btnAgregar.classList.add(`btnAgregar`);
        btnAgregar.textContent = `Agregar`;
        contBtnTarjetas.appendChild(btnAgregar);

    
    });    
}

function sumarCant(contenedor){
    let objCant = contenedor.firstChild.nextSibling;
    let cant = parseInt(objCant.textContent);

    cant++;

    objCant.textContent = `${cant}`;
}

function restarCant(contenedor){
    let objCant = contenedor.firstChild.nextSibling;
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
    
    let cantidad = parseInt(contenedorBtn.firstChild.nextSibling.textContent);

    let precioTotal = precio * cantidad;

    //calcularmos el precio total y lo agregarmos al localStorage
    if(cantidad > 0  && contenedorTarj.id === `tarjeta${indice}`){
        let agregarProd = {id: `${arrayProductos[indice].identificador}`, nombre: `${arrayProductos[indice].nombre}`, precio: `${precioTotal}`,
        cantidad: `${cantidad}`};
        localStorage.setItem(`producto${indice}`, JSON.stringify(agregarProd));
        console.log(agregarProd);
    }

}

function creadorProdCarrito(productoLS, clave){
    // esta es la funcion que crea los contenedores dentro del carrito
    let existeContProd = document.querySelector(`#cont${clave}`);

    console.log(`existe contenedor ${existeContProd}`);

    let contCarrito = document.querySelector('.contCarrito'); // obtiene el nodo del carrito

    //si no existe el contenedor del carrito lo crea, sino lo actualiza 
    if(existeContProd === null){ 
        let contenedorProducto = document.createElement('div');
            contenedorProducto.classList.add('contProd');
            contenedorProducto.id = `cont${clave}`;
            contCarrito.appendChild(contenedorProducto);

        //bucle para crear los nodos hijos de cada contenedor de producto en el carrito
        for(x = 1; x <=  3; x++){
               switch(x){
                    case 1:
                       let contNombre = document.createElement('div');
                        contNombre.classList.add('contTextocarrito');
                       contenedorProducto.appendChild(contNombre);

                       let textoNombre = document.createElement('p');
                       contNombre.appendChild(textoNombre);
                       textoNombre.textContent = `${productoLS['nombre']}`;
                    break;
                    case 2: 
                        let contUnidades = document.createElement('div');
                        contUnidades.classList.add('contTextocarrito');
                        contenedorProducto.appendChild(contUnidades);
                        
                        let textoUnidades = document.createElement('p');
                        textoUnidades.textContent = `${productoLS['cantidad']}`;
                        contUnidades.appendChild(textoUnidades);
                    break;

                    case 3:
                        let contPrecio = document.createElement('div');
                        contPrecio.classList.add('contTextoCarrito');
                        contenedorProducto.appendChild(contPrecio);

                        let textoPrecio = document.createElement('p');
                        textoPrecio.textContent = `${productoLS['precio']}`;
                        contPrecio.appendChild(textoPrecio);

                    break;

                }
           }  
       
        }else{
            //si ya esta creado el nodo cambio los valores del producto tomando el LS
            console.log("contenedor ya existe");
            let contenedor = document.getElementById(`cont${clave}`);
            let nodosHijos = contenedor.childNodes;

            console.log(nodosHijos);
            for(x = 1; x <= nodosHijos.length; x++){
                let cont = nodosHijos[x];
                switch(x){
                    case 1:
                        let cantidad = cont.firstChild;
                        console.log(cantidad);
                        cantidad.remove();
                        cont.innerHTML = `<p>${productoLS['cantidad']}</p>`;
                    break;
                    case 2:
                        let precio = cont.firstChild;
                        precio.remove();
                        cont.innerHTML = `<p>${productoLS['precio']}</p>`
                    break;
                }

            }
            
        }
}

function crearCarritoInicio(){
    //ESTA ES LA FUNCION QUE CREA EL CARRITO CUANDO SE ACTUALIZA LA PAGINA SI EXISTE ALGO EN EL LOCALS
    let productosAlmacenados = 0;

    //creo una variable para filtrar entre los productos almacenados
    //y los otros elementos del local storage

    for(i = 0; i < localStorage.length; i++){
        if(localStorage.getItem(`producto${i}`)){
            productosAlmacenados++;
        }
    }

    //creo el contenedor del carrito
    
    if(productosAlmacenados > 0){
        let contCarrito = document.createElement("section");
        contCarrito.classList.add('contCarrito');
        document.body.appendChild(contCarrito);
    }
    
    
    //bucle para crear cada uno de los contenedores del producto en le carrito
    for(i = 0; i < productosAlmacenados; i++){ 
        let clave = `producto${i}`;
        console.log(`primera${clave}`);
        console.log(`vuelta ${i}`);
        
        let productoLS = JSON.parse(localStorage.getItem(`${clave}`));
        creadorProdCarrito(productoLS, clave);
    }   
}

function crearCarritoAgregado(indice){
    //ESTA FUNCION CREA EL CARRITO SI NO EXISTE CUANDO SE AGREGA UN PRODUCTO

    let exiteContCarrito = document.querySelector('.contCarrito');

    if(exiteContCarrito === null && productosAlmacenados > 0){
        let contCarrito = document.createElement("section");
        contCarrito.classList.add('contCarrito');
        document.body.appendChild(contCarrito);
    }

    let clave = `producto${indice}`
    console.log(`CLAVEEE ${clave}`);

    let productoLS = JSON.parse(localStorage.getItem(`${clave}`));

    creadorProdCarrito(productoLS, clave);

   
}





// LLAMADO
document.addEventListener("DOMContentLoaded", crearTarjetas(arrayProductos));
document.addEventListener("DOMContentLoaded", crearCarritoInicio());

//Bucle para la deteccion de elementos generados a partir de la cantidad de productos que haya
for(i = 0; i < arrayProductos.length; i++){
    let indice = i;
    //declaramos el array de botones
    let botonesMas = document.getElementsByClassName(`btnMasTarjeta`);
    let botonesMenos = document.getElementsByClassName(`btnMenosTarjeta`);
    let botonesAgregar = document.getElementsByClassName(`btnAgregar`);
    //declaramos el contenedor padre de lo botones de cada tarjeta
    let contenedorBtnMas = botonesMas[i].parentNode; 
    let contenedorBtnMenos = botonesMenos[i].parentNode;
    let contenedorAgregar = botonesAgregar[i].parentNode;
    let contenedorTarjeta = contenedorAgregar.parentNode;
    console.log(contenedorTarjeta);

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

//Bucle para deteccion de objertos producto en el localStorage


    
