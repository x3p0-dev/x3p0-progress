/**
 * Returns the `<progress>` element and its wrapper `<div>` for the front end
 * and editor.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022-2025, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

export default ({ attributes }) => {
	const {
		goal,
		height,
		heightUnit,
		progress,
		progressId
	} = attributes;

	const heightStyle = height ? `${ height }${ heightUnit ?? 'px' }` : null;

	return (
		<div className="wp-block-x3p0-progress__container">
			<progress
				id={ `wp-block-x3p0-progress-${ progressId }` }
				className="wp-block-x3p0-progress__bar"
				value={ progress }
				max={ goal }
				style={ { 'height': heightStyle } }
			>
				{ `${ progress }/${ goal }` }
			</progress>
		</div>
	);
};
