<?php


namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{
     public $email;
     public $nombre;
     public $token;

     public function __construct($nombre, $email, $token)
     {

          $this->nombre = $nombre;
          $this->email = $email;
          $this->token = $token;
     }
     public function enviarConfirmacion()
     {

          //Crear Objeto de email

          $mail = new PHPMailer();
          $mail->isSMTP();
          $mail->Host = 'sandbox.smtp.mailtrap.io';
          $mail->SMTPAuth = true;
          $mail->Port = 2525;
          $mail->Username = '115fd424f1739d';
          $mail->Password = 'aee7e5cda32c0b';

          $mail->setFrom('cuentas@appsalon.com', 'Appsalon.com');
          $mail->addAddress('cuentas@appsalon.com', 'Appsalon.com');
          $mail->Subject = "Confirma tu cuenta";


          //Set HMTL 
          $mail->isHTML(TRUE);
          $mail->CharSet = 'UTF-8';

          $contenido = "<html>";
          $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has creado tu cuenta en AppsALON, Solo debes confirmala presionando el siguiente enlance</p>";
          $contenido .= "<p>Presiona aqui: <a href='http://localhost:3000/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a></p>";
          $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
          $contenido .= "</html>";

          $mail->Body = $contenido;

          //Enviar el email

          $mail->send();
     }

     public function enviarInstrucciones()
     {

          //Crear Objeto de email

          $mail = new PHPMailer();
          $mail->isSMTP();
          $mail->Host = 'sandbox.smtp.mailtrap.io';
          $mail->SMTPAuth = true;
          $mail->Port = 2525;
          $mail->Username = '115fd424f1739d';
          $mail->Password = 'aee7e5cda32c0b';

          $mail->setFrom('cuentas@appsalon.com', 'Appsalon.com');
          $mail->addAddress('cuentas@appsalon.com', 'Appsalon.com');
          $mail->Subject = "Restablece tu password";


          //Set HMTL 
          $mail->isHTML(TRUE);
          $mail->CharSet = 'UTF-8';

          $contenido = "<html>";
          $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has solicitado reestablecer tu password, sigue el siguiente enlance para hacerlo </p>";
          $contenido .= "<p>Presiona aqui: <a href='http://localhost:3000/recuperar?token=" . $this->token . "'>Reestablecer Password</a></p>";
          $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
          $contenido .= "</html>";

          $mail->Body = $contenido;

          //Enviar el email

          $mail->send();
     }
}
