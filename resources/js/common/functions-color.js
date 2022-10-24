/**
 * Color functions.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import {
	getColorObjectByAttributeValues,
	getColorObjectByColorValue
} from '@wordpress/block-editor';

/**
 * Formats a color value as a preset string if the preset exists. Otherwise,
 * returns the original color value.
 */
export function formatColorValue( value, colors )
{
	const colorObject = getColorObjectByColorValue( colors, value );

	return undefined == colorObject ? value : `var:preset|color|${ colorObject.slug }`;
};

/**
 * Returns a color preset slug if a preset string is given. Otherwise, null.
 */
export function getColorSlug( color )
{
	return color && color.startsWith( 'var:preset|color|' )
	       ? color.replace( 'var:preset|color|', '' )
	       : null;
};

/**
 * Returns a color CSS value. First checks to see if a preset slug is given.
 */
export function getColorSettingValue( color, colors )
{
	const slug = getColorSlug( color );

	return slug ? getColorObjectByAttributeValues( colors, slug, color ).color : color;
};

/**
 * Returns a color CSS value. Uses a CSS variable if the color is a preset.
 */
export function getColorStyle( color )
{
	const slug = getColorSlug( color );

	return slug ? `var(--wp--preset--color--${ slug })`: color;
};
