<?php
  require '../../vendor/autoload.php';
  use Mailgun\Mailgun;
  $mg = Mailgun::create('pubkey-f9b47f60b5e823fe809bc0df1d64e505');

  $mg->messages()->send('mg.isolant.com.ar', [
    'from'    => 'isolant@isolant.com.ar',
    'to'      => 'hello@juangarcia.com.ar',
    'subject' => 'Test',
    'text'    => 'Test body'
  ]);

  echo 'sent';
?>