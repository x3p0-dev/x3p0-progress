
import { ToggleControl } from '@wordpress/components';
import { __ }            from '@wordpress/i18n';

export default ( { showLabel, setAttributes } ) => {
	// let hasInset = shadow?.inset ?? false;

	return (
		<ToggleControl
			label={ __( 'Show text label', 'x3p0-progress' ) }
			checked={ showLabel }
			onChange={ () => setAttributes( {
				showLabel: true === showLabel ? false : true
			} ) }
		/>
	);
};
