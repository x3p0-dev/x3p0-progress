<?php
/**
 * Block class.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022-2025, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

namespace X3P0\Progress;

/**
 * Registers the `x3p0/progress` block type with WordPress.
 */
class Block
{
	/**
	 * Sets up object state.
	 */
	public function __construct(protected string $path)
	{}

	/**
	 * Boots the component, running its actions/filters.
	 */
	public function boot(): void
	{
		add_action('init', [$this, 'register']);
	}

	/**
	 * Registers the block with WordPress.
	 */
	public function register(): void
	{
		// Bail if the manifest doesn't exist.
		if (! file_exists("{$this->path}/manifest.php")) {
			return;
		}

		wp_register_block_types_from_metadata_collection(
			$this->path,
			"{$this->path}/manifest.php"
		);

		wp_localize_script(
			generate_block_asset_handle('x3p0/progress', 'editorScript'),
			'x3p0Progress',
			[
				'locale' => str_replace('_', '-', get_locale())
			]
		);
	}
}
