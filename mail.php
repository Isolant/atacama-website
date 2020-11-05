<?php

// Import PHPMailer classes into the global namespace
require 'phpmailer/PHPMailerAutoload.php';

// Set the information for the email server
$dominio = "atacama.isolant.com.ar";
$email_server = $dominio;
$email_user='test@' . $dominio;
$email_from='test@' . $dominio;
$email_from_name=$_POST['email'];
$asunto='Nuevo contacto sitio web';

// Initialize PHP Mailer
$mail = new PHPMailer();
$mail->isMail();
$mail->setFrom($email_from,$email_from_name);
$mail->isHTML(true);
$mail->Subject = 'test';
$mail->Body = 'body';

// Set recipients
$mail->addAddress('hello@juangarcia.com.ar');
// $mail->addCC('contacto@industriassaladillo.com.ar');

// Send the email
$mail->send();

echo 'test';
?>