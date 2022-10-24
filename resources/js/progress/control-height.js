/**
 * Progress height control.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { useInstanceId } from '@wordpress/compose';
import { __ }            from '@wordpress/i18n';

import { __experimentalUnitControl as UnitControl }       from '@wordpress/block-editor';
import { __experimentalUseCustomUnits as useCustomUnits } from '@wordpress/components';

const HEIGHT_DEFAULTS = { rem: 1.5,   px: 24  };
const HEIGHT_MINS     = { rem: 0.25,  px: 4   };
const HEIGHT_MAXES    = { rem: 8,     px: 128 };
const STEPS           = { rem: 0.001, px: 1   };

const HeightControl = ( { height, heightUnit, setAttributes } ) => {

	const controlId = useInstanceId( HeightControl );

	return (
		<UnitControl
			label={ __( 'Height', 'x3p0-progress' ) }
			id={ `wp-block-x3p0-progress__height-${ controlId }` }
			min={ HEIGHT_MINS[ heightUnit ] }
			max={ HEIGHT_MAXES[ heightUnit ] }
			step={ STEPS[ heightUnit ] }
			value={ `${ height }${ heightUnit }` }
			onChange={ ( value ) => {
				value = parseFloat( value, 10 );
				setAttributes( {
					height: !! value ? value : undefined,
					heightUnit: !! value ? heightUnit : 'px'
				} );
			} }
			onUnitChange={ ( value ) => setAttributes( {
				height: HEIGHT_DEFAULTS[ value ],
				heightUnit: value
			} ) }
			units={ useCustomUnits( {
				availableUnits: Object.keys( HEIGHT_DEFAULTS ),
				defaultValues: HEIGHT_DEFAULTS
			} ) }
			style={ { maxWidth: 80 } }
		/>
	);
};

export default HeightControl;
