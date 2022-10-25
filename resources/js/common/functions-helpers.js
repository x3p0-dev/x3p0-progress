/**
 * Helper functions.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

// Localized script with plugin data.
const { locale } = x3p0Progress;

/**
 * WordPress doesn't currently have a JS equivalent of `number_format_i18n` via
 * `@wordpress/i18n`, so we're passing in the locale from WordPress and using
 * `Intl.NumberFormat()`.
 *
 * @link https://github.com/WordPress/gutenberg/issues/22628
 */
export const numberFormat = ( number ) => {
	return number ? new Intl.NumberFormat( locale ).format( number ) : number;
};
