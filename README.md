# X3P0 Progress

![Progress bars shown in the WordPress content canvas.](/.wporg/banner-1544x500.png)

WordPress block for outputting awesome progress bars.

## Theme Support

I am a theme author at heart, so I love seeing plugins and themes working together to do awesome stuff. This also means that I want to make this plugin as extendable as possible so that I can do cool stuff with my own themes.

### Settings (`theme.json`)

Aside from the normal block-related settings that you can define, the block has a few additional custom settings. You can adjust some custom block variables via the `settings.x3p0/progress` key. The following is an example usage of each:

```json
{
	"settings": {
		"x3p0/progress": {
			"color": {
				"background": "var(--wp--preset--color--secondary)",
				"foreground": "var(--wp--preset--color--primary)"
			},
			"height": "1.5rem",
			"justifyLabel": "space-between"
		}
	}
}
```

If the background and foreground colors are not defined in `theme.json`, the block will fall back to reasonable defaults using CSS custom properties:

- **Background:** `var(--wp--preset--color--secondary, var(--wp--preset--color--pale-cyan-blue))`
- **Foreground:** `var(--wp--preset--color--primary, var(--wp--preset--color--vivid-cyan-blue))`

### Styles (`theme.json`)

The block supports the full array of design tools available, so you can also style these just like most other Core WordPress blocks via `styles.blocks.x3p0/progress` in `theme.json`. Here's an example from my own theme:

```json
{
	"styles": {
		"blocks": {
			"x3p0/progress": {
				"color": {
					"background": "transparent",
					"text": "var(--wp--custom--color--foreground--default)"
				},
				"spacing": {
					"blockGap": "var(--wp--preset--spacing--20)"
				},
				"typography": {
					"fontSize": "var(--wp--preset--font-size--sm)",
					"lineHeight": "var(--wp--custom--line-height--sm)"
				}
			}
		}
	}
}
```

### Custom Block Stylesheet

An alternative to the `theme.json` method (or in addition to), you can load a block-specific stylesheet and work with plain ol' CSS.  Here's an example of loading a `themeslug/public/css/blocks/x3p0-progress.css` stylesheet:

```php
add_action('init', function() {
	wp_enqueue_block_style('x3p0/progress', [
		'handle' => 'themeslug-block-x3p0-progress',
		'src'    => get_theme_file_uri('public/css/blocks/x3p0-progress.css'),
		'path'   => get_theme_file_path('public/css/blocks/x3p0-progress.css')
	]);
});
```

And some CSS to overwrite the default custom CSS properties:

```css
.wp-block-x3p0-progress {
	--x3p0-progress--height: 1.5rem;
	--x3p0-progress--justify-label: left;
	--x3p0-progress--color--background: #eeeeee;
	--x3p0-progress--color--foreground: #000000;
}
```

Of course, you have full access to the plugin's style rules, so feel free to look at how the [default stylesheet](/resources/blocks/progress/css/style.scss) is structured. I'd warn against changing anything other than default cosmetics and breaking the user's expected use of the plugin.

## Copyright and License

X3P0 Progress is licensed under the [GNU GPL](http://www.gnu.org/licenses/old-licenses/gpl-2.0.html), version 2 or later.

2022-2025 &copy; [Justin Tadlock](https://justintadlock.com).
