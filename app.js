
// Lista donde se guardan los nombres de los amigos en minúsculas
let listaDeAmigos = [];

// Esta variable nos dice si ya se hizo un sorteo o no
let sorteoRealizado = false;

// Al cargar la página, dejamos el botón sortear habilitado (para que pueda mostrar alertas)
// y con estilo deshabilitado (opacidad y cursor)
document.addEventListener('DOMContentLoaded', () => {
    const botonSortear = document.getElementById('botonSortear');
    botonSortear.style.opacity = '0.5';
    botonSortear.style.cursor = 'not-allowed';

    // Evitar pegar texto inválido en el input
    const input = document.getElementById('amigo');
    input.addEventListener('paste', function (e) {
        const pasted = (e.clipboardData || window.clipboardData).getData('text');
        const regex = /^[a-zA-Z]+$/;

        if (!regex.test(pasted.trim())) {
            e.preventDefault(); // Bloquea el pegado
            alert('Solo puedes pegar nombres que contengan únicamente letras, sin espacios ni símbolos.');
            input.value = ''; // Limpia el input tras alerta
        }
    });
});

// Función que se llama cuando se quiere agregar un amigo a la lista
function agregarAmigo() {
    // Si ya se hizo el sorteo, no se pueden agregar más amigos
    if (sorteoRealizado) {
        alert('Ya se realizó el sorteo. La nueva ronda se reiniciara en breve :)');
        return;
    }

    // Obtenemos elementos del DOM
    let input = document.getElementById('amigo');                  // Input de texto
    let botonAdd = document.querySelector('.button-add');         // Botón de agregar amigo
    let botonSortear = document.getElementById('botonSortear');   // Botón de sorteo

    // Limpiamos espacios y convertimos el nombre a minúsculas
    let nombre = input.value.trim().toLowerCase();

    // Validaciones: nombre vacío, caracteres inválidos, duplicados
    if (nombre === '') {
        alert('Por favor, escribe un nombre válido.');
        input.value = ''; // Limpia el input tras alerta
        return;
    }

    if (!esNombreValido(nombre)) {
        alert('El nombre solo puede contener letras sin espacios ni números.');
        input.value = ''; // Limpia el input tras alerta
        return;
    }

    if (nombreExiste(nombre)) {
        alert('Ese nombre ya está en la lista.');
        input.value = ''; // Limpia el input tras alerta
        return;
    }

    // Si ya hay 7 nombres, mostramos alerta y deshabilitamos botón añadir e input
    if (listaDeAmigos.length >= 7) {
        alert('Has alcanzado el límite máximo de 7 amigos.');
        botonAdd.disabled = true;
        input.disabled = true;
        return;
    }

    // Agregamos el nombre a la lista
    listaDeAmigos.push(nombre);
    input.value = '';       // Limpiamos el input
    mostrarLista();         // Actualizamos visualmente la lista

    // Si alcanzamos 7 nombres, deshabilitamos input y botón agregar, habilitamos sorteo
    if (listaDeAmigos.length === 7) {
        alert('Has agregado 7 amigos. Ya no puedes añadir más.');
        input.disabled = true;
        botonAdd.disabled = true;

        botonSortear.style.opacity = '1';
        botonSortear.style.cursor = 'pointer';
    }
}

// Función que verifica si el nombre contiene solo letras
function esNombreValido(nombre) {
    for (let i = 0; i < nombre.length; i++) {
        let codigo = nombre.charCodeAt(i); // Código ASCII del carácter
        if (!((codigo >= 65 && codigo <= 90) || (codigo >= 97 && codigo <= 122))) {
            return false; // No es letra
        }
    }
    return true; // Todos los caracteres son letras
}

// Función que verifica si el nombre ya fue ingresado
function nombreExiste(nombre) {
    for (let i = 0; i < listaDeAmigos.length; i++) {
        if (listaDeAmigos[i] === nombre) {
            return true; // Ya existe
        }
    }
    return false; // No está en la lista
}

// Función para mostrar la lista de amigos en pantalla
function mostrarLista() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; // Limpiamos lista anterior

    // Recorremos cada amigo en la lista
    for (let i = 0; i < listaDeAmigos.length; i++) {
        let elemento = document.createElement('li'); // Creamos <li>
        let nombreCapitalizado = capitalizarNombre(listaDeAmigos[i]); // Capitalizamos

        elemento.textContent = nombreCapitalizado + ' ';

        // Creamos botón "X" para eliminar
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.style.marginLeft = '10px';
        botonEliminar.style.width = '45px';
        botonEliminar.style.backgroundColor = '#DC143C';

        // Función para eliminar al hacer clic en el botón
        botonEliminar.onclick = (function (indice) {
            return function () {
                eliminarAmigo(indice);
            }
        })(i);

        // Agregamos el botón al elemento <li>
        elemento.appendChild(botonEliminar);
        lista.appendChild(elemento); // Agregamos <li> a la lista
    }
}

// Función para eliminar un nombre por índice
function eliminarAmigo(indice) {
    listaDeAmigos.splice(indice, 1); // Quitamos el nombre

    // Si hay menos de 7 nombres, reactivamos input y botones
    if (listaDeAmigos.length < 7) {
        document.getElementById('amigo').disabled = false;
        document.querySelector('.button-add').disabled = false;

        let botonSortear = document.getElementById('botonSortear');
        botonSortear.style.opacity = '0.5';
        botonSortear.style.cursor = 'not-allowed';
    }

    mostrarLista(); // Actualizamos la lista
}

// Función que capitaliza el primer carácter del nombre
function capitalizarNombre(nombre) {
    if (nombre.length === 0) return '';
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

// Función para realizar el sorteo del amigo secreto
function sortearAmigo() {
    // Verificamos si hay menos de 7 nombres antes de sortear
    if (listaDeAmigos.length < 7) {
        alert(`Debes ingresar 7 nombres antes de realizar el sorteo. Actualmente has ingresado ${listaDeAmigos.length}.`);
        return;
    }

    // Si ya se hizo, no repetir
    if (sorteoRealizado) {
        alert('El sorteo ya se realizó. La nueva ronda se reiniciara en breve :)');
        return;
    }

    sorteoRealizado = true; // Marcamos sorteo como realizado

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; // Limpiamos resultados previos

    // Creamos elemento para mostrar el resultado
    let elementoResultado = document.createElement('li');
    elementoResultado.style.color = '#171717'; // Color de letras durante animación
    resultado.appendChild(elementoResultado);

    let contador = 0;
    let maxIntentos = 20; // Cuántas veces cambiará el nombre animado

    // Efecto de "ruleta" cambiando nombres rápido
    let intervalo = setInterval(function () {
        let indiceAleatorio = Math.floor(Math.random() * listaDeAmigos.length);
        let nombreTemporal = listaDeAmigos[indiceAleatorio];

        // Mostramos el nombre temporal durante animación
        elementoResultado.textContent = `🎁 Sorteando... ${capitalizarNombre(nombreTemporal)}`;
        contador++;

        if (contador >= maxIntentos) {
            clearInterval(intervalo); // Detenemos la animación

            // Elegimos el nombre final
            let indiceFinal = Math.floor(Math.random() * listaDeAmigos.length);
            let nombreFinal = listaDeAmigos[indiceFinal];

            // Mostramos el resultado
            elementoResultado.textContent = `🎉 El amigo secreto es: ${capitalizarNombre(nombreFinal)}`;

            // Esperamos 5 segundos y reiniciamos
            setTimeout(() => {
                reiniciarRonda();
            }, 5000);
        }
    }, 100); // Se ejecuta cada 100 milisegundos
}











