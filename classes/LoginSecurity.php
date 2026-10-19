<?php
/**
 * Login Security & Cloudflare Turnstile Manager
 *
 * Implements Cloudflare Turnstile, honeypot bot trap, time-trap analysis,
 * local rate limiting, and an intelligent fail-open anti-lockout architecture.
 *
 * @package Gravisain\Blocks
 */

declare(strict_types=1);

namespace Gravisain\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * LoginSecurity Class
 */
class LoginSecurity {

	/**
	 * Singleton instance.
	 *
	 * @var LoginSecurity|null
	 */
	private static ?LoginSecurity $instance = null;

	/**
	 * Cloudflare Turnstile verify endpoint.
	 *
	 * @var string
	 */
	// phpcs:ignore PluginCheck.CodeAnalysis.Offloading.OffloadedContent -- Official Cloudflare Turnstile verification API.
	private const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

	/**
	 * Cloudflare Turnstile JavaScript API script URL.
	 *
	 * @var string
	 */
	// phpcs:ignore PluginCheck.CodeAnalysis.Offloading.OffloadedContent -- Official Cloudflare Turnstile script URL.
	private const TURNSTILE_API_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

	/**
	 * Get singleton instance.
	 *
	 * @return LoginSecurity
	 */
	public static function get_instance(): LoginSecurity {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Customizer integration.
		add_action( 'customize_register', [ $this, 'register_settings' ], 25 );

		// Admin Settings Submenu & Registration.
		add_action( 'admin_menu', [ $this, 'register_admin_menu' ], 30 );
		add_action( 'admin_init', [ $this, 'register_admin_settings' ] );

		// WordPress Login Hooks.
		add_action( 'login_enqueue_scripts', [ $this, 'enqueue_login_scripts' ] );
		add_action( 'login_form', [ $this, 'render_login_widget' ] );

		// Core Authentication Filter (Priority 30 to intercept before password hashing).
		add_filter( 'authenticate', [ $this, 'filter_authenticate' ], 30, 3 );

		// Track successful login to reset local rate limit counter.
		add_action( 'wp_login', [ $this, 'on_successful_login' ], 10, 2 );

		// Track failed login attempts.
		add_action( 'wp_login_failed', [ $this, 'on_failed_login' ], 10, 1 );

		// Optional graceful logout redirect filter.
		add_filter( 'logout_redirect', [ $this, 'filter_logout_redirect' ], 10, 3 );

		// Redirect direct visits to wp-login.php to Homepage.
		add_action( 'login_init', [ $this, 'redirect_direct_login' ], 1 );
	}

