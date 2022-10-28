/**
 * Progress max attribute control.
 *
 * The `max` attribute must be a number greater than 0, but there is no upper
 * limit. We're using the `NumberControl` because of this infinite limit.
 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#attr-max
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { __ } from '@wordpress/i18n';
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';

export default ( { progressMax, progressValue, setAttributes } ) => {
	return (
		<NumberControl
			label={ __( 'Goal', 'x3p0-progress' ) }
			min="1"
			value={ progressMax }
			onChange={ ( value ) => {
				const newValue = value !== '' ? parseInt( value, 10 ) : 1;

				let newAttr = { progressMax: newValue };

				if ( progressValue > newValue ) {
					newAttr.progressValue = Math.round( newValue / 2 );
				}

				setAttributes( newAttr );
			} }
		/>
	);
};
