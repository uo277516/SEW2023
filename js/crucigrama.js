"use strict";
class Crucigrama {
    constructor() {
        //Nivel fácil
        this.board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
        //Nivel medio
        //this.board = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32"
        //Nivel díficil
        //this.board = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72"
        
        this.num_columnas=9;
        this.num_filas=11;
        this.init_time = null;
        this.end_time = null;
        this.tablero_array = null;
        
    }

    
    start() {
       
        let i = 0;
        let j = 0;

        this.tablero_array = new Array(this.num_filas).fill(null).map(() => new Array(this.num_columnas).fill(null));


        this.board.split(",").map((char) => {

            if (char === ".") {
                this.tablero_array[i][j] = 0;
            } else if (char === '#') {
                this.tablero_array[i][j] = -1;
            } else {
                this.tablero_array[i][j] = char;
            }
            j++;
            if (j === this.num_columnas) {
                i++;
                j=0;
            }
            
        });
        

    }



    paintMathword() {
        this.crearParrafos();
        this.init_time = new Date();
    }

    
    crearParrafos() {
        const main = $("body main");

        for (let i=0; i<this.num_filas; i++) {
            for (let j=0; j<this.num_columnas; j++) {
                var p = $("<p></p>");
                
                //Creo el parrafo dependiendo del valor
                if (this.tablero_array[i][j] === 0) {
                    p.on('click', function () {
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


    handleClick(p) {
        p.attr("data-state", "clicked");
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
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        let strTiempo = hours + ":" + minutes + ":" + seconds;
        return strTiempo;
    }


    introduceElement(key) {
        var expression_row=true;
        var expression_col=true;

        const selectedCell = $('p[data-state="clicked"]');

        console.log(selectedCell);

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
                    console.log(first_number + "," + expression + "," + second_number + "," + result);
                    if (first_number !== 0 && second_number!== 0 && expression!== 0 && result !== 0) {
                        var expression_completada = [first_number, expression, second_number].join("");
                        if (eval(expression_completada) != result) {
                            expression_col = false;
                        }
                    }
                }
            }
        }

        console.log("Columna:" + expression_col + ". Fila:"+ expression_row);

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
            alert("Enhorabuena, haz finalizado el crucigrama en un tiempo de: " + this.calculate_date_difference());
        }



    }


    
}

var cruci = new Crucigrama();
cruci.start();
