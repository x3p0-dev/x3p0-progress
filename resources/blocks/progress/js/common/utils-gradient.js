/**
 * Gradient utilities.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import {
	getGradientSlugByValue,
	getGradientValueBySlug
} from '@wordpress/block-editor';

/**
 * Formats a gradient value as a preset string if the preset exists. Otherwise,
 * returns the original gradient value.
 */
export const gradientAttribute = ( value, gradients ) => {
	const slug = getGradientSlugByValue( gradients, value );

	return slug ? `var:preset|gradient|${ slug }` : value;
};

/**
 * Returns a gradient preset slug if a preset string is given. Otherwise, null.
 */
export const gradientSlug = ( gradient ) => {
	return gradient && gradient.startsWith( 'var:preset|gradient|' )
	       ? gradient.replace( 'var:preset|gradient|', '' )
	       : null;
};

/**
 * Returns a gradient CSS value. First checks to see if a preset slug is given.
 */
export const gradientSetting = ( gradient, gradients ) => {
	const slug = gradientSlug( gradient );

	if ( slug ) {
		const value = getGradientValueBySlug( gradients, slug );

		return undefined === value ? gradient : value;
	}

	return gradient;
};

/**
 * Returns a gradient CSS value. Uses a CSS variable if the gradient is a preset.
 */
export const gradientStyle = ( gradient ) => {
	const slug = gradientSlug( gradient );

	return slug ? `var(--wp--preset--gradient--${ slug })` : gradient;
};
