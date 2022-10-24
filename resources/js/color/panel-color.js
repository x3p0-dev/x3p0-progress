/**
 * Color block inspector panel.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { useMemo } from '@wordpress/element';
import { __ }      from '@wordpress/i18n';

import {
	formatColorValue,
	getColorSettingValue
} from '../common/functions-color';

import {
	formatGradientValue,
	getGradientSettingValue
} from '../common/functions-gradient';

import {
	PanelColorSettings,
	useSetting,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients
} from '@wordpress/block-editor';

const ColorPanel = ( {
	progressColor,
	progressGradient,
	progressBackgroundColor,
	progressBackgroundGradient,
	setAttributes
} ) => {
	// Get the base color and gradient options to pass into individual color
	// settings for our Color panel.
	const colorGradientOptions = useMultipleOriginColorsAndGradients();

	// Get all color palettes.
	const userColorPalette    = useSetting( 'color.palette.custom'   );
	const themeColorPalette   = useSetting( 'color.palette.theme'    );
	const defaultColorPalette = useSetting ( 'color.palette.default' );

	// Get all gradient palettes.
	const userGradientPalette    = useSetting( 'color.gradients.custom'  );
	const themeGradientPalette   = useSetting( 'color.gradients.theme'   );
	const defaultGradientPalette = useSetting( 'color.gradients.default' );

	// Flattened array with all color palettes.
	const colorsFlat = useMemo( () => [
		...( defaultColorPalette || [] ),
		...( themeColorPalette   || [] ),
		...( userColorPalette    || [] )
	], [ userColorPalette, themeColorPalette, defaultColorPalette ] );

	// Flattened array with all gradient palettes.
	const gradientsFlat = useMemo( () => [
		...( defaultGradientPalette || [] ),
		...( themeGradientPalette   || [] ),
		...( userGradientPalette    || [] )
	], [ userGradientPalette, themeGradientPalette, defaultGradientPalette ] );

	// Houses an array of the block's color settings.
	const colorSettings = [
		{
			label: __( 'Progress Value', 'x3p0-progress' ),
			value: getColorSettingValue( progressColor, colorsFlat ),
			gradientValue: getGradientSettingValue( progressGradient, gradientsFlat ),
			onChange: ( value ) => { setAttributes( {
				progressColor: formatColorValue( value, colorsFlat )
			} ) },
			onGradientChange: ( value ) => { setAttributes( {
				progressGradient: formatGradientValue( value, gradientsFlat )
			} ) },
			...colorGradientOptions
		},
		{
			label: __( 'Progress Background', 'x3p0-progress' ),
			value: getColorSettingValue( progressBackgroundColor, colorsFlat ),
			gradientValue: getGradientSettingValue( progressBackgroundGradient, gradientsFlat ),
			onChange: ( value ) => { setAttributes( {
				progressBackgroundColor: formatColorValue( value, colorsFlat )
			} ) },
			onGradientChange: ( value ) => { setAttributes( {
				progressBackgroundGradient: formatGradientValue( value, gradientsFlat )
			} ) },
			...colorGradientOptions
		}
	];

	// Creates a color settings panel. We have two custom colors for handling
	// the `<progress>` element background and value.
	return (
		<PanelColorSettings
			title={ __( 'Color', 'x3p0-progress' ) }
			colorSettings={ colorSettings }
			enableAlpha={ true }
			__experimentalIsRenderedInSidebar={ true }
			__experimentalHasMultipleOrigins={ true }
		/>
	);
};

export default ColorPanel;
