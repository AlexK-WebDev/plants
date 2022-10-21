<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('en', 'phpmailer/language');
    $mail->IsHTML(true);

    //От кого письмо
    $mail->setFrom('kuts.webdev@gmail.com', 'Garden Designs');

    //Кому отправить
    $mail->addAddress('kuts.aleksey@gmail.com');

    //Тело письма
    $mail->Subject = 'New client!';
    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>;
    }
    if(trim(!empty($_POST['phone']))){
        $body.='<p><strong>Phone Number:</strong> '.$_POST['phone'].'</p>;
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>;
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Message:</strong> '.$_POST['message'].'</p>;
    }

    $mail->Body = $body;

    //Отправляем
    if (!$mail->send()){
        $message = 'Error!';
    } else {
        $message = 'Sent!'
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);

?>
    
