<?php

    class Carrusel {
        private $pais;
        private $capital;

        public function __construct($pais, $capital) {
            $this->pais = $pais;
            $this->capital = $capital;
        }

        public function getPais(){
            return $this->pais;
        }
        
        public function getCapital(){
            return $this->capital;
        }

        //Hacer la llamada a flickr
        public function getCarrusel() {

            $params = array(
                'api_key'	=> '7ea9c232e677033d7c7fe0fbc5f8887b',
                'method'	=> 'flickr.photos.search',
                'tags'      => $this->pais . "," . $this->capital . ",landscape",
                'format'	=> 'json',
                'nojsoncallback' => 1  
            );
            
            $encoded_params = array();
            
            foreach ($params as $k => $v){
            
                $encoded_params[] = urlencode($k).'='.urlencode($v);
            }
            
            #
            # llamar a la API y decodificar la respuesta
            #
            
            
            $url = "https://api.flickr.com/services/rest/?".implode('&', $encoded_params);
            
            $rsp = file_get_contents($url);
            
            # Decodificar la respuesta JSON
            $json = json_decode($rsp);

            # Verificar si hay errores en la respuesta JSON
            if (json_last_error() == JSON_ERROR_NONE || $json !== null) {
                
                    //Visualiza el archivo JSON
                    /*
                print ("<pre>");
                print_r($json->photos->photo);
                print ("</pre>");*/

                echo "<h3>Carrusel de imágenes</h3>";
                $i=0;
                foreach($json->photos->photo as $foto) {
                    if ($i<10) {
                        // print ("<pre>");
                        //print_r($foto->title);
                        
                        $imageUrl = 'https://farm' . $foto->farm . '.staticflickr.com/' . $foto->server . '/' . $foto->id . '_' . $foto->secret . '_b.jpg';
                        //print_r($imageUrl);
                        // print ("</pre>");

                        echo "<img alt='" . htmlspecialchars($foto->title, ENT_QUOTES, 'UTF-8') . "' src='" . $imageUrl . "'>";

                    }
                    $i++; 
                }
            }

        }
    }


    class Moneda {

        private $moneda_local;
        private $moneda_euro;
        private $conversion;

        public function __construct($moneda_local, $moneda_euro) {
            $this->moneda_local = $moneda_local;
            $this->moneda_euro = $moneda_euro;
        }

        public function getMonedaLocal(){
            return $this->moneda_local;
        }
        
        public function getMonedaEuros(){
            return $this->moneda_euro;
        }

        public function cambiarMoneda() {
            $price = "No se pudo convertir";
            $req_url = 'https://v6.exchangerate-api.com/v6/7452271d9926b339059f4ed4/latest/' . $this->moneda_euro;
            $response_json = file_get_contents($req_url);

            // Continuing if we got a result
            if(false !== $response_json) {

                // Try/catch for json_decode operation
                try {

                    // Decoding
                    $response = json_decode($response_json);

                    // Check for success
                    if('success' === $response->result) {
                        // YOUR APPLICATION CODE HERE, e.g.
                        $base_price = 1; // un euro
                        $local = $this->getMonedaLocal();
                        $price = round(($base_price * $response->conversion_rates->$local), 2);
                        
                    }

                }
                catch(Exception $e) {
                    print ("<pre>");
                    print_r($e);
                    print ("</pre>");
                }

            }

            echo '<p> Esta es la conversión de euros (EUR) a rieles (KHR), moneda local de Cambodia: 1 EUR = ' . $price . ' KHR, aproximadamente. </p>';

        }
    }

?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio Virtual</title>

    <!-- Autor -->
    <meta name ="author" content ="Natalia Fernández Riego" />
    
    <!-- Descripción del contenido -->
    <meta name ="description" content ="En esta página se ofrecen diferentes aspectos para informase de los viajes
    realizados en el país Cambodia y sobre el país en si" />

    <!-- Palabras claves -->
    <meta name ="keywords" content ="rutas, imagenes, mapa, moneda" />

    <!-- Ventana gráfica -->
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    
    <!-- Hoja de estilo -->
    <link rel="stylesheet" type="text/css" href="estilo/viajes.css" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />

    
    <!-- Favicon -->
    <link rel="icon" href="multimedia/imagenes/favicon.ico" type="image/x-icon">

    <!-- Referencia a JQuery (opción minificada) -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/viajes.js"></script>

    <!-- Mapa dinámico MapBox-->
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js"></script>


</head>

<body>
    
    <header>


        <h1>Escritorio Virtual</h1>

        <!-- Menú de navegación -->
        <nav>
            <a title="Indice" accesskey="I" tabindex="1" href="index.html">Indice</a> 
            <a title="Sobre mi" accesskey="S" tabindex="2" href="sobremi.html">Sobre mi</a> 
            <a title="Noticias" accesskey="N" tabindex="3" href="noticias.html">Noticias</a> 
            <a title="Agenda" accesskey="A" tabindex="4" href="agenda.html">Agenda</a> 
            <a title="Meteorologia" accesskey="M" tabindex="5" href="meteorologia.html">Meteorología</a> 
            <a title="Viajes" accesskey="V" tabindex="6" href="viajes.html">Viajes</a> 
            <a title="Juegos" accesskey="J" tabindex="7" href="juegos.html">Juegos</a> 
        </nav>
    </header>
    
    <h2>Viajes</h2>

    <article>
        <?php 
            $c = new Carrusel("Camboya", "Phnom Penh");
            $c -> getCarrusel();
        ?>
        <script> viaje.crearBotonesCarrusel(); </script>
    </article>
    
    <main>
        <h3> Mapas basados en tu ubicación </h3>
        <article>
            <h4> Mapa estático </h4>
            <button onclick = "viaje.getMapaEstatico()">Obtener mapa estático</button>
        </article>
        <article>
            <h4> Mapa dinámico </h4>
            <!-- Da un aviso el validadpr de html, por el codigo que se genera al hacer el mapa dinamico-->
            <!-- Warning: Possible misuse of aria-label. (If you disagree with this warning, file an issue report or send e-mail to www-validator@w3.org.)-->
            <button onclick = "viaje.getMapaDinamico()">Obtener mapa dinámico</button>
        </article>
    </main>
     
    <section>
        <h3>Leer rutas a partir de XML</h3>
        <label for="archivoXml">Selecciona un archivo .xml:</label>
        <input id ="archivoXml" type="file" accept=".xml" onchange="viaje.readXMLFile(this.files);">
    </section>

    <section>
        <h3>Leer archivos de planimetría</h3>
        <label for="archivoKml">Selecciona uno o varios archivos .kml:</label>
        <input id="archivoKml" type="file" accept=".kml" onchange="viaje.leerKML(this.files);" multiple="">
    </section>

    <section>
        <h3>Leer archivos de altimetría </h3>
        <label for="archivoSvg">Selecciona uno o varios archivos .svg:</label>
        <input id="archivoSvg" type="file" accept=".svg" onchange="viaje.leerSVG(this.files);" multiple="">
    </section>

    <section>
        <h3>Conversión de moneda</h3>
        <?php 
            $moneda = new Moneda('KHR', 'EUR');
            $moneda -> cambiarMoneda(); 
        ?>
    </section>

    

</body>
</html>