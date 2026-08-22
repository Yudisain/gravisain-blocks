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
	// Clean up any global options or transients stored by Gravisain Blocks.
	delete_option( 'gravisain_blocks_settings' );
	delete_option( 'gravisain_blocks_version' );
	delete_transient( 'gravisain_blocks_patterns_cache' );

	// For site network / multisite installations, clean up options across sites.
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
				delete_option( 'gravisain_blocks_settings' );
				delete_option( 'gravisain_blocks_version' );
				delete_transient( 'gravisain_blocks_patterns_cache' );
				restore_current_blog();
			}
		}
	}
}

gravisain_blocks_uninstall_cleanup();
