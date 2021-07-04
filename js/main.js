//SIMULADOR PARA LLEVAR LA ADMINISTRACION DE UNA LIBRERIA
//Declaración de clase Libro



let datosLibros = [];
const libros = [];
const seleccionados = [];
const categorias = ["genero", "autor", "titulo", "anio", "idioma", "editorial"]; //colocar los id de los selects y llamarlos con eso
//Obtengo los select del DOM (transformar a funcion que contenga arrays de "select")

let sCategorias = document.getElementsByTagName("select");

$().ready(() => {
    $.getJSON("js/data.JSON", (data, respuesta) => {
        if (respuesta == "success") {
            datosLibros = data;

            for (const obj of datosLibros) {
                libros.push(new Libro(obj));
            }
            //Aplico la función rellenar select a los select de cada filtro
            for (let i = 0; i < categorias.length; i++) {
                rellenarSelects(eliminaDuplisYordena(libros, String(categorias[i])), sCategorias[i]);
            }
            generarCardLibros();

        } else {
            console.log("ERROR");
        }
    })
})









//dar nombres a las funciones y solo llamarlas desde el codigo arriba

$("#btnVerCarrito").click(verCarrito);
  


$("#btnBuscador").click(generarCardLibros);
//Activar la caja de busqueda haciendo trigger del btnBuscar al apretar Enter
$("#cajaBuscador").keyup(function (event) {
    //Enter tecla 13
    if (event.keyCode === 13) {
        $("#btnBuscador").click();
    }
})
