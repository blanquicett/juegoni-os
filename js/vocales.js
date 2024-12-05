// Variables globales
let nivelActual = '';
let categoriaActual = '';
let palabraActual = null;
let palabrasUsadas = [];
let puntos = 0;
let palabrasCorrectas = 0;

// Sonidos - Una sola declaración al inicio
const sonidos = {
    acierto: new Audio('sonidos/acierto.mp3'),
    error: new Audio('sonidos/perdedor.mp3')
};

// Precargar los sonidos
window.addEventListener('load', () => {
    sonidos.acierto.load();
    sonidos.error.load();
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    mostrarPantallaInicial();
});

// Funciones de navegación
function mostrarPantallaInicial() {
    document.getElementById('seleccion-nivel').style.display = 'block';
    document.getElementById('seleccion-categoria').style.display = 'none';
    document.getElementById('juego-container').style.display = 'none';
    document.getElementById('modal-victoria').style.display = 'none';
}

function seleccionarNivel(nivel) {
    nivelActual = nivel;
    document.getElementById('seleccion-nivel').style.display = 'none';
    document.getElementById('seleccion-categoria').style.display = 'block';
}

function seleccionarCategoria(categoria) {
    categoriaActual = categoria;
    document.getElementById('seleccion-categoria').style.display = 'none';
    document.getElementById('juego-container').style.display = 'block';
    iniciarJuego();
}

function volverANiveles() {
    document.getElementById('seleccion-categoria').style.display = 'none';
    document.getElementById('seleccion-nivel').style.display = 'block';
    reiniciarJuego();
}

function volverACategorias() {
    document.getElementById('juego-container').style.display = 'none';
    document.getElementById('seleccion-categoria').style.display = 'block';
    reiniciarJuego();
}

// Funciones del juego
function iniciarJuego() {
    reiniciarJuego();
    siguientePalabra();
    inicializarEventos();
}

function reiniciarJuego() {
    palabrasUsadas = [];
    puntos = 0;
    palabrasCorrectas = 0;
    document.getElementById('contador-puntos').textContent = '0';
    document.getElementById('palabras-correctas').textContent = '0';
}

function siguientePalabra() {
    const palabraObj = obtenerPalabraAleatoria();
    if (palabraObj) {
        palabraActual = palabraObj;
        mostrarPalabra(palabraObj);
    }
}

function obtenerPalabraAleatoria() {
    // Usar la configuración correcta según nivel y categoría
    const palabrasDisponibles = configuracionJuegos.vocales[nivelActual].categorias[categoriaActual].palabras
        .filter(p => !palabrasUsadas.includes(p.palabra));
    
    if (palabrasDisponibles.length === 0) {
        mostrarVictoria();
        return null;
    }
    
    const indice = Math.floor(Math.random() * palabrasDisponibles.length);
    return palabrasDisponibles[indice];
}

function mostrarPalabra(palabraObj) {
    // Mostrar imagen
    document.getElementById('palabra-imagen').src = palabraObj.imagen;
    
    // Crear contenedor de letras
    const contenedor = document.getElementById('palabra-container');
    contenedor.innerHTML = '';
    
    // Mostrar cada letra
    palabraObj.palabra.split('').forEach(letra => {
        const espacioLetra = document.createElement('div');
        espacioLetra.className = 'letra-espacio';
        if (esVocal(letra)) {
            espacioLetra.classList.add('vocal');
            espacioLetra.dataset.vocal = letra;
        } else {
            espacioLetra.textContent = letra;
        }
        contenedor.appendChild(espacioLetra);
    });
}

function esVocal(letra) {
    return 'AEIOU'.includes(letra);
}

function inicializarEventos() {
    document.querySelectorAll('.vocal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            manejarClickVocal(e.target.dataset.vocal);
        });
    });
}

function manejarClickVocal(vocal) {
    const espaciosVacios = Array.from(document.querySelectorAll('.letra-espacio.vocal:not(.correcto)'));
    const espacioCorrecto = espaciosVacios.find(espacio => espacio.dataset.vocal === vocal);
    
    if (espacioCorrecto) {
        // Si la vocal es correcta
        espacioCorrecto.textContent = vocal;
        espacioCorrecto.classList.add('correcto');
        sonidos.acierto.play();
        
        if (verificarPalabraCompleta()) {
            actualizarPuntuacion();
            palabrasUsadas.push(palabraActual.palabra);
            setTimeout(siguientePalabra, 1000);
        }
    } else if (espaciosVacios.length > 0) {
        // Solo reproducir el sonido de error si hay espacios vacíos y la vocal es incorrecta
        sonidos.error.play();
        const vocalBtn = document.querySelector(`.vocal-btn[data-vocal="${vocal}"]`);
        vocalBtn.classList.add('shake');
        setTimeout(() => vocalBtn.classList.remove('shake'), 500);
    }
}

function verificarPalabraCompleta() {
    return !document.querySelector('.letra-espacio.vocal:not(.correcto)');
}

function actualizarPuntuacion() {
    puntos += 10;
    palabrasCorrectas++;
    document.getElementById('contador-puntos').textContent = puntos;
    document.getElementById('palabras-correctas').textContent = palabrasCorrectas;
}

function mostrarVictoria() {
    document.getElementById('modal-victoria').style.display = 'flex';
}

function siguienteCategoria() {
    document.getElementById('modal-victoria').style.display = 'none';
    volverACategorias();
}

function verificarVictoria() {
    const totalPalabras = configuracionJuegos.vocales[nivelActual].categorias[categoriaActual].palabras.length;
    if (palabrasUsadas.length === totalPalabras) {
        mostrarVictoria();
    }
}