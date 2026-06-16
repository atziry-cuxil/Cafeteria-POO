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
        return this.#categoria;
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
    //#producto;
    #precio;
    #resultado;
    //#contador;

    constructor(producto) {
        this.producto = producto
        this.#precio = this.producto.precio
        this.#resultado = this.producto.precio;//subtotal
        this.contador = 1;//cantidad
    }
    get precio() {
        return this.#precio
    }

    get resultado() {
        return this.#resultado;
    }

    sumar() {
        this.#resultado = this.#resultado + this.#precio
        return this.resultado
    }

    restar() {
        if (this.contador != 0) {
            this.#resultado = this.#resultado - this.#precio;
        }else{
            this.#resultado = 0
        }
        return this.#resultado
    }

    disminuir() {
        if (this.contador != 0) {
            this.contador--
        }
        return this.contador
    }
    aumentar() {
        this.contador++
        return this.contador
    }

    eliminar() {
        this.contador = 0;
        this.#resultado = 0;
    }
}

// class Totales {
//     constructor(){

//     }
// }

let producto1 = new Producto("Café Americano", 12, 'Bebida caliente', 'Cafe negro tradicional', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8ZP8CVkVsfh1js6RyGlG9XSm3ln_jZxCQQ&s')
let producto2 = new Producto('Cafe Latte', 10, 'Bebida caliente', 'Cafe con leche espumada', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwgW1tj5A9REAeaFZBs8NVRY8UN64rlDPgdQ&s')
let producto3 = new Producto('Frappe de Chocolate', 25, 'Bebida fria', 'Bebida fria con chocolate y crema', 'https://images.aws.nestle.recipes/original/2024_10_28T11_04_59_badun_images.badun.es_82c0d9edbe53_frapuccino_de_chocolate.jpg')
let producto4 = new Producto('Smoothie de Fresa', 22, 'Bebida fria', 'Batido natural de fresa', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQTuHbjg4tZXMSy4sx1wP_E8L0YJR95lBZw&s')
let producto5 = new Producto('Muffin de Vainilla', 15, 'Postre', 'Pan dulce suave de vainilla', 'https://cdn.recetasderechupete.com/wp-content/uploads/2026/02/cupcakes-de-vainilla-especial-Carnaval-portada.png')
let producto6 = new Producto('Cheesecake', 20, 'Postre', 'Pastel frio de queso', 'https://static.eldiario.es/clip/943f6789-e20e-46de-8092-f2d6fbe4a9dd_16-9-discover-aspect-ratio_default_0.jpg')
let producto7 = new Producto('Sandwich de Pollo', 30, 'Comida', 'Sandwich de Pollo', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUd4qbDF_S2hTJp2PoD2qNcXOHszaLpbcFKg&s')
let producto8 = new Producto('Bagel con Queso', 20, 'Comida', 'Bagel tostado con queso crema', 'https://images.freeimages.com/images/premium/previews/2234/22348026-bagel-with-cream-cheese.jpg')

let contenedorProductos = document.querySelector('#contenedorProductos')
let select = document.querySelector('#opciones')

let productos = [];
let htmlProducto = ''
let contador = -1;

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
let divs = document.querySelectorAll('.hola')

select.addEventListener('change', (event) => {

    contenedorProductos.innerHTML = ""
    if (event.target.value == "1") {
        contenedorProductos.innerHTML = htmlProducto
    } else if (event.target.value == "2") {
        contenedorProductos.appendChild(divs[0])
        contenedorProductos.append(divs[1])
    } else if (event.target.value == "3") {
        contenedorProductos.appendChild(divs[2])
        contenedorProductos.append(divs[3])
    } else if (event.target.value == "4") {
        contenedorProductos.appendChild(divs[4])
        contenedorProductos.append(divs[5])
    } else {
        contenedorProductos.appendChild(divs[6])
        contenedorProductos.append(divs[7])
    }
})//Podria filtrar con forEach y la categoria

let botonesAgregar = document.querySelectorAll('.btn')
let pedidosVisuales = document.querySelector('#pedidosVisuales')

let subTotal = document.querySelector('#SubTodo')
let iva = document.querySelector('#iva')
let total = document.querySelector('#Total')
let confirmarPedido = document.querySelector('confirmar')

let nuevoPedido = ''
let productosPedidos = [];

botonesAgregar.forEach(btn => {
    btn.addEventListener('click', (event) => {
        let pedidoActual = new Pedido(productos[event.target.id])//Numero que indica el indice
        nuevoPedido = ''
        let temporal = event.target.id
        //renderizar(pedidoActual,event.target.id)

        nuevoPedido = `<div id="${temporal}" class="border rounded p-3 mb-3 pedido">
                            <div class="d-flex justify-content-between flex-column">
                                <h6 name="name">${pedidoActual.producto.nombre}</h6>
                                <span>Precio Unitario: Q${pedidoActual.precio}. 00</span>
                                <span id='sub${temporal}sub'>Subtotal: </span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <div class="btn-group ">
                                    <button id="menos${temporal}menos"  class="btn btn-outline-danger menos">
                                        -
                                    </button>
                                    <button id="c${temporal}cantidad" class="btn btn-outline-secondary cantidad">
                                        1
                                    </button>
                                    <button id="mas${temporal}mas" class="btn btn-outline-success mas">
                                        +
                                    </button>
                                </div>
                                <button id="${temporal}" class="btn btn-danger eliminar">
                                    Eliminar
                                </button>
                            </div>`

        if (!productosPedidos.includes(nuevoPedido)) {
            productosPedidos.push(nuevoPedido)
            pedidosVisuales.innerHTML += nuevoPedido
        }

        let btnMenos = document.querySelector(`#menos${temporal}menos`)
        let btnMas = document.querySelector(`#mas${temporal}mas`)
        let btnCantidadVisual = document.querySelector(`#c${temporal}cantidad`)
        let btnEliminar = document.querySelector(`.eliminar`)
        let sub = document.querySelector(`#sub${temporal}sub`)
        sub.textContent = `Subtotal: ${pedidoActual.resultado}`

        btnMas.addEventListener('click', (event) => {
            pedidoActual.aumentar()
            btnCantidadVisual.textContent = pedidoActual.contador
            sub.textContent = `Subtotal: ${pedidoActual.sumar()}`
        })

        btnMenos.addEventListener('click', (event) => {
            pedidoActual.disminuir()
            btnCantidadVisual.textContent = pedidoActual.contador
            sub.textContent = `Subtotal: ${pedidoActual.restar()}`
        })

        btnEliminar.addEventListener('click', (event) => {
            pedidoActual.eliminar()
            console.log('hola')
            console.log(pedidoActual.contador)
            console.log(pedidoActual.resultado)
        })
        //aplica revision despues de eliminar
    })
})



    // btnmenos.forEach(menos => {
    //     btncantidad.forEach(cantidad => {
    //         menos.addEventListener('click', (event) => {
    //             console.log('menos')
    //             carrito.disminuir()
    //             cantidad.textContent = carrito.contador
    //             console.log(cantidad.textContent)
    //             console.log(carrito.contador)
    //         })
    //     })
    // })

    // btnmas.forEach(mas => {
    //     btncantidad.forEach(cantidad => {
    //     mas.addEventListener('click', (event) => {
    //         console.log('mas')
    //         carrito.aumentar()
    //         cantidad.textContent = carrito.contador
    //     })            
    //     })

    // })

    // btnEliminar.forEach(btn => {
    //     btn.addEventListener('click', (event) => {
    //         let indice = event.target.id
    //         console.log(event.target.id)
    //         productosPedido.splice(indice, 1)
    //         controlPedidos(productosPedido)
    //         console.log('hola')
    //     })
    // })



