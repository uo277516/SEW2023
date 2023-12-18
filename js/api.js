"use strict";
class API {

    //Esta clase utiliza las siguientes 3 APIS:
    //-API Geolocation (coger ubicacion y mostrar el mapa)
    //-API Drag and Drop (arrastrar un archivo con coordenadas)
    //-API File (descargar un archivo con informacion)

    //El uso de id en los contenedores de los mapas está justificado (funcionamiento de MapBox) para despues
    //acceder a el en la creación del mapa. No se utiliza id en CSS

    //Se incluye en la carpeta JS un archivo "api.txt" como ejemplo de formato para el input de drag and drop

    constructor (){
        //API GEOLOCATION
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        this.lngLatArray=[];
        this.map=null;
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed; 
        
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


    lngLatArray;
    map;

    generarMapa() {
        const mainElement = $("<aside></aside>");
        mainElement.attr("id", "map");

        const e = $("body").children().eq(3);

        e.after(mainElement);

        // Crear el mapa y añadir marcador inicial
        mapboxgl.accessToken = 'pk.eyJ1IjoibmF0YWxpYWZkciIsImEiOiJjbDJpcGF3OTIwMDhoM2lxbmdieTVqZmNtIn0.yCtVKd9uXBygbocekG0RqA';
            
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-3.667, 40.500],
            zoom: 4
        });
    
        

        new mapboxgl.Marker().setLngLat([this.longitud, this.latitud]).addTo(this.map);
        this.lngLatArray.push([this.longitud, this.latitud]);
    }



    generarLineas() {
        var lngLatArray=this.lngLatArray;
        var map = this.map;
        map.addLayer({
            id: 'lineString-' + Math.random(),
            type: 'line',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: lngLatArray
                    }
                }
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#ff0000',
                'line-width': 5
            }
        });
    }

    metodo() {
        var areaSoltarArchivos = $("body section aside");

        var lngLatArray=this.lngLatArray

        // API DRAG AND DROP
        areaSoltarArchivos.on("drop", function (e) {
            e.preventDefault();
            var archivo = e.originalEvent.dataTransfer.files[0];
           
            var lector = new FileReader();
            lector.onload = function (evento) {

                var p_aside = $("body section aside p");

                var mensaje = `Nombre del archivo: ${archivo.name} --`;
                mensaje += `Tamaño: ${archivo.size} bytes -- `;
                mensaje += `Tipo: ${archivo.type}`;

                p_aside.text(mensaje);
                
                var coordenadas = evento.target.result.split('\n');

                coordenadas.forEach(coordenada => {
                    var [lng, lat] = coordenada.split(',').map(parseFloat);
                    lngLatArray.push([lng, lat]);
                });
    
            };
            lector.readAsText(archivo);
        });
    
        areaSoltarArchivos.on("dragover", function (e) {
            e.preventDefault();
        });
    
        var button = $("button:eq(2)");
    
        button.on("click", function () {
            var informacionTexto = '';
            var distancias = 0;
    
    
            for (var i = 0; i < lngLatArray.length - 1; i++) {
                var coord1 = lngLatArray[i];
                var coord2 = lngLatArray[i + 1];
                var distancia = this.calcularDistancia(coord1, coord2);
                informacionTexto += `Coordenadas Punto ${i + 1}: ${coord1}\nCoordenadas Punto ${i + 2}: ${coord2}\nDistancia: ${distancia} km\n`;
                distancias += distancia;
            }
    
            informacionTexto += `Distancia total entre los puntos recorriéndolos en orden: ${distancias} km`;
    
            // API FILE
            var file = new File([informacionTexto], 'informacion_distancia.txt', { type: 'text/plain' });
    
            var enlace = document.createElement('a');
            enlace.href = URL.createObjectURL(file);
            enlace.download = file.name;
            document.body.appendChild(enlace);
            enlace.click();
            document.body.removeChild(enlace);

        }.bind(this));
    }
    
    
    

    pasarRadianes (x) {
        return x*Math.PI/180;
    }

    calcularDistancia(coord1, coord2) {

        var lon1 = coord1[0];
        var lat1 = coord1[1];

        var lon2 = coord2[0];
        var lat2  =coord2[1];

        var R = 6371; // km 
        var x1 = lat2-lat1;
        var dLat = this.pasarRadianes(x1);  
        var x2 = lon2-lon1;
        var dLon = this.pasarRadianes(x2);  
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                        Math.cos(this.pasarRadianes(lat1)) * Math.cos(this.pasarRadianes(lat2)) * 
                        Math.sin(dLon/2) * Math.sin(dLon/2);  
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; 
        return d;
    }





}

var api= new API();