	/**
	 * Check if Login Security & Turnstile is active.
	 *
	 * @return bool
	 */
	public function is_enabled(): bool {
		// 1. Emergency constant kill-switch (in wp-config.php).
		if ( defined( 'GRAVISAIN_TURNSTILE_DISABLE' ) && GRAVISAIN_TURNSTILE_DISABLE ) {
			return false;
		}

		// 2. Setting toggle check.
		$enabled = (bool) get_option( 'gravisain_turnstile_enabled', false );
		if ( ! $enabled ) {
			return false;
		}

		// 3. Failsafe: Never enable if keys are empty (prevents accidental lockout).
		$site_key   = $this->get_site_key();
		$secret_key = $this->get_secret_key();
		if ( empty( $site_key ) || empty( $secret_key ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Get Cloudflare Turnstile Site Key.
	 *
	 * @return string
	 */
	public function get_site_key(): string {
		if ( defined( 'GRAVISAIN_TURNSTILE_SITE_KEY' ) && ! empty( GRAVISAIN_TURNSTILE_SITE_KEY ) ) {
			return (string) GRAVISAIN_TURNSTILE_SITE_KEY;
		}

		$key = get_option( 'gravisain_turnstile_site_key', '' );
		return is_string( $key ) ? trim( $key ) : '';
	}

	/**
	 * Get Cloudflare Turnstile Secret Key.
	 *
	 * @return string
	 */
	public function get_secret_key(): string {
		if ( defined( 'GRAVISAIN_TURNSTILE_SECRET_KEY' ) && ! empty( GRAVISAIN_TURNSTILE_SECRET_KEY ) ) {
			return (string) GRAVISAIN_TURNSTILE_SECRET_KEY;
		}

		$key = get_option( 'gravisain_turnstile_secret_key', '' );
		return is_string( $key ) ? trim( $key ) : '';
	}

	/**
	 * Get Theme Appearance (auto / light / dark).
	 *
	 * @return string
	 */
	public function get_widget_theme(): string {
		$theme = get_option( 'gravisain_turnstile_theme', 'auto' );
		return in_array( $theme, [ 'auto', 'light', 'dark' ], true ) ? $theme : 'auto';
	}

	/**
	 * Get Fallback Mode on Cloudflare API Outage.
	 *
	 * @return string 'fail_open' or 'strict'
	 */
	public function get_fail_mode(): string {
		$mode = get_option( 'gravisain_turnstile_fail_mode', 'fail_open' );
		return 'strict' === $mode ? 'strict' : 'fail_open';
	}

	/**
	 * Get Emergency Bypass Secret Key.
	 *
	 * @return string
	 */
	public function get_bypass_key(): string {
		if ( defined( 'GRAVISAIN_TURNSTILE_BYPASS_KEY' ) && ! empty( GRAVISAIN_TURNSTILE_BYPASS_KEY ) ) {
			return (string) GRAVISAIN_TURNSTILE_BYPASS_KEY;
		}

		$key = get_option( 'gravisain_turnstile_bypass_key', '' );
		return is_string( $key ) ? trim( $key ) : '';
	}

	/**
	 * Check if the current request has triggered an authorized emergency bypass.
	 *
	 * @return bool
	 */
	public function is_emergency_bypassed(): bool {
		$secret_bypass = $this->get_bypass_key();
		if ( empty( $secret_bypass ) ) {
			return false;
		}

		$submitted_key = '';
		if ( isset( $_GET['gravisain_bypass'] ) && is_string( $_GET['gravisain_bypass'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$submitted_key = sanitize_text_field( wp_unslash( $_GET['gravisain_bypass'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		} elseif ( isset( $_POST['gravisain_bypass'] ) && is_string( $_POST['gravisain_bypass'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$submitted_key = sanitize_text_field( wp_unslash( $_POST['gravisain_bypass'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		}

		if ( empty( $submitted_key ) ) {
			return false;
		}

		// Constant-time hash comparison to prevent timing attacks.
		return hash_equals( $secret_bypass, $submitted_key );
	}

	/**
	 * Get sanitized client IP address.
	 *
	 * @return string
	 */
	public function get_client_ip(): string {
		$ip = '';

		if ( ! empty( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['HTTP_CF_CONNECTING_IP'] ) );
		} elseif ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
			$list = explode( ',', sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) );
			$ip   = trim( $list[0] );
		} elseif ( ! empty( $_SERVER['REMOTE_ADDR'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) );
		}

		if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
			return $ip;
		}

		return '127.0.0.1';
	}

	/**
	 * Enqueue Cloudflare Turnstile script on wp-login.php.
	 *
	 * @return void
	 */
	public function enqueue_login_scripts(): void {
		if ( ! $this->is_enabled() ) {
			return;
		}

		if ( $this->is_emergency_bypassed() ) {
			return;
		}

		// phpcs:disable PluginCheck.CodeAnalysis.EnqueuedResourceOffloading.OffloadedContent, PluginCheck.CodeAnalysis.Offloading.OffloadedContent
		wp_enqueue_script(
			'cloudflare-turnstile',
			self::TURNSTILE_API_URL,
			[],
			GRAVISAIN_BLOCKS_VERSION,
			true
		);
		// phpcs:enable PluginCheck.CodeAnalysis.EnqueuedResourceOffloading.OffloadedContent, PluginCheck.CodeAnalysis.Offloading.OffloadedContent

		// Register and inject login Turnstile styles cleanly.
		wp_register_style( 'gravisain-turnstile-login', false, [], GRAVISAIN_BLOCKS_VERSION );
		wp_enqueue_style( 'gravisain-turnstile-login' );
		$login_css = '
			body.login div#login {
				width: 350px !important;
				max-width: 90%;
			}
			body.login div#login form#loginform {
				padding: 26px 24px 34px;
			}
			#loginform .gravisain-turnstile-wrapper {
				clear: both;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				min-height: 65px;
				margin: 16px 0 20px 0 !important;
				box-sizing: border-box;
			}
			#loginform .gravisain-turnstile-wrapper .cf-turnstile,
			#loginform .gravisain-turnstile-wrapper iframe {
				width: 100% !important;
				max-width: 100% !important;
				margin: 0 auto !important;
				border-radius: 4px;
				display: block;
			}
			.login #login_error {
				border-left-color: #ef4444 !important;
			}
		';
		wp_add_inline_style( 'gravisain-turnstile-login', $login_css );

		// Register and inject login Turnstile JavaScript handler cleanly.
		$site_key = $this->get_site_key();
		$theme    = $this->get_widget_theme();
		$login_js = "
			document.addEventListener('DOMContentLoaded', function() {
				if (typeof turnstile !== 'undefined' && document.getElementById('gravisain-turnstile-target')) {
					try {
						turnstile.render('#gravisain-turnstile-target', {
							sitekey: '" . esc_js( $site_key ) . "',
							theme: '" . esc_js( $theme ) . "',
							size: 'flexible'
						});
					} catch(e) {}
				}
			});
		";
		wp_add_inline_script( 'cloudflare-turnstile', $login_js );
	}

	/**
	 * Render Turnstile widget and security honeypots into the login form.
	 *
	 * @return void
	 */
	public function render_login_widget(): void {
		if ( ! $this->is_enabled() ) {
			return;
		}

		if ( $this->is_emergency_bypassed() ) {
			echo '<div style="margin-bottom:16px;padding:8px 12px;background:#fef3c7;border:1px solid #f59e0b;color:#92400e;border-radius:4px;font-size:12px;">'
				. esc_html__( '⚠️ Emergency Bypass Active: Turnstile verification skipped.', 'gravisain-blocks' )
				. '</div>';
			return;
		}

		$site_key   = $this->get_site_key();
		$theme      = $this->get_widget_theme();
		$time_token = $this->generate_time_token();

		?>
		<!-- Gravisain Turnstile Widget Container -->
		<div class="gravisain-turnstile-wrapper">
			<div id="gravisain-turnstile-target" class="cf-turnstile" data-sitekey="<?php echo esc_attr( $site_key ); ?>" data-theme="<?php echo esc_attr( $theme ); ?>" data-size="flexible"></div>
		</div>

		<!-- Hidden Honeypot Field (Invisible to humans, triggers bot rejection) -->
		<div style="position: absolute !important; left: -9999px !important; top: -9999px !important; opacity: 0 !important; width: 1px !important; height: 1px !important; pointer-events: none !important;" aria-hidden="true">
			<label for="gravisain_ls_verification_token"><?php esc_html_e( 'Do not fill this field', 'gravisain-blocks' ); ?></label>
			<input type="text" id="gravisain_ls_verification_token" name="gravisain_ls_verification_token" value="" tabindex="-1" autocomplete="off" />
		</div>

		<!-- Hidden Time-Trap Token (Verifies human interaction duration) -->
		<input type="hidden" name="gravisain_ls_time_token" value="<?php echo esc_attr( $time_token ); ?>" />

		<?php
		// Preserve emergency bypass query in form if present.
		if ( isset( $_GET['gravisain_bypass'] ) && is_string( $_GET['gravisain_bypass'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			echo '<input type="hidden" name="gravisain_bypass" value="' . esc_attr( sanitize_text_field( wp_unslash( $_GET['gravisain_bypass'] ) ) ) . '" />'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		}
	}

	/**
	 * Output styling and client-side fallback handler in login footer (no-op, enqueued via login_enqueue_scripts).
	 *
	 * @return void
	 */
	public function render_login_footer(): void {
		// Handled via wp_add_inline_style and wp_add_inline_script in enqueue_login_scripts().
	}

	/**
	 * Filter authenticate hook (Priority 30).
	 *
	 * @param \WP_User|\WP_Error|null $user     Authenticated user object or error.
	 * @param string                  $username Username or email.
	 * @param string                  $password Password.
	 * @return \WP_User|\WP_Error
	 */
	public function filter_authenticate( $user, string $username, string $password ) {
		// Only intercept POST form login requests on wp-login.php.
		$request_method = isset( $_SERVER['REQUEST_METHOD'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_METHOD'] ) ) : '';
		if ( 'POST' !== $request_method ) {
			return $user;
		}

		// Don't intercept REST API, XML-RPC, or WP-CLI requests.
		if ( ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ||
			( defined( 'XMLRPC_REQUEST' ) && XMLRPC_REQUEST ) ||
			( defined( 'WP_CLI' ) && WP_CLI ) ) {
			return $user;
		}

		// If feature is disabled, pass through.
		if ( ! $this->is_enabled() ) {
			return $user;
		}

		// If emergency bypass key is valid, skip all checks.
		if ( $this->is_emergency_bypassed() ) {
			return $user;
		}

		$client_ip = $this->get_client_ip();

		// 1. Check Local Rate Limiting.
		if ( $this->is_ip_rate_limited( $client_ip ) ) {
			return new \WP_Error(
				'gravisain_rate_limited',
				'<strong>' . esc_html__( 'Security Alert:', 'gravisain-blocks' ) . '</strong> ' .
				esc_html__( 'Too many failed login attempts from your IP address. Please wait 15 minutes before trying again.', 'gravisain-blocks' )
			);
		}

		// 2. Check Invisible Honeypot (Instant bot detection).
		if ( ! empty( $_POST['gravisain_ls_verification_token'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$this->record_failed_attempt( $client_ip );
			return new \WP_Error(
				'gravisain_bot_detected',
				'<strong>' . esc_html__( 'Security Alert:', 'gravisain-blocks' ) . '</strong> ' .
				esc_html__( 'Automated bot activity detected. Login request rejected.', 'gravisain-blocks' )
			);
		}

		// 3. Check Time-Trap (Humans take > 1.2 seconds to submit).
		$time_token = isset( $_POST['gravisain_ls_time_token'] ) ? sanitize_text_field( wp_unslash( $_POST['gravisain_ls_time_token'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( ! $this->verify_time_token( $time_token, $client_ip ) ) {
			$this->record_failed_attempt( $client_ip );
			return new \WP_Error(
				'gravisain_time_trap',
				'<strong>' . esc_html__( 'Security Alert:', 'gravisain-blocks' ) . '</strong> ' .
				esc_html__( 'Form submitted too rapidly or security session expired. Please try again.', 'gravisain-blocks' )
			);
		}

		// 4. Verify Cloudflare Turnstile Token.
		$cf_token = isset( $_POST['cf-turnstile-response'] ) ? sanitize_text_field( wp_unslash( $_POST['cf-turnstile-response'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing

		if ( empty( $cf_token ) ) {
			// If token is missing, check if Cloudflare is down and fail-open is enabled.
			$fail_mode = $this->get_fail_mode();
			if ( 'fail_open' === $fail_mode ) {
				// Verify if server can reach Cloudflare; if unreachable, permit graceful fallback.
				if ( $this->is_cloudflare_unreachable() ) {
					$this->notify_admin_of_outage( $username, $client_ip, 'Missing token during confirmed Cloudflare API outage' );
					return $user; // Allow normal password authentication!
				}
			}

			return new \WP_Error(
				'gravisain_turnstile_missing',
				'<strong>' . esc_html__( 'Security Challenge Required:', 'gravisain-blocks' ) . '</strong> ' .
				esc_html__( 'Please complete the Cloudflare security verification before logging in.', 'gravisain-blocks' )
			);
		}

		// Perform server-to-server verification with Cloudflare.
		$verification = $this->verify_turnstile_with_cloudflare( $cf_token, $client_ip );

		if ( 'success' === $verification ) {
			// Turnstile verified successfully.
			return $user;
		}

		if ( 'outage' === $verification ) {
			$fail_mode = $this->get_fail_mode();
			if ( 'fail_open' === $fail_mode ) {
				// Cloudflare is down / network failure: allow user to proceed with password check!
				$this->notify_admin_of_outage( $username, $client_ip, 'Cloudflare Turnstile API unreachable or returning HTTP 5xx' );
				return $user;
			}

			// Strict mode: block login.
			return new \WP_Error(
				'gravisain_turnstile_outage',
				'<strong>' . esc_html__( 'Security Error:', 'gravisain-blocks' ) . '</strong> ' .
				esc_html__( 'Cloudflare security service is currently unreachable. Please try again later or contact your administrator.', 'gravisain-blocks' )
			);
		}

		// Turnstile rejected the user (invalid token / bot).
		$this->record_failed_attempt( $client_ip );
		return new \WP_Error(
			'gravisain_turnstile_failed',
			'<strong>' . esc_html__( 'Security Verification Failed:', 'gravisain-blocks' ) . '</strong> ' .
			esc_html__( 'Cloudflare verification failed. Please try again.', 'gravisain-blocks' )
		);
	}

	/**
	 * Verify response token with Cloudflare Turnstile API.
	 *
	 * @param string $token     Turnstile token.
	 * @param string $client_ip Client IP address.
	 * @return string 'success', 'failed', or 'outage'
	 */
	private function verify_turnstile_with_cloudflare( string $token, string $client_ip ): string {
		$secret_key = $this->get_secret_key();

		$response = wp_remote_post(
			self::TURNSTILE_VERIFY_URL,
			[
				'timeout'   => 4, // Max 4 seconds timeout to ensure login is responsive.
				'sslverify' => true,
				'body'      => [
					'secret'   => $secret_key,
					'response' => $token,
					'remoteip' => $client_ip,
				],
			]
		);

		// Handle network errors, cURL timeouts, DNS failures, or Cloudflare HTTP 500+ outages.
		if ( is_wp_error( $response ) ) {
			error_log( '[Gravisain Security] Turnstile network error: ' . $response->get_error_message() ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			return 'outage';
		}

		$status_code = wp_remote_retrieve_response_code( $response );
		if ( $status_code >= 500 || $status_code === 0 ) {
			error_log( '[Gravisain Security] Turnstile HTTP server error: ' . $status_code ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			return 'outage';
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		if ( ! is_array( $data ) ) {
			return 'outage';
		}

		if ( ! empty( $data['success'] ) && true === $data['success'] ) {
			return 'success';
		}

		return 'failed';
	}

	/**
	 * Test if Cloudflare API is currently unreachable.
	 *
	 * @return bool
	 */
	private function is_cloudflare_unreachable(): bool {
		$test = wp_remote_get(
			self::TURNSTILE_VERIFY_URL,
			[
				'timeout'   => 2,
				'sslverify' => true,
			]
		);

		return is_wp_error( $test ) || wp_remote_retrieve_response_code( $test ) >= 500;
	}

	/**
	 * Send an email notification to admin when Fail-Open fallback occurs.
	 *
	 * @param string $username Username attempted.
	 * @param string $ip       Client IP address.
	 * @param string $reason   Reason for fallback.
	 * @return void
	 */
	private function notify_admin_of_outage( string $username, string $ip, string $reason ): void {
		$should_notify = (bool) get_option( 'gravisain_turnstile_notify_admin', false );
		if ( ! $should_notify ) {
			return;
		}

		// Avoid sending more than 1 email per 30 minutes to prevent mailbox flooding.
		$transient_key = 'gravisain_cf_outage_alert_' . md5( $ip );
		if ( get_transient( $transient_key ) ) {
			return;
		}
		set_transient( $transient_key, true, 30 * MINUTE_IN_SECONDS );

		$admin_email = get_option( 'admin_email' );
		$subject     = sprintf( '[%s] Security Fallback Active: Cloudflare Outage Detected', get_bloginfo( 'name' ) );
		$message     = sprintf(
			"Halo Admin,\n\nSistem Gravisain Security mendeteksi bahwa API Cloudflare Turnstile sedang tidak dapat dihubungi (%s).\n\nUntuk mencegah administrator terkunci di luar website (Anti-Lockout Fail-Open), autentikasi login dialihkan ke verifikasi keamanan lokal.\n\nDetail Login:\n- Akun: %s\n- Alamat IP: %s\n- Waktu: %s\n\nJika ini adalah Anda, Anda dapat mengabaikan email ini. Jika mencurigakan, periksa log keamanan website Anda.\n\nSalam,\nGravisain Security Engine",
			$reason,
			$username,
			$ip,
			current_time( 'mysql' )
		);

		wp_mail( $admin_email, $subject, $message );
	}

	/**
	 * Generate an encrypted time-trap token.
	 *
	 * @return string
	 */
	private function generate_time_token(): string {
		$time = time();
		$ip   = $this->get_client_ip();
		$hash = wp_hash( 'gravisain_time_' . $time . '_' . $ip, 'nonce' );
		return base64_encode( $time . '|' . $hash );
	}

	/**
	 * Verify the encrypted time-trap token.
	 *
	 * @param string $token     Encoded token.
	 * @param string $client_ip Client IP.
	 * @return bool
	 */
	private function verify_time_token( string $token, string $client_ip ): bool {
		if ( empty( $token ) ) {
			return false;
		}

		$decoded = base64_decode( $token, true );
		if ( false === $decoded || false === strpos( $decoded, '|' ) ) {
			return false;
		}

		[ $timestamp_str, $hash ] = explode( '|', $decoded, 2 );
		$timestamp = (int) $timestamp_str;

		// Verify hash integrity with constant-time check.
		$expected_hash = wp_hash( 'gravisain_time_' . $timestamp . '_' . $client_ip, 'nonce' );
		if ( ! hash_equals( $expected_hash, $hash ) ) {
			return false;
		}

		$elapsed = time() - $timestamp;

		// Reject if submitted in less than 1.2 seconds (typical headless bot speed).
		if ( $elapsed < 1 ) {
			return false;
		}

		// Reject if form is older than 2 hours (stale or replay attack).
		if ( $elapsed > 7200 ) {
			return false;
		}

		return true;
	}

	/**
	 * Check if an IP address is currently rate-limited.
	 *
	 * @param string $ip Client IP.
	 * @return bool
	 */
	private function is_ip_rate_limited( string $ip ): bool {
		$lockout_key = 'gravisain_login_lockout_' . md5( $ip );
		return (bool) get_transient( $lockout_key );
	}

	/**
	 * Record a failed attempt and throttle if needed.
	 *
	 * @param string $ip Client IP.
	 * @return void
	 */
	private function record_failed_attempt( string $ip ): void {
		$attempts_key = 'gravisain_login_attempts_' . md5( $ip );
		$lockout_key  = 'gravisain_login_lockout_' . md5( $ip );

		$attempts = (int) get_transient( $attempts_key );
		$attempts++;

		if ( $attempts >= 5 ) {
			// Lock out IP for 15 minutes.
			set_transient( $lockout_key, true, 15 * MINUTE_IN_SECONDS );
			delete_transient( $attempts_key );
		} else {
			set_transient( $attempts_key, $attempts, 15 * MINUTE_IN_SECONDS );
		}
	}

	/**
	 * Reset rate-limit counters upon successful login.
	 *
	 * @param string   $user_login Username.
	 * @param \WP_User $user       User object.
	 * @return void
	 */
	public function on_successful_login( string $user_login, \WP_User $user ): void {
		$client_ip = $this->get_client_ip();
		delete_transient( 'gravisain_login_attempts_' . md5( $client_ip ) );
		delete_transient( 'gravisain_login_lockout_' . md5( $client_ip ) );
	}

	/**
	 * Hook on wp_login_failed to increment failed counter.
	 *
	 * @param string $username Username attempted.
	 * @return void
	 */
	public function on_failed_login( string $username ): void {
		$client_ip = $this->get_client_ip();
		$this->record_failed_attempt( $client_ip );
	}

	/**
	 * Filter logout redirect URL gracefully without abrupt script termination.
	 *
	 * @param string                $redirect_to           Default redirect URL (wp-login.php?loggedout=true).
	 * @param string                $requested_redirect_to User-requested redirect URL via $_REQUEST['redirect_to'].
	 * @param \WP_User|\WP_Error    $user                  User logging out.
	 * @return string Redirect destination URL.
	 */
	public function filter_logout_redirect( string $redirect_to, string $requested_redirect_to, $user ): string {
		// 1. Feature must be explicitly enabled by admin (opt-in, default false).
		$redirect_enabled = (bool) get_option( 'gravisain_turnstile_logout_redirect', false );
		if ( ! $redirect_enabled ) {
			return $redirect_to;
		}

		// 2. Respect explicit redirect_to requested by other plugins/forms.
		if ( ! empty( $requested_redirect_to ) ) {
			return $redirect_to;
		}

		// 3. Gracefully return homepage URL without calling exit;.
		return home_url( '/' );
	}

	/**
	 * Redirect direct visits to wp-login.php to Homepage to prevent 404 or brute force probes.
	 *
	 * @return void
	 */
	public function redirect_direct_login(): void {
		$redirect_enabled = (bool) get_option( 'gravisain_turnstile_direct_login_redirect', false );
		if ( ! $redirect_enabled ) {
			return;
		}

		// Don't intercept POST requests (e.g. form submissions, password checks).
		$request_method = isset( $_SERVER['REQUEST_METHOD'] ) ? strtoupper( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_METHOD'] ) ) ) : 'GET';
		if ( 'POST' === $request_method ) {
			return;
		}

		// Don't intercept logout flow or post-password submissions.
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$action = isset( $_GET['action'] ) ? sanitize_key( wp_unslash( $_GET['action'] ) ) : '';
		if ( in_array( $action, [ 'logout', 'postpass' ], true ) ) {
			return;
		}

		// Allow access if authorized Emergency Bypass Key is present.
		if ( $this->is_emergency_bypassed() ) {
			return;
		}

		// Don't intercept requests containing custom secret query tokens (e.g. ?vIdEZ5Tc2y0LCIG8uA2UHOIL7OxX21Bnkv5iTaxx).
		// Standard WordPress login parameters should still be redirected, but custom secret keys must be permitted!
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$request_keys  = array_keys( $_GET );
		$standard_keys = [ 'action', 'redirect_to', 'reauth', 'interim-login', 'wp_lang', 'loggedout', 'checkemail', 'error' ];
		$custom_keys   = array_diff( $request_keys, $standard_keys );
		if ( ! empty( $custom_keys ) ) {
			return;
		}

		// If user is already logged in, send them to admin dashboard.
		if ( is_user_logged_in() ) {
			wp_safe_redirect( admin_url() );
			exit;
		}

		// Redirect direct visitors / bots to homepage.
		wp_safe_redirect( home_url( '/' ) );
		exit;
	}

	/**
	 * Register Customizer Settings and Controls.
	 *
	 * @param \WP_Customize_Manager $wp_customize Customizer manager.
	 * @return void
	 */
	public function register_settings( $wp_customize ): void {
		$section_args = [
			'title'       => __( 'Login Security & Turnstile', 'gravisain-blocks' ),
			'description' => __( 'Protect your WordPress login form against bot attacks, brute-force, and credential stuffing using Cloudflare Turnstile.', 'gravisain-blocks' ),
			'priority'    => 85,
		];

		if ( $wp_customize->get_panel( 'gravisain_options' ) ) {
			$section_args['panel'] = 'gravisain_options';
		}

		$wp_customize->add_section( 'gravisain_turnstile_section', $section_args );

		// 1. Enable Toggle.
		$wp_customize->add_setting( 'gravisain_turnstile_enabled', [
			'type'              => 'option',
			'default'           => false,
			'sanitize_callback' => [ $this, 'sanitize_checkbox' ],
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_turnstile_enabled', [
			'label'       => __( 'Enable Turnstile Protection', 'gravisain-blocks' ),
			'description' => __( 'Turn on Cloudflare Turnstile protection on the login page.', 'gravisain-blocks' ),
			'section'     => 'gravisain_turnstile_section',
			'settings'    => 'gravisain_turnstile_enabled',
			'type'        => 'checkbox',
		] );

		$is_enabled = function() {
			return (bool) get_option( 'gravisain_turnstile_enabled', false );
		};

		// 2. Site Key.
		$wp_customize->add_setting( 'gravisain_turnstile_site_key', [
			'type'              => 'option',
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_turnstile_site_key', [
			'label'           => __( 'Cloudflare Site Key', 'gravisain-blocks' ),
			'description'     => __( 'Obtain this key from your Cloudflare Dashboard under Turnstile.', 'gravisain-blocks' ),
			'section'         => 'gravisain_turnstile_section',
			'settings'        => 'gravisain_turnstile_site_key',
			'type'            => 'text',
			'active_callback' => $is_enabled,
		] );

		// 3. Secret Key.
		$wp_customize->add_setting( 'gravisain_turnstile_secret_key', [
			'type'              => 'option',
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_turnstile_secret_key', [
			'label'           => __( 'Cloudflare Secret Key', 'gravisain-blocks' ),
			'description'     => __( 'Your private Cloudflare Turnstile Secret Key.', 'gravisain-blocks' ),
			'section'         => 'gravisain_turnstile_section',
			'settings'        => 'gravisain_turnstile_secret_key',
			'type'            => 'password',
			'active_callback' => $is_enabled,
		] );

		// 4. Widget Theme.
		$wp_customize->add_setting( 'gravisain_turnstile_theme', [
			'type'              => 'option',
			'default'           => 'auto',
			'sanitize_callback' => 'sanitize_key',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_turnstile_theme', [
			'label'           => __( 'Turnstile Appearance Theme', 'gravisain-blocks' ),
			'section'         => 'gravisain_turnstile_section',
			'settings'        => 'gravisain_turnstile_theme',
			'type'            => 'select',
			'active_callback' => $is_enabled,
			'choices'         => [
				'auto'  => __( 'Auto (Follows System/Browser Theme)', 'gravisain-blocks' ),
				'light' => __( 'Light Theme', 'gravisain-blocks' ),
				'dark'  => __( 'Dark Theme', 'gravisain-blocks' ),
			],
		] );

		// 5. Fallback Mode (Anti-Lockout).
		$wp_customize->add_setting( 'gravisain_turnstile_fail_mode', [
			'type'              => 'option',
			'default'           => 'fail_open',
			'sanitize_callback' => 'sanitize_key',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_turnstile_fail_mode', [
			'label'           => __( 'Behavior on Cloudflare Outage', 'gravisain-blocks' ),
			'description'     => __( 'Fail-Open allows password login when Cloudflare servers are down (protected by Honeypot and local rate limiter). Strict blocks all logins until Cloudflare is restored.', 'gravisain-blocks' ),
			'section'         => 'gravisain_turnstile_section',
			'settings'        => 'gravisain_turnstile_fail_mode',
			'type'            => 'select',
			'active_callback' => $is_enabled,
			'choices'         => [
				'fail_open' => __( 'Fail-Open: Allow Login (Recommended, Prevents Admin Lockout)', 'gravisain-blocks' ),
				'strict'    => __( 'Strict: Block Login (High Security)', 'gravisain-blocks' ),
			],
		] );

		// 6. Emergency Bypass Key.
		$wp_customize->add_setting( 'gravisain_turnstile_bypass_key', [
			'type'              => 'option',
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_turnstile_bypass_key', [
			'label'           => __( 'Emergency Bypass Key (Optional)', 'gravisain-blocks' ),
			'description'     => __( 'Set a secret key to bypass Turnstile via URL in case of network issues (e.g. wp-login.php?gravisain_bypass=YOUR_SECRET_KEY).', 'gravisain-blocks' ),
			'section'         => 'gravisain_turnstile_section',
			'settings'        => 'gravisain_turnstile_bypass_key',
			'type'            => 'text',
			'active_callback' => $is_enabled,
		] );

		// 7. Admin Email Notification on Outage Fallback.
		$wp_customize->add_setting( 'gravisain_turnstile_notify_admin', [
			'type'              => 'option',
			'default'           => false,
			'sanitize_callback' => [ $this, 'sanitize_checkbox' ],
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_turnstile_notify_admin', [
			'label'           => __( 'Email Admin on Outage Event', 'gravisain-blocks' ),
			'description'     => __( 'Receive an email alert whenever an authorized login occurs while Cloudflare API is unreachable.', 'gravisain-blocks' ),
			'section'         => 'gravisain_turnstile_section',
			'settings'        => 'gravisain_turnstile_notify_admin',
			'type'            => 'checkbox',
			'active_callback' => $is_enabled,
		] );

		// 8. Logout Redirect to Homepage.
		$wp_customize->add_setting( 'gravisain_turnstile_logout_redirect', [
			'type'              => 'option',
			'default'           => false,
			'sanitize_callback' => [ $this, 'sanitize_checkbox' ],
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_turnstile_logout_redirect', [
			'label'           => __( 'Redirect to Homepage on Logout', 'gravisain-blocks' ),
			'description'     => __( 'Redirects users to the homepage upon logging out, preventing 404 errors on hidden or protected login URLs.', 'gravisain-blocks' ),
			'section'         => 'gravisain_turnstile_section',
			'settings'        => 'gravisain_turnstile_logout_redirect',
			'type'            => 'checkbox',
		] );

		// 9. Direct wp-login.php Access Redirect to Homepage.
		$wp_customize->add_setting( 'gravisain_turnstile_direct_login_redirect', [
			'type'              => 'option',
			'default'           => false,
			'sanitize_callback' => [ $this, 'sanitize_checkbox' ],
			'transport'         => 'refresh',
		] );

		$wp_customize->add_control( 'gravisain_turnstile_direct_login_redirect', [
			'label'           => __( 'Redirect Direct wp-login.php to Homepage', 'gravisain-blocks' ),
			'description'     => __( 'Redirects anyone directly opening wp-login.php to Homepage. Use your Emergency Bypass Key (?gravisain_bypass=...) to access the login form.', 'gravisain-blocks' ),
			'section'         => 'gravisain_turnstile_section',
			'settings'        => 'gravisain_turnstile_direct_login_redirect',
			'type'            => 'checkbox',
		] );
	}

	/**
	 * Register Admin Submenu Page for Non-Customizer access.
	 *
	 * @return void
	 */
	public function register_admin_menu(): void {
		$parent_slug = 'options-general.php';

		// If Gravisain theme dashboard exists, place under Gravisain menu!
		if ( $this->is_gravisain_theme_active() ) {
			$parent_slug = 'gravisain-dashboard';
		}

		add_submenu_page(
			$parent_slug,
			__( 'Login Security (Turnstile)', 'gravisain-blocks' ),
			__( 'Login Security', 'gravisain-blocks' ),
			'manage_options',
			'gravisain-login-security',
			[ $this, 'render_admin_page' ]
		);
	}

	/**
	 * Register settings via WordPress Settings API.
	 *
	 * @return void
	 */
	public function register_admin_settings(): void {
		register_setting( 'gravisain_login_security_group', 'gravisain_turnstile_enabled', [
			'type'              => 'boolean',
			'sanitize_callback' => 'rest_sanitize_boolean',
			'default'           => false,
		] );

		register_setting( 'gravisain_login_security_group', 'gravisain_turnstile_site_key', [
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => '',
		] );

		register_setting( 'gravisain_login_security_group', 'gravisain_turnstile_secret_key', [
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => '',
		] );

		register_setting( 'gravisain_login_security_group', 'gravisain_turnstile_theme', [
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_key',
			'default'           => 'auto',
		] );

		register_setting( 'gravisain_login_security_group', 'gravisain_turnstile_fail_mode', [
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_key',
			'default'           => 'fail_open',
		] );

		register_setting( 'gravisain_login_security_group', 'gravisain_turnstile_bypass_key', [
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => '',
		] );

		register_setting( 'gravisain_login_security_group', 'gravisain_turnstile_notify_admin', [
			'type'              => 'boolean',
			'sanitize_callback' => 'rest_sanitize_boolean',
			'default'           => false,
		] );

		register_setting( 'gravisain_login_security_group', 'gravisain_turnstile_logout_redirect', [
			'type'              => 'boolean',
			'sanitize_callback' => 'rest_sanitize_boolean',
			'default'           => true,
		] );

		register_setting( 'gravisain_login_security_group', 'gravisain_turnstile_direct_login_redirect', [
			'type'              => 'boolean',
			'sanitize_callback' => 'rest_sanitize_boolean',
			'default'           => false,
		] );
	}

	/**
	 * Render Admin Settings Page.
	 *
	 * @return void
	 */
	public function render_admin_page(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		// Handle Form Submission if using regular options.
		if ( isset( $_POST['gravisain_login_sec_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['gravisain_login_sec_nonce'] ) ), 'gravisain_save_login_security' ) ) {
			$enabled      = ! empty( $_POST['gravisain_turnstile_enabled'] );
			$site_key     = isset( $_POST['gravisain_turnstile_site_key'] ) ? sanitize_text_field( wp_unslash( $_POST['gravisain_turnstile_site_key'] ) ) : '';
			$secret_key   = isset( $_POST['gravisain_turnstile_secret_key'] ) ? sanitize_text_field( wp_unslash( $_POST['gravisain_turnstile_secret_key'] ) ) : '';
			$theme        = isset( $_POST['gravisain_turnstile_theme'] ) ? sanitize_key( wp_unslash( $_POST['gravisain_turnstile_theme'] ) ) : 'auto';
			$fail_mode    = isset( $_POST['gravisain_turnstile_fail_mode'] ) ? sanitize_key( wp_unslash( $_POST['gravisain_turnstile_fail_mode'] ) ) : 'fail_open';
			$bypass_key   = isset( $_POST['gravisain_turnstile_bypass_key'] ) ? sanitize_text_field( wp_unslash( $_POST['gravisain_turnstile_bypass_key'] ) ) : '';
			$notify_admin          = ! empty( $_POST['gravisain_turnstile_notify_admin'] );
			$logout_redirect       = ! empty( $_POST['gravisain_turnstile_logout_redirect'] );
			$direct_login_redirect = ! empty( $_POST['gravisain_turnstile_direct_login_redirect'] );

			update_option( 'gravisain_turnstile_enabled', $enabled );
			update_option( 'gravisain_turnstile_site_key', $site_key );
			update_option( 'gravisain_turnstile_secret_key', $secret_key );
			update_option( 'gravisain_turnstile_theme', $theme );
			update_option( 'gravisain_turnstile_fail_mode', $fail_mode );
			update_option( 'gravisain_turnstile_bypass_key', $bypass_key );
			update_option( 'gravisain_turnstile_notify_admin', $notify_admin );
			update_option( 'gravisain_turnstile_logout_redirect', $logout_redirect );
			update_option( 'gravisain_turnstile_direct_login_redirect', $direct_login_redirect );

			echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__( 'Settings saved successfully.', 'gravisain-blocks' ) . '</p></div>';
		}

		$enabled               = (bool) get_option( 'gravisain_turnstile_enabled', false );
		$site_key              = (string) get_option( 'gravisain_turnstile_site_key', '' );
		$secret_key            = (string) get_option( 'gravisain_turnstile_secret_key', '' );
		$theme                 = (string) get_option( 'gravisain_turnstile_theme', 'auto' );
		$fail_mode             = (string) get_option( 'gravisain_turnstile_fail_mode', 'fail_open' );
		$bypass_key            = (string) get_option( 'gravisain_turnstile_bypass_key', '' );
		$notify_admin          = (bool) get_option( 'gravisain_turnstile_notify_admin', false );
		$logout_redirect       = (bool) get_option( 'gravisain_turnstile_logout_redirect', false );
		$direct_login_redirect = (bool) get_option( 'gravisain_turnstile_direct_login_redirect', false );

		?>
		<div class="wrap" style="max-width: 900px; margin-top: 24px;">
			<div style="background: #ffffff; padding: 24px 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); margin-bottom: 24px;">
				<div style="display: flex; align-items: center; justify-content: space-between;">
					<div>
						<h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #0f172a;">
							🛡️ <?php esc_html_e( 'Gravisain Login Security & Cloudflare Turnstile', 'gravisain-blocks' ); ?>
						</h1>
						<p style="margin: 6px 0 0; color: #64748b; font-size: 14px;">
							<?php esc_html_e( 'Protect your WordPress admin login page against bots, brute-force attacks, and credential stuffing without the risk of lockout.', 'gravisain-blocks' ); ?>
						</p>
					</div>
					<div>
						<?php if ( $this->is_enabled() ) : ?>
							<span style="background: #dcfce7; color: #15803d; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 13px;">✓ Active & Protected</span>
						<?php else : ?>
							<span style="background: #f1f5f9; color: #64748b; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 13px;">Inactive</span>
						<?php endif; ?>
					</div>
				</div>
			</div>

			<form method="post" action="">
				<?php wp_nonce_field( 'gravisain_save_login_security', 'gravisain_login_sec_nonce' ); ?>

				<div style="background: #ffffff; padding: 26px 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); margin-bottom: 20px;">
					<h2 style="font-size: 16px; font-weight: 600; color: #1e293b; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
						<?php esc_html_e( '1. Cloudflare Turnstile API Credentials', 'gravisain-blocks' ); ?>
					</h2>

					<table class="form-table" role="presentation">
						<tr>
							<th scope="row"><?php esc_html_e( 'Enable Protection', 'gravisain-blocks' ); ?></th>
							<td>
								<label>
									<input type="checkbox" name="gravisain_turnstile_enabled" value="1" <?php checked( $enabled, true ); ?> />
									<strong><?php esc_html_e( 'Activate Turnstile on WordPress Login Form (wp-login.php)', 'gravisain-blocks' ); ?></strong>
								</label>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="gravisain_turnstile_site_key"><?php esc_html_e( 'Site Key', 'gravisain-blocks' ); ?></label></th>
							<td>
								<input type="text" id="gravisain_turnstile_site_key" name="gravisain_turnstile_site_key" value="<?php echo esc_attr( $site_key ); ?>" class="regular-text" placeholder="0x4AAAAAA..." />
								<p class="description"><?php esc_html_e( 'Get this from your Cloudflare Dashboard > Turnstile.', 'gravisain-blocks' ); ?></p>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="gravisain_turnstile_secret_key"><?php esc_html_e( 'Secret Key', 'gravisain-blocks' ); ?></label></th>
							<td>
								<input type="password" id="gravisain_turnstile_secret_key" name="gravisain_turnstile_secret_key" value="<?php echo esc_attr( $secret_key ); ?>" class="regular-text" placeholder="0x4AAAAAA..." />
								<p class="description"><?php esc_html_e( 'Your private Cloudflare secret key (stored safely).', 'gravisain-blocks' ); ?></p>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="gravisain_turnstile_theme"><?php esc_html_e( 'Widget Appearance', 'gravisain-blocks' ); ?></label></th>
							<td>
								<select id="gravisain_turnstile_theme" name="gravisain_turnstile_theme">
									<option value="auto" <?php selected( $theme, 'auto' ); ?>><?php esc_html_e( 'Auto (Follows browser system preference)', 'gravisain-blocks' ); ?></option>
									<option value="light" <?php selected( $theme, 'light' ); ?>><?php esc_html_e( 'Light Mode', 'gravisain-blocks' ); ?></option>
									<option value="dark" <?php selected( $theme, 'dark' ); ?>><?php esc_html_e( 'Dark Mode', 'gravisain-blocks' ); ?></option>
								</select>
							</td>
						</tr>
					</table>
				</div>

				<div style="background: #ffffff; padding: 26px 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); margin-bottom: 20px;">
					<h2 style="font-size: 16px; font-weight: 600; color: #1e293b; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
						⚡ <?php esc_html_e( '2. Anti-Lockout Failsafe & Disaster Recovery', 'gravisain-blocks' ); ?>
					</h2>

					<table class="form-table" role="presentation">
						<tr>
							<th scope="row"><?php esc_html_e( 'Behavior when Cloudflare is Down', 'gravisain-blocks' ); ?></th>
							<td>
								<fieldset>
									<label style="display: block; margin-bottom: 8px;">
										<input type="radio" name="gravisain_turnstile_fail_mode" value="fail_open" <?php checked( $fail_mode, 'fail_open' ); ?> />
										<strong><?php esc_html_e( 'Fail-Open (Recommended): Allow Login with Password', 'gravisain-blocks' ); ?></strong>
										<br><span class="description" style="margin-left: 24px; display: block; color: #475569;"><?php esc_html_e( 'If Cloudflare API is unreachable, login proceeds normally. Your site remains protected by our internal Honeypot and Local Rate Limiter.', 'gravisain-blocks' ); ?></span>
									</label>
									<label style="display: block;">
										<input type="radio" name="gravisain_turnstile_fail_mode" value="strict" <?php checked( $fail_mode, 'strict' ); ?> />
										<strong><?php esc_html_e( 'Strict Mode: Block All Logins during Outage', 'gravisain-blocks' ); ?></strong>
										<br><span class="description" style="margin-left: 24px; display: block; color: #475569;"><?php esc_html_e( 'No user can log in until Cloudflare API recovers completely.', 'gravisain-blocks' ); ?></span>
									</label>
								</fieldset>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="gravisain_turnstile_bypass_key"><?php esc_html_e( 'Emergency Bypass Key', 'gravisain-blocks' ); ?></label></th>
							<td>
								<input type="text" id="gravisain_turnstile_bypass_key" name="gravisain_turnstile_bypass_key" value="<?php echo esc_attr( $bypass_key ); ?>" class="regular-text" placeholder="e.g. my-scecret-identity" />
								<p class="description">
									<?php
									printf(
										/* translators: %s: example URL */
										esc_html__( 'If configured, you can bypass Turnstile anytime via: %s', 'gravisain-blocks' ),
										'<code>' . esc_html( wp_login_url() ) . '?gravisain_bypass=YOUR_KEY</code>'
									);
									?>
								</p>
							</td>
						</tr>
						<tr>
							<th scope="row"><?php esc_html_e( 'Emergency Kill-Switch (wp-config.php)', 'gravisain-blocks' ); ?></th>
							<td>
								<code>define( 'GRAVISAIN_TURNSTILE_DISABLE', true );</code>
								<p class="description"><?php esc_html_e( 'Placing this single line in wp-config.php disables all Turnstile blocks instantly without accessing database or deleting files.', 'gravisain-blocks' ); ?></p>
							</td>
						</tr>
						<tr>
							<th scope="row"><?php esc_html_e( 'Outage Alert Email', 'gravisain-blocks' ); ?></th>
							<td>
								<label>
									<input type="checkbox" name="gravisain_turnstile_notify_admin" value="1" <?php checked( $notify_admin, true ); ?> />
									<?php esc_html_e( 'Send notification email to site admin when fallback login occurs during Cloudflare outage.', 'gravisain-blocks' ); ?>
								</label>
							</td>
						</tr>
						<tr>
							<th scope="row"><?php esc_html_e( 'Logout Redirection', 'gravisain-blocks' ); ?></th>
							<td>
								<label>
									<input type="checkbox" name="gravisain_turnstile_logout_redirect" value="1" <?php checked( $logout_redirect, true ); ?> />
									<strong><?php esc_html_e( 'Redirect to Homepage upon Logout (Prevents 404 Not Found)', 'gravisain-blocks' ); ?></strong>
								</label>
								<p class="description"><?php esc_html_e( 'Redirects users directly to the homepage upon logging out, avoiding 404 errors on hidden or custom login URLs.', 'gravisain-blocks' ); ?></p>
							</td>
						</tr>
						<tr>
							<th scope="row"><?php esc_html_e( 'Direct Login Access Protection', 'gravisain-blocks' ); ?></th>
							<td>
								<label>
									<input type="checkbox" name="gravisain_turnstile_direct_login_redirect" value="1" <?php checked( $direct_login_redirect, true ); ?> />
									<strong><?php esc_html_e( 'Redirect Direct wp-login.php to Homepage', 'gravisain-blocks' ); ?></strong>
								</label>
								<p class="description"><?php esc_html_e( 'Redirects visitors/bots directly accessing wp-login.php to homepage, eliminating 404 errors. You can access the login page anytime by appending your Emergency Bypass Key (e.g. ?gravisain_bypass=YOUR_KEY).', 'gravisain-blocks' ); ?></p>
							</td>
						</tr>
					</table>
				</div>

				<div style="background: #ffffff; padding: 26px 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); margin-bottom: 24px;">
					<h2 style="font-size: 16px; font-weight: 600; color: #1e293b; margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
						🔒 <?php esc_html_e( '3. Built-in Local Security Layers (Always Active)', 'gravisain-blocks' ); ?>
					</h2>
					<ul style="list-style: disc; margin-left: 20px; color: #475569; line-height: 1.6;">
						<li><strong><?php esc_html_e( 'Zero-API Invisible Honeypot:', 'gravisain-blocks' ); ?></strong> <?php esc_html_e( 'Automatically catches and drops dumb scripts attempting automated form fills.', 'gravisain-blocks' ); ?></li>
						<li><strong><?php esc_html_e( 'Time-Trap Analysis:', 'gravisain-blocks' ); ?></strong> <?php esc_html_e( 'Rejects submissions faster than 1.2 seconds, defeating automated headless bots.', 'gravisain-blocks' ); ?></li>
						<li><strong><?php esc_html_e( 'Local Brute-Force Rate Limiting:', 'gravisain-blocks' ); ?></strong> <?php esc_html_e( 'Locks out any IP address attempting more than 5 failed logins within 15 minutes.', 'gravisain-blocks' ); ?></li>
					</ul>
				</div>

				<p class="submit">
					<button type="submit" class="button button-primary button-large" style="background: #4f46e5; border-color: #4338ca; padding: 6px 20px; font-weight: 600;">
						<?php esc_html_e( 'Save Security Settings', 'gravisain-blocks' ); ?>
					</button>
				</p>
			</form>
		</div>
		<?php
	}

	/**
	 * Sanitize Checkbox.
	 *
	 * @param mixed $checked Input value.
	 * @return bool
	 */
	public function sanitize_checkbox( $checked ): bool {
		return ( isset( $checked ) && true === (bool) $checked );
	}

	/**
	 * Check if Gravisain theme is active.
	 *
	 * @return bool
	 */
	private function is_gravisain_theme_active(): bool {
		return defined( 'GRAVISAIN_VERSION' ) || class_exists( '\Gravisain\Dashboard\Welcome' ) || get_template() === 'gravisain';
	}
}
