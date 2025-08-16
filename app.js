
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




