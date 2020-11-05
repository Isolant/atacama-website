<?php
  require '../../vendor/autoload.php';
  use Mailgun\Mailgun;
  $mg = Mailgun::create('pubkey-f9b47f60b5e823fe809bc0df1d64e505');

  $domain = 'mg.isolant.com.ar';
  $params = array(
    'from'    => 'Isolant Aislantes <isolant@isolant.com.ar>',
    'to'      => 'hello@juangarcia.com.ar',
    'subject' => 'Hello',
    'text'    => 'Testing some Mailgun awesomness!'
  );

  $mg->messages()->send($domain, $params);

  echo 'sent';
?>