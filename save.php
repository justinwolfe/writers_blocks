<?php
$blockText = $_POST['blockText'];
$blockName = $_POST['blockName'];
$fileName = "$blockName.txt";
$fileHandler = fopen($fileName, 'w')
fwrite($fileHandler, $blockText);
fclose($fileHandler);
?>