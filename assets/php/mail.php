<?php
  require '../../vendor/autoload.php';
  use Mailgun\Mailgun;
  $mgClient = new Mailgun('pubkey-f9b47f60b5e823fe809bc0df1d64e505');
  $domain = "mg.atacama.isolant.com.ar";

  $mgClient->sendMessage($domain, array(
    'from'    => 'isolant@mg.atacama.isolant.com.ar',
    'to'      => 'juanmartingarcia1991@gmail.com',
    'subject' => 'The PHP SDK is awesome!',
    'text'    => 'It is so simple to send a message.'
  ));

  echo 'test';
?>