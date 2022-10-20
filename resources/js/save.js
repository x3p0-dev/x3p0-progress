/**
 * Save component for creating a block that displays a `<progress>` element.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import classnames from 'classnames';
import { __ }     from '@wordpress/i18n';

import {
	RichText,
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles
} from '@wordpress/block-editor';

// Localized script with plugin data.
const { locale } = x3p0Progress;

/**
 * Exports the block edit function.
 *
 * @since 1.0.0
 */
export default function Save( { attributes, className, style } )
{
	const {
		label,
		height,
		heightUnit,
		width,
		widthUnit,
		progressBackgroundColor,
		progressColor,
		progressId,
		progressMax,
		progressValue,
		progressValueAfter,
		progressValueBefore,
		reversed,
		showLabel,
		showValue
	} = attributes;

	const progressLabelTextHtml = showLabel ? (
		<RichText.Content
			tagName="span"
			className="wp-block-x3p0-progress__label-text"
			value={ label }
		/>
	) : '';

	const progressValueBeforeHtml = showValue && progressValueBefore ? (
		<RichText.Content
			tagName="span"
			className="wp-block-x3p0-progress__value-before"
			value={ progressValueBefore }
		/>
	) : '';

	const progressValueAfterHtml = showValue && progressValueAfter ? (
		<RichText.Content
			tagName="span"
			className="wp-block-x3p0-progress__value-after"
			value={ progressValueAfter }
		/>
	) : '';

	const progressValueHtml = showValue ? (
		<span className="wp-block-x3p0-progress__value">
			{ progressValueBeforeHtml }
			<span className="wp-block-x3p0-progress__value-num">
				{ new Intl.NumberFormat( locale ).format( progressValue ) }
			</span>
			{ progressValueAfterHtml }
		</span>
	) : '';

	const progressLabelHtml = progressLabelTextHtml || progressValueHtml ? (
		<label
			className="wp-block-x3p0-progress__label"
			for={ `wp-block-x3p0-progress-${ progressId }` }
		>
			{ progressLabelTextHtml }
			{ progressValueHtml }
		</label>
	) : '';

	//const blockProps = useBlockProps.save();
	const blockProps = useBlockProps.save( {
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

	// Get the border and spacing props to use on the wrapping element.
	const borderProps  = getBorderClassesAndStyles( attributes );
	const spacingProps = getSpacingClassesAndStyles( attributes );

	const paddingStyle = (
		( { paddingTop, paddingBottom, paddingRight, paddingLeft } ) =>
		( { paddingTop, paddingBottom, paddingRight, paddingLeft } )
	)( spacingProps.style );

	// Creates the `<progress>` bar element. Note that we need to add custom
	// CSS properties so that they can be used with `::-webkit-progress-bar`
	// and `::-webkit-progress-value` in CSS.
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

	const progressContainerHtml = (
		<div
			className={ classnames(
				'wp-block-x3p0-progress__container',
				borderProps.className,
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
		<div { ...blockProps }>
			{ progressLabelHtml }
			{ progressContainerHtml }
		</div>
	);
}
