<?php
$blockText = $_POST['blockText'];
$blockEmail = $_POST['blockEmail'];
$blockTitle = $_POST['blockTitle'];
$blockTextFiltered = filter_var($blockText, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
$blockEmailFiltered = filter_var($blockText, FILTER_SANITIZE_EMAIL);
$blockTitleFiltered = filter_var($blockText, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
$to = $blockEmailFiltered;
$subject = $blockTitleFiltered;
$message = $blockTextFiltered;
$from = "writers_blocks@botetourt.dreamhost.com";
$headers = "From: Justin Wolfe" . $from;
mail($to,$subject,$message,$headers);
echo "Mail Sent.";
?>