/**
 * Progress width control.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { useInstanceId } from '@wordpress/compose';
import { __ }            from '@wordpress/i18n';

import { __experimentalUnitControl as UnitControl } from '@wordpress/block-editor';

import {
	Button,
	ButtonGroup,
	__experimentalVStack as VStack,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';

const WIDTH_DEFAULTS = { '%': 100   };
const WIDTH_MINS     = { '%': 1     };
const WIDTH_MAXES    = { '%': 100   };
const STEPS          = { '%': 0.001 };

const WidthControl = ( { width, widthUnit, setAttributes } ) => {

	const controlId = useInstanceId( WidthControl );

	const currentWidth = `${ width }${ widthUnit }`;

	const buttons = [ 25, 50, 75, 100 ].map( ( value ) => {
		const variant = `${ value }%` === currentWidth ? 'primary' : undefined;

		return (
			<Button
				key={ value }
				isSmall
				variant={ variant }
				onClick={ () => setAttributes( {
					width: value,
					widthUnit: '%',
				} ) }
			>
				{ value }%
			</Button>
		);
	} );

	return (
		<VStack spacing="2">
			<UnitControl
				label={ __( 'Width', 'x3p0-progress' ) }
				id={ `wp-block-x3p0-progress__width-${ controlId }` }
				min={ WIDTH_MINS[ widthUnit ] }
				max={ WIDTH_MAXES[ widthUnit ] }
				step={ STEPS[ widthUnit ] }
				value={ currentWidth }
				onChange={ ( value ) => {
					value = parseFloat( value, 10 );
					setAttributes( {
						width: !! value ? value : undefined,
						widthUnit: !! value ? widthUnit : '%'
					} );
				} }
				onUnitChange={ ( value ) => setAttributes( {
					width: WIDTH_DEFAULTS[ value ],
					widthUnit: value
				} ) }
				units={ useCustomUnits( {
					availableUnits: Object.keys( WIDTH_DEFAULTS ),
					defaultValues: WIDTH_DEFAULTS
				} ) }
				style={ { maxWidth: 80 } }
			/>
			<ButtonGroup
				className="components-button-group"
				aria-label={ __( 'Percentage Width', 'x3p0-progress' ) }
			>
				{ buttons }
			</ButtonGroup>
		</VStack>
	);
};

export default WidthControl;
