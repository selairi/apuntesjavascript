import {a,objeto} from "./modulo1.js"

// No funciona document.write() cuando se ejecuta desde un módulo
document.write(a);

console.log("objeto.a = " + objeto.sumar(1));

// No se pueden acceder al las variables no exportadas de otro módulo.
// Si se descomentan las siguientes líneas, se producen errores
//console.log(b);
//console.log(c);
