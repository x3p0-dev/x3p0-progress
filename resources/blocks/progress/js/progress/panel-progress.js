/**
 * Progress settings block inspector panel.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { useInstanceId } from '@wordpress/compose';
import { __ }            from '@wordpress/i18n';

import GoalControl     from './control-goal';
import HeightControl   from './control-height';
import ProgressControl from './control-progress';

import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

const ProgressPanel = ( {
	attributes: {
		goal,
		height,
		heightUnit,
		progress
	},
	setAttributes
} ) => {
	const panelId = useInstanceId( ProgressPanel );

	const resetProgressItem = () => setAttributes( { progress: 50 } );
	const resetGoalItem     = () => setAttributes( { goal: 100    } );
	const resetHeightItem   = () => setAttributes( { height: undefined, heightUnit: undefined } );

	const resetPanel = () => {
		resetProgressItem();
		resetGoalItem();
		resetHeightItem();
	};

	return (
		<ToolsPanel
			label={ __( 'Progress', 'x3p0-progress' ) }
			panelId={ panelId }
			className="wp-block-x3p0-progress-panel__progress"
			resetAll={ resetPanel }
		>
			<ToolsPanelItem
				label={ __( 'Progress', 'x3p0-progress' ) }
				isShownByDefault
				hasValue={ () => 50 !== progress }
				onDeselect={ resetProgressItem }
				panelId={ panelId }
			>
				<ProgressControl
					progress={ progress }
					goal={ goal }
					setAttributes={ setAttributes }
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				label={ __( 'Goal', 'x3p0-progress' ) }
				isShownByDefault
				hasValue={ () => 100 !== goal }
				onDeselect={ resetGoalItem }
				panelId={ panelId }
			>
				<GoalControl
					progress={ progress }
					goal={ goal }
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
