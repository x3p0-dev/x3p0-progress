/**
 * Returns the `<label>` element for the front end.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { RichText } from '@wordpress/block-editor';
import { __ }       from '@wordpress/i18n';

import { formatValue } from './utils-progress';

export default ( {
	attributes: {
		label,
		progressId,
		progressValue,
		showLabel,
		showValue,
		valueFormat
	}
} ) => {
	// Create the progress label text HTML.
	const labelTextHtml = ( showLabel && label ) && (
		<RichText.Content
			tagName="span"
			className="wp-block-x3p0-progress__label-text"
			value={ label }
		/>
	);

	// Builds the progress value HTML for the label.
	const labelValueHtml = ( showLabel && showValue ) && (
		<span className="wp-block-x3p0-progress__label-value">
			{ formatValue( progressValue, valueFormat ) }
		</span>
	);

	// Combine the inner label HTML into a `<label>` element.
	return ( labelTextHtml || labelValueHtml ) && (
		<label
			className="wp-block-x3p0-progress__label"
			for={ `wp-block-x3p0-progress-${ progressId }` }
		>
			{ labelTextHtml }
			{ labelValueHtml }
		</label>
	);
};
