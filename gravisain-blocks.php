<?php
/**
 * Plugin Name: Gravisain Blocks
 * Plugin URI: https://gravisain.com/
 * Description: Official Gutenberg Block Patterns, Block Styles, and Content Library for the Gravisain WordPress Theme.
 * Version: 1.1.26
 * Author: Gravisain Digital
 * Author URI: https://gravisain.com/
 * Text Domain: gravisain-blocks
 * Domain Path: /languages
 * Requires at least: 6.2
 * Requires PHP: 8.2
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package Gravisain\Blocks
 */

declare(strict_types=1);

namespace Gravisain\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define plugin constants.
define( 'GRAVISAIN_BLOCKS_VERSION', '1.1.26' );
define( 'GRAVISAIN_BLOCKS_DIR', plugin_dir_path( __FILE__ ) );
define( 'GRAVISAIN_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

/**
 * PSR-4 Autoloader for Gravisain Blocks classes.
 *
 * @param string $class_name Class name being autoloaded.
 * @return void
 */
spl_autoload_register(
	function ( string $class_name ): void {
		$prefix   = 'Gravisain\\Blocks\\';
		$base_dir = __DIR__ . '/classes/';

		$len = strlen( $prefix );
		if ( 0 !== strncmp( $prefix, $class_name, $len ) ) {
			return;
		}

		$relative_class = substr( $class_name, $len );
		$file           = $base_dir . str_replace( '\\', '/', $relative_class ) . '.php';

		if ( file_exists( $file ) ) {
			require_once $file;
		}
	}
);

/**
 * Bootstrap Gravisain Blocks Plugin.
 */
add_action(
	'plugins_loaded',
	function (): void {
		load_plugin_textdomain( 'gravisain-blocks', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

		if ( class_exists( Plugin::class ) ) {
			Plugin::get_instance()->run();
		}
	}
);
