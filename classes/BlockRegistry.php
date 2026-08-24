<?php
/**
 * Gutenberg Blocks Registry for Gravisain Blocks Plugin
 *
 * @package Gravisain\Blocks
 */

declare(strict_types=1);

namespace Gravisain\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Block Registry Class
 *
 * Registers the Gravisain Blocks category and custom blocks.
 */
class BlockRegistry {

	/**
	 * Register hooks for block categories and blocks.
	 *
	 * @return void
	 */
	public function register(): void {
		add_filter( 'block_categories_all', [ $this, 'register_block_category' ], 10, 1 );
		add_action( 'init', [ $this, 'register_blocks' ], 15 );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_category_icon_assets' ] );
	}

	/**
	 * Register 'Gravisain Blocks' category in the Block Editor inserter sidebar.
	 *
	 * @param array $categories Existing categories.
	 * @return array
	 */
	public function register_block_category( array $categories ): array {
		// Check if already registered
		foreach ( $categories as $cat ) {
			if ( 'gravisain-blocks' === $cat['slug'] ) {
				return $categories;
			}
		}

		return array_merge(
			[
				[
					'slug'  => 'gravisain-blocks',
					'title' => __( 'Gravisain Blocks', 'gravisain-blocks' ),
					'icon'  => null,
				],
			],
			$categories
		);
	}

	/**
	 * Enqueue script & style for custom SVG category icon in the Gutenberg block inserter (+).
	 *
	 * @return void
	 */
	public function enqueue_category_icon_assets(): void {
		$js_url = GRAVISAIN_BLOCKS_URL . 'assets/js/category-icon.js';
		wp_enqueue_script(
			'gravisain-blocks-category-icon',
			$js_url,
			[],
			GRAVISAIN_BLOCKS_VERSION,
			true
		);
	}

	/**
	 * Register all custom blocks from assets/blocks directory in alphabetical order (A-Z).
	 *
	 * @return void
	 */
	public function register_blocks(): void {
		$cache_key = 'gravisain_blocks_registry_cache_' . GRAVISAIN_BLOCKS_VERSION;
		// Bypass cache during development
		$is_dev = defined( 'WP_DEBUG' ) && WP_DEBUG;
		$blocks = $is_dev ? false : get_transient( $cache_key );

		if ( false === $blocks ) {
			$blocks_dir = GRAVISAIN_BLOCKS_DIR . 'assets/blocks/';

			if ( ! is_dir( $blocks_dir ) ) {
				return;
			}

			// Use glob for faster scanning (assuming blocks are 1 level deep)
			$block_json_files = glob( $blocks_dir . '*/block.json' );
			$registered       = [];
			$blocks           = [];

			if ( $block_json_files ) {
				foreach ( $block_json_files as $file ) {
					$block_path = dirname( $file );
					$metadata   = wp_json_file_decode( $file, [ 'associative' => true ] );

					if ( ! empty( $metadata['name'] ) && ! isset( $registered[ $metadata['name'] ] ) ) {
						$title = (string) ( $metadata['title'] ?? basename( $block_path ) );
						$blocks[] = [
							'path'  => $block_path,
							'title' => $title,
						];
						$registered[ $metadata['name'] ] = true;
					}
				}

				// Sort blocks alphabetically A-Z by title
				usort( $blocks, function( array $a, array $b ): int {
					return strcasecmp( $a['title'], $b['title'] );
				} );
			}

			// Save to cache for 24 hours if not in dev mode
			if ( ! $is_dev && ! empty( $blocks ) ) {
				set_transient( $cache_key, $blocks, 24 * HOUR_IN_SECONDS );
			}
		}

		// Register each block in sorted order
		foreach ( $blocks as $block ) {
			register_block_type( $block['path'] );
		}
	}
}
