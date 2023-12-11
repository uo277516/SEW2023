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
        
        var zoom = 12;
        var bearing = 0;
        var apiKey = "pk.eyJ1IjoibmF0YWxpYWZkciIsImEiOiJjbDJpcGF3OTIwMDhoM2lxbmdieTVqZmNtIn0.yCtVKd9uXBygbocekG0RqA";

        console.log(this.longitud);
        console.log(this.altitud);
        
        var url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${this.longitud},${this.latitud},${zoom},${bearing}/1000x600@2x?access_token=${apiKey}`;
        
        
        const article = $("body main article:first");
        const img = $("<img>");
        img.attr("src", url);
        img.attr("alt", "mapa estático de mapBox sobre tu ubicación");
        article.append(img);
    }



    getMapaDinamico() {
        var segundoArticle = $('main article:eq(1)');
        const aside = $("<aside></aside>");
        //Uso de id obligatorio para añadir mapa dinámico con MapBox
        aside.attr("id", "map");
        segundoArticle.append(aside);
        mapboxgl.accessToken = 'pk.eyJ1IjoibmF0YWxpYWZkciIsImEiOiJjbDJpcGF3OTIwMDhoM2lxbmdieTVqZmNtIn0.yCtVKd9uXBygbocekG0RqA';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [this.longitud, this.latitud], // starting position [lng, lat]
            zoom: 12 // starting zoom
        });
        const marker = new mapboxgl.Marker().setLngLat([this.longitud, this.latitud]).addTo(map);

    }

    readXMLFile(files) {
        var archivo = files[0];
        
        //Solamente admite archivos de tipo xml
        if (archivo.type==='text/xml' || archivo.type==='application/xml') 
            {
            var lector = new FileReader();
            lector.onload = (evento) => {
                var xmlEnString = evento.target.result;
                this.procesarXML(xmlEnString);
            };
       
            lector.readAsText(archivo);
            }
        else {
            alert("Error : ¡¡¡ Archivo no válido !!!");
        }   
    }


    procesarXML(xmlEnString) {
        const section = $("body section:eq(0)");
        var xml = $.parseXML(xmlEnString);
        $(xml).find("ruta").each(function () {
            //Cada ruta es un artículo
            var article = $("<article></article>");

            //Info de cada hito
            var rutaNombre = $(this).find('nombre').text();
            var rutaTipo = $(this).find('tipo').text();
            var rutaMedio = $(this).find('medio').text();
            var rutaFechaInicio = $(this).find('fecha_inicio').text();
            var rutaHoraInicio = $(this).find('hora_inicio').text();
            var rutaDuracion = $(this).find('duracion').text();
            var rutaAgencia = $(this).find('agencia').text();
            var rutaDescripcion = $(this).find('descripcion').text();

            var inicioLugar = $(this).find('inicio > lugar').text();
            var inicioDireccion = $(this).find('inicio > direccion').text();
            var inicioCoordenadas = $(this).find('inicio > coordenadas');
            var inicioAltitud = inicioCoordenadas.find('altitud').text();
            var inicioLongitud = inicioCoordenadas.find('longitud').text();
            var inicioLatitud = inicioCoordenadas.find('latitud').text();

            var referencias = [];
            $(this).find('referencias > referencia').each(function () {
                var referenciaTitulo = $(this).find('titulo').text();
                var referenciaBibliografia = $(this).find('bibliografia').text();
                referencias.push({ titulo: referenciaTitulo, bibliografia: referenciaBibliografia });
            });

            var hitos = [];
            $(this).find('hitos > hito').each(function () {
                var hitoNombre = $(this).find('nombre').text();
                var hitoDescripcion = $(this).find('descripcion').text();
                var hitoCoordenadas = $(this).find('coordenadas');
                var hitoAltitud = hitoCoordenadas.find('altitud').text();
                var hitoLongitud = hitoCoordenadas.find('longitud').text();
                var hitoLatitud = hitoCoordenadas.find('latitud').text();
                var hitoDistancia = $(this).find('distancia').text();

                var galeriaFotos = [];
                $(this).find('galeria_fotos > foto').each(function () {
                    var fotoUbi = $(this).text();
                    galeriaFotos.push({ foto: fotoUbi });
                });

                var galeriaVideos = [];
                var galeriaVideosElement = $(this).find('galeria_videos');
                if (galeriaVideosElement.length > 0) {
                    galeriaVideosElement.find('video').each(function () {
                        var videoUbi = $(this).text();
                        galeriaVideos.push({ video: videoUbi });
                    });
                }

                hitos.push({
                    nombre: hitoNombre,
                    descripcion: hitoDescripcion,
                    coordenadas: { altitud: hitoAltitud, longitud: hitoLongitud, latitud: hitoLatitud },
                    distancia: hitoDistancia,
                    galeriaFotos: galeriaFotos,
                    galeriaVideos: galeriaVideos
                });
            });

            //Creo html para cada hito un article con todo
            article.append('<h4>' + rutaNombre + '</h4>');
            article.append('<p>Tipo: ' + rutaTipo + '</p>');
            article.append('<p>Medio: ' + rutaMedio + '</p>');
            article.append('<p>Fecha de Inicio: ' + rutaFechaInicio + '</p>');
            article.append('<p>Hora de Inicio: ' + rutaHoraInicio + '</p>');
            article.append('<p>Duración: ' + rutaDuracion + '</p>');
            article.append('<p>Agencia: ' + rutaAgencia + '</p>');
            article.append('<p>Descripción: ' + rutaDescripcion + '</p>');
            article.append('<p>Inicio: Lugar: ' + inicioLugar + ', Dirección: ' + inicioDireccion + ', Coordenadas: (' + inicioAltitud + ', ' + inicioLongitud + ', ' + inicioLatitud + ')</p>');

            //Referencias en una lista
            var referenciasHtml = '<h5>Referencias:</h5><ul>';
            referencias.forEach(function (referencia) {
                referenciasHtml += '<li>' + referencia.titulo + ' - ' + referencia.bibliografia + '</li>';
            });
            referenciasHtml += '</ul>';
            article.append(referenciasHtml);

            //Hitos en otra lista
            var hitosHtml = '<h5>Hitos:</h5>';
            hitos.forEach(function (hito) {
                hitosHtml += '<h6>' + hito.nombre + '</h6>'
                hitosHtml += '<p>' + hito.nombre + ': ' + hito.descripcion +
                    ', Coordenadas: (' + hito.coordenadas.latitud + ', ' + hito.coordenadas.longitud + ', ' + hito.coordenadas.altitud + ')' +
                    ', Distancia: ' + hito.distancia + ' km</p>';
                

                hitosHtml+= '<p> Fotos y videos (si los hubiera) </p>';
                hitosHtml += '<ul>';
                hito.galeriaFotos.forEach(function (foto) {
                    hitosHtml += '<li>Foto: ' + foto.foto + '</li>';
                });
                

                if (hito.galeriaVideos.length > 0) {
                    hito.galeriaVideos.forEach(function (video) {
                        hitosHtml += '<li>Video: ' + video.video + '</li>';
                    });
                }
                hitosHtml += '</ul>';

            });
            article.append(hitosHtml);


            console.log(article);

            section.append(article);
        });
    }


    //KML
    leerKML(files) {

        const section = $("body section:eq(1)");
        const aside = $("<aside></aside>");
        aside.attr("id", "map_kml");
        section.append(aside);

        mapboxgl.accessToken = 'pk.eyJ1IjoibmF0YWxpYWZkciIsImEiOiJjbDJpcGF3OTIwMDhoM2lxbmdieTVqZmNtIn0.yCtVKd9uXBygbocekG0RqA';
        const map = new mapboxgl.Map({
            container: 'map_kml', // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [103.89196153745898, 12.480014603403987], // starting position [lng, lat]
            zoom: 6 // starting zoom
        });

        Array.from(files).forEach(file => {
            var reader = new FileReader();

            //Cargo las coordenadas en un array
            reader.onload = function (e) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(e.target.result, 'application/xml');

                var placemark = xmlDoc.querySelectorAll('Placemark')[0];
                var coordinates = placemark.querySelector('coordinates').textContent.split('\n');
                var lngLatArray = [];

                for (let j = 1; j < coordinates.length - 1; j++) {
                    var lng = parseFloat(coordinates[j].split(",")[0]);
                    var lat = parseFloat(coordinates[j].split(",")[1]);
                    lngLatArray.push([lng, lat]);
                }

                console.log(lngLatArray);

                //Cargo las coordenadas en el source del mapa
                map.on('load', () => {
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
                });
                

            };


            reader.readAsText(file);
            
        });
        
        
    }


    //SVG
    leerSVG(files) {

        const section = $("body section:last");


        Array.from(files).forEach(file => {

            var reader = new FileReader();

            //Cargo las coordenadas en un array
            reader.onload = function (e) {


                var svg_completo = e.target.result; 
                var svg_completo_array = svg_completo.split("?>");  //es el fin de la cabecera xml
                var svg = svg_completo_array[1]; //cojo lo de ahi en adelante
                var svg_html_array = svg.split("height"); //quito lo de xmls y version
                var svg_html = svg_html_array[1]; //cojo a partir de height
                svg_html = "<svg height" + svg_html;
                
                section.append(svg_html);


            };
            reader.readAsText(file);
        });
    }


    

}

var viaje = new Viajes();



