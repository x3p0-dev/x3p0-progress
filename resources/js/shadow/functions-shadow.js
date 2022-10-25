/**
 * Shadow helper functions.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { getColorStyle } from '../common/functions-color';

/**
 * Sets the shadow value by key. If there is not yet a shadow, create a new
 * object. If there is no value provided, the key is deleted. If there is no
 * object keys at all, return `undefined`. This function is meant to be used in
 * conjunction when setting the shadow attribute:
 * `setAttributes( { shadow: setShadow() } )`.
 */
export const setShadow = ( shadow, key, value ) => {
	if ( ! shadow || undefined === shadow ) {
		shadow = {};
	}

	if ( key ) {
		value ? shadow[ key ] = value : delete shadow[ key ];
	}

	return Object.keys( shadow ).length ? { ...shadow } : undefined;
};

/**
 * Using to unset the shadow attribute: `setAttribute( { shadow: unsetShadow() } )`.
 */
export const unsetShadow = () => undefined;

/**
 * Returns a formatted box-shadow CSS style value based on the shadow object.
 */
export function getShadowStyle( shadow ) {

	if ( ! shadow || ! Object.keys( shadow ).length ) {
		return null;
	};

	let pieces = [];

	if ( shadow?.inset ) {
		pieces.push( 'inset' );
	}

	pieces.push( shadow?.offsetX ? `${ shadow.offsetX }px` : '0' );
	pieces.push( shadow?.offsetY ? `${ shadow.offsetY }px` : '0' );

	if ( shadow?.blur ) {
		pieces.push( `${ shadow.blur }px` );
	}

	if ( shadow?.spread ) {
		if ( ! shadow?.blur ) {
			pieces.push( '0' );
		}

		pieces.push( `${ shadow.spread }px` );
	}

	if ( shadow?.color ) {
		pieces.push( getColorStyle( shadow.color ) );
	}

	return pieces.join( ' ' );
};
