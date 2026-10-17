<?php
/**
 * Pattern: Fintech & Wealth Management (Finsyc) - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_fintech_content = PatternRegistry::get_template_content( 'fintech' );
if ( empty( $gravisain_blocks_fintech_content ) ) {
	return [];
}

return [
	'slug'        => 'gravisain-blocks/fintech-home',
	'title'       => __( 'Fintech & Wealth Management — Full Homepage', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ],
	'description' => __( 'A luxurious obsidian and emerald fintech, neobank, and wealth management platform homepage built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_fintech_content,
];
