// Archivo mates.js

// Se definen algunas funciones y valores
var PI = 3.14159

function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

// Se indica los elementos que se desean exportar:
exports.PI = PI;
exports.suma = suma;
exports.resta = resta;