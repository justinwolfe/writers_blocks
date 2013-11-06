<?php
$testText = $_POST['testText'];
$dateText = date("Y-m-d g:i a");
$to = "justin.wolfe@gmail.com";
$subject = $dateText;
$message = $testText;
$from = "justin.wolfe@example.com";
$headers = "From: Justin Wolfe" . $from;
mail($to,$subject,$message,$headers);
echo "Mail Sent.";
?>