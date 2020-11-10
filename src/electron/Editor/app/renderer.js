function guardar() {
	var texto = document.getElementById('texto').value;
	window.ipcRendererer.send('guardar', texto);
};

function abrir() {
	window.ipcRendererer.send('abrir');
};

window.ipcRendererer.on('resultado', (event, respuesta, error) => {
	console.log(respuesta);
	if(error)
	   alert("Error " +respuesta);
	else
	   alert(respuesta);
});


window.ipcRendererer.on('archivo', (event, texto) => {
	document.getElementById('texto').value = texto;
});