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

import {
	__experimentalVStack as VStack,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

const ProgressPanel = ( {
	progressValue,
	progressMax,
	height,
	heightUnit,
	setAttributes
} ) => {
	const panelId = useInstanceId( ProgressPanel );

	const [ maxItem,    setMaxItem    ] = useState();
	const [ valueItem,  setValueItem  ] = useState( progressValue );
	const [ formatItem, setFormatItem ] = useState();
	const [ heightItem, setHeightItem ] = useState();

	const resetMaxItem    = () => setAttributes( { progressMax: 100  } );
	const resetValueItem  = () => setAttributes( { progressValue: 50 } );
	const resetHeightItem = () => setAttributes( { height: undefined, heightUnit: undefined } );

	const resetPanel = () => {
		resetMaxItem();
		resetValueItem();
		resetHeightItem();

		setMaxItem( undefined );
		setValueItem( undefined );
		setFormatItem( undefined );
		setHeightItem( undefined );
	};

	return (
		<ToolsPanel
			label={ __( 'Progress', 'x3p0-progress' ) }
			resetAll={ resetPanel }
			panelId={ panelId }
			className="wp-block-x3p0-progress-panel__progress"
		>
			<ToolsPanelItem
				label={ __( 'Goal', 'x3p0-progress' ) }
				hasValue={ () => 100 !== progressMax }
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
				label={ __( 'Progress', 'x3p0-progress' ) }
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
		</ToolsPanel>
	);
}

export default ProgressPanel;
