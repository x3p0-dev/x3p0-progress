/**
 * Shadow unit control.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { __ }            from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';

import { __experimentalUnitControl as UnitControl } from '@wordpress/block-editor';
import { __experimentalUseCustomUnits as useCustomUnits } from '@wordpress/components';

const ShadowUnitControl = ( props ) => {
	const controlId = useInstanceId( ShadowUnitControl );

	return (
		<UnitControl
			id={ `wp-block-x3p0-progress__shadow-unit-${ controlId }` }
			min="0px"
			units={ useCustomUnits( {
				availableUnits: [ 'px' ],
				defaultValues: { 'px': 0 },
			} ) }
			{ ...props }
		/>
	);
};

export default ShadowUnitControl;
