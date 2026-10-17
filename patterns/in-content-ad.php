<?php
/**
 * Pattern: In-Content Advertisement (Image Banner)
 *
 * Renders a single Advertisement block. The block itself is dynamic
 * (server-side rendered), so the pattern only needs to seed its attributes;
 * the actual markup is produced by the block's render.php at display time.
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$gravisain_ad_attributes = [
	'alignment'    => 'center',
	'maxWidth'     => 728,
	'borderRadius' => 8,
	'margin'       => [ 'top' => '32px', 'bottom' => '32px' ],
	'showLabel'    => true,
	'adLabel'      => 'Advertisement',
	'adType'       => 'banner',
];

return [
	'slug'        => 'gravisain-blocks/in-content-ad',
	'title'       => __( 'In-Content Advertisement Banner', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-sections' ],
	'description' => __( 'A centered advertisement slot with an "Advertisement" label. Upload your own banner image, or switch the block to "Ad Network Code" mode to paste your Google AdSense snippet.', 'gravisain-blocks' ),
	'content'     => '<!-- wp:gravisain/ad ' . wp_json_encode( $gravisain_ad_attributes ) . ' /-->',
];
