/**
 * Progress settings block inspector panel.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { useInstanceId } from '@wordpress/compose';
import { useState }      from '@wordpress/element';
import { __ }            from '@wordpress/i18n';

import HeightControl from './control-height';
import MaxControl    from './control-max';
import ValueControl  from './control-value';
import WidthControl  from './control-width';

import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

const ProgressPanel = ( {
	progressValue,
	progressMax,
	height,
	heightUnit,
	width,
	widthUnit,
	setAttributes
} ) => {
	const panelId = useInstanceId( ProgressPanel );

	const [ maxItem,    setMaxItem    ] = useState();
	const [ valueItem,  setValueItem  ] = useState( progressValue );
	const [ heightItem, setHeightItem ] = useState();
	const [ widthItem,  setWidthItem  ] = useState();

	const resetMaxItem    = () => setAttributes( { progressMax: 100  } );
	const resetValueItem  = () => setAttributes( { progressValue: 50 } );
	const resetHeightItem = () => setAttributes( { height: undefined, heightUnit: undefined } );
	const resetWidthItem  = () => setAttributes( { width: undefined,  widthUnit: undefined } );

	const resetPanel = () => {
		resetMaxItem();
		resetValueItem();
		resetHeightItem();
		resetWidthItem();

		setMaxItem( undefined );
		setValueItem( undefined );
		setHeightItem( undefined );
		setWidthItem( undefined );
	};

	return (
		<ToolsPanel
			label={ __( 'Progress Settings', 'x3p0-progress' ) }
			resetAll={ resetPanel }
			panelId={ panelId }
			className="wp-block-x3p0-progress-panel__progress"
		>
			<ToolsPanelItem
				label={ __( 'Max Value', 'x3p0-progress' ) }
				hasValue={ () => !! progressMax }
				onDeselect={ resetMaxItem }
				panelId={ panelId }
			>
				<MaxControl
					progressValue={ progressValue }
					progressMax={ progressMax }
					setAttributes={ setAttributes }
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Value', 'x3p0-progress' ) }
				isShownByDefault
				hasValue={ () => 50 !== progressValue }
				onDeselect={ resetValueItem }
				panelId={ panelId }
			>
				<ValueControl
					progressValue={ progressValue }
					progressMax={ progressMax }
					setAttributes={ setAttributes }
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Height', 'x3p0-progress' ) }
				hasValue={ () => !! height }
				onDeselect={ resetHeightItem }
				panelId={ panelId }
			>
				<HeightControl
					height={ height }
					heightUnit={ heightUnit }
					setAttributes={ setAttributes }
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Width', 'x3p0-progress' ) }
				hasValue={ () => !! width }
				onDeselect={ resetWidthItem }
				panelId={ panelId }
				style={ { gridColumn: "span 2" } }
			>
				<WidthControl
					width={ width }
					widthUnit={ widthUnit }
					setAttributes={ setAttributes }
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}

export default ProgressPanel;
