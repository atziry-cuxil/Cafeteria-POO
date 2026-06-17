class Producto {
    #nombre; //"Café Americano",
    #precio; //12,
    #categoria; //"Bebida caliente",
    #descripcion; //"Café negro tradicional"
    #imagen; //url
    #resultado;
    #contador;
    #id;

    constructor(nombre, precio, categoria, descripcion, url,id) {
        this.#nombre = nombre
        this.#precio = precio
        this.#categoria = categoria
        this.#descripcion = descripcion
        this.#imagen = url
        this.#contador = 1;
        this.#resultado = this.#precio
        this.#id = id
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

    get contador() {
        return this.#contador
    }

    get id(){
        return this.#id
    }
    sumarSubtotal() {
        this.#resultado = this.#resultado + this.#precio
        return this.#resultado
    }

    restarSubtotal() {
        if (this.#contador != 1) {
            this.#resultado = this.#resultado - this.#precio;
        } else {
            this.#resultado = this.#precio
        }
        return this.#resultado
    }

    disminuirCantidad() {
        if (this.#contador != 1) {
            this.#contador--
        }
        return this.#contador
    }
    aumentarCantidad() {
        //this.#contador++
        return this.#contador++
    }

    limpiarProducto() {
        this.#contador = 1;
        this.#resultado = this.#precio
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

    get productosCarrito() {
        return this.#productosCarrito
    }

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
        return this.#subtotal.toFixed(2)
    }

    calcularIva() {
        this.#iva = this.#total * 0.05
        return this.#iva.toFixed(2)
    }

    carritoPintar() {
        return this.#productosCarrito
    }

    reiniciar() {
        return this.#productosCarrito = [];
    }
}

let producto1 = new Producto("Café Americano", 12, 'Bebida caliente', 'Cafe negro tradicional', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8ZP8CVkVsfh1js6RyGlG9XSm3ln_jZxCQQ&s',0)
let producto2 = new Producto('Cafe Latte', 10, 'Bebida caliente', 'Cafe con leche espumada', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwgW1tj5A9REAeaFZBs8NVRY8UN64rlDPgdQ&s',1)
let producto3 = new Producto('Frappe de Chocolate', 25, 'Bebida fria', 'Bebida fria con chocolate y crema', 'https://images.aws.nestle.recipes/original/2024_10_28T11_04_59_badun_images.badun.es_82c0d9edbe53_frapuccino_de_chocolate.jpg',2)
let producto4 = new Producto('Smoothie de Fresa', 22, 'Bebida fria', 'Batido natural de fresa', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQTuHbjg4tZXMSy4sx1wP_E8L0YJR95lBZw&s',3)
let producto5 = new Producto('Muffin de Vainilla', 15, 'Postre', 'Pan dulce suave de vainilla', 'https://cdn.recetasderechupete.com/wp-content/uploads/2026/02/cupcakes-de-vainilla-especial-Carnaval-portada.png',4)
let producto6 = new Producto('Cheesecake', 20, 'Postre', 'Pastel frio de queso', 'https://static.eldiario.es/clip/943f6789-e20e-46de-8092-f2d6fbe4a9dd_16-9-discover-aspect-ratio_default_0.jpg',5)
let producto7 = new Producto('Sandwich de Pollo', 30, 'Comida', 'Sandwich de Pollo', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUd4qbDF_S2hTJp2PoD2qNcXOHszaLpbcFKg&s',6)
let producto8 = new Producto('Bagel con Queso', 20, 'Comida', 'Bagel tostado con queso crema', 'https://images.freeimages.com/images/premium/previews/2234/22348026-bagel-with-cream-cheese.jpg',7)
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
let borrar = document.querySelector('#borrar')
let resumen = document.querySelector('#resumen')

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
    if (carrito.productosCarrito.length == 0) {
        confirmarPedido.disabled = true;
    } else {
        confirmarPedido.disabled = false;
    }
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
                                <button name="${object.nombre}" id="${contador}" class="btn btn-dark agregar">
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`
    })
    contenedorProductos.innerHTML = htmlProducto
    let botonesAgregar = document.querySelectorAll('.agregar')

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', (event) => {
            let name = event.target.name
            let temporal = productos.find(producto => producto.nombre == name)
            if (!carrito.productosCarrito.includes(temporal)) {
                carrito.agregarProducto(temporal)
                controlPedidos(carrito.carritoPintar())
            } else {
                let temporal2 = carrito.productosCarrito.findIndex(producto => producto == temporal)
                carrito.productosCarrito[temporal2].aumentarCantidad()
                carrito.productosCarrito[temporal2].sumarSubtotal()
                controlPedidos(carrito.carritoPintar())
            }

        })

    })

}

function controlPedidos(productosPedidos,) {
    if (productosPedidos.length == 0) {
        confirmarPedido.disabled = true;
    } else {
        confirmarPedido.disabled = false;
    }
    //resumen.classList.remove('d-none')
    factura.classList.add('d-none')
    pedidosVisuales.textContent = ' '
    let contador = -1;
    let nuevoPedido = ''
    listas = " "
    productosPedidos.forEach(instancia => {
        listas += `<p>${instancia.nombre} X ${instancia.contador} = Q${instancia.resultado} .00</p>`
        contador++
        nuevoPedido = `<div id="${contador}" class="border rounded p-3 mb-3 pedido">
                            <div class="d-flex justify-content-between flex-column">
                                <h6 name="name"> ${instancia.nombre}</h6>
                                <span>Precio Unitario:Q${instancia.precio}.00</span>
                                <span id="sub">Subtotal:Q${instancia.resultado}.00</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <div class="btn-group">
                                    <button id="${contador}" class="btn btn-outline-danger menos">-</button>
                                    <button id="${contador}" class="btn btn-outline-secondary cantidad">
                                        ${instancia.contador}
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
    let sub = document.querySelector('#sub')

    btnEliminar.forEach(btn => {
        btn.addEventListener('click', (event) => {
            let indice = event.target.id
            carrito.productosCarrito[indice].limpiarProducto()
            carrito.eliminarProducto(indice)
            controlPedidos(carrito.carritoPintar())
        })
    })

    subTotal.textContent = `Q ${carrito.subtotal()}`
    iva.textContent = `Q ${carrito.calcularIva()}`
    total.textContent = `Q ${carrito.totalProductos()}`

    confirmarPedido.addEventListener('click', (event) => {
        subTotal.textContent = `Q 0.00`
        iva.textContent = `Q 0.00`
        total.textContent = `Q 0.00`
        confirmarPedido.disabled = true;
        totalPagado.textContent = `Q ${carrito.total}`
        lista.innerHTML = listas
        pedidosVisuales.textContent = ' '
        factura.classList.remove('d-none')
        renderizar(productos)
        //resumen.classList.add('d-none')
        productos.forEach(producto => producto.limpiarProducto())
        carrito.reiniciar()
    })
}
pedidosVisuales.addEventListener('click', (event) => {
    let id = parseInt(event.target.id)
    if (event.target.textContent == "+") {

        carrito.productosCarrito[id].aumentarCantidad()
        carrito.productosCarrito[id].sumarSubtotal()
        controlPedidos(carrito.carritoPintar())

    } else if (event.target.textContent == "-") {

        carrito.productosCarrito[id].disminuirCantidad()
        carrito.productosCarrito[id].restarSubtotal()
        controlPedidos(carrito.carritoPintar())
    }

})

borrar.addEventListener('click', (event) => {
    factura.classList.add('d-none')
})