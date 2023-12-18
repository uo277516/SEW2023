"use strict";
class Crucigrama {
    constructor() {
        //Nivel fácil
        this.nivel="Fácil";
        this.board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
        
        //Nivel medio
        //.nivel="Medio";
        //this.board = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32"
        
        //Nivel díficil
        //this.nivel="Difícil";
        //this.board = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72"
        
        this.num_columnas=9;
        this.num_filas=11;
        this.init_time = null;
        this.end_time = null;
        this.tablero_array = null;

        this.seconds_completado=0;
        
    }

    
    start() {
       
        let i = 0;
        let j = 0;

        this.tablero_array = [];

        //Inicializo el array
        for (let i = 0; i < this.num_filas; i++) {
            const fila = [];
            for (let j = 0; j < this.num_columnas; j++) {
                fila[j] = null;
            }
            this.tablero_array[i] = fila;
        }


        let a = 0;
        let b = 0;

        //Iterar sobre los caracteres en this.board
        for (const char of this.board.split(",")) {
            if (char === ".") {
                this.tablero_array[a][b] = 0;
            } else if (char === '#') {
                this.tablero_array[a][b] = -1;
            } else {
                this.tablero_array[a][b] = char;
            }

            b++;
            if (b === this.num_columnas) {
                a++;
                b = 0;
            }
        }
    }



    paintMathword() {
        this.crearParrafos();
        this.init_time = new Date();
    }

    
    crearParrafos() {
        const main = $("body main aside");

        for (let i=0; i<this.num_filas; i++) {
            for (let j=0; j<this.num_columnas; j++) {
                var p = $("<p></p>");
                
                //Creo el parrafo dependiendo del valor
                if (this.tablero_array[i][j] === 0) {
                    p.on('click', function () {
                        const selectedCell = $('p[data-state="clicked"]');
                        //Si ya tengo alguna seleccionada
                        if (selectedCell) {
                            $(selectedCell).attr("data-state", "");
                        }

                        $(this).attr("data-state", "clicked");
                    });
                } else {
                    if (this.tablero_array[i][j] === -1) {
                        p.attr("data-state", "empty");
                    } else {  //Si es numero o signo
                        p.text(this.tablero_array[i][j]); 
                        p.attr("data-state", "blocked");
                        
                    }
                }
                main.append(p);
            }
        }

        

    }


    check_win_condition() {

        for (let i=0; i<this.num_filas; i++) {
            for (let j=0; j<this.num_columnas; j++) {
                if (this.tablero_array[i][j] === 0) {
                    return false;
                }
            }
        }

        return true;

    }
    
    
    calculate_date_difference() {

        let tiempo_resolver = this.end_time-this.init_time; //en milisegundos

        let seconds = Math.floor(tiempo_resolver / 1000);

        this.seconds_completado = seconds;

        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        

        let segundos_calculado = seconds -minutes*60;
        let minutos_calculado = minutes - hours*60;
        

        let strTiempo = hours + ":" + minutos_calculado + ":" + segundos_calculado;
        return strTiempo;
    }


