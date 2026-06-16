class Producto {
    #nombre; //"Café Americano",
    #precio; //12,
    #categoria; //"Bebida caliente",
    #descripcion; //"Café negro tradicional"
    #imagen; //url
    #resultado;
    #contador;

    constructor(nombre, precio, categoria, descripcion, url) {
        this.#nombre = nombre
        this.#precio = precio
        this.#categoria = categoria
        this.#descripcion = descripcion
        this.#imagen = url
        this.#contador = -1
        this.#resultado = this.#precio
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

    get resultado() {
        return this.#resultado
    }
    sumar() {
        this.#resultado = this.#resultado + this.#precio
        return this.#resultado
    }

    restar() {
        if (this.#contador != 0) {
            this.#resultado = this.#resultado - this.#precio;
        } else {
            this.#resultado = 0
        }
        return this.#resultado
    }

    disminuir() {
        if (this.#contador != 0) {
            this.#contador--
        }
        return this.#contador
    }
    aumentar() {
        //this.#contador++
        return this.#contador++
    }
}

class Pedido {
    #total;
    #iva;
    #subtotal;
    #productosCarrito;

    constructor() {
        this.#productosCarrito = [];
        this.#total = 0;
        this.#iva = 0;
        this.#subtotal = 0;
    }

    get total() {
        return this.#total
    }

    get iva() {
        return this.#iva
    }

    get subtotal() {
        return this.#subtotal
    }

    get productosCarrito(){
        return this.#productosCarrito
    }

    // set productosCarrito (value){
    //     this.#productosCarrito = value
    // }

    eliminarProducto(indice) {
        this.#productosCarrito.splice(indice, 1)
        this.#total = 0;
        return this.#productosCarrito
    }

    agregarProducto(producto) {

        let temporal = producto
        this.#productosCarrito.push(temporal)
        return this.#productosCarrito

    }

    totalProductos() {
        this.#total = 0;
        for (let i = 0; i < this.#productosCarrito.length; i++) {
            this.#total += this.#productosCarrito[i].resultado
        }
        return this.#total            
    }

    subtotal() {
        this.#subtotal = 0;
        this.#subtotal = this.totalProductos() - this.calcularIva()
        return this.#subtotal
    }

    calcularIva() {
        let impuesto = this.#total * 5
        this.#iva = impuesto / this.#total
        return this.#iva
    }

    carritoPintar() {
        return this.#productosCarrito
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
let carrito = new Pedido()

let contenedorProductos = document.querySelector('#contenedorProductos')
let select = document.querySelector('#opciones')
let pedidosVisuales = document.querySelector('#pedidosVisuales')
let subTotal = document.querySelector('#SubTotal')
let iva = document.querySelector('#iva')
let total = document.querySelector('#Total')
let confirmarPedido = document.querySelector('#confirmar')
let factura = document.querySelector('#final')
let input = document.querySelector('#input')
let totalPagado = document.querySelector('#TotalPagado')
let lista = document.querySelector('#lista')

let controlcarrito = []
let productos = [];
let productosPedido = [];
let htmlProducto = ''
let contador = -1;
let listas = ''

productos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8)
renderizar(productos)

select.addEventListener('change', (event) => {
    let pintar = [];
    if (event.target.value == "1") {
        pintar = productos
    } else if (event.target.value == "2") {
        pintar = productos.filter(producto => producto.categoria == "Bebida caliente")
    } else if (event.target.value == "3") {
        pintar = productos.filter(producto => producto.categoria == 'Bebida fria')
    } else if (event.target.value == "4") {
        pintar = productos.filter(producto => producto.categoria == "Postre")
    } else {
        pintar = productos.filter(producto => producto.categoria == "Comida")
    }
    renderizar(pintar)
})
input.addEventListener('keyup', (event) => {
    let pintar = productos.filter(producto => producto.nombre.toLowerCase() == event.target.value.toLowerCase()
        || producto.nombre.toLowerCase().includes(event.target.value.toLowerCase()))
    renderizar(pintar)
})
function renderizar(productospintar) {
    contenedorProductos.textContent = " "
    htmlProducto = " "
    contador = -1;
    productospintar.forEach(object => {
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

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', (event) => {
            let indice = event.target.id
            if (!carrito.productosCarrito.includes(productos[indice])) {

                carrito.agregarProducto(productos[indice])

                controlPedidos(carrito.carritoPintar())
            }
        })

    })
    if (productosPedido.length == 0) {
        confirmarPedido.disabled = true;
    } else {
        confirmarPedido.disabled = false;
    }
}

function controlPedidos(productosPedidos,) {
    console.log(productosPedidos)
    if (productosPedidos.length == 0) {
        confirmarPedido.disabled = true;
    } else {
        confirmarPedido.disabled = false;
    }
    pedidosVisuales.textContent = ' '
    let contador = -1;
    let nuevoPedido = ''
    listas = " "
    productosPedidos.forEach(instancia => {
        listas += `<p>${instancia.nombre} = ${instancia.resultado} </p>`
        contador++
        nuevoPedido = `<div id="${contador}" class="border rounded p-3 mb-3 pedido">
                            <div class="d-flex justify-content-between flex-column">
                                <h6 name="name"> ${instancia.nombre}</h6>
                                <span>Precio Unitario:${instancia.precio}. 00</span>
                                <span id="sub">Subtotal:${instancia.precio}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <div class="btn-group">
                                    <button id="${contador}" class="btn btn-outline-danger menos">-</button>
                                    <button id="${contador}" class="btn btn-outline-secondary cantidad">
                                        1
                                    </button>
                                    <button id="${contador} "class="btn btn-outline-success mas">+</button>
                                </div>
                                <button id="${contador}" class="btn btn-danger eliminar">
                                    Eliminar
                                </button>
                            </div>`
        pedidosVisuales.innerHTML += nuevoPedido

    })
    let btnEliminar = document.querySelectorAll('.eliminar')

    btnEliminar.forEach(btn => {
        btn.addEventListener('click', (event) => {
            let indice = event.target.id
            carrito.eliminarProducto(indice)
            controlPedidos(carrito.carritoPintar())
        })
    })

    subTotal.textContent = carrito.subtotal()
    iva.textContent = carrito.calcularIva()
    total.textContent = carrito.totalProductos()

    confirmarPedido.addEventListener('click', (event) => {
        confirmarPedido.disabled = true;
        factura.classList.remove('d-none')
        totalPagado.textContent = `Q ${carrito.total}`
        lista.innerHTML = listas
        renderizar(productos)
        pedidosVisuales.textContent = ' '
    })

    pedidosVisuales.addEventListener('click', (event) => {
        let indice = event.target.id
        console.log(indice)

        if(event.target.textContent == "+"){
            
            //carrito.productosCarrito[indice].aumentar()
        }else if(event.target.textContent == "-"){
            console.log('hola mundo')
        }
    })
}

