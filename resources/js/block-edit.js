/**
 * Edit component for creating a block that displays a `<progress>` element.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import classnames        from 'classnames';
import { useInstanceId } from '@wordpress/compose';
import { useEffect }     from '@wordpress/element';
import { __ }            from '@wordpress/i18n';

import {
	InspectorControls,
	useBlockProps
} from '@wordpress/block-editor';

import BlockToolbarGroup from './toolbar/group-block';
import OtherToolbarGroup from './toolbar/group-other';

import ProgressPanel from './progress/panel-progress';
import LabelPanel    from './label/panel-label';
import ColorPanel    from './color/panel-color';
import ShadowPanel   from './shadow/panel-shadow';

import LabelElement     from './label/element-label';
import ProgressElement  from './progress/element-progress';

import { colorStyle  }   from './common/utils-color';
import { gradientStyle } from './common/utils-gradient';
import { gapStyle }      from './common/utils-spacing';

export default function Edit( {
	className,
	attributes,
	setAttributes,
	style
} ) {
	const {
		foregroundColor,
		foregroundGradient,
		backgroundColor,
		backgroundGradient,
		reversed
	} = attributes;

	// Get the ID of the current instance for label and progress elements.
	const instanceId = useInstanceId( Edit );

	useEffect( () => setAttributes( { progressId: instanceId } ), [ instanceId ] );

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

	const inspectorControls = (
		<InspectorControls>
			<ProgressPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<LabelPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<ColorPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<ShadowPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</InspectorControls>
	);

	// =====================================================================
	// Build the block output for the content canvas.
	// =====================================================================

	// Get the block props for the wrapping element.  We need to add custom
	// CSS properties so that they can be used with pseudo-elements.
	const blockProps = useBlockProps( {
		className: classnames( {
			className,
			'is-reversed': reversed
		} ),
		style: {
			...style,
			gap: gapStyle( attributes ),
			'--x3p0-progress--foreground-color':    colorStyle( foregroundColor ),
			'--x3p0-progress--background-color':    colorStyle( backgroundColor ),
			'--x3p0-progress--foreground-gradient': gradientStyle( foregroundGradient ),
			'--x3p0-progress--background-gradient': gradientStyle( backgroundGradient )
		}
	} );

	// Return the final block edit component.
	return (
		<>
			{ toolbarControls }
			{ inspectorControls }
			<div { ...blockProps }>
				<LabelElement
					attributes={ attributes }
					setAttributes={ setAttributes }
					isBlockEdit={ true }
				/>
				<ProgressElement attributes={ attributes }/>
			</div>
		</>
	);
}
