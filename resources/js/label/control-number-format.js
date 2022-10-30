/**
 * Number format control. This control primarily relies on JavaScript's `Intl`
 * functions for formatting the output of numbers in the block's `<label>`.
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
	setNumberFormat,
	DEFAULT_STYLE,
	DEFAULT_CURRENCY,
	DEFAULT_CURRENCY_DISPLAY,
	DEFAULT_UNIT,
	DEFAULT_UNIT_DISPLAY
} from './utils-label';

import { __experimentalVStack as VStack } from '@wordpress/components';

export default ( { numberFormat, setAttributes } ) => {

	const currencyOptions = useMemo( () => currencies() );
	const unitOptions     = useMemo( () => units()      );

	const styleControl = (
		<SelectControl
			label={ __( 'Number Format', 'x3p0-progress' ) }
			value={ numberFormat?.style ?? DEFAULT_STYLE }
			onChange={ ( value ) => setAttributes( {
				numberFormat: setNumberFormat( numberFormat, 'style', value )
			} ) }
			options={ [
				{ value: "",         label: __( 'Default (Percentage)', 'x3p0-progress' ) },
				{ value: "decimal",  label: __( 'Decimal',              'x3p0-progress' ) },
				{ value: "currency", label: __( 'Currency',             'x3p0-progress' ) },
				{ value: "unit",     label: __( 'Unit',                 'x3p0-progress' ) }
			] }
		/>
	);

	const currencyControl = numberFormat?.style === 'currency' && (
		<SelectControl
			label={ __( 'Currency', 'x3p0-progress' ) }
			value={ numberFormat?.currency ?? DEFAULT_CURRENCY }
			onChange={ ( value ) => setAttributes( {
				numberFormat: setNumberFormat( numberFormat, 'currency', value )
			} ) }
			options={ currencyOptions }
		/>
	);

	const currencyDisplayControl = numberFormat?.style === 'currency' && (
		<SelectControl
			label={ __( 'Currency Display', 'x3p0-progress' ) }
			value={ numberFormat?.currencyDisplay ?? DEFAULT_CURRENCY_DISPLAY }
			onChange={ ( value ) => setAttributes( {
				numberFormat: setNumberFormat( numberFormat, 'currencyDisplay', value )
			} ) }
			options={ [
				{ value: "symbol",       label: __( 'Symbol',        'x3p0-progress' ) },
				{ value: "narrowSymbol", label: __( 'Narrow Symbol', 'x3p0-progress' ) },
				{ value: "code",         label: __( 'Code',          'x3p0-progress' ) },
				{ value: "name",         label: __( 'Name',          'x3p0-progress' ) }
			] }
		/>
	);

	const unitControl = numberFormat?.style === 'unit' && (
		<SelectControl
			label={ __( 'Unit', 'x3p0-progress' ) }
			value={ numberFormat?.unit ?? DEFAULT_UNIT }
			onChange={ ( value ) => setAttributes( {
				numberFormat: setNumberFormat( numberFormat, 'unit', value )
			} ) }
			options={ unitOptions }
		/>
	);

	const unitDisplayControl = numberFormat?.style === 'unit' && (
		<SelectControl
			label={ __( 'Unit Display', 'x3p0-progress' ) }
			value={ numberFormat?.unitDisplay ?? DEFAULT_UNIT_DISPLAY }
			onChange={ ( value ) => setAttributes( {
				numberFormat: setNumberFormat( numberFormat, 'unitDisplay', value )
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
			<VStack spacing="4">
				{ styleControl }
				{ currencyControl }
				{ currencyDisplayControl }
				{ unitControl }
				{ unitDisplayControl }
			</VStack>
		</>
	);
}
