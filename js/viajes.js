"use strict";
class Viajes {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        //console.log(posicion.coords.latitude);
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



    getMapaEstatico(){
        
        var zoom = 10;
        var bearing = 0;
        var apiKey = "pk.eyJ1IjoibmF0YWxpYWZkciIsImEiOiJjbDJpcGF3OTIwMDhoM2lxbmdieTVqZmNtIn0.yCtVKd9uXBygbocekG0RqA";

        console.log(this.longitud);
        console.log(this.altitud);
        
        var url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${this.longitud},${this.latitud},${zoom},${bearing}/1000x600@2x?access_token=${apiKey}`;
        
        
        const article = $("body section article:first");
        const img = $("<img>");
        img.attr("src", url);
        img.attr("alt", "mapa estático de mapBox sobre tu ubicación");
        article.append(img);
    }
}

var viaje = new Viajes();


