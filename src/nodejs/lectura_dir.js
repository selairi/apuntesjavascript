// Archivo lectura_dir.js

// Se importa el módulo fs
const fs = require('fs');

console.log('\nLectura síncrona:');

// Se abre la carpeta actual
var dirS = fs.opendirSync('.', 'utf-8');
//Se lee la primera entrada de la carpeta
var entrada = dirS.readSync();
while(entrada != null) { // Se ejecuta mientras no se llegue al final
    // Se comprueba si la entrada es un directorio
    if(entrada.isDirectory())
        console.log('Directorio: ' + entrada.name); // Con la propiedad name se lee el nombre del archivo o directorio
    // Se comprueba si es un archivo
    else if(entrada.isFile())
        console.log('Archivo: ' + entrada.name);
    entrada = dirS.readSync();
}
// Se cierra el directorio
dirS.close();

console.log('Fin del script');
