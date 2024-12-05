let nivelActual = 'facil';
let categoriaActual = '';
let palabraActual = null;
let letrasSeleccionadas = [];
let palabrasUsadas = [];
let puntos = 0;
let palabrasCorrectas = 0;
let fallosCategoria = {};
let insigniasObtenidas = new Set();

// Modificar la declaración de sonidos
const sonidos = {
    acierto: new Audio('sonidos/acierto.mp3'),
    error: new Audio('sonidos/perdedor.mp3')
};

const palabras = {
    colores: {
        facil: [
            {
                
                palabra: 'RED',
                pista: 'Color del corazón ❤️',
                imagen: 'imagenes/corazon.jpg'
            },
            {
                palabra: 'BLUE',
                pista: 'Color del cielo 🌥️',
                imagen: 'imagenes/cielo.jpg'
            },
            {
                palabra: 'PINK',
                pista: 'Color de los flamingos 🦩',
                imagen: 'imagenes/flamingo.jpg'
            },
            {
                palabra: 'GREY',
                pista: 'Color de las nubes de lluvia ☁️',
                imagen: 'imagenes/lluvia.jpg'
            },
            {
                palabra: 'BROWN',
                pista: 'Color de la tierra 🌰',
                imagen: 'imagenes/tieera,jpg.jpg'
            }
        ],
        intermedio: [
            {
                palabra: 'PURPLE',
                pista: 'Color de las uvas 🍇',
                imagen: 'imagenes/uvas.jpg'
            },
            {
                palabra: 'GOLD',
                pista: 'Color del oro ⭐',
                imagen: 'imagenes/oro.jpg'
            },
            {
                palabra: 'VIOLET',
                pista: 'Color de la flor del mismo nombre 🌸',
                imagen: 'imagenes/florvioleta.jpg'
            },
            {
                palabra: 'ORANGE',
                pista: 'Color de la fruta cítrica 🍊',
                imagen: 'imagenes/naranja.jpg'
            },
            {
                palabra: 'PINK',
                pista: 'Color del algodón de azúcar 🎀',
                imagen: 'imagenes/algodon.jpg'
            }
        ]
    },
    casa: {
        facil: [
            {
                palabra: 'TABLE',
                pista: 'Donde comemos 🪑',
                imagen: 'imagenes/mesa.jpg'
            },
            {
                palabra: 'CHAIR',
                pista: 'Para sentarse 🪑',
                imagen: 'imagenes/silla.jpg'
            },
            {
                palabra: 'BED',
                pista: 'Donde dormimos 🛏️',
                imagen: 'imagenes/cama.jpg'
            },
            {
                palabra: 'COUCH',
                pista: 'Para descansar en la sala 🛋️',
                imagen: 'imagenes/sofa.jpg'
            },
            {
                palabra: 'CUP',
                pista: 'Para beber líquidos ☕',
                imagen: 'imagenes/taza.jpg'
            }
        ],
        intermedio: [
            {
                palabra: 'WINDOW',
                pista: 'Por donde entra la luz ☀️',
                imagen: 'imagenes/ventana.jpg'
            },
            {
                palabra: 'KITCHEN',
                pista: 'Donde preparamos la comida 🍳',
                imagen: 'imagenes/cocina.jpg'
            },
            {
                palabra: 'LAMP',
                pista: 'Nos da luz artificial 💡',
                imagen: 'imagenes/lampara.jpg'
            },
            {
                palabra: 'MIRROR',
                pista: 'Donde nos miramos 🪞',
                imagen: 'imagenes/espejo.jpg'
            },
            {
                palabra: 'WARDROBE',
                pista: 'Donde guardamos la ropa 👕',
                imagen: 'imagenes/armario.jpg'
            }
        ]
    },
    naturaleza: {
        facil: [
            {
                palabra: 'SUN',
                pista: 'Nos da calor ☀️',
                imagen: 'imagenes/sol.jpg'
            },
            {
                palabra: 'FLOWER',
                pista: 'Crece en el jardín 🌸',
                imagen: 'imagenes/flor2.jpg'
            },
            {
                palabra: 'MOON',
                pista: 'Brilla en la noche 🌙',
                imagen: 'imagenes/luna.jpg'
            },
            {
                palabra: 'PINE',
                pista: 'Árbol de navidad 🌲',
                imagen: 'imagenes/pino.jpg'
            },
            {
                palabra: 'LAKE',
                pista: 'Cuerpo de agua 💧',
                imagen: 'imagenes/lago.jpg'
            }
        ],
        intermedio: [
            {
                palabra: 'BUSH',
                pista: 'Planta pequeña 🌳',
                imagen: 'imagenes/arbusto.jpg'
            },
            {
                palabra: 'MOUNTAIN',
                pista: 'Elevación de tierra ⛰️',
                imagen: 'imagenes/montaña.jpg'
            },
            {
                palabra: 'WATERFALL',
                pista: 'Agua que cae 🌊',
                imagen: 'imagenes/cascada.jpg'
            },
            {
                palabra: 'FOREST',
                pista: 'Muchos árboles juntos 🌳',
                imagen: 'imagenes/bosque.jpg'
            },
            {
                palabra: 'VOLCANO',
                pista: 'Montaña que expulsa lava 🌋',
                imagen: 'imagenes/volcan.jpg'
            }
        ]
    }
};

