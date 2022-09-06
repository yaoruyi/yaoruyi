<?php

$array = array("零");

foreach ($array as $word) {
	print_word($word);
}


function print_word($word){

$file = file_get_contents("https://www.zdic.net/hans/".$word);
preg_match_all ("/src=\"(.+).svg/U", $file, $pat_array);
$string = $pat_array[1][0];
//文字
$filename = $word.'-'.get_unicode_name($string).".svg";
$fileurl = "https:".$string.".svg";
file_put_contents($filename, download($fileurl));
//文字gif
$filename = $word.'-'.get_unicode_name($string).".gif";
$fileurl = "https:".$string.".gif";
file_put_contents($filename, download($fileurl));
//声音
preg_match_all ("/data-src-mp3=\"(.+).mp3/U", $file, $pat_array);
$string = $pat_array[1][0];
$filename = $word.'-'.get_unicode_name($string).".mp3";
$fileurl = "https:".$string.".mp3";
file_put_contents($filename, download($fileurl));
}
function get_unicode_name($string)
{
	$pos = strrpos($string, "/");
	return substr($string, $pos+1);
}

function download($url)
{

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_SSL_VERIFYPEER => false,
  CURLOPT_SSL_VERIFYHOST => false,
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'authority: img.zdic.net',
    'accept: image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'accept-language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cookie: _ga=GA1.2.527957440.1662428254; _gid=GA1.2.1843143037.1662428254; __gads=ID=011274d51b8739fc-22198fc405d5006f:T=1662428253:RT=1662428253:S=ALNI_MaK1AuOF4Z2xZ-s9lWeOooDOtEAgg; __gpi=UID=0000088938322704:T=1662428253:RT=1662428253:S=ALNI_MY9ZMhGaB21B_eIZboz5l2TLOTW2g; _gat_gtag_UA_161009_3=1',
    'referer: https://www.zdic.net/',
    'sec-ch-ua: "Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
    'sec-ch-ua-mobile: ?0',
    'sec-ch-ua-platform: "Windows"',
    'sec-fetch-dest: image',
    'sec-fetch-mode: no-cors',
    'sec-fetch-site: same-site',
    'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.70'
  ),
));

$response = curl_exec($curl);

curl_close($curl);

return $response;
}
