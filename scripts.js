//CARRITO DE COMPRAS
//1. Crear un menu que permita al usuario las siguientes opciones:
    //1. Agregar productos al carrito
        // Elegir producto del listado e indicar cantidad
    //2. Retirar productos del carrito (splice)
        // Indicar número de item a eliminar
    //3. Hacer la cuenta y salir
        // Sumar precio total, peso total y listar cantidad por producto

var catalogo = [{id: 1, nombre: "Manzanas", peso: 0.200, precio: 1.00}, 
{id: 2, nombre: "Naranjas", peso: 0.180, precio: 0.60}, 
{id: 3, nombre: "Papayas", peso: 2.000, precio: 2.00},
{id: 4, nombre: "Plátanos", peso: 0.150, precio: 0.50}]

main()

function main() {

    let carrito = []
    
    let buclePrincipal = true
    
    do {
        let eleccion = Number(prompt(menuPrincipal()))
        
        switch (eleccion) {
            case 0: buclePrincipal = false; break
            case 1: comprar(carrito); break
            case 2: verCarrito(carrito); break
            case 3: quitarProductosCarrito(carrito); break
            case 4: cuenta(); buclePrincipal = false; break
            default: alert("Opción incorrecta")
        }
    } while (buclePrincipal)
    
    alert("¡Gracias por comprar con nosotros!")
}

function menuPrincipal() {
    let menu = "BIENVENIDO/A al mercado \"3 de Enero\"\n\n" +
                        "1. Agregar productos al carrito\n" + 
                        "2. Ver carrito\n" + 
                        "3. Retirar productos del carrito\n" + 
                        "4. Hacer la cuenta\n" +
                        "\n0. Salir"

    return menu
}

function comprar(carrito) {
    let bucle = true

    do {
        let inputUsuario = elegirDelCatalogo(carrito)

        if (inputUsuario == 0) {
            bucle = false
        } else {
            agregarProductoAlCarrito(inputUsuario, carrito)
        }
    } while (bucle)
}

function elegirDelCatalogo(carrito) {

    //**MENU**//
    let menu = "Elige un producto a agregar al carrito:\n"

    catalogo.forEach((prod) => {
        menu += prod.id + ". " + prod.nombre + "\t\tS/. " + prod.precio + "\n"
    })

    menu += "\n0. Regresar\n\n" +
    "El total a pagar es: " + precioTotal(carrito) + " soles"
    //**MENU**//

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

function agregarProductoAlCarrito(inputUsuario, carrito) {

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
        item.pesoTotalProducto = Math.round(item.peso * item.cantidad * 100) / 100
        item.costoTotalProducto = Math.round(item.precio * item.cantidad * 100) / 100
    } else {
        // SI EL PRODUCTO NO ESTÁ EN EL CARRITO, AGREGAR PRODUCTO
        let catalogoTemp = catalogo.map((prod) => { return {
            id: prod.id,
            nombre: prod.nombre,
            peso: prod.peso,
            precio: prod.precio
        }})
        item = catalogoTemp.find((producto) => producto["id"] == inputUsuario)
        let nuevoItem = nuevoItemAgregado(item, cantidad)
        carrito.push(nuevoItem)
    }
}

function nuevoItemAgregado(item, cantidad) {
    //Esta funcion agrega propiedades al item agregado al carrito
    item.cantidad = cantidad
    item.pesoTotalProducto = Math.round(item.peso * item.cantidad * 100) / 100
    //console.log("pesoTotal: " + item.pesoTotalProducto)
    item.costoTotalProducto = Math.round(item.precio * item.cantidad * 100) / 100
    //console.log("costoTotal: " + item.costoTotalProducto)
    return item
}

