<?php
/**
 * Maintenance & Coming Soon Manager
 *
 * @package Gravisain\Blocks
 */

declare(strict_types=1);

namespace Gravisain\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Maintenance Class
 */
class Maintenance {

	/**
	 * Singleton instance.
	 *
	 * @var Maintenance|null
	 */
	private static ?Maintenance $instance = null;

	/**
	 * Get singleton instance.
	 *
	 * @return Maintenance
	 */
	public static function get_instance(): Maintenance {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Register Customizer settings.
		add_action( 'customize_register', [ $this, 'register_settings' ], 20 );

		// Intercept frontend requests.
		add_action( 'template_redirect', [ $this, 'intercept_request' ], 5 );
	}

	/**
	 * Register Customizer Settings and Controls.
	 *
	 * @param \WP_Customize_Manager $wp_customize Customizer manager.
	 * @return void
	 */
	public function register_settings( $wp_customize ): void {
		// Register Section.
		$section_args = [
			'title'       => __( 'Maintenance & Coming Soon', 'gravisain-blocks' ),
			'description' => __( 'Manage your website offline status, teaser page, and access control.', 'gravisain-blocks' ),
			'priority'    => 80,
		];

		// If Gravisain theme options panel is registered, attach to it.
		if ( $wp_customize->get_panel( 'gravisain_options' ) ) {
			$section_args['panel'] = 'gravisain_options';
		}

		$wp_customize->add_section( 'gravisain_maintenance_section', $section_args );

		// 1. Enable Toggle.
		$wp_customize->add_setting( 'gravisain_maintenance_enabled', [
			'type'              => 'option',
			'default'           => false,
			'sanitize_callback' => [ $this, 'sanitize_checkbox' ],
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_maintenance_enabled', [
			'label'       => __( 'Enable Maintenance Mode', 'gravisain-blocks' ),
			'description' => __( 'Turn this on to restrict access to the frontend of your website.', 'gravisain-blocks' ),
			'section'     => 'gravisain_maintenance_section',
			'settings'    => 'gravisain_maintenance_enabled',
			'type'        => 'checkbox',
		] );

		// Active callback helper to show options only when enabled.
		$is_enabled = function() {
			return (bool) get_option( 'gravisain_maintenance_enabled', false );
		};

		// 2. Mode Type (Maintenance vs Coming Soon).
		$wp_customize->add_setting( 'gravisain_maintenance_mode', [
			'type'              => 'option',
			'default'           => 'maintenance',
			'sanitize_callback' => 'sanitize_key',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_maintenance_mode', [
			'label'           => __( 'Status Mode', 'gravisain-blocks' ),
			'description'     => __( 'Maintenance Mode sends a 503 HTTP status (SEO friendly, temporary offline). Coming Soon sends a 200 HTTP status (allows indexing, pre-launch).', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_mode',
			'type'            => 'select',
			'active_callback' => $is_enabled,
			'choices'         => [
				'maintenance' => __( 'Maintenance (503 Service Unavailable)', 'gravisain-blocks' ),
				'coming_soon' => __( 'Coming Soon (200 OK)', 'gravisain-blocks' ),
			],
		] );

		// 3. Bypass Roles.
		$wp_customize->add_setting( 'gravisain_maintenance_bypass_role', [
			'type'              => 'option',
			'default'           => 'manage_options',
			'sanitize_callback' => 'sanitize_key',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_maintenance_bypass_role', [
			'label'           => __( 'Who can access the site?', 'gravisain-blocks' ),
			'description'     => __( 'Select the minimum capability required to view the live frontend.', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_bypass_role',
			'type'            => 'select',
			'active_callback' => $is_enabled,
			'choices'         => [
				'manage_options' => __( 'Administrators Only (manage_options)', 'gravisain-blocks' ),
				'edit_posts'     => __( 'Editors & Administrators (edit_posts)', 'gravisain-blocks' ),
				'read'           => __( 'All Logged-In Users (read)', 'gravisain-blocks' ),
			],
		] );

		// 4. Content Source.
		$wp_customize->add_setting( 'gravisain_maintenance_source', [
			'type'              => 'option',
			'default'           => 'default',
			'sanitize_callback' => 'sanitize_key',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_maintenance_source', [
			'label'           => __( 'Page Source', 'gravisain-blocks' ),
			'description'     => __( 'Choose to display our premium built-in fallback template or select a custom page designed with blocks.', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_source',
			'type'            => 'select',
			'active_callback' => $is_enabled,
			'choices'         => [
				'default'     => __( 'Default Premium Fallback', 'gravisain-blocks' ),
				'custom_page' => __( 'Select a Custom Page', 'gravisain-blocks' ),
			],
		] );

		// 5. Custom Page Selector.
		$wp_customize->add_setting( 'gravisain_maintenance_page_id', [
			'type'              => 'option',
			'default'           => 0,
			'sanitize_callback' => 'absint',
			'transport'         => 'refresh',
		] );

		// Retrieve all pages for selection.
		$pages         = get_pages();
		$pages_choices = [ 0 => __( 'Select a page...', 'gravisain-blocks' ) ];
		foreach ( $pages as $page ) {
			$pages_choices[ $page->ID ] = $page->post_title;
		}

		$wp_customize->add_control( 'gravisain_maintenance_page_id', [
			'label'           => __( 'Select Custom Page', 'gravisain-blocks' ),
			'description'     => __( 'Choose the page you want to show to visitors.', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_page_id',
			'type'            => 'select',
			'active_callback' => function() use ( $is_enabled ) {
				return $is_enabled() && 'custom_page' === get_option( 'gravisain_maintenance_source', 'default' );
			},
			'choices'         => $pages_choices,
		] );

		// 6. Separator: Default Template Customization.
		$wp_customize->add_setting( 'gravisain_maintenance_default_section_title', [
			'type'              => 'option',
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		] );

		if ( class_exists( '\Gravisain\Customizer\Controls\HeadingControl' ) ) {
			$wp_customize->add_control( new \Gravisain\Customizer\Controls\HeadingControl( $wp_customize, 'gravisain_maintenance_default_section_title', [
				'label'           => __( 'Default Fallback Design Options', 'gravisain-blocks' ),
				'section'         => 'gravisain_maintenance_section',
				'settings'        => 'gravisain_maintenance_default_section_title',
				'active_callback' => function() use ( $is_enabled ) {
					return $is_enabled() && 'default' === get_option( 'gravisain_maintenance_source', 'default' );
				},
			] ) );
		}

		// 7. Headline.
		$wp_customize->add_setting( 'gravisain_maintenance_headline', [
			'type'              => 'option',
			'default'           => __( 'Under Maintenance', 'gravisain-blocks' ),
			'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_maintenance_headline', [
			'label'           => __( 'Headline text', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_headline',
			'type'            => 'text',
			'active_callback' => function() use ( $is_enabled ) {
				return $is_enabled() && 'default' === get_option( 'gravisain_maintenance_source', 'default' );
			},
		] );

		// 8. Description.
		$wp_customize->add_setting( 'gravisain_maintenance_message', [
			'type'              => 'option',
			'default'           => __( 'We are currently updating our website to bring you a better experience. Please check back soon!', 'gravisain-blocks' ),
			'sanitize_callback' => 'sanitize_textarea_field',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_maintenance_message', [
			'label'           => __( 'Description Message', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_message',
			'type'            => 'textarea',
			'active_callback' => function() use ( $is_enabled ) {
				return $is_enabled() && 'default' === get_option( 'gravisain_maintenance_source', 'default' );
			},
		] );

		// 9. Background Color.
		$wp_customize->add_setting( 'gravisain_maintenance_bg_color', [
			'type'              => 'option',
			'default'           => '#0f172a',
			'sanitize_callback' => 'sanitize_hex_color',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( new \WP_Customize_Color_Control( $wp_customize, 'gravisain_maintenance_bg_color', [
			'label'           => __( 'Background Color', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_bg_color',
			'active_callback' => function() use ( $is_enabled ) {
				return $is_enabled() && 'default' === get_option( 'gravisain_maintenance_source', 'default' );
			},
		] ) );

		// 10. Text Color.
		$wp_customize->add_setting( 'gravisain_maintenance_text_color', [
			'type'              => 'option',
			'default'           => '#f8fafc',
			'sanitize_callback' => 'sanitize_hex_color',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( new \WP_Customize_Color_Control( $wp_customize, 'gravisain_maintenance_text_color', [
			'label'           => __( 'Text Color', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_text_color',
			'active_callback' => function() use ( $is_enabled ) {
				return $is_enabled() && 'default' === get_option( 'gravisain_maintenance_source', 'default' );
			},
		] ) );

		// 11. Accent Color.
		$wp_customize->add_setting( 'gravisain_maintenance_accent_color', [
			'type'              => 'option',
			'default'           => '#3b82f6',
			'sanitize_callback' => 'sanitize_hex_color',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( new \WP_Customize_Color_Control( $wp_customize, 'gravisain_maintenance_accent_color', [
			'label'           => __( 'Accent Color', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_accent_color',
			'active_callback' => function() use ( $is_enabled ) {
				return $is_enabled() && 'default' === get_option( 'gravisain_maintenance_source', 'default' );
			},
		] ) );

		// 12. Show Logo.
		$wp_customize->add_setting( 'gravisain_maintenance_show_logo', [
			'type'              => 'option',
			'default'           => true,
			'sanitize_callback' => [ $this, 'sanitize_checkbox' ],
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_maintenance_show_logo', [
			'label'           => __( 'Show Custom Logo', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_show_logo',
			'type'            => 'checkbox',
			'active_callback' => function() use ( $is_enabled ) {
				return $is_enabled() && 'default' === get_option( 'gravisain_maintenance_source', 'default' );
			},
		] );

		// 13. Enable Countdown.
		$wp_customize->add_setting( 'gravisain_maintenance_enable_countdown', [
			'type'              => 'option',
			'default'           => false,
			'sanitize_callback' => [ $this, 'sanitize_checkbox' ],
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_maintenance_enable_countdown', [
			'label'           => __( 'Enable Countdown Timer', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_enable_countdown',
			'type'            => 'checkbox',
			'active_callback' => function() use ( $is_enabled ) {
				return $is_enabled() && 'default' === get_option( 'gravisain_maintenance_source', 'default' );
			},
		] );

		// 14. Countdown Target Date.
		$wp_customize->add_setting( 'gravisain_maintenance_countdown_date', [
			'type'              => 'option',
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( new \WP_Customize_Date_Time_Control( $wp_customize, 'gravisain_maintenance_countdown_date', [
			'label'           => __( 'Countdown Target Date & Time', 'gravisain-blocks' ),
			'description'     => __( 'Select the target date and time when the website will be online (based on the site\'s timezone).', 'gravisain-blocks' ),
			'section'         => 'gravisain_maintenance_section',
			'settings'        => 'gravisain_maintenance_countdown_date',
			'include_time'    => true,
			'allow_past_date' => true, // Allow selecting past date for testing expiration if needed
			'active_callback' => function() use ( $is_enabled ) {
				return $is_enabled() && 'default' === get_option( 'gravisain_maintenance_source', 'default' ) && get_option( 'gravisain_maintenance_enable_countdown', false );
			},
		] ) );
	}

	/**
	 * Sanitize Boolean/Checkbox values.
	 *
	 * @param mixed $checked Input checked state.
	 * @return bool
	 */
	public function sanitize_checkbox( $checked ): bool {
		return ( ( isset( $checked ) && true === $checked ) ? true : false );
	}

	/**
	 * Intercept client requests on frontend to serve Maintenance Mode.
	 *
	 * @return void
	 */
	public function intercept_request(): void {
		// 1. Check if Maintenance Mode is enabled.
		if ( ! get_option( 'gravisain_maintenance_enabled', false ) ) {
			return;
		}

		// If countdown is enabled, check if the target date & time has already passed.
		// If it has passed, bypass maintenance mode to automatically open the site.
		if ( get_option( 'gravisain_maintenance_enable_countdown', false ) ) {
			$countdown_date = get_option( 'gravisain_maintenance_countdown_date', '' );
			if ( ! empty( $countdown_date ) ) {
				try {
					$date = new \DateTime( $countdown_date, wp_timezone() );
					$countdown_ts = $date->getTimestamp();
				} catch ( \Exception $e ) {
					$countdown_ts = strtotime( $countdown_date );
				}
				if ( $countdown_ts > 0 && time() >= $countdown_ts ) {
					return;
				}
			}
		}

		// 2. Bypass rules check.
		if ( is_admin() ) {
			return;
		}

		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			return;
		}

		if ( defined( 'DOING_CRON' ) && DOING_CRON ) {
			return;
		}

		if ( defined( 'XMLRPC_REQUEST' ) && XMLRPC_REQUEST ) {
			return;
		}

		if ( defined( 'WP_CLI' ) && WP_CLI ) {
			return;
		}

		// Bypass for WordPress Login page.
		if ( isset( $GLOBALS['pagenow'] ) && 'wp-login.php' === $GLOBALS['pagenow'] ) {
			return;
		}

		// Bypass for Customizer previewer.
		if ( is_customize_preview() ) {
			return;
		}

		// 3. User Capability Bypass check.
		$required_cap = get_option( 'gravisain_maintenance_bypass_role', 'manage_options' );
		if ( current_user_can( $required_cap ) ) {
			return;
		}

		// 4. Handle HTTP Status Code headers.
		$mode = get_option( 'gravisain_maintenance_mode', 'maintenance' );
		if ( 'maintenance' === $mode ) {
			// Send 503 status code with Retry-After header.
			status_header( 503 );
			header( 'Content-Type: text/html; charset=utf-8' );
			header( 'Retry-After: 86400' ); // 1 day
		} else {
			// Coming soon - send 200 status code to allow indexing.
			status_header( 200 );
			header( 'Content-Type: text/html; charset=utf-8' );
			header( 'Retry-After: 86400' );
		}

		// 5. Render Source Content.
		$source  = get_option( 'gravisain_maintenance_source', 'default' );
		$page_id = (int) get_option( 'gravisain_maintenance_page_id', 0 );

		if ( 'custom_page' === $source && $page_id > 0 ) {
			$this->render_custom_page( $page_id );
		} else {
			$this->render_default_template();
		}
		exit;
	}

	/**
	 * Override WP Query and load the designated WordPress custom page template.
	 *
	 * @param int $page_id WordPress page ID.
	 * @return void
	 */
	private function render_custom_page( int $page_id ): void {
		// Prevent infinite loops if page is somehow inaccessible.
		if ( ! get_post( $page_id ) ) {
			$this->render_default_template();
			return;
		}

		// Set global WP Query to our custom page ID.
		$GLOBALS['wp_query'] = new \WP_Query( [ 'page_id' => $page_id ] );
		
		// Set headers to prevent browser cache of maintenance state.
		nocache_headers();

		// Load template.
		$template = locate_template( [ 'page.php', 'single.php', 'index.php' ] );
		if ( $template ) {
			include $template;
		} else {
			// Fallback if no templates found.
			$this->render_default_template();
		}
	}

	/**
	 * Render the premium fallback layout page.
	 *
	 * @return void
	 */
	private function render_default_template(): void {
		$headline = get_option( 'gravisain_maintenance_headline', __( 'Under Maintenance', 'gravisain-blocks' ) );
		$message  = get_option( 'gravisain_maintenance_message', __( 'We are currently updating our website to bring you a better experience. Please check back soon!', 'gravisain-blocks' ) );
		$bg_color = get_option( 'gravisain_maintenance_bg_color', '#0f172a' );
		$text_color   = get_option( 'gravisain_maintenance_text_color', '#f8fafc' );
		$accent_color = get_option( 'gravisain_maintenance_accent_color', '#3b82f6' );
		
		$show_logo = get_option( 'gravisain_maintenance_show_logo', true );
		$logo_url  = '';
		if ( $show_logo && function_exists( 'has_custom_logo' ) && has_custom_logo() ) {
			$custom_logo_id = get_theme_mod( 'custom_logo' );
			$logo_data      = wp_get_attachment_image_src( $custom_logo_id, 'full' );
			if ( $logo_data ) {
				$logo_url = $logo_data[0];
			}
		}

		$show_countdown = get_option( 'gravisain_maintenance_enable_countdown', false );
		$countdown_date = get_option( 'gravisain_maintenance_countdown_date', '' );
		$countdown_ts   = 0;
		if ( $show_countdown && ! empty( $countdown_date ) ) {
			try {
				$date = new \DateTime( $countdown_date, wp_timezone() );
				$countdown_ts = $date->getTimestamp();
			} catch ( \Exception $e ) {
				$countdown_ts = strtotime( $countdown_date );
				if ( false === $countdown_ts ) {
					$countdown_ts = 0;
				}
			}
		}

		$css = "
			:root {
				--bg-color: " . esc_html( $bg_color ) . ";
				--text-color: " . esc_html( $text_color ) . ";
				--accent-color: " . esc_html( $accent_color ) . ";
				--glass-bg: rgba(255, 255, 255, 0.03);
				--glass-border: rgba(255, 255, 255, 0.08);
			}
			* {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}
			body {
				font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;
				background: var(--bg-color);
				color: var(--text-color);
				min-height: 100vh;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 20px;
				overflow-x: hidden;
				position: relative;
			}
			body::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 80%);
				z-index: 1;
				pointer-events: none;
			}
			.container {
				max-width: 600px;
				width: 100%;
				text-align: center;
				z-index: 2;
				background: var(--glass-bg);
				border: 1px solid var(--glass-border);
				padding: 50px 40px;
				border-radius: 20px;
				backdrop-filter: blur(12px);
				-webkit-backdrop-filter: blur(12px);
				box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
				animation: fadeIn 0.8s ease-out;
			}
			.logo-wrapper {
				margin-bottom: 30px;
			}
			.logo {
				max-height: 80px;
				width: auto;
				object-fit: contain;
			}
			.site-title {
				font-size: 24px;
				font-weight: 700;
				letter-spacing: -0.5px;
				opacity: 0.9;
			}
			h1 {
				font-size: 38px;
				font-weight: 800;
				line-height: 1.2;
				margin-bottom: 20px;
				letter-spacing: -1px;
				background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.message {
				font-size: 16px;
				line-height: 1.6;
				opacity: 0.8;
				margin-bottom: 40px;
				font-weight: 400;
			}
			.countdown {
				display: flex;
				justify-content: center;
				gap: 15px;
				margin-bottom: 40px;
			}
			.countdown-item {
				background: rgba(255, 255, 255, 0.05);
				border: 1px solid var(--glass-border);
				padding: 15px;
				border-radius: 12px;
				min-width: 80px;
				backdrop-filter: blur(5px);
			}
			.countdown-value {
				font-size: 28px;
				font-weight: 700;
				color: var(--accent-color);
				display: block;
				margin-bottom: 4px;
			}
			.countdown-label {
				font-size: 11px;
				text-transform: uppercase;
				letter-spacing: 1px;
				opacity: 0.6;
				font-weight: 600;
			}
			.indicator {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 60px;
				height: 60px;
				border-radius: 50%;
				background: rgba(59, 130, 246, 0.1);
				border: 1px solid rgba(59, 130, 246, 0.2);
				color: var(--accent-color);
				margin-bottom: 30px;
				position: relative;
			}
			.indicator::before {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background: var(--accent-color);
				opacity: 0.1;
				animation: pulse 2s infinite;
			}
			.indicator svg {
				width: 28px;
				height: 28px;
				animation: rotate 8s linear infinite;
			}
			@keyframes fadeIn {
				from { opacity: 0; transform: translateY(20px); }
				to { opacity: 1; transform: translateY(0); }
			}
			@keyframes pulse {
				0% { transform: scale(1); opacity: 0.3; }
				100% { transform: scale(1.6); opacity: 0; }
			}
			@keyframes rotate {
				from { transform: rotate(0deg); }
				to { transform: rotate(360deg); }
			}
			@media(max-width: 500px) {
				.container {
					padding: 40px 20px;
				}
				h1 {
					font-size: 28px;
				}
				.countdown {
					gap: 8px;
				}
				.countdown-item {
					min-width: 65px;
					padding: 10px;
				}
				.countdown-value {
					font-size: 20px;
				}
			}
		";
		wp_register_style( 'gravisain-maintenance-style', false, [], defined( 'GRAVISAIN_BLOCKS_VERSION' ) ? GRAVISAIN_BLOCKS_VERSION : '1.0.0' );
		wp_enqueue_style( 'gravisain-maintenance-style' );
		wp_add_inline_style( 'gravisain-maintenance-style', $css );

		// Premium layout HTML.
		?>
		<!DOCTYPE html>
		<html <?php language_attributes(); ?>>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title><?php echo esc_html( $headline ); ?></title>
			<?php wp_print_styles( 'gravisain-maintenance-style' ); ?>
		</head>
		<body>
			<div class="container">
				<?php if ( ! empty( $logo_url ) ) : ?>
					<div class="logo-wrapper">
						<img src="<?php echo esc_url( $logo_url ); ?>" alt="<?php bloginfo( 'name' ); ?>" class="logo">
					</div>
				<?php else : ?>
					<div class="logo-wrapper">
						<span class="site-title"><?php bloginfo( 'name' ); ?></span>
					</div>
				<?php endif; ?>

				<?php if ( ! $show_countdown ) : ?>
					<div class="indicator">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="3"></circle>
							<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
						</svg>
					</div>
				<?php endif; ?>

				<h1><?php echo esc_html( $headline ); ?></h1>
				
				<p class="message"><?php echo esc_html( $message ); ?></p>

				<?php if ( $show_countdown && $countdown_ts > 0 ) : ?>
					<div class="countdown" id="countdown-timer">
						<div class="countdown-item">
							<span class="countdown-value" id="days">00</span>
							<span class="countdown-label"><?php esc_html_e( 'Days', 'gravisain-blocks' ); ?></span>
						</div>
						<div class="countdown-item">
							<span class="countdown-value" id="hours">00</span>
							<span class="countdown-label"><?php esc_html_e( 'Hours', 'gravisain-blocks' ); ?></span>
						</div>
						<div class="countdown-item">
							<span class="countdown-value" id="minutes">00</span>
							<span class="countdown-label"><?php esc_html_e( 'Mins', 'gravisain-blocks' ); ?></span>
						</div>
						<div class="countdown-item">
							<span class="countdown-value" id="seconds">00</span>
							<span class="countdown-label"><?php esc_html_e( 'Secs', 'gravisain-blocks' ); ?></span>
						</div>
					</div>

					<?php
					$js = "
						document.addEventListener('DOMContentLoaded', function() {
							const targetDate = " . (int) $countdown_ts . " * 1000;
							
							function updateCountdown() {
								const now = new Date().getTime();
								const difference = targetDate - now;

								if (difference <= 0) {
									document.getElementById('days').innerText = '00';
									document.getElementById('hours').innerText = '00';
									document.getElementById('minutes').innerText = '00';
									document.getElementById('seconds').innerText = '00';
									return;
								}

								const days = Math.floor(difference / (1000 * 60 * 60 * 24));
								const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
								const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
								const seconds = Math.floor((difference % (1000 * 60)) / 1000);

								document.getElementById('days').innerText = String(days).padStart(2, '0');
								document.getElementById('hours').innerText = String(hours).padStart(2, '0');
								document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
								document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
							}

							updateCountdown();
							setInterval(updateCountdown, 1000);
						});
					";
					wp_register_script( 'gravisain-maintenance-countdown', false, [], defined( 'GRAVISAIN_BLOCKS_VERSION' ) ? GRAVISAIN_BLOCKS_VERSION : '1.0.0', true );
					wp_enqueue_script( 'gravisain-maintenance-countdown' );
					wp_add_inline_script( 'gravisain-maintenance-countdown', $js );
					wp_print_scripts( 'gravisain-maintenance-countdown' );
					?>
				<?php endif; ?>
			</div>
		</body>
		</html>
		<?php
	}
}
// Initialize
Maintenance::get_instance();
