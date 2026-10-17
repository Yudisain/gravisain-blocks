<?php
/**
 * Pattern: Aesthetic & Dermatology Clinic (Lumina) - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_aesthetic_content = PatternRegistry::get_template_content( 'aesthetic-clinic' );
if ( empty( $gravisain_blocks_aesthetic_content ) ) {
	return [];
}

return [
	'slug'        => 'gravisain-blocks/aesthetic-clinic-home',
	'title'       => __( 'Aesthetic & Dermatology Clinic — Full Homepage', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ],
	'description' => __( 'A luxurious rose-gold, serene medical aesthetic and dermatology clinic homepage template with treatment menu, doctor bios, metrics, and appointment booking built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_aesthetic_content,
];
