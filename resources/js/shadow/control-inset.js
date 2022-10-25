/**
 * Shadow inset control.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { ToggleControl } from '@wordpress/components';
import { __ }            from '@wordpress/i18n';

import { setShadow } from './functions-shadow';

export default ( { shadow, setAttributes } ) => {
	let hasInset = shadow?.inset ?? false;

	return (
		<ToggleControl
			label={ __( 'Toggle shadow position', 'x3p0-progress' ) }
			help={
				hasInset
				? __( 'Shadow is inside its container', 'x3p0-progress' )
				: __( 'Shadow is outside its container', 'x3p0-progress' )
			}
			checked={ hasInset }
			onChange={ () => {
				hasInset = ! hasInset;
				setAttributes( {
					shadow: setShadow( shadow, 'inset', hasInset )
				} );
			} }
		/>
	);
};
