<?php
$blockText = $_POST['blockText'];
$blockName = $_POST['blockName'];
$fileHandler = fopen($blockName, 'w');
fwrite($fileHandler, $blockText);
fclose($fileHandler);
echo "written";
?>