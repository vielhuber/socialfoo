# ☘ socialfoo ☘

socialfoo adds social sharing including counts to any website for all major networks.

## networks

-   [facebook](https://www.facebook.com/)
-   [twitter](https://www.twitter.com/)
-   [pinterest](https://www.pinterest.com/)
-   [xing](https://www.xing.com/)
-   [linkedin](https://www.linkedin.com/)
-   [whatsapp](https://www.whatsapp.com/)

## benefits

-   gdpr compliant
-   no dependencies
-   includes basic styling
-   multiple layouts available
-   caches counts for fast loading
-   support for facebook share count
-   no developer accounts needed (except facebook)

## requirements

-   [curl](https://curl.haxx.se/) or [allow_url_fopen](https://www.php.net/manual/de/filesystem.configuration.php#ini.allow-url-fopen)

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

finally exclude the cached counts in your **.gitignore**:

```
socialfoo/socialfoo.txt
```

if socialfoo is not able to determine the path of the php script, provide it in `socialfoo.js:140`.

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
echo 'data-url="' . get_permalink() . '" ';
echo 'data-title="' . get_the_title() . '" ';
if (has_post_thumbnail(get_the_ID())) {
    echo 'data-image="' . wp_get_attachment_url(get_post_thumbnail_id(get_the_ID())) . '" ';
}
echo '></div>';
```

### special pinterest content

add the following data attributes to provide special pinterest content:

```html
data-pinterest-image="https://vielhuber.de/wp-content/themes/vielhuber/images/about.jpg"
data-pinterest-description="Das ist der Inhalt des Posts"
```

### facebook share count

facebook changed its graph api several times in the past.
currently it is only possible to gather any data (including the share count)
with a working access token. obtaining and integrating such a token is straightforward:

-   login at https://developers.facebook.com
-   create a new app
-   in the settings provide a link to a public privacy page and choose a category
-   publish the app in the top right corner
-   add your app id and your app secret into `socialfoo/socialfoo.php` (line 7-8)
