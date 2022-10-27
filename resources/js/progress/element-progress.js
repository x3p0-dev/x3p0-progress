/**
 * Returns the `<progress>` element and its wrapper `<div>` for the front end
 * and editor.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import classnames from 'classnames';
import { __ }     from '@wordpress/i18n';

import { getShadowStyle }   from '../shadow/utils-shadow';

import {
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles
} from '@wordpress/block-editor';

export default ( { attributes } ) => {
	const {
		height,
		heightUnit,
		width,
		widthUnit,
		progressId,
		progressValue,
		progressMax,
		shadow
	} = attributes;

	// Get the border and spacing props. We're skipping serialization and
	// using the border and padding props on the progress element container.
	const borderProps  = getBorderClassesAndStyles( attributes );
	const spacingProps = getSpacingClassesAndStyles( attributes );

	const paddingStyle = (
		( { paddingTop, paddingBottom, paddingRight, paddingLeft } ) =>
		( { paddingTop, paddingBottom, paddingRight, paddingLeft } )
	)( spacingProps.style );

	// Creates the `<progress>` bar element.
	const progressHtml = (
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
	return (
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
			{ progressHtml }
		</div>
	);
};
