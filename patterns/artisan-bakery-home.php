<?php
/**
 * Pattern: Artisan Bakery & French Pastry - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_bakery_content = PatternRegistry::get_template_content( 'artisan-bakery' );
if ( empty( $gravisain_blocks_bakery_content ) ) {
	return array();
}

return array(
	'slug'        => 'gravisain-blocks/artisan-bakery-home',
	'title'       => __( 'Artisan Bakery & Pastry — Full Homepage', 'gravisain-blocks' ),
	'categories'  => array( 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ),
	'description' => __( 'A warm, inviting sourdough and French pastry bakery homepage built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_bakery_content,
);
