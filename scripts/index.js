'use strict';
import { Discografia } from './Discografia.js';

/*
 * Arroyo Lautaro Alan
 */

const buscador = document.getElementById('codigo_buscar');
let contenedor = document.getElementById('discos');
let datos = document.getElementById('datos');
let discografia = new Discografia;

/**
 * Llamada desde un boton. Pide los datos para un disco.
 */

function cargar() {
    discografia.cargarDisco();
    mostrarDatos();
}   

/**
 * Llamada desde un boton. Muestra todos los discos disponibles.
 */
function mostrar() {
    contenedor.innerHTML = discografia.toHtml();
};

function mostrarDatos() {
    datos.innerHTML = discografia.mostrarInfo();
}

/**
 * Busca un codigo en la lista de discos y lo muestra
 */
function buscar(event) {
    event.preventDefault();
    if(!buscador.value){
        mostrar();
        return false;
    }
        
    let disco = discografia.buscarDiscosPorCodigo( parseInt(buscador.value, 10) );
    if(disco){
        contenedor.innerHTML = disco.toHtml();
    }else{
        contenedor.innerHTML = '<p>No se Encontraron Resultados :(</p>';
    }
}

function cargarJson() {
    console.log('cargando predeterminadas..');
    // fetch('/discos.json')
    fetch('https://launick09.github.io/programacionI-parcial-1/discos.json')
    .then(respuesta => respuesta.json() )
    .then(respuesta => {
        discografia.crearDeJson(respuesta);
        console.log('carga finalizada.')
    })
    .then( mostrarDatos )
    .catch( error => {
        console.error('Error al cargar Predeterminadas');
        console.error(error);
    });
}

document.getElementById("buscador").addEventListener("submit", buscar);
document.getElementById("btn_json").addEventListener("click", cargarJson);
document.getElementById("btn_cargar").addEventListener("click", cargar);
document.getElementById("btn_mostrar").addEventListener("click", mostrar);