<?php
  require '../../vendor/autoload.php';
  use Mailgun\Mailgun;
  $mailgun = Mailgun::create('pubkey-f9b47f60b5e823fe809bc0df1d64e505');

  $mailgun->messages()->send('mg.atacama.isolant.com.ar', [
    'from'    => 'isolant@isolant.com.ar',
    'to'      => 'hello@juangarcia.com.ar',
    'subject' => 'The PHP SDK is awesome!',
    'text'    => 'It is so simple to send a message.'
  ]);
?>