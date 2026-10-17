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
 * Scans blocks for 'fontFamily' attribute and enqueues Google Fonts dynamically on frontend and editor.
 */
class GoogleFontsLoader {

	/**
	 * Collected font families.
	 *
	 * @var array<string, bool>
	 */
	private array $fonts = [];

	/**
	 * Already enqueued fonts to prevent duplicate output.
	 *
	 * @var array<string, bool>
	 */
	private array $enqueued_fonts = [];

	/**
	 * System fonts that should not be queried from Google Fonts.
	 *
	 * @var array<int, string>
	 */
	private array $system_fonts = [
		'inherit',
		'arial',
		'helvetica',
		'times new roman',
		'times',
		'georgia',
		'courier new',
		'courier',
		'verdana',
		'tahoma',
		'trebuchet ms',
		'impact',
		'comic sans ms',
		'sans-serif',
		'serif',
		'monospace',
		'cursive',
		'fantasy',
		'system-ui',
		'-apple-system',
		'blinkmacsystemfont',
		'segoe ui',
	];

	/**
	 * Register hooks.
	 *
	 * @return void
	 */
	public function register(): void {
		// Preconnect for faster font delivery.
		add_action( 'wp_head', [ $this, 'add_google_fonts_preconnect' ], 2 );

		// Enqueue fonts early in wp_head on frontend.
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_fonts' ], 20 );

		// Collect fonts during block rendering (for dynamic blocks, widgets, FSE templates).
		add_filter( 'render_block', [ $this, 'collect_fonts_from_block' ], 10, 2 );

		// Directly print any remaining dynamically collected fonts in the footer.
		add_action( 'wp_footer', [ $this, 'print_google_fonts' ], 99 );

		// For the block editor, parse the post content on load.
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_fonts' ] );
	}

	/**
	 * Add preconnect tags in wp_head.
	 *
	 * @return void
	 */
	public function add_google_fonts_preconnect(): void {
		echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
		echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
	}

	/**
	 * Check if a font is a system font.
	 *
	 * @param string $font Font family name.
	 * @return bool
	 */
	private function is_system_font( string $font ): bool {
		$clean = strtolower( trim( $font, "'\" \t\n\r\0\x0B" ) );
		return in_array( $clean, $this->system_fonts, true );
	}

	/**
	 * Add font to collection if valid and not a system font.
	 *
	 * @param mixed $font Font family name.
	 * @return void
	 */
	private function add_font( $font ): void {
		if ( ! is_string( $font ) || empty( trim( $font ) ) ) {
			return;
		}

		$clean = trim( $font, "'\" \t\n\r\0\x0B" );
		if ( empty( $clean ) ) {
			return;
		}

		// Extract primary font name (before fallback comma)
		$parts = explode( ',', $clean );
		$primary = trim( $parts[0], "'\" \t\n\r\0\x0B" );

		if ( empty( $primary ) || $this->is_system_font( $primary ) ) {
			return;
		}

		$this->fonts[ $primary ] = true;
	}

	/**
	 * Enqueue Google Fonts early in wp_head for the current page.
	 *
	 * @return void
	 */
	public function enqueue_frontend_fonts(): void {
		if ( is_admin() ) {
			return;
		}

		global $post;
		if ( $post instanceof \WP_Post && has_blocks( $post->post_content ) ) {
			$blocks = parse_blocks( $post->post_content );
			$this->extract_fonts_from_blocks( $blocks );
		}

		if ( ! empty( $this->fonts ) ) {
			$url = $this->get_google_fonts_url( array_keys( $this->fonts ) );
			if ( $url ) {
				wp_enqueue_style( 'gravisain-blocks-google-fonts', $url, [], defined( 'GRAVISAIN_BLOCKS_VERSION' ) ? GRAVISAIN_BLOCKS_VERSION : '1.0.0' );
				foreach ( array_keys( $this->fonts ) as $f ) {
					$this->enqueued_fonts[ $f ] = true;
				}
			}
		}
	}

