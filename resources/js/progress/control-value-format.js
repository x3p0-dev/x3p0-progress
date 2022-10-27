/**
 * Progress value format control. This control primarily relies on JavaScripts
 * `Intl` functions for formatting the output of the value as text in the
 * block's `<label>` element.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { SelectControl } from '@wordpress/components';
import { useMemo }       from '@wordpress/element';
import { __ }            from '@wordpress/i18n';

import { currencies, units } from '../common/utils-i18n';

import {
	setValueFormat,
	DEFAULT_STYLE,
	DEFAULT_CURRENCY,
	DEFAULT_CURRENCY_DISPLAY,
	DEFAULT_UNIT,
	DEFAULT_UNIT_DISPLAY
} from './utils-progress';

export default ( { valueFormat, setAttributes } ) => {

	const currencyOptions = useMemo( () => currencies() );
	const unitOptions     = useMemo( () => units()      );

	const styleControl = (
		<SelectControl
			label={ __( 'Format: Style', 'x3p0-progress' ) }
			value={ valueFormat?.style ?? DEFAULT_STYLE }
			onChange={ ( value ) => setAttributes( {
				valueFormat: setValueFormat( valueFormat, 'style', value )
			} ) }
			options={ [
				{ value: "",         label: ""                                },
				{ value: "decimal",  label: __( 'Decimal',  'x3p0-progress' ) },
				{ value: "currency", label: __( 'Currency', 'x3p0-progress' ) },
				{ value: "unit",     label: __( 'Unit',     'x3p0-progress' ) }
			] }
		/>
	);

	const currencyControl = valueFormat?.style === 'currency' && (
		<SelectControl
			label={ __( 'Format: Currency', 'x3p0-progress' ) }
			value={ valueFormat?.currency ?? DEFAULT_CURRENCY }
			onChange={ ( value ) => setAttributes( {
				valueFormat: setValueFormat( valueFormat, 'currency', value )
			} ) }
			options={ currencyOptions }
		/>
	);

	const currencyDisplayControl = valueFormat?.style === 'currency' && (
		<SelectControl
			label={ __( 'Format: Currency Display', 'x3p0-progress' ) }
			value={ valueFormat?.currencyDisplay ?? DEFAULT_CURRENCY_DISPLAY }
			onChange={ ( value ) => setAttributes( {
				valueFormat: setValueFormat( valueFormat, 'currencyDisplay', value )
			} ) }
			options={ [
				{ value: "symbol",       label: __( 'Symbol',        'x3p0-progress' ) },
				{ value: "narrowSymbol", label: __( 'Narrow Symbol', 'x3p0-progress') },
				{ value: "code",         label: __( 'Code',          'x3p0-progress' ) },
				{ value: "name",         label: __( 'Name',          'x3p0-progress' ) }
			] }
		/>
	);

	const unitControl = valueFormat?.style === 'unit' && (
		<SelectControl
			label={ __( 'Format: Unit', 'x3p0-progress' ) }
			value={ valueFormat?.unit ?? DEFAULT_UNIT }
			onChange={ ( value ) => setAttributes( {
				valueFormat: setValueFormat( valueFormat, 'unit', value )
			} ) }
			options={ unitOptions }
		/>
	);

	const unitDisplayControl = valueFormat?.style === 'unit' && (
		<SelectControl
			label={ __( 'Format: Unit Display', 'x3p0-progress' ) }
			value={ valueFormat?.unitDisplay ?? DEFAULT_UNIT_DISPLAY }
			onChange={ ( value ) => setAttributes( {
				valueFormat: setValueFormat( valueFormat, 'unitDisplay', value )
			} ) }
			options={ [
				{ value: "long",   label: __( 'Long',   'x3p0-progress' ) },
				{ value: "short",  label: __( 'Short',  'x3p0-progress' ) },
				{ value: "narrow", label: __( 'Narrow', 'x3p0-progress' ) }
			] }
		/>
	);

	return (
		<>
			{ styleControl }
			{ currencyControl }
			{ currencyDisplayControl }
			{ unitControl }
			{ unitDisplayControl }
		</>
	);
}
