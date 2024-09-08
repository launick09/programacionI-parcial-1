'use strict';

/*
 * Arroyo Lautaro Alan
 */

import { Input } from './input.js';
import { Cancion } from './cancion.js';

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
     * Devuelve el disco
     * @returns {Discos}
     */
    static getDisco(){
        return this;
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
                codigo = Input.integer('código numérico único:');
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
            console.error(error.message);
        }
    }
}
