/**
 * Toggle control for showing the label.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { ToggleControl } from '@wordpress/components';
import { __ }            from '@wordpress/i18n';

export default ( { showLabel, setAttributes } ) => {
	return (
		<ToggleControl
			label={ __( 'Show label', 'x3p0-progress' ) }
			checked={ showLabel }
			onChange={ () => setAttributes( {
				showLabel: ! showLabel
			} ) }
		/>
	);
};
