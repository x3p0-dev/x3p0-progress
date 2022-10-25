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

import ProgressPanel from './progress/panel-progress';
import ColorPanel    from './color/panel-color';
import ShadowPanel   from './shadow/panel-shadow';

import FlexDirectionToolbarButton from './toolbar/button-flex-direction';
import ShowLabelToolbarButton     from './toolbar/button-show-label';
import ShowValueToolbarButton     from './toolbar/button-show-value';

import { numberFormat }     from './common/functions-helpers';
import { getColorStyle  }   from './common/functions-color';
import { getGradientStyle } from './common/functions-gradient';
import { getShadowStyle }   from './shadow/functions-shadow';

import {
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalGetSpacingClassesAndStyles as useSpacingProps
} from '@wordpress/block-editor';

export default function Edit( {
	className,
	attributes,
	setAttributes,
	style
} ) {
	const {
		label,
		height,
		heightUnit,
		width,
		widthUnit,
		progressColor,
		progressGradient,
		progressBackgroundColor,
		progressBackgroundGradient,
		progressId,
		progressValue,
		progressMax,
		progressValueAfter,
		progressValueBefore,
		reversed,
		shadow,
		showLabel,
		showValue
	} = attributes;

	// Get the ID of the current instance for label and progress elements.
	const instanceId = useInstanceId( Edit );

	useEffect( () => setAttributes( { progressId: instanceId } ), [ instanceId ] );

	useEffect( () => {
		if ( ! width && !! widthUnit ) {
			setAttributes( { widthUnit: "%" } );
		}
	}, [ width ] );

	// =====================================================================
	// Build the block toolbar controls.
	// =====================================================================

	// Creates the "block" group toolbar controls.
	const blockToolbarControls = showLabel || showValue ? (
		<BlockControls group="block">
			<FlexDirectionToolbarButton
				onClick={ () => setAttributes( { reversed: ! reversed } ) }
				isPressed={ reversed }
			/>
		</BlockControls>
	) : '';

	// Creates the "other" group toolbar controls.  This includes two toggle
	// buttons for enabling/displaying the label text and progress value from
	// showing in the `<label>` element.  I'm not 100% happy with the icons,
	// but it's the best we have right now.
	const otherToolbarControls = (
		<BlockControls group="other">
			<ShowLabelToolbarButton
				onClick={ () => setAttributes( { showLabel: ! showLabel } ) }
				isPressed={ showLabel }
			/>
			<ShowValueToolbarButton
				onClick={ () => setAttributes( { showValue: ! showValue } ) }
				isPressed={ showValue }
			/>
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

	// Creates the block inspector controls, housing our custom panels.
	const inspectorControls = (
		<InspectorControls>
			<ProgressPanel
				progressValue={ progressValue }
				progressMax={ progressMax }
				height={ height }
				heightUnit={ heightUnit }
				width={ width }
				widthUnit={ widthUnit }
				setAttributes={ setAttributes }
			/>
			<ColorPanel
				progressColor={ progressColor }
				progressGradient={ progressGradient }
				progressBackgroundColor={ progressBackgroundColor }
				progressBackgroundGradient={ progressBackgroundGradient }
				setAttributes={ setAttributes }
			/>
			<ShadowPanel
				shadow={ shadow }
				setAttributes={ setAttributes }
			/>
		</InspectorControls>
	);

	// =====================================================================
	// Build the block output for the content canvas.
	// =====================================================================

	// Get the block props for the wrapping element.  We need to add custom
	// CSS properties so that they can be used with `::-webkit-progress-bar`
	// and `::-webkit-progress-value` in CSS.
	const blockProps = useBlockProps( {
		className: classnames( {
			className,
			'is-reversed': reversed
		} ),
		style: {
			...style,
			'--x3p0-progress--color': getColorStyle( progressColor ),
			'--x3p0-progress--gradient': getGradientStyle( progressGradient ),
			'--x3p0-progress--background': getColorStyle( progressBackgroundColor ),
			'--x3p0-progress--background-gradient': getGradientStyle( progressBackgroundGradient )
		}
	} );

	// Creates a `<label>` element for the `<progress>` bar.  Users can flip
	// this off/on via a toggle in the toolbar.
	const progressLabelTextHtml = showLabel ? (
		<RichText
			tagName="span"
			className="wp-block-x3p0-progress__label-text"
			aria-label={ __( 'Label text', 'x3p0-progress' ) }
			placeholder={ __( 'Add label…', 'x3p0-progress' ) }
			value={ label }
			multiline={ false }
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

	// Creates the HTML for the value text prefix.
	const progressValueBeforeHtml = showValue ? (
		<RichText
			tagName="span"
			className="wp-block-x3p0-progress__value-before"
			aria-label={ __( 'Text or symbol to show before value', 'x3p0-progress' ) }
			placeholder={ __( '…', 'x3p0-progress' ) }
			value={ progressValueBefore }
			multiline={ false }
			isSelected={ false }
			onChange={ ( html ) => setAttributes( { progressValueBefore: html } ) }
			allowedFormats={ [] }
		/>
	) : '';

	// Creates the HTML for the value text suffix.
	const progressValueAfterHtml = showValue ? (
		<RichText
			tagName="span"
			className="wp-block-x3p0-progress__value-after"
			aria-label={ __( 'Text or symbol to show after value', 'x3p0-progress' ) }
			placeholder={ __( '%…', 'x3p0-progress' ) }
			value={ progressValueAfter }
			multiline={ false }
			isSelected={ false }
			onChange={ ( html ) => setAttributes( { progressValueAfter: html } ) }
			allowedFormats={ [] }
		/>
	) : '';

	// Builds the progress value HTML for the label.
	const progressValueHtml = showValue ? (
		<span className="wp-block-x3p0-progress__value">
			{ progressValueBeforeHtml }
			<span className="wp-block-x3p0-progress__value-num">
				{ numberFormat( progressValue ) }
			</span>
			{ progressValueAfterHtml }
		</span>
	) : '';

	// Combine the inner label HTML into a `<label>` element.
	const progressLabelHtml = progressLabelTextHtml || progressValueHtml ? (
		<label
			className="wp-block-x3p0-progress__label"
			for={ `wp-block-x3p0-progress-${ progressId }` }
		>
			{ progressLabelTextHtml }
			{ progressValueHtml }
		</label>
	) : '';

	// Get the border and spacing props. We're skipping serialization and
	// using the border and padding props on the progress element container.
	const borderProps = useBorderProps( attributes );
	const spacingProps = useSpacingProps( attributes );

	const paddingStyle = (
		( { paddingTop, paddingBottom, paddingRight, paddingLeft } ) =>
		( { paddingTop, paddingBottom, paddingRight, paddingLeft } )
	)( spacingProps.style );

	// Creates the `<progress>` bar element.
	const progressBarHtml = (
		<progress
			id={ `wp-block-x3p0-progress-${ progressId }` }
			className="wp-block-x3p0-progress__bar"
			value={ progressValue }
			max={ progressMax }
			style={ { 'height': height ? `${ height }${ heightUnit ?? 'px' }` : null } }
		>
			{ progressValue }/{ progressMax }
		</progress>
	);

	// Creates a wrapper `<div>` around the `<progress>` element to give us
	// more flexibility with the output.  Because browsers have wildly
	// varying implementations of handling `<progress>`, it's just easier to
	// have a wrapper that can be styled consistently.
	const progressContainerHtml = (
		<div
			className={ classnames(
				'wp-block-x3p0-progress__container',
				borderProps.className
			) }
			style={ {
				...borderProps.style,
				...paddingStyle,
				boxShadow: getShadowStyle( shadow ),
				'width': width ? `${ width }${ widthUnit ?? '%' }` : null
			} }
		>
			{ progressBarHtml }
		</div>
	);

	// Return the final block edit component.
	return (
		<>
			{ toolbarControls }
			{ inspectorControls }
			<div { ...blockProps }>
				{ progressLabelHtml }
				{ progressContainerHtml }
			</div>
		</>
	);
}
