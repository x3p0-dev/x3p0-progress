/**
 * Color block inspector panel.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022-2025, Justin Tadlock
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
	useSettings,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients
} from '@wordpress/block-editor';

export default ({
	attributes: {
		progressForegroundColor,
		progressForegroundGradient,
		progressBackgroundColor,
		progressBackgroundGradient
	},
	setAttributes,
	clientId
}) => {
	// Get the base color and gradient options to pass into individual color
	// settings for our Color panel.
	const colorGradientOptions = useMultipleOriginColorsAndGradients();

	const [
		userColors,
		themeColors,
		defaultColors,
		userGradients,
		themeGradients,
		defaultGradients
	] = useSettings([
		'color.palette.custom',
		'color.palette.theme',
		'color.palette.default',
		'color.gradients.custom',
		'color.gradients.theme',
		'color.gradients.default'
	]);

	// Flattened array with all color palettes.
	const colors = useMemo(() => [
		...(defaultColors || []),
		...(themeColors   || []),
		...(userColors    || [])
	], []);

	// Flattened array with all gradient palettes.
	const gradients = useMemo(() => [
		...(defaultGradients || []),
		...(themeGradients   || []),
		...(userGradients    || [])
	], []);

	const foregroundSettings = {
		label: __('Progress (Foreground)', 'x3p0-progress'),
		colorValue: colorSetting(progressForegroundColor, colors),
		gradientValue: gradientSetting(progressForegroundGradient, gradients),
		onColorChange: (value) => { setAttributes({
			progressForegroundColor: colorAttribute(value, colors)
		}) },
		onGradientChange: (value) => { setAttributes({
			progressForegroundGradient: gradientAttribute(value, gradients)
		}) },
		isShownByDefault: true
	};

	const backgroundSettings = {
		label: __('Goal (Background)', 'x3p0-progress'),
		colorValue: colorSetting(progressBackgroundColor, colors),
		gradientValue: gradientSetting(progressBackgroundGradient, gradients),
		onColorChange: (value) => { setAttributes({
			progressBackgroundColor: colorAttribute(value, colors)
		}) },
		onGradientChange: (value) => { setAttributes({
			progressBackgroundGradient: gradientAttribute(value, gradients)
		}) },
		isShownByDefault: true
	};

	return (
		<>
			<ColorGradientSettingsDropdown
				settings={ [ foregroundSettings ] }
				panelId={ clientId }
				__experimentalIsRenderedInSidebar={ true }
				__experimentalHasMultipleOrigins={ true }
				hasColorsOrGradients={ true }
				disableCustomColors={ false }
				{ ...colorGradientOptions }
			/>
			<ColorGradientSettingsDropdown
				settings={ [ backgroundSettings ] }
				panelId={ clientId }
				__experimentalIsRenderedInSidebar={ true }
				__experimentalHasMultipleOrigins={ true }
				hasColorsOrGradients={ true }
				disableCustomColors={ false }
				{ ...colorGradientOptions }
			/>
		</>
	);
};