function mostrarNotificacion(mensaje, tipo) {
    // Remover notificaciones anteriores
    const notificacionesAnteriores = document.querySelectorAll('.notificacion');
    notificacionesAnteriores.forEach(notif => notif.remove());

    // Crear nueva notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    // Reproducir sonido
    try {
        if (tipo === 'exito') {
            sonidos.acierto.play();
        } else {
            sonidos.error.play();
        }
    } catch (error) {
        console.log('Error al reproducir sonido:', error);
    }

    // Eliminar después de 2 segundos
    setTimeout(() => {
        notificacion.classList.add('fadeOut');
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 1700);
}




document.addEventListener('DOMContentLoaded', () => {
    // Inicializar contadores y estados
    inicializarContadores();
    puntos = 0;
    palabrasCorrectas = 0;
    insigniasObtenidas = new Set();

    // Inicializar fallos por categoría
    fallosCategoria = {
        colores: { facil: 0, intermedio: 0 },
        casa: { facil: 0, intermedio: 0 },
        naturaleza: { facil: 0, intermedio: 0 }
    };

    // Ocultar pantalla de carga y mostrar selección de nivel
    setTimeout(() => {
        const pantallaCarga = document.getElementById('pantalla-carga');
        const seleccionNivel = document.getElementById('seleccion-nivel');
        
        if (pantallaCarga && seleccionNivel) {
            pantallaCarga.style.display = 'none';
            seleccionNivel.style.display = 'flex';
        }
    }, 1500);
    const btnAtras = document.getElementById('btn-atras');
    if (btnAtras) {
        btnAtras.addEventListener('click', manejarBotonAtras);
    }
});



function manejarBotonAtras() {
    const juegoPrincipal = document.getElementById('juego-principal');
    const juegoContainer = document.getElementById('juego');
    const categorias = document.querySelector('.categorias');
    const seleccionNivel = document.getElementById('seleccion-nivel');

    // Si estamos en la pantalla de juego
    if (juegoContainer.style.display === 'block') {
        // Volver a selección de categorías
        juegoContainer.style.display = 'none';
        categorias.style.display = 'flex';
        palabrasUsadas = [];
        categoriaActual = '';
        palabraActual = null;
        letrasSeleccionadas = [];
    } 
    // Si estamos en la selección de categorías
    else if (categorias.style.display === 'flex') {
        // Volver a selección de nivel
        juegoPrincipal.style.display = 'none';
        seleccionNivel.style.display = 'flex';
    }
}

function seleccionarJuego(tipoJuego) {
    if (tipoJuego === 'palabras') {
        document.querySelector('.juegos-container').style.display = 'none';
        document.getElementById('seleccion-nivel').style.display = 'flex';
    }
}

function seleccionarNivel(nivel) {
    nivelActual = nivel;
    document.getElementById('seleccion-nivel').style.display = 'none';
    document.getElementById('seleccion-categoria').style.display = 'flex';
}

function seleccionarCategoria(categoria) {
    categoriaActual = categoria;
    palabrasUsadas = [];
    document.getElementById('seleccion-categoria').style.display = 'none';
    document.getElementById('juego-principal').style.display = 'block';
    mostrarSiguientePalabra();
}

function iniciarJuego() {
    if (!palabraActual) {
        const palabrasDisponibles = palabras[categoriaActual][nivelActual].filter(
            palabra => !palabrasUsadas.includes(palabra.palabra)
        );
        
        if (palabrasDisponibles.length === 0) {
            mostrarInsigniasNivelCompletado();
            return;
        }
        
        const indiceAleatorio = Math.floor(Math.random() * palabrasDisponibles.length);
        palabraActual = palabrasDisponibles[indiceAleatorio];
        palabrasUsadas.push(palabraActual.palabra);
    }

    // Actualizar contenido del juego
    const juegoContainer = document.getElementById('juego');
    juegoContainer.innerHTML = `
        <div class="juego-header">
            <div class="imagen-container">
                <img id="imagen-palabra" src="${palabraActual.imagen}" alt="Imagen de la palabra">
            </div>
            <p id="pista" class="pista">${palabraActual.pista}</p>
        </div>
        <div id="espacios-container" class="espacios-container"></div>
        <div id="letras-container" class="letras-container"></div>
    `;

    // Crear espacios para letras
    const contenedorEspacios = document.getElementById('espacios-container');
    letrasSeleccionadas = new Array(palabraActual.palabra.length).fill('');
    
    for (let i = 0; i < palabraActual.palabra.length; i++) {
        const espacio = document.createElement('div');
        espacio.className = 'espacio-letra';
        espacio.dataset.indice = i;
        contenedorEspacios.appendChild(espacio);
    }

    // Crear y desordenar letras
    const letras = palabraActual.palabra.split('');
    for (let i = letras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letras[i], letras[j]] = [letras[j], letras[i]];
    }
    
    const contenedorLetras = document.getElementById('letras-container');
    letras.forEach((letra, index) => {
    const letraDiv = document.createElement('div');
    letraDiv.className = 'letra';
    letraDiv.textContent = letra;
  
    letraDiv.dataset.letraId = `${letra}-${index}`;
    contenedorLetras.appendChild(letraDiv);
    });

    // Inicializar drag and drop
    inicializarDragAndDrop();
}



