// Se crea el navegador con electron

const electron = require('electron');
const app = electron.app;  // Modulo que controla la vida de la aplicación
const BrowserWindow = electron.BrowserWindow;  // Modulo para crear la ventana del navegador
const ipcMain = electron.ipcMain; // Módulo para controlar las comunicaciones

const path = require('path');
const url = require('url');


// Se crea una variable global para la ventana del navegador. Si no, se podría cerrar cuando
// javascript liberase la memoria.
let mainWindow;

// Cerrar la aplicación cuando todas las ventanas se cierran
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') // OS X
    app.quit();
});

function createWindow() {
  // Crea la ventana del navegador
  mainWindow = new BrowserWindow(
			{
				width: 960, // Anchura y altura de la ventana del navegador
				height: 660,
				webPreferences: {
					nodeIntegration: false, // Se desactiva el uso de require en el navegador
					preload: `${__dirname}/preload.js` // Se ejecuta preload.js para compartir objetos entre el navegador y main.js
					}
			});

  // Se carga el index.html en el navegador
  mainWindow.webContents.loadFile('../html/index.html');
  // Se activan las Developer Tools:
  mainWindow.webContents.openDevTools(); // NO OLVIDAR COMENTAR ESTA LÍNEA PARA PRODUCCIÓN
  // Se oculta la barra de menú:
  mainWindow.setMenuBarVisibility(false);

  // Se captura el evento del cierre de la ventana
  mainWindow.on('closed', () => {
    // La ventana se ha cerrado, se deberían hacer las tareas correspondientes
    // En este caso sólo se elimina el objeto de Javascript
    mainWindow = null;
  });
}

// Cuando la aplicación está disponible se llama a la función para crear la ventana del navegador
app.on('ready', createWindow);

app.on('activate', function () {
  // En OS X es común volver a crear una ventana en la aplicación
  // cuando el icono del dock es pulsado y no hay otra ventana
  // abierta
  if (mainWindow === null) {
    createWindow();
  }
});



///////////////////////////////////////////////////////////////////////////////
// Comunicaciones con renderer
///////////////////////////////////////////////////////////////////////////////

const fs = require('fs');


ipcMain.on("guardar", (event, texto) => {
    console.log('Texto recibido: ' + texto);
    fs.writeFile('salida1.txt', texto, 'utf-8' ,(err) => {
        // Si hay un error en la escritura, se comunica a "renderer.js"
        if (err)
            mainWindow.webContents.send('resultado', err.toString(), true);
        else {
            console.log("El archivo salida1.txt se ha guardado correctamente");
            mainWindow.webContents.send('resultado', "El archivo salida1.txt se ha guardado correctamente", false);
        }
    });
});

