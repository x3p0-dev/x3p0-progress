/**
 * Shadow color control.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */
import { useMemo } from '@wordpress/element';
import { __ }      from '@wordpress/i18n';

import { setShadow } from './functions-shadow';

import {
	formatColorValue,
	getColorSettingValue
} from '../common/functions-color';

import {
	useSetting,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown
} from '@wordpress/block-editor';

const ShadowColorControl = ( {
	panelId,
	shadow,
	setAttributes
} ) => {
	// Get the base color and gradient options to pass into individual color
	// settings for our Color panel.
	const colorGradientOptions = useMultipleOriginColorsAndGradients();

	// Get all color palettes.
	const userColorPalette = useSetting( 'color.palette.custom' );
	const themeColorPalette = useSetting( 'color.palette.theme' );
	const defaultColorPalette = useSetting ( 'color.palette.default' );

	// Flattened array with all color palettes.
	const colorsFlat = useMemo( () => [
		...( defaultColorPalette || [] ),
		...( themeColorPalette   || [] ),
		...( userColorPalette    || [] )
	], [ userColorPalette, themeColorPalette, defaultColorPalette ] );

	const colorSetting = {
		label: __( 'Color', 'x3p0-progress' ),
		colorValue: getColorSettingValue( shadow?.color, colorsFlat ),
		onColorChange: ( value ) => {
			setAttributes( {
				shadow: setShadow(
					shadow,
					'color',
					formatColorValue( value, colorsFlat )
				)
			} );
		},
		isShownByDefault: false,
		hasValue: () => !! shadow?.color,
		onDeselect: () => setAttributes( {
			shadow: setShadow( shadow, 'color' )
		} )
	};

	return (
		<ColorGradientSettingsDropdown
			settings={ [ colorSetting ] }
			panelId={ panelId }
			enableAlpha={ true }
			__experimentalHasMultipleOrigins
			__experimentalIsRenderedInSidebar
			{ ...colorGradientOptions }
		/>
	);
};

export default ShadowColorControl;
