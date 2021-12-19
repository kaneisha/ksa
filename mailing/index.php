<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: POST');

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;

// Captcha validation
// $recaptcha = $_POST['recaptcha'];

// $url = 'https://www.google.com/recaptcha/api/siteverify';
// $data = array(
//   'secret' => '6LdnnPEUAAAAACQVete56baVSxnMaCS0gZemnqbX',
//   'response' => $recaptcha
// );

// $query = http_build_query($data);

// $options = array(
//   'http' => array(
//     'header' => "Content-Type: application/x-www-form-urlencoded\r\n" .
//       "Content-Length: " . strlen($query) . "\r\n" .
//       "User-Agent:MyAgent/1.0\r\n",
//     'method' => 'POST',
//     'content' => $query
//   )
// );

// $context = stream_context_create($options);
// $verify = file_get_contents($url, false, $context);
// $captcha_success = json_decode($verify);

// if ($captcha_success->success) {

$dataObject = $_POST;

include('ValidateService.php');
$formSuccess = validateService($dataObject);

if ($formSuccess) {
  // Data format
  $formattedData = "";

  foreach ($dataObject as $key => $data) {

    switch ($key) {
      case 'name':
        $label = "Name";
        $value = $data;
        break;
      case 'subject':
        $label = "Subject";
        $value = $data;
        break;
      case 'email':
        $label = "Mail Address";
        $value = $data;
        break;
      case 'comment':
        $label = "Message";
        $value = $data;
        break;
      case 'recaptcha':
        $label = null;
        break;
      default:
        $label = ucfirst($key);
        $value = (strlen($value) > 0) ? $data : " - ";
    }

    $formattedData .=
      (strlen($label) > 0 && $value != "null")
      ? '<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 10px;">' . $label . ': <strong>' . $value . '</strong></p>'
      : '';
  }

  // Email
  $mail = new PHPMailer();

  $subject = (strlen($dataObject['subject']) > 0) ? "KSA - " . $dataObject['subject'] : "KSA - Contact";

  $mail->CharSet = 'UTF-8';
  $mail->From = "noreply@facundoprodo.com.ar";
  $mail->FromName = "KSA";
  $mail->AddAddress("mariano7.3k@gmail.com");

  $mail->IsHTML(true);

  if (!empty($_FILES)) {
    foreach ($_FILES as $file) {
      $mail->AddAttachment(
        $file['tmp_name'],
        $file['name']
      );
    }
  }

  $mail->Subject = "=?UTF-8?B?" . base64_encode($subject) . "?=";
  $mail->Body = '
          <!doctype html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width">
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <title>KSA - Contact</title>
              <style>
              /* -------------------------------------
                  RESPONSIVE AND MOBILE FRIENDLY STYLES
              ------------------------------------- */
              @media only screen and (max-width: 620px) {
                table[class=body] h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important;
                }
                table[class=body] p,
                      table[class=body] ul,
                      table[class=body] ol,
                      table[class=body] td,
                      table[class=body] span,
                      table[class=body] a {
                  font-size: 16px !important;
                }
                table[class=body] .wrapper,
                      table[class=body] .article {
                  padding: 10px !important;
                }
                table[class=body] .content {
                  padding: 0 !important;
                }
                table[class=body] .container {
                  padding: 0 !important;
                  width: 100% !important;
                }
                table[class=body] .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important;
                }
                table[class=body] .btn table {
                  width: 100% !important;
                }
                table[class=body] .btn a {
                  width: 100% !important;
                }
                table[class=body] .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important;
                }
              }
              
              @media all {
                .ExternalClass {
                  width: 100%;
                }
                .ExternalClass,
                      .ExternalClass p,
                      .ExternalClass span,
                      .ExternalClass font,
                      .ExternalClass td,
                      .ExternalClass div {
                  line-height: 100%;
                }
                .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important;
                }
                #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
                  font-size: inherit;
                  font-family: inherit;
                  font-weight: inherit;
                  line-height: inherit;
                }
                .btn-primary table td:hover {
                  background-color: #34495e !important;
                }
                .btn-primary a:hover {
                  background-color: #34495e !important;
                  border-color: #34495e !important;
                }
              }
              </style>
            </head>
            <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
                <tr>
                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                  <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                    <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
        
                      <!-- START CENTERED WHITE CONTAINER -->
                      <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">KSA - Contact</span>
                      <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
        
                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                          <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                              <tr>
                                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                  ' . $formattedData . '
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
        
                      <!-- END MAIN CONTENT AREA -->
                      </table>
        
                      <!-- START FOOTER -->
                      <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                          <tr>
                            <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                              <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">KSA</span>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!-- END FOOTER -->
        
                    <!-- END CENTERED WHITE CONTAINER -->
                    </div>
                  </td>
                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                </tr>
              </table>
            </body>
          </html>
          ';

  $mail->send();

  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false]);
}
// } else {
//   echo json_encode(['success' => false, 'reason' => 'Recaptcha Failed']);
// }
