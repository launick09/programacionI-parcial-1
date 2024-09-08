'use strict';

/*
 * Arroyo Lautaro Alan
 */


/**
 * Helper para el ingreso de datos y la validacion
 * 
 * Métodos:
 * - ingresarString(mensaje): pide y devuelve un string
 * - ingresarInteger(mensaje, min, max): pide y devuelve un int
 */
export class Input {
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
        while (value === "" || isNaN(value) || value < 1 || value > 999) {
            value = prompt(mensaje);
            if (value === null) {
                throw new Error('Ingreso Cancelado');
            }
            value = parseInt(value);
            if (isNaN(value)) {
                alert('Debe ingresar un número válido.');
            } else if (value <= min || value >= max) {
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

}