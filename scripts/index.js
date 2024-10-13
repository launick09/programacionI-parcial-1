'use strict';
import { Discografia } from './Discografia.js';

/*
 * Arroyo Lautaro Alan
 */


let discografia = new Discografia;

/**
 * Llamada desde un boton. Pide los datos para un disco.
 */

function cargar() {
    discografia.cargarDisco();
}   

/**
 * Llamada desde un boton. Muestra todos los discos disponibles.
 */
function mostrar() {
    let contenedor = document.getElementById('discos');
    let html = discografia.toHtml();
    contenedor.innerHTML = html;
};

function cargarJson() {
    console.log('cargando predeterminadas..');
    // fetch('/discos.json')
    fetch('https://launick09.github.io/programacionI-parcial-1/discos.json')
    .then(respuesta => respuesta.json() )
    .then(respuesta => {
        discografia.crearDeJson(respuesta);
        console.log('carga finalizada.')
    })
    .catch( error => {
        console.error('Error al cargar Predeterminadas');
        console.error(error);
    });
}
// tiene que estar esto? no - respuesta 12-09 
window.addEventListener('load', cargarJson);
document.getElementById("btn_cargar").addEventListener("click", cargar);
document.getElementById("btn_mostrar").addEventListener("click", mostrar);