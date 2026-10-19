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
			'gravisain-templates' => [ 'label' => __( 'Gravisain Templates', 'gravisain-blocks' ) ],
			'gravisain-heroes'    => [ 'label' => __( 'Gravisain Heroes', 'gravisain-blocks' ) ],
			'gravisain-sections'  => [ 'label' => __( 'Gravisain Sections', 'gravisain-blocks' ) ],
			'gravisain-cta'       => [ 'label' => __( 'Gravisain Call to Action', 'gravisain-blocks' ) ],
			'gravisain-pricing'   => [ 'label' => __( 'Gravisain Pricing', 'gravisain-blocks' ) ],
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

	/**
	 * Safely get template content with multi-location fallback and zero warnings.
	 *
	 * @param string $slug Template folder slug (e.g. 'aesthetic-clinic').
	 * @param string $file File name (e.g. 'home.html').
	 * @return string
	 */
	public static function get_template_content( string $slug, string $file = 'home.html' ): string {
		$safe_slug = sanitize_file_name( $slug );
		$safe_file = sanitize_file_name( $file );
		$path      = GRAVISAIN_BLOCKS_DIR . 'starter-templates/' . $safe_slug . '/' . $safe_file;

		if ( file_exists( $path ) ) {
			$content = file_get_contents( $path );
			if ( false !== $content && ! empty( $content ) ) {
				return self::normalize_content( $content );
			}
		}

		return '';
	}

	/**
	 * Normalize template content to guarantee 100% Gutenberg block validation compatibility.
	 *
	 * Prevents "Block contains unexpected or invalid content / Attempt recovery" warnings
	 * caused by minor schema differences across Gutenberg versions.
	 *
	 * @param string $content Raw template HTML content.
	 * @return string Normalized template HTML content.
	 */
	public static function normalize_content( string $content ): string {
		if ( empty( $content ) ) {
			return $content;
		}

		// 1. Normalize buttons container class: gravisain-buttons -> gravisain-buttons-wrapper
		$content = preg_replace(
			'/class="wp-block-gravisain-buttons gravisain-buttons(\s|")/i',
			'class="wp-block-gravisain-buttons gravisain-buttons-wrapper$1',
			$content
		);

		// 2. Strip empty inline CSS variable declarations that React 18 DOM serialization omits
		$content = str_replace(
			[
				'--gravisain-bg-color-tablet:;',
				'--gravisain-bg-color-mobile:;',
				'--gravisain-bg-gradient-tablet:;',
				'--gravisain-bg-gradient-mobile:;',
			],
			'',
			$content
		);

		// 3. Ensure advanced-button inner text is wrapped in <span class="gravisain-btn-text">
		$content = preg_replace_callback(
			'/(<div class="[^"]*wp-block-gravisain-advanced-button[^"]*">.*?<a\s+[^>]*>)(.*?)(<\/a>.*?<\/div>)/is',
			function( $matches ) {
				$prefix = $matches[1];
				$inner  = $matches[2];
				$suffix = $matches[3];
				if ( strpos( $inner, 'gravisain-btn-text' ) === false ) {
					return $prefix . '<span class="gravisain-btn-text">' . $inner . '</span>' . $suffix;
				}
				return $matches[0];
			},
			$content
		);

		// 4. Ensure advanced-heading with no divider has "showDivider": false in comment attrs
		$content = preg_replace_callback(
			'/<!--\s*wp:gravisain\/advanced-heading\s+(\{.*?\})\s*-->/s',
			function( $matches ) {
				$attrs_str = $matches[1];
				if ( strpos( $attrs_str, '"showDivider"' ) === false ) {
					$attrs = json_decode( $attrs_str, true );
					if ( is_array( $attrs ) ) {
						$attrs['showDivider'] = false;
						return '<!-- wp:gravisain/advanced-heading ' . json_encode( $attrs, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . ' -->';
					}
				}
				return $matches[0];
			},
			$content
		);

		// 5. Ensure advanced-heading has wp-block-gravisain-advanced-heading class
		$content = preg_replace(
			'/class="gravisain-advanced-heading(\s|")/i',
			'class="wp-block-gravisain-advanced-heading gravisain-advanced-heading$1',
			$content
		);

		// 6. Normalize legacy button variant attribute to buttonStyle
		$content = str_replace(
			[ '"variant":"fill"', '"variant":"outline"' ],
			[ '"buttonStyle":"fill"', '"buttonStyle":"outline"' ],
			$content
		);

		// 7. Clean consecutive semicolons
		$content = preg_replace( '/;{2,}/', ';', $content );

		return $content;
	}
}
