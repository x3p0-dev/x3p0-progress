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

import { numberFormat }     from './common/functions-helpers';
import { getColorStyle  }   from './common/functions-color';
import { getGradientStyle } from './common/functions-gradient';
import { getShadowStyle }   from './shadow/functions-shadow';

import {
	RichText,
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles
} from '@wordpress/block-editor';

export default function Save( { attributes, className, style } ) {
	const {
		label,
		height,
		heightUnit,
		width,
		widthUnit,
		progressBackgroundColor,
		progressBackgroundGradient,
		progressColor,
		progressGradient,
		progressId,
		progressMax,
		progressValue,
		progressValueAfter,
		progressValueBefore,
		reversed,
		shadow,
		showLabel,
		showValue
	} = attributes;

	// Create the progress label text HTML.
	const progressLabelTextHtml = showLabel && label ? (
		<RichText.Content
			tagName="span"
			className="wp-block-x3p0-progress__label-text"
			value={ label }
		/>
	) : '';

	// Creates the HTML for the value text prefix.
	const progressValueBeforeHtml = showValue && progressValueBefore ? (
		<RichText.Content
			tagName="span"
			className="wp-block-x3p0-progress__value-before"
			value={ progressValueBefore }
		/>
	) : '';

	// Creates the HTML for the value text suffix.
	const progressValueAfterHtml = showValue && progressValueAfter ? (
		<RichText.Content
			tagName="span"
			className="wp-block-x3p0-progress__value-after"
			value={ progressValueAfter }
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

	// Get the block props for the wrapping element.  We need to add custom
	// CSS properties so that they can be used with `::-webkit-progress-bar`
	// and `::-webkit-progress-value` in CSS.
	const blockProps = useBlockProps.save( {
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

	// Get the border and spacing props. We're skipping serialization and
	// using the border and padding props on the progress element container.
	const borderProps  = getBorderClassesAndStyles( attributes );
	const spacingProps = getSpacingClassesAndStyles( attributes );

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
			{ `${ progressValue }/${ progressMax }` }
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
				borderProps.className,
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

	// Return the final block HTML.
	return (
		<div { ...blockProps }>
			{ progressLabelHtml }
			{ progressContainerHtml }
		</div>
	);
}
