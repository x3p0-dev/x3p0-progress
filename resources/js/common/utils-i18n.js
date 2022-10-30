/**
 * Internationalization utilities.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

 import { __ } from '@wordpress/i18n';

// Object pulled in via `wp_localize_script()` from `src/Block.php`.
const { locale } = x3p0Progress;

/**
 * The default locale (should only be used as a fallback).
 */
export const DEFAULT_LOCALE = 'en-US';

/**
 * WordPress doesn't currently have a JS equivalent of `number_format_i18n` via
 * `@wordpress/i18n`, so we're passing in the locale from WordPress and using
 * `Intl.NumberFormat()`.
 *
 * @link https://github.com/WordPress/gutenberg/issues/22628
 */
export const numberFormat = ( number, options ) => {
	return number
	       ? new Intl.NumberFormat( locales(), options ).format( number )
	       : number;
};

/**
 * Returns an array of locales for use in JavaScript `Intl` functions. The script
 * first attempts to use the locale as set in the site's language settings (this
 * is imported via the localized object from the PHP side with the underscore
 * replaced with a hyphen -- e.g. en_US becomes en-US).  The function first tries
 * to use that locale.  If it returns an error, we use a default, known locale.
 */
export const locales = () => {
	let locales;

	try   { locales = Intl.getCanonicalLocales( locale ); }
	catch { locales = Intl.getCanonicalLocales( DEFAULT_LOCALE ); }

	return [ locales ];
};

/**
 * Returns an array of currency objects with their code and translated display
 * names. This is all handled on the JavaScript via `Intl.DisplayNames()` so
 * that there's less work to do in maintaining the currency list, internationalizing,
 * and translating.  It also keeps our script much smaller.  Only the client's
 * supported values will be returned.
 */
export const currencies = () => {
	const names = new Intl.DisplayNames( locales(), { type: 'currency' } );

	return Intl.supportedValuesOf( 'currency' ).map( ( code ) => {
		return { value: code, label: names.of( code ) }
	} );
};

/**
 * Returns an array of unit objects and their translated display names. Currently,
 * the plugin must manually handle this list and its internationalization. The
 * `Intl.supportedValuesOf()` function can return the list of supported values.
 * However, `Intl.DisplayNames()` does not currently support `type: unit`.
 */
export const units = () => { return [
	{ value: "acre",              label: __( 'Acre', 'x3p0-progress' ) },
	{ value: "bit",               label: __( 'Bit', 'x3p0-progress' ) },
	{ value: "byte",              label: __( 'Byte', 'x3p0-progress' ) },
	{ value: "celsius",           label: __( 'Celsius', 'x3p0-progress' ) },
	{ value: "centimeter",        label: __( 'Centimeter', 'x3p0-progress' ) },
	{ value: "day",               label: __( 'Day', 'x3p0-progress' ) },
	{ value: "degree",            label: __( 'Degree', 'x3p0-progress' ) },
	{ value: "fahrenheit",        label: __( 'Fahrenheit', 'x3p0-progress' ) },
	{ value: "fluid-ounce",       label: __( 'Fluid Ounce', 'x3p0-progress' ) },
	{ value: "foot",              label: __( 'Foot', 'x3p0-progress' ) },
	{ value: "gallon",            label: __( 'Gallon', 'x3p0-progress' ) },
	{ value: "gigabit",           label: __( 'Gigabit', 'x3p0-progress' ) },
	{ value: "gigabyte",          label: __( 'Gigabyte', 'x3p0-progress' ) },
	{ value: "gram",              label: __( 'Gram', 'x3p0-progress' ) },
	{ value: "hectare",           label: __( 'Hectare', 'x3p0-progress' ) },
	{ value: "hour",              label: __( 'Hour', 'x3p0-progress' ) },
	{ value: "inch",              label: __( 'Inch', 'x3p0-progress' ) },
	{ value: "kilobit",           label: __( 'Kilobit', 'x3p0-progress' ) },
	{ value: "kilobyte",          label: __( 'Kilobyte', 'x3p0-progress' ) },
	{ value: "kilogram",          label: __( 'Kilogram', 'x3p0-progress' ) },
	{ value: "kilometer",         label: __( 'Kilometer', 'x3p0-progress' ) },
	{ value: "liter",             label: __( 'Liter', 'x3p0-progress' ) },
	{ value: "megabit",           label: __( 'Megabit', 'x3p0-progress' ) },
	{ value: "megabyte",          label: __( 'Megabyte', 'x3p0-progress' ) },
	{ value: "meter",             label: __( 'Meter', 'x3p0-progress' ) },
	{ value: "mile",              label: __( 'Mile', 'x3p0-progress' ) },
	{ value: "mile-scandinavian", label: __( 'Mile: Scandinavian', 'x3p0-progress' ) },
	{ value: "milliliter",        label: __( 'Milliliter', 'x3p0-progress' ) },
	{ value: "millimeter",        label: __( 'Millimeter', 'x3p0-progress' ) },
	{ value: "millisecond",       label: __( 'Millisecond', 'x3p0-progress' ) },
	{ value: "minute",            label: __( 'Minute', 'x3p0-progress' ) },
	{ value: "month",             label: __( 'Month', 'x3p0-progress' ) },
	{ value: "ounce",             label: __( 'Ounce', 'x3p0-progress' ) },
	{ value: "percent",           label: __( 'Percent', 'x3p0-progress' ) },
	{ value: "petabyte",          label: __( 'Petabyte', 'x3p0-progress' ) },
	{ value: "pound",             label: __( 'Pound', 'x3p0-progress' ) },
	{ value: "second",            label: __( 'Second', 'x3p0-progress' ) },
	{ value: "stone",             label: __( 'Stone', 'x3p0-progress' ) },
	{ value: "terabit",           label: __( 'Terabit', 'x3p0-progress' ) },
	{ value: "terabyte",          label: __( 'Terabyte', 'x3p0-progress' ) },
	{ value: "week",              label: __( 'Week', 'x3p0-progress' ) },
	{ value: "yard",              label: __( 'Yard', 'x3p0-progress' ) },
	{ value: "year",              label: __( 'Year', 'x3p0-progress' ) }
]; };
