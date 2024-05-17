$(document).ready(function() {

	var curpActual;
    if (window.location.href.indexOf('inicioSesion') > -1) {
        var ingresar = $('#ingresar'); 
    
        ingresar.click(function(event) {
            event.preventDefault(); 
            
            var curp = $('#curp').val();
            var password = $('#fpassword').val();
            
            var userDataJSON = localStorage.getItem(curp);
            
            if (userDataJSON) {
                var userData = JSON.parse(userDataJSON);
                
                if (password === userData.pass) {
                    if(userData.cargo === 1){
                        //recluta
                        window.location.href = "Menu.html?curp=" + curp;
                    }
                    if (userData.cargo === 2) {
                        //zona o militar
                        window.location.href = "menuZona.html";
                    }
                    if (userData.cargo === 3) {
                        //ayuntamiento
                        window.location.href = "menuAyuntamiento.html";
                    }
                    if (userData.cargo === 4) {
                        //el mero mole, el mero admin
                        window.location.href = "menuAdmin.html";
                    }
                    if (userData.cargo !== 1 && userData.cargo !== 2 && userData.cargo !== 3 && userData.cargo !== 4) {
                        //el mero mole, el mero admin
                        alert("Este usuario no tiene un cargo definido, procede a ser eliminado, usuario a eliminar: " + userData.curp);
                        localStorage.removeItem(curp);
                    }
                    
                } else {
                    alert('Contraseña incorrecta. Por favor, intenta de nuevo.');
                }
            } else {
                alert('El CURP ingresado no está registrado. Por favor, regístrate primero.');
            }
        });
    }

    if(window.location.href.indexOf('AcercaDe') > -1){
        $('#menu2').accordion({
            collapsible:true,
        });
    }

    if(window.location.href.indexOf('Registrarse') > -1){
        var correo = document.getElementById('Rcorreo');
        var curp = document.getElementById('Rcurp');
        var pass = document.getElementById('Rpassword');
        var confpass = document.getElementById('Rpassword2');
        var registro = document.getElementById('registro');

        function validarCorreo(email) {
            var regex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/;
            return regex.test(email);
        }

        function validarCurp(curp) {
        var regex = /^[A-Z0-9]{18}$/i;
        return regex.test(curp);
    }

        registro.addEventListener('click', function(event) {
            event.preventDefault();

            var correoVal = correo.value.trim();
            var curpVal = curp.value.trim();
            var passVal = pass.value.trim();
            var confpassVal = confpass.value.trim();

            if (!correoVal || !curpVal || !passVal || !confpassVal) {
                alert("Hay campos vacios por llenar, favor de llenarlos todos");
            } else if (!validarCorreo(correoVal)) {
                alert("Correo no cumple con las características. Verifique que contenga '@', parte correspondiente (gmail.com, etc) o que no contenga espacios.");
            } else if (!validarCurp(curpVal)) {
                alert("Curp no cumple con las características. Verifique que contenga 18 caracteres o estar correctamente escrito.");
            } else if (passVal !== confpassVal) {
                alert('La contraseña y la confirmación de contraseña no coinciden.'); 
            } else {
                alta(correoVal, curpVal, passVal, 1);
                console.log("antes de la siguiente página");
                tiempo(3000);
            }
        });
    }

    if (window.location.href.indexOf('ComprobarD') > -1) {
        function verificarArchivo() {
            var archivo = document.getElementById("archivo").files[0];
            if (!archivo) {
                alert("Por favor selecciona el archivo a subir en 'campo en donde no hay archivo'");
                return false;
            }
            return true;
        }
    }

    
    if (window.location.href.indexOf('olvidar') > -1) {
        document.getElementById("olvidarForm").addEventListener("submit", function(event) {
            event.preventDefault(); 
            
            var curp = document.getElementById("Ocurp").value;
            if (curp.trim() === "") {
                alert("Favor de ingresar un CURP");
                return;
            }

            var storedData = localStorage.getItem(curp);

            if (storedData) {
                var parsedData = JSON.parse(storedData);
                var storedCurp = parsedData.curp;
                console.log("CURP almacenado: " + storedCurp);
            } else {
                console.log("No se encontraron datos para el CURP especificado en el localStorage.");
            }

            console.log(curp + " y " + storedCurp);
            if (storedCurp !== curp) {
                alert("CURP no encontrado");
                return;
            }
            
            curpActual = storedCurp;
            console.log(curpActual);
            window.location.href = "cambioContrasena.html?curp=" + encodeURIComponent(curp);
        });
    }

    if (window.location.href.indexOf('CambiarContraseña') > -1) {
        // Seleccionar el formulario de recuperación por su ID
        var formularioRecuperar = $("#Recuperar");

        // Asignar un evento de envío al formulario
        formularioRecuperar.submit(function(event) {
            event.preventDefault(); // Evitar el envío del formulario

            // Mostrar la alerta con el valor de curpActual
            alert(curpActual);
        });
    };



});

 function validateEmail(email) {
        var validDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
        var emailParts = email.split('@');

        if (emailParts.length !== 2) return false;

        var domain = emailParts[1];
        return validDomains.includes(domain);
}


