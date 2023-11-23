"use strict";
class Fondo {
    constructor(nombre_pais, nombre_capital, coordenadas) {
        this.nombre_pais = nombre_pais;
        this.nombre_capital = nombre_capital;
        this.coordenadas = coordenadas;
    }

    obtenerImagen() {
        const coordenadasArray = this.coordenadas.split(',').map(coord => parseFloat(coord.trim()));

        const latitud = coordenadasArray[0];
        const longitud = coordenadasArray[1];

        var apiKey = "7ea9c232e677033d7c7fe0fbc5f8887b";
        var flickUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
        
        $.getJSON(flickUrl, {
            api_key: apiKey,
            lat: latitud,
            lon: longitud,
            tags: "landscape",  
            format: "json",
            nojsoncallback: 1  
        })
        .done(function (data) {
            if (data.photos && data.photos.photo.length > 0) {
                const photo = data.photos.photo[5];
                const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
                console.log(photo);
                $("body").css("background-image", "url(" + imageUrl+ ")") 
                    .css("background-size","cover")
                    .css("background-repeat","no-repeat")
                    .css("background-attachment","fixed")
            }
        });
    }
}


var fondo = new Fondo("Camboya", "Phnom Penh", "11.56245, 104.91601, 10");
fondo.obtenerImagen();
