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

import { setShadow } from './utils-shadow';

import {
	colorAttribute,
	colorSetting
} from '../common/utils-color';

import {
	useSetting,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown
} from '@wordpress/block-editor';

export default ( { panelId, shadow, setAttributes } ) => {

	// Get the base color and gradient options to pass into individual color
	// settings for our Color panel.
	const colorGradientOptions = useMultipleOriginColorsAndGradients();

	// Get all color palettes.
	const userColors    = useSetting( 'color.palette.custom' );
	const themeColors   = useSetting( 'color.palette.theme' );
	const defaultColors = useSetting ( 'color.palette.default' );

	// Flattened array with all color palettes.
	const colors = useMemo( () => [
		...( defaultColors || [] ),
		...( themeColors   || [] ),
		...( userColors    || [] )
	] );

	const colorSettings = [ {
		label: __( 'Color', 'x3p0-progress' ),
		colorValue: colorSetting( shadow?.color, colors ),
		onColorChange: ( value ) => setAttributes( {
			shadow: setShadow(
				shadow,
				'color',
				colorAttribute( value, colors )
			)
		} ),
		isShownByDefault: false,
		hasValue: () => !! shadow?.color,
		onDeselect: () => setAttributes( {
			shadow: setShadow( shadow, 'color' )
		} )
	} ];

	return (
		<ColorGradientSettingsDropdown
			settings={ colorSettings }
			panelId={ panelId }
			enableAlpha={ true }
			__experimentalHasMultipleOrigins
			__experimentalIsRenderedInSidebar
			{ ...colorGradientOptions }
		/>
	);
};
