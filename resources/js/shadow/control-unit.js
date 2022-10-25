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

import {
	BaseControl,
	RangeControl,
	__experimentalGrid as Grid,
	 __experimentalUseCustomUnits as useCustomUnits
} from '@wordpress/components';

const ShadowUnitControl = ( props ) => {
	const controlId = useInstanceId( ShadowUnitControl );

	return (
		<BaseControl label={ props?.label }>
			<Grid columns={ 2 } >
				<UnitControl
					id={ `wp-block-x3p0-progress__shadow-unit-${ controlId }` }
					min={ props?.min ?? -32 }
					max={ props?.max ?? 32 }
					units={ useCustomUnits( {
						availableUnits: [ 'px' ],
						defaultValues: { 'px': 0 },
					} ) }
					value={ props?.value }
					onChange={ props?.onChange }
					onUnitChange={ props?.onUnitChange }
				/>
				<RangeControl
					min={ props?.min ?? -32 }
					max={ props?.max ?? 32 }
					initialPosition={ 0 }
					value={ props?.value }
					withInputField={ false }
					onChange={ props?.onChange }
				/>
			</Grid>
		</BaseControl>
	);
};

export default ShadowUnitControl;
