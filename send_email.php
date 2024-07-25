<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $name = $_POST['first_name'];
    $apellido = $_POST['last_name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Dirección de correo electrónico a la que se enviará el mensaje
    $to = "lucia.pereira.brusciani@gmail.com";
    $subject = "Nuevo mensaje de contacto de " . $name;
    $body = "Nombre: " . $name . "\n";
    $body = "Apellido: " . $apellido . "\n";
    $body .= "Correo Electrónico: " . $email . "\n";
    $body .= "Mensaje: \n" . $message;

    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado con éxito.";
    } else {
        echo "Error al enviar el mensaje.";
    }
} else {
    echo "Solicitud no válida.";
}
?>