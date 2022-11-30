import { Producto } from "./app/classprod.js";


let arrayCarrito = []

const arrayProductos = [];

const main = document.querySelector(".cont-productos")




const getRequest = async () => {
    let req = await fetch("/productos.json")

    let response = await req.json()

    for (const el of response) {
        arrayProductos.push(el)
    }
    console.log(arrayProductos)
    localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos))
}



const generarCards = (array) => {
    console.log(arrayProductos)
    arrayProductos.forEach((element) => {
        let { nombre, precio, id, img, stock, descrip } = element;
        console.log(element)
        main.innerHTML += `
                    <div class="card" >
                    <img src=${img} alt="">
                    
                    <span>${precio}</span>
                    <div class="descrip">${descrip}</div>
                    <button class="btn-agregar" data-id=${id}>Agregar al Carrito</button>
                    
                    </div>
                    
                    `


        eventoAgregarProducto()
    });

}




const eventoAgregarProducto = () => {
    let btns = document.querySelectorAll(".btn-agregar")

    for (const btn of btns) {
        btn.addEventListener("click", (event) => {
            let id = event.target.attributes[1].value;

            let existe = arrayCarrito.findIndex(el => el.id == id)
            if (existe != -1) {
                let producto = arrayCarrito[existe]
                producto.sumarCantidad()
            } else {
                let resultado = arrayProductos.find(el => el.id == id)
                let producto = new Producto(resultado.nombre, resultado.precio, resultado.img, resultado.id);
                arrayCarrito.push(producto)
            }

            Swal.fire(
                'Agregaste al Carrito!',
                'Buscalo en el carrito',
                'success'
            )





            localStorage.setItem("carrito", JSON.stringify(arrayCarrito))




        })
    }
   const totalCart = () => {
        const items = document.querySelector(".fa-solid");
    
        const productosCart = JSON.parse(localStorage.getItem('carrito'))
        if (!productosCart) return;
    
        const totalCart = productosCart?.reduce((acc, item) => item.cantidad + acc, 0)
        items.innerHTML = `${totalCart}`
    
        if (totalCart > 0) {
            localStorage.setItem('cantidad', JSON.stringify(totalCart))
        }
    }
    
    totalCart()

}


window.onload = function () {
    arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || []
}
document.addEventListener("DOMContentLoaded", async () => {

    await getRequest(),
        generarCards()


})






















 

















