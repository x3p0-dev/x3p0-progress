/**
 * Displays buttons for justifying the label's content.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022-2025, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { __ } from '@wordpress/i18n';

import {
	BaseControl,
	Button
} from '@wordpress/components';

import {
	justifyLeft,
	justifyCenter,
	justifyRight,
	justifySpaceBetween
} from '@wordpress/icons';

const JUSTIFICATIONS = [
	{
		name:  'left',
		label: __('Left', 'x3p0-progress'),
		icon:  justifyLeft
	},
	{
		name:  'center',
		label: __('Center', 'x3p0-progress'),
		icon:  justifyCenter
	},
	{
		name:  'right',
		label: __('Right', 'x3p0-progress'),
		icon:  justifyRight
	},
	{
		name:  'between',
		label: __('Space Between', 'x3p0-progress'),
		icon:  justifySpaceBetween
	}
];

export default ({ justifyLabel, setAttributes }) => {

	const buttons = JUSTIFICATIONS.map((justification) => { return (
		<Button
			key={ justification.name }
			icon={ justification.icon }
			label={ justification.label }
			isPressed={ justification.name === justifyLabel }
			onClick={ () => setAttributes({
				justifyLabel: justification.name === justifyLabel
				              ? undefined
					      : justification.name
			}) }
		/>
	) });

	return (
		<fieldset className="x3p0-progress-editor-justify-control">
			<BaseControl.VisualLabel as="legend">
				{ __('Justification', 'x3p0-progress') }
			</BaseControl.VisualLabel>
			<div className="x3p0-progress-editor-justify-control__buttons">
				{ buttons }
			</div>
		</fieldset>
	);
};
