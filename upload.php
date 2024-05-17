<?php
$uploadDir = 'usuarios/';

// Obtener el nombre del usuario, asumiendo que se pasa como parámetro POST
$username = $_POST['username'];
$userDir = $uploadDir . $username . '/';

// Crear la carpeta del usuario si no existe
if (!file_exists($userDir)) {
    mkdir($userDir, 0777, true);
}

$files = $_FILES;

foreach ($files as $file) {
    $fileName = basename($file['name']);
    $filePath = $userDir . $fileName;
    $fileSize = $file['size'];
    $fileType = $file['type'];

    // Verificar el tamaño del archivo
    if (($fileType === "application/pdf" && $fileSize > 300 * 1024) || 
        (($fileType === "image/jpeg" || $fileType === "image/png") && $fileSize > 2 * 1024 * 1024)) {
        echo "<script>alert('El archivo $fileName supera el límite de tamaño permitido.'); window.history.back();</script>";
        exit();
    }

    // Mover el archivo a la carpeta del usuario
    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        echo "El archivo $fileName ha sido subido exitosamente.<br>";
    } else {
        echo "Hubo un error al subir el archivo $fileName.<br>";
    }
}
?>
