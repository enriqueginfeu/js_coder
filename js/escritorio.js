const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')
const botonVaciar = document.getElementById('vaciar-carrito')
const finalizar = document.getElementById('finalizar')

let carrito = []



cargarEventListeners();

function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        carrito = JSON.parse( localStorage.getItem('carrito-contenedor') ) || []  ;
        
        actualizarCarrito();
    });
}


contenedorCarrito.addEventListener('click', (carrito) =>{
    
    carrito.length = 0

    actualizarCarrito()
    
})

botonVaciar.addEventListener('click', () => {
    
    carrito.length = 0
    
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se elimino el carrito',
        showConfirmButton: false,
        timer: 2000
    })
    
    actualizarCarrito()
    
    $('#vaciar-carrito').hide()
    $('#finalizar').hide()

})



//========CARRITO==========//


const agregarAlCarrito = (prodId) => {

    const item = productos.find( (prod) => prod.id === prodId)
    carrito.push(item)

    
    actualizarCarrito()

    console.log(carrito)

}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find( (prod) => prod.id === prodId )
    const indice = carrito.indexOf(item)
    
    carrito.splice(indice, 1)

    actualizarCarrito()

    console.log(carrito)

}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach( (prod) => {
        const div = document.createElement('div')
        div.className = "productoEnCarrito"
        div.innerHTML = `
                    <img src=${prod.img} width= "15%" alt="">
                    <h3>${prod.nombre}</h3>
                    <p class="componentesCarrito">Procesador: ${prod.procesador}</p>
                    <p class="componentesCarrito">Memoria: ${prod.memoria}</p>
                    <p class="componentesCarrito">Disco: ${prod.disco}</p>
                    <p class="precioProducto">Precio Web: $${prod.precio}</p>
                    <p class="envio-carrito">Envio Gratis</p>
                    <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    `
                
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    sincronizarStorage();
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}


function sincronizarStorage() {
    localStorage.setItem('carrito-contenedor', JSON.stringify(carrito));
}


//========API DE MERCADOPAGO==========//


const finalizarCompra = async () => {

    const carritoToMP = carrito.map( (prod) => {
        return {
            title: prod.nombre,
            description: "",
            picture_url: "",
            category_id: prod.id,
            quantity: 1,
            currency_id: "ARS",
            unit_price: prod.precio
        }
    })

    const resp = await fetch('https://api.mercadopago.com/checkout/preferences', {
                                method: 'POST',
                                headers: {
                                    Authorization: 'Bearer TEST-2570345754700082-112202-eb1e3a43c4e4e3f55bf8f1264a2dba4d-84258451'
                                },
                                body: JSON.stringify({
                                    items: carritoToMP,
                                    back_urls: {
                                        success: window.location.href,
                                        failure: window.location.href,
                                    }
                                })
                            })
    const data = await resp.json()
    
    window.location.replace(data.init_point)
}



//========ARRAY DE OBJETOS=========//

const mostrarProductos = (prod) => {
    contenedorProductos.innerHTML = ""

    prod.forEach( (prod) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
                    <img src=${prod.img} alt="">
                    <h3 class="tituloProducto">${prod.nombre}</h3>
                    <p>Procesador: ${prod.procesador}</p>
                    <p>Memoria: ${prod.memoria}</p>
                    <p>Disco: ${prod.disco}</p>
                    <p class="precioProducto">Precio Web: $${prod.precio}</p>
                    <p class="precioProducto2">Precio de Lista: $${prod.precioLista}
                    <p class="envio">Envio Gratis</p>
                    <p><i class="fab fa-cc-visa"></i> <i class="fab fa-cc-mastercard"></i> <i class="fab fa-cc-amex"></i> <i class="fas fa-dollar-sign"></i> <i class="fab fa-bitcoin"></i></p>
        `
        contenedorProductos.appendChild(div)
    
        
    } )
}

mostrarProductos(productosPc)