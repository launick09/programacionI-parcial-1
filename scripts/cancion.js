'use strict';

/*
 * Arroyo Lautaro Alan
 */

import { Input } from './input.js';

/**
 * @class Disco
 * @property {string} nombre - El nombre de la canción.
 * @property {number} duracion - La duracion de la canción.
 */
export class Cancion{
    constructor(nombre, duracion) {
        this.nombre = nombre;
        this.duracion = duracion;
    }

    /**
     * Devuelve la duracion de la cancion en mm:ss
     * @returns {String}
     */
    getDuracion(){
        return Input.segundosATiempo(this.duracion, false);
    }

    /**
     * Crea una cancion
     * @returns {Cancion|null}
     */
    static crearCancion() {
        try {
            let nombre = Input.string('Ingrese el nombre de la canción:');
            let duracion = Input.integer('Ingrese la duración de la canción (1, 7200seg)', 1, 7200);
            return new Cancion(nombre, duracion);
        } catch (error) {
            console.warn(error.message);
            return null;
        }
    }

}