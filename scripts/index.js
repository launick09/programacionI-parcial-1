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
    let discos = Discos.getDiscos();
    
    let html = '';
    discos.forEach(disco => {
        let canciones = '';
        disco.canciones.forEach(cancion => {
            canciones += `
                <li class="item-cancion">
                    ${cancion.nombre} - 
                    <strong ${ cancion.duracion >= 180 ? 'class="duracion-larga"' : '' } > 
                        ${cancion.getDuracion()} 
                    </strong>
                </li>
            `;
        });

        html += `
            <section class="disco" id="${disco.codigo}">
                <h3>${disco.disco} - ${disco.banda}</h3>
                <div class="disco-container">
                    <div class="portada-disco">
                        <img 
                            src="${disco.portada}" 
                            onerror="this.src='https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-not-found-circle-icon-vectors-png-image_1737851.jpg'" alt="portada de ${disco.disco}"
                        >
                    </div>
                    <ul class="lista-canciones">
                        ${canciones}
                    </ul>
                </div>
            </section>
        `;
    });
    contenedor.innerHTML = html;
};

function cargarJson() {
    console.log('cargando predeterminadas..');
    // fetch('/discos.json')
    fetch('https://launick09.github.io/programacionI-parcial-1/discos.json')
    .then(respuesta => respuesta.json() )
    .then(respuesta => {
        Discos.crearDeJson(respuesta);
        console.log('carga finalizada.')
    })
    .catch( error => {
        console.error('Error al cargar Predeterminadas');
        console.error(error);
    });
}
//tiene que estar esto?
window.addEventListener('load', cargarJson);
document.getElementById("btn_cargar").addEventListener("click", cargar);
document.getElementById("btn_mostrar").addEventListener("click", mostrar);