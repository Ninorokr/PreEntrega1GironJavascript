//CARRITO DE COMPRAS
//1. Crear un menu que permita al usuario las siguientes opciones:
    //1. Agregar productos al carrito
        // Elegir producto del listado e indicar cantidad
    //2. Retirar productos del carrito (splice)
        // Indicar número de item a eliminar
    //3. Hacer la cuenta y salir
        // Sumar precio total, peso total y listar cantidad por producto

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
    
    let buclePrincipal = true
    
    do {
        let eleccion = Number(prompt(menuPrincipal()))

        switch (eleccion) {
            case 0: buclePrincipal = false; break
            case 1: comprar(catalogo, carrito); break
            case 2: verCarrito(carrito); break
            case 3: quitarProductos(); break
            case 4: cuenta(); buclePrincipal = false; break
            default: alert("Opción incorrecta")
        }
    } while (buclePrincipal)
    

    alert("¡Gracias por comprar con nosotros!")
}

function menuPrincipal() {
    let menu = "BIENVENIDO/A al mercado \"3 de Enero\"\n" +
                        "1. Agregar productos al carrito\n" + 
                        "2. Ver carrito\n" + 
                        "3. Retirar productos del carrito\n" + 
                        "4. Hacer la cuenta\n" +
                        "0. Salir"

    return menu
}

function comprar(catalogo, carrito) {
    let bucle = true

    do {
        let inputUsuario = elegirDelCatalogo(catalogo, carrito)

        if (inputUsuario == 0) {
            bucle = false
        } else {
            agregarProductoAlCarrito(inputUsuario, carrito, catalogo)
        }
    } while (bucle)
}

function elegirDelCatalogo(catalogo, carrito) {
    let menu = "Elige un producto a agregar al carrito:\n"

    catalogo.forEach((prod) => {
        menu += prod.id + ". " + prod.nombre + "\t\tS/. " + prod.precio + "\n"
    })

    menu += "0. Regresar\n\n" +
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

function verCarrito(carrito) {
    //Menu de carrito
        //Mostrar carrito tal y cual está
        //1. Ordenar según: Precio, cantidad o peso (ASC o DESC)
            //1. Precio total
                //1. ASC
                //2. DESC
            //2. Cantidad total
                //1. ASC
                //2. DESC
            //3. Peso total
                //1. ASC
                //2. DESC
        //2. Salir

    let menu = "1. Ordenar\n" +
                "0. Regresar"

    let mensaje = iterarProductosDeCarrito(carrito) + "\n" + menu

    if (carrito.length == 0) {
        alert("¡El carrito está vacío!")
    } else {
        let bucle = true

        do {
            let eleccion = Number(prompt(mensaje))

            switch(eleccion) {
                case 0: bucle = false; break
                case 1: ordenarCarrito(); break
                default: alert("Opción incorrecta")
            }
        } while (bucle)
    }
}

function iterarProductosDeCarrito(carrito) {
    console.table(carrito)
    let mensaje = ""

    // mensaje += carrito[0]

    carrito.forEach((prod) => {
        console.log(prod)
        for (let prop in prod) {
            console.log(prop)
            mensaje += prod[prop] + " | "
        }
        mensaje += "\n"
    })

    return mensaje
}

function hacerCuenta() {
    //
    //Iterar por cada uno de 
}