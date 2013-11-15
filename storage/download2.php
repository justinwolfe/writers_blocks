<?php
$dlName = $_GET["dlName"];
header('Content-type: text/plain');
header('Content-Disposition: attachment; filename="'.$dlName.'.txt"');
$fileName = $_GET["name"];
readfile($fileName);
unlink($fileName);
?>