Natalia Fernández Riego
UO277516

Varios aspectos a destacar:
1. A lo largo del proyecto, hay algunos errores/warnings (errores aceptados) de los validadores, que, aunque están documentados a lo largo del código en forma
de comentarios, me gustaría reflejar aquí también:
    -Los mapas dinámicos dan errores, tanto de HTML (un warning por el tipo de letra), como en adaptabilidad (herramienta Lighthouse).
    "<!-- Da un aviso el validadpr de html, por el codigo que se genera al hacer el mapa dinamico-->
    <!-- Warning: Possible misuse of aria-label. (If you disagree with this warning, file an issue report or send e-mail to www-validator@w3.org.)-->
    <!-- Error en accesibilidad Lighthouse por código que genera el propio mapa (aceptado)-->"
    -La herramienta Lighthouse da un error de adaptabilidad del viewport, diciendo que es mas grande que el contenido
    que la pantalla. Sin embargo, si se ve al completo, no hay ni barra horizontal. Los ficheros afectados son:
        -viajes.php 
        -noticias.html
        -agenda.html
        -memoria.html
2. En la carpeta /js, existe un archivo de texto llamado "api.txt". Este sirve como prueba para "api.html", a la hora de meter un archivo
con coordenadas.
3. El css hecho para el ejercicio 3 de PHP sesión 10 está en la carpeta /estilo.
   En este ejercicio, las 3 funcionalidades que se citan en el guión están incluidas de la siguiente manera:
    - Boton crear base (crea base de 0 y crea las tablas (las elimina y las vuelve a crear)). 
      Puedes hacerlo manual (pulsar boton) o ya se hace aun asi automaticamente al cargar la pagina.
    - Botones importar (uno para cada tabla, uno para csv).
    - Boton exportar. Descarga un solo archivo csv. En el, para cada tabla incluye: 
        - fila de los nombres de los atibutos separados por comentarios
        - filas con las filas de la base de datos
4. El navegador Opera a veces añade un atributo style al <body>
