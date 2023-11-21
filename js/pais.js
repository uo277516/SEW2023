"use strict";
class Pais {

    constructor (nombre, capital, poblacion) {
            this.nombre=nombre;
            this.capital=capital;
            this.poblacion=poblacion;
    }

    rellenar (forma_gobierno, coordenadas_capital, religion) {
        this.forma_gobierno=forma_gobierno;
        this.coordenadas_capital=coordenadas_capital;
        this.religion=religion;
    }


    getNombre() {
        return this.nombre;
    }

    getCapital() {
        return this.capital;
    }

    getPoblacion() {
        return this.poblacion;
    }

    getFormaDeGobierno() {
        return this.forma_gobierno;
    }

    getCoordenadasCapital() {
        return this.coordenadas_capital;
    }

    getReligion() {
        return this.religion;
    }

    getListaInformacionSecundaria() {
        const informacionSecundariaHTML = "<ul><li>Población:" + this.getPoblacion() + "</li><li>Forma de Gobierno: "+this.getFormaDeGobierno()+"</li><li>Religión Mayoritaria: "+this.getReligion()+"</li></ul>";
        return informacionSecundariaHTML;
    }

    escribirCoordenadasDocumento () {
        document.write(this.coordenadas_capital);
    }

    escribirEnDocumento() {
        document.write("<p>País: ");
        document.write(this.getNombre());
        document.write("</p>");

        document.write("<p>Capital: ");
        document.write(this.getCapital());
        document.write("</p>");

        document.write(this.getListaInformacionSecundaria());
    }

    cargarTiempo() {
        const coordenadasArray = this.coordenadas_capital.split(',').map(coord => parseFloat(coord.trim()));

        const latitud = coordenadasArray[0];
        const longitud = coordenadasArray[1];

        var apiKey = "6049eddf2521839fe5a2fdf60aaf706f";
        var apiCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=${apiKey}`;
        console.log(apiCall);
        
        $.ajax({
            url: apiCall,
            method: 'GET',
            dataType: "json",
            data: {
                units: "metric",
                lang: "es"
            },
            success: function(datos){

                console.log(datos.list);
                var main = $("<main></main>");
                var h3 = $("<h3></h3>").text("Tabla del tiempo para los próximos 5 días");
                $("body").append(h3,main);

                var pronostico = datos.list;

                for (let i = 0; i<40; i=i+8) {   
                    var dia = pronostico.slice(i,i+8); 
                    
                    for (let j = 0; j<dia.length; j++) { 

                        var dia_hora_mostrar = dia[j].dt_txt;
                        var dia_hora_mostrar_string = String(dia_hora_mostrar)
                        

                        if (dia_hora_mostrar_string.includes("06:00:00")) {

                            var cantidadLluvia = 0;
                            if (dia[j].rain  !== undefined) {
                                cantidadLluvia = dia[j].rain['3h'];
                            }

                            var fecha = dia_hora_mostrar_string.split(" ")[0].split("-");

                            const articleElement = $("<article>");
                            var h4 = $("<h4></h4>").text(fecha[2]+"-"+fecha[1]+"-"+fecha[0]);
                            var ul = $("<ul><ul>")
                            var tempMax = $("<li></li>").text("Temperatura máxima: " + dia[j].main.temp_max + "°C");
                            var tempMin = $("<li></li>").text("Temperatura mínima: " + dia[j].main.temp_min + "°C");
                            var humedad = $("<li></li>").text("Humedad: " + dia[j].main.humidity + "%");
                            var iconoTiempo = $('<img/>').attr("src", "https://openweathermap.org/img/wn/"+ dia[j].weather[0].icon+ "@2x.png").attr("alt",dia[j].weather[0].description);
                            var lluvia = $("<li></li>").text("Cantidad de lluvia: " + cantidadLluvia + "mm");

                            ul.append(tempMax, tempMin, humedad, lluvia);
                            articleElement.append(h4,iconoTiempo, ul);
                            $("main").append(articleElement);

                    }
                }
            }



            // const pElement = $("<p>").text(JSON.stringify(datos.list, null, 2));

            //sectionElement.append(pElement);
            //$("body").append(sectionElement);

            },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
            }
        });
        
    }



}

var pais = new Pais ("Camboya", "Phnom Penh", 17667222);
pais.rellenar("Monarquía constitucional", "11.56245, 104.91601, 10", "Budismo Theravada");