    introduceElement(key) {
        var expression_row=true;
        var expression_col=true;

        const selectedCell = $('p[data-state="clicked"]');

        let fila = Math.floor(selectedCell.index() / this.num_columnas);
        let columna = selectedCell.index() % this.num_columnas;

        this.tablero_array[fila][columna] = key;

        //Comprobar horizontal
        if (columna+1 >= this.num_columnas || this.tablero_array[fila][columna+1] === -1 ) { //Si a la derecha hay negro o si ya acaba 
            expression_row=true;
        } else {
            for (let c = columna+1; c<this.num_columnas; c++) { //voy avanzando derecha hasta econtrar primer =
                if (this.tablero_array[fila][c] === '=') {
                    var first_number = this.tablero_array[fila][c-3];
                    var second_number = this.tablero_array[fila][c-1];
                    var expression = this.tablero_array[fila][c-2];
                    var result = this.tablero_array[fila][c+1];
                    if (first_number !== 0 && second_number!== 0 && expression!== 0 && result !== 0) {
                        var expression_completada = [first_number, expression, second_number].join("");
                        if (eval(expression_completada) != result) {
                            expression_row = false;
                        }
                    }
                }
            }
        }

        //Comprobar vertical
        if (fila+1>=this.num_filas || this.tablero_array[fila+1][columna] === -1) {
            expression_col=true;
        } else {
            for (let f = fila+1; f<this.num_filas; f++) {
                if (this.tablero_array[f][columna] === '=') {
                    var first_number = this.tablero_array[f-3][columna];
                    var second_number = this.tablero_array[f-1][columna];
                    var expression = this.tablero_array[f-2][columna];
                    var result = this.tablero_array[f+1][columna];
                    if (first_number !== 0 && second_number!== 0 && expression!== 0 && result !== 0) {
                        var expression_completada = [first_number, expression, second_number].join("");
                        if (eval(expression_completada) != result) {
                            expression_col = false;
                        }
                    }
                }
            }
        }


        //Una vez finalizadas las comprobaciones
        if (expression_col == true && expression_row == true) {
            selectedCell.text(key);
            selectedCell.attr("data-state", "correct");
        } else {
            this.tablero_array[fila][columna]=0;
            selectedCell.attr("data-state", "");
            alert("El valor que has introducido no es correcto para la casilla seleccionada");
        }

        

        if (this.check_win_condition()) {
            this.end_time = new Date();
            alert("Enhorabuena, haz finalizado el crucigrama en un tiempo de: " + this.calculate_date_difference()
            + ".\nPor favor, ahora rellena el formulario que se encuentra al final de la página");
            this.createRecordForm(); //formulario
        }



    }

    createRecordForm() {
        const form = $("<form></form>");
        form.attr("action", "#");
        form.attr("method", "post");
        form.attr("name", "formulario");
    
        const p_nombre = $("<p></p>");
        const label_nombre = $("<label></label>");
        label_nombre.attr("for", "nombre");
        label_nombre.text("Nombre: ");
        const input_nombre = $("<input>");
        input_nombre.attr("type", "text");
        input_nombre.attr("id", "nombre");
        input_nombre.attr("name", "nombre");
        input_nombre.attr("placeholder", "Escribe tu nombre");
        input_nombre.attr("required", true);
        p_nombre.append(label_nombre);
        p_nombre.append(input_nombre);
        form.append(p_nombre);
    
        const p_apellidos = $("<p></p>");
        const label_apellidos = $("<label></label>");
        label_apellidos.attr("for", "apellidos");
        label_apellidos.text("Apellidos: ");
        const input_apellidos = $("<input>");
        input_apellidos.attr("type", "text");
        input_apellidos.attr("id", "apellidos");
        input_apellidos.attr("name", "apellidos");
        input_apellidos.attr("placeholder", "Escribe tus apellidos");
        input_apellidos.attr("required", true);
        p_apellidos.append(label_apellidos);
        p_apellidos.append(input_apellidos);
        form.append(p_apellidos);
    
        const p_nivel = $("<p></p>");
        const label_nivel = $("<label></label>");
        label_nivel.attr("for", "nivel");
        label_nivel.text("Nivel: ");
        const input_nivel = $("<input>");
        input_nivel.attr("type", "text");
        input_nivel.attr("id", "nivel");
        input_nivel.attr("name", "nivel");
        input_nivel.attr("value", this.nivel);
        input_nivel.attr("readonly", "readonly");
        p_nivel.append(label_nivel);
        p_nivel.append(input_nivel);
        form.append(p_nivel);
    
        const p_tiempo = $("<p></p>");
        const label_tiempo = $("<label></label>");
        label_tiempo.attr("for", "tiempo");
        label_tiempo.text("Tiempo en segundos: ");
        const input_tiempo = $("<input>");
        input_tiempo.attr("type", "text");
        input_tiempo.attr("id", "tiempo");
        input_tiempo.attr("name", "tiempo");
        input_tiempo.attr("value", this.seconds_completado);
        input_tiempo.attr("readonly", "readonly");
        p_tiempo.append(label_tiempo);
        p_tiempo.append(input_tiempo);
        form.append(p_tiempo);
    
        const input_enviar = $("<input>");
        input_enviar.attr("type", "submit");
        input_enviar.attr("value", "Enviar");
        form.append(input_enviar);
    
        const aside = $("<aside></aside>");
        const body = $("body");
    
        aside.append(form);
        body.append(aside);
    }
    

    



    
}

var crucigrama = new Crucigrama();
crucigrama.start();
