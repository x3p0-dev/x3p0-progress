<?php
/**
 * Plugin Name:       X3P0: Progress
 * Plugin URI:        https://github.com/x3p0-dev/x3p0-progress
 * Description:       A block for outputting a progress bar.
 * Version:           2.0.0-alpha
 * Requires at least: 6.8
 * Requires PHP:      8.0
 * Author:            Justin Tadlock
 * Author URI:        https://justintadlock.com
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       x3p0-progress
 */

namespace X3P0\Progress;

# Load classes and files.
require_once 'src/Block.php';

# Bootstrap the plugin.
add_action(
	'plugins_loaded',
	fn() => (new Block(__DIR__ . '/public/blocks'))->boot(),
	PHP_INT_MIN
);
