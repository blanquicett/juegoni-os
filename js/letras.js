// Variables globales
let nivelSopaLetras = '';
let categoriaSopaLetras = '';
let palabrasEncontradas = new Set();
let seleccionActual = [];
let tablero = [];
let puntosSopa = 0;
let palabrasCorrectasSopa = 0;

// Inicialización del juego
document.addEventListener('DOMContentLoaded', () => {
    mostrarPantallaInicial();
});

// Funciones de navegación
function mostrarPantallaInicial() {
    document.getElementById('seleccion-nivel').style.display = 'block';
    document.getElementById('seleccion-categoria').style.display = 'none';
    document.getElementById('juego-container').style.display = 'none';
}

function seleccionarNivel(nivel) {
    nivelSopaLetras = nivel;
    document.getElementById('seleccion-nivel').style.display = 'none';
    document.getElementById('seleccion-categoria').style.display = 'block';
}

function seleccionarCategoria(categoria) {
    categoriaSopaLetras = categoria;
    document.getElementById('seleccion-categoria').style.display = 'none';
    document.getElementById('juego-container').style.display = 'block';
    iniciarJuego();
}

function volverANiveles() {
    document.getElementById('seleccion-categoria').style.display = 'none';
    document.getElementById('seleccion-nivel').style.display = 'block';
}

function volverACategorias() {
    document.getElementById('juego-container').style.display = 'none';
    document.getElementById('seleccion-categoria').style.display = 'block';
    reiniciarJuego();
}

function reiniciarJuego() {
    palabrasEncontradas.clear();
    seleccionActual = [];
    puntosSopa = 0;
    palabrasCorrectasSopa = 0;
    document.getElementById('contador-puntos').textContent = '0';
    document.getElementById('palabras-correctas').textContent = '0';
}

function iniciarJuego() {
    reiniciarJuego();
    inicializarTablero();
    mostrarPalabras();
    inicializarEventos();
}

function inicializarTablero() {
    const tamano = configuracionJuegos.sopaLetras[nivelSopaLetras].tamanoTablero;
    const palabras = configuracionJuegos.sopaLetras[nivelSopaLetras].categorias[categoriaSopaLetras].palabras;
    
    // Crear tablero vacío
    tablero = Array(tamano).fill().map(() => Array(tamano).fill(''));
    
    // Colocar palabras
    palabras.forEach(palabra => colocarPalabra(palabra));
    
    // Rellenar espacios vacíos
    rellenarTablero();
    
    // Mostrar tablero
    mostrarTablero();
}

function colocarPalabra(palabra) {
    const direcciones = [
        {dx: 1, dy: 0},  // horizontal
        {dx: 0, dy: 1},  // vertical
        {dx: 1, dy: 1}   // diagonal
    ];
    
    let colocada = false;
    while (!colocada) {
        const direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
        const posicion = encontrarPosicionValida(palabra, direccion);
        
        if (posicion) {
            colocarPalabraEnPosicion(palabra, posicion, direccion);
            colocada = true;
        }
    }
}

function encontrarPosicionValida(palabra, direccion) {
    const tamano = tablero.length;
    const intentos = 100;
    
    for (let intento = 0; intento < intentos; intento++) {
        const x = Math.floor(Math.random() * tamano);
        const y = Math.floor(Math.random() * tamano);
        
        if (puedoColocarPalabra(palabra, {x, y}, direccion)) {
            return {x, y};
        }
    }
    return null;
}

function puedoColocarPalabra(palabra, pos, dir) {
    const tamano = tablero.length;
    
    if (pos.x + palabra.length * dir.dx > tamano || 
        pos.y + palabra.length * dir.dy > tamano) {
        return false;
    }
    
    for (let i = 0; i < palabra.length; i++) {
        const x = pos.x + i * dir.dx;
        const y = pos.y + i * dir.dy;
        if (tablero[y][x] !== '' && tablero[y][x] !== palabra[i]) {
            return false;
        }
    }
    
    return true;
}

function colocarPalabraEnPosicion(palabra, pos, dir) {
    for (let i = 0; i < palabra.length; i++) {
        const x = pos.x + i * dir.dx;
        const y = pos.y + i * dir.dy;
        tablero[y][x] = palabra[i];
    }
}

function rellenarTablero() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let y = 0; y < tablero.length; y++) {
        for (let x = 0; x < tablero.length; x++) {
            if (tablero[y][x] === '') {
                tablero[y][x] = letras[Math.floor(Math.random() * letras.length)];
            }
        }
    }
}

