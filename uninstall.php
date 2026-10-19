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
	];

	$transients_to_delete = [
		'gravisain_blocks_patterns_cache',
		'gravisain_blocks_registry_cache_1.0.0',
		'gravisain_turnstile_circuit_breaker',
	];

	$delete_items = function () use ( $options_to_delete, $transients_to_delete ): void {
		foreach ( $options_to_delete as $option ) {
			delete_option( $option );
		}
		foreach ( $transients_to_delete as $transient ) {
			delete_transient( $transient );
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
