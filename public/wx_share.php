<?php
include_once "jssdk.php";
$jssdk = new JSSDK("wx724f6ac08eb7d4f8", "ee5053d53720a07dc7a0455419c5f565");
$url=$_POST['url'];
if(!$url)
    exit();
$signPackage = $jssdk->GetSignPackage($url);
exit(json_encode($signPackage));