/**
 * Edit component for creating a block that displays a `<progress>` element.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022-2025-2025, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import classnames        from 'classnames';
import { useInstanceId } from '@wordpress/compose';
import { useEffect }     from '@wordpress/element';

import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	useSettings,
	withColors
} from '@wordpress/block-editor';

import BlockToolbarGroup from './toolbar/group-block';
import OtherToolbarGroup from './toolbar/group-other';

import ProgressPanel from './progress/panel-progress';
import LabelPanel    from './label/panel-label';

import ColorControl from './color/control-color';

import LabelElement     from './label/element-label';
import ProgressElement  from './progress/element-progress';

const Edit = ({
	className,
	attributes,
	setAttributes,
	progressBackgroundColor,
	progressForegroundColor,
	setProgressBackgroundColor,
	setProgressForegroundColor,
	style,
	clientId
}) => {
	const {
		customProgressBackgroundColor,
		customProgressForegroundColor,
		reversed
	} = attributes;

	// Get the ID of the current instance for label and progress elements.
	const instanceId = useInstanceId(Edit);

	// Determine whether the user is allowed to set background colors for
	// the block.
	const [supportsBackground] = useSettings('color.background');

	useEffect(() => setAttributes({ progressId: instanceId }), [ instanceId ]);

	// =====================================================================
	// Build the block toolbar controls.
	// =====================================================================

	const toolbarControls = (
		<>
			<BlockToolbarGroup
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<OtherToolbarGroup
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</>
	);

	// =====================================================================
	// Build the block inspector sidebar controls.
	// =====================================================================

	const settingsControls = (
		<InspectorControls group="settings">
			<ProgressPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<LabelPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</InspectorControls>
	);

	// We only add the color controls if the user has permission to edit
	// background colors. There's no specific `theme.json` setting that can
	// be set for custom color options, but since both of the colors for the
	// block are technically backgrounds, we use the Core setting here.
	const stylesControls = supportsBackground && (
		<InspectorControls group="color">
			<ColorControl
				attributes={ attributes }
				setAttributes={ setAttributes }
				clientId={ clientId }
				progressBackgroundColor={ progressBackgroundColor }
				progressForegroundColor={ progressForegroundColor }
				setProgressBackgroundColor={ setProgressBackgroundColor }
				setProgressForegroundColor={ setProgressForegroundColor }
			/>
		</InspectorControls>
	);

	// =====================================================================
	// Build the block output for the content canvas.
	// =====================================================================

	// Get the block props for the wrapping element.  We need to add custom
	// CSS properties so that they can be used with pseudo-elements.
	const blockProps = useBlockProps({
		className: classnames({
			className,
			'is-reversed': reversed
		}),
		style: {
			...style,
			'--x3p0-progress--foreground-color': progressForegroundColor.slug
				? `var(--wp--preset--color--${progressForegroundColor.slug}, ${customProgressForegroundColor})`
				: customProgressForegroundColor,
			'--x3p0-progress--background-color': progressBackgroundColor.slug
				? `var(--wp--preset--color--${progressBackgroundColor.slug}, ${customProgressBackgroundColor})`
				: customProgressBackgroundColor
		}
	});

	// Need inner block props for layout styles to work properly in the admin.
	const innerBlockProps = useInnerBlocksProps(blockProps);

	// Return the final block edit component.
	return (
		<>
			{ toolbarControls }
			{ settingsControls }
			{ stylesControls }
			<div { ...innerBlockProps }>
				<LabelElement
					attributes={ attributes }
					setAttributes={ setAttributes }
					isBlockEdit={ true }
				/>
				<ProgressElement attributes={ attributes }/>
			</div>
		</>
	);
};

export default withColors({
	progressBackgroundColor: 'progress-background-color',
	progressForegroundColor: 'progress-foreground-color'
})(Edit);
