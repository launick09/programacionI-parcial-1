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
    let contenedor = document.getElementById('discos');
    const discos = Discos.getDiscos();
    let html = '';
    discos.forEach(disco => {
        let canciones = '';
        disco.canciones.forEach(cancion => {
            console.log(cancion);
            
            canciones += `<li>${cancion.nombre} - ${cancion.getDuracion()}</li>`;
        });

        html += `
            <section>
                <h3>${disco.disco} - ${disco.banda}</h3>
                <ul>
                    ${canciones}
                </ul>
            </section>
        `;
    });
    contenedor.innerHTML = html;
};

document.getElementById("btn_cargar").addEventListener("click", cargar);
document.getElementById("btn_mostrar").addEventListener("click", mostrar);