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
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />

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
        
    <section>
        <h2>Crucigrama</h2>
        <p>A continuación, se muestran indicaciones y consejos par jugar al crucigrama: </p>
        <ol>
            <li>El objetivo es rellenar todas las celdas de manera que todas las operaciones matemáticas 
                sean correctas, tanto de manea vertical como de manera horizontal. </li>
            <li>Hay 3 niveles: fácil, medio y avanzado. </li>
            <li>Para introducir un valor, primero tienes que hacer click (o tocar) la celda correspondiente. </li>
            <li>Si seleccionas una celda y pones un valor e inmediatamente después deseas cambiarlo, tienes que
                volver a hacer click en la celda. </li>
            <li>Los valores admitidos son números (0-9) y en el nivel avanzado, símbolos. </li>
            <li>No es posible poner números de más de una cifra. </li>
            <li>En el nivel difícil, hay que poner símbolos. Los admitidos son multiplicación (*), suma y resta (+,-) y división (/). </li>
            <li>Se finaliza una vez se han completado todas las celdas correctamente, el mismo programa te avisa. </li>
        </ol>
    </section>

    <main>
        <aside>

        </aside>
        
    </main>

    <script> 
        crucigrama.paintMathword(); 
        
        document.addEventListener('keydown', function (event) {
            const key = event.key;

            let array = [0,1,2,3,4,5,6,7,8,9];

            // Obtener la celda seleccionada
            const selectedCell = document.querySelector("[data-state='clicked']");

            if (selectedCell) {
                console.log(key);
                if (array.includes(parseInt(key)) || key==='+' || key==='-' || key==='*' || key ==='/') {
                    crucigrama.introduceElement(key);
                } else if (key ===! 'Shift'){
                    alert('Debes introducir un número o un operador aritmetico');
                }
            }

      });
    
    
    
    </script>

    <section data-type="botonera">
        <h2>Botonera</h2>
        <button onclick="crucigrama.introduceElement(1)">1</button>
        <button onclick="crucigrama.introduceElement(2)">2</button>
        <button onclick="crucigrama.introduceElement(3)">3</button>
        <button onclick="crucigrama.introduceElement(4)">4</button>
        <button onclick="crucigrama.introduceElement(5)">5</button>
        <button onclick="crucigrama.introduceElement(6)">6</button>
        <button onclick="crucigrama.introduceElement(7)">7</button>
        <button onclick="crucigrama.introduceElement(8)">8</button>
        <button onclick="crucigrama.introduceElement(9)">9</button>
        <button onclick="crucigrama.introduceElement('*')">*</button>
        <button onclick="crucigrama.introduceElement('+')">+</button>
        <button onclick="crucigrama.introduceElement('-')">-</button>
        <button onclick="crucigrama.introduceElement('/')">/</button>
    </section>

    <?php
        $miRecord->imprimirOutput();
    ?>
    


</body>
</html>