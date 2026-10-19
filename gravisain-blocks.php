<?php
/**
 * Plugin Name: Gravisain Blocks
 * Description: Official Gutenberg Block Patterns, Block Styles, and Content Library for the Gravisain WordPress Theme.
 * Version: 1.0.0.1
 * Author: Gravisain Studio
 * Author URI: https://undagital.com/
 * Text Domain: gravisain-blocks
 * Domain Path: /languages
 * Requires at least: 6.2
 * Requires PHP: 7.4
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

// Minimum PHP requirement check (PHP 7.4+).
if ( version_compare( PHP_VERSION, '7.4.0', '<' ) ) {
	add_action(
		'admin_notices',
		function (): void {
			printf(
				'<div class="notice notice-error"><p>%s</p></div>',
				esc_html__( 'Gravisain Blocks requires PHP version 7.4 or higher. Please upgrade your PHP installation.', 'gravisain-blocks' )
			);
		}
	);
	return;
}

// Define plugin constants.
define( 'GRAVISAIN_BLOCKS_VERSION', '1.0.0.1' );
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
		if ( class_exists( Plugin::class ) ) {
			Plugin::get_instance()->run();
		}
	}
);
