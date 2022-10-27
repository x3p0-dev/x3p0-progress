/**
 * Progress utilities.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { numberFormat } from '../common/utils-i18n';

// Export default number format options for the progress value.
export const DEFAULT_STYLE            = '';
export const DEFAULT_CURRENCY         = 'USD';
export const DEFAULT_CURRENCY_DISPLAY = 'symbol';
export const DEFAULT_UNIT             = 'percent';
export const DEFAULT_UNIT_DISPLAY     = 'short';

/**
 * Formats the number string for the progress value output. This is a wrapper
 * around the `numberFormat()` function for handling the block settings.
 */
export const formatValue = ( progressValue, format ) => {

	if ( format && Object.keys( format ).length && !! format?.style ) {

		// Add custom options to a separate object. If we tack them on
		// the `format` object, they'll get saved to the `valueFormat`
		// block attribute.
		const options = {};

		if ( 'currency' === format.style ) {
			options.minimumFractionDigits = 0;
		}

		return numberFormat( progressValue, { ...format, ...options } );
	}

	return numberFormat( progressValue, {
		style:       'unit',
		unit:        DEFAULT_UNIT,
		unitDisplay: DEFAULT_UNIT_DISPLAY
	} );
};

/**
 * Returns an empty object to unset the progress value format.
 */
export const unsetValueFormat = () => { return {} };

/**
 * Sets the format value by key. If there is not yet a format, create a new
 * object. If there is no value provided, the key is deleted. If there is no
 * object keys at all, return `undefined`. This function is meant to be used in
 * conjunction when setting the format attribute:
 * `setAttributes( { valueFormat: setValueFormat() } )`.
 */
export const setValueFormat = ( format, key, value ) => {

	if ( ! format || undefined === format ) {
		format = {};
	}

	const callbacks = {
		style:           setValueStyle,
		unit:            setValueUnit,
		unitDisplay:     setValueUnitDisplay,
		currency:        setValueCurrency,
		currencyDisplay: setValueCurrencyDisplay
	};

	if ( key in callbacks ) {
		format = callbacks[ key ]( format, value );
	}

	return Object.keys( format ).length ? { ...format } : undefined;
};

/**
 * Sets the style for a number.
 */
export const setValueStyle = ( format, value ) => {
	if ( 'decimal' === value ) {
		return {
			style: value
		};
	} else if ( 'unit' === value ) {
		return {
			style: value,
			unit: DEFAULT_UNIT,
			unitDisplay: DEFAULT_UNIT_DISPLAY
		};
	} else if ( 'currency' === value ) {
		return {
			style: value,
			currency: DEFAULT_CURRENCY,
			currencyDisplay: DEFAULT_CURRENCY_DISPLAY
		};
	}

	return unsetValueFormat();
}

/**
 * Sets the currency for a number.
 */
export const setValueCurrency = ( format, value ) => {
	if ( ! value ) {
		return unsetValueFormat();
	}

	format.currencyDisplay = format?.currencyDisplay ?? DEFAULT_CURRENCY_DISPLAY;
	format.currency = value;
	format.style = 'currency';

	return format;
}

/**
 * Sets the currency display for a number.
 */
export const setValueCurrencyDisplay = ( format, value ) => {
	if ( ! value ) {
		return unsetValueFormat();
	}

	format.currencyDisplay = value;
	format.currency = format?.currency ?? DEFAULT_CURRENCY;
	format.style = 'currency';

	return format;
}

/**
 * Sets the unit for a number.
 */
export const setValueUnit = ( format, value ) => {
	if ( ! value ) {
		return unsetValueFormat();
	}

	format.unitDisplay = format?.unitDisplay ?? DEFAULT_UNIT_DISPLAY;
	format.unit = value;
	format.style = 'unit';

	return format;
}

/**
 * Sets the unit display for a number.
 */
export const setValueUnitDisplay = ( format, value ) => {
	if ( ! value ) {
		return unsetValueFormat();
	}

	format.unitDisplay = value;
	format.unit = format?.unit ?? DEFAULT_UNIT;
	format.style = 'unit';

	return format;
}
