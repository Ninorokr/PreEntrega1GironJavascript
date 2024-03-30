//CARRITO DE COMPRAS
//1. Dar al usuario la opción de elegir articulos de un listado
//Cada uno tiene su precio y se puede indicar la cantidad a llevar
//2. Acumular el monto total en una variable (float)

main()

function main() {
    let precioTotal = 0.00

    let precioManzana = 1.00
    let precioNaranja = 1.50
    let precioPapaya = 2.00
    let precioPlatano = 0.50
    
    let bucle = true;
    do {
        let inputUsuario = elegirDelMenu(precioTotal)
        switch (inputUsuario) {
            case 1: precioTotal = agregarProducto(precioTotal, "manzanas", precioManzana); break;
            case 2: precioTotal = agregarProducto(precioTotal, "naranjas", precioNaranja); break;
            case 3: precioTotal = agregarProducto(precioTotal, "papayas", precioPapaya); break;
            case 4: precioTotal = agregarProducto(precioTotal, "plátanos", precioPlatano); break;
            case 0: bucle = false;
        }
    } while (bucle)

    alert("¡Gracias por comprar con nosotros!")
}

function elegirDelMenu(precioTotal) {
    let menu = "Elige un producto a agregar al carrito:\n" +
                "1. Manzanas\t\tS/. 1.00\n" + 
                "2. Naranjas\t\tS/. 1.50\n" + 
                "3. Papayas\t\tS/. 2.00\n" + 
                "4. Plátanos\t\tS/. 0.50\n" +
                "0. Salir\n\n" +
                "El total a pagar es: " + precioTotal + " soles"

    let eleccion = Number(prompt(menu))
    return eleccion
}

function agregarProducto(precioTotal, producto, precioUnitario) {
    let todoBien = false
    let cantidad = 0

    while (!todoBien) {
        todoBien = true
        cantidad = Number(prompt("¿Cuántas " + producto + " desea agregar?"))

        if (cantidad < 0 || isNaN(cantidad)) {
            alert("Debe ingresar un número mayor o igual a 0")
            todoBien = false
        }
    }

    precioTotal += cantidad * precioUnitario
    return precioTotal
}

function noEsNumero(valor) {
    return typeof valor !== 'number'
}

//CODIGO FUNADO 💀
/* function agregarManzanas(precioTotal) {
    let todoBien = false
    let cantidadManzanas = 0

    while (!todoBien) {
        todoBien = true
        cantidadManzanas = Number(prompt("¿Cuántas manzanas desea agregar?"))

        if (cantidadManzanas < 0 || isNaN(cantidadManzanas)) {
            alert("Debe ingresar un número mayor o igual a 0")
            todoBien = false
        }
    }

    precioTotal += cantidadManzanas * 1.00
    return precioTotal
}

function agregarNaranjas(precioTotal) {
    let todoBien = false
    let cantidadNaranjas = 0

    while (!todoBien) {
        todoBien = true
        cantidadNaranjas = prompt("¿Cuántas naranjas desea agregar?")

        if (cantidadNaranjas < 0 || isNaN(cantidadNaranjas)) {
            alert("Debe ingresar un número mayor o igual a 0")
            todoBien = false
        }
    }

    precioTotal += cantidadNaranjas * 0.80
    return precioTotal
}

function agregarPapayas(precioTotal) {
    let todoBien = false
    let cantidadPapayas = 0

    while (!todoBien) {
        todoBien = true
        cantidadPapayas = prompt("¿Cuántas papayas desea agregar?")

        if (cantidadPapayas < 0 || isNaN(cantidadPapayas)) {
            alert("Debe ingresar un número mayor o igual a 0")
            todoBien = false
        }
    }

    precioTotal += cantidadPapayas * 2.00
    return precioTotal
}

function agregarPlatanos(precioTotal) {
    let todoBien = false
    let cantidadPlatanos = 0

    while (!todoBien) {
        todoBien = true
        cantidadPlatanos = prompt("¿Cuántas plátanos desea agregar?")

        if (cantidadPlatanos < 0 || isNaN(cantidadPlatanos)) {
            alert("Debe ingresar un número mayor o igual a 0")
            todoBien = false
        }
    }

    precioTotal += cantidadPlatanos * 0.50
    return precioTotal
} */