<?php
/**
 * Main Plugin Class
 *
 * @package Gravisain\Blocks
 */

declare(strict_types=1);

namespace Gravisain\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Plugin Class
 *
 * Singleton lifecycle manager for Gravisain Blocks.
 */
class Plugin {

	/**
	 * Singleton instance.
	 *
	 * @var Plugin|null
	 */
	private static ?Plugin $instance = null;

	/**
	 * Pattern Registry instance.
	 *
	 * @var PatternRegistry
	 */
	private PatternRegistry $pattern_registry;

	/**
	 * Block Registry instance.
	 *
	 * @var BlockRegistry
	 */
	private BlockRegistry $block_registry;

	/**
	 * Get singleton instance.
	 *
	 * @return Plugin
	 */
	public static function get_instance(): Plugin {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Private constructor.
	 */
	private function __construct() {
		$this->pattern_registry = new PatternRegistry();
		$this->block_registry   = new BlockRegistry();
	}

	/**
	 * Run the plugin lifecycle.
	 *
	 * @return void
	 */
	public function run(): void {
		$this->pattern_registry->register();
		$this->block_registry->register();

		$google_fonts = new GoogleFontsLoader();
		$google_fonts->register();

		// Initialize Maintenance & Coming Soon Mode
		if ( class_exists( Maintenance::class ) ) {
			Maintenance::get_instance();
		}

		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_assets' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'inject_editor_reset_css' ], 9999 );
	}

	/**
	 * Enqueue Gravisain Blocks styles.
	 *
	 * @return void
	 */
	public function enqueue_assets(): void {
		wp_enqueue_style(
			'gravisain-blocks-patterns',
			GRAVISAIN_BLOCKS_URL . 'assets/css/patterns.css',
			[],
			GRAVISAIN_BLOCKS_VERSION
		);
	}

	/**
	 * Inject CSS reset for countdown block border directly into the editor.
	 * This runs at priority 9999 to ensure it loads AFTER all WordPress core
	 * stylesheets (including content.min.css), guaranteeing our reset wins.
	 *
	 * @return void
	 */
	public function inject_editor_reset_css(): void {
		if ( ! function_exists( 'wp_add_inline_style' ) ) {
			return;
		}

		$css = '
			/* Gravisain: Remove default border/outline from Countdown Timer block */
			.block-editor-block-list__layout .block-editor-block-list__block[data-type="gravisain/countdown"],
			.block-editor-block-list__layout .block-editor-block-list__block[data-type="gravisain/countdown"].is-selected,
			.block-editor-block-list__layout .block-editor-block-list__block[data-type="gravisain/countdown"].is-highlighted,
			.block-editor-block-list__layout .block-editor-block-list__block[data-type="gravisain/countdown"]:focus,
			.block-editor-block-list__layout .block-editor-block-list__block[data-type="gravisain/countdown"]:focus-within {
				border: none !important;
				outline: none !important;
				box-shadow: none !important;
			}
			.block-editor-block-list__layout .block-editor-block-list__block[data-type="gravisain/countdown"]::before,
			.block-editor-block-list__layout .block-editor-block-list__block[data-type="gravisain/countdown"]::after,
			.block-editor-block-list__layout .block-editor-block-list__block[data-type="gravisain/countdown"].is-selected::before,
			.block-editor-block-list__layout .block-editor-block-list__block[data-type="gravisain/countdown"].is-selected::after {
				border: none !important;
				outline: none !important;
				box-shadow: none !important;
				display: none !important;
			}
		';

		wp_add_inline_style( 'wp-edit-blocks', $css );
	}

	/**
	 * Get pattern registry instance.
	 *
	 * @return PatternRegistry
	 */
	public function get_pattern_registry(): PatternRegistry {
		return $this->pattern_registry;
	}
}
