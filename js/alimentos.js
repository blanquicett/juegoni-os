// Datos de los alimentos
const alimentos = {
    frutas: [
        { nombre: 'APPLE', imagen: 'imagenes/alimentos/manzana.png', audio: 'sonidos/apple.mp3' },
        { nombre: 'BANANA', imagen: 'imagenes/alimentos/platano.png', audio: 'sonidos/banana.mp3' },
        { nombre: 'ORANGE', imagen: 'imagenes/alimentos/naranja.png', audio: 'sonidos/orange.mp3' },
        { nombre: 'GRAPE', imagen: 'imagenes/alimentos/uva.png', audio: 'sonidos/grape.mp3' },
        { nombre: 'STRAWBERRY', imagen: 'imagenes/alimentos/fresa.png', audio: 'sonidos/strawberry.mp3' },
        { nombre: 'PEAR', imagen: 'imagenes/alimentos/pera.png', audio: 'sonidos/pear.mp3' },
        { nombre: 'WATERMELON', imagen: 'imagenes/alimentos/sandia.png', audio: 'sonidos/watermelon.mp3' }
    ],
    verduras: [
        { nombre: 'CARROT', imagen: 'imagenes/alimentos/zanahoria.png', audio: 'sonidos/carrot.mp3' },
        { nombre: 'TOMATO', imagen: 'imagenes/alimentos/tomate.png', audio: 'sonidos/tomato.mp3' },
        { nombre: 'LETTUCE', imagen: 'imagenes/alimentos/lechuga.png', audio: 'sonidos/lettuce.mp3' },
        { nombre: 'BROCCOLI', imagen: 'imagenes/alimentos/brocoli.png', audio: 'sonidos/broccoli.mp3' },
        { nombre: 'CUCUMBER', imagen: 'imagenes/alimentos/pepino.png', audio: 'sonidos/cucumber.mp3' },
        { nombre: 'POTATO', imagen: 'imagenes/alimentos/papa.png', audio: 'sonidos/potato.mp3' },
        { nombre: 'ONION', imagen: 'imagenes/alimentos/cebolla.png', audio: 'sonidos/onion.mp3' }
    ]
};

// Variables globales
let puntos = 0;
let aciertos = 0;
let alimentosRestantes = [];
let sonidoActivo = true;
let nivelActual = '';

// Sonidos del juego
const sonidos = {
    acierto: new Audio('sonidos/acierto.mp3'),
    error: new Audio('sonidos/error.mp3'),
    victoria: new Audio('sonidos/victoria.mp3')
};

// Configuración de niveles
const configuracionNiveles = {
    facil: {
        frutas: [
            { nombre: 'APPLE', imagen: 'imagenes/alimentos/manzana.png', audio: 'sonidos/apple.mp3' },
            { nombre: 'BANANA', imagen: 'imagenes/alimentos/platano.png', audio: 'sonidos/banana.mp3' },
            { nombre: 'ORANGE', imagen: 'imagenes/alimentos/naranja.png', audio: 'sonidos/orange.mp3' }
        ],
        verduras: [
            { nombre: 'CARROT', imagen: 'imagenes/alimentos/zanahoria.png', audio: 'sonidos/carrot.mp3' },
            { nombre: 'TOMATO', imagen: 'imagenes/alimentos/tomate.png', audio: 'sonidos/tomato.mp3' },
            { nombre: 'LETTUCE', imagen: 'imagenes/alimentos/lechuga.png', audio: 'sonidos/lettuce.mp3' }
        ]
    },
    intermedio: {
        frutas: [
            { nombre: 'APPLE', imagen: 'imagenes/alimentos/manzana.png', audio: 'sonidos/apple.mp3' },
            { nombre: 'BANANA', imagen: 'imagenes/alimentos/platano.png', audio: 'sonidos/banana.mp3' },
            { nombre: 'ORANGE', imagen: 'imagenes/alimentos/naranja.png', audio: 'sonidos/orange.mp3' },
            { nombre: 'GRAPE', imagen: 'imagenes/alimentos/uva.png', audio: 'sonidos/grape.mp3' },
            { nombre: 'STRAWBERRY', imagen: 'imagenes/alimentos/fresa.png', audio: 'sonidos/strawberry.mp3' },
            { nombre: 'PEAR', imagen: 'imagenes/alimentos/pera.png', audio: 'sonidos/pear.mp3' },
            { nombre: 'WATERMELON', imagen: 'imagenes/alimentos/sandia.png', audio: 'sonidos/watermelon.mp3' }
        ],
        verduras: [
            { nombre: 'CARROT', imagen: 'imagenes/alimentos/zanahoria.png', audio: 'sonidos/carrot.mp3' },
            { nombre: 'TOMATO', imagen: 'imagenes/alimentos/tomate.png', audio: 'sonidos/tomato.mp3' },
            { nombre: 'LETTUCE', imagen: 'imagenes/alimentos/lechuga.png', audio: 'sonidos/lettuce.mp3' },
            { nombre: 'BROCCOLI', imagen: 'imagenes/alimentos/brocoli.png', audio: 'sonidos/broccoli.mp3' },
            { nombre: 'CUCUMBER', imagen: 'imagenes/alimentos/pepino.png', audio: 'sonidos/cucumber.mp3' },
            { nombre: 'POTATO', imagen: 'imagenes/alimentos/papa.png', audio: 'sonidos/potato.mp3' },
            { nombre: 'ONION', imagen: 'imagenes/alimentos/cebolla.png', audio: 'sonidos/onion.mp3' }
        ]
    }
};

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    inicializarControlesSonido();
    mostrarSeleccionNivel();
});

