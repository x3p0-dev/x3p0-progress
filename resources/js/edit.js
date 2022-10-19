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
import { __ }            from '@wordpress/i18n';

import {
	toggleIcon,
	percentIcon,
	rotateIcon
} from './icons';

import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	RichText,
	useBlockProps,
	__experimentalUnitControl as UnitControl,
	__experimentalUseBorderProps as useBorderProps
} from '@wordpress/block-editor';

import {
	PanelBody,
	RangeControl,
	ToolbarButton,
	ToolbarGroup,
	__experimentalGrid as Grid,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';

import {
	useEffect,
	useState
} from '@wordpress/element';

const REM_HEIGHT_DEFAULT = 2;
const PX_HEIGHT_DEFAULT = 32;
const MIN_HEIGHT = 1;
const MIN_HEIGHT_UNIT = 'px';

const WIDTH_DEFAULT = 100;
const MIN_WIDTH = 25;
const MIN_WIDTH_UNIT = '%';

/**
 * Exports the block edit function.
 *
 * @since 1.0.0
 */
export default function Edit( {
	className,
	attributes,
	setAttributes,
	style
} ) {
	const {
		label,
		flexDirection,
		height,
		heightUnit,
		layout,
		width,
		widthUnit,
		progressColor,
		progressBackgroundColor,
		progressValue,
		reversed,
		showLabel,
		showValue
	} = attributes;

	//const [direction, setDirection] = useState( flexDirection );

	//const [ flexOrientation, setFlexOrientation ] = useState( orientation );

	//console.log( layout );

	/*
	useEffect( () => {
		if ( flexDirection ) {
			setFlexDirection( flexDirection );
			console.log( flexDirection );
		}
	}, [ layout ] );

	const setFlexDirection = function( hasDirection ) {
		// `vertical` is the default orientation, so we need to check
		// against `horizontal`.
		const reverse = 'horizontal' === layout.orientation
		                 ? 'row-reverse'
				 : 'column-reverse';

		setAttributes( { flexDirection: reverse } );
	};
	*/

	// =====================================================================
	// Build the block toolbar controls.
	// =====================================================================

	// Creates the "block" group toolbar controls.
	const blockToolbarControls = (
		<BlockControls group="block">
			<ToolbarButton
				title={ __( 'Toggle the label and progress bar order', 'x3p0-progress' ) }
				icon={ rotateIcon }
				onClick={ () => {
					setAttributes( { reversed: ! reversed } );
				} }
				className={ reversed ? 'is-pressed' : undefined }
			/>
		</BlockControls>
	);

	// Creates the "other" group toolbar controls.
	const otherToolbarControls = (
		<BlockControls group="other">
			<ToolbarGroup>
				<ToolbarButton
					title={ __( 'Toggle progress bar label', 'x3p0-progress' ) }
					icon={ toggleIcon }
					onClick={ () => {
						setAttributes( {
							showLabel: ! showLabel,
						} );
					} }
					className={ showLabel ? 'is-pressed' : undefined }
				/>
				<ToolbarButton
					title={ __( 'Toggle progress value in label', 'x3p0-progress' ) }
					icon={ percentIcon }
					onClick={ () => {
						setAttributes( {
							showValue: ! showValue,
						} );
					} }
					className={ showValue ? 'is-pressed' : undefined }
				/>
			</ToolbarGroup>
		</BlockControls>
	);

	// Creates the block toolbar controls.
	const toolbarControls = (
		<>
			{ blockToolbarControls }
			{ otherToolbarControls }
		</>
	);

	// =====================================================================
	// Build the block inspector sidebar controls.
	// =====================================================================

	// Creates a control for handling the value of the `<progress>` element.
	// Note that this is a percentage between 0 and 100.
	const progressValueControl = (
		<RangeControl
			label={ __( 'Value', 'x3p0-progress' ) }
			min="0"
			max="100"
			value={ progressValue }
			onChange={ ( value ) =>
				setAttributes( { progressValue: value } )
			}
		/>
	);

	// Get the instance ID for the height and width controls.
	const unitControlInstanceId = useInstanceId( UnitControl );

	// Creates a height control for the `<progress>` element.
	const progressHeightControl = (
		<UnitControl
			label={ __( 'Height', 'x3p0-progress' ) }
			id={ `wp-block-x3p0-progress__height-${ unitControlInstanceId }` }
			min={ `${ MIN_HEIGHT }${ MIN_HEIGHT_UNIT }` }
			value={ `${ height }${ heightUnit }` }
			style={ { maxWidth: 80 } }
			onChange={ ( newHeight ) => {
				const filteredHeight =
					heightUnit === 'rem' &&
					parseInt( newHeight, 10 ) > 8
						? 8
						: newHeight;

				setAttributes( {
					height: parseInt( filteredHeight, 10 )
				} );
			} }
			onUnitChange={ ( newUnit ) => {
				setAttributes( {
					height: 'rem' === newUnit
					        ? REM_HEIGHT_DEFAULT
						: PX_HEIGHT_DEFAULT,
					heightUnit: newUnit
				} );
			} }
			units={ useCustomUnits( {
				availableUnits: [ 'rem', 'px' ],
				defaultValues: {
					rem: REM_HEIGHT_DEFAULT,
					px:  PX_HEIGHT_DEFAULT
				},
			} ) }
		/>
	);

	// Creates a width control for the `<progress>` element.
	const progressWidthControl = (
		<UnitControl
			label={ __( 'Width', 'x3p0-progress' ) }
			id={ `wp-block-x3p0-progress__width-${ unitControlInstanceId }` }
			min={ `${ MIN_WIDTH }${ MIN_WIDTH_UNIT }` }
			value={ `${ width }${ widthUnit }` }
			style={ { maxWidth: 80 } }
			onChange={ ( value ) => {
				setAttributes( { width: parseInt( value, 10 ) } );
			} }
			onUnitChange={ ( value ) => {
				setAttributes( { widthUnit: value } );
			} }
			units={ useCustomUnits( {
				availableUnits: [ '%' ],
				defaultValues: {
					'%': WIDTH_DEFAULT
				},
			} ) }
		/>
	);

	// Creates the panel for the progress bar settings.  This should house
	// the primary settings related to the output of the `<progress>` element.
	const progressSettingsPanel = (
		<PanelBody title={ __( 'Progress Bar Settings', 'x3p0-progress' ) }>
			{ progressValueControl }
			<Grid columns={ 2 }>
				{ progressHeightControl }
				{ progressWidthControl }
			</Grid>
		</PanelBody>
	);

	// Houses an array of the block's color settings.
	const colorSettings = [
		{
			label: __( 'Progress Value', 'x3p0-progress' ),
			value: progressColor,
			onChange: ( value ) => {
				setAttributes( { progressColor: value } );
			}
		},
		{
			label: __( 'Progress Background', 'x3p0-progress' ),
			value: progressBackgroundColor,
			onChange: ( value ) => {
				setAttributes( { progressBackgroundColor: value } );
			}
		}
	];

	// Creates a color settings panel. We have two custom colors for handling
	// the `<progress>` element background and value.
	//
	// Currently, there are two issues:
	// 1. I'm not really sure how to enable gradients.  I've kind of given
	//    up hope of a simple solution at this point, but it'd ge great to
	//    give that option to end-users.
	// 2. I haven't found a way to integrate these custom color controls
	//    with the core `color` support for text and background colors,
	//    combining the two into a single panel.  If I enable support, we
	//    get two separate color panels.
	const colorSettingsPanel = (
		<PanelColorSettings
			title={ __( 'Color', 'x3p0-progress' ) }
			colorSettings={ colorSettings }
			enableAlpha={ true }
			__experimentalIsRenderedInSidebar={ true }
			__experimentalHasMultipleOrigins={ true }
		/>
	);

	// Creates the block inspector controls, housing our custom panels.
	const inspectorControls = (
		<InspectorControls>
			{ progressSettingsPanel }
			{ colorSettingsPanel }
		</InspectorControls>
	);

	// =====================================================================
	// Build the block output for the content canvas.
	// =====================================================================

	// Get the block props and add a custom class for text alignment.
	// *Wondering why WP doesn't just automatically handle this class...*
	// Also adds some CSS custom properties for styling the pseudo elements
	// on the `<progress>` element.
	const blockProps = useBlockProps( {
		className: classnames( {
			className,
			'is-reversed': reversed
		} ),
		style: {
			...style,
			'--x3p0-progress--color': progressColor,
			'--x3p0-progress--background': progressBackgroundColor
		}
	} );

	// Get the ID of the current instance for label and progress elements.
	const blockInstanceId = useInstanceId( Edit );

	// Creates a `<label>` element for the `<progress>` bar.  Users can flip
	// this off/on via a toggle in the toolbar.
	const progressLabelHtml = showLabel ? (
		<RichText
			tagName="label"
			for={ `wp-block-x3p0-progress-${ blockInstanceId }` }
			className="wp-block-x3p0-progress__label"
			aria-label={ __( 'Label text', 'x3p0-progress' ) }
			placeholder={ __( 'Add label…', 'x3p0-progress' ) }
			value={ label }
			multiline={ false }
			isSelected={ true }
			onChange={ ( html ) => setAttributes( { label: html } ) }
			allowedFormats={ [
				'core/bold',
				'core/italic',
				'core/strikethrough',
				'core/highlight',
				'core/superscript',
				'core/subscript'
			] }
		/>
	) : '';

	const progressValueHtml = showValue ? (
		<div className="wp-block-x3p0-progress__value">{ progressValue }%</div>
	) : '';

	const progressCaptionHtml = progressLabelHtml || progressValueHtml ? (
		<div className="wp-block-x3p0-progress__caption">
			{ progressLabelHtml }
			{ progressValueHtml }
		</div>
	) : '';

	// Get the border props to use on the wrapping element.
	const borderProps = useBorderProps( attributes );

	// Creates the `<progress>` bar element. Note that we need to add custom
	// CSS properties so that they can be used with `::-webkit-progress-bar`
	// and `::-webkit-progress-value` in CSS.
	const progressBar = (
		<progress
			id={ `wp-block-x3p0-progress-${ blockInstanceId }` }
			className="wp-block-x3p0-progress__bar"
			value={ progressValue }
			max="100"
			style={ { 'height': height ? `${ height }${ heightUnit ?? 'px' }` : '' } }
		>
			{ progressValue }%
		</progress>
	);

	// Creates a wrapper `<div>` around the `<progress>` element to give us
	// more flexibility with the output.  Because browsers have wildly
	// varying implementations of handling `<progress>`, it's just easier to
	// have a wrapper that can be styled consistently.
	const progressWrap = (
		<div
			className={ classnames(
				'wp-block-x3p0-progress__container',
				borderProps.style.borderWidth ? 'has-border' : ''
			) }
			style={ {
				...borderProps.style,
				'width': width ? `${ width }${ widthUnit ?? '%' }` : ''
			} }
		>
			{ progressBar }
		</div>
	);

	// Return the final block edit component.
	return (
		<>
			{ toolbarControls }
			{ inspectorControls }
			<div { ...blockProps }>
				{ progressCaptionHtml }
				{ progressWrap }
			</div>
		</>
	);
}
