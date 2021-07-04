//--------------------------Declaración de funciones--------------------------------//

//Comentar que hace esta función

function eliminaDuplisYordena(arrayOrigen, key) {

    let arrayDestino = [];

    for (i = 0; i < arrayOrigen.length; i++) {
        arrayDestino[i] = arrayOrigen[i][key];
    }
    //Elimino duplicados
    arrayDestino = [...new Set(arrayDestino)];

    //ordeno alfabeticamente
    arrayDestino.sort();

    return arrayDestino;

}

//funcion para rellenar los select
function rellenarSelects(arrayDatos, select) {

    for (i = 0; i < arrayDatos.length; i++) {
        let c = document.createElement("option");
        c.text = arrayDatos[i];
        select.options.add(c, i + 1);
    }

}

//Funcion para filtrar la busqueda de los select


function filtrarPor(clave, valor, array) {
    return array.filter(x => x[clave] == valor);
}



function generarCardLibros() {


    let filtrados = [...libros];

    let contenedor = document.getElementById("conteiner");
    contenedor.innerHTML = "";

    //Recorro todo el array de categorias (filtros) para ver cuál no dice "todos" y fue seleccionado por el usuario para filtrar
    //a cada uno le aplico la funcion "filtrarPor"


    for (let i = 0; i < categorias.length; i++) {
        if (sCategorias[i].options[sCategorias[i].selectedIndex].text != "Todos") {
            filtrados = filtrarPor(categorias[i], sCategorias[i].options[sCategorias[i].selectedIndex].text, filtrados);

        }
    }

    //utilizar la caja de busqueda sobre los filtrados


    let flag = true;
    for (let i = 0; i < filtrados.length; i++) {
        for (const propiedad in filtrados[i]) {
            if (propiedad != "id" && propiedad != "cantidad") {
                if (filtrados[i][propiedad].toLowerCase().includes($('#cajaBuscador').val().toLowerCase())) {
                    flag = false;
                    break;
                } else {

                    flag = true;
                }
                //lo borro de filtrados si no está

            }
        }
        if (flag) {
            filtrados.splice(i, 1);
            i--;
        }
    }


    //Genero las cards para el array de libros que fue filtrado

    for (let i = 0; i < filtrados.length; i++) {
        filtrados[i].generarCard("conteiner");
    }


    $(".imagenLibro").click(agregarLibro);



}


function agregarLibro(e) {

    //VER SI EL PRODUCTO YA ESTA EN EL CARRITO CON FIND
    let libro = seleccionados.find(producto => producto.id == e.target.id);
    //console.log(libro.id);
    if (libro != undefined) {
        //ESTA EN EL CARRITO, ENTONCES NO ES NECESARIO BUSCAR LA INFORMACION EN EL ARRAY DE DATOS, SUMAMOS UNA CANTIDAD
        libro.addCantidad();
    } else {
        //NO ESTA EN EL CARRITO, ENTONCES LO BUSCAMOS EN EL ARRAY DE DATOS
        let seleccionado = libros.find(producto => producto.id == e.target.id);
        seleccionados.push(new Libro(seleccionado));
    }
    let nuevoLibro = seleccionados.find(producto => producto.id == e.target.id);
    nuevoLibro.obtenerLibro("detallesLibro");
    $("#modalDetalles").modal('show');
    //console.log(nuevoLibro);
    //console.log(nuevoLibro.cantidad);
    $(".botonAddCarrito").click(addCarrito);


}

function addCarrito(e) {

    let libro = seleccionados.find(producto => producto.id == e.target.id);
    titulo = libro.titulo;

    $(".modals").append(`<div class="modal fade" id="modalAniadido" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                               Añadido exitosamente!
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Se ha añadido <strong>${titulo}</strong> al carrito
                            </div>
                            <div class="modal-footer">
                                <button type="button" id = "btnAceptarModal" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>`);

    $('#modalAniadido').modal('show');


    $(".modals").empty();
}


//funcion que muestra el carrito

function verCarrito() {
    //código para mostrar el carrito

    let content = ('');
    let total = 0;
    
    for (const seleccionado of seleccionados) {

       
        total += seleccionado.getTotal();

        content += ` <tr>
                    <td class="w-25">
                        <img src="/portadas/${seleccionado.isbn}.jpg" class="img-fluid img-thumbnail" alt="Sheep" style="height:150px;">
                    </td>
                    <td>${seleccionado.titulo}</td>
                    <td>$${seleccionado.precio}</td>
                    <td>${seleccionado.cantidad}</td>
                    <td id="${seleccionado.id}">$${seleccionado.getTotal()}</td>
                    <td><button type="button" class="btn btn-danger btn-sm btnDelete" id=${seleccionado.id}>
                        <img src="img/fa.png" alt="" style="height:8px;"></button></td>`
  
    }


    $(".modals").append(`<div class="modal fade" id="modalCarrito" tabindex="-1"  aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                           <div class="modal-content">
                              <div class="modal-header border-bottom-0">
                                 <h5 class="modal-title">Carrito de compras</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                                <div class="modal-body">
                                  <table class="table align-middle table-image text-center">
                                     <thead>
                                       <tr>
                                         <th scope="col"></th>
                                         <th scope="col">Producto</th>
                                         <th scope="col">Precio</th>
                                         <th scope="col">Cantidad</th>
                                         <th scope="col">Total</th>
                                         <th scope="col">Acciones</th>
                                       </tr>
                                     </thead>
                                      <tbody>
     
                                       ${content}
       
                                     </tr>
                                   </tbody>
                                  </table> 

          <div class="d-flex justify-content-end">
        <h5>Total: <span class="price text-success" id="total">$${total}</span></h5>
      </div>
    </div>
    <div class="modal-footer border-top-0 d-flex  flex-row-reverse justify-content-between">
      <button type="button" class="btn btn-success">Comprar Carrito</button>
    </div>
  </div>
</div>
</div>`);
$("#modalCarrito").modal('show');



$(".btnDelete").click(function (e) { 
  console.log(e.target.id); 

  eliminarDelete(e.target.id);
  verCarrito();
  
});

}





//SEGUNDA FORMA DE ELIMINAR: CUANDO TENGO CONTROL DE CANTIDADES
function eliminarDelete(id) {
    
    const objeto = seleccionados.find(x => x.id == id);
    console.log(objeto);
    
    //ANTES DE ELIMINAR ¿CUANTO ES LA CANTIDAD?

    
    if (objeto.cantidad == 1) {
        //BUSCAMOS LA POSICION DEL OBJETO EN EL ARRAY
        const idObj = seleccionados.indexOf(objeto);
        //USAMOS SPLICE PARA ELIMINAR UN OBJETO POR POSICION
        seleccionados.splice(idObj, 1);
    } else {
        //SI HAY MAS DE UN ELEMENTO SE RESTA LA CANTIDAD
        objeto.resCantidad();
    }

}
