'use strict';

/*
 * Arroyo Lautaro Alan
 */

import { Input } from './input.js';
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
        return `Banda: ${this.banda}, Disco: ${this.disco}, Código Unico: ${this.codigo}`;
    }

    /**
     * Devuelve un array con todos discos
     * @returns {Discos}
     */
    static getDiscos(){
        return this.discos;
    }

    /**
     * Crea un disco
     * @returns {Discos|null}
     */
    static cargarDisco() {
        try {     
            let banda = Input.string('Ingrese el Nombre de la Banda/Grupo:');
            let disco = Input.string('Ingrese el Nombre del Disco:');
            let portada = Input.string('URL de la imagen de la portada:');
            let codigo = null;
            let codigoRepetido = false;
            do{
                codigo = Input.integer('código numérico único:', 1, 999);
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
                }
                continuar = confirm("Ingresar otra cancion?");
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
