/**
 * Flex direction toolbar button.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022-2025, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { __ } from '@wordpress/i18n';
import { rotateIcon } from '../common/utils-icon';
import { ToolbarButton } from '@wordpress/components';

export default (props) => {
	return (
		<ToolbarButton
			title={ __('Toggle the order of block elements', 'x3p0-progress') }
			icon={ rotateIcon }
			{ ...props }
		/>
	);
};
