/**
 * Displays buttons for justifying the label's content.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
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
		label: __( 'Left', 'x3p0-progress' ),
		value: 'left',
		icon: justifyLeft
	},
	{
		label: __( 'Center', 'x3p0-progress' ),
		value: 'center',
		icon: justifyCenter
	},
	{
		label: __( 'Right', 'x3p0-progress' ),
		value: 'right',
		icon: justifyRight
	},
	{
		label: __( 'Space Between', 'x3p0-progress' ),
		value: 'between',
		icon: justifySpaceBetween
	}
];

export default ( { justifyLabel, setAttributes } ) => {

	const buttons = JUSTIFICATIONS.map( ( justification ) => { return (
		<Button
			key={ justification.value }
			icon={ justification.icon }
			label={ justification.label }
			isPressed={ justification.value === justifyLabel }
			onClick={ () => setAttributes( {
				justifyLabel: justification.value
			} ) }
		/>
	) } );

	return (
		<fieldset className="x3p0-progress-editor-justify-control">
			<BaseControl.VisualLabel as="legend">
				{ __( 'Justification', 'x3p0-progress' ) }
			</BaseControl.VisualLabel>
			<div className="x3p0-progress-editor-justify-control__buttons">
				{ buttons }
			</div>
		</fieldset>
	);
};