function inicializarDragAndDrop(elemento) {
    elemento.addEventListener('dragstart', e => {
        if (elemento.classList.contains('letra')) {
            e.dataTransfer.setData('text/plain', elemento.textContent);
            elemento.classList.add('dragging');
        }
    });

    elemento.addEventListener('dragend', e => {
        elemento.classList.remove('dragging');
    });

    elemento.addEventListener('dragover', e => {
        e.preventDefault();
        if (elemento.classList.contains('espacio-letra') && !elemento.textContent) {
            elemento.classList.add('hover');
        }
    });

    elemento.addEventListener('dragleave', e => {
        elemento.classList.remove('hover');
    });

    elemento.addEventListener('drop', e => {
        e.preventDefault();
        elemento.classList.remove('hover');
        
        if (elemento.classList.contains('espacio-letra') && !elemento.textContent) {
            const letra = e.dataTransfer.getData('text/plain');
            elemento.textContent = letra;
            
            const letraElement = Array.from(document.querySelectorAll('.letra:not(.seleccionada)'))
                .find(el => el.textContent === letra);
            
            if (letraElement) {
                letraElement.classList.add('seleccionada');
                letrasSeleccionadas.push(letra);
                verificarPalabra();
            }
        }
    });

    // Agregar evento de clic para devolver letras
    if (elemento.classList.contains('espacio-letra')) {
        elemento.addEventListener('click', () => {
            if (elemento.textContent) {
                const letra = elemento.textContent;
                // Encontrar y desmarcar la letra original
                const letraOriginal = Array.from(document.querySelectorAll('.letra'))
                    .find(el => el.textContent === letra && el.classList.contains('seleccionada'));
                
                if (letraOriginal) {
                    letraOriginal.classList.remove('seleccionada');
                    const index = letrasSeleccionadas.indexOf(letra);
                    if (index > -1) {
                        letrasSeleccionadas.splice(index, 1);
                    }
                }
                elemento.textContent = '';
            }
        });
    }
}




