class Producto {
    #nombre; //"Café Americano",
    #precio; //12,
    #categoria; //"Bebida caliente",
    #descripcion; //"Café negro tradicional"
    #imagen; //url

    constructor(nombre, precio, categoria, descripcion, url) {
        this.#nombre = nombre
        this.#precio = precio
        this.#categoria = categoria
        this.#descripcion = descripcion
        this.#imagen = url
    }
    get nombre() {
        return this.#nombre;
    }

    get precio() {
        return this.#precio;
    }

    get categoria() {
        return this.#descripcion;
    }

    get descripcion() {
        return this.#descripcion;
    }

    get imagen() {
        return this.#imagen;
    }
}

//Podria crearse la clase tienda 

class Pedido {
    #producto;

    constructor(procducto) {
        this.producto
    }

    sumar() {
        //aumentar contador y modificar la cantidad
    }

    restar() {

    }

    actualizar(){

    }

    eliminar() {

    }
}

let producto1 = new Producto("Café Americano", 12, 'Bebida caliente', 'Cafe negro tradicional', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8ZP8CVkVsfh1js6RyGlG9XSm3ln_jZxCQQ&s')
let producto2 = new Producto('Cafe Latte', 10, 'Bebida caliente', 'Cafe con leche espumada', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwgW1tj5A9REAeaFZBs8NVRY8UN64rlDPgdQ&s')
let producto3 = new Producto('Frappe de Chocolate', 25, 'Bebida fria', 'Bebida fria con chocolate y crema', 'https://images.aws.nestle.recipes/original/2024_10_28T11_04_59_badun_images.badun.es_82c0d9edbe53_frapuccino_de_chocolate.jpg')
let producto4 = new Producto('Smoothie de Fresa', 22, 'Bebida fria', 'Batido natural de fresa', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQTuHbjg4tZXMSy4sx1wP_E8L0YJR95lBZw&s')
let producto5 = new Producto('Muffin de Vainilla', 15, 'Postre', 'Pan dulce suave de vainilla', 'https://cdn.recetasderechupete.com/wp-content/uploads/2026/02/cupcakes-de-vainilla-especial-Carnaval-portada.png')
let producto6 = new Producto('Cheesecake', 20, 'Postre', 'Pastel frio de queso', 'https://static.eldiario.es/clip/943f6789-e20e-46de-8092-f2d6fbe4a9dd_16-9-discover-aspect-ratio_default_0.jpg')
let producto7 = new Producto('Sandwich de Pollo', 30, 'Comida', 'Sandwich de Pollo', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUd4qbDF_S2hTJp2PoD2qNcXOHszaLpbcFKg&s')
let producto8 = new Producto('Bagel con Queso', 20, 'Comida', 'Bagel tostado con queso crema', 'https://images.freeimages.com/images/premium/previews/2234/22348026-bagel-with-cream-cheese.jpg')

let productos = [];
let htmlProducto = ''
let contador = -1;

let contenedorProductos = document.querySelector('#contenedorProductos')

productos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8)//podria ser un clase tienda.

productos.forEach(object => {
    contador++
    htmlProducto += `<div id="${contador}" class="col-md-6 hola">
                    <div class="card card-producto h-100">
                        <img src="${object.imagen}" class="w-100 h-100">
                        <div class="card-body">
                            <h5 class="card-title">${object.nombre}</h5>
                            <p class="card-text">${object.categoria}</p> 
                            <p class="card-text">
                                ${object.descripcion}
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="fw-bold text-success">
                                    Q.${object.precio}
                                </span>
                                <button id="${contador}" class="btn btn-dark">
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`
})
contenedorProductos.innerHTML = htmlProducto
let botonesAgregar = document.querySelectorAll('.btn')
let divs = document.querySelectorAll('.hola')
let pedidosVisuales = document.querySelector('#pedidosVisuales')
let temporal = 0;
let nuevoPedido = ''
let validacion = [];

botonesAgregar.forEach(btn => {

    btn.addEventListener('click', (event) => {
        console.log(event.target)
        console.log(event)

        //llamar a la clsse Pedidos
        //Enviarle el producto (que sera seleccionado conforme la posicion de arreglo)
        //en base a eso actualizar la seccion pedidos
        //En esta parte podria aplicar dibujado o renderizajo

        //Colocar los datos del producto desde la clase de pedidos  !important

        //Metodo de sumar
        //Metodo restar (validar que no pase a cero)
        //Actualizar total segun sume o reste
        //Habilitar boton de borrar
        //Distunguirlo 
        //Actualizar segun elimine 

        //Validar renderizado (conforme al valor del selector)

        nuevoPedido = ''
        let temporal = event.target.id
        console.log(temporal)
        nuevoPedido = `<div id="${temporal}" class="border rounded p-3 mb-3">
                            <div class="d-flex justify-content-between">
                                <h6 name="name">${productos[temporal].nombre}</h6>
                                <span>Precio Unitario: Q${productos[temporal].precio}. 00</span>
                                <span>Subtotal: </span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <div class="btn-group ">
                                    <button class="btn btn-outline-danger">
                                        -
                                    </button>
                                    <button class="btn btn-outline-secondary">
                                        1
                                    </button>
                                    <button class="btn btn-outline-success">
                                        +
                                    </button>
                                </div>
                                <button class="btn btn-danger">
                                    Eliminar
                                </button>
                            </div>`
        //Seleccionar botones renderizando

        if (!validacion.includes(nuevoPedido)) {
            validacion.push(nuevoPedido)
            pedidosVisuales.innerHTML += nuevoPedido

            //llamar Pedidos

        }

    })

})