function mostrarTablero() {
    const tableroElement = document.getElementById('tablero-sopa');
    tableroElement.innerHTML = '';
    tableroElement.style.gridTemplateColumns = `repeat(${tablero.length}, 1fr)`;

    const tamanoBase = nivelSopaLetras === 'facil' ? 40 : 30;
    tableroElement.style.maxWidth = `${tamanoBase * tablero.length}px`;
    
    for (let y = 0; y < tablero.length; y++) {
        for (let x = 0; x < tablero.length; x++) {
            const celda = document.createElement('div');
            celda.className = 'letra-celda';
            celda.textContent = tablero[y][x];
            celda.dataset.x = x;
            celda.dataset.y = y;
            celda.style.width = `${tamanoBase}px`;
            celda.style.height = `${tamanoBase}px`;
            celda.style.fontSize = `${tamanoBase * 0.6}px`;
            tableroElement.appendChild(celda);
        }
    }
}

function mostrarPalabras() {
    const listaPalabras = document.getElementById('lista-palabras');
    listaPalabras.innerHTML = '';
    
    const palabras = configuracionJuegos.sopaLetras[nivelSopaLetras].categorias[categoriaSopaLetras].palabras;
    palabras.forEach((palabra, index) => {
        const palabraElement = document.createElement('div');
        palabraElement.className = 'palabra-item';
        palabraElement.textContent = `${index + 1}. ${palabra}`;
        if (palabrasEncontradas.has(palabra)) {
            palabraElement.classList.add('encontrada');
        }
        listaPalabras.appendChild(palabraElement);
    });
}

function inicializarEventos() {
    const tableroElement = document.getElementById('tablero-sopa');
    let primeraSeleccion = null;
    
    tableroElement.addEventListener('click', (e) => {
        if (!e.target.classList.contains('letra-celda')) return;
        
        const celda = e.target;
        
        if (!primeraSeleccion) {
            primeraSeleccion = celda;
            celda.classList.add('seleccionada');
            return;
        }
        
        const x1 = parseInt(primeraSeleccion.dataset.x);
        const y1 = parseInt(primeraSeleccion.dataset.y);
        const x2 = parseInt(celda.dataset.x);
        const y2 = parseInt(celda.dataset.y);
        
        if (esLineaValida(x1, y1, x2, y2)) {
            const celdas = obtenerCeldasEnLinea(x1, y1, x2, y2);
            seleccionActual = celdas;
            
            celdas.forEach(c => c.classList.add('seleccionada'));
            
            setTimeout(() => verificarSeleccion(), 200);
        }
        
        primeraSeleccion.classList.remove('seleccionada');
        primeraSeleccion = null;
    });
}

function esLineaValida(x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    return (dx === 0 || dy === 0 || dx === dy);
}

function obtenerCeldasEnLinea(x1, y1, x2, y2) {
    const celdas = [];
    const dx = Math.sign(x2 - x1);
    const dy = Math.sign(y2 - y1);
    const pasos = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    
    for (let i = 0; i <= pasos; i++) {
        const x = x1 + (dx * i);
        const y = y1 + (dy * i);
        const celda = document.querySelector(`.letra-celda[data-x="${x}"][data-y="${y}"]`);
        if (celda) celdas.push(celda);
    }
    
    return celdas;
}

function verificarSeleccion() {
    const palabra = seleccionActual.map(celda => celda.textContent).join('');
    const palabrasDisponibles = configuracionJuegos.sopaLetras[nivelSopaLetras].categorias[categoriaSopaLetras].palabras;
    
    if (palabrasDisponibles.includes(palabra) && !palabrasEncontradas.has(palabra)) {
        // Si la palabra es correcta y no ha sido encontrada antes
        sonidos.acierto.play();
        palabrasEncontradas.add(palabra);
        seleccionActual.forEach(celda => {
            celda.classList.remove('seleccionada');
            celda.classList.add('encontrada');
        });
        
        actualizarPuntuacion();
        mostrarPalabras();
        verificarVictoria();
    } else if (seleccionActual.length > 0) {
        // Solo reproducir el sonido de error si hay una selección activa
        sonidos.error.play();
        seleccionActual.forEach(celda => celda.classList.remove('seleccionada'));
    }
    
    seleccionActual = [];
}

function actualizarPuntuacion() {
    puntosSopa += 10;
    palabrasCorrectasSopa++;
    document.getElementById('contador-puntos').textContent = puntosSopa;
    document.getElementById('palabras-correctas').textContent = palabrasCorrectasSopa;
}

function verificarVictoria() {
    const totalPalabras = configuracionJuegos.sopaLetras[nivelSopaLetras].categorias[categoriaSopaLetras].palabras.length;
    if (palabrasEncontradas.size === totalPalabras) {
        setTimeout(() => {
            const mensaje = confirm('¡Felicitaciones! Has encontrado todas las palabras. ¿Quieres jugar otra categoría?');
            if (mensaje) {
                volverACategorias();
            } else {
                volverANiveles();
            }
        }, 500);
    }
}

// Agregar sonidos
const sonidos = {
    acierto: new Audio('sonidos/acierto.mp3'),
    error: new Audio('sonidos/perdedor.mp3')
};
