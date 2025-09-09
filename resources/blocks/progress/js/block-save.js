/**
 * Save component for creating a block that displays a `<progress>` element.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022-2025, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import classnames from 'classnames';
import {useBlockProps, useInnerBlocksProps} from '@wordpress/block-editor';

import LabelElement    from './label/element-label';
import ProgressElement from './progress/element-progress';

export default function Save({ attributes, className, style }) {
	const {
		progressBackgroundColor,
		progressForegroundColor,
		customProgressBackgroundColor,
		customProgressForegroundColor,
		reversed
	} = attributes;

	// Get the block props for the wrapping element.  We need to add custom
	// CSS properties so that they can be used with `::-webkit-progress-bar`
	// and `::-webkit-progress-value` in CSS.
	const blockProps = useBlockProps.save({
		className: classnames({
			className,
			'is-reversed': reversed
		}),
		style: {
			...style,
			'--x3p0-progress--foreground-color': progressForegroundColor !== undefined
				? `var(--wp--preset--color--${progressForegroundColor}, ${customProgressForegroundColor})`
				: customProgressForegroundColor,
			'--x3p0-progress--background-color': progressBackgroundColor !== undefined
				? `var(--wp--preset--color--${progressBackgroundColor}, ${customProgressBackgroundColor})`
				: customProgressBackgroundColor
		}
	});

	// Need inner block props for layout styles to work properly in the admin.
	const innerBlockProps = useInnerBlocksProps.save(blockProps);

	// Return the final block HTML.
	return (
		<div { ...innerBlockProps }>
			<LabelElement attributes={ attributes }/>
			<ProgressElement attributes={ attributes }/>
		</div>
	);
}
