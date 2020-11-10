
let nombreArchivo = '';

function cambiarArchivo(archivo) {
    nombreArchivo = archivo;
    if(archivo === '')
        document.title = "Editor: Sin título";
    else
        document.title = "Editor: " + nombreArchivo;
}

////////////////////////////////////////////////////////////////////////
// Comunicaciones con "main.js"
////////////////////////////////////////////////////////////////////////

window.ipcRendererer.on('resultado', (event, respuesta, error) => {
	console.log(respuesta);
	if(error)
	   alert("Error: " +respuesta);
	else
	   alert(respuesta);
});

window.ipcRendererer.on('archivo', (event, archivo, texto) => {
    cambiarArchivo(archivo);
    document.getElementById('texto').value = texto;
});

window.ipcRendererer.on('guardar', (event) => {
    if(nombreArchivo === '')
        window.ipcRendererer.send('guardar-como');
    else {
        var texto = document.getElementById('texto').value;
        window.ipcRendererer.send('guardar', nombreArchivo, texto);
	}
});

window.ipcRendererer.on('guardar-como', (event, archivo) => {
    cambiarArchivo(archivo);
    var texto = document.getElementById('texto').value;
	window.ipcRendererer.send('guardar', nombreArchivo, texto);
});


////////////////////////////////////////////////////////////////////////
// Se inicializa el nombre del archivo
////////////////////////////////////////////////////////////////////////

cambiarArchivo("");