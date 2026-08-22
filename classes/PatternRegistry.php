<?php
/**
 * Gutenberg Block Pattern Registry
 *
 * @package Gravisain\Blocks
 */

declare(strict_types=1);

namespace Gravisain\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * PatternRegistry Class
 *
 * Registers custom Block Pattern Categories and auto-discovers
 * pattern files from the patterns/ directory.
 */
class PatternRegistry {

	/**
	 * Register hooks for block patterns.
	 *
	 * @return void
	 */
	public function register(): void {
		add_action( 'init', [ $this, 'register_pattern_categories' ] );
		add_action( 'init', [ $this, 'register_block_patterns' ], 20 );
	}

	/**
	 * Register Gravisain block pattern categories.
	 *
	 * @return void
	 */
	public function register_pattern_categories(): void {
		if ( ! function_exists( 'register_block_pattern_category' ) ) {
			return;
		}

		$categories = [
			'gravisain-heroes'   => [ 'label' => __( 'Gravisain Heroes', 'gravisain-blocks' ) ],
			'gravisain-sections' => [ 'label' => __( 'Gravisain Sections', 'gravisain-blocks' ) ],
			'gravisain-cta'      => [ 'label' => __( 'Gravisain Call to Action', 'gravisain-blocks' ) ],
			'gravisain-pricing'  => [ 'label' => __( 'Gravisain Pricing', 'gravisain-blocks' ) ],
		];

		foreach ( $categories as $slug => $args ) {
			register_block_pattern_category( $slug, $args );
		}
	}

	/**
	 * Auto-discover and register block patterns from patterns directory.
	 *
	 * @return void
	 */
	public function register_block_patterns(): void {
		if ( ! function_exists( 'register_block_pattern' ) ) {
			return;
		}

		$patterns_dir = GRAVISAIN_BLOCKS_DIR . 'patterns/';
		if ( ! is_dir( $patterns_dir ) ) {
			return;
		}

		$pattern_files = glob( $patterns_dir . '*.php' );
		if ( ! is_array( $pattern_files ) ) {
			return;
		}

		foreach ( $pattern_files as $file ) {
			$pattern_data = require $file;

			if (
				is_array( $pattern_data ) &&
				! empty( $pattern_data['slug'] ) &&
				! empty( $pattern_data['title'] ) &&
				! empty( $pattern_data['content'] )
			) {
				register_block_pattern( $pattern_data['slug'], $pattern_data );
			}
		}
	}
}
