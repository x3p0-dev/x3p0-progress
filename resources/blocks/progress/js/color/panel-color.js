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
	colorAttribute,
	colorSetting
} from '../common/utils-color';

import {
	gradientAttribute,
	gradientSetting
} from '../common/utils-gradient';

import {
	PanelColorSettings,
	useSetting,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients
} from '@wordpress/block-editor';

const ColorPanel = ( {
	attributes: {
		progressForegroundColor,
		progressForegroundGradient,
		progressBackgroundColor,
		progressBackgroundGradient
	},
	setAttributes
} ) => {
	// Get the base color and gradient options to pass into individual color
	// settings for our Color panel.
	const colorGradientOptions = useMultipleOriginColorsAndGradients();

	// Get all color palettes.
	const userColors    = useSetting( 'color.palette.custom'   );
	const themeColors   = useSetting( 'color.palette.theme'    );
	const defaultColors = useSetting ( 'color.palette.default' );

	// Get all gradient palettes.
	const userGradients    = useSetting( 'color.gradients.custom'  );
	const themeGradients   = useSetting( 'color.gradients.theme'   );
	const defaultGradients = useSetting( 'color.gradients.default' );

	// Flattened array with all color palettes.
	const colors = useMemo( () => [
		...( defaultColors || [] ),
		...( themeColors   || [] ),
		...( userColors    || [] )
	] );

	// Flattened array with all gradient palettes.
	const gradients = useMemo( () => [
		...( defaultGradients || [] ),
		...( themeGradients   || [] ),
		...( userGradients    || [] )
	] );

	const colorSettings = [
		{
			label: __( 'Progress (Foreground)', 'x3p0-progress' ),
			value: colorSetting( progressForegroundColor, colors ),
			gradientValue: gradientSetting( progressForegroundGradient, gradients ),
			onChange: ( value ) => { setAttributes( {
				progressForegroundColor: colorAttribute( value, colors )
			} ) },
			onGradientChange: ( value ) => { setAttributes( {
				progressForegroundGradient: gradientAttribute( value, gradients )
			} ) },
			...colorGradientOptions
		},
		{
			label: __( 'Goal (Background)', 'x3p0-progress' ),
			value: colorSetting( progressBackgroundColor, colors ),
			gradientValue: gradientSetting( progressBackgroundGradient, gradients ),
			onChange: ( value ) => { setAttributes( {
				progressBackgroundColor: colorAttribute( value, colors )
			} ) },
			onGradientChange: ( value ) => { setAttributes( {
				progressBackgroundGradient: gradientAttribute( value, gradients )
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
