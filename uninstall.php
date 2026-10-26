<?php
/**
 * Uninstall Gravisain Blocks
 *
 * Fired when the plugin is deleted from WordPress.
 *
 * @package Gravisain\Blocks
 */

// If uninstall not called from WordPress, exit directly.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) && ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Clean up plugin options, transients, and database records upon uninstallation.
 */
function gravisain_blocks_uninstall_cleanup(): void {
	$options_to_delete = [
		'gravisain_blocks_settings',
		'gravisain_blocks_version',
		'gravisain_turnstile_enabled',
		'gravisain_turnstile_site_key',
		'gravisain_turnstile_secret_key',
		'gravisain_turnstile_theme',
		'gravisain_turnstile_fail_mode',
		'gravisain_turnstile_bypass_key',
		'gravisain_turnstile_notify_admin',
		'gravisain_turnstile_logout_redirect',
		'gravisain_turnstile_direct_login_redirect',
		'gravisain_maintenance_enabled',
		'gravisain_maintenance_mode',
		'gravisain_maintenance_bypass_role',
		'gravisain_maintenance_source',
		'gravisain_maintenance_page_id',
		'gravisain_maintenance_default_section_title',
		'gravisain_maintenance_headline',
		'gravisain_maintenance_message',
		'gravisain_maintenance_bg_color',
		'gravisain_maintenance_text_color',
		'gravisain_maintenance_accent_color',
		'gravisain_maintenance_show_logo',
		'gravisain_maintenance_enable_countdown',
		'gravisain_maintenance_countdown_date',
	];

	$transients_to_delete = [
		'gravisain_blocks_patterns_cache',
		'gravisain_blocks_registry_cache_1.0.0',
		'gravisain_turnstile_circuit_breaker',
	];

	$delete_items = function () use ( $options_to_delete, $transients_to_delete ): void {
		global $wpdb;

		// 1. Delete defined static options.
		foreach ( $options_to_delete as $option ) {
			delete_option( $option );
		}

		// 2. Delete static transients.
		foreach ( $transients_to_delete as $transient ) {
			delete_transient( $transient );
		}

		// 3. Delete all dynamic transients (e.g. IP-based rate-limits, lockout hashes, outage alerts, and versioned registry caches).
		if ( isset( $wpdb->options ) ) {
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query is necessary during uninstall to clean up dynamic wildcard transients without loading individual keys.
			$wpdb->query(
				$wpdb->prepare(
					"DELETE FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is safely provided by core $wpdb->options.
					$wpdb->esc_like( '_transient_gravisain_' ) . '%',
					$wpdb->esc_like( '_transient_timeout_gravisain_' ) . '%'
				)
			);
		}
	};

	// Clean current site options and transients.
	$delete_items();

	// For site network / multisite installations, clean up options across all sites.
	if ( is_multisite() ) {
		$sites = get_sites(
			[
				'number' => 0,
				'fields' => 'ids',
			]
		);

		if ( is_array( $sites ) ) {
			foreach ( $sites as $site_id ) {
				switch_to_blog( (int) $site_id );
				$delete_items();
				restore_current_blog();
			}
		}
	}
}

gravisain_blocks_uninstall_cleanup();
