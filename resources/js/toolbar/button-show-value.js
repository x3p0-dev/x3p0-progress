/**
 * Show value toolbar button.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { toggleOffIcon, toggleOnIcon } from '../common/utils-icon';

import { ToolbarButton } from '@wordpress/components';
import { __ }            from '@wordpress/i18n';

export default ( props ) => {
	return (
		<ToolbarButton
			title={ __( 'Toggle value in label', 'x3p0-progress' ) }
			icon={ props?.isPressed ? toggleOnIcon : toggleOffIcon }
			{ ...props }
			isPressed={ false }
		/>
	);
};
