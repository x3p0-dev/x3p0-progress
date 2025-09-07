
import { BlockControls } from '@wordpress/block-editor';
import { __ }            from '@wordpress/i18n';

import ShowLabelToolbarButton from './button-show-label';

export default ({
	attributes: { showLabel },
	setAttributes
}) => {
	return (
		<BlockControls group="other">
			<ShowLabelToolbarButton
				onClick={ () => setAttributes({ showLabel: ! showLabel }) }
				isPressed={ showLabel }
			/>
		</BlockControls>
	);
};
