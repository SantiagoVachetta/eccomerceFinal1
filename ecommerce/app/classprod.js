
export class Producto {
    constructor(categoria, precio, img, id, descrip,cantidad) {

        this.precio = precio,
            this.img = img;
        this.id = id,
            this.descrip = this.descrip
        this.categoria = this.categoria
        this.cantidad =  cantidad || 1


    }
    sumarCantidad  ()  {
        return this.cantidad++
    }




}

