// Configuración de cartas por categoría
const configuracionCartas = {
    animales: {
        facil: [
            { id: 1, nombre: 'LION', imagen: 'imagenes/memoria/animales/leon.png', audio: 'sonidos/lion.mp3' },
            { id: 2, nombre: 'DOG', imagen: 'imagenes/memoria/animales/perro.png', audio: 'sonidos/dog.mp3' },
            { id: 3, nombre: 'CAT', imagen: 'imagenes/memoria/animales/gato.png', audio: 'sonidos/cat.mp3' },
            { id: 4, nombre: 'BIRD', imagen: 'imagenes/memoria/animales/pajaro.png', audio: 'sonidos/bird.mp3' },
            { id: 5, nombre: 'FISH', imagen: 'imagenes/memoria/animales/pez.png', audio: 'sonidos/fish.mp3' }
        ],
        intermedio: [
            // Incluye los de fácil más...
            { id: 6, nombre: 'ELEPHANT', imagen: 'imagenes/memoria/animales/elefante.png', audio: 'sonidos/elephant.mp3' },
            { id: 7, nombre: 'GIRAFFE', imagen: 'imagenes/memoria/animales/jirafa.png', audio: 'sonidos/giraffe.mp3' },
            { id: 8, nombre: 'MONKEY', imagen: 'imagenes/memoria/animales/mono.png', audio: 'sonidos/monkey.mp3' },
            { id: 9, nombre: 'PENGUIN', imagen: 'imagenes/memoria/animales/pinguino.png', audio: 'sonidos/penguin.mp3' },
            { id: 10, nombre: 'TURTLE', imagen: 'imagenes/memoria/animales/tortuga.png', audio: 'sonidos/turtle.mp3' }
        ]
    },
    colores: {
        facil: [
            { id: 1, nombre: 'RED', imagen: 'imagenes/memoria/colores/rojo.png', audio: 'sonidos/red.mp3' },
            { id: 2, nombre: 'BLUE', imagen: 'imagenes/memoria/colores/azul.png', audio: 'sonidos/blue.mp3' },
            { id: 3, nombre: 'GREEN', imagen: 'imagenes/memoria/colores/verde.png', audio: 'sonidos/green.mp3' },
            { id: 4, nombre: 'YELLOW', imagen: 'imagenes/memoria/colores/amarillo.png', audio: 'sonidos/yellow.mp3' },
            { id: 5, nombre: 'PINK', imagen: 'imagenes/memoria/colores/rosa.png', audio: 'sonidos/pink.mp3' }
        ],
        intermedio: [
            // Incluye los de fácil más...
            { id: 6, nombre: 'PURPLE', imagen: 'imagenes/memoria/colores/morado.png', audio: 'sonidos/purple.mp3' },
            { id: 7, nombre: 'ORANGE', imagen: 'imagenes/memoria/colores/naranja.png', audio: 'sonidos/orange.mp3' },
            { id: 8, nombre: 'BROWN', imagen: 'imagenes/memoria/colores/marron.png', audio: 'sonidos/brown.mp3' },
            { id: 9, nombre: 'GRAY', imagen: 'imagenes/memoria/colores/gris.png', audio: 'sonidos/gray.mp3' },
            { id: 10, nombre: 'BLACK', imagen: 'imagenes/memoria/colores/negro.png', audio: 'sonidos/black.mp3' }
        ]
    },
    numeros: {
        facil: [
            { id: 1, nombre: 'ONE', imagen: 'imagenes/memoria/numeros/uno.png', audio: 'sonidos/one.mp3' },
            { id: 2, nombre: 'TWO', imagen: 'imagenes/memoria/numeros/dos.png', audio: 'sonidos/two.mp3' },
            { id: 3, nombre: 'THREE', imagen: 'imagenes/memoria/numeros/tres.png', audio: 'sonidos/three.mp3' },
            { id: 4, nombre: 'FOUR', imagen: 'imagenes/memoria/numeros/cuatro.png', audio: 'sonidos/four.mp3' },
            { id: 5, nombre: 'FIVE', imagen: 'imagenes/memoria/numeros/cinco.png', audio: 'sonidos/five.mp3' }
        ],
        intermedio: [
            { id: 6, nombre: 'SIX', imagen: 'imagenes/memoria/numeros/seis.png', audio: 'sonidos/six.mp3' },
            { id: 7, nombre: 'SEVEN', imagen: 'imagenes/memoria/numeros/siete.png', audio: 'sonidos/seven.mp3' },
            { id: 8, nombre: 'EIGHT', imagen: 'imagenes/memoria/numeros/ocho.png', audio: 'sonidos/eight.mp3' },
            { id: 9, nombre: 'NINE', imagen: 'imagenes/memoria/numeros/nueve.png', audio: 'sonidos/nine.mp3' },
            { id: 10, nombre: 'TEN', imagen: 'imagenes/memoria/numeros/diez.png', audio: 'sonidos/ten.mp3' }
        ]
    },
    profesiones: {
        facil: [
            { id: 1, nombre: 'DOCTOR', imagen: 'imagenes/memoria/profesiones/doctor.png', audio: 'sonidos/doctor.mp3' },
            { id: 2, nombre: 'TEACHER', imagen: 'imagenes/memoria/profesiones/profesor.png', audio: 'sonidos/teacher.mp3' },
            { id: 3, nombre: 'CHEF', imagen: 'imagenes/memoria/profesiones/chef.png', audio: 'sonidos/chef.mp3' },
            { id: 4, nombre: 'POLICE', imagen: 'imagenes/memoria/profesiones/policia.png', audio: 'sonidos/police.mp3' },
            { id: 5, nombre: 'FIREFIGHTER', imagen: 'imagenes/memoria/profesiones/bombero.png', audio: 'sonidos/firefighter.mp3' }
        ],
        intermedio: [
            { id: 6, nombre: 'MECHANIC', imagen: 'imagenes/memoria/profesiones/mecanico.png', audio: 'sonidos/mechanic.mp3' },
            { id: 7, nombre: 'NURSE', imagen: 'imagenes/memoria/profesiones/enfermera.png', audio: 'sonidos/nurse.mp3' },
            { id: 8, nombre: 'ARTIST', imagen: 'imagenes/memoria/profesiones/artista.png', audio: 'sonidos/artist.mp3' },
            { id: 9, nombre: 'PILOT', imagen: 'imagenes/memoria/profesiones/piloto.png', audio: 'sonidos/pilot.mp3' },
            { id: 10, nombre: 'FARMER', imagen: 'imagenes/memoria/profesiones/granjero.png', audio: 'sonidos/farmer.mp3' }
        ]
    },
    frutas: {
        facil: [
            { id: 1, nombre: 'APPLE', imagen: 'imagenes/memoria/frutas/manzana.png', audio: 'sonidos/apple.mp3' },
            { id: 2, nombre: 'BANANA', imagen: 'imagenes/memoria/frutas/platano.png', audio: 'sonidos/banana.mp3' },
            { id: 3, nombre: 'ORANGE', imagen: 'imagenes/memoria/frutas/naranja.png', audio: 'sonidos/orange.mp3' },
            { id: 4, nombre: 'GRAPE', imagen: 'imagenes/memoria/frutas/uva.png', audio: 'sonidos/grape.mp3' },
            { id: 5, nombre: 'PEAR', imagen: 'imagenes/memoria/frutas/pera.png', audio: 'sonidos/pear.mp3' }
        ],
        intermedio: [
            { id: 6, nombre: 'STRAWBERRY', imagen: 'imagenes/memoria/frutas/fresa.png', audio: 'sonidos/strawberry.mp3' },
            { id: 7, nombre: 'PINEAPPLE', imagen: 'imagenes/memoria/frutas/piña.png', audio: 'sonidos/pineapple.mp3' },
            { id: 8, nombre: 'WATERMELON', imagen: 'imagenes/memoria/frutas/sandia.png', audio: 'sonidos/watermelon.mp3' },
            { id: 9, nombre: 'MANGO', imagen: 'imagenes/memoria/frutas/mango.png', audio: 'sonidos/mango.mp3' },
            { id: 10, nombre: 'CHERRY', imagen: 'imagenes/memoria/frutas/cereza.png', audio: 'sonidos/cherry.mp3' }
        ]
    },
    transportes: {
        facil: [
            { id: 1, nombre: 'CAR', imagen: 'imagenes/memoria/transportes/carro.png', audio: 'sonidos/car.mp3' },
            { id: 2, nombre: 'BUS', imagen: 'imagenes/memoria/transportes/autobus.png', audio: 'sonidos/bus.mp3' },
            { id: 3, nombre: 'PLANE', imagen: 'imagenes/memoria/transportes/avion.png', audio: 'sonidos/plane.mp3' },
            { id: 4, nombre: 'TRAIN', imagen: 'imagenes/memoria/transportes/tren.png', audio: 'sonidos/train.mp3' },
            { id: 5, nombre: 'BIKE', imagen: 'imagenes/memoria/transportes/bicicleta.png', audio: 'sonidos/bike.mp3' }
        ],
        intermedio: [
            { id: 6, nombre: 'SHIP', imagen: 'imagenes/memoria/transportes/barco.png', audio: 'sonidos/ship.mp3' },
            { id: 7, nombre: 'HELICOPTER', imagen: 'imagenes/memoria/transportes/helicoptero.png', audio: 'sonidos/helicopter.mp3' },
            { id: 8, nombre: 'MOTORCYCLE', imagen: 'imagenes/memoria/transportes/moto.png', audio: 'sonidos/motorcycle.mp3' },
            { id: 9, nombre: 'TAXI', imagen: 'imagenes/memoria/transportes/taxi.png', audio: 'sonidos/taxi.mp3' },
            { id: 10, nombre: 'SUBWAY', imagen: 'imagenes/memoria/transportes/metro.png', audio: 'sonidos/subway.mp3' }
        ]
    }
};

