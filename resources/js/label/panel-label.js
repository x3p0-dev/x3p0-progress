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
import ShowGoalControl     from './control-show-goal';
import ShowLabelControl    from './control-show-label';
import ShowProgressControl from './control-show-progress';

import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

const LabelPanel = ( {
	attributes: {
		justifyLabel,
		showGoal,
		showLabel,
		showProgress,
		numberFormat
	},
	setAttributes
} ) => {
	const panelId = useInstanceId( LabelPanel );

	const [ formatItem, setFormatItem ] = useState();

	const resetFormatItem   = () => setAttributes( { numberFormat: undefined } );
	const resetJustifyLabel = () => setAttributes( { justifyLabel: 'left'    } );
	const resetShowLabel    = () => setAttributes( { showLabel:    false     } );
	const resetShowGoal     = () => setAttributes( { showGoal:     false     } );
	const resetShowProgress = () => setAttributes( { showProgress: false     } );

	const resetPanel = () => {
		resetFormatItem();
		resetJustifyLabel();
		resetShowLabel();
		resetShowGoal();
		resetShowProgress();

		setFormatItem( undefined );
	};

	return (
		<ToolsPanel
			label={ __( 'Label', 'x3p0-progress' ) }
			panelId={ panelId }
			className="wp-block-x3p0-progress-panel__label"
			resetAll={ resetPanel }
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
					hasValue={ () => !! showProgress }
					onDeselect={ resetShowProgress }
					onSelect={ () => setAttributes( {
						showProgress: true
					} ) }
					panelId={ panelId }
				>
					<ShowProgressControl
						showProgress={ showProgress }
						setAttributes={ setAttributes }
					/>
				</ToolsPanelItem>
			) }
			{ ( showLabel && showProgress ) && (
				<ToolsPanelItem
					label={ __( 'Show Goal', 'x3p0-progress' ) }
					hasValue={ () => !! showGoal }
					onDeselect={ resetShowGoal }
					onSelect={ () => setAttributes( {
						showGoal: true
					} ) }
					panelId={ panelId }
				>
					<ShowGoalControl
						showGoal={ showGoal }
						setAttributes={ setAttributes }
					/>
				</ToolsPanelItem>
			) }
			{ ( showLabel && showProgress ) && (
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
			{ ( showLabel && showProgress ) && (
				<ToolsPanelItem
					label={ __( 'Number Format', 'x3p0-progress' ) }
					hasValue={ () => !! numberFormat }
					onDeselect={ resetFormatItem }
					panelId={ panelId }
				>
					<NumberFormatControl
						numberFormat={ numberFormat }
						setAttributes={ setAttributes }
					/>
				</ToolsPanelItem>
			) }
		</ToolsPanel>
	);
}

export default LabelPanel;
