<?php
/**
 * Dynamic Google Fonts Loader for Gravisain Blocks
 *
 * @package Gravisain\Blocks
 */

declare(strict_types=1);

namespace Gravisain\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * GoogleFontsLoader Class
 *
 * Scans blocks for 'fontFamily' attribute and enqueues Google Fonts dynamically.
 */
class GoogleFontsLoader {

	/**
	 * Collected font families.
	 *
	 * @var array
	 */
	private array $fonts = [];

	/**
	 * Register hooks.
	 *
	 * @return void
	 */
	public function register(): void {
		// Collect fonts during block rendering on the frontend.
		add_filter( 'render_block', [ $this, 'collect_fonts_from_block' ], 10, 2 );

		// Print collected fonts in the footer (since render_block happens during the_content, wp_head is already passed).
		add_action( 'wp_footer', [ $this, 'print_google_fonts' ] );

		// For the block editor, we need to parse the post content on load.
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_fonts' ] );
	}

	/**
	 * Collect font family from a block during frontend rendering.
	 *
	 * @param string $block_content The block content.
	 * @param array  $block         The full block, including name and attributes.
	 * @return string
	 */
	public function collect_fonts_from_block( string $block_content, array $block ): string {
		if ( isset( $block['blockName'] ) && str_starts_with( $block['blockName'], 'gravisain/' ) ) {
			$this->extract_fonts_from_attrs( $block['attrs'] ?? [] );
		}

		return $block_content;
	}

	/**
	 * Parse current post content in editor and enqueue fonts.
	 *
	 * @return void
	 */
	public function enqueue_editor_fonts(): void {
		global $post;

		if ( ! $post || ! has_blocks( $post->post_content ) ) {
			return;
		}

		$blocks = parse_blocks( $post->post_content );
		$this->extract_fonts_from_blocks( $blocks );

		if ( ! empty( $this->fonts ) ) {
			$url = $this->get_google_fonts_url( array_keys( $this->fonts ) );
			wp_enqueue_style( 'gravisain-blocks-editor-fonts', $url, [], null );
		}
	}

	/**
	 * Recursively extract fonts from blocks array.
	 *
	 * @param array $blocks Array of parsed blocks.
	 * @return void
	 */
	private function extract_fonts_from_blocks( array $blocks ): void {
		foreach ( $blocks as $block ) {
			if ( isset( $block['blockName'] ) && str_starts_with( $block['blockName'], 'gravisain/' ) ) {
				$this->extract_fonts_from_attrs( $block['attrs'] ?? [] );
			}

			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->extract_fonts_from_blocks( $block['innerBlocks'] );
			}
		}
	}

	/**
	 * Extract font family from block attributes (handles both flat and nested typography objects).
	 *
	 * @param array $attrs Block attributes.
	 * @return void
	 */
	private function extract_fonts_from_attrs( array $attrs ): void {
		// 1. Direct fontFamily attribute (e.g., Advanced Heading, Advanced Text)
		if ( ! empty( $attrs['fontFamily'] ) && is_string( $attrs['fontFamily'] ) ) {
			$this->fonts[ $attrs['fontFamily'] ] = true;
		}

		// 2. Nested typography objects (e.g., Hero block)
		$typo_keys = [
			'titleTypography',
			'eyebrowTypography',
			'descriptionTypography',
			'primaryButtonTypography',
			'secondaryButtonTypography',
			// Add any future typography keys here
		];

		foreach ( $typo_keys as $key ) {
			if ( ! empty( $attrs[ $key ]['fontFamily'] ) && is_string( $attrs[ $key ]['fontFamily'] ) ) {
				$this->fonts[ $attrs[ $key ]['fontFamily'] ] = true;
			}
		}
	}

	/**
	 * Print the Google Fonts link tag in the footer.
	 *
	 * @return void
	 */
	public function print_google_fonts(): void {
		if ( empty( $this->fonts ) ) {
			return;
		}

		$url = $this->get_google_fonts_url( array_keys( $this->fonts ) );
		echo '<link rel="stylesheet" href="' . esc_url( $url ) . '" media="all" />' . "\n";
	}

	/**
	 * Generate the Google Fonts API v2 URL.
	 *
	 * @param array $fonts Array of font family names.
	 * @return string
	 */
	private function get_google_fonts_url( array $fonts ): string {
		$base_url = 'https://fonts.googleapis.com/css2';
		$families = [];

		foreach ( $fonts as $font ) {
			$font_formatted = str_replace( ' ', '+', $font );
			$families[]     = 'family=' . $font_formatted;
		}

		$url = $base_url . '?' . implode( '&', $families ) . '&display=swap';

		return $url;
	}
}
