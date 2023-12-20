Natalia Fernández Riego
UO277516

Varios aspectos a destacar:
1. A lo largo del proyecto, hay algunos errores/warnings (errores aceptados) de los validadores, que, aunque están documentados a lo largo del código en forma
de comentarios, me gustaría reflejar aquí también:
    -Los mapas dinámicos dan errores, tanto de HTML (un warning por el tipo de letra), como en adaptabilidad (herramienta Lighthouse).
    "<!-- Da un aviso el validadpr de html, por el codigo que se genera al hacer el mapa dinamico-->
    <!-- Warning: Possible misuse of aria-label. (If you disagree with this warning, file an issue report or send e-mail to www-validator@w3.org.)-->
    <!-- Error en accesibilidad Lighthouse por código que genera el propio mapa (aceptado)-->"
    -Error de accesibilidad en Lighthouse, pero es lo que tenemos que hacer: "Some elements have a [tabindex] value greater than 0". Verificado
    -A veces, tambien salta warnings en la consola
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
4. El navegador Opera "a veces" añade un atributo style al <body>. Solo me paso una vez
5. El atributo lang del html "agenda.html" está puesto a "en" (ingles). Daba un warning el validador (la mayoria del contenido
es en ingles ya que las carreras y su info estan en ingles)
6. Opera y Edge dan este Warning en la consola si recargas las páginas "Error with Permissions-Policy header: Origin trial controlled feature not enabled: 'interest-cohort'.""