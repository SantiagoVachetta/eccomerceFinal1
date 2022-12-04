
import { Producto } from "../app/classprod.js";
const d = document;
let carritoLleno = []

const carrito = d.getElementById("carrito")
console.log(carrito)
const arrayCarrito = JSON.parse(localStorage.getItem("carrito"))

const generarHtml = (array) => {
    carrito.innerHTML = ""
    array.map(el => {
        carrito.innerHTML += `
                                    
                                    <div class= "item-carrito" id=${el.id}>
                                        <img src=${el.img} alt="">
                                        <h3>${el.nombre}</h3>
                                        <span>${el.cantidad}</span>
                                        <span>${el.precio}</span>
                                        <button class="sumarCantidad">+</button>
                                        <button class="restarCantidad">-</button>
                                        <button class="eliminar">X</button>
                                    </div>
        `
        sumarCantidad()
        
        btnEliminar()
    })



const finalizarCompra = () => {
    const button = document.querySelector(".finalizar-compra");
    button.addEventListener("click", () => {





        Swal.fire({
            title: 'Gracias por tu Compra!',

            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Volver al Inicio'
        }).then((result) => {
            if (result.isConfirmed) {

                window.location = "/index.html"
                localStorage.removeItem("carrito")

            }
        })


    })
}


const total = () => {
    const $total = document.querySelector(".total")
    const subtotal = arrayCarrito.reduce((acc, item) => item.precio + acc, 0)
    localStorage.setItem("total", subtotal);

    const newTotal = localStorage.getItem("total");

    $total.innerHTML = `<h1>$${newTotal}</h1>`

}

const eliminar = (indice, elemento) => {
    arrayCarrito.splice(indice, 1)
    elemento.remove()
    console.log(arrayCarrito);
}



const btnEliminar = () => {
    let btns = document.querySelectorAll(".btn-eliminar");

    for (const btn of btns) {
        btn.addEventListener("click", (event) => {
            console.log("click");
            let id = event.target.parentNode.id;
            let busqueda = arrayCarrito.findIndex(el => el.id == id);

            let div = event.target.parentNode
            eliminar(busqueda, div)
            localStorage.setItem("carrito", JSON.stringify(arrayCarrito))

        })
    }
}






document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.length > 0) {
        for (const item of JSON.parse(localStorage.getItem("carrito"))) {
            let producto = new Producto(item.categoria, item.precio, item.img, item.id,  item.descrip, item.cantidad)
            arrayCarrito.push()
        }

        total()
        productsCart(arrayCarrito)
        finalizarCompra()
        btnEliminar()
    } else {
        document.querySelector("#carrito").innerHTML = `
        <div>
            <h2>No hay productos en tu carrito de compras</h2>
            <a href="../index.html">Volver a la página principal</a>
        </div>
        `
    }
})




















}
