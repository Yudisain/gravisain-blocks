<?php
/**
 * Uninstall Gravisain Blocks
 *
 * Fired when the plugin is deleted from WordPress.
 *
 * @package Gravisain\Blocks
 */

// If uninstall not called from WordPress, exit directly.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// 1. Static options to delete.
$gravisain_blocks_options = array(
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
);

// 2. Static transients to delete.
$gravisain_blocks_transients = array(
	'gravisain_blocks_patterns_cache',
	'gravisain_blocks_registry_cache_1.0.0',
	'gravisain_turnstile_circuit_breaker',
	'gravisain_blocks_update_info',
);

// Helper closure to delete options and transients for a single site/blog.
$gravisain_blocks_delete_site_data = function () use ( $gravisain_blocks_options, $gravisain_blocks_transients ): void {
	global $wpdb;

	// Delete defined static options and site options (for Multisite).
	foreach ( $gravisain_blocks_options as $option ) {
		delete_option( $option );
		delete_site_option( $option );
	}

	// Delete defined static transients and site transients.
	foreach ( $gravisain_blocks_transients as $transient ) {
		delete_transient( $transient );
		delete_site_transient( $transient );
	}

	// Delete dynamic wildcard transients (e.g. IP-based rate-limits, lockout hashes, outage alerts, and versioned registry caches).
	if ( isset( $wpdb->options ) ) {
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query is necessary during uninstall to clean up dynamic wildcard transients without loading individual keys.
		$wpdb->query(
			$wpdb->prepare(
				"DELETE FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s OR option_name LIKE %s OR option_name LIKE %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is safely provided by core $wpdb->options.
				$wpdb->esc_like( '_transient_gravisain_' ) . '%',
				$wpdb->esc_like( '_transient_timeout_gravisain_' ) . '%',
				$wpdb->esc_like( '_site_transient_gravisain_' ) . '%',
				$wpdb->esc_like( '_site_transient_timeout_gravisain_' ) . '%'
			)
		);
	}

	// Delete network-wide transients in multisite if sitemeta exists.
	if ( is_multisite() && isset( $wpdb->sitemeta ) ) {
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct database query is necessary during uninstall to clean up dynamic network transients.
		$wpdb->query(
			$wpdb->prepare(
				"DELETE FROM {$wpdb->sitemeta} WHERE meta_key LIKE %s OR meta_key LIKE %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is safely provided by core $wpdb->sitemeta.
				$wpdb->esc_like( '_site_transient_gravisain_' ) . '%',
				$wpdb->esc_like( '_site_transient_timeout_gravisain_' ) . '%'
			)
		);
	}
};

// Clean current site options and transients.
$gravisain_blocks_delete_site_data();

// For site network / multisite installations, clean up options across all sites.
if ( is_multisite() ) {
	$gravisain_blocks_sites = get_sites(
		array(
			'number' => 0,
			'fields' => 'ids',
		)
	);

	if ( is_array( $gravisain_blocks_sites ) ) {
		foreach ( $gravisain_blocks_sites as $gravisain_site_id ) {
			switch_to_blog( (int) $gravisain_site_id );
			$gravisain_blocks_delete_site_data();
			restore_current_blog();
		}
	}
}