function precioTotal(carrito) {
    if (carrito.length == 0) {
        return 0
    } else {
        let sumaPrecios = 0
        carrito.forEach((producto) => {
            sumaPrecios += producto.precio * producto.cantidad
        })
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

    let carritoTemp = carrito.map((prod) => { return {
        id: prod.id,
        nombre: prod.nombre,
        peso: prod.peso,
        precio: prod.precio,
        cantidad: prod.cantidad,
        pesoTotalProducto: prod.pesoTotalProducto,
        costoTotalProducto: prod.costoTotalProducto
    }})

    if (carritoTemp.length == 0) {
        alert("¡El carrito está vacío!")
    } else {
        let menu = "1. Ordenar\n" +
                    "\n0. Regresar"

        let bucle = true

        do {
            let mensaje = iterarProductosDeCarrito(carritoTemp) + menu
            let eleccion = Number(prompt(mensaje))

            switch(eleccion) {
                case 0: bucle = false; break
                case 1: carritoTemp = ordenarCarrito(carritoTemp); break
                default: alert("Opción incorrecta")
            }
        } while (bucle)
    }
}

function iterarProductosDeCarrito(carrito) {
    let mensaje = ""

    carrito.forEach((prod) => {
        for (let prop in prod) {
            switch(prop) {
                case "peso": case "pesoTotalProducto": mensaje += prop + ": " + prod[prop] + " kgs. | "; break
                case "precio": case "costoTotalProducto": mensaje += prop + ": S/. " + prod[prop] + " | "; break
                case "cantidad": mensaje += prop + ": " + prod[prop] + " unid. | "; break
                default: mensaje += prop + ": " + prod[prop] + " | "; break
            } 
        }
        mensaje += "\n\n"
    })
    return mensaje
}

function ordenarCarrito(carrito) {
    
        let eleccion = Number(prompt("Ordenar según: \n" + 
                                "1. Id\n" + 
                                "2. Nombre de producto\n" + 
                                "3. Precio unitario\n" + 
                                "4. Peso de producto\n" + 
                                "5. Cantidad\n" +
                                "6. Peso Total\n" + 
                                "7. Costo Total\n" +
                                "\n0. Regresar"))

        let asc = true

        if (eleccion != 0)
            asc = ascODesc()
                                
        switch (eleccion) {
            case 0: break
            case 1: asc ? carrito.sort((a, b) => a.id - b.id) : carrito.sort((a, b) => b.id - a.id); break
            case 2: carrito.sort((a, b) => comparadorStrings(a, b, "nombre", asc)); break
            case 3: asc ? carrito.sort((a, b) => a.precio - b.precio) : carrito.sort((a, b) => b.precio - a.precio); break
            case 4: asc ? carrito.sort((a, b) => a.peso - b.peso) : carrito.sort((a, b) => b.peso - a.peso); break
            case 5: asc ? carrito.sort((a, b) => a.cantidad - b.cantidad) : carrito.sort((a, b) => b.cantidad - a.cantidad); break
            case 6: asc ? carrito.sort((a, b) => a.pesoTotalProducto - b.pesoTotalProducto) : carrito.sort((a, b) => b.pesoTotalProducto - a.pesoTotalProducto); break
            case 7: asc ? carrito.sort((a, b) => a.costoTotalProducto - b.costoTotalProducto) : carrito.sort((a, b) => b.costoTotalProducto - a.costoTotalProducto); break
        }
        //flag = false;

    return carrito

}

function ascODesc() {
    let flag = true
    let asc = true

    while (flag) {
        let eleccion = Number(prompt("¿En orden ascendente o descendente?: \n" + 
                                "1. Ascendente\n" + 
                                "2. Descendente\n" + 
                                "\n0. Regresar"))
                                
        switch (eleccion) {
            case 0: flag = false; break
            case 1: asc = true; flag = false; break
            case 2: asc = false; flag = false; break
        }
    }

    return asc
}

function comparadorStrings(a, b, prop, asc) {
    if (asc) {
        if (a[prop] > b[prop]) {
            return 1;
        }
    
        if (a[prop] < b[prop]) {
            return -1;
        }
    } else {
        if (a[prop] > b[prop]) {
            return -1;
        }
    
        if (a[prop] < b[prop]) {
            return 1;
        }
    }

    return 0;
}

function quitarProductosCarrito(carrito) {
    while (true) {
        let msj = "¿Qué producto deseas remover?\n\n" +
            iterarProductosDeCarrito(carrito)

        let i = 1

        carrito.forEach((prod) => {
            msj += i++ + ". " + prod.nombre + "\n"
        })

        msj += "\n0. Regresar"

        let eleccion = Number(prompt(msj))

        if (eleccion == 0) {
            break;
        } else {
                let max = carrito[eleccion - 1].cantidad
                let numero = Number(prompt("¿Cuántos deseas eliminar? Cantidad: " + max))

                if (numero < 0 || numero > max || isNaN(numero)) {
                    alert("Elegir un número entre 0 y " + max)
                } else {
                    if (numero == max) {
                        carrito.splice(eleccion - 1, 1)
                    } else {
                        carrito[eleccion - 1].cantidad -= numero
                    }
                }
        }
    }
}

function hacerCuenta() {
    //
    //Iterar por cada uno de 
}

//CÓDIGO FUNADO 💀

/* let manzana = {
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
} */

/* if (prop == "peso" || 
                prop == "pesoTotalProducto") {
                    mensaje += prop + ": " + prod[prop] + " kgs. | "
                } else if (prop == "precio" || 
                prop == "costoTotalProducto") {
                    mensaje += prop + ": S/. " + prod[prop] + " | "
                } else if (prop == "cantidad") {
                    mensaje += prop + ": " + prod[prop] + " unid. | "
                } else {
                    mensaje += prop + ": " + prod[prop] + " | "
                } */