// Variables globales
let nivelActual = '';
let categoriaActual = '';
let cartasEnJuego = [];
let cartasVolteadas = [];
let puntos = 0;
let movimientos = 0;
let tiempoInicio;
let tiempoTranscurrido;
let temporizador;
let bloquearTablero = false;
let parejasEncontradas = 0;

// Sonidos
const sonidos = {
    acierto: new Audio('sonidos/acierto.mp3'),
    error: new Audio('sonidos/perdedor.mp3'),
    voltear: new Audio('sonidos/arrastre.mp3')
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    mostrarSeleccionNivel();
});

function seleccionarNivel(nivel) {
    nivelActual = nivel;
    document.getElementById('seleccion-nivel').style.display = 'none';
    document.getElementById('seleccion-categoria').style.display = 'flex';
}

function seleccionarCategoria(categoria) {
    categoriaActual = categoria;
    document.getElementById('seleccion-categoria').style.display = 'none';
    document.getElementById('juego-container').style.display = 'block';
    iniciarJuego();
}

function volverANiveles() {
    document.getElementById('seleccion-categoria').style.display = 'none';
    document.getElementById('seleccion-nivel').style.display = 'flex';
}

function iniciarJuego() {
    // Reiniciar variables
    puntos = 0;
    movimientos = 0;
    parejasEncontradas = 0;
    cartasVolteadas = [];
    bloquearTablero = false;
    
    // Actualizar contadores
    actualizarContadores();
    
    // Preparar cartas
    let cartasBase = configuracionCartas[categoriaActual][nivelActual];
    if (nivelActual === 'intermedio') {
        cartasBase = [...configuracionCartas[categoriaActual].facil, ...cartasBase];
    }
    
    // Duplicar cartas para crear pares
    cartasEnJuego = [...cartasBase, ...cartasBase]
        .sort(() => Math.random() - 0.5)
        .map((carta, index) => ({...carta, uniqueId: index}));
    
    // Crear tablero
    crearTablero();
    
    // Iniciar temporizador
    iniciarTemporizador();
}

