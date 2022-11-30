
const d = document;
let carritoLleno = []

const carrito = d.getElementById("carrito")
console.log(carrito)
const arrayCarrito = JSON.parse(localStorage.getItem("carrito"))

const productsCart = () => {
    arrayCarrito.forEach(producto => {
        const { categoria, precio, id, img, stock, descrip, } = producto
        carrito.innerHTML +=
            `
        <div class="card" >
        <img src=${img} alt="">
        
        <span>${precio}</span>
       <button class="btn-eliminar" data-id=${id}>Eliminar</button>
     
       
        
        </div>
        
 `

    })
}


productsCart()

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
finalizarCompra()

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

btnEliminar()
























