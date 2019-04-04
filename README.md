# ☘ socialfoo ☘

socialfoo adds social sharing including counts to any website for all major networks.

## networks

* [facebook](https://www.facebook.com/)
* [twitter](https://www.twitter.com/)
* [pinterest](https://www.pinterest.com/)
* [xing](https://www.xing.com/)
* [linkedin](https://www.linkedin.com/)
* [whatsapp](https://www.whatsapp.com/)

## benefits

* no developer accounts needed
* caches counts for fast load times
* gdpr compliant
* works without jquery
* includes basic styling
* multiple layouts available

## installation

download and extract [master.zip](https://github.com/vielhuber/socialfoo/archive/master.zip) inside a new folder called **socialfoo**.

then add the main script to your website:
```html
<script src="socialfoo/socialfoo.js"></script>
```
if you need basic styling, also add this:
```html
<link rel="stylesheet" href="socialfoo/socialfoo.css" />
```
finally exclude cached counts in your **.gitignore**:
```
socialfoo/socialfoo.txt
```

## usage

### plain html

```html
<div
    class="socialfoo socialfoo--grid|socialfoo--toggle"
    data-url="http://ard.de"
    data-title="Das ist der Inhalt des Posts"
    data-image="https://vielhuber.de/wp-content/themes/vielhuber/images/about.jpg"
></div>
```

### wordpress

```php
echo '<div class="socialfoo socialfoo--grid|socialfoo--toggle" ';
    echo 'data-url="'.get_permalink().'" ';
    echo 'data-title="'.get_the_title().'" ';
    if( has_post_thumbnail(get_the_ID()) )
    {
    	echo 'data-image="'.wp_get_attachment_url( get_post_thumbnail_id(get_the_ID()) ).'" ';
    }
echo '></div>';
```

### special pinterest content

add the following data attributes to provide special pinterest content:
```html
    data-pinterest-image="https://vielhuber.de/wp-content/themes/vielhuber/images/about.jpg"
    data-pinterest-description="Das ist der Inhalt des Posts"
```html