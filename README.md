# ☘ socialfoo ☘

socialfoo adds social sharing including counts to any website for all major networks.

## networks

* [facebook](https://www.facebook.com/)
* [twitter](https://www.twitter.com/)
* [pinterest](https://www.pinterest.com/)
* [xing](https://www.xing.com/)
* [linkedin](https://www.linkedin.com/)
* [google+](https://www.google.com/)

## benefits

* no developer accounts needed
* caches counts for fast load times
* gdpr compliant
* works without jquery
* includes basic styling

## installation

add this script:
```html
<script src="socialfoo.js"></script>
```
if you need basic styling:
```html
<link rel="stylesheet" href="socialfoo.css" />
```
exclude cached counts in your .gitignore:
```
socialfoo.txt
```

## usage

### plain html

```html
<div
    class="socialfoo"
    data-url="http://ard.de"
    data-title="Das ist der Inhalt des Posts"
    data-image="https://vielhuber.de/wp-content/themes/vielhuber/images/about.jpg"
></div>
```

### wordpress

```php
echo '<div class="socialfoo" ';
    echo 'data-url="'.get_permalink().'" ';
    echo 'data-title="'.get_the_title().'" ';
    if( has_post_thumbnail(get_the_ID()) )
    {
    	echo 'data-image="'.wp_get_attachment_url( get_post_thumbnail_id(get_the_ID()) ).'"';
    }
echo '></div>';
```