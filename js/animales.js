// Configuración del juego
const configuracionJuego = {
    facil: {
        filas: 4,
        columnas: 4,
        parejas: [
            { id: 1, nombre: 'CAT', imagen: 'imagenes/cat.png' },
            { id: 2, nombre: 'DOG', imagen: 'imagenes/dog.png' },
            { id: 3, nombre: 'BIRD', imagen: 'imagenes/bird.png' },
            { id: 4, nombre: 'FISH', imagen: 'imagenes/fish.png' },
            { id: 5, nombre: 'DUCK', imagen: 'imagenes/duck.png' },
            { id: 6, nombre: 'FROG', imagen: 'imagenes/frog.png' },
            { id: 7, nombre: 'LION', imagen: 'imagenes/lion.png' },
            { id: 8, nombre: 'BEAR', imagen: 'imagenes/bear.png' }
        ]
    },
    intermedio: {
        filas: 6,
        columnas: 6,
        parejas: [
            { id: 1, nombre: 'TIGER', imagen: 'imagenes/tiger.png' },
            { id: 2, nombre: 'MONKEY', imagen: 'imagenes/monkey.png' },
            { id: 3, nombre: 'RABBIT', imagen: 'imagenes/rabbit.png' },
            { id: 4, nombre: 'PANDA', imagen: 'imagenes/panda.png' },
            { id: 5, nombre: 'ZEBRA', imagen: 'imagenes/zebra.png' },
            { id: 6, nombre: 'GIRAFFE', imagen: 'imagenes/giraffe.png' },
            { id: 7, nombre: 'ELEPHANT', imagen: 'imagenes/elephant.png' },
            { id: 8, nombre: 'PENGUIN', imagen: 'imagenes/penguin.png' },
            { id: 9, nombre: 'KOALA', imagen: 'imagenes/koala.png' },
            { id: 10, nombre: 'HIPPO', imagen: 'imagenes/hippo.png' },
            { id: 11, nombre: 'SNAKE', imagen: 'imagenes/snake.png' },
            { id: 12, nombre: 'TURTLE', imagen: 'imagenes/turtle.png' }
        ]
    }
};

// Variables globales
let nivelActual = '';
let cartasVolteadas = [];
let parejasEncontradas = 0;
let movimientos = 0;
let puntos = 0;
let bloqueado = false;
let juegoIniciado = false;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('juego-principal').style.display = 'none';
    document.getElementById('modal-victoria').style.display = 'none';
    document.getElementById('seleccion-nivel').style.display = 'block';
});

function iniciarJuego(nivel) {
    nivelActual = nivel;
    juegoIniciado = true;
    parejasEncontradas = 0;
    movimientos = 0;
    puntos = 0;
    cartasVolteadas = [];
    bloqueado = false;

    actualizarContadores();
    
    document.getElementById('seleccion-nivel').style.display = 'none';
    document.getElementById('juego-principal').style.display = 'block';
    document.getElementById('modal-victoria').style.display = 'none';

    const tablero = document.getElementById('tablero');
    tablero.className = `tablero ${nivel}`;
    
    crearTablero();
}

function crearTablero() {
    const config = configuracionJuego[nivelActual];
    const tablero = document.getElementById('tablero');
    tablero.innerHTML = '';

    // Crear array de cartas duplicado y mezclado
    const cartas = [...config.parejas, ...config.parejas]
        .sort(() => Math.random() - 0.5);

    cartas.forEach((carta, index) => {
        const elementoCarta = crearCarta(carta, index);
        tablero.appendChild(elementoCarta);
    });
}

function crearCarta(carta, index) {
    const contenedor = document.createElement('div');
    contenedor.className = 'carta';
    contenedor.dataset.id = carta.id;
    contenedor.dataset.index = index;

    const frente = document.createElement('div');
    frente.className = 'carta-frente';
    
    const imagen = document.createElement('img');
    imagen.src = carta.imagen;
    imagen.alt = carta.nombre;
    
    const texto = document.createElement('div');
    texto.className = 'texto';
    texto.textContent = carta.nombre;

    const dorso = document.createElement('div');
    dorso.className = 'carta-dorso';
    dorso.textContent = '?';

    frente.appendChild(imagen);
    frente.appendChild(texto);
    contenedor.appendChild(frente);
    contenedor.appendChild(dorso);

    contenedor.addEventListener('click', () => voltearCarta(contenedor));

    return contenedor;
}

function voltearCarta(carta) {
    if (bloqueado || carta.classList.contains('volteada') || 
        carta.classList.contains('encontrada')) {
        return;
    }

    carta.classList.add('volteada');
    cartasVolteadas.push(carta);

    if (cartasVolteadas.length === 2) {
        movimientos++;
        actualizarContadores();
        verificarPareja();
    }
}

function verificarPareja() {
    bloqueado = true;
    const [carta1, carta2] = cartasVolteadas;

    if (carta1.dataset.id === carta2.dataset.id) {
        // Pareja encontrada
        document.getElementById('sonido-correcto').play();
        carta1.classList.add('encontrada', 'acierto');
        carta2.classList.add('encontrada', 'acierto');
        parejasEncontradas++;
        puntos += 10;
        actualizarContadores();
        
        setTimeout(() => {
            carta1.classList.remove('acierto');
            carta2.classList.remove('acierto');
            verificarVictoria();
        }, 1000);
    } else {
        // No es pareja
        document.getElementById('sonido-incorrecto').play();
        carta1.classList.add('error');
        carta2.classList.add('error');
        
        setTimeout(() => {
            carta1.classList.remove('volteada', 'error');
            carta2.classList.remove('volteada', 'error');
        }, 1000);
    }

    cartasVolteadas = [];
    setTimeout(() => {
        bloqueado = false;
    }, 1000);
}

function verificarVictoria() {
    const totalParejas = configuracionJuego[nivelActual].parejas.length;
    if (parejasEncontradas === totalParejas) {
        document.getElementById('sonido-victoria').play();
        document.getElementById('total-movimientos').textContent = movimientos;
        document.getElementById('total-puntos').textContent = puntos;
        document.getElementById('modal-victoria').style.display = 'flex';
    }
}

function actualizarContadores() {
    document.getElementById('contador-puntos').textContent = puntos;
    document.getElementById('contador-movimientos').textContent = movimientos;
    document.getElementById('parejas-encontradas').textContent = parejasEncontradas;
}

function seleccionarNivel(nivel) {
    iniciarJuego(nivel);
}

function volverANiveles() {
    juegoIniciado = false;
    document.getElementById('juego-principal').style.display = 'none';
    document.getElementById('modal-victoria').style.display = 'none';
    document.getElementById('seleccion-nivel').style.display = 'block';
}

function siguienteNivel() {
    if (nivelActual === 'facil') {
        iniciarJuego('intermedio');
    } else {
        volverANiveles();
    }
    document.getElementById('modal-victoria').style.display = 'none';
}