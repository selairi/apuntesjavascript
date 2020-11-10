
var paginas = [
    {url : 'index.html', titulo : 'Introducción', id : 'inicio'},
    {url : 'variables.html', titulo : 'Variables', id : 'variables'},
    {url : 'control_flujo.html', titulo : 'Control de flujo', id : 'control_flujo'},
    {url : 'funciones.html', titulo : 'Funciones', id : 'funciones'},
    {url : 'objetos.html', titulo : 'Objetos', id : 'objetos'},
    {url : 'estructuras_datos.html', titulo : 'Estructuras de datos', id : 'estructuras_datos'},
    {url : 'nodejs.html', titulo : 'Node.js', id : 'nodejs'},
    {url : 'electron.html', titulo : 'Electron', id : 'electron'}
];

function pre_pagina(titulo, id)
{
    document.title = titulo;
    var enlaces = '';
    for(var n=0; n<paginas.length; n++) {
        var color = id == paginas[n].id ? ' w3-black' : '';
        enlaces += '<a href="'+paginas[n].url+'" class="w3-bar-item'+color+' w3-button">'+paginas[n].titulo+'</a>';
    }
    document.write(`
        <script src="ace/ace.js" type="text/javascript" charset="utf-8"></script>
        <!-- Barra lateral que se oculta al redimensionar la pagina -->
        <div class="w3-sidebar w3-bar-block w3-collapse w3-card-2 w3-animate-left" style="width:200px;" id="mySidebar">
          <button class="w3-bar-item w3-button w3-large w3-hide-large" onclick="w3_close()">Cerrar ×</button>
          <div class="w3-blue w3-hide-medium w3-hide-small">
            <h3>Menú lateral</h3>
          </div>
          `+enlaces+`
        </div>

        <!-- Inicio del div principal -->
        <div class="w3-main" style="margin-left:220px; margin-right:20px">
            <!-- Botón y título de la página principal-->
            <div class="w3-blue" >
              <div class="w3-container">
                <h1>
                     <button class="w3-button w3-blue w3-xlarge w3-hide-large w3-hover-white" onclick="w3_open()">☰</button>
                     `+titulo+`
                </h1>
              </div>
            </div>
            <div id='_indice'>
            </div>
            <div>
    `);
}

function post_pagina(titulo, id)
{
    var enlaces = '', pos = -1, n;
    for(n=0; n<paginas.length; n++) {
        if(paginas[n].id == id) {
            if(n > 0)
                enlaces += '<a href="'+paginas[n-1].url+'" class="w3-green w3-button">Anterior: '+paginas[n-1].titulo+'</a>';
            if(n+1 < paginas.length)
                enlaces += ' <a href="'+paginas[n+1].url+'" class="w3-green w3-button">Siguiente: '+paginas[n+1].titulo+'</a>';
            break;
        }
    }
    document.write(`
                <br/>
                `+enlaces+`
            </div>
        </div>
    `);

    var sublista = 0, titulo, titulos = document.querySelectorAll('h1, h2');
    enlaces = '<p>Índice de contenidos:</p><ol>';
    for(n=1;n<titulos.length;n++) {
        titulo = titulos[n];
        if(titulo.id.length == 0)
            titulo.id = '__' + n;
        if(titulo.tagName == 'H1') {
            while(sublista > 0) {
                enlaces += '</ol>';
                sublista--;
            }
            enlaces += '<li><a href="#' + titulo.id + '">' + titulo.textContent + '</a></li>';
        } else if(titulo.tagName == 'H2') {
            if(sublista == 0) {
                enlaces += '<ol>';
                sublista = 1;
            } else while(sublista > 1) {
                enlaces += '</ol>';
                sublista--;
            }
            enlaces += '<li><a href="#' + titulo.id + '">' + titulo.textContent + '</a></li>';
        }
    }
    while(sublista-- > 0) {
        enlaces += '</ul>';
    }
    enlaces += '</ul>';
    document.getElementById('_indice').innerHTML = enlaces;
}

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

function text2html(text)
{
    var reamp = new RegExp("&", 'g');
    var relt = new RegExp("<", 'g');
    var regt = new RegExp(">", 'g');
    return text.replace(reamp, '&amp;').replace(regt, '&gt;').replace(relt, '&lt;');
}

function insertar_codigo(pagina, id)
{
    var myRequest = new Request(pagina);
    fetch(myRequest).then(function(response) {
      return response.text().then(function(text) {
        document.getElementById(id).innerHTML='<pre>'+text2html(text)+'</pre>'+
            '<a class="w3-button w3-green" href="'+pagina+'" target="blank"> Abrir en una pestaña: '+pagina+'</a><br/>';
      });
    });
}