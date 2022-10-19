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
                register_block_type( $this->path . '/public', [
                        'render_callback' => [ $this, 'render' ]
                ] );

		// Let theme authors short-circuit if they don't want to support
		// the block's custom styles.
		if ( false === apply_filters( 'x3p0/progress/block/styles', true ) ) {
			return;
		}

		register_block_style( 'x3p0/progress', [
			'name' => 'hand-drawn',
			'label' => __( 'Hand-Drawn', 'x3p0-progress' )
		] );

		register_block_style( 'x3p0/progress', [
			'name' => 'hand-drawn-padded',
			'label' => __( 'Hand-Drawn Padded', 'x3p0-progress' )
		] );

		register_block_style( 'x3p0/progress', [
			'name' => 'ruler',
			'label' => __( 'Ruler', 'x3p0-progress' )
		] );

		register_block_style( 'x3p0/progress', [
			'name' => 'striped',
			'label' => __( 'Striped', 'x3p0-progress' )
		] );
        }

	/**
	 * Renders the block on the front end.
	 *
	 * @since 1.0.0
	 */
        public function render( array $attr, string $content, WP_Block $block ): string
        {
		$attr = array_merge( [
			'height'                  => '',
			'heightUnit'              => 'px',
			'width'                   => '',
			'widthUnit'               => '%',
			'label'                   => '',
			'progressValue'           => 50,
			'progressColor'           => '',
			'progressBackgroundColor' => '',
			'showLabel'               => true,
			'showValue'               => false,
			'reverse'                 => false,
		], $attr );

		// Set up some empty variables that may or may not be assigned.
		$block_class =
		$block_style =
		$progress_label =
		$bar_style =
		$container_style =
		$progress_value_html =
		$progress_caption_html = '';

		// Create a unique ID for the `<progress>` and `<label>` elements.
		$block_id = uniqid( 'wp-block-x3p0-progress-' );

		// Build the block class.
		if ( $attr['reversed'] ) {
			$block_class = "is-reversed";
		}

		// Build the block style attribute.
		if ( $attr['progressColor'] ) {
			$block_style .= "--x3p0-progress--color: {$attr['progressColor']};";
		}

		if ( $attr['progressBackgroundColor'] ) {
			$block_style .= "-x3p0-progress--background: {$attr['progressBackgroundColor']};";
		}

		// Build the `<progress>` element's style attribute.
		if ( $attr['height'] && $attr['heightUnit'] ) {
			$bar_style = sprintf(
				' style="height: %d%s;"',
				absint( $attr['height'] ),
				esc_attr( $attr['heightUnit'] )
			);
		}

		// Creates the `<label>` element.
		if ( $attr['label'] && $attr['showLabel'] ) {
			$progress_label = sprintf(
				'<label class="wp-block-x3p0-progress__label" for="%s">%s</label>',
				esc_attr( $block_id ),
				$attr['label']
			);
		}

		if ( $attr['showValue'] ) {
			$progress_value_html = sprintf(
				'<div class="wp-block-x3p0-progress__value">%s</div>',
				absint( $attr['progressValue'] ) . '%'
			);
		}

		if ( $progress_label || $progress_value_html ) {
			$progress_caption_html = sprintf(
				'<div class="wp-block-x3p0-progress__caption">%s%s</div>',
				$progress_label,
				$progress_value_html
			);
		}

		// Creates the `<progress>` element.
		$progress_bar = sprintf(
			'<progress class="wp-block-x3p0-progress__bar" id="%s" value="%s" max="100"%s>%s</progress>',
			esc_attr( $block_id ),
			absint( $attr['progressValue'] ),
			$bar_style,
			absint( $attr['progressValue'] ) . '%',
		);

		// Build the container element's style attribute.
		if ( $attr['width'] && $attr['widthUnit'] ) {
			$container_style = sprintf(
				' style="width: %d%s;"',
				absint( $attr['width'] ),
				esc_attr( $attr['widthUnit'] )
			);
		}

		// Creates the `<progress>` wrapping container.
		$progress_container = sprintf(
			'<div class="wp-block-x3p0-progress__container"%s>%s</div>',
			$container_style,
			$progress_bar
		);

		// Return the formatted block output.
                return sprintf(
                        '<div %s>%s%s</div>',
                        get_block_wrapper_attributes( [
                                'class' => esc_attr( $block_class ),
				'style' => esc_attr( $block_style )
                        ] ),
			$progress_caption_html,
			$progress_container
                );
        }
}
