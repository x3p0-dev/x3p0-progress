
import { BlockControls } from '@wordpress/block-editor';
import { __ }            from '@wordpress/i18n';

import FlexDirectionToolbarButton from './button-flex-direction';

export default ( {
	attributes: {
		reversed,
		showLabel,
		showValue
	},
	setAttributes
} ) => {
	return ( showLabel || showValue ) && (
		<BlockControls group="block">
			<FlexDirectionToolbarButton
				onClick={ () => setAttributes( { reversed: ! reversed } ) }
				isPressed={ reversed }
			/>
		</BlockControls>
	);
};
