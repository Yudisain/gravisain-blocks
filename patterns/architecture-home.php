<?php
/**
 * Pattern: Modern Architecture & Interior Studio - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_architecture_content = PatternRegistry::get_template_content( 'architecture' );
if ( empty( $gravisain_blocks_architecture_content ) ) {
	return [];
}

return [
	'slug'        => 'gravisain-blocks/architecture-home',
	'title'       => __( 'Architecture & Interior Studio — Full Homepage', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ],
	'description' => __( 'A minimalist, editorial architectural & interior design portfolio homepage built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_architecture_content,
];
