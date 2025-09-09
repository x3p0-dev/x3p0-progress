/**
 * Color block inspector panel.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022-2025, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { __ } from '@wordpress/i18n';

import {
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients
} from '@wordpress/block-editor';

export default ({
	attributes: {
		customProgressForegroundColor,
		customProgressBackgroundColor,
	},
	setAttributes,
	progressBackgroundColor,
	progressForegroundColor,
	setProgressBackgroundColor,
	setProgressForegroundColor,
	clientId
}) => {
	// Get the base color and gradient options to pass into individual color
	// settings for our Color panel.
	const colorGradientOptions = useMultipleOriginColorsAndGradients();

	const foregroundSettings = {
		label: __('Progress (Foreground)', 'x3p0-progress'),
		colorValue: progressForegroundColor.color || customProgressForegroundColor,
		onColorChange: (value) => {
			setProgressForegroundColor(value);

			setAttributes({
				customProgressForegroundColor: value
			});
		},
		isShownByDefault: true
	};

	const backgroundSettings = {
		label: __('Goal (Background)', 'x3p0-progress'),
		colorValue: progressBackgroundColor.color || customProgressBackgroundColor,
		onColorChange: (value) => {
			setProgressBackgroundColor(value);

			setAttributes({
				customProgressBackgroundColor: value
			});
		},
		isShownByDefault: true
	};

	return (
		<>
			<ColorGradientSettingsDropdown
				settings={ [ foregroundSettings ] }
				panelId={ clientId }
				__experimentalIsRenderedInSidebar={ true }
				__experimentalHasMultipleOrigins={ true }
				hasColorsOrGradients={ false }
				disableCustomColors={ false }
				{ ...colorGradientOptions }
			/>
			<ColorGradientSettingsDropdown
				settings={ [ backgroundSettings ] }
				panelId={ clientId }
				__experimentalIsRenderedInSidebar={ true }
				__experimentalHasMultipleOrigins={ true }
				hasColorsOrGradients={ false }
				disableCustomColors={ false }
				{ ...colorGradientOptions }
			/>
		</>
	);
};
