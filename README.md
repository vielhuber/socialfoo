# ☘ socialfoo ☘

socialfoo adds social sharing including counts to any website for all major networks.

## networks

* facebook
* twitter
* pinterest
* xing
* linkedin
* google+

## benefits

* no developer accounts needed
* caches counts for fast load times
* gdpr compliant
* works without jQuery
* includes basic styling

## installation

```html
<script src="socialfoo.js"></script>
```
also add socialfoo.txt to your .gitignore (if present).

## Usage

plain html
```html
<div
    class="socialfoo"
    data-url="http://ard.de"
    data-title="Das ist der Inhalt des Posts"
    data-image="https://vielhuber.de/wp-content/themes/vielhuber/images/about.jpg"
></div>
```

wordpress
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