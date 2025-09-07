/**
 * Toggle control for showing the progress in the label.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022-2025, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { ToggleControl } from '@wordpress/components';
import { __ }            from '@wordpress/i18n';

export default ({ showProgress, setAttributes }) => {
	return (
		<ToggleControl
			label={ __('Show progress in label', 'x3p0-progress') }
			checked={ showProgress }
			onChange={ () => setAttributes({
				showProgress: ! showProgress
			}) }
			__nextHasNoMarginBottom={true}
		/>
	);
};