	/**
	 * Collect font family from a block during frontend rendering.
	 *
	 * @param string $block_content The block content.
	 * @param array  $block         The full block, including name and attributes.
	 * @return string
	 */
	public function collect_fonts_from_block( string $block_content, array $block ): string {
		if ( isset( $block['blockName'] ) && 0 === strpos( $block['blockName'], 'gravisain/' ) ) {
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
			if ( $url ) {
				wp_enqueue_style( 'gravisain-blocks-editor-fonts', $url, [], defined( 'GRAVISAIN_BLOCKS_VERSION' ) ? GRAVISAIN_BLOCKS_VERSION : '1.0.0' );
			}
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
			if ( isset( $block['blockName'] ) && 0 === strpos( $block['blockName'], 'gravisain/' ) ) {
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
		if ( isset( $attrs['fontFamily'] ) ) {
			$this->add_font( $attrs['fontFamily'] );
		}

		// 2. Nested typography objects (e.g., Hero block, Buttons)
		$typo_keys = [
			'titleTypography',
			'titleTypographyTablet',
			'titleTypographyMobile',
			'eyebrowTypography',
			'eyebrowTypographyTablet',
			'eyebrowTypographyMobile',
			'descriptionTypography',
			'descriptionTypographyTablet',
			'descriptionTypographyMobile',
			'primaryButtonTypography',
			'primaryButtonTypographyTablet',
			'primaryButtonTypographyMobile',
			'secondaryButtonTypography',
			'secondaryButtonTypographyTablet',
			'secondaryButtonTypographyMobile',
			'typography',
		];

		foreach ( $typo_keys as $key ) {
			if ( ! empty( $attrs[ $key ]['fontFamily'] ) ) {
				$this->add_font( $attrs[ $key ]['fontFamily'] );
			}
		}

		// 3. Fallback: inspect any key ending in 'Typography' or containing an array with 'fontFamily'
		foreach ( $attrs as $val ) {
			if ( is_array( $val ) && ! empty( $val['fontFamily'] ) ) {
				$this->add_font( $val['fontFamily'] );
			}
		}
	}

	/**
	 * Enqueue and print Google Fonts link in the footer for any blocks loaded dynamically.
	 *
	 * @return void
	 */
	public function print_google_fonts(): void {
		$remaining = array_diff_key( $this->fonts, $this->enqueued_fonts );
		if ( empty( $remaining ) ) {
			return;
		}

		$url = $this->get_google_fonts_url( array_keys( $remaining ) );
		if ( $url ) {
			$handle = 'gravisain-blocks-google-fonts-footer';
			wp_enqueue_style( $handle, $url, [], defined( 'GRAVISAIN_BLOCKS_VERSION' ) ? GRAVISAIN_BLOCKS_VERSION : '1.0.0' );
			wp_print_styles( $handle );
			foreach ( array_keys( $remaining ) as $font ) {
				$this->enqueued_fonts[ $font ] = true;
			}
		}
	}

	/**
	 * Generate the Google Fonts API v2 URL.
	 *
	 * @param array $fonts Array of font family names.
	 * @return string
	 */
	private function get_google_fonts_url( array $fonts ): string {
		if ( empty( $fonts ) ) {
			return '';
		}

		$base_url = 'https://fonts.googleapis.com/css2';
		$families = [];

		foreach ( $fonts as $font ) {
			$clean = trim( $font, "'\" \t\n\r\0\x0B" );
			if ( empty( $clean ) || $this->is_system_font( $clean ) ) {
				continue;
			}
			$font_formatted = str_replace( ' ', '+', $clean );
			$families[]     = 'family=' . $font_formatted;
		}

		if ( empty( $families ) ) {
			return '';
		}

		return $base_url . '?' . implode( '&', $families ) . '&display=swap';
	}
}
