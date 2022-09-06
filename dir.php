<?php

/*$dir = "./images/words";

// Open a known directory, and proceed to read its contents

if (is_dir($dir)) {

if ($dh = opendir($dir)) {

while (($file = readdir($dh)) !== false) {

echo "filename: $file" .  "\r\n";
if ($pos = strpos($file, 'mp3')) {
	echo "filename: $file" .  "\r\n";
	$mp3 .= "images/words/".$file."\r\n";
}

} closedir($dh);

}

}

file_put_contents('mp3.txt', $mp3);*/


/*$dir = "./images/words";

// Open a known directory, and proceed to read its contents

if (is_dir($dir)) {

if ($dh = opendir($dir)) {

while (($file = readdir($dh)) !== false) {

echo "filename: $file" .  "\r\n";
if ($pos = strpos($file, 'gif')) {
	echo "filename: $file" .  "\r\n";
	$gif .= "images/words/".$file."\r\n";
}

} closedir($dh);

}

}

file_put_contents('gif.txt', $gif);*/

$dir = "./images/words";

// Open a known directory, and proceed to read its contents

if (is_dir($dir)) {

if ($dh = opendir($dir)) {

while (($file = readdir($dh)) !== false) {

echo "filename: $file" .  "\r\n";
if ($pos = strpos($file, 'svg')) {
	echo "filename: $file" .  "\r\n";
	$svg .= "images/words/".$file."\r\n";
}

} closedir($dh);

}

}

file_put_contents('svg.txt', $svg);