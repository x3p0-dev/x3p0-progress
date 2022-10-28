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

import { getFormattedNumber } from './utils-label';

export default ( {
	attributes: {
		justifyLabel,
		label,
		progressId,
		progressMax,
		progressValue,
		showLabel,
		showMax,
		showValue,
		numberFormat
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
			{ getFormattedNumber( progressValue, numberFormat ) }
		</span>
	);

	const labelSepHtml = ( showLabel && showValue && showMax ) && (
		<span className="wp-block-x3p0-progress__label-sep">
			{ __( '/', 'x3p0-progress' ) }
		</span>
	);

	const labelMaxHtml = ( showLabel && showValue && showMax ) && (
		<span className="wp-block-x3p0-progress__label-max">
			{ getFormattedNumber( progressMax, numberFormat ) }
		</span>
	);

	const labelNumHtml = ( labelValueHtml || labelSepHtml || labelMaxHtml ) && (
		<span className="wp-block-x3p0-progress__label-num">
			{ labelValueHtml }
			{ labelSepHtml   }
			{ labelMaxHtml   }
		</span>
	);

	const justifyClass = justifyLabel ? { [`justify-${ justifyLabel }`]: true } : {};

	// Combine the inner label HTML into a `<label>` element.
	return ( labelTextHtml || labelValueHtml ) && (
		<label
			className={ classnames( {
				"wp-block-x3p0-progress__label": true,
				...justifyClass
			} ) }
			for={ `wp-block-x3p0-progress-${ progressId }` }
		>
			{ labelTextHtml }
			{ labelNumHtml  }
		</label>
	);
};
