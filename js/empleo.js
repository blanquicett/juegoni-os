// Configuración de niveles y elementos
const configuracionNiveles = {
    facil: {
        profesiones: [
            { nombre: 'DOCTOR', imagen: 'imagenes/empleos/doctor.png', audio: 'sonidos/doctor.mp3' },
            { nombre: 'TEACHER', imagen: 'imagenes/empleos/profesor.png', audio: 'sonidos/teacher.mp3' },
            { nombre: 'CHEF', imagen: 'imagenes/empleos/chef.png', audio: 'sonidos/chef.mp3' }
        ],
        herramientas: [
            { nombre: 'STETHOSCOPE', imagen: 'imagenes/empleos/estetoscopio.png', audio: 'sonidos/stethoscope.mp3' },
            { nombre: 'BLACKBOARD', imagen: 'imagenes/empleos/pizarra.png', audio: 'sonidos/blackboard.mp3' },
            { nombre: 'PAN', imagen: 'imagenes/empleos/sarten.png', audio: 'sonidos/pan.mp3' }
        ]
    },
    intermedio: {
        profesiones: [
            { nombre: 'DOCTOR', imagen: 'imagenes/empleos/doctor.png', audio: 'sonidos/doctor.mp3' },
            { nombre: 'TEACHER', imagen: 'imagenes/empleos/profesor.png', audio: 'sonidos/teacher.mp3' },
            { nombre: 'CHEF', imagen: 'imagenes/empleos/chef.png', audio: 'sonidos/chef.mp3' },
            { nombre: 'FIREFIGHTER', imagen: 'imagenes/empleos/bombero.png', audio: 'sonidos/firefighter.mp3' },
            { nombre: 'POLICE', imagen: 'imagenes/empleos/policia.png', audio: 'sonidos/police.mp3' },
            { nombre: 'MECHANIC', imagen: 'imagenes/empleos/mecanico.png', audio: 'sonidos/mechanic.mp3' }
        ],
        herramientas: [
            { nombre: 'STETHOSCOPE', imagen: 'imagenes/empleos/estetoscopio.png', audio: 'sonidos/stethoscope.mp3' },
            { nombre: 'BLACKBOARD', imagen: 'imagenes/empleos/pizarra.png', audio: 'sonidos/blackboard.mp3' },
            { nombre: 'PAN', imagen: 'imagenes/empleos/sarten.png', audio: 'sonidos/pan.mp3' },
            { nombre: 'HOSE', imagen: 'imagenes/empleos/manguera.png', audio: 'sonidos/hose.mp3' },
            { nombre: 'BADGE', imagen: 'imagenes/empleos/placa.png', audio: 'sonidos/badge.mp3' },
            { nombre: 'WRENCH', imagen: 'imagenes/empleos/llave.png', audio: 'sonidos/wrench.mp3' }
        ]
    }
};

// Variables globales
let puntos = 0;
let aciertos = 0;
let elementosRestantes = [];
let sonidoActivo = true;
let nivelActual = '';

// Sonidos del juego
const sonidos = {
    acierto: new Audio('sonidos/acierto.mp3'),
    error: new Audio('sonidos/error.mp3'),
    victoria: new Audio('sonidos/victoria.mp3')
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
    
    // Mezclar todos los elementos
    elementosRestantes = [...configuracionNiveles[nivelActual].profesiones, ...configuracionNiveles[nivelActual].herramientas]
        .sort(() => Math.random() - 0.5);
    
    // Mostrar los elementos
    mostrarElementos();
    
    // Inicializar eventos de drag and drop
    inicializarDragAndDrop();
}

function mostrarElementos() {
    const contenedor = document.getElementById('elementos-container');
    contenedor.innerHTML = '';
    
    elementosRestantes.forEach(elemento => {
        const div = document.createElement('div');
        div.className = 'elemento';
        div.draggable = true;
        div.dataset.tipo = configuracionNiveles[nivelActual].profesiones.includes(elemento) ? 'profesiones' : 'herramientas';
        div.dataset.nombre = elemento.nombre;
        
        div.innerHTML = `
            <img src="${elemento.imagen}" alt="${elemento.nombre}">
            <p>${elemento.nombre}</p>
        `;
        
        // Agregar evento de clic para reproducir audio
        div.addEventListener('click', () => {
            if (sonidoActivo) {
                const audio = new Audio(elemento.audio);
                audio.play();
            }
        });
        
        contenedor.appendChild(div);
    });
}

function inicializarDragAndDrop() {
    actualizarEventosDragAndDrop();
}

function actualizarEventosDragAndDrop() {
    const elementos = document.querySelectorAll('.elemento:not(.clasificado)');
    const categorias = document.querySelectorAll('.categoria-drop');
    
    elementos.forEach(elemento => {
        elemento.removeEventListener('dragstart', handleDragStart);
        elemento.removeEventListener('dragend', handleDragEnd);
        
        elemento.addEventListener('dragstart', handleDragStart);
        elemento.addEventListener('dragend', handleDragEnd);
    });
    
    categorias.forEach(categoria => {
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
        const elementoArrastrado = document.querySelector('.elemento.dragging');
        
        if (!elementoArrastrado) return;
        
        if (datos.tipo === categoria.dataset.categoria) {
            // Correcto
            puntos += 10;
            aciertos++;
            if (sonidoActivo) sonidos.acierto.play();
            mostrarNotificacion('¡Correct! 🎉', 'exito');
            
            // Remover el elemento de elementosRestantes
            elementosRestantes = elementosRestantes.filter(elemento => 
                elemento.nombre !== datos.nombre
            );
            
            // Agregar a la categoría
            agregarElementoACategoria(elementoArrastrado, categoria);
            
            // Remover el original
            elementoArrastrado.remove();
            
            // Actualizar el contenedor y los eventos
            mostrarElementos();
            actualizarEventosDragAndDrop();
        } else {
            // Incorrecto
            puntos = Math.max(0, puntos - 5);
            if (sonidoActivo) sonidos.error.play();
            mostrarNotificacion('Try again! ❌', 'error');
        }
        
        actualizarContadores();
        
        // Verificar si el juego ha terminado
        if (elementosRestantes.length === 0) {
            if (sonidoActivo) sonidos.victoria.play();
            setTimeout(mostrarResultados, 500);
        }
    } catch (error) {
        console.error('Error en el manejo del drop:', error);
    }
}

function agregarElementoACategoria(elemento, categoria) {
    const clon = elemento.cloneNode(true);
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
            const elementos = categoria.querySelectorAll('.elemento');
            elementos.forEach(elemento => elemento.remove());
        });
        mostrarSeleccionNivel();
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

// Precargar recursos
function precargarRecursos() {
    const todosLosElementos = [
        ...configuracionNiveles.facil.profesiones,
        ...configuracionNiveles.facil.herramientas,
        ...configuracionNiveles.intermedio.profesiones,
        ...configuracionNiveles.intermedio.herramientas
    ];

    // Precargar imágenes
    todosLosElementos.forEach(elemento => {
        const img = new Image();
        img.src = elemento.imagen;
    });
    
    // Precargar audios
    Object.values(sonidos).forEach(audio => {
        audio.load();
    });
    
    todosLosElementos.forEach(elemento => {
        const audio = new Audio(elemento.audio);
        audio.load();
    });
}

// Llamar a precargarRecursos cuando se carga la página
window.addEventListener('load', precargarRecursos);
