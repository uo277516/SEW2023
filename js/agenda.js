"use strict";
class Agenda {
    constructor() {
        this.url = 'https://ergast.com/api/f1/current.xml'
        this.last_api_call = null;     //ultima peticion de la api (momento temporal)
        this.last_api_result = null;   //ultima repsuesta de la api
    }

    buscarCarreras() {
        this.last_api_call = new Date(); //guardo la fecha de cuando llamo a lo de buscar 

        

        $.ajax({
            url: this.url,
            method: 'GET',
            dataType: "xml",
            data: {
                lang: "es"
            },
            success: (datos) => {

                this.last_api_result = datos;

                this.escribirEnHtml(datos);

                
            },
            error: () => {
                $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='https://ergast.com'>Eargast</a>");
            }
        });
    }

    escribirEnHtml(datos) {

        const main = $("body main");

        console.log( $(datos).find('Race'));

        $(datos).find('Race').each(function() {

            const nombre = $(this).find('RaceName').text();

            const circuito = $(this).find('Circuit').text();
            const latitud = $(this).find('Location').attr('lat');
            const longitud = $(this).find('Location').attr('long');

            const fecha = $(this).find('Date').first().text();
            const hora = $(this).find('Time').first().text();

            var h3 = $("<h3></h3>").text(nombre);
            var p_circuito = $("<p></p>").text("Circuito: " + circuito);
            var p_coor = $("<p></p>").text("Coordenadas: "  + latitud + ", " + longitud);
            var p_fecha = $("<p></p>").text("Fecha: " + fecha);
            var p_hora = $("<p></p>").text("Hora: " + hora);

            const article = $("<article></article>")

            article.append(h3, p_circuito, p_coor, p_fecha, p_hora);
            main.append(article);

        });
        
    }


    cargarCarreras() {
        var actual = new Date();
    
        if (this.last_api_call === null) {
            this.buscarCarreras();
        } else {
            var diferencia_minutos = (actual - this.last_api_call) / (1000*60);
            if (diferencia_minutos>=10) {
                this.buscarCarreras();
            } else {
                this.escribirEnHtml(this.last_api_result);
            }
        }
    }

}

var agenda = new Agenda();
