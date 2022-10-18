/**
 * Block icons.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */


 import { SVG, Rect } from '@wordpress/components';

// Block icon.
//
// @link    https://icons.getbootstrap.com/icons/bar-chart-fill/
// @license https://github.com/twbs/icons/blob/main/LICENSE.md
export const blockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
		<path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
	</svg>
);

// Refresh icon.
//
// @link    https://icons.getbootstrap.com/icons/arrow-clockwise/
// @license https://github.com/twbs/icons/blob/main/LICENSE.md
export const refreshIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
		<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
		<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
	</svg>
);

// @link https://github.com/WordPress/gutenberg/blob/df38b3d43a172773070a166fbaabcb184646cd11/packages/block-library/src/search/icons.js
export const toggleLabel = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Rect
			x="4.75"
			y="17.25"
			width="5.5"
			height="14.5"
			transform="rotate(-90 4.75 17.25)"
			stroke="currentColor"
			fill="none"
			strokeWidth="1.5"
		/>
		<Rect x="4" y="7" width="10" height="2" fill="currentColor" />
	</SVG>
);
