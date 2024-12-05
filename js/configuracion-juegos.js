// Configuración global de categorías y niveles para todos los juegos
const configuracionJuegos = {
    // Configuración para Word Search (Sopa de Letras)
    sopaLetras: {
        facil: {
            tamanoTablero: 8,
            categorias: {
                colores: {
                    titulo: "Colors",
                    icono: "🎨",
                    palabras: ['RED', 'BLUE', 'GREEN', 'PINK', 'BLACK']
                },
                animales: {
                    titulo: "Animals",
                    icono: "🦁",
                    palabras: ['CAT', 'DOG', 'BIRD', 'FISH', 'LION']
                },
                numeros: {
                    titulo: "Numbers",
                    icono: "🔢",
                    palabras: ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']
                },
                profesiones: {
                    titulo: "Jobs",
                    icono: "👨‍💼",
                    palabras: ['CHEF', 'NURSE', 'PILOT', 'ACTOR', 'BAKER']
                },
                frutas: {
                    titulo: "Fruits",
                    icono: "🍎",
                    palabras: ['APPLE', 'PEAR', 'GRAPE', 'PLUM', 'PEACH']
                },
                transportes: {
                    titulo: "Transport",
                    icono: "🚗",
                    palabras: ['CAR', 'BUS', 'BIKE', 'TRAIN', 'PLANE']
                }
            }
        },
        intermedio: {
            tamanoTablero: 12,
            categorias: {
                colores: {
                    titulo: "Colors",
                    icono: "🎨",
                    palabras: ['PURPLE', 'ORANGE', 'YELLOW', 'BROWN', 'WHITE', 'VIOLET', 'GOLDEN', 'SILVER']
                },
                animales: {
                    titulo: "Animals",
                    icono: "🦁",
                    palabras: ['TIGER', 'ZEBRA', 'MONKEY', 'GIRAFFE', 'PENGUIN', 'ELEPHANT', 'DOLPHIN', 'KANGAROO']
                },
                numeros: {
                    titulo: "Numbers",
                    icono: "🔢",
                    palabras: ['ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN']
                },
                profesiones: {
                    titulo: "Jobs",
                    icono: "👨‍💼",
                    palabras: ['TEACHER', 'DOCTOR', 'ENGINEER', 'DENTIST', 'MECHANIC', 'PAINTER', 'PLUMBER', 'WRITER']
                },
                frutas: {
                    titulo: "Fruits",
                    icono: "🍎",
                    palabras: ['BANANA', 'ORANGE', 'MANGO', 'PAPAYA', 'CHERRY', 'LEMON', 'COCONUT', 'KIWI']
                },
                transportes: {
                    titulo: "Transport",
                    icono: "🚗",
                    palabras: ['TRUCK', 'PLANE', 'SHIP', 'SUBWAY', 'TAXI', 'HELICOPTER', 'SCOOTER', 'TRACTOR']
                }
            }
        }
    },

    // Configuración para Memory Match
    memoriaCartas: {
        facil: {
            parejas: 10,
            categorias: {
                colores: {
                    titulo: "Colors",
                    icono: "🎨",
                    items: [
                        { nombre: 'RED', imagen: 'imagenes/memoria/colores/rojo.png' },
                        { nombre: 'BLUE', imagen: 'imagenes/memoria/colores/azul.png' },
                        { nombre: 'GREEN', imagen: 'imagenes/memoria/colores/verde.png' },
                        { nombre: 'YELLOW', imagen: 'imagenes/memoria/colores/amarillo.png' },
                        { nombre: 'PINK', imagen: 'imagenes/memoria/colores/rosa.png' }
                    ]
                },
                // ... otras categorías similares
            }
        },
        intermedio: {
            parejas: 20,
            categorias: {
                // ... configuración similar con más parejas
            }
        }
    },

    // Configuración para Job Match
    empleos: {
        facil: {
            parejas: 5,
            categorias: {
                escuela: {
                    titulo: "School Jobs",
                    icono: "🏫",
                    parejas: [
                        { profesion: "Teacher", herramienta: "Books" },
                        { profesion: "Principal", herramienta: "Office" },
                        { profesion: "Librarian", herramienta: "Library" }
                    ]
                },
                // ... otras categorías
            }
        },
        intermedio: {
            parejas: 8,
            categorias: {
                // ... más categorías y parejas
            }
        }
    },

    // Configuración para Vowel Adventure
    vocales: {
        facil: {
            categorias: {
                animales: {
                    titulo: "Animals",
                    icono: "🦁",
                    palabras: [
                        { palabra: 'CAT', imagen: 'imagenes/vocales/animales/cat.png' },
                        { palabra: 'DOG', imagen: 'imagenes/vocales/animales/dog.png' },
                        { palabra: 'BIRD', imagen: 'imagenes/vocales/animales/bird.png' },
                        { palabra: 'FISH', imagen: 'imagenes/vocales/animales/fish.png' },
                        { palabra: 'BEAR', imagen: 'imagenes/vocales/animales/bear.png' }
                    ]
                },
                colores: {
                    titulo: "Colors",
                    icono: "🎨",
                    palabras: [
                        { palabra: 'RED', imagen: 'imagenes/vocales/colores/red.png' },
                        { palabra: 'BLUE', imagen: 'imagenes/vocales/colores/blue.png' },
                        { palabra: 'GREEN', imagen: 'imagenes/vocales/colores/green.png' },
                        { palabra: 'BLACK', imagen: 'imagenes/vocales/colores/black.png' },
                        { palabra: 'WHITE', imagen: 'imagenes/vocales/colores/white.png' }
                    ]
                },
                numeros: {
                    titulo: "Numbers",
                    icono: "🔢",
                    palabras: [
                        { palabra: 'ONE', imagen: 'imagenes/vocales/numeros/one.png' },
                        { palabra: 'TWO', imagen: 'imagenes/vocales/numeros/two.png' },
                        { palabra: 'THREE', imagen: 'imagenes/vocales/numeros/three.png' },
                        { palabra: 'FOUR', imagen: 'imagenes/vocales/numeros/four.png' },
                        { palabra: 'FIVE', imagen: 'imagenes/vocales/numeros/five.png' }
                    ]
                },
                frutas: {
                    titulo: "Fruits",
                    icono: "🍎",
                    palabras: [
                        { palabra: 'APPLE', imagen: 'imagenes/vocales/frutas/apple.png' },
                        { palabra: 'GRAPE', imagen: 'imagenes/vocales/frutas/grape.png' },
                        { palabra: 'PEAR', imagen: 'imagenes/vocales/frutas/pear.png' },
                        { palabra: 'PEACH', imagen: 'imagenes/vocales/frutas/peach.png' },
                        { palabra: 'PLUM', imagen: 'imagenes/vocales/frutas/plum.png' }
                    ]
                }
            }
        },
        intermedio: {
            categorias: {
                animales: {
                    titulo: "Animals",
                    icono: "🦁",
                    palabras: [
                        { palabra: 'TIGER', imagen: 'imagenes/vocales/animales/tiger.png' },
                        { palabra: 'ZEBRA', imagen: 'imagenes/vocales/animales/zebra.png' },
                        { palabra: 'MONKEY', imagen: 'imagenes/vocales/animales/monkey.png' },
                        { palabra: 'GIRAFFE', imagen: 'imagenes/vocales/animales/giraffe.png' },
                        { palabra: 'PENGUIN', imagen: 'imagenes/vocales/animales/penguin.png' }
                    ]
                },
                colores: {
                    titulo: "Colors",
                    icono: "🎨",
                    palabras: [
                        { palabra: 'PURPLE', imagen: 'imagenes/vocales/colores/purple.png' },
                        { palabra: 'ORANGE', imagen: 'imagenes/vocales/colores/orange.png' },
                        { palabra: 'YELLOW', imagen: 'imagenes/vocales/colores/yellow.png' },
                        { palabra: 'BROWN', imagen: 'imagenes/vocales/colores/brown.png' },
                        { palabra: 'WHITE', imagen: 'imagenes/vocales/colores/white.png' }
                    ]
                },
                numeros: {
                    titulo: "Numbers",
                    icono: "🔢",
                    palabras: [
                        { palabra: 'ELEVEN', imagen: 'imagenes/vocales/numeros/eleven.png' },
                        { palabra: 'TWELVE', imagen: 'imagenes/vocales/numeros/twelve.png' },
                        { palabra: 'THIRTEEN', imagen: 'imagenes/vocales/numeros/thirteen.png' },
                        { palabra: 'FOURTEEN', imagen: 'imagenes/vocales/numeros/fourteen.png' },
                        { palabra: 'FIFTEEN', imagen: 'imagenes/vocales/numeros/fifteen.png' }
                    ]
                },
                frutas: {
                    titulo: "Fruits",
                    icono: "🍎",
                    palabras: [
                        { palabra: 'BANANA', imagen: 'imagenes/vocales/frutas/banana.png' },
                        { palabra: 'ORANGE', imagen: 'imagenes/vocales/frutas/orange.png' },
                        { palabra: 'MANGO', imagen: 'imagenes/vocales/frutas/mango.png' },
                        { palabra: 'PAPAYA', imagen: 'imagenes/vocales/frutas/papaya.png' },
                        { palabra: 'CHERRY', imagen: 'imagenes/vocales/frutas/cherry.png' }
                    ]
                }
            }
        }
    }
}; 