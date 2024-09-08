'use strict';

/*
 * Arroyo Lautaro Alan
 */

import { Input } from './input.js';

export class Cancion{
    constructor(nombre, duracion) {
        this.nombre = nombre;
        this.duracion = duracion;
    }

    static crearCancion() {
        try {
            let nombre = Input.string('Ingrese el nombre de la canción:');
            let duracion = Input.integer('Ingrese la duración de la canción (1, 7200seg)', 1, 7200);
            return new Cancion(nombre, duracion);
        } catch (error) {
            console.error(error.message);
            return null
        }
    }

}