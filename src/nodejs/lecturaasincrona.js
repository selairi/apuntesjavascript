// Archivo lecturaasincrona.js

// Se importa el módulo fs
const fs = require('fs');

console.log('Se lee el archivo mates.js');

fs.readFile('mates.js', 'utf-8' ,(err, data) => {
    // Si hay un error en la lectura se lanza una excepción
    if (err) throw err;
    // Si el archivo se ha leído correctamente, se muestra el contenido
    console.log(data);
});

console.log('¿Fin de la lectura del archivo?');