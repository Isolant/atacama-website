<?php
  require '../../vendor/autoload.php';
  use Mailgun\Mailgun;
  $mailgun = Mailgun::create('c75442aa270507406a690e15dddf33fa-0e6e8cad-8c68a9f4');

  $mailgun->messages()->send('mg.isolant.com.ar', [
    'from'    => 'isolant@isolant.com.ar',
    'to'      => 'hello@juangarcia.com.ar',
    'subject' => 'The PHP SDK is awesome!',
    'text'    => 'It is so simple to send a message.'
  ]);
?>