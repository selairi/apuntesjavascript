// Se crea el navegador con electron

const electron = require('electron');
const app = electron.app;  // Modulo que controla la vida de la aplicación
const BrowserWindow = electron.BrowserWindow;  // Modulo para crear la ventana del navegador
const dialog = electron.dialog; // Módulo para crear ventanas de diálogo
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
          contextIsolation: false, // Se permite enviar mensajes entre el navegador y main.js
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


ipcMain.on("guardar", async (event, texto) => {
    const archivo = await dialog.showSaveDialog(mainWindow, {
        properties: ['openFile'],
        title: 'Guardar',
        filters: [ { name: 'Text Files', extensions: ['txt'] }, { name: 'All', extensions: ['*'] } ]
    });
    console.log(archivo);
    // Se comprueba que el usuario no ha pulsado el botón cancelar
    if(!archivo.canceled) {
        fs.writeFile(archivo.filePath, texto, 'utf-8' ,(err) => {
            if (err)
                // Si hay un error en la escritura, se comunica a "renderer.js"
                mainWindow.webContents.send('resultado', err.toString(), true);
            else {
                // El archivo se ha guardado correctamente
                mainWindow.webContents.send('resultado', "El archivo se ha guardado correctamente", false);
            }
        });
    }
});

ipcMain.on("abrir", async (event) => {
    const archivos = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        title: 'Abrir',
        filters: [ { name: 'Text Files', extensions: ['txt'] }, { name: 'All', extensions: ['*'] } ]
    });
    console.log(archivos);
    // Se comprueba que el usuario no ha pulsado el botón cancelar
    if(!archivos.canceled) {
        fs.readFile(archivos.filePaths[0], 'utf-8' ,(err, texto) => {
            if (err)
                // Si hay un error en la lectura, se comunica a "renderer.js"
                mainWindow.webContents.send('resultado', err.toString(), true);
            else {
                // El archivo se ha leído correctamente
                mainWindow.webContents.send('archivo', texto);
            }
        });
    }
});
