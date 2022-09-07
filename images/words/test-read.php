<?php
global $audio_w;
global $text_w;

$array = array("天","地","人","你","我","他","一","二","三","四","五","上","下","口","耳","目","手","足","站","坐","日","月","水","火","山","石","田","对","云","雨","风","花","鸟","虫","六","七","八","九","十","爸","妈","马","土","不","画","打","棋","鸡","字","词","语","句","子","桌","纸","文","数","学","音","乐","妹","奶","小","桥","台","雪","儿","白","草","家","是","车","路","灯","走","秋","气","了","树","叶","片","大","飞","会","个","的","船","两","头","在","里","看","见","闪","星","江","南","可","采","莲","鱼","东","西","北","尖","说","春","青","蛙","夏","弯","皮","地","冬","男","女","开","关","正","反","远","有","色","近","听","无","声","去","还","来","多","少","黄","牛","只","猫","边","鸭","苹","果","杏","桃","书","包","尺","作","业","本","笔","刀","课","早","校","明","力","尘","从","众","双","木","林","森","条","心","升","国","旗","中","红","歌","起","么","美","丽","立","午","晚","昨","今","年","影","前","后","黑","狗","左","右","它","好","朋","友","比","尾","巴","谁","长","短","把","伞","兔","最","公","写","诗","点","要","过","给","当","串","们","以","成","数","彩","半","空","问","到","方","没","更","绿","出","长","睡","那","海","真","老","师","吗","同","什","才","亮","时","候","觉","得","自","己","很","穿","衣","服","门","快","蓝","又","笑","着","向","和","贝","娃","挂","活","金","哥","姐","弟","叔","爷","群","竹","牙","用","几","步","为","参","加","洞","着","乌","鸦","处","找","办","旁","许","法","放","进","高","住","孩","玩","吧","发","芽","爬","呀","久","回","全","变","工","厂","医","院","生");

foreach ($array as $word) {
  echo $word."\r\n";
  $file = file_get_contents("https://www.zdic.net/hans/".$word);
preg_match_all ("/src=\"(.+).svg/U", $file, $pat_array);
$string = $pat_array[1][0];
//文字
$filename = $word.'-'.get_unicode_name($string).".svg";
$fileurl = "https:".$string.".svg";
if (!file_exists("images/words/".$filename)) {
  file_put_contents($filename, download($fileurl));
}
$text_w[] = "images/words/".$filename;
//文字gif
preg_match_all ("/data-gif=\"(.+).gif/U", $file, $pat_array);
$string = $pat_array[1][0];
$filename = $word.'-'.get_unicode_name($string).".gif";
$fileurl = "https:".$string.".gif";
if (!file_exists("images/words/".$filename)) {
  file_put_contents($filename, download($fileurl));
}

//声音
preg_match_all ("/data-src-mp3=\"(.+).mp3/U", $file, $pat_array);
$string = $pat_array[1][0];
$filename = $word.'-'.get_unicode_name($string).".mp3";
$fileurl = "https:".$string.".mp3";
if (!file_exists("images/words/".$filename)) {
  file_put_contents($filename, download($fileurl));
}
$audio_w[] = "images/words/".$filename;
}

$wtjson = json_encode($text_w,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
file_put_contents('../../data/readText.json', $wtjson);

$wajson = json_encode($audio_w,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
file_put_contents('../../data/audioText.json', $wajson);

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
