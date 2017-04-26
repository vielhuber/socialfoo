# ☘ socialfoo ☘

socialfoo adds social sharing including counts to any website for all major networks.

## Benefits

* No developer accounts needed
* Caches counts for fast load times
* Works without jQuery
* Includes basic styling

## Installation

```html
<script src="socialfoo.js"></script>
```
Also add socialfoo.txt to your .gitignore (if present).

## Usage

Plain HTML
```html
<div
	class="socialfoo"
	data-url="http://ard.de"
	data-title="Das ist der Inhalt des Posts"
	data-image="https://vielhuber.de/wp-content/themes/vielhuber/images/about.jpg"
></div>
```

WordPress
```php
echo '<div class="socialfoo" ';
	echo 'data-url="'.get_permalink().'" ';
	echo 'data-title="'.get_the_title().'" ';
	if( has_post_thumbnail(get_the_ID()) ) {
		echo 'data-image="'.wp_get_attachment_url( get_post_thumbnail_id(get_the_ID()) ).'" ';
	}
echo '></div>';
```
