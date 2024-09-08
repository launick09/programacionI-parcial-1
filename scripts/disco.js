'use strict';

/*
 * Arroyo Lautaro Alan
 */

import { Input } from './input.js';

export class Disco {
    constructor(banda, disco, codigo, canciones) {
        this.banda = banda;
        this.disco = disco;
        this.codigo = codigo;
        this.canciones = canciones;
    }

    /**
     * Devuelve un string con los datos de la banda
     * @returns {String}
     */
    mostrarInfoBanda() {
        return `Banda: ${this.banda}, Disco: ${this.disco}, Código Unico: ${this.codigo}`;
    }

    /**
     * Devuelve el disco
     * @returns {Disco}
     */
    getDisco(){
        return this;
    }

    /**
     * Crea un disco
     */
    static cargarDisco() {
        try {     
            let banda = Input.string('Ingrese el Nombre de la Banda/Grupo:');
            let disco = Input.string('Ingrese el Nombre del Disco:');
            let codigo = Input.integer('código numérico único:');
            let canciones = null;
            return new Disco(banda, disco, codigo, canciones);
        } catch (error) {
            console.error(error.message);
        }
    }
}