function tiempo(seg){
    setTimeout(function() {
        IS();    
    }, seg);
}
function alta(correo,curp,contrasena,cargo){
    var datos = {
        correo: correo,
        curp: curp,
        pass: contrasena,
        cargo: cargo
    };
    var datosJSON = JSON.stringify(datos);
    localStorage.setItem(curp, datosJSON);
}

function IS(){
    console.log("Se entro a la siguiente pagina");
    window.location.href = "inicioSesion.html";
}

function verificarArchivos() {
    var maxSizePdf = 300 * 1024; // 300 KB en bytes
    var maxSizeM = 1000 * 1024;
    var maxSizeImage = 500 * 1024; // 500 KB en bytes

    var curpArchivo = document.getElementById("CURPpdf").files[0];
    var actaArchivo = document.getElementById("Acta").files[0];
    var comprobanteArchivo = document.getElementById("Comprobante").files[0];
    var comprobanteSArchivo = document.getElementById("ComprobanteS").files[0];
    var comprobanteMArchivo = document.getElementById("ComprobanteM").files[0];
    var ineArchivo = document.getElementById("INE").files[0];
    var fotoArchivo = document.getElementById("foto").files[0];

    if (!curpArchivo || !actaArchivo || !comprobanteArchivo || !comprobanteSArchivo || !ineArchivo || !fotoArchivo || !comprobanteMArchivo) {
        alert("Por favor asegúrate de subir todos los archivos necesarios.");
        return false;
    }

    var errorMessage = "";

    if (curpArchivo.size > maxSizePdf) {
        errorMessage += "El archivo CURP excede el tamaño máximo permitido (300 KB).\n";
    }
    if (actaArchivo.size > maxSizePdf) {
        errorMessage += "El archivo Acta de nacimiento excede el tamaño máximo permitido (300 KB).\n";
    }
    if (comprobanteArchivo.size > maxSizePdf) {
        errorMessage += "El archivo Comprobante de Domicilio excede el tamaño máximo permitido (300 KB).\n";
    }
    if (comprobanteSArchivo.size > maxSizePdf) {
        errorMessage += "El archivo Comprobante de estudios excede el tamaño máximo permitido (300 KB).\n";
    }
    if (ineArchivo.size > maxSizePdf) {
        errorMessage += "El archivo INE excede el tamaño máximo permitido (300 KB).\n";
    }
    if (fotoArchivo.size > maxSizeImage) {
        errorMessage += "El archivo de Fotografía excede el tamaño máximo permitido (500 KB).\n";
    }
    if (comprobanteMArchivo.size > maxSizeM) {
        errorMessage += "El archivo Comprobante de Domicilio excede el tamaño máximo permitido (300 KB).\n";
    }

    if (errorMessage !== "") {
        alert(errorMessage);
        return false;
    }
    console.log("Si se envió");
    return true;
}

$(document).ready(function(){
    // Cuando se hace clic en el botón "Perfil"
    $('#perfil').click(function(){
        // Alternar la visibilidad de los divs
        $('#div_comprobar').toggle();
    });
});

function borrarLocalStorage(){
    localStorage.clear();
}
/*
// Función para agregar un usuario
function agregarUsuario() {
    const correo = document.getElementById('correo').value;
    const curp = document.getElementById('curp').value;
    const contrasena = document.getElementById('contrasena').value;
    const cargo = document.getElementById('cargo').value;

    // Crear objeto de usuario
    const usuario = { correo, curp, contrasena, cargo };

    // Obtener lista de usuarios del almacenamiento local o crear una nueva lista si no existe
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);

    // Guardar lista de usuarios en el almacenamiento local
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Limpiar el formulario
    document.getElementById('altaUsuarioForm').reset();

    // Actualizar la lista de usuarios mostrada
    mostrarUsuarios();
}

        // Función para mostrar la lista de usuarios
function mostrarUsuarios() {
    const listaUsuarios = document.querySelector('.baja.submenu-content');
    listaUsuarios.innerHTML = ''; // Limpiar la lista antes de agregar los usuarios

    // Obtener lista de usuarios del almacenamiento local
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Mostrar cada usuario en la lista
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = `Correo: ${usuario.correo}, CURP: ${usuario.curp}, Cargo: ${usuario.cargo}`;
                
        // Botón para eliminar usuario
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = function() {
            eliminarUsuario(usuario);
        };

        li.appendChild(btnEliminar);
        listaUsuarios.appendChild(li);
    });
}

        // Función para eliminar un usuario
function eliminarUsuario(usuario) {
            // Obtener lista de usuarios del almacenamiento local
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Filtrar la lista para eliminar el usuario seleccionado
    usuarios = usuarios.filter(u => u.correo !== usuario.correo);

    // Actualizar la lista de usuarios en el almacenamiento local
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Actualizar la lista de usuarios mostrada
    mostrarUsuarios();
}

        // Función para alternar la visibilidad de los submenús
function toggleSubmenu(submenuId) {
    const submenus = document.querySelectorAll('.submenu-content');
    submenus.forEach(submenu => {
        if (submenu.classList.contains(submenuId)) {
            submenu.classList.toggle('active');
        } else {
            submenu.classList.remove('active');
        }
    });
}

// Mostrar los usuarios al cargar la página
mostrarUsuarios();  
*/