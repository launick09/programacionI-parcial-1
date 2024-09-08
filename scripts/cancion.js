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

    /**
     * Devuelve la duracion de la cancion en mm:ss
     * @returns {String}
     */
    getDuracion(){
        const minutos = Math.floor(this.duracion / 60);
        const segundos = this.duracion % 60;
        return `${minutos}:${segundos}`;
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
            console.error(error.message);
            return null;
        }
    }

}