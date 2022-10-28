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

import JustifyLabelControl from './control-justify-label';
import NumberFormatControl from './control-number-format';
import ShowLabelControl    from './control-show-label';
import ShowMaxControl      from './control-show-max';
import ShowValueControl    from './control-show-value';

import {
	__experimentalVStack as VStack,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

const LabelPanel = ( {
	progressValue,
	progressMax,
	justifyLabel,
	showLabel,
	showMax,
	showValue,
	numberFormat,
	setAttributes
} ) => {
	const panelId = useInstanceId( LabelPanel );

	const [ formatItem, setFormatItem ] = useState();

	const resetFormatItem   = () => setAttributes( { numberFormat: undefined } );
	const resetJustifyLabel = () => setAttributes( { justifyLabel: 'left'    } );
	const resetShowLabel    = () => setAttributes( { showLabel:    false     } );
	const resetShowMax      = () => setAttributes( { showMax:      false     } );
	const resetShowValue    = () => setAttributes( { showValue:    false     } );

	const resetPanel = () => {
		resetFormatItem();
		resetJustifyLabel();
		resetShowLabel();
		resetShowMax();
		resetShowValue();

		setFormatItem( undefined );
	};

	return (
		<ToolsPanel
			label={ __( 'Label', 'x3p0-progress' ) }
			resetAll={ resetPanel }
			panelId={ panelId }
			className="wp-block-x3p0-progress-panel__label"
		>
			<ToolsPanelItem
				label={ __( 'Show Label', 'x3p0-progress' ) }
				hasValue={ () => !! showLabel }
				onDeselect={ resetShowLabel }
				onSelect={ () => setAttributes( {
					showLabel: true
				} ) }
				panelId={ panelId }
			>
				<ShowLabelControl
					showLabel={ showLabel }
					setAttributes={ setAttributes }
				/>
			</ToolsPanelItem>
			{ showLabel && (
				<ToolsPanelItem
					label={ __( 'Show Progress', 'x3p0-progress' ) }
					hasValue={ () => !! showValue }
					onDeselect={ resetShowValue }
					onSelect={ () => setAttributes( {
						showValue: true
					} ) }
					panelId={ panelId }
				>
					<ShowValueControl
						showValue={ showValue }
						setAttributes={ setAttributes }
					/>
				</ToolsPanelItem>
			) }
			{ ( showLabel && showValue ) && (
				<ToolsPanelItem
					label={ __( 'Show Goal', 'x3p0-progress' ) }
					hasValue={ () => !! showMax }
					onDeselect={ resetShowMax }
					onSelect={ () => setAttributes( {
						showMax: true
					} ) }
					panelId={ panelId }
				>
					<ShowMaxControl
						showMax={ showMax }
						setAttributes={ setAttributes }
					/>
				</ToolsPanelItem>
			) }
			{ ( showLabel && showValue ) && (
				<ToolsPanelItem
					label={ __( 'Justification', 'x3p0-progress' ) }
					isShownByDefault
					hasValue={ () => !! justifyLabel }
					onDeselect={ resetJustifyLabel }
					panelId={ panelId }
				>
					<JustifyLabelControl
						justifyLabel={ justifyLabel }
						setAttributes={ setAttributes }
					/>
				</ToolsPanelItem>
			) }
			{ ( showLabel && showValue ) && (
				<ToolsPanelItem
					label={ __( 'Number Format', 'x3p0-progress' ) }
					hasValue={ () => !! numberFormat }
					onDeselect={ resetFormatItem }
					panelId={ panelId }
				>
					<VStack spacing="4">
						<NumberFormatControl
							numberFormat={ numberFormat }
							setAttributes={ setAttributes }
						/>
					</VStack>
				</ToolsPanelItem>
			) }
		</ToolsPanel>
	);
}

export default LabelPanel;
