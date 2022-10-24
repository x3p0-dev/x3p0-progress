/**
 * Shadow helper functions.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { getColorStyle } from '../common/functions-color';

export const updateShadow = ( shadow, key, value ) => {
	value ? shadow[ key ] = value : delete shadow[ key ];
	return shadow;
};

export function getShadowStyle( shadow ) {

	if ( ! Object.keys( shadow ).length ) {
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
