
import { ToggleControl } from '@wordpress/components';
import { __ }            from '@wordpress/i18n';

export default ( { showMax, setAttributes } ) => {

	return (
		<ToggleControl
			label={ __( 'Show goal in label', 'x3p0-progress' ) }
			checked={ showMax }
			onChange={ () => setAttributes( {
				showMax: true === showMax ? false : true
			} ) }
		/>
	);
};
