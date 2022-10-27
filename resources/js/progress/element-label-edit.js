/**
 * Returns the `<label>` element for the editor.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import { RichText } from '@wordpress/block-editor';
import { __ }       from '@wordpress/i18n';

import { formatValue } from './utils-progress';

export default ( { attributes, setAttributes } ) => {
	const {
		label,
		progressId,
		progressValue,
		showLabel,
		showValue,
		valueFormat
	} = attributes;

	// Creates a `<label>` element for the `<progress>` bar.  Users can flip
	// this off/on via a toggle in the toolbar.
	const labelTextHtml = showLabel && (
		<RichText
			tagName="span"
			className="wp-block-x3p0-progress__label-text"
			aria-label={  __( 'Label text', 'x3p0-progress' ) }
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
			{ labelTextHtml  }
			{ labelValueHtml }
		</label>
	);
};
