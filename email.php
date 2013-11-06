<?php
$blockText = $_POST['blockText'];
$blockEmail = $_POST['blockEmail'];
$blockTitle = $_POST['blockTitle'];
$to = $blockEmail;
$subject = $blockTitle;
$message = $blockText;
$from = "writers_blocks@botetourt.dreamhost.com";
$headers = "From: Justin Wolfe" . $from;
mail($to,$subject,$message,$headers);
echo "Mail Sent.";
?>