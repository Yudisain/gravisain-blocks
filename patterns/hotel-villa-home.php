<?php
/**
 * Pattern: Luxury Boutique Hotel & Private Villa - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_hotel_content = PatternRegistry::get_template_content( 'hotel-villa' );
if ( empty( $gravisain_blocks_hotel_content ) ) {
	return array();
}

return array(
	'slug'        => 'gravisain-blocks/hotel-villa-home',
	'title'       => __( 'Boutique Hotel & Luxury Villa — Full Homepage', 'gravisain-blocks' ),
	'categories'  => array( 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ),
	'description' => __( 'A serene, high-end hospitality resort and private luxury villa homepage built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_hotel_content,
);