function crearTablero() {
    const tablero = document.getElementById('tablero');
    tablero.innerHTML = '';
    
    // Ajustar grid según nivel
    const columnas = nivelActual === 'facil' ? 5 : 7;
    tablero.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    
    cartasEnJuego.forEach(carta => {
        const elementoCarta = document.createElement('div');
        elementoCarta.className = 'carta';
        elementoCarta.dataset.id = carta.uniqueId;
        
        elementoCarta.innerHTML = `
            <div class="carta-dorso">🎯</div>
            <div class="carta-frente">
                <img src="${carta.imagen}" alt="${carta.nombre}">
                <p>${carta.nombre}</p>
            </div>
        `;
        
        elementoCarta.addEventListener('click', () => voltearCarta(elementoCarta, carta));
        tablero.appendChild(elementoCarta);
    });
}

function voltearCarta(elementoCarta, carta) {
    if (bloquearTablero) return;
    if (elementoCarta.classList.contains('volteada')) return;
    if (cartasVolteadas.length === 2) return;
    
    sonidos.voltear.play();
    elementoCarta.classList.add('volteada');
    cartasVolteadas.push({elemento: elementoCarta, carta: carta});
    
    if (cartasVolteadas.length === 2) {
        bloquearTablero = true;
        verificarPareja();
    }
}