function manejarDragStart(e) {
    e.target.classList.add('arrastrando');
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.dataTransfer.effectAllowed = 'move';
}

function manejarDragEnd(e) {
    e.target.classList.remove('arrastrando');
}

function manejarDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function manejarDrop(e) {
    e.preventDefault();
    const espacioDestino = e.target;
    
    if (espacioDestino.textContent !== '') return;
    
    const letraArrastrada = document.querySelector('.letra.arrastrando');
    if (letraArrastrada && !letraArrastrada.classList.contains('seleccionada')) {
        // Crear un clon del estilo de la letra
        const letraClonada = document.createElement('div');
        letraClonada.className = 'letra letra-en-espacio';
        letraClonada.textContent = letraArrastrada.textContent;
        
        // Limpiar el espacio y agregar la letra clonada
        espacioDestino.textContent = '';
        espacioDestino.appendChild(letraClonada);
        
        letrasSeleccionadas[parseInt(espacioDestino.dataset.indice)] = letraArrastrada.textContent;
        letraArrastrada.classList.add('seleccionada');
        
        if (letrasSeleccionadas.filter(l => l).length === palabraActual.palabra.length) {
            verificarPalabra();
        }
    }
}

function manejarClickLetra(e) {
    const letraDiv = e.target;
    if (!letraDiv.classList.contains('seleccionada')) {
        const espaciosVacios = document.querySelectorAll('.espacio-letra:empty');
        if (espaciosVacios.length > 0) {
            const primerEspacio = espaciosVacios[0];
            
            // Crear un clon del estilo de la letra
            const letraClonada = document.createElement('div');
            letraClonada.className = 'letra letra-en-espacio';
            letraClonada.textContent = letraDiv.textContent;
            
            // Limpiar el espacio y agregar la letra clonada
            primerEspacio.textContent = '';
            primerEspacio.appendChild(letraClonada);
            
            letrasSeleccionadas[parseInt(primerEspacio.dataset.indice)] = letraDiv.textContent;
            letraDiv.classList.add('seleccionada');
            
            if (letrasSeleccionadas.filter(l => l).length === palabraActual.palabra.length) {
                verificarPalabra();
            }
        }
    }
}

function manejarClickEspacio(e) {
    const espacio = e.target.closest('.espacio-letra');
    if (!espacio) return;
    
    const letraEnEspacio = espacio.querySelector('.letra-en-espacio');
    if (letraEnEspacio) {
        const letra = letraEnEspacio.textContent;
        document.querySelectorAll('.letra').forEach(letraElem => {
            if (letraElem.textContent === letra && letraElem.classList.contains('seleccionada')) {
                letraElem.classList.remove('seleccionada');
            }
        });
        
        espacio.textContent = '';
        letrasSeleccionadas[parseInt(espacio.dataset.indice)] = '';
    }
}


function seleccionarLetra(letraDiv) {
    if (letraDiv.classList.contains('seleccionada')) {
        return;
    }
    
    const espaciosVacios = document.querySelectorAll('.espacio-letra:empty');
    if (espaciosVacios.length > 0) {
        espaciosVacios[0].textContent = letraDiv.textContent;
        letrasSeleccionadas.push(letraDiv.textContent);
        letraDiv.classList.add('seleccionada');
        
        if(letrasSeleccionadas.length === palabraActual.palabra.length) {
            verificarPalabra();
        }
    }
}


