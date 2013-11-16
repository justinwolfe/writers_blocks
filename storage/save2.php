<?php
$blockText = $_POST['blockText'];
$blockTextFiltered = filter_var($blockText, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
$blockName = $_POST['blockName'];
$fileHandler = fopen($blockName, 'w');
fwrite($fileHandler, $blockTextFiltered);
fclose($fileHandler);
echo "written";
?>