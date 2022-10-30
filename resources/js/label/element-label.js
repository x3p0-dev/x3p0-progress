/**
 * Returns the `<label>` element for the front end.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

import classnames   from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { __ }       from '@wordpress/i18n';

import {
	getFormattedNumber,
	isLongNumberFormat
} from './utils-label';

export default ( {
	attributes: {
		justifyLabel,
		label,
		progressId,
		goal,
		progress,
		showLabel,
		showGoal,
		showProgress,
		numberFormat
	},
	isBlockEdit = false,
	setAttributes
} ) => {
	// Creates the label progress html. Note that that the edit and save
	// contexts are different. Editing uses `RichText`, but saving needs
	// `RichText.Content`.
	const labelTextHtml = isBlockEdit ? showLabel && (
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
	) : ( showLabel && label ) && (
		<RichText.Content
			tagName="span"
			className="wp-block-x3p0-progress__label-text"
			value={ label }
		/>
	);

	// Creates the label progress html.
	const labelProgressHtml = ( showLabel && showProgress ) && (
		<span className="wp-block-x3p0-progress__label-progress">
			{ getFormattedNumber(
				progress,
				showGoal && isLongNumberFormat( numberFormat )
					? { style: 'decimal' }
					: numberFormat
			) }
		</span>
	);

	// Creates the label separator html.
	const labelSepHtml = ( showLabel && showProgress && showGoal ) && (
		<span className="wp-block-x3p0-progress__label-sep">
			{ __( '/', 'x3p0-progress' ) }
		</span>
	);

	// Creates the label goal html.
	const labelGoalHtml = ( showLabel && showProgress && showGoal ) && (
		<span className="wp-block-x3p0-progress__label-goal">
			{ getFormattedNumber( goal, numberFormat ) }
		</span>
	);

	// Creates the label wrapper for the progress and goal numbers.
	const labelNumHtml = ( labelProgressHtml || labelSepHtml || labelGoalHtml ) && (
		<span className="wp-block-x3p0-progress__label-num">
			{ labelProgressHtml }
			{ labelSepHtml      }
			{ labelGoalHtml     }
		</span>
	);

	// Get the justification class.
	const justify = justifyLabel ? { [`justify-${ justifyLabel }`]: true } : {};

	// Combine the inner label HTML into a `<label>` element.
	return ( labelTextHtml || labelNumHtml ) && (
		<label
			className={ classnames( {
				"wp-block-x3p0-progress__label": true,
				...justify
			} ) }
			for={ `wp-block-x3p0-progress-${ progressId }` }
		>
			{ labelTextHtml }
			{ labelNumHtml  }
		</label>
	);
};
