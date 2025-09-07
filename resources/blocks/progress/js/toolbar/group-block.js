
import { BlockControls } from '@wordpress/block-editor';
import { __ }            from '@wordpress/i18n';

import FlexDirectionToolbarButton from './button-flex-direction';

export default ({
	attributes: {
		reversed,
		showLabel
	},
	setAttributes
}) => {
	return showLabel && (
		<BlockControls group="block">
			<FlexDirectionToolbarButton
				onClick={ () => setAttributes({ reversed: ! reversed }) }
				isPressed={ reversed }
			/>
		</BlockControls>
	);
};
