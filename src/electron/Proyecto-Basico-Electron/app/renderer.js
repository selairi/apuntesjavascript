function enviar() {
	var texto = document.getElementById('texto').value;
	window.ipcRendererer.send('guardar', texto);
};

window.ipcRendererer.on('resultado', (event, respuesta, error) => {
	console.log(respuesta);
	if(error)
	   alert("Error " +respuesta);
	else
	   alert(respuesta);
});
