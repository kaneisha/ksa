<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: POST');

$dataObject = $_POST;

if (isset($dataObject["name"]) && isset($dataObject["email"])){

  include('ValidateService.php');

  $formSuccess = validateService($dataObject);

  echo json_encode(['success' => $formSuccess]);
} else {
  echo json_encode(['success' => false]);
}

