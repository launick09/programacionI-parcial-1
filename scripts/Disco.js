'use strict';

/*
 * Arroyo Lautaro Alan
 */

import { DataHelper } from './DataHelper.js';
import { Cancion } from './cancion.js';

/**
 * @class Disco
 * @property {string} banda - El nombre de la banda o grupo musical
 * @property {string} disco - El nombre del disco
 * @property {number} codigo - El código únco del disco
 * @property {string} portada - La URL de la imagen de la portada
 * @property {Array} canciones - Una lista de canciones del disco
 */
export class Disco {
    constructor(banda, disco, codigo, canciones, portada = null) {
        this.banda = banda;
        this.disco = disco;
        this.codigo = codigo;
        this.portada = portada;
        this.canciones = canciones;
    }

    /**
     * Devuelve un string con los datos de la banda
     * @returns {String}
     */
    mostrarInfoBanda() {
        return `
            <ul>
                <li class="item-cancion">Cantidad de pistas: ${this.getCantidadPistas()}</li>
                <li class="item-cancion">Pista más Larga: ${this.getPistaMasLarga().nombre}</li>
                <li class="item-cancion">Duración Promedio: ${this.getDuracionPromedio()}</li>
                <li class="item-cancion">Duración del Disco: ${this.getDuracionTotal()}</li>
            </ul>
        `;
    }

    /**
     * Devuelve un array con todos discos
     * @returns {Disco}
     */
    static getDiscos(){
        return this.discos;
    }

    /**
     * Devuelve la duración total de todas las canciones del disco
     * @returns {String} - en H:m:s
     */
    getDuracionTotal() {
        const duracion = this.canciones.reduce((total, cancion) => total + cancion.duracion, 0);
        return DataHelper.segundosATiempo(duracion, false);
    }

    /**
     * Devuelve la duración promedio de todas las canciones del disco
     * @returns {String} - en H:m:s
     */
    getDuracionPromedio() {
        const duracion = this.canciones.reduce((total, cancion) => total + cancion.duracion, 0) / this.canciones.length;
        return DataHelper.segundosATiempo(duracion, true);
    }

    /**
     * Devuelve la cantidad de canciones en el disco
     * @returns {Number} cantidad de pistas
     */
    getCantidadPistas() {
        return this.canciones.length;
    }

    /**
     * Devuelve la pista de mayor duyracion
     * @returns {Cancion} Pista más larga
     */
    getPistaMasLarga() {
        return this.canciones.reduce((pistaMasLarga, cancion) => {
            return (cancion.duracion > pistaMasLarga.duracion) ? cancion : pistaMasLarga;
        });
    }

    /**
     * Devuelve HTML
     * @returns {String} 
     */
    toHtml(){
        let canciones = '';
        this.canciones.forEach(cancion => {
            canciones += cancion.toHtml();
        });
        return `
            <section class="disco" id="${this.codigo}">
                <h3>${this.disco} - ${this.banda}</h3>
                <div class="disco-container">
                    <div class="portada-disco">
                        <img 
                            src="${this.portada}" 
                            onerror="this.src='https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-not-found-circle-icon-vectors-png-image_1737851.jpg'" alt="portada de ${this.disco}"
                        >
                        ${this.mostrarInfoBanda()}
                    </div>
                    <ol class="lista-canciones">
                        ${canciones}
                    </ol>
                </div>
            </section>
        `;
    }
}
