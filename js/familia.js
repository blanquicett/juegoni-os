// Configuración del juego
const configuracionJuego = {
    facil: {
        categorias: [
            {
                nombre: "School Jobs",
                icono: "🏫",
                parejas: [
                    { profesion: "Teacher", herramienta: "Books", imagen1: "imagenes/teacher.png", imagen2: "imagenes/books.png", pista: "Teaches students in class" },
                    { profesion: "Principal", herramienta: "Office", imagen1: "imagenes/principal.png", imagen2: "imagenes/office.png", pista: "Leads the school" },
                    { profesion: "Librarian", herramienta: "Library", imagen1: "imagenes/librarian.png", imagen2: "imagenes/library.png", pista: "Organizes books" }
                ]
            },
            {
                nombre: "Health Jobs",
                icono: "⚕️",
                parejas: [
                    { profesion: "Doctor", herramienta: "Stethoscope", imagen1: "imagenes/doctor.png", imagen2: "imagenes/stethoscope.png", pista: "Helps sick people" },
                    { profesion: "Nurse", herramienta: "Medicine", imagen1: "imagenes/nurse.png", imagen2: "imagenes/medicine.png", pista: "Takes care of patients" },
                    { profesion: "Dentist", herramienta: "Dental Chair", imagen1: "imagenes/dentist.png", imagen2: "imagenes/dental-chair.png", pista: "Fixes teeth" }
                ]
            },
            {
                nombre: "Food Jobs",
                icono: "🍳",
                parejas: [
                    { profesion: "Chef", herramienta: "Kitchen", imagen1: "imagenes/chef.png", imagen2: "imagenes/kitchen.png", pista: "Cooks in restaurants" },
                    { profesion: "Baker", herramienta: "Oven", imagen1: "imagenes/baker.png", imagen2: "imagenes/oven.png", pista: "Makes bread and cakes" },
                    { profesion: "Waiter", herramienta: "Tray", imagen1: "imagenes/waiter.png", imagen2: "imagenes/tray.png", pista: "Serves food" }
                ]
            },
            {
                nombre: "Helper Jobs",
                icono: "👮",
                parejas: [
                    { profesion: "Police", herramienta: "Police Car", imagen1: "imagenes/police.png", imagen2: "imagenes/police-car.png", pista: "Protects people" },
                    { profesion: "Firefighter", herramienta: "Fire Truck", imagen1: "imagenes/firefighter.png", imagen2: "imagenes/fire-truck.png", pista: "Puts out fires" },
                    { profesion: "Mail Carrier", herramienta: "Mail Bag", imagen1: "imagenes/mailman.png", imagen2: "imagenes/mailbag.png", pista: "Delivers letters" }
                ]
            }
        ],
        tiempoPorNivel: 60
    },
    intermedio: {
        categorias: [
            {
                nombre: "Office Jobs",
                icono: "💼",
                parejas: [
                    { profesion: "Lawyer", herramienta: "Courthouse", imagen1: "imagenes/lawyer.png", imagen2: "imagenes/courthouse.png", pista: "Works with laws" },
                    { profesion: "Engineer", herramienta: "Blueprint", imagen1: "imagenes/engineer.png", imagen2: "imagenes/blueprint.png", pista: "Designs structures" },
                    { profesion: "Architect", herramienta: "Building Model", imagen1: "imagenes/architect.png", imagen2: "imagenes/building-model.png", pista: "Designs buildings" },
                    { profesion: "Accountant", herramienta: "Calculator", imagen1: "imagenes/accountant.png", imagen2: "imagenes/calculator.png", pista: "Works with numbers" }
                ]
            },
            // ... más categorías del nivel intermedio
        ],
        tiempoPorNivel: 90
    }
};

// Variables globales
let nivelActual = '';
let categoriaActual = null;
let tiempoRestante = 0;
let temporizador = null;
let puntos = 0;
let parejasEncontradas = 0;
let categoriasCompletadas = 0;
let elementoSeleccionado = null;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    ocultarTodosPaneles();
    document.getElementById('seleccion-nivel').style.display = 'block';
});

function ocultarTodosPaneles() {
    const paneles = ['seleccion-nivel', 'seleccion-categoria', 'juego-principal', 
                     'modal-pista', 'modal-categoria-completada', 'modal-victoria'];
    paneles.forEach(panel => {
        const elemento = document.getElementById(panel);
        if (elemento) elemento.style.display = 'none';
    });
}

function seleccionarNivel(nivel) {
    nivelActual = nivel;
    mostrarCategorias();
}

function mostrarCategorias() {
    ocultarTodosPaneles();
    const container = document.querySelector('.categorias-container');
    container.innerHTML = '';

    configuracionJuego[nivelActual].categorias.forEach((categoria, index) => {
        const card = crearCategoriaCard(categoria, index);
        container.appendChild(card);
    });

    document.getElementById('seleccion-categoria').style.display = 'block';
}

