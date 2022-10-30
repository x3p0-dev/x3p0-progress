# X3P0 Progress

![Progress bars shown in the WordPress content canvas.](/assets/progress-life-goals.png)

WordPress block for outputting awesome progress bars.

## Theme Support

I am a theme author at heart, so I love seeing plugins and themes working together to do awesome stuff.  This also means that I want to make this plugin as extendable as possible so that I can do cool stuff with my own themes.

### Settings and Styles (`theme.json`)

Aside from the normal block-related settings and styles that theme authors can attach to blocks, X3P0 Progress has a few additional custom settings.  Theme authors can adjust some custom block variables via the `settings.x3p0Progress` key.  The following is an example usage of each:

```json
{
	"settings": {
		"x3p0Progress": {
			"foregroundColor": "var( --wp--preset--color--primary )",
			"backgroundColor": "var( --wp--preset--color--secondary )",
			"height": "1.5rem",
			"gap": "0.25rem",
			"justifyLabel": "space-between",
			"shadow": "var( --wp--custom--shadow )"
		}
	}
}
```

By default, the block will try to fall back to the active theme's default color scheme when possible.  If a theme has a `primary` or `secondary` color set in its palette, the plugin will use those for the progress bar foreground and background, respectively.  It's better to simply define those colors yourself using the above method.

WordPress has no standard on naming colors.  However, the _de facto_ standard created by the community's usage is to have a `primary` and `secondary` color slug.  Of the dozens upon dozens of themes I've tested, the vast majority of them also had a well-defined contrast between those colors.

### Custom Block Stylesheet

An alternative to the `theme.json` method (or in addition to), you can load a block-specific stylesheet and work with plain ol' CSS.  Here's an example of loading a `themeslug/public/css/blocks/x3p0-progress.css` stylesheet:

```php
add_action( 'init', function() {
	wp_enqueue_block_style( 'x3p0/progress', [
		'handle' => 'themeslug-block-x3p0-progress',
		'src'    => get_theme_file_uri(  'public/css/blocks/x3p0-progress.css' ),
		'path'   => get_theme_file_path( 'public/css/blocks/x3p0-progress.css' )
	] );
} );
```

And some CSS to overwrite the default custom CSS properties:

```css
.wp-block-x3p0-progress {
	--x3p0-progress--height: 1.5rem;
	--x3p0-progress--gap: 0.5rem;
	--x3p0-progress--justify-label: left;
	--x3p0-progress--foreground-color: #000000;
	--x3p0-progress--background-color: #ffffff;
	--x3p0-progress--shadow: 0 1px 3px 0 rgba( 0, 0, 0, 0.3 );
}
```

Of course, you have full access to the plugin's style rules, so feel free to look at how the [default stylesheet](/resources/css/style.scss) is structured.  I'd warn against changing anything other than default cosmetics and breaking the user's expected use of the plugin.

### Custom Block Styles

The plugin currently registers a single custom block style titled "Hand Drawn," which provides a little magic with borders to give a slight hand-drawn look to the progress bar.  There's a lot of neat things you can do when mixing and matching with other design options.

However, I realize this style doesn't fit in with every theme's aesthetic.  Nor does it always need to be handed over to a client.  So, feel free to pop this one-liner into `functions.php` to unregister this single style.

```php
add_action( 'init', fn() => unregister_block_style( 'x3p0/progress', 'hand-drawn' ) );
```

I don't know whether I will add other styles in the future.  _Maybe I will.  Maybe I won't._  If you prefer to opt-out of both current and future default block styles the plugin offers, use this code instead:

```php
add_filter( 'x3p0/progress/block/styles', '__return_false' );
```

## Copyright and License

X3P0 Progress is licensed under the [GNU GPL](http://www.gnu.org/licenses/old-licenses/gpl-2.0.html), version 2 or later.

2022 &copy; [Justin Tadlock](https://justintadlock.com).