function verificarPareja() {
    movimientos++;
    actualizarContadores();
    
    const [carta1, carta2] = cartasVolteadas;
    const sonPareja = carta1.carta.id === carta2.carta.id;
    
    if (sonPareja) {
        sonidos.acierto.play();
        puntos += 10;
        parejasEncontradas++;
        
        carta1.elemento.classList.add('emparejada');
        carta2.elemento.classList.add('emparejada');
        
        if (parejasEncontradas === cartasEnJuego.length / 2) {
            setTimeout(mostrarResultados, 500);
        }
    } else {
        sonidos.error.play();
        puntos = Math.max(0, puntos - 2);
        
        setTimeout(() => {
            carta1.elemento.classList.remove('volteada');
            carta2.elemento.classList.remove('volteada');
        }, 1000);
    }
    
    setTimeout(() => {
        cartasVolteadas = [];
        bloquearTablero = false;
        actualizarContadores();
    }, 1000);
}

function actualizarContadores() {
    document.getElementById('contador-puntos').textContent = puntos;
    document.getElementById('contador-movimientos').textContent = movimientos;
}

function iniciarTemporizador() {
    tiempoInicio = Date.now();
    actualizarTiempo();
}

function actualizarTiempo() {
    const tiempoActual = Date.now();
    tiempoTranscurrido = Math.floor((tiempoActual - tiempoInicio) / 1000);
    const minutos = Math.floor(tiempoTranscurrido / 60);
    const segundos = tiempoTranscurrido % 60;
    
    document.getElementById('contador-tiempo').textContent = 
        `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    
    temporizador = requestAnimationFrame(actualizarTiempo);
}

function mostrarResultados() {
    cancelAnimationFrame(temporizador);
    
    const panelResultados = document.getElementById('panel-resultados');
    document.getElementById('puntuacion-final').textContent = puntos;
    document.getElementById('movimientos-totales').textContent = movimientos;
    document.getElementById('tiempo-final').textContent = 
        document.getElementById('contador-tiempo').textContent;
    
    panelResultados.style.display = 'block';
}

function reiniciarJuego() {
    const panelResultados = document.getElementById('panel-resultados');
    panelResultados.style.display = 'none';
    document.getElementById('juego-container').style.display = 'none';
    mostrarSeleccionNivel();
} 