
// Obtén la URL actual
const urlActual = window.location.href;

// Verifica si el parámetro 'nombre' ya está presente en la URL
var parametros = new URLSearchParams(window.location.search);
var carpetaNombre = parametros.get("nombre");


if (!carpetaNombre) {
    // Si 'nombre' no está presente, genera un número aleatorio
    carpetaNombre = generarCadenaAleatoria();
    // Agrega el parámetro 'nombre' a la URL
    const urlConParametro = urlActual.includes("?") ? `${urlActual}&nombre=${carpetaNombre}` : `${urlActual}?nombre=${carpetaNombre}`;
    // Redirige a la nueva URL con el parámetro 'nombre'
    window.location.href = urlConParametro;
} else {
    // Extrae el valor del parámetro de la URL
    const parametros = new URLSearchParams(window.location.search);
    const carpetaNombre = parametros.get("nombre");

    // Llama a la función para crear la carpeta con el nombre obtenido
    function crearCarpeta(carpetaNombre) {
    $.ajax({
        url: 'crearCarpeta.php', // Ruta del archivo PHP que crea la carpeta
        type: 'POST', // Puedes usar POST o GET según tus necesidades
        data: { nombreCarpeta: carpetaNombre }, // Envía el nombre de la carpeta como datos
        success: function(response) {
            console.log('Carpeta creada.'); // Mensaje de éxito (puedes personalizarlo)
        },
        error: function() {
            console.log('Error al crear la carpeta.'); // Mensaje de error (puedes personalizarlo)
        }
    });
}
    
}

// Función para generar un número aleatorio de 3 dígitos
function generarCadenaAleatoria() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '';
    for (let i = 0; i < 3; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        cadenaAleatoria += caracterAleatorio;
    }
    return cadenaAleatoria;
}

// Escucha cambios en localStorage
window.addEventListener('storage', function (event) {
    if (event.key === 'filesUpdated') {
        console.log('Evento storage detectado, recargando...');
        location.reload();
    }
});
// Función para notificar actualización
function notifyFileUpdate() {
    localStorage.setItem('filesUpdated', Date.now());
}

// //BARRA DE PROGRESO 
function uploadFile(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    var archivoInput = document.getElementById('archivo');
    var archivo = archivoInput.files[0];
    var progressBar = document.getElementById('progressBar');

    if (!archivo) {
        alert('Por favor, selecciona un archivo.');
        return;
    }

    var formData = new FormData();
    formData.append('archivo', archivo);

    var xhr = new XMLHttpRequest();

    // Mostrar la barra de progreso
    progressBar.style.display = 'block';

    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            var percentComplete = (event.loaded / event.total) * 100;
            progressBar.value = percentComplete;
        }
    };

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Archivo subido con éxito');
            // Ocultar la barra de progreso cuando termine la carga
            progressBar.style.display = 'none';
            progressBar.value = 0;
            // Notificar a otras ventanas que se subió un archivo
            notifyFileUpdate();
        } else {
            console.error('Error al subir el archivo');
        }
    };

    xhr.open('POST', 'index.php', true);
    xhr.send(formData);
}


//DROP AREA

// Obtén la zona de arrastre y el formulario
const dropArea = document.getElementById('drop-area');
const Form = document.getElementById('form');

// Agrega los siguientes eventos a la zona de arrastre
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    const file = e.dataTransfer.files;
    handleFile(file);
});

// Función para manejar el archivo seleccionado
function handleFile(file) {
    if (file) {
        // Realiza alguna acción, como mostrar el nombre del archivo
        console.log('Archivo seleccionado:', file.name);

        // También puedes realizar otras acciones, como subir el archivo al servidor
        // Puedes agregar aquí el código para subir el archivo si lo deseas
    }
}

// Agrega esta función para manejar el evento de envío del formulario
Form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = Form.querySelector('#archivo');
    const file = fileInput.files[0];
    if (file) {
        // Puedes enviar el archivo al servidor para su procesamiento aquí
        console.log('Subir archivo:', file.name);
    } else {
        alert('Por favor, seleccione un archivo primero.');
    }
});

//progres bar 
