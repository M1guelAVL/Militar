document.addEventListener("DOMContentLoaded", function() {

    var urlParams = new URLSearchParams(window.location.search);
    var curp = urlParams.get('curp');
    console.log(curp);

    document.getElementById("cambiarContraseñaForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        // Obtener las contraseñas ingresadas por el usuario
        var nuevaContraseña = document.getElementById("nuevaContraseña").value;
        var confirmarContraseña = document.getElementById("confirmarContraseña").value;

        // Verificar si las contraseñas coinciden
        if (nuevaContraseña !== confirmarContraseña) {
            alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
            return; // Detener la ejecución del código
        }


        // Obtener el objeto JSON del localStorage utilizando el CURP como clave
        var userDataJSON = localStorage.getItem(curp);

        if (userDataJSON) {
            // Parsear el objeto JSON almacenado en un objeto JavaScript
            var userData = JSON.parse(userDataJSON);
            
            // Actualizar la contraseña en el objeto JavaScript
            userData.pass = nuevaContraseña;

            // Convertir el objeto JavaScript actualizado a JSON y guardar nuevamente en el localStorage
            localStorage.setItem(curp, JSON.stringify(userData));

            alert("Contraseña cambiada exitosamente.");
            window.location.href = "inicioSesion.html";
        } else {
            alert("No se encontraron datos para el CURP especificado en el localStorage.");
        }
    });
});

/*$(document).ready(function(){
    // Cuando se hace clic en el botón "Perfil"
    $('#perfil').click(function(){
        // Alternar la visibilidad de los divs
        $('#div_comprobar').toggle();
        $('#div_asistencia').toggle();
    });
}); */