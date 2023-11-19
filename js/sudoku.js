"use strict";
class Sudoku {

    constructor() {
        // Atributos
        this.tableroStr = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6"; 
        this.numFilas = 9;    
        this.numColumnas = 9;

        // Inicializar el tablero 
        this.tableroArray = Array.from({ length: this.numFilas }, () => Array(this.numColumnas).fill(null));

        //Variable para el handle
        this.clickHandler = (event) => {
        this.handleClick(event.target);
        };
    }
    
    start () {
        let i = 0;
        let j = 0;
        
        this.tableroStr.split("").map((char) => {
            if (char === ".") {
                this.tableroArray[i][j] = 0;
            } else {
                this.tableroArray[i][j] = parseInt(char);
            }

            j++;

            if (j === this.numColumnas) {
                i++;
                j=0;
            }
          }); 
    }

    
    createStructure() {
        const mainElement = document.querySelector('main');

        for (let i = 0; i < this.numFilas; i++) {
            for (let j = 0; j < this.numColumnas; j++) {
                const p = document.createElement('p');
                if (this.tableroArray[i][j]===0) {                    
               
                    p.addEventListener('click', this.clickHandler);

                } else {
                    p.dataset.state='blocked';
                    p.textContent=this.tableroArray[i][j];
                }
                mainElement.appendChild(p);
            }
        }
    }


    handleClick(p) {
        p.dataset.state='clicked';
    }


    paintSudoku() {
        this.createStructure();
    }
    
    
    introduceNumber(numero) {

        const selectedCell = document.querySelectorAll("[data-state='clicked']")[0];
        const allCells = document.querySelectorAll('main p');

        // Verificar si al menos una celda está seleccionada
        const posicion = Array.from(allCells).indexOf(selectedCell);

        // Calcular fila y columna según la posición
        const fila = Math.floor(posicion / 9);  
        const columna = (posicion % 9) ; 
        
        if (! this.tableroArray[fila].includes(numero)) {
            if (! this.tableroArray.some((fila) => fila[columna] === numero)) {
                if (! this.numeroEnCuadricula(numero, fila, columna)) {
                        selectedCell.textContent = numero;
                        selectedCell.dataset.state = 'correct';
                        this.tableroArray[fila][columna]=numero;
                       
                        selectedCell.removeEventListener('click', this.clickHandler);        // Remove event listener click                

                        // Comprobar si el sudoku se ha completado
                        if (this.sudokuCompletado(allCells))                         // Comprobar si el sudoku se ha completado
                            alert('¡Felicidades! Sudoku completado.');
                } else  {
                    selectedCell.dataset.state='';
                    alert('Número no válido en la sub-cuadrícula.' +fila+columna);
                }
                    
            } else  {
                selectedCell.dataset.state='';
                alert('Número no válido en la columna '+columna);
            }
        } else {
            selectedCell.dataset.state='';
            alert('Número no válido en la fila ' +fila);
      }
    }
  


    sudokuCompletado(allCells) {
        return Array.from(allCells).every((cell) => cell.textContent !== "");    
    }

    numeroEnCuadricula(numero, fila, columna) {
        
        const subCuadriculaFilaInicio = Math.floor(fila / 3) * 3;
        const subCuadriculaColumnaInicio = Math.floor(columna / 3) * 3;
    
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (this.tableroArray[subCuadriculaFilaInicio + i][subCuadriculaColumnaInicio + j] === numero) {
              return true;
            }
          }
        }
        return false;
      }

    
}
  
  
const sudoku = new Sudoku();
sudoku.start();
  