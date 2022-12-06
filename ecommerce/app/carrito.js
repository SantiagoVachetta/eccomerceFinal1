
import { Producto } from "../app/classprod.js";
const d = document;



const carrito = d.getElementById("carrito")

const arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || []

const productosCart = () => {
    arrayCarrito.forEach(producto => {
        const { categoria, precio, id, img, descrip, cantidad } = producto
        carrito.innerHTML += `
       <div class="card" >
       <img src=${img} alt="">
       
       <span>${precio}</span>
       
       <button class="btn-eliminar" data-id=${id}>Eliminar</button>
       
       </div>
       
       `

    });

}
















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
total()
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
    if (arrayCarrito.length > 0) {
        for (const item of JSON.parse(localStorage.getItem("carrito"))) {

        }



        total()

        productosCart(arrayCarrito)
        finalizarCompra()
        btnEliminar()

    } else {
        document.querySelector("#carrito").innerHTML = `
         <div>
             <h2>No agregaste ningun producto!</h2>
             <a href="../index.html">Volver al inicio</a>
         </div>
        `
    }
})



