function mostrarSeleccionNivel() {
    document.getElementById('seleccion-nivel').style.display = 'flex';
    document.getElementById('juego-container').style.display = 'none';
}

function seleccionarNivel(nivel) {
    nivelActual = nivel;
    document.getElementById('seleccion-nivel').style.display = 'none';
    document.getElementById('juego-container').style.display = 'block';
    iniciarJuego();
}

function iniciarJuego() {
    puntos = 0;
    aciertos = 0;
    actualizarContadores();
    
    // Mezclar todos los alimentos
    alimentosRestantes = [...configuracionNiveles[nivelActual].frutas, ...configuracionNiveles[nivelActual].verduras]
        .sort(() => Math.random() - 0.5);
    
    // Mostrar los alimentos
    mostrarAlimentos();
    
    // Inicializar eventos de drag and drop
    inicializarDragAndDrop();
}

function mostrarAlimentos() {
    const contenedor = document.getElementById('alimentos-container');
    contenedor.innerHTML = '';
    
    alimentosRestantes.forEach(alimento => {
        const elemento = document.createElement('div');
        elemento.className = 'alimento';
        elemento.draggable = true;
        elemento.dataset.tipo = configuracionNiveles[nivelActual].frutas.includes(alimento) ? 'frutas' : 'verduras';
        elemento.dataset.nombre = alimento.nombre;
        
        elemento.innerHTML = `
            <img src="${alimento.imagen}" alt="${alimento.nombre}">
            <p>${alimento.nombre}</p>
        `;
        
        // Agregar evento de clic para reproducir audio
        elemento.addEventListener('click', () => {
            if (sonidoActivo) {
                const audio = new Audio(alimento.audio);
                audio.play();
            }
        });
        
        contenedor.appendChild(elemento);
    });
}

function inicializarDragAndDrop() {
    actualizarEventosDragAndDrop();
}

