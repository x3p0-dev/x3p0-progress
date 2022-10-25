<?php
/**
 * Block class.
 *
 * Registers and renders the block type on the front end.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

namespace X3P0\Progress;

use WP_Block;

class Block
{
	/**
	 * Stores the plugin path.
	 *
	 * @since 1.0.0
 	 * @todo  Move this to the constructor with PHP 8-only support.
	 */
	protected string $path;

        /**
         * Sets up object state.
         *
         * @since 1.0.0
         */
        public function __construct( string $path )
	{
		$this->path = $path;
	}

        /**
         * Boots the component, running its actions/filters.
         *
         * @since 1.0.0
         */
        public function boot(): void
        {
                add_action( 'init', [ $this, 'register' ] );
        }

	/**
	 * Registers the block with WordPress.
	 *
	 * @since 1.0.0
	 */
        public function register(): void
        {
                register_block_type( $this->path . '/public' );

		wp_localize_script(
			generate_block_asset_handle( 'x3p0/progress', 'editorScript' ),
			'x3p0Progress',
			[ 'locale' => str_replace( '_', '-', get_locale() ) ]
		);

		// Let theme authors short-circuit if they don't want to support
		// the block's custom styles.
		if ( apply_filters( 'x3p0/progress/block/styles', true ) ) {
			register_block_style( 'x3p0/progress', [
				'name' => 'hand-drawn',
				'label' => __( 'Hand Drawn', 'x3p0-progress' )
			] );
		}
        }
}
