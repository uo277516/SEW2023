Natalia Fernández Riego
UO277516

Varios aspectos a destacar:
1. A lo largo del proyecto, hay algunos errores/warnings (errores aceptados) de los validadores, que, aunque están documentados a lo largo del código en forma
de comentarios, me gustaría reflejar aquí también:
    -Los mapas dinámicos dan errores, tanto de HTML (un warning por el tipo de letra), como en adaptabilidad (herramienta Lighthouse).
    "<!-- Da un aviso el validadpr de html, por el codigo que se genera al hacer el mapa dinamico-->
    <!-- Warning: Possible misuse of aria-label. (If you disagree with this warning, file an issue report or send e-mail to www-validator@w3.org.)-->
    <!-- Error en accesibilidad Lighthouse por código que genera el propio mapa (aceptado)-->"

2. En la carpeta /js, existe un archivo de texto llamado "api.txt". Este sirve como prueba para "api.html", a la hora de meter un archivo
con coordenadas.
3. El css hecho para el ejercicio 3 de PHP sesión 10 está en la carpeta /estilo.
4. El navegador Opera a veces añade un atributo style al <body>