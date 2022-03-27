// Valores a exportar
let a = 1;
const objeto = {
  a: 1,
  sumar: function(a) {
    this.a += a;
    return this.a;
  }
};

// Valores que no se exportarán
let b = 2;
var c = 3;

// Dentro del módulo se pueden ejercutar operaciones
objeto.sumar(1);
// Se puede modificar el DOM
document.getElementById('p1').innerHTML = 'objeto.a = ' + objeto.a;
// document.write() no funciona desde un módulo
// La siguiente línea no se ejecuta y genera un error en la consola de errores:
document.write(c);

// Con export se indican las variables, funciones u objetos que se exportarán
export {a, objeto};
