<?php
session_start();
$ranStr = md5(microtime());
$ranStr = substr($ranStr, 0, 6);
$_SESSION['cap_code'] = $ranStr;
$newImage = imagecreatefromjpeg("cap_bg.jpg");
$txtColor = imagecolorallocate($newImage, 255, 0, 0);
imagestring($newImage, 5, 35, 15, $ranStr, $txtColor);
header("Content-type: image/jpeg");
imagejpeg($newImage);
?>


