<?php
class SocialFoo
{
    public $url = null;

    public $facebook = [
        'AppId' => 'xxxxxxxxxxxxxxx',
        'AppSecret' => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    ];

    public function __construct($url)
    {
        $this->url = $url;
    }

    public function getCounts()
    {
        if (!file_exists(realpath(dirname(__FILE__)) . '/socialfoo.txt')) {
            file_put_contents(realpath(dirname(__FILE__)) . '/socialfoo.txt', json_encode([]));
        }

        /* if cached version is available */
        $cached = json_decode(
            file_get_contents(realpath(dirname(__FILE__)) . '/socialfoo.txt'),
            true
        );
        if (array_key_exists(md5($this->url), $cached)) {
            if (
                abs(strtotime('now') - strtotime($cached[md5($this->url)]['timestamp'])) <=
                60 * 60
            ) {
                return $cached[md5($this->url)];
            }
        }

        $result = [];
        $result['url'] = $this->url;
        $result['timestamp'] = date('Y-m-d H:i:s');
        $result['facebook'] = $this->getCountFacebook();
        $result['pinterest'] = $this->getCountPinterest();
        $result['linkedin'] = $this->getCountLinkedIn();
        $result['xing'] = $this->getCountXing();
        $result['total'] =
            $result['facebook'] + $result['pinterest'] + $result['linkedin'] + $result['xing'];

        /* store cached version (get again current version, because in the meantime file could be changed) */
        $cached = json_decode(
            file_get_contents(realpath(dirname(__FILE__)) . '/socialfoo.txt'),
            true
        );
        $cached[md5($this->url)] = $result;
        file_put_contents(realpath(dirname(__FILE__)) . '/socialfoo.txt', json_encode($cached));

        return $result;
    }

    public function getCountFacebook()
    {
        $api = $this->fetch(
            'https://graph.facebook.com/?fields=engagement&id=' .
                $this->url .
                '&access_token=' .
                $this->facebook['AppId'] .
                '|' .
                $this->facebook['AppSecret'] .
                ''
        );
        $count = json_decode($api);
        // if you want to get commments, use instead $count->engagement->comment_count
        if (isset($count->engagement->share_count) && $count->engagement->share_count != '0') {
            return intval($count->engagement->share_count);
        }
        return 0;
    }

    public function getCountPinterest()
    {
        $api = $this->fetch(
            'https://api.pinterest.com/v1/urls/count.json?callback%20&url=' . $this->url
        );
        $count = preg_replace('/^receiveCount\((.*)\)$/', '\\1', $api);
        $count = json_decode($count);
        if (isset($count->count) && $count->count != '0') {
            return intval($count->count);
        }
        return 0;
    }

    public function getCountLinkedIn()
    {
        $api = $this->fetch(
            'https://www.linkedin.com/countserv/count/share?url=' . $this->url . '&format=json'
        );
        $count = json_decode($api);
        if (isset($count->count) && $count->count != '0') {
            return intval($count->count);
        }
        return 0;
    }

    public function getCountXing()
    {
        /* this solution does not use curl or an api key */
        $content = $this->fetch(
            'https://www.xing-share.com/app/share?op=get_share_button;counter=top;url=' . $this->url
        );
        if ($content == '') {
            return 0;
        }
        $doc = new DOMdocument();
        libxml_use_internal_errors(true);
        $doc->saveHTML();
        $doc->loadHTML($content);
        $finder = new DomXPath($doc);
        $classname = 'xing-count';
        $spans = $finder->query("//*[contains(@class, '$classname')]");
        if ($spans->length > 0) {
            return $spans->item(0)->firstChild->nodeValue;
        }
        return 0;
    }

    public function fetch($url)
    {        
        if(function_exists('curl_version'))
        {
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HEADER, false);
            curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 5);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); // don't verify certificate 
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2); 
            $data = curl_exec($curl);
            curl_close($curl);
        }
        elseif(file_get_contents(__FILE__) && ini_get('allow_url_fopen'))
        {
            $data = @file_get_contents($url);
        }
        else
        {
            $data = json_encode([]);
        }
        return $data;
    }
}

if (!isset($_POST['url']) || $_POST['url'] == '') {
    die();
}
$url = strip_tags($_POST['url']);
$socialfoo = new SocialFoo($url);
$result = $socialfoo->getCounts();
echo json_encode($result);
die();