// Nueva función para actualizar los eventos después de cada cambio
function actualizarEventosDragAndDrop() {
    const alimentos = document.querySelectorAll('.alimento:not(.clasificado)');
    const categorias = document.querySelectorAll('.categoria-drop');
    
    alimentos.forEach(alimento => {
        // Evitar duplicar event listeners
        alimento.removeEventListener('dragstart', handleDragStart);
        alimento.removeEventListener('dragend', handleDragEnd);
        
        alimento.addEventListener('dragstart', handleDragStart);
        alimento.addEventListener('dragend', handleDragEnd);
    });
    
    categorias.forEach(categoria => {
        // Evitar duplicar event listeners
        categoria.removeEventListener('dragover', handleDragOver);
        categoria.removeEventListener('dragleave', handleDragLeave);
        categoria.removeEventListener('drop', handleDrop);
        
        categoria.addEventListener('dragover', handleDragOver);
        categoria.addEventListener('dragleave', handleDragLeave);
        categoria.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    const datos = {
        tipo: e.target.dataset.tipo,
        nombre: e.target.dataset.nombre
    };
    e.dataTransfer.setData('text/plain', JSON.stringify(datos));
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    const categoria = e.currentTarget;
    categoria.classList.remove('dragover');
    
    try {
        const datos = JSON.parse(e.dataTransfer.getData('text/plain'));
        const alimentoArrastrado = document.querySelector('.alimento.dragging');
        
        if (!alimentoArrastrado) return;
        
        if (datos.tipo === categoria.dataset.categoria) {
            // Correcto
            puntos += 10;
            aciertos++;
            if (sonidoActivo) sonidos.acierto.play();
            mostrarNotificacion('¡Correcto! 🎉', 'exito');
            
            // Remover el alimento de alimentosRestantes
            alimentosRestantes = alimentosRestantes.filter(alimento => 
                alimento.nombre !== datos.nombre
            );
            
            // Agregar a la categoría
            agregarAlimentoACategoria(alimentoArrastrado, categoria);
            
            // Remover el original
            alimentoArrastrado.remove();
            
            // Actualizar el contenedor y los eventos
            mostrarAlimentos();
            actualizarEventosDragAndDrop();
        } else {
            // Incorrecto
            puntos = Math.max(0, puntos - 5);
            if (sonidoActivo) sonidos.error.play();
            mostrarNotificacion('¡Inténtalo de nuevo! ❌', 'error');
        }
        
        actualizarContadores();
        
        // Verificar si el juego ha terminado
        if (alimentosRestantes.length === 0) {
            if (sonidoActivo) sonidos.victoria.play();
            setTimeout(mostrarResultados, 500);
        }
    } catch (error) {
        console.error('Error en el manejo del drop:', error);
    }
}

function agregarAlimentoACategoria(alimento, categoria) {
    const clon = alimento.cloneNode(true);
    clon.classList.add('clasificado');
    clon.draggable = false;
    clon.style.pointerEvents = 'none';
    
    // Animación de entrada
    clon.style.opacity = '0';
    clon.style.transform = 'scale(0.8)';
    categoria.appendChild(clon);
    
    setTimeout(() => {
        clon.style.opacity = '1';
        clon.style.transform = 'scale(1)';
    }, 50);
}

function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    // Agregar animación
    setTimeout(() => {
        notificacion.classList.add('mostrar');
    }, 50);
    
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
        notificacion.classList.add('ocultar');
        setTimeout(() => notificacion.remove(), 300);
    }, 1700);
}

function actualizarContadores() {
    document.getElementById('contador-puntos').textContent = puntos;
    document.getElementById('contador-aciertos').textContent = aciertos;
}

function mostrarResultados() {
    const panelResultados = document.getElementById('panel-resultados');
    document.getElementById('puntuacion-final').textContent = puntos;
    document.getElementById('aciertos-totales').textContent = aciertos;
    
    // Animación de entrada
    panelResultados.style.display = 'block';
    setTimeout(() => {
        panelResultados.classList.add('mostrar');
    }, 50);
}

function reiniciarJuego() {
    const panelResultados = document.getElementById('panel-resultados');
    panelResultados.classList.remove('mostrar');
    setTimeout(() => {
        panelResultados.style.display = 'none';
        // Limpiar categorías
        document.querySelectorAll('.categoria-drop').forEach(categoria => {
            const alimentos = categoria.querySelectorAll('.alimento');
            alimentos.forEach(alimento => alimento.remove());
        });
        mostrarSeleccionNivel();
        iniciarJuego();
    }, 300);
}

function inicializarControlesSonido() {
    const btnSonido = document.createElement('button');
    btnSonido.className = 'btn-sonido';
    btnSonido.innerHTML = sonidoActivo ? '🔊' : '🔇';
    btnSonido.title = 'Activar/Desactivar sonido';
    
    btnSonido.addEventListener('click', () => {
        sonidoActivo = !sonidoActivo;
        btnSonido.innerHTML = sonidoActivo ? '🔊' : '🔇';
    });
    
    document.querySelector('.menu-container').appendChild(btnSonido);
}

// Función para precargar recursos
function precargarRecursos() {
    // Precargar imágenes
    [...alimentos.frutas, ...alimentos.verduras].forEach(alimento => {
        const img = new Image();
        img.src = alimento.imagen;
    });
    
    // Precargar audios
    Object.values(sonidos).forEach(audio => {
        audio.load();
    });
    
    [...alimentos.frutas, ...alimentos.verduras].forEach(alimento => {
        const audio = new Audio(alimento.audio);
        audio.load();
    });
}

// Llamar a precargarRecursos cuando se carga la página
window.addEventListener('load', precargarRecursos);