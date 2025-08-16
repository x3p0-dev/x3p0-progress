/**
 * Registers the block type.
 *
 * @author    Justin Tadlock <justintadlock@gmail.com>
 * @copyright Copyright (c) 2022, Justin Tadlock
 * @link      https://github.com/x3p0-dev/x3p0-progress
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

// Import stylesheets.
import './css/style.scss';
import './css/index.scss';

// Import dependencies.
import { registerBlockType } from '@wordpress/blocks';
import metadata              from './block.json';
import icon                  from './js/block-icon';
import edit                  from './js/block-edit';
import save                  from './js/block-save';

// Register block type.
registerBlockType( metadata, { icon, edit, save } );
