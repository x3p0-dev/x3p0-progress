
import { BlockControls } from '@wordpress/block-editor';
import { __ }            from '@wordpress/i18n';

import ShowLabelToolbarButton from './button-show-label';
import ShowValueToolbarButton from './button-show-value';

export default ( {
	attributes: {
		showLabel,
		showValue
	},
	setAttributes
} ) => {
	// Creates the "other" group toolbar controls.  This includes two toggle
	// buttons for enabling/displaying the label text and progress value from
	// showing in the `<label>` element.  I'm not 100% happy with the icons,
	// but it's the best we have right now.
	return (
		<BlockControls group="other">
			<ShowLabelToolbarButton
				onClick={ () => setAttributes( { showLabel: ! showLabel } ) }
				isPressed={ showLabel }
			/>
			{ showLabel && (
				<ShowValueToolbarButton
					onClick={ () => setAttributes( { showValue: ! showValue } ) }
					isPressed={ showValue }
				/>
			) }
		</BlockControls>
	);
};
