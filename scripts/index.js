'use strict';

import { Disco } from './disco.js';

/*
 * Arroyo Lautaro Alan
 */

var discos = [];
var nuevoDisco = null; // para testear

/**
 * Llamada desde un boton. Pide los datos para un disco.
 */
function cargar() {
    // TODO
    nuevoDisco = Disco.cargarDisco();
}   

/**
 * Llamada desde un boton. Muestra todos los discos disponibles.
 */
function mostrar() {
    // TODO
    console.log(nuevoDisco);
};

document.getElementById("btn_cargar").addEventListener("click", cargar);
document.getElementById("btn_mostrar").addEventListener("click", mostrar);