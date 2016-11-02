<?php
class SocialFoo
{

   public $url = null;
   
   public function __construct($url)
   {
      $this->url = $url;
   }
   
   public function getCounts()
   {      
      $result = [];
      $result["url"] = $this->url;
      $result["facebook"] = $this->getCountFacebook();
      $result["pinterest"] = $this->getCountPinterest();
      $result["linkedin"] = $this->getCountLinkedIn();
      $result["google"] = $this->getCountGoogle();
      $result["xing"] = $this->getCountXing();
      $result["total"] = $result["facebook"] + $result["pinterest"] + $result["linkedin"] + $result["google"] + $result["xing"];
      return $result;
   }

   public function getCountFacebook()
   {
        $api = file_get_contents( 'https://graph.facebook.com/?id=' . $this->url );
        $count = json_decode( $api );
        // if you want to get commments, use instead $count->share->comment_count
        if(isset($count->share->share_count) && $count->share->share_count != '0'){
            return intval($count->share->share_count);
        }
        return 0;
   }

   public function getCountPinterest()
   {
      $api = file_get_contents( 'https://api.pinterest.com/v1/urls/count.json?callback%20&url=' . $this->url );
      $count = preg_replace( '/^receiveCount\((.*)\)$/', '\\1', $api );
      $count = json_decode( $count );
      if(isset($count->count) && $count->count != '0') {
         return intval($count->count);
      }
      return 0;
   }

   public function getCountLinkedIn()
   {
      $api = file_get_contents( 'https://www.linkedin.com/countserv/count/share?url=' . $this->url . '&format=json' );
      $count = json_decode( $api );
      if(isset($count->count) && $count->count != '0') {
         return intval($count->count);
      }
      return 0;
   }

   public function getCountGoogle()
   {
      /* this solution does not use curl or an api key */
      $content = file_get_contents("https://plusone.google.com/u/0/_/+1/fastbutton?url=".urlencode($this->url)."&count=true");
      $doc = new DOMdocument();
      libxml_use_internal_errors(true);
      $doc->loadHTML($content);
      $doc->saveHTML();
      $num = $doc->getElementById('aggregateCount')->textContent;
      if($num != "") {
         $num = str_replace(".","",$num);
         $num = str_replace(">","",$num);
         return intval($num);
      }
      return 0;
   }

   public function getCountXing()
   {
      /* this solution does not use curl or an api key */
      $content = file_get_contents("https://www.xing-share.com/app/share?op=get_share_button;counter=top;url=".$this->url);
      $doc = new DOMdocument();      
      libxml_use_internal_errors(true);
      $doc->saveHTML();
      $doc->loadHTML($content);
      $finder = new DomXPath($doc);
      $classname = "xing-count";
      $spans = $finder->query("//*[contains(@class, '$classname')]");
      if( $spans->length > 0 ) {
         return $spans->item(0)->firstChild->nodeValue;
      }
      return 0;
   }

}

if( !isset($_POST["url"]) || $_POST["url"] == "" ) { die(); }
$url = strip_tags($_POST["url"]);
$socialfoo = new SocialFoo($url);
$result = $socialfoo->getCounts();
echo json_encode($result);
die();