function actualizarPuntuacion(correcta) {
    if (correcta) {
        if (nivelActual === 'facil') {
            puntos += 10;
        } else if (nivelActual === 'intermedio') {
            puntos += 15;
        }
        palabrasCorrectas++;
    } else {
        if (nivelActual === 'facil') {
            puntos = Math.max(0, puntos - 5);
        } else if (nivelActual === 'intermedio') {
            puntos = Math.max(0, puntos - 8); 
        }
    }
    
    document.getElementById('contador-puntos').textContent = puntos;
    document.getElementById('palabras-correctas').textContent = palabrasCorrectas;
}


function mostrarMensajeExito() {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-exito';
    mensaje.textContent = '¡Correcto! 🎉';
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
        mensaje.remove();
    }, 1500);
}

function mostrarMensajeError() {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-error';
    mensaje.textContent = '¡Inténtalo de nuevo! 😊';
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
        mensaje.remove();
    }, 1500);
}

function resetearPalabra() {
    letrasSeleccionadas = [];
    document.querySelectorAll('.espacio-letra').forEach(espacio => {
        espacio.textContent = '';
    });
    document.querySelectorAll('.letra').forEach(letra => {
        letra.classList.remove('seleccionada');
    });
}

function inicializarContadores() {
    document.getElementById('contador-puntos').textContent = '0';
    document.getElementById('palabras-correctas').textContent = '0';
}

function mostrarInsigniasNivelCompletado() {
    const insigniasGanadas = verificarInsigniasNivel();
    
    if (insigniasGanadas.length > 0) {
        mostrarModalLogrosNivel(insigniasGanadas, () => {
            volverASeleccionNivel();
        });
    } else {
        volverASeleccionNivel();
    }
}

function verificarInsigniasNivel() {
    const insigniasGanadas = [];
    
    // Verificar insignia por categoría completada
    if (!insigniasObtenidas.has(`${categoriaActual}-${nivelActual}`)) {
        insigniasGanadas.push({
            tipo: 'bronce',
            icono: '🥉',
            titulo: 'Categoría Completada',
            descripcion: `¡Completaste todas las palabras de ${categoriaActual} en nivel ${nivelActual}!`
        });
    }
    
    // Verificar insignia por categoría perfecta
    if (!insigniasObtenidas.has(`perfecto-${categoriaActual}-${nivelActual}`) && 
        fallosCategoria[categoriaActual][nivelActual] === 0) {
        insigniasGanadas.push({
            tipo: 'plata',
            icono: '🥈',
            titulo: '¡Perfección!',
            descripcion: `¡Perfecto! Completaste ${categoriaActual} ${nivelActual} sin errores!`
        });
    }
    
    return insigniasGanadas;
}

function mostrarModalLogrosNivel(insignias, callback) {
    const modal = document.getElementById('logro-modal');
    const insigniasGrid = modal.querySelector('.insignias-grid');
    
    insigniasGrid.innerHTML = '';
    
    insignias.forEach(insignia => {
        const divInsignia = document.createElement('div');
        divInsignia.className = `insignia-modal ${insignia.tipo}`;
        divInsignia.innerHTML = `
            <div class="insignia-icono">${insignia.icono}</div>
            <h3>${insignia.titulo}</h3>
            <p>${insignia.descripcion}</p>
        `;
        insigniasGrid.appendChild(divInsignia);
        otorgarInsignia(insignia);
    });
    
    modal.style.display = 'block';
    
    const btnContinuar = modal.querySelector('.btn-continuar');
    btnContinuar.onclick = () => {
        modal.style.display = 'none';
        if (callback) callback();
    };
}

function otorgarInsignia(insigniaData) {
    const id = `${insigniaData.tipo}-${categoriaActual}-${nivelActual}`;
    if (insigniasObtenidas.has(id)) return;
    
    insigniasObtenidas.add(id);
    
    const insignia = document.createElement('div');
    insignia.className = `insignia ${insigniaData.tipo}`;
    insignia.innerHTML = insigniaData.icono;
    insignia.title = insigniaData.descripcion;
    
    insignia.addEventListener('click', () => {
        mostrarModalInsignia(insigniaData);
    });
    
    document.getElementById('lista-insignias').appendChild(insignia);
}