function crearCategoriaCard(categoria, index) {
    const card = document.createElement('div');
    card.className = 'categoria-card';
    if (index > categoriasCompletadas) {
        card.classList.add('bloqueada');
    }

    card.innerHTML = `
        <div class="categoria-icon">${categoria.icono}</div>
        <h3>${categoria.nombre}</h3>
    `;

    if (!card.classList.contains('bloqueada')) {
        card.addEventListener('click', () => iniciarCategoria(index));
    }

    return card;
}

function iniciarCategoria(index) {
    categoriaActual = index;
    const categoria = configuracionJuego[nivelActual].categorias[categoriaActual];
    
    document.getElementById('categoria-nombre').textContent = categoria.nombre;
    document.getElementById('parejas-encontradas').textContent = '0';
    document.getElementById('total-parejas').textContent = categoria.parejas.length;
    
    inicializarJuego();
}

function inicializarJuego() {
    parejasEncontradas = 0;
    tiempoRestante = configuracionJuego[nivelActual].tiempoPorNivel;
    actualizarTemporizador();
    
    const categoria = configuracionJuego[nivelActual].categorias[categoriaActual];
    
    // Crear elementos arrastrables
    crearElementosArrastrables(categoria.parejas);
    
    // Mostrar panel de juego
    ocultarTodosPaneles();
    document.getElementById('juego-principal').style.display = 'block';
    
    // Iniciar temporizador
    if (temporizador) clearInterval(temporizador);
    temporizador = setInterval(actualizarTemporizador, 1000);
}

function crearElementosArrastrables(parejas) {
    const profesionesContainer = document.querySelector('.profesiones-container');
    const herramientasContainer = document.querySelector('.herramientas-container');
    
    profesionesContainer.innerHTML = '';
    herramientasContainer.innerHTML = '';

    // Mezclar parejas
    const parejasAleatorias = [...parejas].sort(() => Math.random() - 0.5);
    
    parejasAleatorias.forEach(pareja => {
        // Crear elemento de profesión
        const profesionEl = crearElementoArrastrable(pareja.profesion, pareja.imagen1, 'profesion');
        profesionesContainer.appendChild(profesionEl);
        
        // Crear elemento de herramienta
        const herramientaEl = crearElementoArrastrable(pareja.herramienta, pareja.imagen2, 'herramienta');
        herramientasContainer.appendChild(herramientaEl);
    });
}

function crearElementoArrastrable(texto, imagen, tipo) {
    const elemento = document.createElement('div');
    elemento.className = 'elemento-arrastrable';
    elemento.draggable = true;
    elemento.dataset.tipo = tipo;
    elemento.dataset.valor = texto;
    
    elemento.innerHTML = `
        <img src="${imagen}" alt="${texto}">
        <span>${texto}</span>
    `;
    
    // Eventos de arrastre
    elemento.addEventListener('dragstart', iniciarArrastre);
    elemento.addEventListener('dragend', finalizarArrastre);
    
    return elemento;
}

// ... (Continúa del código anterior)

// Funciones de arrastre
function iniciarArrastre(e) {
    elementoSeleccionado = e.target;
    e.target.classList.add('arrastrando');
    e.dataTransfer.setData('text/plain', e.target.dataset.valor);
}

function finalizarArrastre(e) {
    e.target.classList.remove('arrastrando');
    elementoSeleccionado = null;
}

function permitirSoltar(e) {
    e.preventDefault();
    if (elementoSeleccionado) {
        const zonaDestino = e.target.closest('.elemento-arrastrable');
        if (zonaDestino && zonaDestino.dataset.tipo !== elementoSeleccionado.dataset.tipo) {
            zonaDestino.classList.add('hover');
        }
    }
}

function manejarSoltar(e) {
    e.preventDefault();
    const zonaDestino = e.target.closest('.elemento-arrastrable');
    
    if (zonaDestino && elementoSeleccionado) {
        verificarPareja(elementoSeleccionado, zonaDestino);
    }
    
    document.querySelectorAll('.elemento-arrastrable').forEach(el => {
        el.classList.remove('hover');
    });
}

