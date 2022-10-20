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
	toggleOnIcon,
	toggleOffIcon,
	rotateIcon
} from './icons';

import {
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	RichText,
	useBlockProps,
	__experimentalUnitControl as UnitControl,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalGetSpacingClassesAndStyles as useSpacingProps
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	ButtonGroup,
	PanelBody,
	RangeControl,
	ToolbarButton,
	ToolbarGroup,
	__experimentalNumberControl as NumberControl,
	__experimentalVStack as VStack,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';

// Localized script with plugin data.
const { locale } = x3p0Progress;

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
		height,
		heightUnit,
		width,
		widthUnit,
		progressColor,
		progressBackgroundColor,
		progressId,
		progressValue,
		progressMax,
		progressValueAfter,
		progressValueBefore,
		reversed,
		showLabel,
		showValue
	} = attributes;

	// =====================================================================
	// Build the block toolbar controls.
	// =====================================================================

	// Creates the "block" group toolbar controls.
	const blockToolbarControls = showLabel || showValue ? (
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
	) : '';

	// Creates the "other" group toolbar controls.  This includes two toggle
	// buttons for enabling/displaying the label text and progress value from
	// showing in the `<label>` element.  I'm not 100% happy with the icons,
	// but it's the best we have right now.
	const otherToolbarControls = (
		<BlockControls group="other">
			<ToolbarGroup>
				<ToolbarButton
					title={ __( 'Toggle progress bar label text', 'x3p0-progress' ) }
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
					icon={ showValue ? toggleOnIcon : toggleOffIcon }
					onClick={ () => {
						setAttributes( {
							showValue: ! showValue,
						} );
					} }
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

	// Creates a control for handling the max-allowed value of the
	// `<progress>` element. The `max` attribute must be a number greater
	// than 0, but there is no upper limit. We're using the `NumberControl`
	// here because of this infinite limit.
	// @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#attr-max
	const progressMaxControl = (
		<BaseControl label={ __( 'Max Value', 'x3p0-progress' ) }>
			<NumberControl
				min="1"
				value={ progressMax }
				onChange={ ( value ) => {
					const newValue = value !== '' ? parseInt( value, 10 ) : 1;

					setAttributes( { progressMax: newValue } );
				} }
			/>
		</BaseControl>
	);

	// Creates a control for handling the `value` attribute of the
	// `<progress>` element. This can be any number from 0 to the value of
	// `max` attribute (see control notes above).  The `RangeControl` works
	// pretty well for this and is easier to use than `NumberControl`.
	// However, the numbers can start being hidden when jumping to larger
	// numbers.
	// @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#attr-value
	const progressValueControl = (
		<RangeControl
			label={ __( 'Value', 'x3p0-progress' ) }
			min="0"
			max={ progressMax }
			allowReset={ true }
			resetFallbackValue={ progressMax / 2 }
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
		<BaseControl
			label={ __( 'Width', 'x3p0-progress' ) }
			id={ `wp-block-x3p0-progress__width-${ unitControlInstanceId }` }
		>
			<UnitControl
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
			<ButtonGroup
				className="wp-block-x3p0-progress__components-button-group"
				aria-label={ __( 'Percentage Width', 'x3p0-progress' ) }
			>
				{ [ 25, 50, 75, 100 ].map( ( value ) => {
					return (
						<Button
							key={ value }
							isSmall
							variant={
								`${ value }%` ===
								`${ width }${ widthUnit }`
									? 'primary'
									: undefined
							}
							onClick={ () => setAttributes( {
								width: value,
								widthUnit: '%',
							} ) }
						>
							{ value }%
						</Button>
					);
				} ) }
			</ButtonGroup>
		</BaseControl>
	);

	// Creates the panel for the progress bar settings.  This should house
	// the primary settings related to the output of the `<progress>` element.
	const progressSettingsPanel = (
		<PanelBody title={ __( 'Progress Bar Settings', 'x3p0-progress' ) }>
			{ progressMaxControl }
			{ progressValueControl }
			<VStack spacing={ 6 }>
				{ progressHeightControl }
				{ progressWidthControl }
			</VStack>
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
			'--x3p0-progress--color': progressColor,
			'--x3p0-progress--background': progressBackgroundColor
		}
	} );

	// Get the ID of the current instance for label and progress elements.
	setAttributes( { progressId: useInstanceId( Edit ) } );

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
			placeholder={ __( '…', 'x3p0-progress' ) }
			value={ progressValueAfter }
			multiline={ false }
			isSelected={ false }
			onChange={ ( html ) => setAttributes( { progressValueAfter: html } ) }
			allowedFormats={ [] }
		/>
	) : '';

	// Builds the progress value HTML for the label.  WordPress doesn't
	// currently have a JS equivalent of `number_format_i18n` via
	// `@wordpress/i18n`, so we're passing in the locale from WordPress and
	// using `Intl.NumberFormat()`.
	// @link https://github.com/WordPress/gutenberg/issues/22628
	const progressValueHtml = showValue ? (
		<span className="wp-block-x3p0-progress__value">
			{ progressValueBeforeHtml }
			<span className="wp-block-x3p0-progress__value-num">
				{ new Intl.NumberFormat( locale ).format( progressValue ) }
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
			{ progressValue }%
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
