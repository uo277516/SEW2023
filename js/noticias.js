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

                    const h3_titulo = $("<h3></h3>").text(info[0]);
                    const h4_subtitulo = $("<h4></h4>").text(info[1]);
                    const p_texto = $("<p></p>").text(info[2]);
                    const p_autor = $("<p></p>").text("Autor: "+info[3]);

                    article.append(h3_titulo, h4_subtitulo, p_texto, p_autor);
                    section.append(article);

                });

                }      
            lector.readAsText(archivo);
            }
        else {
            alert("Error : ¡¡¡ Archivo no válido !!!");

            }   
    }


}

var noticias = new Noticias();