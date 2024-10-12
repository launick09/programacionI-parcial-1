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
export class Discos {

    static discos = [];

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
     * @returns {Discos}
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
        return DataHelper.segundosATiempo(duracion, true);
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
     * Crea un disco
     * @returns {Discos|null}
     */
    static cargarDisco() {
        try {     
            let banda = DataHelper.string('Ingrese el Nombre de la Banda/Grupo:');
            let disco = DataHelper.string('Ingrese el Nombre del Disco:');
            let portada = DataHelper.string('URL de la imagen de la portada:');
            let codigo = null;
            let codigoRepetido = false;
            do{
                codigo = DataHelper.integer('código numérico único:', 1, 999);
                codigoRepetido = this.discos.some(disco => disco.codigo === codigo);
                if( codigoRepetido ){
                    alert(`El codigo numérico ${codigo} ya existe, ingrese otro.`);
                }
            }while( codigoRepetido );
            
            let canciones = [];
            let continuar = true;
            while (continuar) {
                let cancion = Cancion.crearCancion();
                if(cancion){
                    canciones.push(cancion);
                    continuar = confirm("Ingresar otra cancion?");
                }else{
                    break;
                }
            }

            if(canciones.length < 1){
                throw new Error('el disco no contiene canciones!'); 
            }
            
            let nuevoDisco = new Discos(banda, disco, codigo, canciones, portada);
            this.discos.push(nuevoDisco);
            return nuevoDisco;
        } catch (error) {
            console.warn(error.message);
            return null;
        }
    }

    /**
     * crea los discos de un Json
     * @param {json} discosArray 
     */

    static crearDeJson(discosArray){
        try {
            discosArray.forEach(discoData => {
                const { nombre: disco, artista: banda, id: codigo, portada, pistas } = discoData;
                let canciones = pistas.map(pista => new Cancion(pista.nombre, pista.duracion));
                let nuevoDisco = new Discos(banda, disco, codigo, canciones, portada);
                this.discos.push(nuevoDisco);
            });
        } catch (error) {
            console.warn("Error al crear discos desde JSON:", error);
        }
    }
}
