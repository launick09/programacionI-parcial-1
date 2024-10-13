'use strict';

/*
 * Arroyo Lautaro Alan
 */

import { DataHelper } from './DataHelper.js';
import { Cancion } from './cancion.js';
import { Disco } from './Disco.js';

export class Discografia {
    constructor() {
        this.discos = []; // Inicializa un array vacío para almacenar los discos
    }

    /**
     * Agrega un nuevo disco a la discografía
     * @param {Disco} disco - El disco a agregar
     */
    agregarDisco(disco) {
        this.discos.push(disco);
    }

    /**
     * Encuentra el disco más largo basado en la duración total de sus canciones
     * @returns {Disco|null} - El disco más largo o null si no hay discos
     */
    obtenerDiscoMasLargo() {
        if (this.discos.length === 0) {
            return null; // Si no hay discos, retorna null
        }

        return this.discos.reduce((discoMasLargo, disco) => {
            const duracionDiscoActual = disco.canciones.reduce((total, cancion) => total + cancion.duracion, 0);
            const duracionDiscoMasLargo = discoMasLargo.canciones.reduce((total, cancion) => total + cancion.duracion, 0);
            return duracionDiscoActual > duracionDiscoMasLargo ? disco : discoMasLargo;
        });
    }

    /**
     * Busca discos por el codigo
     * @param {integer} codigo - El nombre de la banda a buscar
     * @returns {Disco|null} - El disco encontrado o null si no lo encuentra
     */
    buscarDiscosPorCodigo(codigo) {  
        const disco = this.discos.find(disco => disco.codigo === codigo);
        return disco ? disco : null;
    }

    toHtml(){
        let html = '';        
        this.discos.forEach(disco => {
            html += disco.toHtml();
        });
        return html;
    }

    /**
     * Crea un disco
     * @returns {Disco|null}
     */
    cargarDisco() {
        try {     
            let codigo = null;
            let codigoRepetido = false;

            let banda = DataHelper.string('Ingrese el Nombre de la Banda/Grupo:');
            let disco = DataHelper.string('Ingrese el Nombre del Disco:');
            let portada = DataHelper.string('URL de la imagen de la portada:');
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
            
            let nuevoDisco = new Disco(banda, disco, codigo, canciones, portada);
            this.agregarDisco(nuevoDisco);
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

    crearDeJson(discosArray){
        try {   
            discosArray.forEach(discoData => {
                const { nombre: disco, artista: banda, id: codigo, portada, pistas } = discoData;
                let canciones = pistas.map(pista => new Cancion(pista.nombre, pista.duracion));
                let nuevoDisco = new Disco(banda, disco, codigo, canciones, portada);
                this.agregarDisco(nuevoDisco);
            });
        } catch (error) {
            console.warn("Error al crear discos desde JSON:", error);
        }
    }
}