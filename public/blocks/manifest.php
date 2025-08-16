<?php
// This file is generated. Do not modify it manually.
return array(
	'progress' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 2,
		'name' => 'x3p0/progress',
		'version' => '20250815',
		'title' => 'X3P0: Progress Bar',
		'category' => 'widgets',
		'keywords' => array(
			'progress',
			'bar'
		),
		'description' => 'Displays a progress bar.',
		'textdomain' => 'x3p0-progress',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'editorStyle' => 'file:./index.css',
		'attributes' => array(
			'progressBackgroundColor' => array(
				'type' => 'string'
			),
			'progressBackgroundGradient' => array(
				'type' => 'string'
			),
			'pregressForegroundColor' => array(
				'type' => 'string'
			),
			'progressForegroundGradient' => array(
				'type' => 'string'
			),
			'goal' => array(
				'type' => 'integer',
				'default' => 100
			),
			'height' => array(
				'type' => 'number'
			),
			'heightUnit' => array(
				'type' => 'string',
				'default' => 'px'
			),
			'justifyLabel' => array(
				'type' => 'string'
			),
			'label' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.wp-block-x3p0-progress__label-text'
			),
			'numberFormat' => array(
				'type' => 'object'
			),
			'progress' => array(
				'type' => 'integer',
				'default' => 50
			),
			'progressId' => array(
				'type' => 'integer',
				'default' => 0
			),
			'reversed' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showLabel' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showGoal' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showProgress' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'supports' => array(
			'anchor' => true,
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'__experimentalBorder' => array(
				'__experimentalSkipSerialization' => true,
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'radius' => true,
					'color' => true,
					'width' => true,
					'style' => true
				)
			),
			'color' => array(
				'gradients' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'__experimentalSkipSerialization' => array(
					'padding'
				),
				'padding' => true,
				'blockGap' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalTextTransform' => true
			)
		),
		'example' => array(
			'attributes' => array(
				'label' => 'Journey to My First $100K:',
				'progressId' => 999,
				'goal' => 100000,
				'progress' => 78000,
				'foregroundColor' => 'var:preset|color|vivid-green-cyan',
				'backgroundColor' => 'transparent',
				'numberFormat' => array(
					'style' => 'currency',
					'currency' => 'USD',
					'currencyDisplay' => 'symbol'
				),
				'style' => array(
					'spacing' => array(
						'padding' => array(
							'top' => '4px',
							'right' => '4px',
							'bottom' => '4px',
							'left' => '4px'
						)
					)
				),
				'borderColor' => 'black',
				'className' => 'is-style-hand-drawn'
			)
		)
	)
);
