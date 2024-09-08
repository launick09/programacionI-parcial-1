'use strict';

import { Discos } from './discos.js';

/*
 * Arroyo Lautaro Alan
 */

/**
 * Llamada desde un boton. Pide los datos para un disco.
 */
function cargar() {
    Discos.cargarDisco();
}   

/**
 * Llamada desde un boton. Muestra todos los discos disponibles.
 */
function mostrar() {
    // TODO
    // console.log(discos);
    console.log(Discos.getDiscos());
    
};

document.getElementById("btn_cargar").addEventListener("click", cargar);
document.getElementById("btn_mostrar").addEventListener("click", mostrar);