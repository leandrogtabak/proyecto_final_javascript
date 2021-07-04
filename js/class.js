/*--------------------Definición de mis clases-------------------------------*/

class Libro {
    constructor(obj) {
        this.id = obj.id;
        this.titulo = obj.titulo;
        this.autor = obj.autor;
        this.anio = obj.anio;
        this.precio = obj.precio;
        this.isbn = obj.isbn;
        this.editorial = obj.editorial;
        this.genero = obj.genero;
        this.idioma = obj.idioma;
        this.cantidad = 1;


    }
  
    addCantidad() {
        this.cantidad++;
    }

    resCantidad() {
        this.cantidad--;
    }
    getTotal() {
        return (this.cantidad * this.precio);
    }

    //funcion para generar las card (chicas) de los libros como resultado de busquedas/filtrados
    generarCard(contenedorDestino) {

        //Defino un div llamado card que será la descripción de cada libro en los resultados de busqueda
        let card = $(`<div class="tarjetas"><a class="imagenLibro" href="#"><img src="/portadas/${this.isbn}.jpg" alt="" class="imagenCard" id=${this.id}></a>
                    <p class="tituloCard">${this.titulo}</p>
                    <p class="autorCard">${this.autor}</p>
                    <p class="precioCard"> $${this.precio}</p></div>`);
        //Si contenedor no es undefined, hacer append a contenedor de la card
        return contenedorDestino ? $(`#${contenedorDestino}`).append(card) : card;

    }

    obtenerLibro(contenedorDestino) {
        $(`#${contenedorDestino}`).html('');
        let contenedor = (`<div class="modal fade" id="modalDetalles" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header style="">
                                    <span style="font-size:1.3rem;font-weight:700;">${this.titulo}</span>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body contenedor">
                                        
                                            <img src="/portadas/${this.isbn}.jpg" alt="" class="imagen">
                                            <div class="descripcion">
                                            <p><strong>Título del libro:</strong> ${this.titulo}</p>
                                            <p><strong>Autor:</strong> ${this.autor}</p>
                                            <p><strong>Año:</strong> ${this.anio}</p>
                                            <p><strong>Género:</strong> ${this.genero}</p>
                                            <p><strong>Idioma:</strong> ${this.idioma}</p>
                                            <p><strong>ISBN:</strong> ${this.isbn}</p>
                                            <p><strong>Editorial:</strong> ${this.editorial}</p>
                                            <p><strong>Precio:</strong> <span style="font-size:1.3rem;font-weight:700;">$${this.precio}</span></p>
                                       </div>
                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" id = ${this.id} class="btn btn-success botonAddCarrito" data-bs-dismiss="modal">Añadir al carrito</button>
                                    </div>
                             </div>
                            </div>
                            </div>`);

        return contenedorDestino ? $(`#${contenedorDestino}`).append(contenedor) : contenedor;
    }
}