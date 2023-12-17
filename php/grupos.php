<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio Virtual</title>

    <!-- Autor -->
    <meta name ="author" content ="Natalia Fernández Riego" />
    
    <!-- Descripción del contenido -->
    <meta name ="description" content ="Grupos de música y sus relaciones" />

    <!-- Palabras claves -->
    <meta name ="keywords" content ="grupos, musica, mysql, tablas" />

    <!-- Ventana gráfica -->
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    
    <!-- Favicon -->
    <link rel="icon" href="../multimedia/imagenes/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />

    
</head>

<body>

<?php 

    class Musica {

        private $server;
        private $user;
        private $pass;
        private $db;
        private $dbname;
        private $result;

        

        public function __construct() {
            $this->server = "localhost";
            $this->user = "DBUSER2023";
            $this->pass = "DBPSWD2023";
            $this->dbname = "musicadb";
            $this->db=new mysqli($this->server,$this->user,$this->pass);
           
        }

        public function crearBaseDatos(){
            
            $cadenaSQL = "CREATE DATABASE IF NOT EXISTS musicadb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;";
            if($this->db->query($cadenaSQL) === TRUE){
                $this->result = "Base de Datos creada correctamente";
            } else { 
                $this->result="Error en la creación de la Base de Datos";
            }  
            $this->db->select_db($this->dbname);
            $this->db->query("DROP TABLE IF EXISTS Cancion, Album, Integrante, Grupo, Productora"); 
            $this->db->close();  
        }

        public function crearTablas(){
            $this->db->select_db($this->dbname);
            //Eliminar tablas si existen
            $this->db->query("DROP TABLE IF EXISTS Cancion, Album, Integrante, Grupo, Productora");

            $queryProductora = "CREATE TABLE Productora (
                productora_id VARCHAR(255) NOT NULL,
                nombre VARCHAR(100) NOT NULL,
                pais VARCHAR(50) NOT NULL,
                PRIMARY KEY (productora_id)
            )";

            $queryGrupo = "CREATE TABLE Grupo (
                grupo_id VARCHAR(255) NOT NULL,
                nombre VARCHAR(255) NOT NULL,
                genero VARCHAR(50) NOT NULL,
                productora_id VARCHAR(255) NOT NULL,
                PRIMARY KEY (grupo_id),
                FOREIGN KEY (productora_id) REFERENCES Productora(productora_id)
            )";


            $queryIntegrante = "CREATE TABLE Integrante (
                integrante_id VARCHAR(255) NOT NULL,
                nombre VARCHAR(100) NOT NULL,
                grupo_id VARCHAR(255) NOT NULL,
                PRIMARY KEY (integrante_id),
                FOREIGN KEY (grupo_id) REFERENCES Grupo(grupo_id)
            )";


            $queryAlbumes = "CREATE TABLE Album (
                album_id VARCHAR(255) NOT NULL,
                titulo VARCHAR(255) NOT NULL,
                año VARCHAR(255) NOT NULL,
                grupo_id VARCHAR(255) NOT NULL,
                PRIMARY KEY (album_id),
                FOREIGN KEY (grupo_id) REFERENCES Grupo(grupo_id)
            )";

            $queryCanciones = "CREATE TABLE Cancion (
                cancion_id VARCHAR(255) NOT NULL,
                nombre VARCHAR(255) NOT NULL,
                album_id VARCHAR(255) NOT NULL,
                PRIMARY KEY (cancion_id),
                FOREIGN KEY (album_id) REFERENCES Album(album_id)
            )";


            $this->db->query($queryProductora);
            $this->db->query($queryGrupo);
            $this->db->query($queryIntegrante);
            $this->db->query($queryAlbumes);
            $this->db->query($queryCanciones);

            $this->db->close();    


        }


        public function importarProductoras(){
            $this->db->select_db($this->dbname);
            if ($_FILES['csv_pro']['tmp_name'] == null) {

            } else if ($_FILES['csv_pro']['type'] == "text/csv"  || $_FILES['csv_pro']['type'] == "application/vnd.ms-excel") {
                $file = fopen($_FILES['csv_pro']['tmp_name'], "r");
                while (!feof($file)) {
                    $datos = fgetcsv($file, 0, ",");
                    if ($datos){
                        $productora_id=$datos[0];
                        $nombre=$datos[1];
                        $pais=$datos[2];
                        $consultaPre = $this->db->prepare("INSERT INTO Productora (productora_id, nombre, pais) 
                            VALUES (?,?,?)");
                        $consultaPre->bind_param('sss', 
                            $productora_id,$nombre,$pais);    
                        

                        $pre = $consultaPre->execute();
                        $consultaPre->close();
                    }
                    
                }


                $consulta = "SELECT * FROM Productora";
                
                $resultadoConsulta = $this->db->query($consulta);

                fclose($file);

            }else{

            }
            
        }



        public function importarGrupos(){
            $this->db->select_db($this->dbname);
            if ($_FILES['csv_gru']['tmp_name'] == null) {

            } else if ($_FILES['csv_gru']['type'] == "text/csv"  || $_FILES['csv_gru']['type'] == "application/vnd.ms-excel") {
                $file = fopen($_FILES['csv_gru']['tmp_name'], "r");
                while (!feof($file)) {
                    $datos = fgetcsv($file, 0, ",");
                    if ($datos){
                        $grupo_id=$datos[0];
                        $nombre=$datos[1];
                        $genero=$datos[2];
                        $productora_id=$datos[3];
                        $consultaPre = $this->db->prepare("INSERT INTO Grupo (grupo_id, nombre, genero, productora_id) 
                            VALUES (?,?,?,?)");
                        $consultaPre->bind_param('ssss', 
                            $grupo_id, $nombre, $genero, $productora_id);    
                        $consultaPre->execute();
                        $consultaPre->close();
                    }
                    
                }
                fclose($file);
            }else{
            }
            $this->db->close(); 
        }


        public function importarIntegrantes(){
            $this->db->select_db($this->dbname);
            if ($_FILES['csv_int']['tmp_name'] == null) {
            } else if ($_FILES['csv_int']['type'] == "text/csv"  || $_FILES['csv_int']['type'] == "application/vnd.ms-excel") {
                $file = fopen($_FILES['csv_int']['tmp_name'], "r");
                while (!feof($file)) {
                    $datos = fgetcsv($file, 0, ",");
                    if ($datos){
                        $integrante_id=$datos[0];
                        $nombre=$datos[1];
                        $grupo_id=$datos[2];
                        $consultaPre = $this->db->prepare("INSERT INTO Integrante (integrante_id, nombre, grupo_id) 
                            VALUES (?,?,?)");
                        $consultaPre->bind_param('sss', 
                        $integrante_id, $nombre, $grupo_id);    
    
                        $consultaPre->execute();
                        $consultaPre->close();
                    }
                    
                }
                fclose($file);
            }else{
            }
            $this->db->close(); 
        }


        public function importarAlbumes(){
            $this->db->select_db($this->dbname);
            if ($_FILES['csv_alb']['tmp_name'] == null) {
            } else if ($_FILES['csv_alb']['type'] == "text/csv"  || $_FILES['csv_alb']['type'] == "application/vnd.ms-excel") {
                $file = fopen($_FILES['csv_alb']['tmp_name'], "r");
                while (!feof($file)) {
                    $datos = fgetcsv($file, 0, ",");
                    if ($datos){
                        $album_id=$datos[0];
                        $titulo=$datos[1];
                        $año=$datos[2];
                        $grupo_id=$datos[3];
                        $consultaPre = $this->db->prepare("INSERT INTO Album (album_id, titulo, año, grupo_id) 
                            VALUES (?,?,?,?)");
                        $consultaPre->bind_param('ssss', 
                        $album_id, $titulo, $año, $grupo_id);   
                        
                        
    
                        $consultaPre->execute();
                        $consultaPre->close();
                    }
                    
                }
                fclose($file);

            }else{

            }
            $this->db->close(); 
        }


        public function importarCanciones(){
            $this->db->select_db($this->dbname);
            if ($_FILES['csv_can']['tmp_name'] == null) {
            } else if ($_FILES['csv_can']['type'] == "text/csv"  || $_FILES['csv_can']['type'] == "application/vnd.ms-excel") {
                $file = fopen($_FILES['csv_can']['tmp_name'], "r");
                while (!feof($file)) {
                    $datos = fgetcsv($file, 0, ",");
                    if ($datos){
                        $cancion_id=$datos[0];
                        $nombre=$datos[1];
                        $album_id=$datos[2];
                        $consultaPre = $this->db->prepare("INSERT INTO Cancion (cancion_id, nombre, album_id) 
                            VALUES (?,?,?)");
                        $consultaPre->bind_param('sss', 
                        $cancion_id, $nombre, $album_id);    
    
                        $consultaPre->execute();
                        $consultaPre->close();
                    }
                    
                }
                fclose($file);

            }else{

            }
            $this->db->close(); 
        }


        public function exportarDatos() {
            $this->db->select_db($this->dbname);
        
            // Array de tablas en tu base de datos
            $tablas = array('Productora', 'Grupo', 'Integrante', 'Album', 'Cancion');
        
            // Iterar sobre cada tabla
            foreach ($tablas as $tabla) {
                // Nombre del archivo CSV
                $archivoCSV = $tabla . '_exportado.csv';
                $encabezados = array();
        
                //Consultar los nombres de las columnass
                $consultaEncabezados = $this->db->query("SHOW COLUMNS FROM $tabla");
                while ($fila = $consultaEncabezados->fetch_assoc()) {
                    $encabezados[] = $fila['Field'];
                }
        
                //Crear y abrir el archivo CSV
                $archivo = fopen($archivoCSV, 'w');
        
                $consultaDatos = $this->db->query("SELECT * FROM $tabla");
        
                while ($fila = $consultaDatos->fetch_assoc()) {
                    fputcsv($archivo, $fila);
                }
        
                fclose($archivo);
            }
        
            $this->db->close();
        }



        
        


    }   

    

    if (count($_POST)>0) {
        $musica = new Musica();
        if(isset($_POST['crearBase'])) $musica -> crearBaseDatos();
        if(isset($_POST['crearTabla'])) $musica -> crearTablas();

        if(isset($_POST['importarProductoras'])) {
            $musica -> importarProductoras();
        }
        if(isset($_POST['importarGrupos'])) $musica -> importarGrupos();
        if(isset($_POST['importarIntegrantes'])) $musica -> importarIntegrantes();
        if(isset($_POST['importarAlbumes'])) $musica -> importarAlbumes();
        if(isset($_POST['importarCanciones'])) $musica -> importarCanciones();
        
        if(isset($_POST['exportarDatos'])) $musica -> exportarDatos();
    }

    


?>


    <header>
        <h1>Escritorio Virtual</h1>

        <!-- Menú de navegación -->
        <nav>
            <a title="Indice" accesskey="I" tabindex="1" href="index.html">Indice</a> 
            <a title="Sobre mi" accesskey="S" tabindex="2" href="sobremi.html">Sobre mi</a> 
            <a title="Noticias" accesskey="N" tabindex="3" href="noticias.html">Noticias</a> 
            <a title="Agenda" accesskey="A" tabindex="4" href="agenda.html">Agenda</a> 
            <a title="Meteorologia" accesskey="M" tabindex="5" href="meteorologia.html">Meteorología</a> 
            <a title="Viajes" accesskey="V" tabindex="6" href="viajes.php">Viajes</a> 
            <a title="Juegos" accesskey="J" tabindex="7" href="juegos.html">Juegos</a> 
        </nav>
    </header>


    <nav>
        <a title="Juego de memoria" accesskey="U" tabindex="8" href="memoria.html">Juego de memoria</a> 
        <a title="Sudoku" accesskey="K" tabindex="9" href="sudoku.html">Sudoku</a> 
        <a title="Crucigrama" accesskey="C" tabindex="10" href="crucigrama.php">Crucigrama</a> 
        <a title="API" accesskey="P" tabindex="11" href="api.html">API</a> 
        <a title="APP sobre música" accesskey="G" tabindex="12" href="grupos.php">APP sobre música</a> 


    </nav>
        
    <h2>Aplicación sobre grupos de música</h2>

    <main>
        <h3>
            Creación de la Base de Datos:
        </h3>
        <form action='#' method='post' name='CrearBase'>
            <input type='submit' value='CrearBase' name='crearBase'>
        </form>

        <h3>
            Creación de las tablas:
        </h3>
        <form action='#' method='post' name='CrearTabla'>
            <input type='submit' value='CrearTabla' name='crearTabla'>
        </form>

        <h3>
            Importar datos csv de las productoras:
        </h3>
        <form action='#' method='post'enctype='multipart/form-data' name='importarDatosProductoras'>
            <label for='csv_pro'>Importar archivo csv</label>
            <input id='csv_pro' type='file' accept=".csv" name='csv_pro'>
            <input type='submit' value='ImportarProductoras' name='importarProductoras'>
        </form>
        <?php 
        if (count($_POST)>0) {
            if(isset($_POST['importarProductoras'])) {
                echo "Se han añadido las productoras correctamente. ";
            }
        }
        ?>
       

        <h3>
            Importar datos csv de los grupos:
        </h3>
        <form action='#' method='post'enctype='multipart/form-data' name='importarDatosGrupos'>
            <label for='csv_gru'>Importar archivo csv</label>
            <input id='csv_gru' type='file' accept=".csv" name='csv_gru'>
            <input type='submit' value='ImportarGrupos' name='importarGrupos'>
        </form>
        <?php 
        if (count($_POST)>0) {
            if(isset($_POST['importarGrupos'])) {
                echo "Se han añadido los grupos correctamente. ";

            }
        }
        ?>

        <h3>
            Importar datos csv de los integrantes:
        </h3>
        <form action='#' method='post'enctype='multipart/form-data' name='importarDatosIntegrantes'>
            <label for='csv_int'>Importar archivo csv</label>
            <input id='csv_int' type='file' accept=".csv" name='csv_int'>
            <input type='submit' value='ImportarIntegrantes' name='importarIntegrantes'>
        </form>
        <?php 
        if (count($_POST)>0) {
            if(isset($_POST['importarIntegrantes'])) {
                echo "Se han añadido los integrantes correctamente. ";

            }
        }
        ?>

        <h3>
            Importar datos csv de los álbumes:
        </h3>
        <form action='#' method='post'enctype='multipart/form-data' name='importarDatosAlbumes'>
            <label for='csv_alb'>Importar archivo csv</label>
            <input id='csv_alb' type='file' accept=".csv" name='csv_alb'>
            <input type='submit' value='ImportarAlbumes' name='importarAlbumes'>
        </form>
        <?php 
        if (count($_POST)>0) {
            if(isset($_POST['importarAlbumes'])) {
                echo "Se han añadido los álbumes correctamente. ";

            }
        }
        ?>

        <h3>
            Importar datos csv de las canciones:
        </h3>
        <form action='#' method='post'enctype='multipart/form-data' name='importarDatosCanciones'>
            <label for='csv_can'>Importar archivo csv</label>
            <input id='csv_can' type='file' accept=".csv" name='csv_can'>
            <input type='submit' value='ImportarCanciones' name='importarCanciones'>
        </form>
        <?php 
        if (count($_POST)>0) {
            if(isset($_POST['importarCanciones'])) {
                echo "Se han añadido las canciones correctamente. ";

            }
        }
        ?>


        <h3>
            Exportar datos de la base de datos a csv:
        </h3>
        <form action='#' method='post'enctype='multipart/form-data' name='exportarDatosForm'>
            <input type='submit' value='ExportarDatos' name='exportarDatos'>
        </form>




    </main>

</body>