function volverASeleccionNivel() {
    document.getElementById('juego-principal').style.display = 'none';
    document.getElementById('seleccion-nivel').style.display = 'flex';
    palabrasUsadas = [];
    categoriaActual = '';
    palabraActual = null;
    letrasSeleccionadas = [];
}

function mostrarModalInsignia(insigniaData) {
    const modal = document.getElementById('logro-modal');
    const insignias = document.querySelectorAll('.insignia-modal');
    
    insignias.forEach(insignia => {
        insignia.classList.remove('seleccionada');
    });
    
    const tipoAClase = {
        'bronce': 0,
        'plata': 1, 
        'oro': 2
    };
    
    const indiceInsignia = tipoAClase[insigniaData.tipo];
    if (insignias[indiceInsignia]) {
        const insigniaSeleccionada = insignias[indiceInsignia];
        insigniaSeleccionada.classList.add('seleccionada');
        insigniaSeleccionada.querySelector('h3').textContent = insigniaData.titulo;
        insigniaSeleccionada.querySelector('p').textContent = insigniaData.descripcion;
    }
    
    modal.style.display = 'block';
}

// Función para crear estrellas cuando se acierta una palabra
function crearEstrellas() {
    const estrellas = document.createElement('div');
    estrellas.className = 'estrellas';
    
    for(let i = 0; i < 20; i++) {
        const estrella = document.createElement('div');
        estrella.className = 'estrella';
        estrella.innerHTML = '⭐';
        estrella.style.left = Math.random() * 100 + 'vw';
        estrella.style.animationDelay = Math.random() * 2 + 's';
        estrellas.appendChild(estrella);
    }
    
    document.body.appendChild(estrellas);
    setTimeout(() => estrellas.remove(), 3000);
}





// Agregar efectos de sonido a las interacciones
function inicializarSonidos() {
    document.querySelectorAll('.letra').forEach(letra => {
        letra.addEventListener('mousedown', () => sonidos.arrastrar.play());
    });
}

