<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio Virtual</title>

    <!-- Autor -->
    <meta name ="author" content ="Natalia Fernández Riego" />
    
    <!-- Descripción del contenido -->
    <meta name ="description" content ="Juego del crucigrama matemático" />

    <!-- Palabras claves -->
    <meta name ="keywords" content ="juego, matematicas, memoria, numero" />

    <!-- Ventana gráfica -->
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    
    <!-- Hoja de estilo -->
    <link rel="stylesheet" type="text/css" href="estilo/crucigrama.css" />

    <!-- Favicon -->
    <link rel="icon" href="multimedia/imagenes/favicon.ico" type="image/x-icon">

    <!-- Referencia a JQuery (opción minificada) -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/crucigrama.js"></script>

</head>

<body>
    
    <?php
    
        class Record {

            protected $server;
            protected $user;
            protected $pass;
            protected $dbname;
            protected $output = ''; 


            public function __construct() {
                $this->server = "localhost";
                $this->user = "DBUSER2023";
                $this->pass = "DBPSWD2023";
                $this->dbname = "records";
            }

            public function tryConnection() {
                try {
                    $conn = new PDO("mysql:host=$this->server;dbname=$this->dbname",$this->user, $this->pass);
                    // set the PDO error mode to exception
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $this->insertData($conn);
                } catch(PDOException $e) {
                    echo "Connection failed: " . $e->getMessage();
                }
            }

            public function insertData($conn) {
                $nombre_i = $_POST["nombre"];
                $apellidos_i = $_POST["apellidos"];
                $nivel_i = $_POST["nivel"];
                $tiempo_i = $_POST["tiempo"];

                $sql = "INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (:nombre, :apellidos, :nivel, :tiempo)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':nombre', $nombre_i, PDO::PARAM_STR);
                $stmt->bindParam(':apellidos', $apellidos_i, PDO::PARAM_STR);
                $stmt->bindParam(':nivel', $nivel_i, PDO::PARAM_STR); 
                $stmt->bindParam(':tiempo', $tiempo_i, PDO::PARAM_STR); 
                $stmt->execute();

                $this->createList($conn);
            }

            public function createList($conn) {
                $sql = "SELECT * FROM registro ORDER BY tiempo ASC LIMIT 10";
                $stmt = $conn->query($sql);

                $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

                $this->output .= "<h4> Clasificación </h4>";
                $this->output .= "<ol>";
                foreach ($results as $row) {
                    $tiempoCalculado = $this->calcularTiempo($row['tiempo']);
                    $this->output .= "<li>Nombre: " . $row['nombre'] . " " . $row['apellidos'] . ". -- Nivel: " . $row['nivel'] . ". -- Tiempo: " . $tiempoCalculado . ".</li>";
                }
                $this->output .= "</ol>";
            }

            public function imprimirOutput() {
                echo $this->output;
            }

            public function calcularTiempo($seconds) {
                $minutes = floor($seconds / 60);
                $hours = floor($minutes / 60);

                $strTiempo = $hours . ":" . $minutes . ":" . $seconds;
                
                return $strTiempo;
            }

            
        }


        $miRecord = new Record();

        if (count($_POST) > 0) {
            $miRecord->tryConnection();
        }

        

    ?>

    <main>
        
    </main>

    <script> 
        cruci.paintMathword(); 
        
        document.addEventListener('keydown', function (event) {
            const key = event.key;

            let array = [0,1,2,3,4,5,6,7,8,9];

            // Obtener la celda seleccionada
            const selectedCell = document.querySelector("[data-state='clicked']");

            if (selectedCell) {
                console.log(key);
                if (array.includes(parseInt(key)) || key==='+' || key==='-' || key==='*' || key ==='/') {
                    cruci.introduceElement(key);
                } else if (key ===! 'Shift'){
                    alert('Debes introducir un número o un operador aritmetico');
                }
            }

      });
    
    
    
    </script>

    <?php
        $miRecord->imprimirOutput();
    ?>
    


</body>
</html>