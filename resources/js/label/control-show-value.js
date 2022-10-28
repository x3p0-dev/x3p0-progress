
import { ToggleControl } from '@wordpress/components';
import { __ }            from '@wordpress/i18n';

export default ( { showValue, setAttributes } ) => {
	// let hasInset = shadow?.inset ?? false;

	return (
		<ToggleControl
			label={ __( 'Show progress in label', 'x3p0-progress' ) }
			checked={ showValue }
			onChange={ () => setAttributes( {
				showValue: true === showValue ? false : true
			} ) }
		/>
	);
};