// Función para mostrar instrucciones
function mostrarInstrucciones(tipoJuego) {
    const instrucciones = {
        palabras: {
            titulo: "Juego de Palabras",
            contenido: "Arrastra las letras a los espacios vacíos para formar la palabra correcta. ¡Sigue las pistas y gana puntos!"
        },
        sopaLetras: {
            titulo: "Sopa de Letras",
            contenido: "Encuentra las palabras ocultas en la cuadrícula. Puedes buscar horizontal, vertical o diagonalmente."
        },
        vocales: {
            titulo: "Vocales",
            contenido: "Completa las palabras colocando las vocales que faltan (A, E, I, O, U). Observa la imagen para saber qué palabra debes formar. ¡Haz clic en los botones de vocales para colocarlas en los espacios correctos!"
        },
        animales: {
            titulo: "Animales",
            contenido: "Encuentra los pares de cartas iguales. Voltea dos cartas por turno y recuerda sus posiciones. ¡Encuentra todas las parejas para ganar! Puedes elegir diferentes categorías como colores, animales, números y más."
        },
        comidas: {
            titulo: "Clasificación de Alimentos",
            contenido: "¡Aprende vocabulario de alimentos en inglés! Arrastra cada alimento a su categoría correcta (frutas, verduras, etc.). Gana puntos por cada clasificación correcta y completa todas las categorías para ganar. ¡Presta atención a las imágenes y nombres en inglés!"
        },
        profesiones: {
            titulo: "Profesiones",
            contenido: "Relaciona cada profesión con su herramienta o lugar de trabajo arrastrando y soltando las imágenes. Aprende sobre diferentes trabajos y sus características. ¡Completa todas las categorías para ganar!"
        },
        familia: {
            titulo: "Profesiones y Herramientas",
            contenido: "¡Aprende sobre diferentes profesiones en inglés! Arrastra cada profesión hacia su herramienta o lugar de trabajo correspondiente. Por ejemplo: Doctor con Hospital, Chef con Cocina. Completa cada nivel relacionando correctamente todas las parejas. ¡Gana puntos por cada pareja correcta!"
        }
    };

    const modal = document.createElement('div');
    modal.className = 'modal-instrucciones';
    modal.innerHTML = `
        <div class="modal-contenido">
            <h3>${instrucciones[tipoJuego].titulo}</h3>
            <p>${instrucciones[tipoJuego].contenido}</p>
            <button onclick="this.parentElement.parentElement.remove()">Entendido</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function mostrarSeleccionNivel(tipoJuego) {
    document.querySelector('.juegos-container').style.display = 'none';
    document.getElementById('seleccion-nivel').style.display = 'flex';
}

function volverAInicio() {
    document.querySelector('.juegos-container').style.display = 'grid';
    document.getElementById('seleccion-nivel').style.display = 'none';
    document.getElementById('seleccion-categoria').style.display = 'none';
    document.getElementById('juego-principal').style.display = 'none';
}

function volverANiveles() {
    document.getElementById('seleccion-categoria').style.display = 'none';
    document.getElementById('seleccion-nivel').style.display = 'flex';
    document.getElementById('juego-principal').style.display = 'none';
}

function volverACategorias() {
    document.getElementById('juego-principal').style.display = 'none';
    document.getElementById('seleccion-categoria').style.display = 'flex';
}


// ... mantener todo el código anterior ...

function mostrarSiguientePalabra() {
    const palabrasDisponibles = palabras[categoriaActual][nivelActual].filter(
        p => !palabrasUsadas.includes(p.palabra)
    );
    
    if (palabrasDisponibles.length === 0) {
        const insigniasGanadas = verificarInsigniasNivel();
        if (insigniasGanadas.length > 0) {
            mostrarModalLogrosNivel(insigniasGanadas);
        }
        return;
    }
    
    palabraActual = palabrasDisponibles[Math.floor(Math.random() * palabrasDisponibles.length)];
    palabrasUsadas.push(palabraActual.palabra);
    
    // Actualizar pista e imagen
    document.getElementById('pista-texto').textContent = palabraActual.pista;
    document.getElementById('pista-imagen').src = palabraActual.imagen;
    
    // Crear espacios para letras
    const contenedor = document.getElementById('palabra-container');
    contenedor.innerHTML = '';
    
    for (let i = 0; i < palabraActual.palabra.length; i++) {
        const espacio = document.createElement('div');
        espacio.className = 'espacio-letra';
        inicializarDragAndDrop(espacio);
        contenedor.appendChild(espacio);
    }
    
    // Crear letras desordenadas
    const letrasContainer = document.getElementById('letras-container');
    letrasContainer.innerHTML = '';
    
    const letrasDesordenadas = palabraActual.palabra.split('')
        .sort(() => Math.random() - 0.5);
    
    letrasDesordenadas.forEach(letra => {
        const letraElement = document.createElement('div');
        letraElement.className = 'letra';
        letraElement.textContent = letra;
        letraElement.draggable = true;
        letrasContainer.appendChild(letraElement);
        inicializarDragAndDrop(letraElement);
    });
}

function inicializarDragAndDrop(elemento) {
    elemento.addEventListener('dragstart', e => {
        if (elemento.classList.contains('letra')) {
            e.dataTransfer.setData('text/plain', elemento.textContent);
            elemento.classList.add('dragging');
        }
    });

    elemento.addEventListener('dragend', e => {
        elemento.classList.remove('dragging');
    });

    elemento.addEventListener('dragover', e => {
        e.preventDefault();
        // Modificado para permitir soltar en espacios ocupados
        if (elemento.classList.contains('espacio-letra')) {
            elemento.classList.add('hover');
        }
    });

    elemento.addEventListener('dragleave', e => {
        elemento.classList.remove('hover');
    });

    elemento.addEventListener('drop', e => {
        e.preventDefault();
        elemento.classList.remove('hover');
        
        if (elemento.classList.contains('espacio-letra')) {
            // Si hay una letra previa, devolverla
            if (elemento.textContent) {
                const letraPrevia = elemento.textContent;
                const letraPreviaElement = Array.from(document.querySelectorAll('.letra'))
                    .find(el => el.textContent === letraPrevia && el.classList.contains('seleccionada'));
                
                if (letraPreviaElement) {
                    letraPreviaElement.classList.remove('seleccionada');
                    const index = letrasSeleccionadas.indexOf(letraPrevia);
                    if (index > -1) {
                        letrasSeleccionadas.splice(index, 1);
                    }
                }
            }
            
            // Colocar la nueva letra
            const letra = e.dataTransfer.getData('text/plain');
            elemento.textContent = letra;
            
            const letraElement = Array.from(document.querySelectorAll('.letra:not(.seleccionada)'))
                .find(el => el.textContent === letra);
            
            if (letraElement) {
                letraElement.classList.add('seleccionada');
                letrasSeleccionadas.push(letra);
                verificarPalabra();
            }
        }
    });
}

function verificarPalabra() {
    if (letrasSeleccionadas.length === palabraActual.palabra.length) {
        const palabraFormada = Array.from(document.querySelectorAll('.espacio-letra'))
            .map(espacio => espacio.textContent)
            .join('');
        
        if (palabraFormada === palabraActual.palabra) {
            // Palabra correcta
            actualizarPuntuacion(true);
            mostrarNotificacion('¡Correcto! 🎉', 'exito');
            
            setTimeout(() => {
                letrasSeleccionadas = [];
                mostrarSiguientePalabra();
            }, 1000);
        } else {
            // Palabra incorrecta
            actualizarPuntuacion(false);
            mostrarNotificacion('¡Inténtalo de nuevo! ❌', 'error');
            
            letrasSeleccionadas = [];
            document.querySelectorAll('.espacio-letra').forEach(espacio => {
                espacio.textContent = '';
            });
            document.querySelectorAll('.letra').forEach(letra => {
                letra.classList.remove('seleccionada');
            });
        }
    }
}


// Para el modal de logros
document.querySelector('.cerrar-modal')?.addEventListener('click', function() {
    document.getElementById('logro-modal').style.display = 'none';
});

document.getElementById('logro-modal')?.addEventListener('click', function(event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});

// Funciones para manejar logros e insignias
function verificarInsigniasNivel() {
    const insigniasGanadas = [];
    
    // Verificar insignia de bronce (completar una categoría)
    if (!insigniasObtenidas.has('bronce') && palabrasCorrectas >= 5) {
        insigniasGanadas.push({
            tipo: 'bronce',
            titulo: '¡Categoría Completada!',
            descripcion: '¡Completaste todas las palabras de una categoría!',
            icono: '🥉'
        });
        insigniasObtenidas.add('bronce');
    }

    // Verificar insignia de plata (completar sin errores)
    if (!insigniasObtenidas.has('plata') && !fallosCategoria[categoriaActual]) {
        insigniasGanadas.push({
            tipo: 'plata',
            titulo: '¡Perfección!',
            descripcion: '¡Completaste una categoría sin errores!',
            icono: '🥈'
        });
        insigniasObtenidas.add('plata');
    }

    // Verificar insignia de oro (completar todo el juego)
    if (!insigniasObtenidas.has('oro') && palabrasCorrectas >= 15) {
        insigniasGanadas.push({
            tipo: 'oro',
            titulo: '¡Master del Vocabulario!',
            descripcion: '¡Completaste todo el juego!',
            icono: '🥇'
        });
        insigniasObtenidas.add('oro');
    }

    return insigniasGanadas;
}

function mostrarModalLogrosNivel(insignias) {
    const modal = document.getElementById('logro-modal');
    const insigniasGrid = modal.querySelector('.insignias-grid');
    insigniasGrid.innerHTML = '';

    insignias.forEach(insignia => {
        insigniasGrid.innerHTML += `
            <div class="insignia-modal ${insignia.tipo}">
                <div class="insignia-icono">${insignia.icono}</div>
                <h3>${insignia.titulo}</h3>
                <p>${insignia.descripcion}</p>
            </div>
        `;
    });

    modal.style.display = 'flex';
}

