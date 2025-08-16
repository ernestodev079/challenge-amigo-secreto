
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













