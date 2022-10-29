/**
 * Spacing utilities.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

/**
 * For some reason, WP doesn't seem to be adding the block gap style, despite
 * the block supporting `blockGap`. If layouts are enabled, it works. So, this
 * is just a small helper function to add the gap style to the block.
 */
export const gapStyle = ( attributes ) => {
	const gap = attributes?.style?.spacing?.blockGap;

	if ( ! gap || 'string' !== typeof gap ) {
		return undefined;
	}

	return gap.startsWith( 'var:preset|spacing|')
	       ? `var(--wp--preset--spacing--${ gap.replace( 'var:preset|spacing|', '' ) })`
	       : gap;
};
