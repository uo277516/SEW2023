"use strict";
class Pais {

    constructor (nombre, capital, poblacion) {
            this.nombre=nombre;
            this.capital=capital;
            this.poblacion=poblacion;
        }

    rellenar (forma_gobierno, coordenadas_capital, religion) {
        this.forma_gobierno=forma_gobierno;
        this.coordenadas_capital=coordenadas_capital;
        this.religion=religion;
    }


    getNombre() {
        return this.nombre;
    }

    getCapital() {
        return this.capital;
    }

    getPoblacion() {
        return this.poblacion;
    }

    getFormaDeGobierno() {
        return this.forma_gobierno;
    }

    getCoordenadasCapital() {
        return this.coordenadas_capital;
    }

    getReligion() {
        return this.religion;
    }

    getListaInformacionSecundaria() {
        const informacionSecundariaHTML = "<ul><li>Población:" + this.getPoblacion() + "</li><li>Forma de Gobierno: "+this.getFormaDeGobierno()+"</li><li>Religión Mayoritaria: "+this.getReligion()+"</li></ul>";
        return informacionSecundariaHTML;
    }

    escribirCoordenadasDocumento () {
        document.write(this.coordenadas_capital);
    }

    escribirEnDocumento() {
        document.write("<p>País: ");
        document.write(this.getNombre());
        document.write("</p>");

        document.write("<p>Capital: ");
        document.write(this.getCapital());
        document.write("</p>");

        document.write("<p>Población: ");
        document.write(this.getPoblacion());
        document.write(" personas </p>");

        document.write(this.getListaInformacionSecundaria());
    }

}

var pais = new Pais ("Camboya", "Phnom Penh", 17667222);
pais.rellenar("Monarquía constitucional", "11.56245, 104.91601, 10", "Budismo Theravada");



