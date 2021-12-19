<?php

function validateService($dataObject) {
    $error = true;
    $name = $dataObject["name"];
    $email = $dataObject["email"];
    $comment = $dataObject["comment"];
    
    // Validate selected options
    //TODO: update validations
    if (strlen($name) > 0) $error = false;
    if (strlen($email) > 0) $error = false;
    if (strlen($comment) > 0) $error = false;
  
    return !$error;
}

   
  