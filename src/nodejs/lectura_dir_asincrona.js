// Archivo lectura_dir_asincrona.js

// Se importa el módulo fs
const fs = require('fs');

console.log('\nLectura asíncrona:');

// Se abre la carpeta actual
var dirA = fs.opendirSync('.', 'utf-8');

// Esta es la función que se va a ejecutar en cada entrada
function leerEntradas(entrada) {
    if(entrada != null) {
        if(entrada.isDirectory())
            console.log('Directorio: ' + entrada.name);
        else if(entrada.isFile())
            console.log('Archivo: ' + entrada.name);
        // Se solicita leer la siguiente entrada
        dirA.read().then(leerEntradas);
    }
}

// Se ejecuta el método read que devuelve un objeto Promise
// y se le indica la función a ejecutar de forma asíncrona
dirA.read().then(leerEntradas);

// El resto del script continúa su ejecución
console.log('Fin del script');
