"use strict";
class API {

    constructor (){
        //API GEOLOCATION
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed; 
        
        console.log(this.longitud);
        console.log(this.latitud);
    }

    getLongitud(){
        return this.longitud;
    }

    getLatitud(){
        return this.latitud;
    }

    getAltitud(){
        return this.altitud;
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario no permite la petición de geolocalización");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Información de geolocalización no disponible");
            break;
        case error.TIMEOUT:
            alert("La petición de geolocalización ha caducado");
            break;
        case error.UNKNOWN_ERROR:
            alert("Se ha producido un error desconocido");
            break;
        }
    }



    metodo() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibmF0YWxpYWZkciIsImEiOiJjbDJpcGF3OTIwMDhoM2lxbmdieTVqZmNtIn0.yCtVKd9uXBygbocekG0RqA';

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-3.667, 40.500], //coordenadas para q aparezca "centrado" en españa
            zoom: 4
        });
        const marker = new mapboxgl.Marker().setLngLat([this.longitud, this.latitud]).addTo(map);

        var markers = [];
        markers.push(marker);

        var areaSoltarArchivos = $("body section aside");
        

        //API DRAG AND DROP

        areaSoltarArchivos.on("drop", function(e) {
            e.preventDefault();
            var archivo = e.originalEvent.dataTransfer.files[0];
            
            var lector = new FileReader();
            lector.onload = function (evento) {
                var coordenadas = evento.target.result.split('\n');

                coordenadas.forEach(coordenada => {
                    var [lng, lat] = coordenada.split(',').map(parseFloat);
                    var marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
                    markers.push(marker);
                });
                console.log(markers);

                var p_aside = $("body section aside p");

                var mensaje = `Nombre del archivo: ${archivo.name} --`;
                mensaje += `Tamaño: ${archivo.size} bytes -- `;
                mensaje += `Tipo: ${archivo.type}`;

                p_aside.text(mensaje);
            };
            lector.readAsText(archivo);
        });

        areaSoltarArchivos.on("dragover", function(e) {
            e.preventDefault();
            
        });

        var button = $("button");

        button.on("click", function() {

            var informacionTexto = '';
            var distancias= 0;
            markers.forEach(function (elemento, index, array) {
                if (index < array.length - 1) {
                    var marker0 = elemento;
                    var marker1 = array[index + 1];

                    var coord1 = marker0.getLngLat().toArray();
                    var coord2 = marker1.getLngLat().toArray();
                    var distancia = this.calcularDistancia(coord1, coord2);
                    informacionTexto += `Coordenadas Marker ${index}: ${coord1}\nCoordenadas Marker ${index+1}: ${coord2}\nDistancia: ${distancia} km\n`;
                    distancias+=distancia;

                    console.log(marker0, marker1);
                }
            }.bind(this));

            informacionTexto+=`Distancia total entre los puntos recorriendolos en orden: ${distancias} km`;

            //API FILE
            var file = new File([informacionTexto], 'informacion_distancia.txt', { type: 'text/plain' });

            var enlace = document.createElement('a');
            enlace.href = URL.createObjectURL(file);
            enlace.download = file.name;
            document.body.appendChild(enlace);
            enlace.click();
            document.body.removeChild(enlace);

            
        }.bind(this));

    }

    

    calcularDistancia(coord1, coord2) {

        var lon1 = coord1[0];
        var lat1 = coord1[1];

        var lon2 = coord2[0];
        var lat2  =coord2[1];

        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        }

        var R = 6371; // km 
        var x1 = lat2-lat1;
        var dLat = x1.toRad();  
        var x2 = lon2-lon1;
        var dLon = x2.toRad();  
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                        Math.sin(dLon/2) * Math.sin(dLon/2);  
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; 
        return d;
    }





}

var api= new API();
