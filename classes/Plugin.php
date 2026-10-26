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

		// Initialize Login Security & Turnstile
		if ( class_exists( LoginSecurity::class ) ) {
			LoginSecurity::get_instance();
		}

		// Initialize Early Access Updater if present (Undagital Standalone builds)
		if ( class_exists( Updater::class ) ) {
			Updater::init();
		}

		add_action( 'admin_menu', [ $this, 'register_admin_menu' ] );
		add_filter( 'parent_file', [ $this, 'filter_parent_file' ] );
		add_filter( 'submenu_file', [ $this, 'filter_submenu_file' ] );

		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_assets' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'inject_editor_reset_css' ], 9999 );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_recovery_script' ], 100 );
	}

	/**
	 * Check if Gravisain theme is active.
	 *
	 * @return bool
	 */
	private function is_gravisain_theme_active(): bool {
		return defined( 'GRAVISAIN_VERSION' ) || class_exists( '\Gravisain\Dashboard\Welcome' ) || get_template() === 'gravisain';
	}

	/**
	 * Register Reusable Blocks submenu under Appearance if Gravisain theme is not active.
	 *
	 * @return void
	 */
	public function register_admin_menu(): void {
		// If Gravisain theme is active, it is already integrated into the Gravisain main menu.
		if ( $this->is_gravisain_theme_active() ) {
			return;
		}

		add_submenu_page(
			'themes.php',
			__( 'Reusable Blocks', 'gravisain-blocks' ),
			__( 'Reusable Blocks', 'gravisain-blocks' ),
			'edit_posts',
			'edit.php?post_type=wp_block'
		);
	}

	/**
	 * Keep Appearance menu active when viewing or editing Reusable Blocks on non-Gravisain themes.
	 *
	 * @param string $parent_file
	 * @return string
	 */
	public function filter_parent_file( string $parent_file ): string {
		if ( ! $this->is_gravisain_theme_active() ) {
			global $current_screen;
			if ( $current_screen && 'wp_block' === $current_screen->post_type ) {
				return 'themes.php';
			}
		}
		return $parent_file;
	}

	/**
	 * Keep Reusable Blocks submenu active when viewing or editing Reusable Blocks on non-Gravisain themes.
	 *
	 * @param string|null $submenu_file
	 * @return string|null
	 */
	public function filter_submenu_file( ?string $submenu_file ): ?string {
		if ( ! $this->is_gravisain_theme_active() ) {
			global $current_screen;
			if ( $current_screen && 'wp_block' === $current_screen->post_type ) {
				return 'edit.php?post_type=wp_block';
			}
		}
		return $submenu_file;
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

			/* Gravisain: Navigation horizontal & alignment in editor iframe */
			.gravisain-navigation-wrapper .gravisain-navigation-list .block-editor-inner-blocks,
			.gravisain-navigation-wrapper .gravisain-navigation-list .block-editor-block-list__layout {
				display: flex !important;
				gap: var(--gravisain-nav-gap, 24px) !important;
				width: 100% !important;
				margin: 0 !important;
				padding: 0 !important;
				list-style: none !important;
			}
			.gravisain-navigation-wrapper.layout-horizontal .gravisain-navigation-list .block-editor-block-list__layout {
				flex-direction: row !important;
				flex-wrap: wrap !important;
				align-items: center !important;
			}
			.gravisain-navigation-wrapper.layout-horizontal .gravisain-navigation-list .block-editor-block-list__layout > .block-editor-block-list__block,
			.gravisain-navigation-wrapper.layout-horizontal .gravisain-navigation-list .block-editor-block-list__layout > .wp-block,
			.gravisain-navigation-wrapper.layout-horizontal .gravisain-navigation-list .block-editor-block-list__layout > [data-type="gravisain/navigation-link"] {
				width: auto !important;
				display: inline-flex !important;
				margin: 0 !important;
			}
			.gravisain-navigation-wrapper.layout-vertical .gravisain-navigation-list .block-editor-block-list__layout {
				flex-direction: column !important;
			}
			.gravisain-navigation-wrapper.layout-vertical .gravisain-navigation-list .block-editor-block-list__layout > .block-editor-block-list__block,
			.gravisain-navigation-wrapper.layout-vertical .gravisain-navigation-list .block-editor-block-list__layout > .wp-block,
			.gravisain-navigation-wrapper.layout-vertical .gravisain-navigation-list .block-editor-block-list__layout > [data-type="gravisain/navigation-link"] {
				width: 100% !important;
				display: block !important;
			}
			.gravisain-navigation-wrapper.align-left .gravisain-navigation-list .block-editor-block-list__layout {
				justify-content: flex-start !important;
			}
			.gravisain-navigation-wrapper.align-center .gravisain-navigation-list .block-editor-block-list__layout {
				justify-content: center !important;
			}
			.gravisain-navigation-wrapper.align-right .gravisain-navigation-list .block-editor-block-list__layout {
				justify-content: flex-end !important;
			}
			.gravisain-navigation-wrapper.align-space-between .gravisain-navigation-list .block-editor-block-list__layout {
				justify-content: space-between !important;
			}

			/* Gravisain: Buttons horizontal & alignment in editor iframe */
			.gravisain-buttons-wrapper.is-layout-horizontal,
			.wp-block-gravisain-buttons.is-layout-horizontal {
				display: flex !important;
				flex-direction: row !important;
				flex-wrap: wrap !important;
				align-items: center !important;
				box-sizing: border-box !important;
			}
			.gravisain-buttons-wrapper.is-layout-horizontal .block-editor-inner-blocks,
			.gravisain-buttons-wrapper.is-layout-horizontal .block-editor-block-list__layout,
			.wp-block-gravisain-buttons.is-layout-horizontal .block-editor-inner-blocks,
			.wp-block-gravisain-buttons.is-layout-horizontal .block-editor-block-list__layout {
				display: flex !important;
				flex-direction: row !important;
				flex-wrap: wrap !important;
				align-items: center !important;
				justify-content: var(--buttons-justify, inherit) !important;
				gap: var(--buttons-gap, inherit) !important;
				width: 100% !important;
				margin: 0 !important;
				padding: 0 !important;
			}
			.gravisain-buttons-wrapper.is-layout-horizontal .block-editor-block-list__block:not(.is-width-full),
			.gravisain-buttons-wrapper.is-layout-horizontal .wp-block:not(.is-width-full),
			.gravisain-buttons-wrapper.is-layout-horizontal [data-type="gravisain/advanced-button"]:not(.is-width-full),
			.gravisain-buttons-wrapper.is-layout-horizontal .wp-block-gravisain-advanced-button:not(.is-width-full),
			.gravisain-buttons-wrapper.is-layout-horizontal .gravisain-advanced-button:not(.is-width-full),
			.wp-block-gravisain-buttons.is-layout-horizontal .block-editor-block-list__block:not(.is-width-full),
			.wp-block-gravisain-buttons.is-layout-horizontal .wp-block:not(.is-width-full),
			.wp-block-gravisain-buttons.is-layout-horizontal [data-type="gravisain/advanced-button"]:not(.is-width-full),
			.wp-block-gravisain-buttons.is-layout-horizontal .wp-block-gravisain-advanced-button:not(.is-width-full),
			.wp-block-gravisain-buttons.is-layout-horizontal .gravisain-advanced-button:not(.is-width-full) {
				width: auto !important;
				max-width: 100% !important;
				display: inline-flex !important;
				flex: 0 0 auto !important;
				margin: 0 !important;
			}
			.gravisain-buttons-wrapper.is-layout-horizontal .block-list-appender,
			.wp-block-gravisain-buttons.is-layout-horizontal .block-list-appender {
				display: inline-flex !important;
				align-items: center !important;
				align-self: center !important;
				flex: 0 0 auto !important;
				width: auto !important;
				margin: 0 !important;
			}
			.gravisain-buttons-wrapper.is-layout-vertical,
			.wp-block-gravisain-buttons.is-layout-vertical {
				display: flex !important;
				flex-direction: column !important;
				align-items: stretch !important;
			}
			.gravisain-buttons-wrapper.is-layout-vertical .block-editor-block-list__layout,
			.wp-block-gravisain-buttons.is-layout-vertical .block-editor-block-list__layout {
				display: flex !important;
				flex-direction: column !important;
				width: 100% !important;
			}
			.gravisain-buttons-wrapper.is-layout-vertical .block-editor-block-list__layout > .block-editor-block-list__block,
			.gravisain-buttons-wrapper.is-layout-vertical .block-editor-block-list__layout > .wp-block,
			.gravisain-buttons-wrapper.is-layout-vertical .block-editor-block-list__layout > [data-type="gravisain/advanced-button"],
			.wp-block-gravisain-buttons.is-layout-vertical .block-editor-block-list__layout > .block-editor-block-list__block,
			.wp-block-gravisain-buttons.is-layout-vertical .block-editor-block-list__layout > .wp-block,
			.wp-block-gravisain-buttons.is-layout-vertical .block-editor-block-list__layout > [data-type="gravisain/advanced-button"] {
				width: 100% !important;
				margin: 0 !important;
			}

			/* Gravisain: Fix Gutenberg FocalPointPicker fieldset height bug in Chromium/WebKit */
			fieldset.components-focal-point-picker-control,
			.components-focal-point-picker-control,
			fieldset[class*="focal-point-picker"] {
				display: flex !important;
				flex-direction: column !important;
				width: 100% !important;
				margin-bottom: 20px !important;
			}
			.components-focal-point-picker-control .focal-point-picker__controls,
			.focal-point-picker__controls {
				display: flex !important;
				gap: 12px !important;
				width: 100% !important;
				margin-top: 14px !important;
				margin-bottom: 14px !important;
				position: relative !important;
				clear: both !important;
			}
			.focal-point-picker__controls-position-unit-control,
			.components-focal-point-picker__controls-position-unit-control {
				flex: 1 !important;
			}
			.gravisain-focal-point-wrapper {
				display: flex !important;
				flex-direction: column !important;
				width: 100% !important;
				margin-bottom: 20px !important;
			}
		';

		wp_add_inline_style( 'wp-edit-blocks', $css );
	}

	/**
	 * Enqueue automatic block recovery script for Gutenberg editor.
	 * Automatically heals invalid Gravisain blocks without requiring manual clicks.
	 *
	 * @return void
	 */
	public function enqueue_block_recovery_script(): void {
		wp_register_script(
			'gravisain-auto-recovery',
			false,
			[ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-edit-post', 'wp-data', 'wp-dom-ready' ],
			GRAVISAIN_BLOCKS_VERSION,
			true
		);
		wp_enqueue_script( 'gravisain-auto-recovery' );

		$script = "
(function() {
    function autoRecoverGravisainBlocks() {
        var wpObj = window.wp || (window.parent && window.parent.wp) || (window.top && window.top.wp);
        if (!wpObj || !wpObj.data || !wpObj.blocks) return;

        var editorSelect = wpObj.data.select('core/block-editor') || wpObj.data.select('core/editor');
        var editorDispatch = wpObj.data.dispatch('core/block-editor');
        if (!editorSelect || !editorDispatch) return;

        var getBlocks = editorSelect.getBlocks || editorSelect.getEditorBlocks;
        var rawBlocks = getBlocks ? getBlocks() : [];
        if (!rawBlocks || rawBlocks.length === 0) return;

        var count = 0;

        function process(blockList) {
            return blockList.map(function(block) {
                var current = block;

                if (current.innerBlocks && current.innerBlocks.length > 0) {
                    var newInner = process(current.innerBlocks);
                    if (newInner.some(function(b) { return b._gAutoRec; })) {
                        current.innerBlocks = newInner;
                        current._gAutoRec = true;
                        current._gAutoCid = current.clientId;
                    }
                }

                if (current.isValid === false) {
                    // Only auto-recover Gravisain blocks
                    if (current.name && current.name.indexOf('gravisain/') === 0) {
                        // Never auto-recover a container if it would wipe out existing inner content
                        if (
                            (current.name === 'gravisain/row-layout' || current.name === 'gravisain/column') &&
                            (!current.innerBlocks || current.innerBlocks.length === 0) &&
                            current.originalContent && current.originalContent.trim().length > 0
                        ) {
                            return current;
                        }

                        var newBlock = wpObj.blocks.createBlock(
                            current.name,
                            current.attributes,
                            current.innerBlocks || []
                        );
                        newBlock._gAutoRec = true;
                        newBlock._gAutoCid = current.clientId;
                        count++;
                        return newBlock;
                    }
                }

                return current;
            });
        }

        var processed = process(rawBlocks);

        if (count > 0) {
            processed.forEach(function(b) {
                if (b._gAutoRec && b._gAutoCid) {
                    var existing = editorSelect.getBlock ? editorSelect.getBlock(b._gAutoCid) : null;
                    if (existing) {
                        editorDispatch.replaceBlock(b._gAutoCid, b);
                    }
                }
            });

            console.log('[Gravisain Blocks] Auto-recovered ' + count + ' invalid block(s).');

            var notices = wpObj.data.dispatch('core/notices');
            if (notices && notices.createNotice) {
                var message = (count === 1)
                    ? 'Gravisain: 1 block was automatically recovered. Please save your changes (Update / Save).'
                    : 'Gravisain: ' + count + ' blocks were automatically recovered. Please save your changes (Update / Save).';

                notices.createNotice(
                    'success',
                    message,
                    { isDismissible: true, type: 'snackbar' }
                );
            }
        }
    }

    if (window.wp && window.wp.domReady) {
        window.wp.domReady(function() {
            setTimeout(autoRecoverGravisainBlocks, 600);
            setTimeout(autoRecoverGravisainBlocks, 1800);
            setTimeout(autoRecoverGravisainBlocks, 3500);
        });
    }
})();
";
		wp_add_inline_script( 'gravisain-auto-recovery', $script );
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
