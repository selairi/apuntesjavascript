// Archivo escritura.js

// Se importa el módulo fs
const fs = require('fs');

var texto="Este es el texto que se va a guardar en el archivo.";

// Se escribe el archivo de forma asíncrona con fs.writeFile(file, data[, options], callback)
// file es la ruta del archivo
// data es lo que se va a guardar en el archivo
// options generalmente se indica la codificación
// callback es la función que se ejecutará cuando el archivo haya sido guardado

fs.writeFile('salida1.txt', texto, 'utf-8' ,(err) => {
    // Si hay un error en la lectura se lanza una excepción
    if (err) throw err;
    console.log("El archivo salida1.txt se ha guardado correctamente");
});


// Se escribe el archivo de forma síncrona con fs.writeFileSync(file, data[, options])
// file es la ruta del archivo
// data es lo que se va a guardar en el archivo
// options generalmente se indica la codificación

try {
    fs.writeFileSync('salida2.txt', texto, 'utf-8');
    console.log("El archivo salida2.txt se ha guardado correctamente");
} catch(err) {
    console.log("Error al escribir el archivo salida2.txt");
}
