/**
 * Progress value attribute control.
 *
 * The `value` attribute can be any number from 0 to the value of `max` attribute.
 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#attr-value
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { RangeControl } from '@wordpress/components';
import { __ }           from '@wordpress/i18n';

export default ( { progressMax, progressValue, setAttributes } ) => {
	return (
		<RangeControl
			label={ __( 'Value', 'x3p0-progress' ) }
			min="0"
			max={ progressMax }
			withInputField={ true }
			allowReset={ true }
			resetFallbackValue={ Math.round( progressMax / 2 ) }
			value={ progressValue }
			onChange={ ( value ) =>
				setAttributes( { progressValue: value } )
			}
		/>
	);
}
