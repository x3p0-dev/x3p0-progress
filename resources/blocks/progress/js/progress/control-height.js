/**
 * Progress height control.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022-2025, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { useInstanceId } from '@wordpress/compose';
import { __ }            from '@wordpress/i18n';

import { __experimentalUnitControl as UnitControl }       from '@wordpress/block-editor';
import { __experimentalUseCustomUnits as useCustomUnits } from '@wordpress/components';

const HEIGHT_DEFAULTS = { em: 1.5,   rem: 1.5,   px: 24  };
const HEIGHT_MINS     = { em: 0.25,  rem: 0.25,  px: 4   };
const HEIGHT_MAXES    = { em: 8,     rem: 8,     px: 128 };
const STEPS           = { em: 0.005, rem: 0.005, px: 1   };

const HeightControl = ({ height, heightUnit, setAttributes }) => {
	const controlId = useInstanceId(HeightControl);

	return (
		<UnitControl
			label={ __('Height', 'x3p0-progress') }
			id={ `wp-block-x3p0-progress__height-${ controlId }` }
			min={ HEIGHT_MINS[ heightUnit ] }
			max={ HEIGHT_MAXES[ heightUnit ] }
			step={ STEPS[ heightUnit ] }
			value={ `${ height }${ heightUnit }` }
			__next40pxDefaultSize={ true }
			onChange={ (value) => {
				value = parseFloat(value);
				setAttributes({
					height: !! value ? value : undefined,
					heightUnit: !! value ? heightUnit : 'px'
				});
			} }
			onUnitChange={ (value) => setAttributes({
				height: HEIGHT_DEFAULTS[ value ],
				heightUnit: value
			}) }
			units={ useCustomUnits({
				availableUnits: Object.keys(HEIGHT_DEFAULTS),
				defaultValues: HEIGHT_DEFAULTS
			}) }
			style={ { maxWidth: 80 } }
		/>
	);
};

export default HeightControl;
