<?php
  // Require dependencies
  require '../../vendor/autoload.php';
  use Mailgun\Mailgun;

  // Get the data from the form
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $location = $_POST['location'];
  $message = $_POST['message'];
  
  // Create the html structure
  $htmlContent = "
    Informaci&oacute;n de contacto:
    <br /><br />
    Nombre: ".$name."
    <br />
    Email: ".$email."
    <br />
    Telefono: ".$phone."
    <br />
    Provincia: ".$location."
    <br />
    Consulta: ".$message."
  ";

  // Create MG client
  $mg = Mailgun::create('c75442aa270507406a690e15dddf33fa-0e6e8cad-8c68a9f4');

  // Configure the email
  $domain = 'mg.isolant.com.ar';
  $params = array(
    'from'    => 'Landing Atacama <isolant@isolant.com.ar>',
    'to'      => 'marketing@isolant.com.ar',
    "h:Reply-To" => "{$email}",
    'subject' => 'Nuevo correo enviado desde website Atacama',
    "html" => "{$htmlContent}"
  );

  // Send the email
  $mg->messages()->send($domain, $params);

  // Redirect the user
  header('Location: /gracias.html');
?>