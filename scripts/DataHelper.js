'use strict';

/*
 * Arroyo Lautaro Alan
 */


/**
 * Helper para el ingreso de datos y la validacion
 * 
 * Métodos:
 * - string(mensaje): pide y devuelve un string
 * - integer(mensaje, min, max): pide y devuelve un int
 * - segundosATiempo(duracion, largo): transforma segundos a tiempo
 */
export class DataHelper {
    constructor() {
        //
    }

    /**
     * Pide un dato y valida el valor minimo, maximo y que no este vacio
     * @param {string} mensaje - El mensaje que se mostrará por prompt
     * @param {number} min - El valor mínimo deseado
     * @param {number} max - El valor máximo deseado
     * @returns {integer} valor ingresado
     */
    static integer(mensaje = 'Ingrese un Numero', min = 1, max = 999){
        let value = null;
        while (value === "" || isNaN(value) || value < min || value > max) {
            value = prompt(mensaje);
            if (value === null) {
                throw new Error('Ingreso Cancelado');
            }
            value = parseInt(value, 10);
            if (isNaN(value)) {
                alert('Debe ingresar un número válido.');
            } else if (value < min || value > max) {
                alert(`El número debe estar entre ${min} y ${max}.`);
            }
        }
        return value;
    }

    /**
     * Pide un dato y valida que no este vacio
     * @param {string} mensaje - El mensaje que se mostrará por prompt
     * @returns {string} El valor ingresado
     */
    static string(mensaje = 'Ingrese un texto'){
        let value = "";
        while (value === "") {
            value = prompt(mensaje);
            if (value === null) {
                throw new Error('Ingreso Cancelado');
            }
            if (value.trim() === "") {
                alert('No puede quedar vacío.');
            }
        }
        return value;
    }

    /**
     * Transforma los segundos a H:m:s o m:s
     * @param {integer} duracion - La duracion en segundos
     * @param {boolean} largo - Si retorna las horas
     * @returns {string} El valor transformado
     */
    static segundosATiempo(duracion, largo = true){
        const horas = Math.floor(duracion / 3600).toString();
        const segundos = Math.ceil(duracion % 60).toString();
        let minutos = Math.floor(duracion / 60).toString();
        if (largo && horas > 0) {
            minutos = Math.floor((duracion % 3600) / 60).toString();
            return `${horas}:${minutos.padStart(2, '0')}:${segundos.padStart(2, '0')}`;
        }
        return `${minutos.padStart(2, '0')}:${segundos.padStart(2, '0')}`;
    }

}