/**
 * Save component for creating a block that displays a `<progress>` element.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import classnames        from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { __ }            from '@wordpress/i18n';

import { getColorStyle  }   from './common/utils-color';
import { getGradientStyle } from './common/utils-gradient';

import LabelElement    from './progress/element-label';
import ProgressElement from './progress/element-progress';

export default function Save( { attributes, className, style } ) {
	const {
		progressBackground,
		progressBackgroundGradient,
		progressForeground,
		progressForegroundGradient,
		reversed
	} = attributes;

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
			'--x3p0-progress--foreground': getColorStyle( progressForeground ),
			'--x3p0-progress--background': getColorStyle( progressBackground ),
			'--x3p0-progress--foreground-gradient': getGradientStyle( progressForegroundGradient ),
			'--x3p0-progress--background-gradient': getGradientStyle( progressBackgroundGradient )
		}
	} );

	// Return the final block HTML.
	return (
		<div { ...blockProps }>
			<LabelElement attributes={ attributes }/>
			<ProgressElement attributes={ attributes }/>
		</div>
	);
}
