<?php
/**
 * Pattern: Google AdSense Ad Slot (Leaderboard)
 *
 * Seeds a single Advertisement block configured for Google AdSense.
 * The block is dynamic (server-side rendered) and outputs a structured
 * <ins class="adsbygoogle"> tag safely without arbitrary scripts.
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$gravisain_ad_attributes = [
	'alignment'         => 'center',
	'maxWidth'          => 728,
	'minHeight'         => 90,
	'borderRadius'      => 0,
	'margin'            => [ 'top' => '32px', 'bottom' => '32px' ],
	'showLabel'         => true,
	'adLabel'           => 'Advertisement',
	'adType'            => 'adsense',
	'adSenseClient'     => 'ca-pub-0000000000000000',
	'adSenseSlot'       => '0000000000',
	'adSenseFormat'     => 'auto',
	'adSenseResponsive' => true,
];

return [
	'slug'        => 'gravisain-blocks/adsense-ad-slot',
	'title'       => __( 'AdSense Ad Slot (Leaderboard)', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-sections' ],
	'description' => __( 'A leaderboard-style Google AdSense ad slot. Enter your AdSense Publisher ID and Slot ID in the block settings to activate.', 'gravisain-blocks' ),
	'content'     => '<!-- wp:gravisain/ad ' . wp_json_encode( $gravisain_ad_attributes ) . ' /-->',
];
