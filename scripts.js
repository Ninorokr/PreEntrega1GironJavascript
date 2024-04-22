//CARRITO DE COMPRAS
//1. Dar al usuario la opción de elegir articulos de un listado
//Cada uno tiene su precio y se puede indicar la cantidad a llevar
//2. Acumular el monto total en una variable (float)

let manzana = {
    id: 1,
    nombre: "Manzanas",
    peso: 0.200,
    precio: 1.00
}

let naranja = {
    id: 2,
    nombre: "Naranjas",
    peso: 0.180,
    precio: 0.60
}

let papaya = {
    id: 3,
    nombre: "Papayas",
    peso: 2.000,
    precio: 2.00
}

let platano = {
    id: 4,
    nombre: "Plátanos",
    peso: 0.150,
    precio: 0.50
}

main()

function main() {
    let catalogo = [manzana, naranja, papaya, platano]
    let carrito = []
    
    let bucle = true;

    do {
        let inputUsuario = elegirDelMenu(catalogo, carrito)

        if (inputUsuario == 0) {
            bucle = false
        } else {
            agregarProductoAlCarrito(inputUsuario, carrito, catalogo)
            console.table(carrito)
        }
    } while (bucle)

    alert("¡Gracias por comprar con nosotros!")
}

function elegirDelMenu(catalogo, carrito) {
    let menu = "Elige un producto a agregar al carrito:\n"

    catalogo.forEach((prod) => {
        menu += prod.id + ". " + prod.nombre + "\t\tS/. " + prod.precio + "\n"
    })

    menu += "0. Salir\n\n" +
    "El total a pagar es: " + precioTotal(carrito) + " soles"

    let todoBien = false
    let eleccion = -1

    while (!todoBien){
        todoBien = true
        eleccion = Number(prompt(menu))

        if (eleccion < 0 || eleccion > catalogo.length || isNaN(eleccion)) {
            alert("Opción incorrecta")
            todoBien = false
        }
    }

    return eleccion
}

function agregarProductoAlCarrito(inputUsuario, carrito, catalogo) {

    let todoBien = false
    let cantidad = 0

    while (!todoBien) {
        todoBien = true
        cantidad = Number(prompt("¿Cuántos desea agregar?"))

        if (cantidad < 0 || isNaN(cantidad)) {
            alert("Debe ingresar un número mayor o igual a 0")
            todoBien = false
        }
    }

    let item = carrito.find((producto) => producto["id"] == inputUsuario)
    
    //BUSCAR ITEM EN EL CARRITO
    if (!(item == undefined)) {
        // SI EL PRODUCTO YA ESTÁ EN EL CARRITO, AUMENTAR CANTIDAD
        item.cantidad += cantidad
    } else {
        // SI EL PRODUCTO NO ESTÁ EN EL CARRITO, AGREGAR PRODUCTO
        console.log("idProducto = " + inputUsuario)
        item = catalogo.find((producto) => producto["id"] == inputUsuario)
        //let nuevoItem = nuevoItemAgregado(item, cantidad)
        item.cantidad = cantidad
        carrito.push(item)
    }

}

function nuevoItemAgregado(item, cantidad) {
    //Esta funcion agrega propiedades al item agregado al carrito
    item.cantidad = cantidad
}

function precioTotal(carrito) {
    if (carrito.length == 0) {
        return 0
    } else {
        let sumaPrecios = 0
        carrito.forEach((producto) => sumaPrecios += producto.precio * producto.cantidad)
        return sumaPrecios
    }
}