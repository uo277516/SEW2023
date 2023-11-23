"use strict";
class Noticias {

    //Constructor comprueba que el navegador soporte API File
    constructor() {
        const body = $("body");
        var p = $("<p></p>")
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            //El navegador soporta el API File
            p.text("Este navegador soporta el API File");
        } else {
            p.text("Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!");
        }

        body.append(p);
  
    }

    readInputFile(files) {
        var archivo = files[0];
        
        const section = $("body section");
        
        //Solamente admite archivos de tipo texto
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
            {
            var lector = new FileReader();
            lector.onload = function (evento) {

                var noticias_array = lector.result.split("\n");
                console.log(noticias_array);

                noticias_array.forEach(element => { //Para cada noticia creo un articulo con parrafos
                    const info = element.split("_");

                    const article = $("<article></article>");

                    const p_titulo = $("<p></p>").text(info[0]);
                    const p_subtitulo = $("<p></p>").text(info[1]);
                    const p_texto = $("<p></p>").text(info[2]);
                    const p_autor = $("<p></p>").text("Autor: "+info[3]);

                    article.append(p_titulo, p_subtitulo, p_texto, p_autor);
                    section.append(article);

                });

                //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
                //La propiedad "result" es donde se almacena el contenido del archivo
                //Esta propiedad solamente es válida cuando se termina la operación de lectura
                //areaVisualizacion.innerText = lector.result;
                }      
            lector.readAsText(archivo);
            }
        else {
            alert("Error : ¡¡¡ Archivo no válido !!!");

            }   
    }


}

var noticias = new Noticias();