function verificarPareja(elemento1, elemento2) {
    const categoria = configuracionJuego[nivelActual].categorias[categoriaActual];
    const pareja = categoria.parejas.find(p => 
        (p.profesion === elemento1.dataset.valor && p.herramienta === elemento2.dataset.valor) ||
        (p.profesion === elemento2.dataset.valor && p.herramienta === elemento1.dataset.valor)
    );
    
    if (pareja) {
        // Pareja correcta
        elemento1.classList.add('correcto');
        elemento2.classList.add('correcto');
        elemento1.draggable = false;
        elemento2.draggable = false;
        parejasEncontradas++;
        puntos += 10;
        document.getElementById('sonido-correcto').play();
        
        actualizarContadores();
        
        // Agregar nueva pareja después de un breve delay
        setTimeout(() => {
            elemento1.remove();
            elemento2.remove();
            agregarNuevaPareja();
        }, 1000);
        
        verificarVictoria();
    } else {
        // Pareja incorrecta
        elemento1.classList.add('incorrecto');
        elemento2.classList.add('incorrecto');
        document.getElementById('sonido-incorrecto').play();
        
        setTimeout(() => {
            elemento1.classList.remove('incorrecto');
            elemento2.classList.remove('incorrecto');
        }, 1000);
        
        puntos = Math.max(0, puntos - 5);
        actualizarContadores();
    }
}



function actualizarContadores() {
    document.getElementById('contador-puntos').textContent = puntos;
    document.getElementById('parejas-encontradas').textContent = parejasEncontradas;
}

function actualizarTemporizador() {
    if (tiempoRestante <= 0) {
        clearInterval(temporizador);
        finalizarJuego(false);
        return;
    }
    
    tiempoRestante--;
    document.getElementById('contador-tiempo').textContent = tiempoRestante;
    
    if (tiempoRestante <= 10) {
        document.getElementById('contador-tiempo').parentElement.classList.add('urgente');
    }
}

function verificarVictoria() {
    const categoria = configuracionJuego[nivelActual].categorias[categoriaActual];
    if (parejasEncontradas === categoria.parejas.length) {
        clearInterval(temporizador);
        finalizarJuego(true);
    }
}

function finalizarJuego(victoria) {
    if (victoria) {
        categoriasCompletadas = Math.max(categoriasCompletadas, categoriaActual + 1);
        mostrarModalVictoria();
    } else {
        mostrarModalDerrota();
    }
}

function mostrarModalVictoria() {
    document.getElementById('sonido-victoria').play();
    document.getElementById('puntos-categoria').textContent = puntos;
    document.getElementById('tiempo-restante').textContent = tiempoRestante;
    document.getElementById('total-parejas-encontradas').textContent = parejasEncontradas;
    document.getElementById('modal-categoria-completada').style.display = 'flex';
}

function mostrarModalDerrota() {
    // Implementar lógica para mostrar modal de derrota
    volverACategorias();
}

function mostrarPista() {
    const categoria = configuracionJuego[nivelActual].categorias[categoriaActual];
    const parejasIncompletas = categoria.parejas.filter(pareja => {
        const profesionEl = document.querySelector(`.elemento-arrastrable[data-valor="${pareja.profesion}"]:not(.correcto)`);
        return profesionEl !== null;
    });
    
    if (parejasIncompletas.length > 0) {
        const pistaAleatoria = parejasIncompletas[Math.floor(Math.random() * parejasIncompletas.length)];
        document.getElementById('texto-pista').textContent = pistaAleatoria.pista;
        document.getElementById('modal-pista').style.display = 'flex';
        
        // Penalización por usar pista
        puntos = Math.max(0, puntos - 2);
        actualizarContadores();
    }
}

function cerrarPista() {
    document.getElementById('modal-pista').style.display = 'none';
}

function siguienteCategoria() {
    if (categoriaActual < configuracionJuego[nivelActual].categorias.length - 1) {
        document.getElementById('modal-categoria-completada').style.display = 'none';
        iniciarCategoria(categoriaActual + 1);
    } else {
        mostrarVictoriaNivel();
    }
}

function mostrarVictoriaNivel() {
    document.getElementById('total-puntos').textContent = puntos;
    document.getElementById('total-categorias').textContent = categoriasCompletadas;
    document.getElementById('modal-victoria').style.display = 'flex';
}

function volverACategorias() {
    clearInterval(temporizador);
    mostrarCategorias();
}

function volverANiveles() {
    clearInterval(temporizador);
    ocultarTodosPaneles();
    document.getElementById('seleccion-nivel').style.display = 'block';
}

function siguienteNivel() {
    if (nivelActual === 'facil') {
        nivelActual = 'intermedio';
        categoriasCompletadas = 0;
        mostrarCategorias();
    } else {
        volverANiveles();
    }
    document.getElementById('modal-victoria').style.display = 'none';
}

// Inicializar eventos de arrastre en contenedores
document.addEventListener('DOMContentLoaded', () => {
    const containers = ['.profesiones-container', '.herramientas-container'];
    containers.forEach(container => {
        const el = document.querySelector(container);
        if (el) {
            el.addEventListener('dragover', permitirSoltar);
            el.addEventListener('drop', manejarSoltar);
        }
    });
});
