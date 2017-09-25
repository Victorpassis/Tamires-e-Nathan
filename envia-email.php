<?php
    require_once("classes/class.phpmailer.php");

    $_SERVER["REQUEST_METHOD"] == "POST";
    $tipeEmail = isset($_POST["tipo-email"]) ? trim($_POST["tipo-email"]) : "";

    if($tipeEmail == "presenca") {
        $nome = isset($_POST["nome"]) ? trim($_POST["nome"]) : "";
        $email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
        $telefone = isset($_POST["telefone"]) ? trim($_POST["telefone"]) : "";
        $presenca = isset($_POST["presenca"]) ? trim($_POST["presenca"]) : "";

        if ( empty($nome) || empty($email) || empty($telefone) || empty($presenca) ) {
            echo json_encode(array("msg" => "Alerta!", "text" => "Campos obrigatórios não preenchidos", "type" => "warning"));
            
            die();
        } else {
            $assunto = "Presença enviado atravez do site";
            $mensagem =  "
                <p>Confirmação de presença atravez do site</p>
                <p>
                Nome: $nome<br>            
                E-mail: $email <br>
                Telefone: $telefone <br>
                Presença: $presenca <br>
                </p>
            ";        
        }
    } elseif($tipeEmail == "recado") {
        $nome = isset($_POST["nome"]) ? trim($_POST["nome"]) : "";
        $email = isset($_POST["email"]) ? trim($_POST["email"]) : "";        
        $recado = isset($_POST["recado"]) ? trim($_POST["recado"]) : "";

        if ( empty($nome) || empty($email) || empty($recado) ) {
            echo json_encode(array("msg" => "Alerta!", "text" => "Campos obrigatórios não preenchidos", "type" => "warning"));
            
            die();
        } else {
            $assunto = "Recado enviado atravez do site";
            $mensagem =  "
                <p>Recado enviado atravez do site</p>
                <p>
                Nome: $nome<br>            
                E-mail: $email <br><br>
                Recado: $recado <br>
                </p>
            ";        
        }
    }
    try {
            // Inicia a classe PHPMailer
        $mail = new PHPMailer(true);
        $mail->IsSMTP(); // Define que a mensagem será SMTP

        $mail->Host = 'host';
        $mail->Username = 'Usuario'; // Usuário do servidor SMTP (endereço de email)
        $mail->Password = 'Senha'; // Senha do servidor SMTP (senha do email usado)

        $mail->Port       = 587;
        $mail->SMTPAuth   = true;
        $mail->SMTPSecure = 'tls';

        $mail->CharSet = 'UTF-8';

        $mail->SetFrom('tamiresoliver1@gmail.com', $nome); //Email de envio
        $mail->AddAddress('tamiresoliver1@gmail.com', 'Tamires e Nathan'); //Email de recebimento
        $mail->AddReplyTo($email, $nome); //Email de resposta

        $mail->Subject = $assunto;//Assunto do e-mail
        $mail->MsgHTML($mensagem);//Mensagem do e-mail

        if(!$mail->Send()) {
            echo json_encode(array("msg" => "Oops!", "text" => "Erro! a confirmação não pode ser enviado!", "type" => "error"));
        } else {
            echo json_encode(array("msg" => "Sucesso!", "text" => "Confirmação enviado com sucesso!", "type" => "success"));
        }
    }catch (phpmailerException $e) {
        echo $e->errorMessage(); //Mensagem de erro costumizada do PHPMailer
    }
    die();
?>
