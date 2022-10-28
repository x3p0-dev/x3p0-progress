
import { BaseControl, Button } from '@wordpress/components';
import { __ }            from '@wordpress/i18n';

import {
	justifyLeft,
	justifyCenter,
	justifyRight,
	justifySpaceBetween
} from '@wordpress/icons';

const JUSTIFY_OPTIONS = [
	{
		name: __( 'Left', 'x3p0-progress' ),
		value: 'left',
		icon: justifyLeft
	},
	{
		name: __( 'Center', 'x3p0-progress' ),
		value: 'center',
		icon: justifyCenter
	},
	{
		name: __( 'Right', 'x3p0-progress' ),
		value: 'right',
		icon: justifyRight
	},
	{
		name: __( 'Space Between', 'x3p0-progress' ),
		value: 'between',
		icon: justifySpaceBetween
	}
];

export default ( { justifyLabel, setAttributes } ) => {

	console.log( justifyLabel );

	const buttons = JUSTIFY_OPTIONS.map( ( justification ) => { return (
		<Button
			key={ justification.value }
			icon={ justification.icon }
			label={ justification.name }
			isPressed={ justification.value === justifyLabel }
			onClick={ () => setAttributes( {
				justifyLabel: justification.value
			} ) }
		/>
	); } );

	return (
		<fieldset className="block-editor-text-transform-control">
			<BaseControl.VisualLabel as="legend">
				{ __( 'Justification', 'x3p0-progress' ) }
			</BaseControl.VisualLabel>
			<div className="block-editor-text-transform-control__buttons">
				{ buttons }
			</div>
		</fieldset>
	);
};
