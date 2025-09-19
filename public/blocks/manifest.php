<?php
// This file is generated. Do not modify it manually.
return array(
	'progress' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'x3p0/progress',
		'version' => '20250919',
		'title' => 'Progress Bar',
		'category' => 'widgets',
		'keywords' => array(
			'progress',
			'bar'
		),
		'description' => 'A customizable progress bar to visually track completion toward any percentage, numeric, financial, or unit-based goal.',
		'textdomain' => 'x3p0-progress',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'editorStyle' => 'file:./index.css',
		'attributes' => array(
			'progressBackgroundColor' => array(
				'type' => 'string'
			),
			'customProgressBackgroundColor' => array(
				'type' => 'string'
			),
			'progressForegroundColor' => array(
				'type' => 'string'
			),
			'customProgressForegroundColor' => array(
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
				'type' => 'string',
				'default' => 'between'
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
		'selectors' => array(
			'color' => array(
				'text' => '.wp-block-x3p0-progress, .wp-block-x3p0-progress__label'
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
			'__experimentalStyle' => array(
				'spacing' => array(
					'blockGap' => '0.5rem'
				)
			),
			'color' => array(
				'gradients' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowEditing' => false,
				'default' => array(
					'type' => 'flex',
					'flexWrap' => 'nowrap',
					'orientation' => 'vertical'
				)
			),
			'shadow' => true,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true,
				'__experimentalDefaultControls' => array(
					'blockGap' => true
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
				'numberFormat' => array(
					'style' => 'currency',
					'currency' => 'USD',
					'currencyDisplay' => 'symbol'
				)
			)
		)
	)
);
